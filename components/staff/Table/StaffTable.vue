<script setup lang="ts">
import { IStaffItem } from '~/types/staff';

// Utils
import { splitThousands } from '~/assets/ts/utils/format-utils';

// Constants
import { ROLES_KEYS } from 'assets/ts/constants/roles';
import { USER_STATUSES_COLORS, USER_STATUSES_DISPLAY } from 'assets/ts/constants/user';

defineProps({
    list: {
        type: Array,
        default: () => [],
    },
});

const { isOwner } = useUser();

const columns = [
    { id: 'fullName', name: 'Имя и фамилия' },
    { id: 'phone', name: 'Номер телефона' },
    { id: 'status', name: 'Статус' },
    { id: 'salary', name: isOwner ? 'Зарплата' : '' },
    { id: 'roles', name: 'Роли' },
    { id: 'control', name: '' },
].map((i, index) => {
    const TEMPLATE_COLUMNS = isOwner
        ? ['25%', '15%', '15%', '15%', '20%', '10%']
        : ['30%', '20%', '25%', '0%', '20%', '5%'];

    return {
        ...i,
        width: TEMPLATE_COLUMNS[index],
    };
});
const displayStatus = (status: string): string | undefined => (USER_STATUSES_DISPLAY[status]);
const statusColor = (status: string): string | undefined => USER_STATUSES_COLORS[status];

const displaySalary = computed(() => (item: IStaffItem) => {
    const roles = item.roles.map(r => r.value);

    if (roles.includes(ROLES_KEYS.OWNER) || !isOwner) {
        return '';
    }

    if (roles.includes(ROLES_KEYS.ADMIN) && !roles.includes(ROLES_KEYS.MASTER)) {
        return `<b>${splitThousands(item.salary)} ₽</b> в месяц`;
    }

    return `<b>${item.salary}%</b> от стрижки`;
});

const emit = defineEmits<{
    update: [void]
}>();
function onEdit(value: IStaffItem) {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/staff/StaffSave.vue')),
        componentProps: {
            value,
        },
        onClose: () => emit('update'),
    });
}

async function onDelete(item: IStaffItem) {
    try {
        const { $api } = useNuxtApp();

        await $api.staff.delete(item.id);
        emit('update');
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <div class="StaffTable">
        <UiTable
            :columns="columns"
            :data="list"
            :class="$style.wrapper"
        >
            <template #full-name="itemProps: { value: keyof IStaffItem, item: IStaffItem }">
                <div :class="$style.fullName">
                    {{ itemProps.value }}
                </div>
            </template>

            <template #phone="itemProps: { value: keyof IStaffItem, item: IStaffItem }">
                <UiLink
                    tag="a"
                    color="primary-light"
                    :href="`tel:${itemProps.value}`"
                >
                    {{ itemProps.value }}
                </UiLink>
            </template>

            <template #item="itemProps: { value: keyof IStaffItem, item: IStaffItem }">
                <UiButton
                    size="x-small"
                    :color="statusColor(itemProps.value)"
                    outline
                    :class="$style.tag"
                >
                    {{ typeof itemProps.value === 'string' ? displayStatus(itemProps.value) : '' }}
                </UiButton>
            </template>

            <template #roles="itemProps: { value: keyof IStaffItem, item: IStaffItem }">
                {{ Array.isArray(itemProps.value) ? itemProps.value.map(i => i.name).join(', ') : '' }}
            </template>

            <template #salary="itemProps: { value: keyof IStaffItem, item: IStaffItem }">
                <div v-html="displaySalary(itemProps.item)">
                </div>
            </template>

            <template #control="itemProps: { value: keyof IStaffItem, item: IStaffItem }">
                <div :class="$style.control">
                    <UiTooltip v-if="isOwner" interactive>
                        <template #header>
                            <UiButton size="small" icon>
                                <UiIcon name="ui/settings"/>
                            </UiButton>
                        </template>
                        <template #bottom>
                            <div :class="$style.tooltipBottom">
                                <UiButton size="x-small" @click="onEdit(itemProps.item)">
                                    Редактировать
                                </UiButton>
                                <UiButton size="x-small" @click="onDelete(itemProps.item)">
                                    Удалить
                                </UiButton>
                            </div>
                        </template>
                    </UiTooltip>
                </div>
            </template>
        </UiTable>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    width: calc(100% + var(--ui-col) * 2);
    height: 100%;
    margin-left: calc(var(--ui-col) * -1);

    :global(.UiTable__item) {
        &:nth-child(6n + 1) {
            padding-left: var(--ui-col);
        }

        &:nth-child(6n) {
            padding-right: var(--ui-col);
        }
    }
}

.tag {
    width: fit-content;
    pointer-events: none;
}

.fullName {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 2);
}

.control {
    display: flex;
    justify-content: flex-end;
}

.tooltipBottom {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 2);
}
</style>
