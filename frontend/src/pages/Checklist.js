import React, {useState, useEffect} from "react";
import "../App.css"
import { useLocation, useNavigate} from "react-router-dom";

const Checklist  = () => {
    const newLocation = useLocation()
    let navigate = useNavigate()

    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")))
    const [budgetComplete, setBudgetComplete]= useState(userInfo.completeBudget)

    const navigateToBudget = () => {
        if(budgetComplete == false){
            return navigate("/inputbudget", {state:userInfo})
        }
    }

    const checkConnectedStatus = async function () {
        try {
          const connectedResponse = await fetch(`http://localhost:8000/api/is_user_connected`)
          const connectedData = await connectedResponse.json();
          console.log(JSON.stringify(connectedData));
          if (connectedData.status === true) {
            const user_id = userInfo._id.toLowerCase()
            const userData = {connectAccount: true}

            fetch(`http://localhost:3003/budget/${user_id}`, 
            {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            
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
        } catch (error) {
          console.error(`We encountered an error: ${error}`);
        }
      };
    function connectBank() {

        window.location.replace("http://localhost:8000/connect.html")
      }

      useEffect(() => {
        //Runs on every render
        checkConnectedStatus();
      });
    return(
        <div style= {{color: "blue", backgroundColor: "white"}}>
            <div>
                {checkConnectedStatus}
                <h1 style= {{paddingLeft: "20px"}}>Checklist </h1>
            </div>
            <div className="row">
                <div className = "col" style = {{padding:"10px", marginLeft:"20px"}}>
                    <img src ={require('./images/bank.png')} alt="bank-icon" class="img-fluid img-rounded" onClick={connectBank} style={{cursor: "pointer",}}/>
                    <div style={{display:"flex", gap:"10px"}}>
                    <p style={{textIndent: "170px"}}>  Connect your bank</p>
                    {userInfo.connectAccount && 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                    }
                    </div>
                </div>
                <div className = "col" style = {{padding:"10px", marginRight:"20px"}}>
                    <img src = {require("./images/budget.png")} alt= "budget-icon" className= "img-rounded img-fluid" onClick={navigateToBudget} style={{cursor: "pointer",}}/>
                    <div style={{display:"flex", gap:"10px"}}>
                    <p style={{textIndent: "170px"}}> Create your budget </p>
                    {budgetComplete && 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                    }
                    </div>
                    {budgetComplete &&
                    <button type ="button" style={{backgroundColor: "blue", border: "none", backgroundRepeat:"no-repeat"}} onClick={()=>navigate("/budget")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </button>}
                </div>
            </div>
        </div>
    )
}


export default Checklist;