<template>
    <div class="header">
        <h4 @click="$router.push('/')">1st vue app</h4>
        <div class="header-btns">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button @click="$router.push('/about')">О сайте</my-button>
            <my-button @click="$router.push('/store')">store</my-button>
            <my-button @click="$router.push('/composition')">composition</my-button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .header {
        height: 80px;
        background-color: rgb(105, 195, 217);
        display: flex;
        align-items: center;
        padding: 0 20px;

        .header-btns {
            margin-left: auto;
            display: flex;
            gap: 20px;
        }
    }
</style>