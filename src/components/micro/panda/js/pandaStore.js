import {defineStore} from "pinia";
import pandaService from "@/components/micro/panda/js/panda.service.js";

export const usePandaStore = defineStore('pandas', {
    state: () => ({
        searchValue: "",

        types: ['All'],
        selectedType: 'All',

        dataFormVisibility: true,

        accounts: [],
    }),
    actions: {
        async getAll() {
            await pandaService.getAll().then(response => {
                this.accounts = response.data
                this.filterTypes()
            })
        },
        async filterTypes() {
            this.types = ['All']
            this.accounts.forEach(account => {
                if (!this.types.includes(account.type)) {
                    this.types.push(account.type);
                }
            })
        }
    },
    getters: {
        filteredAccounts() {
            return [...this.searchUnits]
        },
        filterByName() {
            return [...this.accounts].sort((a, b) => a.name?.localeCompare(b.name));
        },

        searchByType() {
            return this.selectedType !== 'All'
                ? [...this.filterByName].filter(unit => unit.type?.includes(this.selectedType))
                : [...this.filterByName];
        },

        searchUnits() {
            const searchValue = this.searchValue?.toLowerCase() || '';
            return [...this.searchByType].filter(unit =>
                unit.name.toLowerCase().includes(searchValue) ||
                unit.password.toLowerCase().includes(searchValue)
            );
        },

    },
})
