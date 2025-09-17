export const API_URL = process.env.API_URL || 'http://localhost:3002'

export const getCollectorsListRequest = async (params) => {

    let url = `${API_URL}/collectors`

    // if(params){
    //     url += `?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`
    // }
    return fetch(url, {
        headers: {
            // "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(params)

    }).then(res => res.json())

}

export const getCollectorDetailRequest = async (id) => {

    let url = `${API_URL}/collectors/${id}`
    return fetch(url, {
        headers: {
            // "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
        },
        method: "GET"

    }).then(res => res.json())

}

export const createCollectorRequest = async (params) => {

    let url = `${API_URL}/collector`
    return fetch(url, {
        headers: {
            // "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(params)

    }).then(res => res.json())

}

export const deleteCollectorRequest = async (params) => {

    let url = `${API_URL}/collector/remove`
    return fetch(url, {
        headers: {
            // "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(params)

    }).then(res => res.json())

}

