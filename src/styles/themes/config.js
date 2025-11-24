import Default from "@/styles/particles/Default.json"
import Primary from "@/styles/particles/Primary.json"

import Winter from "@/styles/particles/Winter.json"
import Autumn from "@/styles/particles/Autumn.json"
import Spring from "@/styles/particles/Spring.json"
import Summer from "@/styles/particles/Summer.json"

import * as darkTheme from "@/styles/themes/dark.js";
import * as lightTheme from "@/styles/themes/light.js";

import * as winterTheme from "@/styles/themes/winter.js";
import * as springTheme from "@/styles/themes/spring.js";
import * as summerTheme from "@/styles/themes/summer.js";
import * as autumnTheme from "@/styles/themes/autumn.js";

export const LIGHT = "light"
export const DARK = "dark"

export const WINTER = "winter"
export const AUTUMN = "autumn"
export const SPRING = "spring"
export const SUMMER = "summer"

export const colorThemes = {
  dark: darkTheme.VALUES,
  light: lightTheme.VALUES,
  winter: winterTheme.VALUES,
  spring: springTheme.VALUES,
  summer: summerTheme.VALUES,
  autumn: autumnTheme.VALUES
}
export let currentTheme = DARK

export const INTERVALS = new Map([
  [WINTER, {
    particle: Winter,
    colors: "winterColor",
    start: '1201',
    end: '0301',
  }],
  [SPRING, {
    particle: Spring,
    colors: "autumnColor",
    start: '0302',
    end: '0531',
  }],
  [SUMMER, {
    particle: Summer,
    colors: "autumnColor",
    start: '0601',
    end: '0831',
  }],
  [AUTUMN, {
    particle: Autumn,
    colors: "autumnColor",
    start: '0901',
    end: '1130',
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
  console.log(currentTheme)
}

export const getCurrentParticle = () =>{
  return INTERVALS.get(currentTheme).particle
}

export const getCurrentColors = () => {
  console.log(INTERVALS.get(currentTheme).colors)
  return INTERVALS.get(currentTheme).colors
}
