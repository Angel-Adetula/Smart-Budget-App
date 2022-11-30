/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
 const express = require('express');
 const cors = require('cors');
 // middleware
 const app = express();
 app.use(express.json());
 app.use(cors())
 // `npm install mongoose`
 const mongoose = require("mongoose");
 const options = {
     keepAlive: true,
     connectTimeoutMS: 10000,
     useNewUrlParser: true,
     useUnifiedTopology: true,
 };
 // mongodb+srv://<username>:<password>@cluster0.6vk0qgz.mongodb.net/?retryWrites=true&w=majority
 
 const dbUrl = `mongodb+srv://AngelAdetula:sXqxbXv1SemlKVJ6@firstcluster.fkbwlqh.mongodb.net/?retryWrites=true&w=majority`;
 
 // Mongo DB connection
 mongoose.connect(dbUrl, options, (err) => {
     if (err) console.log(err);
 });
 // Validate DB connection
 const db = mongoose.connection;
 db.on("error", console.error.bind(console, "connection error: "));
 db.once("open", function () {
     console.log("Mongo DB Connected successfully");
 });
 // Schema for budget
 let Schema = mongoose.Schema;
 let budgetSchema = new Schema(
     {
         _id: {
             type: String,
         },
         firstname:{
            type: String,
         },
         lastname: {
            type: String,
         },
         password: {
            type: String,
         },
         mainbudget: {
            type: Object, 
         },
         subBudgets: {
            type: Array,
         },
         completeBudget: {
            type: Boolean,
         },
         connectAccount:{
            type: Boolean,
         },
         transactions: {
            type: Array,
         },

     } );
 let BudgetModel = mongoose.model("budget", budgetSchema);

 let userTransaction = new Schema (
    {
        transactions:{
            type: Array,
        }
    }
 )
 
 let TransactionsModel = mongoose.model("transactions", userTransaction)
 var transactions = []
 /** GET API: GETs schema from DB and returns as response */
 app.get('/budget', async (req, res) => {
     try {
         let users = await BudgetModel.find();
         res.status(200);
         res.json(users)
     } catch (err) {
         res.status(400)
         res.json({
             status: 400,
             message: err.message,
         });
     }
 });

 app.get('/budget/:userId/:userPassword', async (req, res) => {
    try {
        let users = await BudgetModel.findOne({_id: req.params['userId'].toLowerCase(), password: req.params['userPassword']});
        res.status(200);
        if (!users){
            res.json({
                status:200,
                message: "Not found."})
        } else {
            res.json({
                status:200,
                message:users})
        }
        
    } catch (err) {
        res.status(400)
        res.json({
            status: 400,
            message: err.message,
        });
    }
});

 app.post('/budget', async (req, res) => {
    const input = {...req.body, _id:req.body._id.toLowerCase()};
    let users = new BudgetModel(input);
    try {
        users = await users.save();
        res.status(200)
        res.json({
            status: 200,
            data: users,
        });
    } catch (err) {
        res.status(400)
        res.json({
            status: 400,
            message: err.message,
        });
    }
});

app.put('/budget/:userID', async(req, res) => {
    try{
        let input = req.body;

        const options = {new: true};
        const result = await BudgetModel.findByIdAndUpdate(
           {_id: req.params.userID}, input, options
        ).catch((err)=>{
            console.error('Error------------', err)
        });
        if (result) {
            res.status(200).json({
                status: 200,
                data: result,
            });
        } else {
        res.status(400).json({
            status: 400,
            message: "No user found",
        });
    }
    } catch (error){
        res.status(400).json({message: error.message})
    }
})
 
app.post('/transactions', async(req, res) => {
    const input = req.body;
    let users = new TransactionsModel({transactions: input});
    try {
        users = await users.save();
        res.status(200)
        res.json({
            status: 200,
            data: users,
        });
    } catch (err) {
        res.status(400)
        res.json({
            status: 400,
            message: err.message,
        });
    }
});

app.get('/transactions', async(req, res) => {
    try {
        let users = await TransactionsModel.find().sort({_id:1}).limit(50);
        res.status(200);
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json({
            status: 400,
            message: err.message,
        });
    }
});
 /** DELETE API: Gets the username of the profile to be deleted from React and deletes the book in db. 
  * Sends 400 if there is no user with given username
  * Sends 500 if there is an error while saving data to DB
  * Sends 200 if deleted successfully
  */
 app.delete("/budget", async (req, res) => {
     const userName =req.body._id;
     try {
         let user = await BudgetModel.findByIdAndRemove(userName);
         if (user) {
             res.status(200).json({
                 status: 200,
                 message: "User deleted successfully",
             });
         } else {
             res.status(400).json({
                 status: 400,
                 message: "No User found",
             });
         }
     } catch (err) {
         res.status(400).json({
             status: 400,
             message: err.message,
         });
     }
 });
 app.listen(3003);