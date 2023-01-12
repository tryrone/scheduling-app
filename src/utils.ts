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

export function getCurrentWeekEndDay() {
  var date = new Date();
  var endDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (7 - date.getUTCDay())
  );
  return endDay;
}

export function getCurrentWeekStartDay() {
  var date = new Date();
  var startDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getUTCDay() + 1
  );
  return startDay;
}

export function checkObjectValues(obj: Record<string, any>) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      return true;
    }
  }
  return false;
}

export function returnCurrentWeek() {
  var currentDate = new Date();
  var day = currentDate.getDay();
  var diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);

  var sunday = new Date(currentDate.setDate(diff));
  var currentWeek = [sunday];

  for (var i = 1; i < 7; i++) {
    currentWeek.push(new Date(sunday.getTime() + i * 24 * 60 * 60 * 1000));
  }
  return currentWeek;
}
