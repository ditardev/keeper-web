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

//Themes
import * as darkTheme from "@/styles/themes/dark"
import * as lightTheme from "@/styles/themes/light"

//Icons
import {app_icons} from "@/styles/icons/icons.js"

const aliasesCustom = {
    ...aliases, ...app_icons
}
import NavbarPandaIcon from "@/assets/icons/vue/navbar-panda-icon.vue"
const dark = darkTheme.VALUES
const light = lightTheme.VALUES

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
        defaultTheme: 'dark',
        themes: {
            dark, light
        },
        icons: {
            defaultSet: 'mdi',
        }
    },
})
