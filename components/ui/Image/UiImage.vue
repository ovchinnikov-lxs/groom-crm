<script setup lang="ts">
import type { Nullable } from '~/types';
/**
 * TODO:
 * 1) Добавить провайдера
 * 2) Добавить норм управление lazy
 * 3) Да и вообще все пропсы вынести и так же для свайпера тоже сделать логику,
 * для дальнейшего переноса в nuxt3-template
 */
const props = withDefaults(defineProps<{
    hasPreview?: boolean;
    src?: Nullable<string>;
    storageId?: string;
    external?: boolean;
    width?: string;
    height?: string;
}>(), {
    hasPreview: true,
    src: '',
    storageId: '',
    width: '',
    height: '',
});

const PLACEHOLDER_IMAGE = '/images/image-placeholder.webp';

const actualSrc = computed(() => {
    if (props.external || !props.storageId || !props.src) {
        return props.src || PLACEHOLDER_IMAGE;
    }

    // TODO: МБ это куда то перенести
    const supabase = useSupabaseClient();

    const { data: { publicUrl } } = supabase.storage.from(props.storageId).getPublicUrl(props.src);

    return publicUrl || PLACEHOLDER_IMAGE;
});

function onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = PLACEHOLDER_IMAGE;
}
</script>

<template>
    <img
        v-bind="$attrs"
        :src="actualSrc"
        :width="width"
        :height="height"
        :alt="String($attrs?.alt) || ''"
        loading="lazy"
        class="UiImage"
        @error="onImageError"
    />
</template>
