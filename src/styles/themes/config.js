import Winter from "@/styles/particles/Winter.json"
import Autumn from "@/styles/particles/Autumn.json"
import Spring from "@/styles/particles/Spring.json"
import Summer from "@/styles/particles/Summer.json"
import Default from "@/styles/particles/Default.json"

import * as defaultTheme from "@/styles/themes/default.js";
import * as winterTheme from "@/styles/themes/winter.js";
import * as springTheme from "@/styles/themes/spring.js";
import * as summerTheme from "@/styles/themes/summer.js";
import * as autumnTheme from "@/styles/themes/autumn.js";

export const DEFAULT = "default"
export const WINTER = "winter"

export const AUTUMN = "autumn"
export const SPRING = "spring"
export const SUMMER = "summer"

export const colorThemes = {
  default: defaultTheme.VALUES,
  winter: winterTheme.VALUES,
  spring: springTheme.VALUES,
  summer: summerTheme.VALUES,
  autumn: autumnTheme.VALUES
}
export let currentTheme = DEFAULT

export const INTERVALS = new Map([
  [DEFAULT, {
    particle: Default,
    start: '0102',
    end: '0101',
    image: {
      enabled: false,
    }
  }],
  [WINTER, {
    particle: Winter,
    start: '1201',
    end: '0301',
    image: {
      enabled: true,
      folder: "winter/winter",
      qty: 9,
    }
  }],
  [SPRING, {
    particle: Spring,
    start: '0302',
    end: '0531',
    image: {
      enabled: true,
      folder: "spring/spring",
      qty: 3,
    }
  }],
  [SUMMER, {
    particle: Summer,
    start: '0601',
    end: '0831',
    image: {
      enabled: true,
      folder: "summer/summer",
      qty: 3,
    }
  }],
  [AUTUMN, {
    particle: Autumn,
    start: '0901',
    end: '1130',
    image: {
      enabled: true,
      folder: "autumn/autumn",
      qty: 5,
    }
  }],
]);

export const defineInterval = () => {
  let currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentMD = currentMonth + currentDay;
  for (const [key, season] of INTERVALS.entries()) {
    const startMD = season.start;
    const endMD = season.end;

    // Обычные сезоны (startMD <= endMD)
    if (startMD <= endMD) {
      if (currentMD >= startMD && currentMD <= endMD) {
        currentTheme = key
      }
      // Сезон, переходящий через конец года (startMD > endMD, т.е. Зима)
    } else {
      if (currentMD >= startMD || currentMD <= endMD) {
        currentTheme = key
      }
    }
  }
  // currentTheme = SUMMER
}

export const getCurrentTheme = () => {
  return INTERVALS.get(currentTheme)
}
