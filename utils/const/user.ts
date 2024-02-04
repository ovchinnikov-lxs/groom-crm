const USER_STATUSES_TYPES = {
    ACTIVE: 'active',
    BLOCKED: 'blocked',
    PENDING: 'pending',
};

const USER_STATUSES_DISPLAY = {
    [USER_STATUSES_TYPES.ACTIVE]: 'Подтвержден',
    [USER_STATUSES_TYPES.BLOCKED]: 'Заблокирован',
    [USER_STATUSES_TYPES.PENDING]: 'Не подтвержден',
};

const USER_STATUSES_COLORS = {
    [USER_STATUSES_TYPES.ACTIVE]: 'success',
    [USER_STATUSES_TYPES.BLOCKED]: 'error',
    [USER_STATUSES_TYPES.PENDING]: 'additional',
};

export {
    USER_STATUSES_TYPES,
    USER_STATUSES_DISPLAY,
    USER_STATUSES_COLORS,
};
