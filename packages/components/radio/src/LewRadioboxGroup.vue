<template>
    <lew-flex
        x="start"
        gap="15px"
        class="lew-radio-group"
        :class="`lew-radio-group-${direction}`"
    >
        <lew-radio
            v-for="option in options"
            :key="option.value"
            :block="block"
            :iconable="iconable"
            :label="option.label"
            :checked="modelValue == option.value"
            @update:checked="check(option.value)"
        />
    </lew-flex>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import LewRadio from './LewRadio.vue';

type Options = {
    label: string;
    value: string;
};

defineProps({
    modelValue: {
        type: String,
        default: () => {
            return '';
        },
        required: true,
    },
    block: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    iconable: {
        type: Boolean,
        default: true,
    },
    direction: {
        type: String,
        default: 'x',
    },
    options: {
        type: Array as PropType<Options[]>,
        default: () => {
            return [];
        },
        required: true,
        validator: (value: Array<number>) => {
            const hasNameKey = value.every((option) =>
                Object.keys(option).includes('label'),
            );
            const hasIdKey = value.every((option) =>
                Object.keys(option).includes('value'),
            );
            return hasNameKey && hasIdKey;
        },
    },
});

const emit = defineEmits(['update:modelValue']);

const check = (_value: string) => {
    emit('update:modelValue', _value);
};
</script>

<style lang="scss" scoped>
.lew-radio-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0px;
}

.lew-radio-group.lew-radio-group-x {
    flex-direction: row;
}

.lew-radio-group.lew-radio-group-y {
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
}
</style>
