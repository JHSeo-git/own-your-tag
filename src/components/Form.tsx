'use client';

import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  name: string;
  description: string;
}

function Form() {
  const { register, handleSubmit } = useForm<FormData>({});

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" {...register('email')} />
      <input type="text" {...register('name')} />
      <input type="text" {...register('description')} />
    </form>
  );
}

export default Form;
