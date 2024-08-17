import { useEffect, useState } from 'react'

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const jsValue = localStorage.getItem(key)
        if (jsValue != null) return JSON.parse(jsValue)
        if (typeof defaultValue === "function") return defaultValue()
        else return defaultValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}

export default useLocalStorage