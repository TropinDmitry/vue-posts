import { computed, ref } from "vue";

export default function useSortedSearchedPosts(sortedPosts) {
    const searchQuery = ref('');
    const sortedSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));    })

    return {
        searchQuery, sortedSearchedPosts
    }
}