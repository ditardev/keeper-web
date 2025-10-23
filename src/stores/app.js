export const PROD = "prod"
export const DEV = "dev"
export const LIME = "lime"

// let ActiveProfile = PROD
let ActiveProfile = LIME
// let ActiveProfile = DEV

export const PROFILES = new Map([
    [PROD, {gatewayUrl: "http://192.168.192.194/18080/", isDebug: true}],
    [DEV, {gatewayUrl: "http://localhost:8080/", isDebug: false}],
    [LIME, {gatewayUrl: "http://192.168.100.8:8080/", isDebug: true}],
])

export const getGatewayUrl = () => {
    return PROFILES.get(ActiveProfile).gatewayUrl
}

export const defineProfile = () => {
    const currentUrl = window.location.href;
    switch (currentUrl) {
        case "http://192.168.192.194:23000/": {
            ActiveProfile = PROD
            break;
        }
        case "http://ditar-serv:23000/": {
            ActiveProfile = PROD
            break;
        }
        case "http://localhost:3000/": {
            ActiveProfile = LIME
            break;
        }
    }
    console.log(currentUrl);
    console.log(ActiveProfile)
}

export const isDebug = () => {
    return PROFILES.get(ActiveProfile).isDebug
}
