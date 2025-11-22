// Plugins
import vuetify from './vuetify'
import router from '@/router'

import {createPinia} from 'pinia'

import {vMaska} from "maska/vue"

//https://momentjs.com/
import moment from "moment";

import VueParticles from "@tsparticles/vue3"
// import {loadFull} from "tsparticles";
import {loadSlim} from "@tsparticles/slim";
import { loadGradientUpdater } from "tsparticles-updater-gradient";

export function registerPlugins(app) {
    app
        .use(vuetify)
        .use(router)
        .use(createPinia())
        .use(moment)
        .use(VueParticles, {
            init: async engine => {
                // await loadFull(engine);
                await loadSlim(engine);
                await loadGradientUpdater(engine);
            },
        })

    app.directive('mask', vMaska)
    // app.prototype.moment = moment
}
