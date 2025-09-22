import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const API_URL = process.env.API_URL || "http://localhost:3002";

const AuthContext = createContext();

const setIntoStorage = (user) => {
    localStorage.setItem("collector-user", JSON.stringify(user))
}

const getFromStorage = () => {

    if (typeof window === 'undefined') {
        return { user: null};
    }

    try {
        const userStr = localStorage.getItem("collector-user");
        if (userStr) {
            return {
                user: JSON.parse(userStr),
            };
        }
        return { user: null};

    } catch (error) {
        console.error('Ошибка чтения из localStorage:', error);
        return { user: null};
    }
};

const deleteFromStorage = () => {
    localStorage.clear("collector-user")
}

export const AuthProvider = ({ children }) => {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = ({ login, password }) => {
        fetch(`${API_URL}/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login, password
            }),
            method: "POST"

        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    setUser({
                        ...data.result
                    })
                    setIntoStorage({
                        ...data.result
                    })
                    setIsLoading(false)
                }

            })


    }

    const logout = () => {
        setUser({})
        router.push("/signin")
        deleteFromStorage()

    }

    useEffect(() => {
        const userData = getFromStorage();
        setUser(userData);
        setIsLoading(false);
    }, []);


    const value = {
        user,
        isLoading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext)
