import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error title and message', () => {
    const { getByText } = render(
      <ErrorMessage 
        title="Oops!" 
        message="Something went wrong" 
      />
    );

    expect(getByText('Oops!')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <ErrorMessage 
        title="Oops!" 
        message="Something went wrong" 
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});