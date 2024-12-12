<template>
    <div class="post">
        <div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="btns-wrapper">
            <my-button @click="$router.push(`/posts/${post.id}`)" class="post-btn">
                Открыть
            </my-button>
            <my-button @click="$emit('delete', post)" class="post-btn">
                Удалить
            </my-button>
        </div>
    </div>
</template>

<script>
export default {
    //components: {MyButton},
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style scoped>
.post {
    display: flex;
    padding: 15px;
    border: 2px solid rgb(6, 120, 87);
    margin-top: 15px;
    align-items: center;
    justify-content: space-between;

    .btns-wrapper {
        display: flex;

        .post-btn {
            align-self: flex-end;
            padding: 10px;
            border: 0;
            border-radius: 10px;
            background-color: rgb(154, 26, 6);
            color: white;
            cursor: pointer;
        }
    }

    
}
</style>