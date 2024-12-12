<template>
    <form @submit.prevent class="main-form">
        <h4>Создать пост</h4>
        <my-input
            v-focus
            v-model="post.title"
            type="text"
            placeholder="Название"
        ></my-input>
        <my-input
            v-model="post.body" 
            type="text" 
            placeholder="Описание"
        ></my-input>
        <my-button @click="createPost" class="btn">Создать</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            }
        }
    }
}
</script>

<style scoped>
.app-wrapper {
    padding: 15px;

    .main-form {
        display: flex;
        flex-direction: column;

        
    }
}

.input {
    width: 100%;
    border: 1px solid rgb(6, 120, 87);
    padding: 10px 15px;
    margin-top: 10px;
}
</style>