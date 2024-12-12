import AboutPage from "@/pages/AboutPage.vue";
import ItemPostPage from "@/pages/ItemPostPage.vue";
import MainPage from "@/pages/MainPage.vue";
import PostPage from "@/pages/PostPage.vue";
import PostPageCompositionAPI from "@/pages/PostPageCompositionAPI.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/posts/:id',
        component: ItemPostPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionAPI
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;