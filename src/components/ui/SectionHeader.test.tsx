import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
  it('renders the title and accent correctly', () => {
    render(<SectionHeader title="Test" accent="Header" />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
