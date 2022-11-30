import { useState, useEffect } from "react"

export default function useLocalStorage(key, defaultValue) {
    const [userData, setUserData] = useState({})
    const userValue = JSON.parse(localStorage.getItem("userInfo"))
  const [value, setValue] = useState(() => {
    
    


    if (userValue != null){
        const jsonValue = userValue[key]
        return jsonValue}


    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if(userValue !=null){
    userValue[key] = value
    var user 
    if(key === "subBudgets"){
        user= {subBudgets: userValue[key]}
    } else if(key==="transactions"){
        user = {transactions: userValue[key]}
    }
    const user_id = userValue._id
    fetch(`http://localhost:3003/budget/${user_id}`, 
    {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    
    }).then(res=> res.json())
    .then(stats=> {
        if(stats.status == 200){
            localStorage.clear()
            localStorage.setItem("userInfo", JSON.stringify(stats.data))
        } else{
            return alert(stats.status)
        }
    })
  
}
}, [key, value])

  return [value, setValue]
}