import axios from 'axios';

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: true,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limitPage: 10,
        totalPages: 0,
        sortOptions: [
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По содержимому' }
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },

        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool;
        },
        setSelectedSort(state, sort) {
            state.selectedSort = sort;
        },
        setSearchQuery(state, query) {
            state.searchQuery = query;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, total) {
            state.totalPages = total;
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try{
                commit('setLoading', true);
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limitPage,
                        }
                    }
                );
                commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limitPage));
                
                commit('setPosts', responce.data);
                
            } catch (e) {
                alert(`Ошибка ${e}`);
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try{
                commit('setPage', state.page + 1);
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limitPage,
                        }
                    }
                );
                commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limitPage));
                
                commit('setPosts', [...state.posts, ...responce.data]);
                
            } catch (e) {
                alert(`Ошибка ${e}`);
            }
        },
    },
    namespaced: true
}