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

export { secondsToColor };
