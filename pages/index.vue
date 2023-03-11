<script setup lang="ts">
// UiComponents
import { UiButton } from '@ovchinnikov-lxs-frontend/ui-kit';

const counter = useCounter();
</script>
<template>
    <div class="IndexPage">
        <div :class="$style.wrapper">
            Index Page

            <UiButton @click="counter++">
                increment counter
            </UiButton>
        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>
