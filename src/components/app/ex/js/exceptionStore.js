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
    testException(){
      this.isException = true
      this.exCode = "333"
      this.exStatus = "TestCodeStatus"
      this.exMessage = "Warning, it's a test message for testing some exception layer. please do not desturb the programmer about it"
    }
  },
  getters: {}
})
