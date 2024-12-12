<template>
    <div class="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from './components/Header.vue';

export default {
    components: {Header}
}
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

</style>