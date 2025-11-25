import {defineStore} from "pinia";
import pandaService from "@/components/micro/panda/js/panda.service.js";

export const usePandaStore = defineStore('pandas', {
  state: () => ({

    selected: [],
    searchValue: '',

    types: ['All'],
    selectedType: 'All',

    dataFormVisibility: false,

    accounts: [],
    account: {
      id: '',
      name: '',
      account: '',
      password: '',
      email: '',
      link: '',
      type: '',
      description: ''
    }
  }),

  actions: {

    async getAll() {
      await pandaService.getAll().then(response => {
        if (response) {
          this.accounts = response.data
          this.filterTypes()
        }
      })
    },

    async filterTypes() {
      this.types = ['All']
      this.accounts.forEach(account => {
        if (!this.types.includes(account.type)) {
          this.types.push(account.type);
        }
      })
    },

    async save() {
      return this.account.id === '' ? this.saveAccount() : this.updateAccount()
    },

    async saveAccount() {
      return await pandaService.create(this.account).then(response => {
        if (response) {
          this.accounts.push(response.data)
        }
      })
    },

    async updateAccount() {
      return await pandaService.update(this.account).then(response => {
        if (response) {
          let accountId = this.accounts.findIndex(account => account.id === response.data.id)
          this.accounts[accountId] = response.data
        }
      })
    },

    async remove() {
      return await pandaService.delete(this.selected).then(response => {
        if (response) {
          this.getAll()
          this.selected = []
        }
      })
    },

    async import(importObj) {
      await pandaService.import(importObj)
    },

    async backup() {
      return await pandaService.backup().then(response => {
        return response
      })
    },

    template() {
      return pandaService.template()
    },

    async generatePassword() {
      return await pandaService.generatePassword().then(response => {
        if (response) {
          this.account.password = response.data
        }
      })
    },

    resetAccount() {
      this.account = {
        id: '', name: '', account: '', password: '', email: '', link: '', type: '', description: ''
      }
    },

    convertAndValidateJson(json) {
      const failed = [];
      const objects = [];
      const failedMaxLength = 1;

      for (let i = 0; i < json.length && failed.length <= failedMaxLength; i++) {
        try {
          const item = json[i];
          const fields = ['name', 'account', 'email', 'password', 'link', 'type', 'description'];
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
    }
  }, getters: {

    filteredAccounts() {
      return [...this.searchUnits]
    },

    filterByName() {
      return [...this.accounts].sort((a, b) => a.name?.localeCompare(b.name));
    },

    searchByType() {
      return this.selectedType !== 'All' ? [...this.filterByName].filter(unit => unit.type?.includes(this.selectedType)) : [...this.filterByName];
    },

    searchUnits() {
      const searchValue = this.searchValue?.toLowerCase() || '';
      return [...this.searchByType].filter(unit => unit.name.toLowerCase().includes(searchValue) || unit.password.toLowerCase().includes(searchValue));
    },

  },
})
