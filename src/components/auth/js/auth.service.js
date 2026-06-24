import {saveUserData} from "@/stores/user.js";
import {postRequest, putRequest} from "@/stores/http.js";

const API_VERSION = 'v1'
const API_ROUTES = {
  SIGN_IN: '/auth/signIn',
  SIGN_UP: '/auth/signUp',
  SIGN_OUT: '/auth/signOut',
  RECOVER: '/auth/signRestore',
  CHECK: '/auth/verifyRestore',
  VERIFY: '/auth/passwordRestore',
  REFRESH: '/auth/signIn',
};

class AuthService {

  async signIn(email, password) {
    return postRequest(API_VERSION, API_ROUTES.SIGN_IN, {email: email, password: password}).then(response => {
      return saveUserData(response)
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