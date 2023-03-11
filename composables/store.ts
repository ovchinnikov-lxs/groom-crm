export const useCounter = () => useState<number>('counter', () => 0);

export const useLang = () => useState<'ru' | 'en'>('lang', () => 'ru');
