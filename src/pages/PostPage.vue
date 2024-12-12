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
        <post-list v-if="!isPostLoading" v-bind:posts="sortedAndSearchedPosts" @delete="deletePost" />
        <div v-else class="loading">Загрузка постов</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page-wrapper">
            <div v-for="pageNum in totalPages"
                :key="pageNum"
                class="page"
                :class="{'current': page === pageNum}"
                @click="changePage(pageNum)"
            >
                {{ pageNum }}
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';
import PostForm from '../components/PostForm.vue';
import PostList from '@/components/PostList.vue';
export default {
    components: {
        PostForm, PostList
    },
    
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: true,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limitPage: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'}
            ]
        }
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },

        deletePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },

        showDialog() {
            this.dialogVisible = true;
        },
        
        async fetchPosts() {
            try{
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limitPage,
                        }
                    }
                );
                this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limitPage);
                
                this.posts = responce.data;
                
            } catch (e) {
                alert(`Ошибка ${e}`);
            } finally {
                this.isPostLoading = false;
            }
        },
        async loadMorePosts() {
            try{
                this.page += 1;
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limitPage,
                        }
                    }
                );
                this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limitPage);
                
                this.posts = [...this.posts, ...responce.data];
                
            } catch (e) {
                alert(`Ошибка ${e}`);
            } finally {
                this.isPostLoading = false;
            }
        },

        // changePage(pageNum) {
        //     this.page = pageNum;
        // }
    },

    mounted() {
        this.fetchPosts();

    },

    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
        },

        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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