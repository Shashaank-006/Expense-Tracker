import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { IncomeContext } from "./IncomeContext";
import { teal } from "@mui/material/colors";
import commissions from "./assets/Income-images/commissions.jpg"
import freelance from "./assets/Income-images/freelance.png"
import investment from "./assets/Income-images/investment.jpg"
import overtime from "./assets/Income-images/overtime.jpg"
import rent from "./assets/Income-images/rent.jpg"
import { FaTrash } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
        PieChart, Pie, Cell } 
from "recharts";
import { ExpenseContext } from "./ExpenseContext";
import { getIncomes, postIncome, deleteIncome } from './api';

function Income() {
  const {
    incometotal, setincometotal,
    salarray, setsalarray,
    ruparray, setruparray,
    opt, setOpt,
    temp, setTemp,
    optarray, setoptarr,
    date, setdate,
    datearr, setdatearr
  } = useContext(IncomeContext);

  const { transactions, setTransactions } = useContext(ExpenseContext);

  const [rupee, setrupee] = useState("");
  const [salarytitle, setSalarytitle] = useState("");
  const [opens, setopens] = useState(false);

  const incomeImages = {
    Commission: commissions,
    Freelance: freelance,
    Investment: investment,
    Overtime: overtime,
    Rental: rent,
  };

  useEffect(()=>{
    async function fetchData() {
      try{
        const res = await getIncomes();
        const data = res.data;

        setsalarray(data.map(item=> item.title))
        setruparray(data.map(item => item.amount))
        setoptarr(data.map(item=> item.category))
        setdatearr(data.map(item => item.date))
        setincometotal(
          Number(data.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(2))
        );
      } catch(err){
        console.error("error",err);
      }
    }
    fetchData();
  },[])



  async function totals(e) {
    e.preventDefault();
    if (salarytitle && rupee && opt && date) {
      const incomeData = {
        title: salarytitle,
        amount: parseFloat(rupee),
        category: opt,
        date: date,
      };

      try {
        await postIncome(incomeData);

        setincometotal(r => Number(r) + Number(rupee));
        setsalarray(prev => [...prev, salarytitle]);
        setruparray(prev => [...prev, rupee]);
        setoptarr(prev => [...prev, opt]);
        setdatearr(prev => [...prev, date]);

        setTransactions(prev => [...prev, {
          type: "income",
          title: salarytitle,
          amount: rupee,
          category: opt,
          date: new Date(),
        }]);

        setrupee(""); setSalarytitle(""); setdate(""); setOpt("");
        setopens(false);
      } catch (err) {
        console.error("Error saving income:", err);
        alert("Failed to save. Check backend.");
      }
    } else {
      alert("Enter all the fields");
    }
  }

  async function deleted(index) {
    try {
      const res = await getIncomes();
      const incomeList = res.data;
      const idToDelete = incomeList[index].id;

      await deleteIncome(idToDelete);

      setsalarray(prev => prev.filter((_, i) => i !== index));
      setruparray(prev => prev.filter((_, i) => i !== index));
      setoptarr(prev => prev.filter((_, i) => i !== index));
      setdatearr(prev => prev.filter((_, i) => i !== index));
      setincometotal(i => i - incomeList[index].amount);
    } catch (err) {
      console.error("Failed to delete income", err);
    }
  }

  function stitle(e){
    setSalarytitle(e.target.value)
  }

  function optchange(e){
    setOpt(e.target.value)
  }

  function handleopen(){
    setopens(true)
  }

  function handleclose() {
    setopens(false);
  }

  const monthlyTotals = {};

  datearr.forEach((date, index) => {
    const key = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyTotals[key] = (monthlyTotals[key] || 0) + Number(ruparray[index]);
  });

  const bar = Object.entries(monthlyTotals)
    .map(([month, total]) => ({
      name: month,
      Value: total
  }))
  .sort((a, b) => new Date("1 " + a.name) - new Date("1 " + b.name));


  return(
    <>
    <div className='card3'>
      <h2 className="h1">Earnings Summary</h2>
      <p>Track your total earnings at a glance. 
         Stay updated with all income sources and recent inflows.
      </p>
      <div className="button-wrapper">
        <button className="buttonsa" onClick={handleopen}>+ Add Income</button>
      </div>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={bar} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
            />
            <Bar dataKey="Value" fill="#8884d8" radius={[10, 10, 0, 0]}  />
        </BarChart>
      </ResponsiveContainer>
    </div>
    {opens && (
      <div className="modal-overlay">
      <div className="descard">
        <input 
          type="text" 
          placeholder="Salary Title" 
          value={salarytitle}
          className="input-field" 
          onChange={(e)=>stitle(e)}>

        </input>
        <input
          type="number" 
          placeholder="Salary Amount"
          value={rupee} 
          onChange={(e)=> setrupee(e.target.value) }
          className="input-field">

        </input>
        <input className="input-field" type="date" placeholder="Add a Date" value={date} onChange={(e)=> setdate(e.target.value)}></input>
        <select value={opt} onChange={optchange} className="input-field">
          <option value="">--Select an option--</option>
          <option value="Commission">Commissions</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Overtime">Overtime Pay</option>
          <option value="Rental">Rental Income</option>
          <option value="Salary">Salary</option>
        </select>
        <div className="button-row">
              <button className="buttons1" onClick={() => handleclose()}>Close</button>
              <button className="buttons1" onClick={(e)=> totals(e)}>Save</button>
        </div>
      </div>
      </div>
    )}
    <div className="card4">
    <div className="container">
      <div className="card-container">
          {salarray.map((val,index)=> (
          <div className="salary-card" key={index}>
            <div className="img-text-row">
              <img src={incomeImages[optarray[index]]} alt="income category" className="image-circle" />
              <div className="chumma">
                <h3>{val}</h3>
                <p>{new Date(datearr[index]).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                  }) }
                </p>
              </div>
              <div className="small-card">
                <span>+ ${ruparray[index]}</span>
                <FiTrendingUp className="icon" />
              </div>
            </div>
            <FaTrash className="delete-icon" onClick={()=>deleted(index)}/>
          </div>
          ))}

      </div>
    </div>
    </div>
    </>
  )
}

export default Income;
