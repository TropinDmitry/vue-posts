<template>
    <div class="app-wrapper">
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Search">

        </my-input>
        <div class="app-btns">
            <my-button class="post-btn" @click="showDialog">Создать пост</my-button>
            <my-dropdown v-model="selectedSort" :options="sortOptions"></my-dropdown>
        </div>
        
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list v-if="!isPostLoading" v-bind:posts="sortedSearchedPosts" @delete="deletePost" />
        <div v-else class="loading">Загрузка постов</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import axios from 'axios';
import PostForm from '../components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { ref } from 'vue';
import { usePosts } from '@/components/hooks/usePosts';
import useSortedPosts from '@/components/hooks/useSortedPosts';
import useSortedSearchedPosts from '@/components/hooks/useSortedSearchedPosts';
export default {
    components: {
        PostForm, PostList
    },
    
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'}
            ]
        }
    },

    setup(props) {
        const {posts, totalPages, isPostLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedSearchedPosts} = useSortedSearchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedSearchedPosts
        }
    },
    
    watch: {
        // page() {
        //     this.fetchPosts();
        // }
    }
}
</script>

<style>

.app-wrapper {
    padding: 15px;

    .main-form {
        display: flex;
        flex-direction: column;

        .btn {
            margin-top: 15px;
            align-self: flex-end;
            padding: 10px;
            border: 0;
            border-radius: 10px;
            background-color: rgb(6, 120, 87);
            color: white;
            cursor: pointer;
        }
    }

    .post-btn {
        margin: 20px 0px;
    }
}

.app-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post {
    padding: 15px;
    border: 2px solid rgb(6, 120, 87);
    margin-top: 15px;
}

.input {
    width: 100%;
    border: 1px solid rgb(6, 120, 87);
    padding: 10px 15px;
    margin-top: 10px;
}

.page-wrapper {
    display: flex;
    margin-top: 15px;

    .page {
        border: 1px solid rgb(6, 120, 87);
        padding: 10px;
    }

    .current {
        background-color: rgb(6, 120, 87);
        color: #fff;
    }
}

.observer {
    height: 80px;
    background-color: red;
}
</style>