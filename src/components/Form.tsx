'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { tag } from '../lib/validations/tag';
import ClientTag from './ClientTag';

interface FormData {
  name: string;
  email: string;
}

function Form() {
  const [tagInfo, setTagInfo] = useState<FormData>();
  const newTabUrl = useMemo(() => {
    if (!tagInfo) return;

    const searchParams = new URLSearchParams(Object.entries(tagInfo));

    return `/api/tag?${searchParams.toString()}`;
  }, [tagInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(tag),
  });

  const onSubmit = handleSubmit((data) => {
    const { name, email } = data;

    setTagInfo({ name, email });
  });

  return (
    <>
      <form onSubmit={onSubmit} className="p-6 rounded-xl bg-base-200 shadow-lg">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Name</span>
          </label>
          <input type="text" placeholder="name" className="input w-full" {...register('name')} />
          <label className="label">
            {errors.name && (
              <span className="label-text-alt font-bold text-error">{errors.name.message}</span>
            )}
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input
            type="text"
            placeholder="example@abc.com"
            className="input w-full"
            {...register('email')}
          />
          <label className="label">
            {errors.email && (
              <span className="label-text-alt font-bold text-error">{errors.email.message}</span>
            )}
          </label>
        </div>
        <div className="mt-10 flex justify-end">
          <button type="submit" className="btn btn-secondary">
            Generate 🎁
          </button>
        </div>
      </form>
      {tagInfo && (
        <div className="mt-10 flex flex-col items-center">
          <p className="relative -mb-12 font-bold">Preview (svg)</p>
          <ClientTag {...tagInfo} />
        </div>
      )}
      {newTabUrl && (
        <div className="flex justify-center">
          <Link href={newTabUrl} className="btn btn-wide" target="_blank" rel="noreferrer">
            View Image in New Tab ↗
          </Link>
        </div>
      )}
    </>
  );
}

export default Form;
