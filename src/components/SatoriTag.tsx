'use client';

import { useEffect, useState } from 'react';
import type { SatoriOptions } from 'satori';
import satori from 'satori';

const loadFonts = async () => {
  if (typeof window === 'undefined') return [];

  const [robotoMedium, robotoRegular, robotoBold] =
    window.__resource ||
    (window.__resource = await Promise.all([
      fetch('/fonts/Roboto-Medium.ttf').then((res) => res.arrayBuffer()),
      fetch('/fonts/Roboto-Regular.ttf').then((res) => res.arrayBuffer()),
      fetch('/fonts/Roboto-Bold.ttf').then((res) => res.arrayBuffer()),
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

interface SatoriTagProps {
  email: string;
  name: string;
  description: string;
}

function SatoriTag({ email, name, description }: SatoriTagProps) {
  const [svg, setSvg] = useState<string>();

  const getSvg = async () => {
    if (typeof window === 'undefined') return;

    const fonts = await loadFonts();

    const satoriSvg = await satori(
      <div
        style={{
          fontFamily: 'Inter',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        {/* @ts-expect-error: tw is a experimental satori prop */}
        <div tw="h-full w-full bg-gray-100 flex flex-col justify-center items-center">
          {/* @ts-expect-error: tw is a experimental satori prop */}
          <h1 tw="text-4xl font-bold">{name}</h1>
          {/* @ts-expect-error: tw is a experimental satori prop */}
          <p tw="text-xl">{email}</p>
          {/* @ts-expect-error: tw is a experimental satori prop */}
          <p tw="text-xl">{description}</p>
        </div>
      </div>,
      {
        fonts,
        width: 320,
        height: 400,
      }
    );

    setSvg(satoriSvg);
  };

  useEffect(() => {
    getSvg();
  }, []);

  if (!svg) {
    return null;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

export default SatoriTag;
