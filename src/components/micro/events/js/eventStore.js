import {defineStore} from "pinia";
import eventsService from "@/components/micro/events/js/events.service.js";

export const useEventsStore = defineStore('events', {
  state: () => ({
    selected: [],
    searchValue: '',

    types: ['All'],
    selectedType: 'All',

    dataFormVisibility: false,

    events: [
      {
        id: '',
        name: 'Свадьба Димы и Тани',
        date: '28-08-2026',
        startTime: '23:00',
        endTime: '24:00',
        notify: true,
        type: 'BIRTHRAY',
        description: 'test',
        daysLeft:'365'
      }
    ],

    event: {
      id: '',
      name: '',
      date: {
        day:'',
        month:'',
        year:''
      },
      time: '',
      notify: false,
      type: '',
      description: '',
      daysLeft:''
    }
  }),
  actions: {
    async getAll() {},
    async filterTypes() {},
    async save() {},
    async saveEvent() {},
    async updateEvent() {},
    async remove() {},
    async import(importObj){},
    async backup() {},
    template(){},
    resetEvent() {},
    convertAndValidateJson(json) {},
  },
  getters: {
    filteredEvents() { return [...this.events]},
    filterByName() {},
    searchByType() {},
    searchUnits() {},
  },
})