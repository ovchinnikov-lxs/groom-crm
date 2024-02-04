<script setup lang="ts">
import type { Tables } from '~/types/supabase';

defineProps<{ list: Tables<'Profile'>[] }>();
const emit = defineEmits<{
    update: [void]
}>();

const storeProfile = useStoreProfile();
const storeModal = useStoreModal();
const storeToast = useStoreToast();

const columns = [
    { id: 'full_name', name: 'Имя и фамилия' },
    { id: 'status', name: 'Статус' },
    { id: 'salary', name: 'Зарплата' },
    { id: 'role', name: 'Позиция' },
    { id: 'control', name: '' },
].map((i, index) => {
    const TEMPLATE_COLUMNS = ['20%', '20%', '20%', '20%', '20%'];

    return {
        ...i,
        width: TEMPLATE_COLUMNS[index],
    };
});

const displayStatus = (status: Tables<'Profile'>['status']): string | undefined => (USER_STATUSES_DISPLAY[status]);
const statusColor = (status: Tables<'Profile'>['status']): string | undefined => USER_STATUSES_COLORS[status];

const displaySalary = computed(() => (item: Tables<'Profile'>) => {
    const getSalary = (val: Tables<'Profile'>['salary'], role: Tables<'Profile'>['role']) => {
        const map = new Map<Tables<'Profile'>['role'], string>([
            ['owner', `<b>${splitThousands(val)} ₽</b> в месяц`],
            ['admin', `<b>${splitThousands(val)} ₽</b> в месяц`],
            ['master', `<b>${val}%</b> от стрижки`],
        ]);

        return val ? map.get(role) : 'Не указано';
    };

    if (item.id === storeProfile.profile.id) {
        return getSalary(item.salary, item.role);
    } else if (!storeProfile.isOwner) {
        return 'Недостаточно прав';
    }

    return getSalary(item.salary, item.role);
});

const displayRole = computed(() => (role: Tables<'Profile'>['role']) => ROLES_LABELS[role]);

function onEdit(value: Tables<'Profile'>) {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/staff/Save/StaffSave.vue')),
        componentProps: {
            value,
        },
        onClose: () => emit('update'),
    });
}

async function onDelete(item: Tables<'Profile'>) {
    storeModal.open({
        type: 'confirm',
        modalProps: {
            title: 'Вы действительно хотите удалить сотрудника?',
        },
        onClose: async res => {
            if (!res) {
                return false;
            }

            try {
                await $fetch('/api/staff', {
                    method: 'DELETE',
                    body: {
                        id: item.id,
                    },
                });
                emit('update');

                storeToast.add({
                    type: 'success',
                    text: 'Сотрудник успешно удален',
                });
            } catch (e) {
                console.error('STAFF_TABLE:ON_DELETE:', e);
                storeToast.add({
                    type: 'error',
                    text: 'Упс, что то пошло не так',
                });
            }
        },
    });
}
</script>

<template>
    <div class="StaffTable">
        <UiTable
            :columns="columns"
            :data="list"
            :class="$style.wrapper"
        >
            <template #full_name="columnProps">
                <div :class="$style.fullName">
                    {{ columnProps.value }}

                    <b v-if="storeProfile.profile.id === (columnProps.item as Tables<'Profile'>).id">
                        (Вы)
                    </b>
                </div>
            </template>

            <template #status="columnProps">
                <UiButton
                    size="x-small"
                    :color="statusColor(columnProps.value)"
                    outline
                    :class="$style.tag"
                >
                    {{ displayStatus(columnProps.value) }}
                </UiButton>
            </template>

            <template #role="columnProps">
                {{ displayRole(columnProps.value) }}
            </template>

            <template #salary="columnProps">
                <div v-html="displaySalary(columnProps.item as Tables<'Profile'>)"></div>
            </template>

            <template #control="columnProps">
                <div :class="$style.control">
                    <LazyUiTooltip v-if="storeProfile.isOwner" interactive>
                        <template #header>
                            <LazyUiButton size="small" icon>
                                <LazyUiIcon name="ui/settings"/>
                            </LazyUiButton>
                        </template>

                        <template #bottom>
                            <div :class="$style.tooltipBottom">
                                <LazyUiButton size="x-small" @click="onEdit(columnProps.item as Tables<'Profile'>)">
                                    Редактировать
                                </LazyUiButton>

                                <LazyUiButton
                                    v-if="columnProps.item.id !== storeProfile.profile.id"
                                    size="x-small"
                                    @click="onDelete(columnProps.item as Tables<'Profile'>)"
                                >
                                    Удалить
                                </LazyUiButton>
                            </div>
                        </template>
                    </LazyUiTooltip>
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
        &:nth-child(5n + 1) {
            padding-left: var(--ui-col);
        }

        &:nth-child(5n) {
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
