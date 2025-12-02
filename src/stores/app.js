export const PROD = "prod"
export const DEV = "dev"
export const LIME = "lime"
export const DEFAULT = "default"

let ActiveProfile = PROD
// let ActiveProfile = LIME
// let ActiveProfile = DEV

export const PROFILES = new Map([
  [PROD, {
    baseUrl: ["http://192.168.192.194:23000/", "http://ditar-serv:23000/"],
    gatewayUrl: "http://192.168.192.194:18080/",
    imagesUrl: "src/styles/themes/",
    isDebug: true
  }],
  [DEV, {
    baseUrl: ["http://localhost:3000/"],
    gatewayUrl: "http://localhost:8080/",
    imagesUrl: "src/styles/themes/",
    isDebug: false
  }],
  [LIME, {
    baseUrl: ["http://localhost:3000/"],
    gatewayUrl: "http://192.168.100.8:8080/",
    imagesUrl: "src/styles/themes/",
    isDebug: true
  }],
])

export const defineProfile = () => {
  const currentUrl = window.location.href;
  for (const [profileKey, profileData] of PROFILES) {
    if (profileData.baseUrl.some(url => {
      return currentUrl.startsWith(url)
    })) {
      ActiveProfile = profileKey;
      break;
    }
  }
  console.log(ActiveProfile)
}

export const getActiveProfile = () => {
  return PROFILES.get(ActiveProfile)
}

export const getGatewayUrl = () => {
  return PROFILES.get(ActiveProfile).gatewayUrl
}

export const isDebug = () => {
  return PROFILES.get(ActiveProfile).isDebug
}
