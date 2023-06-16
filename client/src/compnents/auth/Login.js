import { useState,useCallback } from "react"
import axios from 'axios'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



const handleLogin = useCallback(() => {
    
     axios.post('http://localhost:8080/auth/signup', {
        email: email,
        password: password
     }).then((response) => {
        console.log(response)
     })

},[email,password])


  return (
    <div>
    
         <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
      

    </div>
  )
}

export default Login