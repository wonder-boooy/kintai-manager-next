import { zeroPad } from "./zeroPad";

export const getTimes = (workingMilliSeconds: number) => {
  const hour = zeroPad(Math.floor(workingMilliSeconds / 1000 / 60 / 60), 2);
  const minute = zeroPad(Math.floor((workingMilliSeconds / 1000 / 60) % 60), 2);
  const second = zeroPad(Math.floor((workingMilliSeconds / 1000) % 60), 2);
  const millisecond = zeroPad(Math.floor(workingMilliSeconds % 1000), 3);

  return {
    hour,
    minute,
    second,
    millisecond,
  };
};
