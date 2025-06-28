import React, {useState, useEffect} from 'react'

import income from "./assets/income.jpg"
import expense from "./assets/expense.jpg"
import balance from "./assets/balance.jpg"
import number from "./assets/number.png"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
        PieChart, Pie, Cell } 
from "recharts";

import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { IncomeContext } from './IncomeContext';
import { useNavigate } from 'react-router-dom'

import commissions from "./assets/Income-images/commissions.jpg"
import freelance from "./assets/Income-images/freelance.png"
import investment from "./assets/Income-images/investment.jpg"
import overtime from "./assets/Income-images/overtime.jpg"
import rent from "./assets/Income-images/rent.jpg"

import { FaTrash } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { MdOutlineMoneyOff } from "react-icons/md";
import { BiMinusCircle } from "react-icons/bi";
import { FaBalanceScale } from "react-icons/fa";
import {FiTrendingDown } from "react-icons/fi";

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
import { getIncomes, getExpense } from './api'

function Dashboard() {

    const navigate = useNavigate()

    const incomeImages = {
        Commission: commissions,
        Freelance: freelance,
        Investment: investment,
        Overtime: overtime,
        Rental: rent,
    };
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

    const { tot, setTot, cost, setCost,count, setCount, title, setTitle, exparr, setexparr,
      amntarr, setamntarr, expensedate,setExpensedate, option, setoption, datea, setdatea, expopt, setexpopt, month,
      setmonth, transactions, setTransactions
    } = useContext(ExpenseContext);

    const {incometotal,
        setincometotal,
        salarray, 
        setsalarray,
        ruparray,
        setruparray,
        opt,
        setOpt,
        temp,
        setTemp,
        optarray,
        setoptarr,
        date,
        setdate,
        datearr,
        setdatearr
    } = useContext(IncomeContext);
useEffect(() => {
  async function fetchDashboardData() {
    try {
      const incomeRes = await getIncomes();
      const expenseRes = await getExpense();

      const incomeData = incomeRes.data;
      const expenseData = expenseRes.data;


      setsalarray(incomeData.map(item => item.title));
      setruparray(incomeData.map(item => item.amount));
      setoptarr(incomeData.map(item => item.category));
      setdatearr(incomeData.map(item => item.date));
      setincometotal(incomeData.reduce((sum, item) => sum + item.amount, 0));


      setexparr(expenseData.map(item => item.title));
      setamntarr(expenseData.map(item => item.amount));
      setexpopt(expenseData.map(item => item.category));
      setdatea(expenseData.map(item => item.date));
      setTot(expenseData.reduce((sum, item) => sum + item.amount, 0));

      // Combine for transactions
      const incomeTransactions = incomeData.map(item => ({
        type: "income",
        titles: item.title,
        amounts: item.amount,
        category: item.category,
        date: item.date,
      }));

      const expenseTransactions = expenseData.map(item => ({
        type: "expense",
        titles: item.title,
        amounts: item.amount,
        category: item.category,
        date: item.date,
      }));

      const combinedTransactions = [...incomeTransactions, ...expenseTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

      setTransactions(combinedTransactions);

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  }

  fetchDashboardData();
}, []);


    const[money, setmoney] = useState(0)
    let total = 0;
    for (let i = 0; i < amntarr.length; i++) {
        total += parseFloat(amntarr[i] || 0);
    }

    const bal = Number(incometotal || 0) - Number(total || 0);

    const datas = [
        { name: "Total Income", value: incometotal, color: "#a385ff" },  
        { name: "Total Expense", value: total, color: "#FF4D00" },  
        { name: "Total Balance", value: bal, color: "#8ecac0" },  
    ];

    function handlehardclick() {
        navigate('/expense');
    }

    function handlehardclick2(){
        navigate('/income')
    }


    return( 
        <>
        <div className='content'>
          <div className='card'>
              <FaWallet size={32} color="#9172e6" />
              <div>
                <h2 className='h2'>Total Income</h2>
                <p>₹ {parseFloat(incometotal)}</p>
              </div>
          </div>
          <div className='card'>
              <BiMinusCircle size={32} color="#e53935" />
              <div>
                <h2 className='h2'>Total Expense</h2>
                <p>₹ {Number(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              </div>
          </div>
          <div className='card'>
              <FaBalanceScale size={32} color="#283593" />
              <div>
                <h2 className='h2'>Total Balance</h2>
                <p>₹ {bal}</p>
              </div>
          </div>
          
        </div>
        <div className='dash'>
            <div className='descard1'>
                <h3> Recent Transactions </h3>
                <div className='card-container'>
                    {transactions.map((txn, index) => (
                      <div className="salary-cardu" key={index}>
                        <div className="img-text-row">
                            <img 
                                src={
                                    txn.type == "expense"? ExpenseImages[txn.category]: incomeImages[txn.category]
                                }
                                className="image-circle" />
                            <div className="chumma">
                                <h3>{txn.titles}</h3>
                                <p>{new Date(txn.date).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric"
                                })}</p>
                            </div>
                            <div className={txn.type === "income" ? "small-card" : "small-card1"}>
                                <span style={{ color: txn.type === "income" ? "green" : "red" }}>
                                        {txn.type === "income" ? "+" : "-"} ₹{txn.amounts}
                                </span>
                                {txn.type === "income" ? (
                                    <FiTrendingUp className="icon" />
                                ) : (
                                    <FiTrendingDown className="icon" />
                                )}
                            </div>
                        </div>
                      </div>
                    ))}

                </div>
            </div>

            <div className="cc">
                <h3>Financial Overview</h3>
                <div className="pie-wrapper">
                    <PieChart width={500} height={300}>
                        <Pie
                            data={datas}
                            cx="60%"
                            cy="50%"
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {datas.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend

                        />
                    </PieChart>
                </div>
            </div>
            
        </div>
        <div className='dash'>
            <div className='card5' onClick={()=>handlehardclick()}>
                <h1>+</h1>
                <p>Go To Expense Section</p>
            </div>
            <div className='card5' onClick={()=>handlehardclick2()}>
                <h1>+</h1>
                <p>Go To Income Section</p>
            </div>
        </div>
        <div className='dash'>
            <div className='descard1'>
                <h3>Expenses</h3>
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
                            </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className='cc'>
                <h3>Incomes</h3>
                <div className="container">
                      <div className="card-container">
                          {salarray.map((val,index)=> (
                          <div className="salary-carduu" key={index}>
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
                          </div>
                          ))}
                
                      </div>
                    </div>
            </div>
        </div>
        </>
    )


}

export default Dashboard