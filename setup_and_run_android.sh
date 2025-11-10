#!/bin/bash

# Script para configurar Android SDK e executar o app no dispositivo físico
# Uso: ./setup_and_run_android.sh

set -e

echo "Verificando se o Android SDK está instalado..."

# Verificar se ANDROID_HOME está definido
if [ -z "$ANDROID_HOME" ]; then
    echo "ANDROID_HOME não está definido. Tentando instalar Android SDK..."

    # Instalar Android SDK via command line tools
    SDK_DIR="$HOME/Android/Sdk"
    CMDLINE_TOOLS_DIR="$HOME/Android/cmdline-tools"

    # Verificar se já existe instalação
    if [ -d "$CMDLINE_TOOLS_DIR/latest/bin" ]; then
        echo "Android SDK já parece estar instalado. Definindo ANDROID_HOME..."
        export ANDROID_HOME="$SDK_DIR"
        export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools"
    else
        # Criar diretórios
        mkdir -p "$CMDLINE_TOOLS_DIR"

        # Baixar command line tools
        echo "Baixando Android Command Line Tools..."
        wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /tmp/cmdline-tools.zip

        # Extrair
        unzip -q /tmp/cmdline-tools.zip -d "$CMDLINE_TOOLS_DIR"
        mv "$CMDLINE_TOOLS_DIR/cmdline-tools" "$CMDLINE_TOOLS_DIR/latest" 2>/dev/null || echo "Diretório latest já existe, pulando..."

        # Definir ANDROID_HOME
        export ANDROID_HOME="$SDK_DIR"
        export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools"

        # Aceitar licenças e instalar componentes básicos
        echo "Aceitando licenças e instalando componentes..."
        yes | "$CMDLINE_TOOLS_DIR/latest/bin/sdkmanager" --licenses
        "$CMDLINE_TOOLS_DIR/latest/bin/sdkmanager" "platform-tools" "platforms;android-34" "build-tools;34.0.0"

        # Adicionar ao .bashrc para persistência
        echo "export ANDROID_HOME=$ANDROID_HOME" >> ~/.bashrc
        echo "export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools" >> ~/.bashrc

        echo "Android SDK instalado com sucesso!"
    fi
else
    echo "Android SDK encontrado em: $ANDROID_HOME"
fi

# Checagem de espaço em disco e limpeza de caches pesados
echo -e "\nVerificando espaço em disco..."
df -h ~ | sed -n '1,2p'
df -h . | sed -n '1,2p'

echo -e "\nLimpando caches para liberar espaço (Gradle, Android e npm)..."
# Limpa caches do Gradle do usuário (seguros para remover)
rm -rf "$HOME/.gradle/caches" || true
rm -rf "$HOME/.gradle/daemon" || true
rm -rf "$HOME/.gradle/native" || true

# Limpa cache de build do Android
rm -rf "$HOME/.android/build-cache" || true

# Opcional: remover imagens de emulador para liberar muitos GB (defina CLEAN_EMULATOR_IMAGES=1)
if [ "${CLEAN_EMULATOR_IMAGES:-0}" = "1" ]; then
  echo "Removendo imagens de emulador para liberar espaço..."
  rm -rf "$HOME/Android/Sdk/system-images" || true
  rm -rf "$HOME/Android/Sdk/emulator" || true
fi

# Limpa cache do npm
npm cache clean --force >/dev/null 2>&1 || true

echo "Espaço após limpeza:"
df -h ~ | sed -n '1,2p'
df -h . | sed -n '1,2p'

# Reduz escrita em cache do Gradle neste build
export GRADLE_USER_HOME="$(pwd)/.gradle-user-home"
export GRADLE_OPTS="$GRADLE_OPTS -Dorg.gradle.caching=false"

# Limpar caches e reinstalar dependências para evitar problemas de build
echo "Limpando caches e reinstalando dependências..."
rm -rf node_modules
npm install

# Limpar cache do Metro e Gradle
npx expo install --fix || echo "Aviso: expo install --fix falhou, continuando..."
npx react-native clean || echo "Aviso: react-native clean falhou, continuando..."
rm -rf android/.gradle
rm -rf android/build
rm -rf android/app/build

# Verificar se dispositivo está conectado
echo "Verificando dispositivos conectados..."
if ! adb devices | grep -q "device$"; then
    echo "Nenhum dispositivo Android conectado via USB."
    echo "Conecte seu dispositivo e habilite a depuração USB."
    exit 1
fi

echo "Dispositivo conectado. Executando o app..."
npm run android || {
  echo -e "\nBuild falhou. Tentando novamente com limpeza adicional do Gradle no projeto..."
  rm -rf "$GRADLE_USER_HOME" || true
  rm -rf android/.gradle || true
  ./gradlew -p android clean || true
  npm run android
}

# Limpeza pós-build do GRADLE_USER_HOME temporário para recuperar espaço
rm -rf "$GRADLE_USER_HOME" || true