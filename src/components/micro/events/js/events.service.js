import {getGatewayUrl} from "@/stores/app.js";
import {getAuthUser} from "@/stores/user.js";
import axios from "axios";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";
import moment from "moment";


const SERVICE_NAME = 'Events'

const API_GET_ALL = 'api/events/all';
const API_CREATE = 'api/events/create';
const API_UPDATE = 'api/events/update';
const API_DELETE = 'api/events/delete';

const API_IMPORT = 'api/events/import'

class EventsService {

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

  async create(event) {
    let url = getGatewayUrl() + API_CREATE
    let data = {userUUID: getAuthUser().uuid, data: this.converter(event)}
    return await axios.post(url, data).then(response => {
      return response.data
    }).catch(error => {
      exceptionHandler.handle(error)
      return false
    })
  }

  async update(event) {
    let url = getGatewayUrl() + API_UPDATE
    let data = {userUUID: getAuthUser().uuid, data: this.converter(event)}
    return await axios.put(url, data).then(response => {
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

  converter(event) {
    const {id, ...rest} = event;
    return {
      ...rest,
      ...(id !== -1 && {id}),
    };
  }

  async import(importObj) {
    let url = getGatewayUrl() + API_IMPORT
    let data = {
      userUUID: getAuthUser().uuid, data: {
        type: importObj.type.toUpperCase(),
        json: importObj.json
      }
    }
    return await axios.post(url, data).then(response => {
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
      let event = this.converter(item);
      delete event.id;
      delete event.daysLeft;
      return event;
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
            id: '',
            name: '',
            date: '',
            time: '',
            notify: false,
            type: '',
            description: '',
            daysLeft: ''
          }
      )
    }
    return template
  }
}

export default new EventsService();
