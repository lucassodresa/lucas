import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form';
import clsx from 'clsx';
import styles from './Form.module.css';

export interface FormProps {
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: DefaultValues<FieldValues>;
  children?: React.ReactNode;
  className?: string;
}

export function Form({ onSubmit, defaultValues, children, className }: FormProps) {
  const methods = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx(styles.form, className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
