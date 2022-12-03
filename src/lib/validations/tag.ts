import * as yup from 'yup';

export const tag = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});
