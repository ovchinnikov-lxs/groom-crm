<script setup lang="ts">
import { modal } from '~/composables/modal';

// Constants
import { TARIFFS_KEY } from 'assets/ts/constants/tariffs';

const breadcrumbs = useBreadcrumbs();
breadcrumbs.setList([{
    title: 'Салоны',
}]);

const { $api } = useNuxtApp();
const { data: list } = await $api.salons.getList<object[]>({
    key: 'salons',
});
const { isOwner } = useUser();

function openCreateModal() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/salons/SalonSave.vue')),
    });
}

const disableCreateSalon = computed(() => {
    const { tariffCompanyIs } = useCompany();

    if (tariffCompanyIs(TARIFFS_KEY.PREMIUM)) {
        return false;
    }

    return Boolean(tariffCompanyIs(TARIFFS_KEY.BASIC) && list.value?.length);
});
</script>

<template>
    <UiPage>
        <template #header>
            <UiTooltip :disabled="!disableCreateSalon" :class="$style.button">
                <template #header>
                    <UiButton
                        v-if="isOwner"
                        :disabled="disableCreateSalon"
                        @click="openCreateModal"
                    >
                        Добавить салон
                    </UiButton>
                </template>
                <template #bottom>
                    <div :class="$style.tooltipBottom">
                        Для того чтобы создать больше одного салона,
                        оформите подписку <b>{{ TARIFFS_KEY.PREMIUM }}</b>
                    </div>
                </template>
            </UiTooltip>
        </template>

        <template #default>
            <div class="SalonsList">
                <div v-if="list.length" :class="$style.wrapper">
                    <div
                        v-for="item in list"
                        :key="item.id"
                        :class="$style.plateWrapper"
                    >
                        <SalonsPlate
                            :id="item.id"
                            :name="item.name"
                            :preview="item.preview"
                            :class="$style.plate"
                        />
                    </div>
                </div>

                <UiEmpty v-else>
                    <template #text>Вы еще не создали ни один салон</template>
                </UiEmpty>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}

.tooltipBottom {
    width: calc(var(--ui-col) * 6);
    text-align: center;

    b {
        color: var(--ui-primary-color);
    }
}

.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: calc(var(--ui-unit) * 10);
    grid-row-gap: calc(var(--ui-unit) * 10);
    width: 100%;
    height: 100%;
}

.plateWrapper {
    @include aspect-ratio(410, 360);
}

.plate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
