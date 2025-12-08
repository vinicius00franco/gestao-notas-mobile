import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import UploadSection from '../UploadSection';
import { Text } from 'react-native';

describe('UploadSection', () => {
  it('renders section with label and content', () => {
    const { getByText } = render(
      <ThemeProvider>
        <UploadSection label="Test Label">
          <Text>Content</Text>
        </UploadSection>
      </ThemeProvider>
    );

    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders children inside section', () => {
    const { getByText } = render(
      <ThemeProvider>
        <UploadSection label="Section">
          <Text>Child Content</Text>
        </UploadSection>
      </ThemeProvider>
    );

    expect(getByText('Child Content')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ThemeProvider>
        <UploadSection label="Test">
          <Text>Test Child</Text>
        </UploadSection>
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
