<script setup lang="ts">
import { modal } from '~/composables/modal';

function onClose(id: string) {
    modal.close(id);
}

</script>

<template>
    <!--    todo: Как появится следующая модалка - переделать логику    -->
    <div class="DefaultModal">
        <transition-group
            tag="div"
            name="f"
            :class="$style.wrapper"
        >
            <component
                :is="defineAsyncComponent(item.component)"
                v-for="item in modal.list"
                :key="item.id"
                v-bind="item.props"
                :class="$style.item"
                @click.self="onClose(item.id)"
                @close="onClose(item.id)"
            />
        </transition-group>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
}

.item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: calc(var(--ui-unit) * 20) 0;
    background-color: rgba(var(--ui-black-color-rgb), .5);
    pointer-events: auto;
}
</style>
