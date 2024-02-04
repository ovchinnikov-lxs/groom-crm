const ROLES_KEYS = {
    OWNER: 'owner',
    ADMIN: 'admin',
    MASTER: 'master',
};

const ROLES_LABELS = {
    [ROLES_KEYS.OWNER]: 'Владелец',
    [ROLES_KEYS.ADMIN]: 'Администратор',
    [ROLES_KEYS.MASTER]: 'Мастер',
};

const ROLES_OPTIONS = Object.keys(ROLES_LABELS).map(id => ({
    id,
    name: ROLES_LABELS[id],
}));

export {
    ROLES_KEYS,
    ROLES_LABELS,
    ROLES_OPTIONS,
};
