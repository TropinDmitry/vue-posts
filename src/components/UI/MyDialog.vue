<template >
    <div class="dialog" v-if="show === true" @click="hideDialog">
        <div @click.stop class="dialog-container">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
    name: 'my-dialog',
    
    mixins: [toggleMixin]
}
</script>
<style scoped>
    .dialog {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
    }

    .dialog-container {
        margin: auto;
        background: #fff;
        border-radius: 10px;
        padding: 20px;
    }
</style>