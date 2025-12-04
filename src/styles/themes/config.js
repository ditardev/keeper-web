import { getActiveProfile } from "@/stores/app.js";

import * as defaultTheme from "@/styles/themes/default/default.js";
import * as winterTheme from "@/styles/themes/winter/winter.js";
import * as springTheme from "@/styles/themes/spring/spring.js";
import * as summerTheme from "@/styles/themes/summer/summer.js";
import * as autumnTheme from "@/styles/themes/autumn/autumn.js";

const THEMES = {
  default: defaultTheme,
  winter: winterTheme,
  spring: springTheme,
  summer: summerTheme,
  autumn: autumnTheme,
};

export const THEME_KEYS = {
  DEFAULT: "default",
  WINTER: "winter",
  AUTUMN: "autumn",
  SPRING: "spring",
  SUMMER: "summer",
};

export const colorThemes = Object.fromEntries(
    Object.entries(THEMES).map(([key, theme]) => [key, theme.VALUES])
);

export let currentTheme = THEME_KEYS.DEFAULT;

export const INTERVALS = new Map([
  [THEME_KEYS.DEFAULT, {
    particle: colorThemes.default.particle,
    cursor: colorThemes.default.cursor,
    start: '0102', end: '0101', images: 0
  }],
  [THEME_KEYS.WINTER, {
    particle: colorThemes.winter.particle,
    cursor: colorThemes.winter.cursor,
    start: '1201', end: '0301', images: 9
  }],
  [THEME_KEYS.SPRING, {
    particle: colorThemes.spring.particle,
    cursor: colorThemes.spring.cursor,
    start: '0302', end: '0531', images: 3
  }],
  [THEME_KEYS.SUMMER, {
    particle: colorThemes.summer.particle,
    cursor: colorThemes.summer.cursor,
    start: '0601', end: '0831', images: 3
  }],
  [THEME_KEYS.AUTUMN, {
    particle: colorThemes.autumn.particle,
    cursor: colorThemes.autumn.cursor,
    start: '0901', end: '1130', images: 5
  }],
]);

export const initInterval = () => {
  const currentDate = new Date();
  const currentMD = String(currentDate.getMonth() + 1).padStart(2, '0') +
      String(currentDate.getDate()).padStart(2, '0');

  for (const [key, season] of INTERVALS.entries()) {
    const { start: startMD, end: endMD } = season;

    if ((startMD <= endMD && currentMD >= startMD && currentMD <= endMD) ||
        (startMD > endMD && (currentMD >= startMD || currentMD <= endMD))) {
      currentTheme = key;
    }
  }
  console.log(currentTheme)
  fillConfig();
};

export const getCurrentTheme = () => INTERVALS.get(currentTheme);

export const getParticle = () => INTERVALS.get(currentTheme)?.particle;

export const getCursorHue = () => INTERVALS.get(currentTheme)?.cursor;

export const fillConfig = () => {
  const config = getCurrentTheme();
  if (config?.images > 0) {
    fillImages(config);
  }
};

export const fillImages = (config) => { // Принимаем config в качестве аргумента
  const profile = getActiveProfile();
  const themeFolderPath = `${profile.baseUrl[0]}${profile.imagesUrl}${currentTheme}`;

  const particleImages = [];
  for (let i = 1; i <= config.images; i++) {
    particleImages.push({
      src: `${themeFolderPath}/png/${currentTheme}${i}.png`
    });
  }

  config.particle.background.image = `url('${themeFolderPath}/background.svg')`;
  config.particle.particles.shape.options.image = particleImages;
};
