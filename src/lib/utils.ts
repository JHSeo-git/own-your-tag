const colors = ['rgb(42, 57, 144)', 'rgb(210, 51, 105)', 'rgb(59, 52, 134)', 'rgb(71, 78, 104)'];
export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const getCurrentDateString = () => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  const timezoneDate = new Date(currentDate.getTime() - offset * 60 * 1000);

  return timezoneDate.toISOString().split('T')[0];
};
