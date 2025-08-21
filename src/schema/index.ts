import * as yup from 'yup';

export const phoneRegExp = /^\+?[\d\s-]{10,15}$/;

export const formSchema = (t: (key: string) => string) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .matches(/^[A-Z]/, t('errors.nameStartsWithUppercase'))
      .required(t('errors.nameRequired')),
    email: yup
      .string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
        t('errors.invalidEmailFormat')
      )
      .required(t('errors.emailRequired')),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, t('errors.invalidPhoneFormat'))
      .required(t('errors.phoneRequired')),
  });
