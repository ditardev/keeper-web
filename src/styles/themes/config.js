import Default from "@/styles/themes/default/Default.json"

import Winter from "@/styles/themes/winter/Winter.json"
import Autumn from "@/styles/themes/autumn/Autumn.json"
import Spring from "@/styles/themes/spring/Spring.json"
import Summer from "@/styles/themes/summer/Summer.json"

import * as defaultTheme from "@/styles/themes/default/default.js";

import * as winterTheme from "@/styles/themes/winter/winter.js";
import * as springTheme from "@/styles/themes/spring/spring.js";
import * as summerTheme from "@/styles/themes/summer/summer.js";
import * as autumnTheme from "@/styles/themes/autumn/autumn.js";
import {getActiveProfile} from "@/stores/app.js";

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
      folder: "/png/winter",
      qty: 9,
    }
  }],
  [SPRING, {
    particle: Spring,
    start: '0302',
    end: '0531',
    image: {
      enabled: true,
      folder: "/png/spring",
      qty: 3,
    }
  }],
  [SUMMER, {
    particle: Summer,
    start: '0601',
    end: '0831',
    image: {
      enabled: true,
      folder: "/png/summer",
      qty: 3,
    }
  }],
  [AUTUMN, {
    particle: Autumn,
    start: '0901',
    end: '1130',
    image: {
      enabled: true,
      folder: "/png/autumn",
      qty: 5,
    }
  }],
]);

export const initInterval = () => {
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
  currentTheme = WINTER
  fillConfig()
}

export const getCurrentTheme = () => {
  return INTERVALS.get(currentTheme)
}

export const getParticle = () => {
  return INTERVALS.get(currentTheme).particle
}

export const fillConfig = () => {
  let config = INTERVALS.get(currentTheme)
  if (config.hasOwnProperty("image") && config.image.enabled) {
    fillImages(config)
  }
}

export const fillImages = () => {
  let config = INTERVALS.get(currentTheme)
  let profile = getActiveProfile()
  let themeFolderPath = profile.baseUrl[0] + profile.imagesUrl + currentTheme

  let particleImages = []
  for (let i = 1; i <= config.image.qty; i++) {
    particleImages.push({
      src: themeFolderPath + config.image.folder + i + '.png'
    })
  }
  config.particle.background.image = "url('" + themeFolderPath + "/background.svg')"
  config.particle.particles.shape.options.image = particleImages
}
