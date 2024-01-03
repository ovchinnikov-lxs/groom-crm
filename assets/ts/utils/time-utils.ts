import { leadingZero } from '~/assets/ts/utils/format-utils';

export const milliseconds = 1000;
export const minuteSeconds = 60;
export const minuteMilliseconds = 60 * milliseconds;
export const hourSeconds = 60 * minuteSeconds;
export const hourMilliseconds = milliseconds * hourSeconds;
export const daySeconds = 24 * hourSeconds;
export const dayMilliseconds = milliseconds * daySeconds;

export const getMinutesMilliseconds = (minutes: number): number => minuteMilliseconds * minutes;
export const getHoursMilliseconds = (hours: number): number => hourMilliseconds * hours;
export const getDaysMilliseconds = (days: number): number => dayMilliseconds * days;

export const resetDate = (date: Date): Date => {
    const regex = /[0-9]{0-2}\.[0-9]{0-2}\.[0-9]{0-4}/gm;
    const [day, month, year] = date
        ? date.toString().split(/\./g)
        : [];

    const d = date && date.toString().match(regex)
        ? new Date(`${year}-${month}-${day}`)
        : new Date(date);

    d.setHours(0, 0, 0, 0);

    return d;
};

export const getTime = (date: Date): number => {
    const d = date ? new Date(date) : new Date();
    return d.getTime();
};

export const yesterdayDate = (): Date => {
    const todayTime = getTime(resetDate(new Date()));
    return new Date(todayTime - dayMilliseconds);
};

export const tomorrowDate = () => {
    const todayTime = getTime(resetDate(new Date()));
    return new Date(todayTime + dayMilliseconds);
};

export const dayList = (index: number, short?: boolean) => {
    const fullList = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];

    const shortList = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ];

    return short ? shortList[index] : fullList[index];
};

export const monthList = (index: number, short?: boolean, plural?: boolean) => {
    const fullList = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

    const pluralList = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    const shortList = [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ];

    if (short) {
        return shortList[index];
    }

    return plural ? pluralList[index] : fullList[index];
};

export const isValidDate = (date: string): boolean => !isNaN(Date.parse(date));

export const formatDateTime = (date: string, pattern: string) => {
    if (!date) {
        return '';
    }

    const d = isValidDate(date) ? new Date(date) : new Date();

    const params: {
        [key: string]: string | number
    } = {
        // Date
        $d: leadingZero(d.getDate()), // Day of the month, 2 digits with leading zeros. // '01' to '31'
        $j: d.getDate(), // Day of the month without leading zeros. // '1' to '31'

        // Days of the week
        $D: dayList(d.getDay(), true), // Day of the week, textual, 3 letters. // 'Пн', 'Вт'
        $l: dayList(d.getDay()), // Day of the week, textual, long. // 'Пятница'

        // Month
        $m: leadingZero(d.getMonth() + 1), // Month, 2 digits with leading zeros. // '01' to '12'
        $n: d.getMonth() + 1, // Month without leading zeros. // '1' to '12'
        $M: monthList(d.getMonth(), true), // Month, textual, 3 letters. // 'Янв'
        $b: monthList(d.getMonth(), true).toLowerCase(), // Month, textual, 3 letters, lowercase. // 'янв'
        $F: monthList(d.getMonth()), // Month, textual, long. // 'Январь'
        $E: monthList(d.getMonth(), false, true), // Month, plural, long. // 'Января'
        $e: monthList(d.getMonth(), false, true).toLowerCase(), // Month, plural, long, lowercase // 'января'

        // Year
        $y: d.getFullYear(), // Year, 4 digits. // 1993

        // Time
        // Hours
        $g: Math.floor(d.getHours() / 2), // Hour, 12-hour format without leading zeros. // '1' to '12'
        $G: d.getHours(), // Hour, 24-hour format without leading zeros. // '0' to '23'
        $h: leadingZero(Math.floor(d.getHours() / 2)), // Hour, 12-hour format. // '01' to '12'
        $H: leadingZero(d.getHours()), // Hour, 24-hour format. // '01' to '23'

        // Minutes
        $i: d.getMinutes(), // Minutes, without leading zeros. // '1' to '59'
        $I: leadingZero(d.getMinutes()), // Minutes. // '01' to '59'

        // Seconds
        $s: d.getSeconds(), // Seconds, without leading zeros. // '1' to '59'
        $S: leadingZero(d.getSeconds()), // Seconds. // '1' to '59'
    };

    const symbols = pattern.match(/[$][a-zA-Z]/gm) || [];
    let result = pattern;

    symbols.forEach(s => {
        result = result.replace(s, String(params[s]));
    });

    return result;
};

export function getNumberOfDays(start: string, end: string) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    const diffInTime = getTime(date2) - getTime(date1);

    return Math.round(diffInTime / dayMilliseconds);
}
