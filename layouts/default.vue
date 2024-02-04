<script setup lang="ts">
const user = useSupabaseUser();
const storeGlobal = useStoreGlobal();
const storeProfile = useStoreProfile();
const storeCompany = useStoreCompany();
const storeModal = useStoreModal();

await callOnce(async () => {
    await Promise.all([
        storeGlobal.fetchInitial(),
    ]);
});

watch(user, value => {
    if (!value) {
        return navigateTo('/auth/login');
    }
}, { immediate: true });


onMounted(() => {
    const contactsFillModal = ref('');
    const companyFillModal = ref('');

    watch(() => storeCompany.detail.name, val => {
        if (!val) {
            companyFillModal.value = storeModal.open({
                component: defineAsyncComponent(() => import('~/components/company/Popup/CompanyPopupContactsFill.vue')),
                modalProps: {
                    closable: false,
                },
            });
        } else if (companyFillModal.value) {
            storeModal.close(companyFillModal.value, true);
            companyFillModal.value = '';
        }
    }, { immediate: true });

    watch(() => storeProfile.profile.full_name, val => {
        if (!val) {
            contactsFillModal.value = storeModal.open({
                component: defineAsyncComponent(() => import('~/components/profile/Popup/ProfilePopupContactsFill.vue')),
                modalProps: {
                    closable: false,
                },
            });
        } else if (contactsFillModal.value) {
            storeModal.close(contactsFillModal.value, true);
            contactsFillModal.value = '';
        }
    }, { immediate: true });
});
</script>

<template>
    <div :class="$style.DefaultLayout">
        <DefaultMenu/>

        <div :class="$style.page">
            <main class="container">
                <slot />
            </main>
        </div>
    </div>
</template>

<style lang="scss" module>
.DefaultLayout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}

.page {
    overflow: auto;
    flex-grow: 1;
    padding: calc(var(--ui-unit) * 4) 0;
}
</style>
