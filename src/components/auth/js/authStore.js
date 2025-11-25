import {defineStore} from "pinia";
import authService from "@/components/auth/js/auth.service.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: '',
    password: '',
  }),
  actions: {
    signIn() {
      return authService.signIn(this.email, this.password)
    },
    async signUp() {
      return authService.signUp(this.email, this.password)
    },
    async signOut() {
      return authService.signOut()
    },
    async signRestore() {
      return authService.signRestore(this.email)
    },
    async verifyRestore() {
      return authService.verifyRestore(this.email, this.code)
    },
    async passwordRestore() {
      return authService.passwordRestore(this.email, this.password)
    },

    clearStoreData() {
      this.email = ''
      this.password = ''
    }
  },
  getters: {}
})

