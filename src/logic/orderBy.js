import { resetPage } from './dynamicGrid'
import router from '../router'
import store from '../store'

export const orderBy = property => {

    const array = router.currentRoute.value.name == 'home' ? 'items' : 'itemsHistory'
    const type = store.state.actualOrderType == 'asc' ? -1 : 1

    store.state[array].sort((a, b) => {

        let aParsed
        let bParsed
        !isNaN(a[property]) ? aParsed = a[property] : aParsed = a[property].toLowerCase()
        !isNaN(b[property]) ? bParsed = b[property] : bParsed = b[property].toLowerCase()

        if (aParsed > bParsed) return -1 * type
        else if (aParsed < bParsed) return 1 * type
        return 0
    })

    store.state.showSideBarMobile = false
    store.state.actualOrderBy = property
    resetPage()
}