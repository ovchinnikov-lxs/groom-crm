<script setup lang="ts">
import { UiImage } from '@ovchinnikov-lxs-frontend/ui-kit';
import { useLang } from '~/composables/store';
const imageUrl = 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80';

const counter = useCounter();
const lang = useLang();
function changeLang() {
    if (lang.value === 'ru') {
        lang.value = 'en';
    } else {
        lang.value = 'ru';
    }
}
</script>

<template>
    <div class="TheHeader">
        <div :class="$style.wrapper">
            <UiImage
                :origin="imageUrl"
                :class="$style.image"
            />

            {{ $lang('HELLO_WORLD') }}

            <div> counter: {{ counter }}</div>

            <div @click="changeLang">lang: {{ lang }}</div>
        </div>
    </div>
</template>


<style lang="scss" module>
.wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    column-gap: mul($unit, 4);
    font-size: mul($unit, 10);

    @include hover {
        color: red;
    }
}

.image {
    width: 50px;
    height: 50px;
}
</style>
