import langDict from 'assets/ts/constants/lang';
import { useLang } from '~/composables/store';

interface IDict {
    [key: string]: {
        ru: string,
        en: string,
    }
}

export default defineNuxtPlugin(() => {
    const dict: IDict = langDict;
    const lang = useLang();

    return {
        provide: {
            lang: (key: string) => dict[key][lang.value],
        },
    };
});
