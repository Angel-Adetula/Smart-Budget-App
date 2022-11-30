import React from "react";
import "../App.css";

const Welcome  = () => {
    return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        height: "100vh",
        justifyContent: 'center',
        backgroundColor: 'navy',
        }}>
        <div className="container">
        <div className="row">
                <div className = "col-8" style = {{padding:"20px", textAlign:"left", color: "white"}}>
                <h1 style={{position: "absolute", bottom: "270px", left: "20px", fontSize: "75px"}}>Smart Budget</h1>
                </div>
                <div className="col-4" style = {{padding:"10px",}}>
                <img src ={require('./images/saving-icon.png')} alt="save-icon" class="img-fluid" />

                </div>
                </div>
        </div>
        {/* <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '20px',
            color: 'white',
            backgroundColor: 'navy',
            }}
            >
                <h1> We aim to help you spend wisely and save easily</h1>
                <small> Sign up now </small>
        </div> */}
        </div>
    )
}

export default Welcome;