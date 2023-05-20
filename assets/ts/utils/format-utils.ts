const leadingZero = (num: number): number | string => num < 10 ? `0${num}` : num;

const plural = (num: number, postfixes: Array<string>) => {
    if (!num && isNaN(num)) {
        console.warn('[plural] Wrong Number ', num);
        return '';
    }

    if (num < 0) {
        num = Math.abs(num);
    }

    const cases = [2, 0, 1, 1, 1, 2];
    return postfixes[num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]];
};

function splitThousands<T extends string | number>(val: T, separator = ' ') {
    if (val === '' || val === null) {
        return '';
    }

    if (typeof val !== 'string' && isNaN(val)) {
        return val;
    }

    const prefix = Number(val) < 0 ? '-' : '';

    let [
        numerator,
        // eslint-disable-next-line prefer-const
        fractional,
    ] = Math.abs(Number(val))
        .toString()
        .split('.');

    numerator = numerator
        .replace(/\s/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return `${prefix}${numerator}${fractional ? `.${fractional}` : ''}`;
}


export {
    splitThousands,
    leadingZero,
    plural,
};
