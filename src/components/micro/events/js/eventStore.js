import {defineStore} from "pinia";
import eventsService from "@/components/micro/events/js/events.service.js";

export const useEventsStore = defineStore('events', {
  state: () => ({
    selected: [],
    searchValue: '',

    types: ['ONCE', 'DAILY', 'MONTHLY', 'YEARLY', 'BIRTHDAY'],
    selectedType: 'All',

    dataFormVisibility: false,

    events: [],

    event: {
      id: -1,
      name: '',
      date: '',
      time: '',
      notify: false,
      type: '',
      description: '',
      daysLeft: ''
    }

  }),
  actions: {
    async getAll() {
      await eventsService.getAll().then(response => {
        if (response.status) {
          this.events = response.data
        }
      })
    },
    async filterTypes() {
    },

    async save() {
      return this.event.id === -1 ? this.saveEvent() : this.updateEvent()

    },
    async saveEvent() {
      return await eventsService.create(this.event).then(response => {
        return response.status
      })
    },
    async updateEvent() {
      return await eventsService.update(this.event).then(response => {
        return response.status
      })
    },
    async remove() {
      return await eventsService.delete(this.selected).then(response => {
        if (response) {
          this.getAll()
          this.selected = []
        }
      })
    },
    async import(importObj) {
      await eventsService.import(importObj)
    },
    async backup() {
      return await eventsService.backup().then(response =>{
        return response
      })
    },
    template() {
      return eventsService.template()
    },
    convertAndValidateJson(json) {
      const failed = [];
      const objects = [];
      const failedMaxLength = 1;

      for (let i = 0; i < json.length && failed.length <= failedMaxLength; i++) {
        try {
          const item = json[i];
          const fields = ['name', 'date', 'notify', 'type', 'description'];
          let hasError = false;

          const obj = {};
          for (const field of fields) {
            if (item[field] === undefined) {
              failed.push(`unit:${i + 1}-field:${field}\n`);
              hasError = true;
            } else {
              obj[field] = item[field];
            }
          }
          if (!hasError) {
            objects.push(obj);
          }
        } catch (e) {
          failed.push("Parse JSON exception")
          break;
        }
      }

      return failed.length > 0
          ? {isValid: false, response: 'JSONTemplateError:\n' + failed}
          : {isValid: true, response: objects};
    },
  },
  getters: {
    filterByName() {
      return [...this.events].sort((a, b) => a.name?.localeCompare(b.name));
    },
    searchByType() {
      return this.selectedType !== 'All' ? [...this.filterByName].filter(unit => unit.type?.includes(this.selectedType)) : [...this.filterByName];
    },
    searchUnits() {
      const searchValue = this.searchValue?.toLowerCase() || '';
      return [...this.searchByType].filter(unit => unit.name.toLowerCase().includes(searchValue) || unit.date.includes(searchValue));
    },
    filterByLeftDays(){
      return [...this.searchUnits].sort((unit1, unit2) => unit1.daysLeft - unit2.daysLeft)
    },
    filteredEvents(){
      return [...this.filterByLeftDays]
    }
  },
})