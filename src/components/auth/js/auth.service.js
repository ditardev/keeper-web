import {getGatewayUrl} from "@/stores/app.js";
import axios from "axios";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";
import {saveUserData} from "@/stores/user.js";

const API_SIGN_IN = "api/auth/signIn"
const API_SIGN_UP = "api/auth/signUp"
const API_SIGN_OUT = "api/auth/signOut"
const API_SIGN_RESTORE = "api/auth/signRestore"
const API_VERIFY_RESTORE = "api/auth/verifyRestore"
const API_PASSWORD_RESTORE = "api/auth/passwordRestore"
const API_AUTH_REFRESH = "api/auth/signIn"

class AuthService {

    async signIn(email, password) {
        let url = getGatewayUrl() + API_SIGN_IN
        let data = {email: email, password: password,}
        return await axios.post(url, data)
            .then(response =>{
                saveUserData(response.data)
            })
            .catch(error =>{
                exceptionHandler.handle(error)
            })
    }

    async signUp(email, password) {

    }

    async signOut() {

    }

    async signRestore(email) {

    }

    async verifyRestore(email, code) {

    }

    async passwordRestore(email, password) {

    }
}

export default new AuthService()