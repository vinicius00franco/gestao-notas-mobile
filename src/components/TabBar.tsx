import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Tab {
  key: string;
  label: string;
  count: number;
}

interface TabBarProps {
  tabs: Tab[];
  activeIndex: number;
  onTabPress: (index: number) => void;
}

export default function TabBar({ tabs, activeIndex, onTabPress }: TabBarProps) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabButton}
          onPress={() => onTabPress(idx)}>
          <Text
            style={[
              styles.tabLabel,
              activeIndex === idx && styles.tabLabelActive,
            ]}>
            {tab.label} ({tab.count})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabLabelActive: {
    fontWeight: '600',
    color: '#000',
  },
});