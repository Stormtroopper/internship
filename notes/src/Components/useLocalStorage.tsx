import React, { useEffect, useState } from 'react'

function useLocalStorage<T>(key:string,initialValue:T|(()=>T)) {
const [val,setval]=useState<T>(()=>{
    const json_val=localStorage.getItem(key)
    if(json_val==null){
        if(typeof initialValue ==='function'){
            return (initialValue as()=>T)()
        }else{
            return initialValue
        }
    }
    else{
        return JSON.parse(json_val)
    }
})
useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(val))
},[val,key])
return [val,setval]as [T,typeof setval]
}

export default useLocalStorage