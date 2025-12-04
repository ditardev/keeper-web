import moment from "moment";
import {getRequest, postRequest, putRequest} from "@/stores/http.js";

const API_ROUTES = {
  ALL: 'api/panda/accounts/all',
  CREATE: 'api/panda/accounts/create',
  UPDATE: 'api/panda/accounts/update',
  DELETE: 'api/panda/accounts/delete',
  IMPORT: 'api/panda/accounts/import',
  PASSGEN: 'api/panda/utils/generate',
};

const SERVICE_NAME = 'Panda'

class PandaService {

  // --- API Методы ---

  async getAll() {
    return postRequest(API_ROUTES.ALL);
  }

  async create(account) {
    const payload = { data: this.converter(account) };
    return postRequest(API_ROUTES.CREATE, payload);
  }

  async update(account) {
    const payload = { data: this.converter(account) };
    return putRequest(API_ROUTES.UPDATE, payload);
  }

  async delete(idList) {
    const payload = { data: idList };
    return postRequest(API_ROUTES.DELETE, payload);
  }

  async generatePassword(){
    return getRequest(API_ROUTES.PASSGEN)
  }

  // --- Вспомогательные методы ---

  async import(importObj) {
    const payload = {
      data: {
        type: importObj.type.toUpperCase(),
        json: importObj.json,
      },
    };
    return postRequest(API_ROUTES.IMPORT, payload);
  }

  converter(account) {
    const { id, ...rest } = account;
    return {
      ...rest,
      ...(id !== -1 && { id }),
    };
  }

  async backup() {
    const response = await this.getAll();
    if (!response || !response.data) {
      return false;
    }
    const objects = response.data.map(item => {
      const { id, ...event } = item;
      return event;
    });
    return {
      fileName: SERVICE_NAME + ' ' + moment().format('DD-MM-YYYY'),
      data: objects
    };
  }

  template() {
    const eventTemplate = {
      id: '', name: '', date: '', time: '',
      notify: false, type: '', description: '', daysLeft: ''
    };
    return Array(2).fill(null).map(() => ({ ...eventTemplate }));
  }
}


export default new PandaService();