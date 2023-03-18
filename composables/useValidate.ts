import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import { isValidPhoneNumber } from '@/node_modules/libphonenumber-js';

type TypeItemRules = string | {
    name: string,
    validator: (e: any) => any
    param: any
}

interface IRules {
    [key: string]: Array<TypeItemRules>
}


export function isPhone(number: string): boolean {
    if (!number) {
        return true;
    }

    return isValidPhoneNumber(number);
}

const validators: {
    [key: string]: any
} = {
    required,
    email,
    phone: (val: string) => isPhone(val),
    minLength: (param: number) => minLength(param),
    maxLength: (param: number) => maxLength(param),
};

function setValidators(arr: Array<TypeItemRules>) {
    return arr.reduce((acc: object, item) => ({
        ...acc,
        ...typeof item === 'string'
            ? { [item]: validators[item] }
            : item.validator
                ? { [item.name]: item.validator }
                : { [item.name]: validators[item.name](item.param) },
    }), {});
}

function setValidations(rules: IRules): object {
    return Object.keys(rules).reduce((acc, curField) => {
        const value = rules[curField];

        return {
            ...acc,
            [curField]: Array.isArray(value)
                ? setValidators(value)
                : setValidations(value),
        };
    }, {});
}

const validationDict: {
    [key: string]: any
} = {
    required: 'Поле обяз ',
    phone: 'Не валидный номер',
};

export function useValidate(rules: IRules, value: object) {
    const actualRules = setValidations(rules);

    const $v = useVuelidate(actualRules, value);

    const getError = computed(() => (field: string) => {
        const value = $v.value[field];

        if (!value.$dirty || !value.$errors?.length) {
            return false;
        }

        return validationDict[value.$errors[0].$validator];
    });

    return {
        $v,
        getError,
    };
}
