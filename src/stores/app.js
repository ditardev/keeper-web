export const PROD = "prod"
export const DEV = "dev"
export const LIME = "lime"

// let ActiveProfile = PROD
let ActiveProfile = LIME
// let ActiveProfile = DEV

export const PROFILES = new Map([
    [PROD, {gatewayUrl: "https://21post.by/", isDebug: true}],
    [DEV, {gatewayUrl: "http://localhost:8080/", isDebug: false}],
    [LIME, {gatewayUrl: "http://192.168.100.8:8080/", isDebug: true}],
])

export const getGatewayUrl = () => {
    return PROFILES.get(ActiveProfile).gatewayUrl
}

export const defineProfile = () => {
    const currentUrl = window.location.href;
    console.log(currentUrl);
}

export const isDebug = () => {
    return PROFILES.get(ActiveProfile).isDebug
}
