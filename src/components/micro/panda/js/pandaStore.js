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
    }), actions: {

        async getAll() {
            await pandaService.getAll().then(response => {
                this.accounts = response.data
                console.log(response.data)
                this.filterTypes()
            })
        }, async filterTypes() {
            this.types = ['All']
            this.accounts.forEach(account => {
                if (!this.types.includes(account.type)) {
                    this.types.push(account.type);
                }
            })
        },

        async save() {
            if (this.account.id === '') {
                return await pandaService.create(this.account).then(response => {
                    this.accounts.push(response.data)
                })
            } else {
                return await pandaService.update(this.account).then(response => {
                    let accountId = this.accounts.findIndex(account => account.id === response.data.id)
                    this.accounts[accountId] = response.data
                })
            }
        },

        async remove(){
            return await pandaService.delete(this.selected).then(response =>{
                this.getAll()
            })
        },

        setAccount(account) {
            this.account = account
        },
        resetAccount() {
            this.account = {
                id: '', name: '', account: '', password: '', email: '', link: '', type: '', description: ''
            }
        }
    }, getters: {
        filteredAccounts() {
            return [...this.searchUnits]
        }, filterByName() {
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
