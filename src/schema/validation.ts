import * as yup from 'yup';
import { type FormInput } from '../components/ui/Form';

const phoneRegExp = /^\+?[\d\s-]{10,15}$/;

export const schema = yup.object().shape({
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

export type SaleFormValues = yup.InferType<typeof schema>;

export const saleFormInputs: FormInput<SaleFormValues>[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone number',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
];
