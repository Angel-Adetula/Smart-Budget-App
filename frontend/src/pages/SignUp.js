import React, { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';

const SignUp  = () => {
    let navigate = useNavigate()
    const newUserForm= {
        _id:"",
        firstname:"",
        lastname:"",
        password: "",
        mainbudget: {},
        subBudgets: [],
        completeBudget: false,
        connectAccount: false,
        transactions: [],
    }

    const [newUser, setNewUser] = useState(newUserForm)
    const [userInfo, setUserInfo] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
          ...newUser,
          [name]: value,
        });
      }

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.clear()
        fetch("http://localhost:3003/budget", 
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        
        }).then(res=> res.json())
        .then(stats=> {
            if(stats.status == 400) {
                if (stats.message.slice(0, 6) == 'E11000') {
                    return alert("This email already has an account. Please log in")
                } else {
                    return alert(stats.message)
                }
            } else {
                localStorage.setItem("userInfo", JSON.stringify(newUser))
                return navigate('/checklist', {state:newUser})
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
                    <label htmlFor="firstname">First name</label>
                    <input type="text" required className="form-control" name="firstname" placeholder="Enter your first name" value={newUser.firstname} onChange={handleInputChange}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" required className="form-control" name="lastname" placeholder="Enter your last name" value={newUser.lastname} onChange={handleInputChange}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="useremail">Email address</label>
                    <input type="email" required className="form-control" name="_id" aria-describedby="emailHelp" placeholder="example@email.com" value={newUser._id} onChange={handleInputChange}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" required className="form-control" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange}>
                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        
        </div>
    )
}

export default SignUp;