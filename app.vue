<script setup lang="ts">
useSeoMeta({
    titleTemplate: titleChunk => titleChunk ? `${titleChunk} - ${COMPANY_NAME}` : COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
});

const storeTariffs = useStoreTariffs();

await callOnce(async () => {
    await Promise.all([
        storeTariffs.fetchInitial(),
    ]);
});
</script>

<template>
    <div class="AppInstance">
        <NuxtLoadingIndicator color="repeating-linear-gradient(to right, var(--ui-primary-light-color) 0%, var(--ui-additional-light-color) 50%, var(--ui-primary-color) 100%)" />
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>

        <UiModal :class="$style.modal"/>
        <UiToast :class="$style.toast"/>
    </div>
</template>

<style lang="scss" module>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
}

.toast {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
}
</style>
