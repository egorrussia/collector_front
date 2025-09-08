import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useAuthContext } from "./Auth";

const MainContext = createContext();

export const MainProvider = ({ children }) => {

    const { user } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [rules, setRules] = useState([])
    const [groups, setGroups] = useState([])
    const [priceRules, setPriceRules] = useState([])

    const startGroup = (params) => {

        return new Promise((resolve, reject) => {
            setLoading(true)
            fetch(`${API_URL}/groups/start`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(params)
            }).then(res => res.json())
                .then(data => {
                    setLoading(false)
                    if (data.item) {
                        resolve(data.item)
                    } else {
                        reject("произошла ошибка при запуске группы")
                    }
                })
        })

    }

    const stopGroup = (params) => {

        return new Promise((resolve, reject) => {
            setLoading(true)
            fetch(`${API_URL}/groups/stop`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(params)
            }).then(res => res.json())
                .then(data => {
                    setLoading(false)
                    if (data.status) {
                        resolve(data.item)
                    } else {
                        reject("произошла ошибка при приостановке группы")
                    }
                })
        })

    }

    const createGroup = (params) => {

        return new Promise((resolve, reject) => {
            setLoading(true)
            fetch(`${API_URL}/groups/create`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(params)
            }).then(res => res.json())
                .then(data => {
                    setLoading(false)
                    if (data.item) {
                        resolve(data.item)
                    } else {
                        reject("произошла ошибка при создании группы")
                    }
                })
        })

    }

    const loadGroups = () => {

        setLoading(true)
        let url = `${API_URL}/groups`
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            method: "GET"

        }).then(res => res.json())
            .then(data => {
                setLoading(false)
                if (data.items) {
                    setGroups(data.items)
                }
            })
    }

    const loadPriceRules = () => {

        setLoading(true)
        let url = `${API_URL}/price-rules`
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            method: "GET"

        }).then(res => res.json())
            .then(data => {
                setLoading(false)
                if (data.items) {
                    setPriceRules(data.items)
                }
            })
    }

    const createPriceRule = (params) => {

        setLoading(true)
        let url = `${API_URL}/price-rules`
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(params)

        }).then(res => res.json())
        .then(data => {
            setLoading(false)
            if (data.item) {
                loadPriceRules()
            }

        })
    }

    const deletePriceRule = (id) => {

        setLoading(true)
        let url = `${API_URL}/price-rules/${id}`
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            method: "DELETE"

        }).then(res => res.json())
        .then(data => {
            setLoading(false)
            if (data.item) {
                loadPriceRules()
            }

        })
    }

    const value = {
        startGroup,
        rules,
        setRules,
        loading,
        setLoading,
        createGroup,
        loadGroups,
        groups,
        stopGroup,
        loadPriceRules,
        priceRules,
        createPriceRule,
        deletePriceRule
  
    }

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    )

}





export const useMainContext = () => useContext(MainContext)