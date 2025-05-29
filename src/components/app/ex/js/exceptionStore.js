import {defineStore} from 'pinia'

export const useExcStore = defineStore('exception', {
    state: () => ({
        isDebug: true,

        isException: false,
        exCode: '',
        exTitle: '',
        exMessage: '',

        autoCloseTime: 5
    }),
    actions: {
        clear() {
            this.isException = false
            this.exCode = ''
            this.exTitle = ''
            this.exMessage = ''
        },

        showException(code, title, message) {
            this.isException = true;
            this.exCode = code
            this.exTitle = title
            this.exMessage = message
            this.autoCloseException()
        },

        autoCloseException() {
            let counter = 0;
            let interval = setInterval(() => {
                counter++
                if (counter >= this.autoCloseTime) {
                    this.clear()
                    clearInterval(interval)
                }
            }, 1000)
        },

        testException() {
            let code = "333"
            let title = "Access Denied"
            let message = "Please call to system administrator to find out what hapened"
            this.showException(code, title, message)
            this.autoCloseException()
        },

    },
    getters: {}
})
