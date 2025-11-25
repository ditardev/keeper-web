import {defineStore} from "pinia";

export const useConstStore = defineStore("constants", {

  state: () => ({
    mask: {
      // https://beholdr.github.io/maska/v3/#/tokens
      // '#' - any number
      // '@' - any letter
      // '*' - any letter or number
      phone: "+375-##-###-##-##",
      ttn: "#########",
      // date:{
      //     day:'##',
      //     month:'##',
      //     year:"####"
      // },
      date: '####-##-##',
      time: '##:##'
    },
    const: {
      phoneMaxLength: 17,
      emailMaxLength: 50,
      passwordMaxLength: 30,
      passwordMinLength: 8,
      patternEmail: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      patternLetters: "[a-zA-Z]+",
      patternNums: "[0-9]+",
      validPhonePrefix: [
        '+375-25',
        '+375-29',
        '+375-33',
        '+375-44'
      ]
    },
    warning: {
      empty: "Не заполнено",
      phoneFormat: "Неверный формат номера телефона",
      phoneCode: "Неразрешённый код номера телефона",
      emailFormat: "Неверный формат почты",
      passwordFormat: "Неверный формат пароля. Пароль должен содержать латинские буквы и цифры",
      passwordFormatLength: "Неверный формат пароля. Пароль должен содеражать не менее 8 символов, включая латинские буквы и цифры"
    },

    rules: {
      required: value => !!value || useConstStore().warning.empty,
      phone: value => value.length === useConstStore().const.phoneMaxLength || useConstStore().warning.phoneFormat,
      phoneCode: value => useConstStore().const.validPhonePrefix.some(code => code === value.substring(0, 7)) ? true : useConstStore().warning.phoneCode,
      email: value => value.match(useConstStore().const.patternEmail) ? true : useConstStore().warning.emailFormat,
      passwordMin: value => value.length >= useConstStore().const.passwordMinLength ? true : useConstStore().warning.passwordFormatLength,
      passwordNumsAndLetrs: value => (value.match(useConstStore().const.patternLetters) && value.match(useConstStore().const.patternNums)) ? true : useConstStore().warning.passwordFormat,
    },
  }),

  actions: {},
  getters: {}
})
