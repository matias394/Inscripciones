export const orderHours = (timeString: string): number => {
  const timeParts = timeString.split(' ');
  const time = timeParts[0];
  const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
  return hours * 60 + minutes;
};
