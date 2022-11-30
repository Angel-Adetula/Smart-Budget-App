import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';

const Login  = () => {
    const returningUserForm = {_id : "", password: ""}
    const [verifyUser, setVerifyUser] = useState(returningUserForm)
    const [status, setStatus] = useState({})
    const [returningUser, setReturningUser] = useState({})

    let navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVerifyUser({
          ...verifyUser,
          [name]: value,
        });
      }
    
    function handleSubmit(event) {
        event.preventDefault();
        localStorage.clear()

        fetch(`http://localhost:3003/budget/${verifyUser._id}/${verifyUser.password}`)
        .then(res=> res.json())
        .then(stats=> {
            if(stats.status== 200){
                if(stats.message == "Not found."){
                    alert("Credentials not valid.")
                } else {
                    console.log(stats.message)
                    localStorage.setItem("userInfo", JSON.stringify(stats.message))
                    return navigate('/checklist', {state:stats.message})
                }
            } else {
                console.error('error %d : %s', stats.status, stats.message)
            }
        })
        
        
        
    }
    return (
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'blue',
        backgroundColor: 'white',
        backgroundClip: "content-box",
        boxShadow: "inset 0 0 0 20px navy",
        }}
        >
      
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" required className="form-control" id="user-email"  name="_id" aria-describedby="emailHelp" placeholder="example@email.com" value={verifyUser._id} onChange={handleInputChange}>
                </input>
            </div>
            <div class="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"required className="form-control" id="exampleInputPassword1" name ="password" placeholder="Password" value={verifyUser.password} onChange={handleInputChange}>
                </input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    
    </div>
    )
}

export default Login;