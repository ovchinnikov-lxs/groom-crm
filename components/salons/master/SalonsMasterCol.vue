<script setup lang="ts">
import { PropType } from 'vue';
import { IScheduleItem } from '~/components/salons/detail/SalonsDetailSchedule.vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },

    openAt: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    schedule: {
        type: Array as PropType<IScheduleItem[]>,
        default: () => [],
    },
});

const getEndTime = (bookedTime: string, serviceTime: number) => {
    const dateObj = new Date('1970/01/01 ' + bookedTime + ':00');
    dateObj.setMinutes(dateObj.getMinutes() + serviceTime);
    const updatedTime = dateObj.toLocaleTimeString('en-US', { hour12: false });
    return updatedTime.substring(0, updatedTime.length - 3);
};

const recordPosition = computed(() => (item: IScheduleItem, index: number) => {
    const nextRecord = props.schedule[index + 1];
    const prevRecord = props.schedule[index - 1];

    const currentEndTime = getEndTime(item.booked_time, item.service_time);
    let prevEndTime;

    if (prevRecord) {
        prevEndTime = getEndTime(prevRecord.booked_time, prevRecord.service_time);
    }

    if (prevEndTime !== item.booked_time && nextRecord?.booked_time !== currentEndTime) {
        return 'alone';
    }

    if (currentEndTime === nextRecord?.booked_time && prevEndTime === item.booked_time) {
        return 'middle';
    }

    if (nextRecord?.booked_time === currentEndTime || prevEndTime !== item.booked_time) {
        return 'first';
    }

    if (prevEndTime === item.booked_time && nextRecord?.booked_time !== currentEndTime) {
        return 'last';
    }
});

const recordStyleList = computed(() => (item: IScheduleItem) => {
    const TODAY = `01/01/${new Date().getFullYear()}`;
    const OPEN_AT_TIME = new Date(`${TODAY} ${props.openAt}:00`);
    const RES_TIME = new Date(`${TODAY} ${item.booked_time}:00`);

    const minutesDif = (RES_TIME.getTime() - OPEN_AT_TIME.getTime()) / 60000;

    return {
        top: `${minutesDif / 60 * 80}px`,
        '--record-height': `${item.service_time / 60 * 80}px`,
    };
});
</script>

<template>
    <div class="SalonsMasterCol">
        <div :class="$style.wrapper">

            <div :class="$style.header">
                <h4>{{ name }}</h4>
            </div>

            <div :class="$style.body">
                <SalonsMasterRecord
                    v-for="(item, index) in schedule"
                    :id="item.id"
                    :key="item.id"
                    :booked-time="item.booked_time"
                    :pet-breed="item.pet_breed"
                    :pet-name="item.pet_name"
                    :service-name="item.service_name"
                    :service-price="item.service_price"
                    :service-time="item.service_time"
                    :status="item.status"
                    :position="recordPosition(item, index)"
                    :style="recordStyleList(item)"
                    :class="$style.record"
                />
            </div>

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
    border-radius: calc(var(--ui-unit) * 5) calc(var(--ui-unit) * 5) 0 0;
    background-color: rgba(var(--ui-additional-light-color-rgb), .8);
}

.header {
    height: calc(var(--ui-unit) * 14);
    padding: calc(var(--ui-unit) * 2) calc(var(--ui-unit) * 4);
    color: var(--ui-secondary-color);
}

.body {
    position: relative;
    margin-top: calc(var(--ui-col) + 1px);
}

.record {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
}
</style>
