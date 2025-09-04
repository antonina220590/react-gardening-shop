import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './index';
import styles from './Button.module.css';

describe('Button component', () => {
  it('should render children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it('should not call onClick handler when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have the primary variant class by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass(styles.button);
    expect(button).toHaveClass(styles.primary);
  });

  it.each([
    ['secondary' as const],
    ['success' as const],
    ['banner' as const],
    ['banner-success' as const],
    ['card' as const],
  ])('should apply the correct class for variant "%s"', (variant) => {
    render(<Button variant={variant}>Styled Button</Button>);
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button).toHaveClass(styles[variant]);
  });
});
