import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertCard from './AlertCard';
import { AlertLevel, HealthAlert } from '../types';

const DummyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} data-testid="dummy-icon" />
);

const alert: HealthAlert = {
  id: 'alert-1',
  title: 'Test Alert',
  description: 'This is a test alert description.',
  level: AlertLevel.High,
  time: '9:00 AM',
  icon: DummyIcon,
};

describe('AlertCard', () => {
  it('renders the alert title, description, level, and action button', () => {
    const handleTakeAction = vi.fn();

    render(<AlertCard alert={alert} onTakeAction={handleTakeAction} />);

    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a test alert description.')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Take action')).toBeInTheDocument();
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument();
  });
});
