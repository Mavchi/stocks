export let token = null

export const setToken = newToken => {
    token = `bearer ${newToken}`
}