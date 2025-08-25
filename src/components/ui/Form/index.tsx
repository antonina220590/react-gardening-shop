import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import styles from './Form.module.css';

export type FormInput<T extends FieldValues> = {
  name: Path<T>;
  type: string;
  placeholder: string;
};

type FormProps<TSchema extends yup.AnyObjectSchema> = {
  inputs: FormInput<yup.InferType<TSchema>>[];
  submitText?: string;
  onSubmit: SubmitHandler<yup.InferType<TSchema>>;
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  theme?: 'light' | 'dark';
  validationSchema: TSchema;
  renderButton: (props: {
    isLoading?: boolean;
    isSuccess?: boolean;
  }) => React.ReactNode;
};

export default function Form<TSchema extends yup.AnyObjectSchema>({
  inputs,
  onSubmit,
  isLoading,
  isSuccess,
  theme = 'dark',
  renderButton,
  validationSchema,
}: FormProps<TSchema>) {
  type FormValues = yup.InferType<TSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const formClasses = `${styles.form} ${theme === 'light' ? styles.light : ''}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClasses}>
      {inputs.map((input) => (
        <div key={input.name} className={styles.input_container}>
          <div className={styles.error_placeholder}>
            {errors[input.name] && (
              <p className={styles.error}>
                {String(errors[input.name]?.message)}
              </p>
            )}
          </div>
          <input
            className={styles.form_input}
            type={input.type}
            placeholder={input.placeholder}
            {...register(input.name)}
          />
        </div>
      ))}
      <div className={styles.form_btn}>
        {renderButton({ isLoading, isSuccess })}
      </div>
    </form>
  );
}
