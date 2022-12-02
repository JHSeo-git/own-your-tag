'use client';

import { useCallback, useEffect, useState } from 'react';
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

const colors = ['rgb(42, 57, 144)', 'rgb(210, 51, 105)', 'rgb(59, 52, 134)', 'rgb(71, 78, 104)'];
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const getCurrentDateString = () => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  const timezoneDate = new Date(currentDate.getTime() - offset * 60 * 1000);

  return timezoneDate.toISOString().split('T')[0];
};

interface SatoriTagProps {
  email: string;
  name: string;
}

function SatoriTag({ email, name }: SatoriTagProps) {
  const [svg, setSvg] = useState<string>();

  const getSvg = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const fonts = await loadFonts();

    const currentDate = getCurrentDateString();
    const color = getRandomColor();
    const satoriSvg = await satori(
      <div
        tw="flex flex-col items-center justify-center w-full h-full"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
        }}
      >
        <div
          tw="w-[320px] h-[500px] px-6 flex flex-col items-center text-white rounded-xl relative"
          style={{
            backgroundColor: color,
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          }}
        >
          <div tw="mt-25 flex justify-center items-center rounded-full bg-white p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
              <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              <circle cx="12" cy="10" r="2"></circle>
              <line x1="8" y1="2" x2="8" y2="4"></line>
              <line x1="16" y1="2" x2="16" y2="4"></line>
            </svg>
          </div>
          <h1 tw="m-0 mt-10 text-3xl font-bold">{name}</h1>
          <p tw="m-0 mt-5 px-6 text-gray-200">{email}</p>

          <div tw="flex absolute bottom-4 left-4 right-4">
            <div tw="flex justify-between w-full">
              <div tw="flex">
                <p tw="m-0 py-0 px-2 border rounted-lg bg-white bg-opacity-20 rounded-full text-xs text-gray-200">
                  {currentDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>,
      {
        fonts,
        width: 320 * 1.25,
        height: 500 * 1.25,
      }
    );

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

export default SatoriTag;
