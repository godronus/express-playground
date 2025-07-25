import dayjs from "dayjs";

const timestampString = (date: Date = new Date()): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export { timestampString };
