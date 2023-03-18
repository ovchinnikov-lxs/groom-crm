const MESSAGE_DICT = {
    required: 'Поле является обязательным',
    email: 'Неправильный формат e-mail',
    phone: 'Неправильный формат телефона',
    minLength: ({ $params }: any) => `Минимальное кол-во символов — ${$params.min}`,
    maxLength: ({ $params }: any) => `Максимальное кол-во символов — ${$params.min}`,
};

export {
    MESSAGE_DICT,
};
