import { z } from 'zod';

export const tag = z.object({
  name: z.string(),
  email: z.string().email(),
});
