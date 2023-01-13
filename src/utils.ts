import { TaskDataProp } from "./components/AddTaskModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appLogger from "./logger";
import moment from "moment";

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

export enum Groups {
  Personal = "Personal",
  Health = "Health",
  Work = "Work",
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

export function returnOnlyDataForCurrentWeek(tasksData: TaskDataProp[]) {
  let today = new Date();
  let currentWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  );
  let currentWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    currentWeekStart.getDate() + 6
  );

  let itemsInCurrentWeek = tasksData?.filter((item) => {
    let itemDate = new Date(parseInt(item?.date));

    return itemDate >= currentWeekStart && itemDate <= currentWeekEnd;
  });

  return itemsInCurrentWeek;
}

export const storeData = async (value: TaskDataProp[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    return true;
  } catch (e) {
    // saving error
    appLogger.info("error storing data", e);
  }
};

export const getLocalData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    appLogger.info("error reading data", e);
  }
};

export const returnGroupData = (data: TaskDataProp[], group: Groups) => {
  const personalGroup = data?.filter((item) => item?.group === group);
  return personalGroup;
};

export const returnDoneAndUpcomingTasks = (
  data: TaskDataProp[],
  group: Groups
): Record<TaskDataProp[] | any, TaskDataProp[]> => {
  let today = new Date();
  let currentHour = today.getHours();
  let currentMinutes = today.getMinutes();

  const selectedGroup = data?.filter((item) => item?.group === group);

  const pastTasks = selectedGroup?.filter((item) => {
    let itemDate = new Date(parseInt(item?.date, 10));

    const startTime = item?.startTime?.split(" ")[0];
    const startHour = startTime?.split(":")[0];
    const startMin = startTime?.split(":")[1];
    return (
      itemDate < today ||
      (itemDate.getDate() === today.getDate() &&
        parseInt(startHour, 10) === currentHour &&
        parseInt(startMin, 10) >= currentMinutes)
    );
  });

  const upcomingTasks = selectedGroup?.filter((item) => {
    const date = new Date(parseInt(item?.date, 10));
    const startTime = item?.startTime?.split(" ")[0];
    const startHour = startTime?.split(":")[0];
    const startMin = startTime?.split(":")[1];

    return (
      (date.getDate() === today.getDate() &&
        parseInt(startHour, 10) > currentHour) ||
      (date.getDate() === today.getDate() &&
        parseInt(startHour, 10) === currentHour &&
        parseInt(startMin, 10) >= currentMinutes)
    );
  });

  return { pastTasks, upcomingTasks };
};
