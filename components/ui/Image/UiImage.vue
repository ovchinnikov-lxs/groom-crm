<script setup lang="ts">
/**
 * TODO:
 * 1) Добавить провайдера
 * 2) Добавить норм управление lazy
 * 3) Да и вообще все пропсы вынести и так же для свайпера тоже сделать логику,
 * для дальнейшего переноса в nuxt3-template
 */
defineProps({
    hasPreview: {
        type: Boolean,
        default: true,
    },

    src: {
        type: String,
        default: '',
    },
});

const img = useImage();
</script>

<template>
    <NuxtImg
        :placeholder="hasPreview ? img(`/images/skeleton.svg`) : false"
        :src="src"
        class="UiImage"
        loading="lazy"
    />
</template>
