import React, {useState, useEffect} from "react";
import "../App.css"
import { useNavigate} from "react-router-dom";
import {Button } from "react-bootstrap"

const DisplayTransactions  = () => {
    const [transactionDets, setTransactionDetail] = useState([]);
    let navigate = useNavigate()

    

    useEffect(() => {
        fetch("http://localhost:3003/transactions")
        .then(res => res.json())
        .then(transactionDetails => setTransactionDetail(transactionDetails))
      }, [transactionDets])

      const navigateToBudget = () => {

            return navigate("/budget")
    }

      return(

        <div>
          <Button variant="primary" onClick={navigateToBudget}> Return To Budget</Button>

          {transactionDets.length > 0 &&
         
          <table class="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {transactionDets[0].transactions.map((item, index)=>
              <tr key = {index}>
                <td>{index}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.categories}</td>
              </tr>
            )}
          </tbody>
          </table>
           }
        </div>
      )
}


export default DisplayTransactions;