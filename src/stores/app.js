export const PROD = "prod"
export const DEV = "dev"
export const LIME = "lime"

// let ActiveProfile = PROD
let ActiveProfile = LIME
// let ActiveProfile = DEV

export const PROFILES = new Map([
    [PROD, {gatewayUrl: "https://21post.by/", isSecure: true}],
    [DEV, {gatewayUrl: "http://localhost:8080/", isSecure: true}],
    [LIME, {gatewayUrl: "http://192.168.100.8:8080/", isSecure: true}],
])

export const getGatewayUrl = () => {
    return PROFILES.get(ActiveProfile).gatewayUrl
}

export const isSecure = () => {
    return PROFILES.get(ActiveProfile).isSecure
}
