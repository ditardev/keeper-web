export const PROD = "prod"
export const DEV = "dev"
export const TEST = "test"

// let ActiveProfile = PROD
// let ActiveProfile = TEST
let ActiveProfile = DEV

export const PROFILES = new Map([
    [PROD, {gatewayUrl: "https://21post.by/", isSecure: true}],
    [DEV, {gatewayUrl: "http://localhost:8080/", isSecure: true}],
    [TEST, {gatewayUrl: "http://172.16.203.94:18080/", isSecure: true}],
])

export const getGatewayUrl = () => {
    return PROFILES.get(ActiveProfile).gatewayUrl
}

export const isSecure = () => {
    return PROFILES.get(ActiveProfile).isSecure
}
