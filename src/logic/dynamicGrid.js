import store from '../store'
import router from '../router'

let once = false
export const setDynamicGrid = t => {

    const target = document.querySelector('#cont')

    console.log('✨✨✨')
    const route = router.currentRoute.value.name

    if (store.state.isLarge) {
        once = false
    }

    if (!store.state.isLarge && once) {
        return
    }

    if (!store.state.isLarge && !once) {
        const pageSize = 16
        store.state.gridStyle = `grid-template-columns: repeat(1, 1fr);`
        store.state.pagination.pageSize = pageSize
        store.state.pagination.total = Math.ceil(store.state.totalItems / pageSize)
        store.state.pagination.actual = 1
        once = true
        updatePagination()
        return
    }

    const minWidth = {
        home: 325,
        history: 1000
    }

    const minHeight = {
        home: 250,
        history: window.innerWidth < 1000 ? 150 : 76
    }

    const columns = Math.floor(target.offsetWidth / minWidth[route]) || 1
    const rows = Math.floor(target.offsetHeight / minHeight[route]) || 1
    const pageSize = rows * columns

    store.state.gridStyle = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr);`
    store.state.pagination.pageSize = pageSize
    store.state.pagination.total = Math.ceil(store.state.totalItems / pageSize)
    store.state.pagination.actual = 1
    updatePagination()
}

export const updatePagination = () => {
    store.state.pagination.from = (store.state.pagination.actual - 1) * store.state.pagination.pageSize
    store.state.pagination.to = store.state.pagination.from + store.state.pagination.pageSize

    if (!store.state.isLarge) {
        document.querySelector('#results').scroll({ top: 0, behavior: "smooth" })
    }
}