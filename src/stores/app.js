export const PROFILE_KEYS = {
  PROD: "prod",
  DEV: "dev",
};

let ActiveProfile = PROFILE_KEYS.PROD;
// let ActiveProfile = PROFILE_KEYS.DEV;

export const PROFILES = {
  [PROFILE_KEYS.PROD]: {
    baseUrl: ["http://192.168.192.194:23000/", "http://ditar-serv:23000/"],
    gatewayUrl: "http://192.168.192.194:18080/",
    imagesUrl: "themes/",
    isDebug: true
  },
  [PROFILE_KEYS.DEV]: {
    baseUrl: ["http://localhost:3000/"],
    gatewayUrl: "http://localhost:8080/",
    imagesUrl: "src/assets/themes/",
    isDebug: false
  }
};

export const getActiveProfile = () => PROFILES[ActiveProfile];

export const getGatewayUrl = () => getActiveProfile()?.gatewayUrl;

export const isDebug = () => getActiveProfile()?.isDebug;

export const defineProfile = () => {
  if (typeof window === 'undefined') return; // Защита от запуска на сервере

  const currentUrl = window.location.href;
  for (const profileKey in PROFILES) {
    const profileData = PROFILES[profileKey];
    if (profileData.baseUrl.some(url => currentUrl.startsWith(url))) {
      ActiveProfile = profileKey;
      break;
    }
  }
};