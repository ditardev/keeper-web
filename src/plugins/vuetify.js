// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
// Composables
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {aliases, mdi} from "vuetify/lib/iconsets/mdi";

import * as config from "@/styles/themes/config"

//Icons
import {app_icons} from "@/styles/icons/icons.js"

import '@/styles/settings.scss'
import {defineProfile} from "@/stores/app.js";

const aliasesCustom = {
  ...aliases, ...app_icons
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliasesCustom
    },
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: defineTheme(),
    themes: config.colorThemes,
    icons: {
      defaultSet: 'mdi',
    }
  },
  styles: {
    configFile: '@/styles/settings.scss',
  },
})

export function defineTheme() {
  defineProfile()
  config.initInterval()
  return config.currentTheme
}
