<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import type { PropType } from 'vue';
import type { TypeSize } from 'assets/ts/types';

const loader = new Loader({
    apiKey: '',
    version: 'weekly',
});

interface IValue {
    lat: number | null
    lng: number | null
    address: string | null
}

const props = defineProps({
    modelValue: {
        type: Object as PropType<IValue>,
        default: (): IValue => ({
            lat: null,
            lng: null,
            address: null,
        }),
    },

    size: {
        type: String as PropType<TypeSize>,
        default: 'medium',
    },

    placeholder: {
        type: String,
        default: 'Введите адрес',
    },

    error: {
        type: [String, Number, null, Boolean] as PropType<string | number | null | boolean | Ref<string>>,
        default: null,
    },
});

const actualValue = ref<IValue>({
    lat: null,
    lng: null,
    address: null,
});
watch(() => props.modelValue, (value: IValue) => {
    actualValue.value = value;
}, {
    immediate: true,
});
const $emit = defineEmits<{(e: 'update:modelValue', value: IValue): void }>();

const mapRef = ref<HTMLElement | null>(null);
let map: google.maps.Map;

loader.load().then(() => {
    if (!mapRef.value) {
        return false;
    }

    map = new google.maps.Map(mapRef.value as HTMLElement, {
        center: { lat: actualValue.value.lat || 55.764381, lng: actualValue.value.lng || 37.599847 },
        zoom: 8,
        fullscreenControl: false,
        zoomControl: true,
        scrollwheel: false,
    });

    map.addListener('mouseup', (e: any) => {
        const { lat, lng } = e.latLng.toJSON();
        actualValue.value.lat = lat;
        actualValue.value.lng = lng;

        $emit('update:modelValue', actualValue.value);
    });
});

const classList = computed(() => [
    [`--${props.size}-size`],
]);

function onAddressInput(val :string) {
    actualValue.value.address = val;

    $emit('update:modelValue', actualValue.value);
}
</script>

<template>
    <div :class="classList" class="UiCoordsInput">
        <div class="UiCoordsInput__wrapper">
            <UiInput
                v-model="actualValue.address"
                :size="size"
                :placeholder="placeholder"
                :error="error"
                class="UiCoordsInput__input"
                @update:model-value="onAddressInput"
            />

            <div class="UiCoordsInput__mapWrapper">
                <div ref="mapRef" class="UiCoordsInput__map"></div>

                <UiIcon
                    name="ui/map-marker"
                    size="x-large"
                    class="UiCoordsInput__marker"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.UiCoordsInput {
    $input: &;

    &__wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    &__input {
        width: 100%;
    }

    &__mapWrapper {
        @include aspect-ratio(4, 3);

        overflow: hidden;
        width: 100%;
        transform: translate3d(0, 0, 0);
    }

    &__map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &__marker {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        color: var(--ui-primary-color);
        transform: translate3d(-50%, -100%, 0);
    }

    &.--medium-size {
        #{$input} {
            &__wrapper {
                row-gap: calc(var(--ui-unit) * 2);
            }

            &__mapWrapper {
                border-radius: calc(var(--ui-unit) * 2.5);
            }
        }
    }
}
</style>
