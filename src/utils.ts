export const getTime = (): string[] => {
  let time = [];
  for (let i = 0; i < 24; i++) {
    let hour = i;
    let minute = "00";
    time.push(`${hour}:${minute}`);
  }
  return time;
};

interface CalculateDataProps {
  endHr: number;
  startHr: number;
  startMin: number;
  endMin: number;
}

interface CalculatedData {
  height: number;
}

export type AdgendaDataItem = {
  startTime: string;
  endTime: string;
  text?: string;
};

export type YAxisItem = {
  y: number;
  hour: number;
};

export const calculateData = (task: CalculateDataProps): CalculatedData => {
  const hrDiff = task.endHr - task.startHr;
  let height;
  if (hrDiff > 0) {
    height = hrDiff * 83;
  } else {
    height = 15;
  }

  // let pos = task?.startHr < 11 ? (task.startHr - 1) * 80 : task.startHr * 80;

  let topExtra = task.startMin * (40 / 60);

  let bottomExtra = task.endMin * (40 / 60);

  height = height + (bottomExtra - topExtra);
  return { height };
};
