import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import router from './router'
import messages from './locales/messages';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages
});

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
