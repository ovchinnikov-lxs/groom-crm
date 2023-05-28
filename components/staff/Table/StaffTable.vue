<script setup lang="ts">
import { IStaffItem } from 'assets/ts/types/staff';

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

const columns = [
    { id: 'fullName', name: 'Имя и фамилия' },
    { id: 'phone', name: 'Номер телефона' },
    { id: 'status', name: 'Статус' },
    { id: 'salary', name: 'Зарплата' },
    { id: 'roles', name: 'Роли' },
    { id: 'control', name: '' },
];

const displayStatus = (status: string): string | undefined => (USER_STATUSES_DISPLAY[status]);
const statusColor = (status: string): string | undefined => USER_STATUSES_COLORS[status];

const displaySalary = computed(() => (item: IStaffItem) => {
    const roles = item.roles.map(r => r.value);

    if (roles.includes(ROLES_KEYS.OWNER)) {
        return '';
    }

    if (roles.includes(ROLES_KEYS.ADMIN)) {
        return `<b>${splitThousands(item.salary)} ₽</b> в час`;
    }

    return `<b>${item.salary}%</b> от стрижки`;
});

const { isOwner } = useUser();

const emit = defineEmits<{
    update: [void]
}>();
function onEdit(value: IStaffItem) {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/staff/StaffSave.vue')),
        componentProps: {
            method: 'PATCH',
            value,
            onCloseModal: () => emit('update'),
        },
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
            template-columns="25% 15% 15% 15% 20% 10%"
            :data="list"
            :class="$style.wrapper"
        >
            <template #item="itemProps: {columnField: string, value: keyof IStaffItem, item: IStaffItem }">
                <div v-if="itemProps.columnField === 'fullName'" :class="$style.fullName">
                    {{ itemProps.value }}
                </div>

                <UiLink
                    v-if="itemProps.columnField === 'phone'"
                    tag="a"
                    color="primary-light"
                    :href="`tel:${itemProps.value}`"
                >
                    {{ itemProps.value }}
                </UiLink>

                <UiButton
                    v-if="itemProps.columnField === 'status'"
                    size="x-small"
                    :color="statusColor(itemProps.value)"
                    outline
                    :class="$style.tag"
                >
                    {{ typeof itemProps.value === 'string' ? displayStatus(itemProps.value) : '' }}
                </UiButton>


                <div v-if="itemProps.columnField === 'roles'">
                    {{ Array.isArray(itemProps.value) ? itemProps.value.map(i => i.name).join(', ') : '' }}
                </div>

                <div v-if="itemProps.columnField === 'salary'" v-html="displaySalary(itemProps.item)">
                </div>

                <div v-if="itemProps.columnField === 'control'" :class="$style.control">
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
