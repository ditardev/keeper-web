export const PROD = "prod"
export const DEV = "dev"
export const LIME = "lime"

// let ActiveProfile = PROD
let ActiveProfile = LIME
// let ActiveProfile = DEV

export const PROFILES = new Map([
  [PROD, {
    baseUrl: ["http://192.168.192.194:23000/", "http://ditar-serv:23000/"],
    gatewayUrl: "http://192.168.192.194:18080/",
    isDebug: true
  }],
  [DEV, {
    baseUrl: ["http://localhost:3000/"],
    gatewayUrl: "http://localhost:8080/",
    isDebug: false
  }],
  [LIME, {
    baseUrl: ["http://localhost:3000/"],
    gatewayUrl: "http://192.168.100.8:8080/",
    isDebug: true
  }],
])

export const defineProfile = () => {
  const currentUrl = window.location.href;
  let ActiveProfile = DEV;

  for (const [profileKey, profileData] of Object.entries(PROFILES)) {
    if (profileData.baseUrl.some(url => currentUrl.startsWith(url))) {
      ActiveProfile = profileKey;
      break;
    }
  }

  console.log(ActiveProfile)
}

export const getGatewayUrl = () => {
  return PROFILES.get(ActiveProfile).gatewayUrl
}

export const isDebug = () => {
  return PROFILES.get(ActiveProfile).isDebug
}
