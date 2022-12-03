import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import type { SatoriOptions } from 'satori';

import { generateTagJSX } from '../../lib/jsx-utils';
import { getCurrentDateString, getRandomColor } from '../../lib/utils';
import { tag } from '../../lib/validations/tag';

export const config = {
  runtime: 'experimental-edge',
};

const loadFonts = async () => {
  const [robotoMedium, robotoRegular, robotoBold] = await Promise.all([
    fetch(new URL('../../assets/fonts/Roboto-Medium.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(new URL('../../assets/fonts/Roboto-Regular.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(new URL('../../assets/fonts/Roboto-Bold.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
  ]);

  return [
    {
      name: 'Roboto',
      data: robotoRegular,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Roboto',
      data: robotoMedium,
      weight: 500,
      style: 'normal',
    },
    {
      name: 'Roboto',
      data: robotoBold,
      weight: 700,
      style: 'normal',
    },
  ] satisfies SatoriOptions['fonts'];
};

export default async function handler(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { email, name } = await tag.validate(Object.fromEntries(url.searchParams));

    const fonts = await loadFonts();

    const color = getRandomColor();
    const currentDate = getCurrentDateString();
    const width = 320;
    const height = 500;

    const jsx = generateTagJSX({ width, height, name, email, currentDate, color });

    return new ImageResponse(jsx, {
      fonts,
      width,
      height,
    });
  } catch (e) {
    console.log(e);
    return new Response('Failed to generate tag', { status: 500 });
  }
}
