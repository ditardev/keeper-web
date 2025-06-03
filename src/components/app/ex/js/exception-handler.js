import router from "@/router";
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";
import {cleanUserData} from "@/stores/user.js";

const TITLE_400 = 'Bad Request'
const TITLE_401 = 'Unauthorized'
const TITLE_403 = 'Bad Request'
const TITLE_404 = 'Not Found'
const TITLE_405 = 'Already exist'
const TITLE_406 = 'Method Not Allowed'
const TITLE_409 = 'Conflict'
const TITLE_500 = 'Internal Server Error'
const TITLE_503 = 'Service Unavailable'
const TITLE_APP_ERR = 'App Error'
const TITLE_APP_EXC = 'App Exception'
const TITLE_DEFAULT = 'Something went wrong'
const TITLE_AUTH_LIMIT_REACHED = 'Limit Reached'
const TITLE_RESPONCE_UNDEFINED = 'Response Undefined'

const MESSAGE_LIMIT_REACHED = 'Превышено количество попыток. Попробуйте через 10 минут'

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
        this.log(error)
        this.showException(error.code, TITLE_APP_ERR, error.message)
    }

    handleAppException(error, appError) {
        this.log(error)
        this.showException(appError.code, TITLE_APP_EXC, appError.message)
    }

    async handle400(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_400, error.response.data.message)
    }

    handle401(error) {
        this.log(error)
        cleanUserData()
        router.push("./")
    }

    handle403(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_403, error.response.data.message)
    }

    handle404(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_404, error.response.message)
    }

    handle405(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_405, error.response.data.message)
    }

    handle406(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_406, error.response.data.message)
    }

    handle409(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_409, error.response.data.message)
    }

    handle500(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_500, error.response.data.message)
    }

    handle503(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_503, '')
    }

    handleDefault(error) {
        this.log(TITLE_DEFAULT)
        this.log(error)
    }

    handleNotLogin(error) {
        this.log(error)
        this.showException(error.response.status, TITLE_RESPONCE_UNDEFINED, error.response.message)
    }

    handleAuthLimitReached() {
        this.showException("","666",
            TITLE_AUTH_LIMIT_REACHED,
            MESSAGE_LIMIT_REACHED)
    }

    showException(exCode, exTitle, exMessage) {
        useExcStore().showException(exCode, exTitle, exMessage)
    }

    log(error){
       if(useExcStore().isDebug){
           console.log(error)
       }
    }

}

export default new ExceptionHandler();
