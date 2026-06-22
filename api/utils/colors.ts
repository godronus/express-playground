import dayjs from "dayjs";

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

const secondsToColor = (date: Date = new Date()): string => {
  const seconds = dayjs(date).second();
  if (seconds === 0) {
    return colors[0];
  }
  const index = Math.round(seconds / 10);
  return colors[index === 6 ? 5 : index];
};

/**
 * Returns a color based on the timestamp and cache duration.
 * The color changes every time the cache is invalidated.
 */
const cacheColor = (cacheDuration: number, date: Date = new Date()): string => {
  const seconds = dayjs(date).unix(); // Use unix timestamp for consistency
  const index = Math.floor((seconds / cacheDuration) % colors.length);
  return colors[index];
};

export { cacheColor, secondsToColor };
