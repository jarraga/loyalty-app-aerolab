import { createStore } from 'vuex'

export default createStore({
    state: {
        userName: '',
        userPoints: 0,
        pagination: {
            from: 0,
            to: 0,
            actual: 1,
            pageSize: 0,
            total: 0
        },
        totalItems: 0,
        gridStyle: '',
        isMobile: false,
        doingSomething: false,
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})