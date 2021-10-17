import store from '../store'

export const changeColor = color => {

    store.state.actualColor = color
    localStorage.setItem('themeColor', color)
}