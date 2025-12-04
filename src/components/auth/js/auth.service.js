import {saveUserData} from "@/stores/user.js";
import {postRequest, putRequest} from "@/stores/http.js";

const API_ROUTES = {
  SIGN_IN: 'api/auth/signIn',
  SIGN_UP: 'api/auth/signUp',
  SIGN_OUT: 'api/auth/signOut',
  RECOVER: 'api/auth/signRestore',
  CHECK: 'api/auth/verifyRestore',
  VERIFY: 'api/auth/passwordRestore',
  REFRESH: 'api/auth/signIn',
};

class AuthService {

  async signIn(email, password) {
    return postRequest(API_ROUTES.SIGN_IN, {email: email, password: password}).then(response => {
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