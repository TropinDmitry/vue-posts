<template>
    <div class="app-wrapper">
        <!-- <h2>{{ $store.state.post.limitPage }}</h2>
        <h1>{{ $store.state.isAuth ? "Авторизован" : "Нужна авторизация" }}</h1>
        <h1>{{ $store.getters.doubleLikes }}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
        </div> -->
        <h1>Страница с постами</h1>
        <my-input 
            :model-value="searchQuery" 
            @update:model-value="setSearchQuery"
            placeholder="Search..."
        ></my-input>
        <div class="app-btns">
            <my-button class="post-btn" @click="showDialog">Создать пост</my-button>
            <my-dropdown :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></my-dropdown>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list 
            v-if="!isPostLoading" 
            v-bind:posts="sortedAndSearchedPosts" 
            @delete="deletePost" 
        />
        <div v-else class="loading">Загрузка постов</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page-wrapper">
            <div v-for="pageNum in totalPages" :key="pageNum" class="page" :class="{ 'current': page === pageNum }"
                @click="changePage(pageNum)">
                {{ pageNum }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        PostForm, PostList
    },

    data() {
        return {
            dialogVisible: false,
        }
    },

    methods: {
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            setPosts: 'post/setPosts'
        }),

        createPost(post) {
            this.posts.unshift(post);
            this.dialogVisible = false;
        },

        deletePost(post) {
            this.setPosts(this.posts.filter(p => p.id !== post.id));
        },

        showDialog() {
            this.dialogVisible = true;
        },



        // changePage(pageNum) {
        //     this.page = pageNum;
        // }
    },

    mounted() {
        this.fetchPosts();

    },

    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limitPage: state => state.post.limitPage,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
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