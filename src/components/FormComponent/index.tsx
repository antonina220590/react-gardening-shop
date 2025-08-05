import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import styles from './FormComponent.module.css';

export type FormInput<T extends FieldValues> = {
  name: Path<T>;
  type: string;
  placeholder: string;
  validation?: object;
};

type FormComponentProps<T extends FieldValues> = {
  inputs: FormInput<T>[];
  submitText?: string;
  onSubmit: SubmitHandler<T>;
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  theme?: 'light' | 'dark';
  renderButton: (props: {
    isLoading?: boolean;
    isSuccess?: boolean;
  }) => React.ReactNode;
};

export default function FormComponent<T extends FieldValues>({
  inputs,
  onSubmit,
  isLoading,
  isSuccess,
  theme = 'dark',
  renderButton,
}: FormComponentProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();
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
            {...register(input.name, input.validation)}
          />
        </div>
      ))}
      {renderButton({ isLoading, isSuccess })}
    </form>
  );
}
