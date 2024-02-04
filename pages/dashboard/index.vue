<script setup lang="ts">
useSeoMeta({
    title: 'Рабочий стол',
});

const breadcrumbs = useStoreBreadcrumbs();

breadcrumbs.setList([{
    title: 'Рабочий стол',
}]);
</script>

<template>
    <UiPage class="DashboardPage">
        <template #default>
            <div :class="$style.wrapper">
                <div>
                    Список текущих записей(которые идут прямо сейчас)
                </div>
                <div>
                    Отчеты и Аналитика:

                    Статистика загрузки мастеров.
                    Отчеты по доходам, количеству клиентов и услуг.
                    Анализ популярных услуг и мастеров.

                    Это самый большой раздел

                    Тут так же отображается таблица расходников
                </div>

                <div>
                    Система Оценок и Отзывов:
                    Оценка компании
                    Оценка салонов
                    Оценка масетров
                </div>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 700px;
    column-gap: 16px;
}
</style>
