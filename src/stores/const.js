import {defineStore} from "pinia";

export const useConstStore = defineStore("constants",{
    state: () => ({
        mask:{
            unp:"#########",
            phone:"+375-##-###-##-##",
            ttn:"#########"
        },
        rules:{
            required: value => !!value || 'Не заполнено',
            phone: value => value.length === 17 || "Неверный формат номера телефона",
            phoneCode: value => ['+375-25','+375-29','+375-33','+375-44'].some(code => code === value.substring(0,7)) || "Неразрешённый код номера телефона",
            email: value => value.includes("@") || "Неверный формат почты",
            passwordMin: value => value.length >= 8 || 'Неверный формат пароля. Пароль должен содеражать не менее 8 символов, включая латинские буквы и цифры',
            passwordNumsAndLetrs: value => (value.match("[a-zA-Z]+") && value.match("[0-9]+")) || 'Неверный формат пароля. Пароль должен содержать латинские буквы и цифры',
        }
    }),

    actions: {},
    getters: {}
})
