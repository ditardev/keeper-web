import {getGatewayUrl} from "@/stores/app.js";
import axios from "axios";
import {getAuthUser} from "@/stores/user.js";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";
import moment from "moment";

const SERVICE_NAME = 'Panda'

const API_GET_ALL = 'api/panda/accounts/all';
const API_CREATE = 'api/panda/accounts/create';
const API_UPDATE = 'api/panda/accounts/update';
const API_DELETE = 'api/panda/accounts/delete';
const API_PASSGEN = 'api/panda/utils/generate';

const API_IMPORT = 'api/panda/accounts/import'


class PandaService {

  async getAll() {
    let url = getGatewayUrl() + API_GET_ALL
    let data = {userUUID: getAuthUser().uuid}
    return await axios.post(url, data).then(response => {
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  async create(account) {
    let url = getGatewayUrl() + API_CREATE
    let data = {userUUID: getAuthUser().uuid, data: this.converter(account)}
    return await axios.post(url, data).then(response => {
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  async update(account) {
    let url = getGatewayUrl() + API_UPDATE
    let data = {userUUID: getAuthUser().uuid, data: this.converter(account)}
    return await axios.post(url, data).then(response => {
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  async delete(idList) {
    let url = getGatewayUrl() + API_DELETE
    let data = {userUUID: getAuthUser().uuid, data: idList}
    return await axios.post(url, data).then(response => {
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  async generatePassword() {
    let url = getGatewayUrl() + API_PASSGEN
    return await axios.get(url).then(response => {
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  converter(account) {
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

  ////// File Service

  async import(importObj) {
    let url = getGatewayUrl() + API_IMPORT
    let data = {
      userUUID: getAuthUser().uuid, data: {
        type: importObj.type.toUpperCase(),
        json: importObj.json
      }
    }
    console.log(data)
    return await axios.post(url, data).then(response => {
      console.log(response)
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  async backup() {
    const response = await this.getAll();
    if (!response || !response.data) {
      return false;
    }
    const objects = response.data.map(item => {
      let account = this.converter(item);
      delete account.id;
      return account;
    });
    return {
      fileName: SERVICE_NAME + ' ' + moment().format('DD-MM-YYYY'),
      data: objects
    };
  }

  template() {
    let template = [];
    for (let i = 0; i < 2; i++) {
      template.push({
            name: '',
            account: '',
            mail: '',
            password: '',
            link: '',
            type: '',
            description: '',
          }
      )
    }
    return template
  }
}


export default new PandaService();