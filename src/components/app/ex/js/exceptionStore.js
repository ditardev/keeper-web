import {defineStore} from 'pinia'

export const useExcStore = defineStore('exception', {
  state: () => ({
    isDebug:true,
    isException: false,
    exCode: '',
    exStatus: '',
    exMessage: '',
  }),
  actions: {
    clear() {
      this.isException = false
      this.exCode = ''
      this.exStatus = ''
      this.exMessage = ''
    },
    autoCloseException(time){

    },
    testException(){
      this.isException = true
      this.exCode = "333"
      this.exStatus = "Access Denied"
      this.exMessage = "Please call to system administrator to find out what hapened"
    }
  },
  getters: {}
})
