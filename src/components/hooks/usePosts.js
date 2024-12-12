import axios from "axios";
import { onMounted, ref } from "vue";

export function usePosts(limitPage) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostLoading = ref(true);

    const fetching = async () => {
        try {
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limitPage,
                }
            }
            );
            totalPages.value = Math.ceil(responce.headers['x-total-count'] / limitPage);

            posts.value = responce.data;

        } catch (e) {
            alert(`Ошибка ${e}`);
        } finally {
            isPostLoading.value = false;
        }
    }

    onMounted(fetching);

    return {
        posts, isPostLoading, totalPages
    }
}