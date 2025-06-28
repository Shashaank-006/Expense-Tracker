import React, { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "./ExpenseContext";

import dining from "./assets/Expense-Images/dining.avif"
import electricity from "./assets/Expense-Images/electricity.jpg"
import entertainment from "./assets/Expense-Images/entertainment.jpg"
import groceries from "./assets/Expense-Images/groceries.png"
import gym from "./assets/Expense-Images/gym.jpg"
import medicines from "./assets/Expense-Images/medicines.jpg"
import rental from "./assets/Expense-Images/Rent-exp.jpeg"
import shopping from "./assets/Expense-Images/shopping.jpg"
import subscriptions from "./assets/Expense-Images/subscriptions.jpg"
import transport from "./assets/Expense-Images/transport.webp"

import { FaTrash } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { IncomeContext } from './IncomeContext';
import { getIncomes, postIncome, deleteIncome, getExpense, postExpense, deleteExpense } from './api';

function Expense() {
  const [exp, setExp] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setopen] = useState(false);
  const [temptitle, setTemptitle] = useState("");
  const { incometotal, setincometotal } = useContext(IncomeContext);
  const [progress, setProgress] = useState(incometotal);

  const {
    tot, setTot, cost, setCost, count, setCount, title, setTitle, exparr, setexparr,
    amntarr, setamntarr, expenseDate, setExpenseDate, option, setoption, datea, setdatea, expopt, setexpopt, month,
    setmonth, transactions, setTransactions
  } = useContext(ExpenseContext);


  const ExpenseImages = {
    groceries: groceries,
    shopping: shopping,
    rent: rental,
    electricity: electricity,
    transport: transport,
    dining: dining,
    subscriptions: subscriptions,
    medicines: medicines,
    gym: gym,
    entertainment: entertainment,
  };

  const percentage = (progress / incometotal) * 100;

  useEffect(()=>{
    async function fetchData(){
      try{
        const res = await getExpense()
        const data = res.data

        setTot(data.map(item=>item.title))
        setCost(data.map(item=>item.amount))
        setexparr(data.map(item=>item.category))
        setdatea(data.map(item=>item.date))
        setexparr(data.map((item) => item.title));  
        setamntarr(data.map((item) => item.amount));

        const totalSpent = data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        setProgress(incometotal - totalSpent);

        
      } catch(err){
        console.error("error",err)
      }
    }
    fetchData();
  },[incometotal])

const handleAddExpense = async () => {
  if (
    exp.trim() !== "" &&
    amount.trim() !== "" &&
    option.trim() !== "" &&
    expenseDate.trim() !== ""
  ) {
    const expdata = {
      title: exp, 
      amount: amount,
      category: option,
      date: expenseDate,
    };

    try {
      await postExpense(expdata);

      setTot((prev) => [...prev, exp]);
      setCost((prev) => [...prev, amount]);
      setexpopt((prev) => [...prev, option]);
      setdatea((prev) => [...prev, expenseDate]);
      setexparr((prev) => [...prev, exp]);
      setamntarr((prev) => [...prev, amount]);

      const amt = parseFloat(amount);

      if (progress - amt >= 0) {
        setProgress((prev) => Math.max(prev - amt, 0));
      } else {
        alert("Insufficient Balance");
        return; 
      }

      const newexp = {
        title: exp,
        money: amt,
        m: expenseDate,
        op: option,
      };

      setmonth((prev) => [...prev, newexp]);
      setCount((c) => c + 1);
      setTransactions((prev) => [
        ...prev,
        {
          type: "expense",
          titles: exp,
          amounts: amount,
          category: option,
          date: new Date(expenseDate),
        },
      ]);
      setExp("");
      setAmount("");
      setExpenseDate("");
      setoption("");
    } catch (err) {
      console.error("Error while adding expense:", err);
    }
  } else {
    alert("Enter all the fields");
  }
};


  async function handleRemoveExpense(index) {
    try{
      const res = await getExpense();
      const explist = res.data
      const idtodelete = explist[index].id;

      await deleteExpense(idtodelete);
    
      const amt = parseFloat(cost[index]);
      setProgress((prev) => prev + amt);
      setexparr((prev) => prev.filter((_, i) => i !== index));
      setamntarr((prev) => prev.filter((_, i) => i !== index));
      setdatea((prev) => prev.filter((_, i) => i !== index));
      setexpopt((prev) => prev.filter((_, i) => i !== index));
      setmonth((prev) => prev.filter((_, i) => i !== index));
      }catch (err) {
        console.error("error",err)
      }
    };

  const checkCountText = (count) => (count > 1 ? `${count} Items` : `${count} Item`);

  const monthlytotal = {};
  month.forEach(ex => {
    const extractmonth = new Date(ex.m).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlytotal[extractmonth] = (monthlytotal[extractmonth] || 0) + ex.money;
  });

  const chartData = Object.entries(monthlytotal).map(([month, total]) => ({
    month,
    total,
    date: new Date("1 " + month)
  }))
  .sort((a, b) => a.date - b.date);

  return (
    <>
      <div className="total">
        <div>
          <div className="descard2">
            <h2>Expenses</h2>
            <div className="container">
              <div className="card-container">
                {exparr.map((val, index) => (
                  <div className="salary-cardu" key={index}>
                    <div className="img-text-row">
                      <img src={ExpenseImages[expopt[index]]} alt="income category" className="image-circle" />
                      <div className="chumma">
                        <h3>{val}</h3>
                        <p>{new Date(datea[index]).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        </p>
                      </div>
                      <div className="small-card1">
                        <span>- ${amntarr[index]}</span>
                        <FiTrendingDown className="icon" />
                      </div>
                    </div>
                    <FaTrash className="delete-icon" onClick={() => handleRemoveExpense(index)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cardss">
            <ResponsiveContainer width="90%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#000000" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="full">
          <div className="typing">
            <h2 className="tit">Add Expense</h2>
            <h4 className="tit">Expense Name</h4>
            <input
              type="text"
              value={exp}
              placeholder="Add name of product"
              onChange={(e) => setExp(e.target.value)}
            />
            <h4 className="tit">Expense Amount</h4>
            <input
              type="number"
              value={amount}
              placeholder="Add amount of product"
              onChange={(e) => setAmount(e.target.value)}
            />
            <h4 className="tit">Date</h4>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
            <h4 className="tit">Category Option</h4>
            <select value={option} type="text" className="input-field" onChange={(e) => setoption(e.target.value)}>
              <option value="">-- Select Expense Type --</option>
              <option value="groceries">Groceries</option>
              <option value="shopping">Shopping</option>
              <option value="rent">Rent</option>
              <option value="electricity">Electricity Bill</option>
              <option value="transport">Transport</option>
              <option value="dining">Dining Out</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="medicines">Medicines</option>
              <option value="gym">Gym Membership</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <button onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;


      


      

