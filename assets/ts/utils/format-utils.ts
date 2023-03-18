const leadingZero = (num: number): number | string => num < 10 ? `0${num}` : num;

export {
    leadingZero,
};
