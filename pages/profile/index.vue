<script setup lang="ts">
useSeoMeta({
    title: 'Профиль',
});

const breadcrumbs = useStoreBreadcrumbs();

breadcrumbs.setList([{
    title: 'Профиль',
}]);
</script>

<template>
    <UiPage class="ProfilePage">
        <template #default>
            <div :class="$style.wrapper">
                <!--                TODO: Это реализовать в дашборде-->
                <!--                <i>-->
                <!--                    Возможно вывести краткую статистику о работе в этой организации, например: Стаж или еще что нить,-->
                <!--                    но не финансовую часть, так как она отображается в разделе "Финансы"-->
                <!--                    <br/>-->
                <!--                    <br/>-->
                <!--                    Добавить породы и услуги может только владелец или администратор-->
                <!--                    -->
                <!--                </i>-->

                <div :class="$style.bottom">
                    <ProfileFormInfo :class="$style.form"/>
                    <!--                    TODO: ХЗ как это сделать пока что, у нас только мыло да ссыль для входа-->
                    <!--                    <ProfileFormSecurity :class="$style.form"/>-->
                </div>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 8);
}

.bottom {
    display: flex;
    column-gap: calc(var(--ui-unit) * 18);
}

.form {
    width: calc(var(--ui-col) * 12);
}
</style>
