import router from "@/router";
import {useExcStore} from "@/components/UI/exceptions/js/exceptionStore";
import {cleanUserData} from "@/store/user.service";

class ExceptionHandler {
    handle(error) {
        if (error.response !== undefined) {
            switch (error.response.status) {
                case 400 : //Bad Request
                    this.handle400(error)
                    break;
                case 401: //Unauthorized
                    this.handle401(error)
                    break;
                case 403: //BadRequest
                    this.handle403(error)
                    break;
                case 404: //Not Found
                    this.handle404(error)
                    break;
                case 405: //Not Found
                    this.handle405(error)
                    break;
                case 406: //Not Found
                    this.handle406(error)
                    break;
                case 409 : //Conflict
                    this.handle409(error)
                    break;
                case 500 : //Internal Server Error
                    this.handle500(error)
                    break;
                case 503 : //Service Unavailable
                    this.handle503(error)
                    break;
                default:
                    this.handleDefault(error)
                    break;
            }
        } else {
            if (error.code !== 0) {
                this.handleAppError(error)
            } else {
                this.handleAppException(error)
            }
        }
    }

    handleAppError(error) {
        let exceptionTitle = 'App Error'
        this.log(error)
        this.showException(error.code, exceptionTitle, error.message)
    }

    handleAppException(error, appError) {
        let exceptionTitle = 'App Exception'
        this.log(error)
        this.showException(appError.code, exceptionTitle, appError.message)
    }

    async handle400(error) {
        let exceptionTitle = 'Bad Request'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.data.message)
    }

    handle401(error) {
        let exceptionTitle = 'Unauthorized'
        this.log(error)
        cleanUserData()
        router.push("./")
    }

    handle403(error) {
        let exceptionTitle = 'Bad Request'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.data.message)
    }

    handle404(error) {
        let exceptionTitle = 'Not Found'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.message)
    }

    handle405(error) {
        let exceptionTitle = 'Already exist'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.data.message)
    }

    handle406(error) {
        let exceptionTitle = 'Method Not Allowed'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.data.message)
    }

    handle409(error) {
        let exceptionTitle = 'Conflict'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.data.message)
    }

    handle500(error) {
        let exceptionTitle = 'Internal Server Error'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.data.message)
    }

    handle503(error) {
        let exceptionTitle = 'Service Unavailable'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, 'Сервис недоступен.')
    }

    handleDefault(error) {
        this.log('handleDefault')
        this.log(error)
    }

    handleNotLogin(error) {
        let exceptionTitle = 'Response Undefined'
        this.log(error)
        this.showException(error.response.status, exceptionTitle, error.response.message)
    }

    handleAuthLimitReached() {
        this.showException("666",
            "limitReached",
            "Превышено количество попыток. Попробуйте через 10 минут")

    }

    showException(exCode, exStatus, exMessage) {
        useExcStore().isException = true;
        useExcStore().exCode = exCode
        useExcStore().exStatus = exStatus
        useExcStore().exMessage = exMessage
    }

    log(text){
       if(useExcStore().isDebug){
           console.log(text)
       }
    }


}

export default new ExceptionHandler();
