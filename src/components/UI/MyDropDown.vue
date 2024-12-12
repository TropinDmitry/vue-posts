<template>
    <select class="dropdown" :value="modelValue" @change="changeOption">
        <option disabled>Выберите из списка</option>
        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>
<script>
export default {
    name: 'my-dropdown',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        changeOption(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    }
}
</script>
<style>
    .dropdown {
        height: fit-content;
        padding: 10px;
    }
</style>