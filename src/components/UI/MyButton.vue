<template>
    <button class="btn" type="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
            align-self: flex-end;
            padding: 10px;
            border: 0;
            border-radius: 10px;
            background-color: rgb(6, 120, 87);
            color: white;
            cursor: pointer;
        }
</style>