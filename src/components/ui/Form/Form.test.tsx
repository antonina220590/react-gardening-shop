import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import * as yup from 'yup';
import Form from './index';
import type { FormInput } from './index';

const phoneRegExp = /^\+?[\d\s-]{10,15}$/;
const saleSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-ZА-Я]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Invalid phone number format')
    .required('Phone is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

type SaleFormValues = yup.InferType<typeof saleSchema>;

const saleFormInputs: FormInput<SaleFormValues>[] = [
  { name: 'name', type: 'text', placeholder: 'Name' },
  { name: 'phone', type: 'tel', placeholder: 'Phone number' },
  { name: 'email', type: 'email', placeholder: 'Email' },
];

const mockRenderButton = vi.fn(
  ({ isLoading, isSuccess }: { isLoading?: boolean; isSuccess?: boolean }) => {
    if (isLoading)
      return (
        <button type="submit" disabled>
          Submitting...
        </button>
      );
    if (isSuccess) return <button type="button">Success!</button>;
    return <button type="submit">Submit</button>;
  }
);

describe('Form component', () => {
  it('should render all form inputs and the submit button', () => {
    render(
      <Form
        inputs={saleFormInputs}
        onSubmit={vi.fn()}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
      />
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should display validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(
      <Form
        inputs={saleFormInputs}
        onSubmit={vi.fn()}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
      />
    );

    const nameInput = screen.getByPlaceholderText('Name');
    await user.type(nameInput, 'john');

    expect(
      await screen.findByText('Name must start with an uppercase letter')
    ).toBeInTheDocument();
  });

  it('should not call onSubmit with invalid data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    render(
      <Form
        inputs={saleFormInputs}
        onSubmit={mockOnSubmit}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
      />
    );

    const phoneInput = screen.getByPlaceholderText('Phone number');
    await user.type(phoneInput, '123');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText('Invalid phone number format')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Name must start with an uppercase letter')
    ).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    render(
      <Form
        inputs={saleFormInputs}
        onSubmit={mockOnSubmit}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
      />
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone number');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'Test');
    await user.type(phoneInput, '+1234567890');
    await user.type(emailInput, 'test@test.com');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        name: 'Test',
        phone: '+1234567890',
        email: 'test@test.com',
      },
      expect.anything()
    );
  });

  it('should pass isLoading and isSuccess props to the renderButton function', () => {
    const { rerender } = render(
      <Form
        inputs={saleFormInputs}
        onSubmit={vi.fn()}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
        isLoading={false}
        isSuccess={false}
      />
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    rerender(
      <Form
        inputs={saleFormInputs}
        onSubmit={vi.fn()}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
        isLoading={true}
      />
    );
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();

    rerender(
      <Form
        inputs={saleFormInputs}
        onSubmit={vi.fn()}
        validationSchema={saleSchema}
        renderButton={mockRenderButton}
        isSuccess={true}
      />
    );
    expect(
      screen.getByRole('button', { name: /success/i })
    ).toBeInTheDocument();
  });
});
