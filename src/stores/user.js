import {jwtDecode} from "jwt-decode";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";
import router from "@/router/index.js";

const USER = "user"
const GUEST = "guest"

const ACCEPT = "application/json"
const SIGNIN_PAGE = "./"

export const saveUserData = (data) => {
    let tokenData = jwtDecode(data.data.token)
    if (tokenData !== undefined) {
        let userData = {
            uuid: tokenData.uuid,
            email: tokenData.sub,
            firstName: data.data.user.firstname,
            lastName: data.data.user.lastname,
            status: tokenData.status,
            role: tokenData.role,
            token: data.data.token,
            expireAt: tokenData.exp,
        }
        localStorage.setItem(USER, JSON.stringify(userData))
        return true
    }
    return false
}

export const saveDebugData = () => {
        let userData = {
            uuid: "8a8ac7b4-6e1f-4677-ba83-e4acb8559a7b",
            email: "someuser@gmail.ru",
            firstName: "Some",
            lastName: "User",
            status:"ACTIVE",
            role: "ADMIN",
            token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEaXRhclJvZ296aG5pa292QGdtYWlsLmNvbSIsInV1aWQiOiI4YThhYzdiNC02ZTFmLTQ2NzctYmE4My1lNGFjYjg1NTlhN2IiLCJyb2xlIjoiQURNSU4iLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE3NTI1NzUzNjUsImV4cCI6MTc1MjU3NjI2NX0.ZmZr5ag6PD72E46Hf-4WYAMDn_gOxUb-9z9oz5HESZEf4suvsZQ9ylMkfwzDH38_1tZ1fG-UAWzviXPQFt1oWA",
            expireAt: 175257626500,
        }
        localStorage.setItem(USER, JSON.stringify(userData))
}

export const getAuthHeader = () => {
    let user = JSON.parse(localStorage.getItem(USER));
    if (!user) {
        cleanUserData()
        router.push(SIGNIN_PAGE)
    }
    return {
        Accept: ACCEPT,
        Authorization: user.token,
        UserId: user.uuid
    };
}

export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem(USER))
}

export const cleanUserData = () => {
    localStorage.removeItem(USER)
}
