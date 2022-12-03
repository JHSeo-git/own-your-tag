interface GenerateProps {
  width: number | string;
  height: number | string;
  color: string;
  name: string;
  email: string;
  currentDate: string;
}

export function generateTagJSX({ width, height, name, email, currentDate, color }: GenerateProps) {
  return (
    <div
      tw="flex flex-col items-center justify-center w-full h-full"
      style={{
        fontFamily: 'Roboto',
        fontWeight: '500',
      }}
    >
      <div
        tw="px-6 flex flex-col items-center text-white rounded-xl relative"
        style={{
          width,
          height,
          backgroundColor: color,
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        }}
      >
        <div tw="flex absolute top-4 left-4 right-4">
          <div tw="flex justify-between w-full">
            <div tw="flex">
              <p tw="m-0 py-0 px-2 border bg-white bg-opacity-20 rounded-full text-xs text-gray-200">
                {currentDate}
              </p>
            </div>
            <div tw="flex">
              <p tw="m-0 py-0 text-xs text-gray-300">{color}</p>
            </div>
          </div>
        </div>

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
            <div tw="flex"></div>
            <div tw="flex">
              <p tw="m-0 py-0 text-xs text-gray-300">JHSeo-git/own-your-tag</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
