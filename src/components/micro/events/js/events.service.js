import moment from "moment";
import {postRequest, putRequest} from "@/stores/http.js";

const API_VERSION = 'v1'
const API_ROUTES = {
  ALL: '/events/all',
  CREATE: '/events/create',
  UPDATE: '/events/update',
  DELETE: '/events/delete',
  IMPORT: '/events/import',
};

const SERVICE_NAME = 'Events';

class EventsService {

  // --- API Методы ---

  async getAll() {
    return postRequest(API_VERSION, API_ROUTES.ALL);
  }

  async create(event) {
    const payload = { data: this.converter(event) };
    return postRequest(API_VERSION, API_ROUTES.CREATE, payload);
  }

  async update(event) {
    const payload = { data: this.converter(event) };
    return putRequest(API_VERSION, API_ROUTES.UPDATE, payload);
  }

  async delete(idList) {
    const payload = { data: idList };
    return postRequest(API_VERSION, API_ROUTES.DELETE, payload,);
  }

  async import(importObj) {
    const payload = {
      data: {
        type: importObj.type.toUpperCase(),
        json: importObj.json,
      },
    };
    return postRequest(API_VERSION, API_ROUTES.IMPORT, payload);
  }

  // --- Вспомогательные методы ---

  converter(event) {
    const { daysLeft, id, ...rest } = event;
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
      const { id, daysLeft, ...event } = item;
      return event;
    });

    return {
      fileName: SERVICE_NAME + ' ' + moment().format('DD-MM-YYYY'),
      data: objects,
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

export default new EventsService();