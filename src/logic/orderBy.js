import { resetPage } from './dynamicGrid'
import router from '../router'
import store from '../store'

export const orderBy = property => {

    const array = router.currentRoute.value.name == 'home' ? 'items' : 'itemsHistory'
    const type = store.state.actualOrderType == 'asc' ? -1 : 1

    store.state[array].sort((a, b) => {
        if (a[property] > b[property]) return -1 * type
        else if (a[property] < b[property]) return 1 * type
        return 0
    })

    store.state.showSideBarMobile = false
    store.state.actualOrderBy = property
    resetPage()
}