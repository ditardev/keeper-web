import {defineStore} from 'pinia'

export const useExcStore = defineStore('exception', {
  state: () => ({
    isDebug:true,

    isException: false,
    exCode: '',
    exTitle: '',
    exMessage: '',

    interval: {},
    autoCloseTime: 5
  }),
  actions: {
    clear() {
      this.isException = false
      this.exCode = ''
      this.exTitle = ''
      this.exMessage = ''
    },

    showException(code, title, message){
      this.isException = true;
      this.exCode = code
      this.exTitle = title
      this.exMessage = message
      this.autoCloseException()
    },

    autoCloseException(){
      let time = this.autoCloseTime
      this.interval = setInterval(() => {
        if (time <= 1) {
          this.clear()
          clearInterval(this.interval)
        }else{
          time -= 1
        }
      }, 1000)
    },

    testException(){
      this.isException = !this.isException
      this.exCode = "333"
      this.exStatus = "Access Denied"
      this.exMessage = "Please call to system administrator to find out what hapened"
      this.autoCloseException(5)
    },

  },
  getters: {}
})
