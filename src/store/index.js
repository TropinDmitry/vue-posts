import { createStore } from "vuex";
import { postModule } from "./_postModule";

export default createStore({
 /*   state: { // состояния
        likes: 3,
        isAuth: false
    },
    getters: { //кэшируемые вычисляемые значения
        doubleLikes(state) {
            return state.likes*2;
        }
    },
    mutations: { //здесь с помощью функций можно менять состояния
        incrementLikes(state) {
            state.likes += 1;
        },
        decrementLikes(state) {
            state.likes -= 1;
        }
    },
    actions: { //внутри используются мутации

    },*/
    state: {
        isAuth: false
    },
    
    modules: {
        post: postModule
    }

})