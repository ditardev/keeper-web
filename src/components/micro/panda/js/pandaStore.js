import {defineStore} from "pinia";

export const usePandaStore = defineStore('pandas', {
    state: () => ({
        searchValue: "",

        types: ['All','Games', 'JOJO'],
        selectedType: '',

        accounts: [],
    }),
    actions: {},
    getters: {
        filters(){
            return this.accounts
        }
    },
})
