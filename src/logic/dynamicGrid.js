import store from '../store'

export const setDynamicGrid = target => {

    console.log('lalal')

    if (store.state.isMobile) {
        const pageSize = 16
        store.state.gridStyle = `grid-template-columns: repeat(1, 1fr);`
        store.state.pagination.pageSize = pageSize
        store.state.pagination.total = Math.ceil(store.state.totalItems / pageSize)
        if (store.state.pagination.actual != 1) {
            store.state.pagination.actual = 1
        }
        updatePagination()
        return
    }

    const minWidth = 325
    const minHeight = 250

    const columns = Math.floor(target.offsetWidth / minWidth)
    const rows = Math.floor(target.offsetHeight / minHeight)
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
}