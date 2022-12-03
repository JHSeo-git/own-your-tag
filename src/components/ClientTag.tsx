'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SatoriOptions } from 'satori';
import satori from 'satori';

import { generateTagJSX } from '../lib/jsx-utils';
import { getCurrentDateString, getRandomColor } from '../lib/utils';

const loadFonts = async () => {
  if (typeof window === 'undefined') return [];

  const [robotoMedium, robotoRegular, robotoBold] =
    window.__resource ||
    (window.__resource = await Promise.all([
      fetch(new URL('../assets/fonts/Roboto-Medium.ttf', import.meta.url)).then((res) =>
        res.arrayBuffer()
      ),
      fetch(new URL('../assets/fonts/Roboto-Regular.ttf', import.meta.url)).then((res) =>
        res.arrayBuffer()
      ),
      fetch(new URL('../assets/fonts/Roboto-Bold.ttf', import.meta.url)).then((res) =>
        res.arrayBuffer()
      ),
    ]));

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

interface ClientTagProps {
  email: string;
  name: string;
}

function ClientTag({ email, name }: ClientTagProps) {
  const [svg, setSvg] = useState<string>();

  const getSvg = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const fonts = await loadFonts();

    const currentDate = getCurrentDateString();
    const color = getRandomColor();
    const width = 320;
    const height = 500;
    const jsx = generateTagJSX({ width, height, name, email, currentDate, color });

    const satoriSvg = await satori(jsx, {
      fonts,
      width: width * 1.25,
      height: height * 1.25,
    });

    setSvg(satoriSvg);
  }, [name, email]);

  useEffect(() => {
    getSvg();
  }, [getSvg]);

  if (!svg) {
    return (
      <div className="flex items-center justify-center w-full h-full ">
        <div
          className="flex items-center justify-center"
          style={{ width: 320 * 1.25, height: 500 * 1.25 }}
        >
          <div className="w-[320px] h-[500px] bg-gray-700 rounded-xl flex justify-center items-center">
            <p className="text-2xl font-bold text-white">loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default ClientTag;
