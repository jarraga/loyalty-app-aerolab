const baseUrl = 'https://coding-challenge-api.aerolab.co'
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY0YzhjYWI4MzgxZDAwMWEzYjU1ZDciLCJpYXQiOjE2MzM5OTQ5NTR9.LqaqjExHBGaTCOr0mFjNiKr6fW7DnAYWCK7o7LNZNww"
const headers = { Authorization: `Bearer ${token}` }

export const getUserInfo = async () => {
    const response = await fetch(`${baseUrl}/user/me`, { headers })
    const data = await response.json()
    return data
}

export const getItems = async () => {
    const response = await fetch(`${baseUrl}/products`, { headers })
    const data = await response.json()
    return data
}

export const addPoints = async (amount) => {
    const response = await fetch(`${baseUrl}/user/points`, {
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
    })
    const data = await response.json()
    return { newPoints: data['New Points'] }
}

export const getHistory = async () => {
    const response = await fetch(`${baseUrl}/user/history`, { headers })
    const data = await response.json()
    return data
}

export const redeem = async (productId) => {
    const response = await fetch(`${baseUrl}/redeem`, {
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    if (response.status == 200) {
        return true
    } else {
        return false
    }
}