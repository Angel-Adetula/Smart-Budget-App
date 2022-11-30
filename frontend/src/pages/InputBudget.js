import React, {useRef} from "react";
import { useState} from "react";
import { useLocation, useNavigate} from "react-router-dom";




const InputBudget  = () => {
    const location = useLocation()
    let navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(location.state)


    const initialBudget = {
        catergory: "Total",
        value: 0,
        currentValue:0
    }
    const [selectedOptions, setSelectedOptions] = useState([{
        category: "Uncatergorized",
        value: 0,
        currentValue: 0,
    }])
    
    const[budgetTotal, setBudgetTotal] = useState(initialBudget)


    
    const mainBudget = useRef();
    const chooseSubBudget = useRef()
    const subBudgets= useRef()

    const handleMainInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let pastbudget = {...budgetTotal};
        pastbudget[name] = value;
        setBudgetTotal(pastbudget)

        
    }

    const handleCheckBox = (name) => {
        {console.log(userInfo)}
        const check = selectedOptions.filter(option => option.category == name)
        console.log(check)
            if (check.length == 0) {
                const subs =
                    {
                        category: name,
                        value: 0,
                        currentValue: 0,
                    }
                    
                    setSelectedOptions(oldArray => [...oldArray, subs])
            } else {
                setSelectedOptions(oldArray => oldArray.filter(option=> option.category != name))
            }
    }

    const handleSubInputChange= (e) => {
        e.preventDefault();
        const updateValue = selectedOptions.map(option=> {
            if(option.category == e.target.name){
                return {...option, value: e.target.value}
            }
            return option;
        });
        setSelectedOptions(updateValue);

    }

    const scrollToSection = (next) => {

        window.scrollTo({
            top: next.current.offsetTop,
            behavior: 'smooth'
        });
        }


    const handleSubmit = (event) => {
        event.preventDefault();

        var sumSubBudgets = 0
        selectedOptions.map(option => {
            console.log(sumSubBudgets)
            sumSubBudgets += parseInt(option.value)
        })
        if(sumSubBudgets > parseInt(budgetTotal.value)){
            alert("Sum of catergorized budget larger than total monthly budget")
        } else {
            const userData = {mainbudget: budgetTotal, subBudgets: selectedOptions, completeBudget: true}
            const user_id = userInfo._id.toLowerCase()
            console.log(user_id)
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
                return navigate('/checklist', {state:stats.data})
            } else{
                return alert(stats.status)
            }
        })

        }
    }


    return (
        <div style={{
        padding: '20px',
        display: 'flex',
        height: '100%',
        width: '100%',
        color: 'blue',
        justifyContent: 'center',
        backgroundColor: 'white',
        backgroundClip: "content-box",
        boxShadow: "inset 0 0 0 20px navy",
        }}
        >
      
        <form onSubmit={handleSubmit}>
            <div className="form-group" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'navy',
            height: '800px',
            gap: "10px",
            float: "center",
            }} ref={mainBudget}>
                    <label for="monthBudget" style ={{
                    display: "block",
                    width: "500px",
                    textAlign: "left",
                    fontSize:"20px",
                    fontFamily:"cursive",
            }}>
                
                    Monthly Budget: </label> 
                    <input name="value" type="number" min="0" required class="form-control" id="monthlyBudget" value = {budgetTotal.value} placeholder="Enter a monthly budget" onChange={handleMainInputChange} style= {{minWidth: "400px", outlineColor:'blue'}}>
                    </input>
                
                <button type ="button" style={{backgroundColor: "transparent", border: "none", backgroundRepeat:"no-repeat"}}  onClick={()=>scrollToSection(chooseSubBudget)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="navy" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </button>

            </div>
            
            <div style={{
            backgroundColor:"navy",
            height:"20px",
            }}></div>

            <div className="form-group" ref= {chooseSubBudget}
            style={{
            alignItems: 'center',
            display:"flex",
            flexDirection: "column",
            justifyContent: 'center',
            color: 'blue',
            height: '800px',
            gap: "10px",
            float: "center",
            }} >
                <p style ={{
                    width: "500px",
                    textAlign: "left",
                    display: "block",
                    fontSize:"20px",
                    fontFamily:"cursive",                  
            }}> Choose Frequent Monthly Expenses </p>
   
                    <div class="form-check" style={{alignSelf:"left"}}>
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Groceries")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Groceries
                        </label>
                    </div>
                    <div class="form-check" style={{alignSelf:"left"}}>
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Toiletries")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Toiletries
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Coffee")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Coffee
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Food")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Food
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Gas")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Gas
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Clothes")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Clothes
                        </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Rent")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Rent
                        </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Hair")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Hair
                        </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={()=> handleCheckBox("Subscriptions")}/>
                        <label class="form-check-label" for="defaultCheck1">
                        Subscriptions
                        </label>
                    </div>

                    <div style={{display:"flex", width:"100%"}}>
                    <button type ="button" style={{backgroundColor: "transparent", border: "none", backgroundRepeat:"no-repeat"}}  onClick={()=>scrollToSection(mainBudget)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="navy" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                <button type ="button" style={{backgroundColor: "transparent", border: "none", backgroundRepeat:"no-repeat", alignSelf:"flex-end"}}  onClick={()=>scrollToSection(subBudgets)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="navy" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </button>
                </div>
            </div>
            <div style={{
            backgroundColor:"navy",
            height:"20px",
            }}></div>
            <div>
            {selectedOptions.length > 0 &&
                 <div class="form-group" style={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'blue',
                    height: '800px',
                    gap: "10px",
                    }} ref = {subBudgets}>
                    {selectedOptions.map((option, index) => (
                       <div>
                      <label for="monthBudget">
                    
                        {option.category} </label> 
                        <input type="number" min="0" required class="form-control" value = {option.value} name={option.category} onChange={handleSubInputChange}  style= {{minWidth: "400px", outlineColor:'blue'}}>
                        </input>
                       </div>
                    ))}
                    <button type ="button" style={{backgroundColor: "transparent", border: "none", backgroundRepeat:"no-repeat"}}  onClick={()=>scrollToSection(chooseSubBudget)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="navy" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                     </div> 
            }
            </div>
            

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    
    </div>
    )
}

export default InputBudget;