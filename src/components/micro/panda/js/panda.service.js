import {getGatewayUrl} from "@/stores/app.js";
import axios from "axios";
import {getAuthUser, saveUserData} from "@/stores/user.js";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";

const API_GET_ALL = 'api/panda/accounts/all';
const API_CREATE = 'api/panda/accounts/create';
const API_UPDATE = 'api/panda/accounts/update';
const API_DELETE = 'api/panda/accounts/delete';
const API_PASSGEN = 'api/panda/utils/generate'

const API_SERVICE_TYPES = 'api/panda/data/types'
const API_JSON_ADD = 'api/panda/utils/upload-add';
const API_JSON_REPLACE = 'api/panda/utils/upload-replace';

class PandaService {

    async getAll() {
        let url = getGatewayUrl() + API_GET_ALL
        let data = {userUUID: getAuthUser().uuid}
        return await axios.post(url, data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                exceptionHandler.handle(error)
            })
    }

    async create(account) {
        let url = getGatewayUrl() + API_CREATE
        let data = {userUUID: getAuthUser().uuid, data: this.saveAccountConverter(account)}
        return await axios.post(url, data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                exceptionHandler.handle(error)
            })
    }

    async update(account) {
        let url = getGatewayUrl() + API_UPDATE
        let data = {userUUID: getAuthUser().uuid, data: this.saveAccountConverter(account)}
        return await axios.post(url, data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                exceptionHandler.handle(error)
            })
    }

    async delete(idList) {
        let url = getGatewayUrl() + API_DELETE
        let data = {userUUID: getAuthUser().uuid, data: idList}
        return await axios.post(url, data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                exceptionHandler.handle(error)
            })
    }

    async generatePassword(){
        let url = getGatewayUrl() + API_PASSGEN
        return await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => {
                exceptionHandler.handle(error)
            })
    }

    saveAccountConverter(account) {
        return {
            id: account.id,
            name: account.name,
            account: account.account,
            password: account.password,
            email: account.email,
            link: account.link,
            type: account.type,
            description: account.description
        }
    }


}

export default new PandaService();