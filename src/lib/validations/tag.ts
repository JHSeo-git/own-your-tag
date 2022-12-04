import { z } from 'zod';

export const tag = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(2, 'Name must be at least 2 characters.'),
  email: z.string({ required_error: 'Email is required.' }).email('Email is invalid.'),
});
