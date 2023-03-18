// Deps
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import { isValidPhoneNumber } from '@/node_modules/libphonenumber-js';
import _ from 'lodash';

// Dict
import { MESSAGE_DICT } from 'assets/ts/dicts/validation';

type TypeItemRules = string | {
    name: string,
    validator: (e: any) => any
    param: any
}

interface IRules {
    [key: string]: Array<TypeItemRules> | IRules
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
    required: helpers.withMessage(MESSAGE_DICT.required, required),
    email: helpers.withMessage(MESSAGE_DICT.email, email),
    phone: helpers.withMessage(MESSAGE_DICT.phone, (val: string) => isPhone(val)),
    minLength: helpers.withMessage(MESSAGE_DICT.minLength, (param: number): any => minLength(param)),
    maxLength: helpers.withMessage(MESSAGE_DICT.maxLength, (param: number): any => maxLength(param)),
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

export function useValidate(rules: IRules, value: object) {
    const actualRules = setValidations(rules);
    const $v = useVuelidate(actualRules, value);

    const initialValue = ref(_.cloneDeep(value));

    const updateValue = () => {
        initialValue.value = _.cloneDeep(value);
    };

    const getError = computed(() => (fieldPath: string) => {
        const error = $v.value.$errors.find(i => i.$propertyPath === fieldPath);

        if (!error) {
            return null;
        }

        return error.$message;
    });

    const isInvalid = computed(() => $v.value.$invalid || _.isEqual(initialValue.value, value));

    const getInvalidState = async (): Promise<boolean> => {
        const isValidated = await $v.value.$validate();

        return !isValidated || isInvalid.value;
    };
    return {
        $v,
        getError,
        getInvalidState,
        updateValue,
    };
}
