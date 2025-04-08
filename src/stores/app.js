// Utilities
import { defineStore } from 'pinia'

import {useTheme} from 'vuetify'
const theme = useTheme()

export const useAppStore = defineStore('app', {
  state: () => ({

  }),
  actions: {
    toggleTheme(){
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  getters:{}
})
