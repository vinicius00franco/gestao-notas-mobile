import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
`;

const Button = styled.button<{ primary?: boolean }>`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  color: ${({ primary, theme }) => (primary ? theme.colors.onPrimary : theme.colors.text)};
  background: ${({ primary, theme }) => (primary ? theme.colors.primaryVariant : theme.colors.surfaceVariant)};
`;

type Props = {
  onSubmit: (payload: { cnpj: string; fileName?: string }) => void;
};

export function UploadCard({ onSubmit }: Props) {
  const [cnpj, setCnpj] = useState('');
  const [fileName, setFileName] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePick = () => inputRef.current?.click();
  const handleFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = () => {
    onSubmit({ cnpj, fileName });
  };

  return (
    <Card>
      <Field>
        <Label>Selecione o arquivo da Nota Fiscal</Label>
        <input ref={inputRef} type="file" hidden onChange={handleFile} />
        <Button onClick={handlePick} primary>
          {fileName ? `Arquivo: ${fileName}` : 'Escolher Arquivo'}
        </Button>
      </Field>

      <Field>
        <Label>Informe o CNPJ da sua empresa (opcional)</Label>
        <Input
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
      </Field>

      <Button onClick={handleSubmit} primary>
        Enviar Nota Fiscal
      </Button>

      {fileName && <Tag tone="success">Pronto para enviar</Tag>}
    </Card>
  );
}
