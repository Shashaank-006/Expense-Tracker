import React, { useState, useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";
import popcorn from "./assets/popcorn.png";
import icon from "./assets/icon.png";
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } 
  from '@mui/material';

import { IncomeContext } from './IncomeContext';

function Expense() {
  const [exp, setExp] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setopen] = useState(false);
  const [temptitle, setTemptitle] = useState("");
  const {incometotal, setincometotal} = useContext(IncomeContext);
  const [progress, setProgress] = useState(incometotal);

  function handleclose() {
    setopen(false);

  }

  function handleopen(e){
    setopen(true);
    setTemptitle(e.target.value);
  }

  function handlesave() {
    if(temptitle.trim()!=="" && progress.trim()!==""){
      setTitle(temptitle);
      setopen(false);
    }
    else{
      alert("Fill in all the fields")
    }

  }

  const { tot, setTot, cost, setCost,count, setCount, title, setTitle
   } = useContext(ExpenseContext);

  const percentage = (progress / incometotal) * 100;

  const handleAddExpense = () => {
    if (exp.trim() !== "" && amount.trim() !== "") {
      setTot((prev) => [...prev, exp]);
      setCost((prev) => [...prev, amount]);

      const amt = parseFloat(amount);
      if ((progress-amt) >=0){
        setProgress((prev) => Math.max(prev - amt, 0));
      }
      else{
        alert("Insufficient Balance")
      }
      setCount((c) => c + 1);
      setExp("");
      setAmount("");
    } else {
      alert("Please enter both expense name and amount");
    }
  };

  const handleRemoveExpense = (index) => {
    const amt = parseFloat(cost[index]);
    setProgress((prev) => prev + amt);
    setTot((prev) => prev.filter((_, i) => i !== index));
    setCost((prev) => prev.filter((_, i) => i !== index));
    setCount((c) => c - 1);
  };

  const checkCountText = (count) => (count > 1 ? `${count} Items` : `${count} Item`);

  return (
    <>
      <div className="button-container"><button className="buttons" onClick={handleopen}>Edit</button></div>
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Expense</h2>
            <input placeholder="Expense Source" onChange={(e)=>setTemptitle(e.target.value)} />
            <input placeholder="Amount" onChange={(e)=>setProgress(e.target.value)} />
            <div className="button-row">
              <button className="buttons1" onClick={() => handleclose()}>Close</button>
              <button className="buttons1" onClick={()=> handlesave()}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="total">
        <div className="card1">
          <img src={popcorn} alt="popcorn" className="pop" />
          <div className="card-content">
            <h2 className="h2">{title}</h2>
            <p className="progress-text">{checkCountText(count)}</p>
            <p className="progress-text">Remaining Balance is ₹{progress}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
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
            <button onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      </div>

      <h2 className="exph2">Expense List</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Cost (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tot.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>₹{cost[index]}</td>
              <td>
                <button onClick={() => handleRemoveExpense(index)}>
                  <img src={icon} alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>










        <div className='card2'>
        <ResponsiveContainer width="80%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        </div>



                        <div className="card-container1">
                    {salarray.map((val,index)=> (
                    <div className="salary-card1" key={index}>
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
                                <span className='rup'>+ ${ruparray[index]}</span>
                                <FiTrendingUp className="icon" />
                            </div>
                        </div>
                    </div>
                    ))}
                    {exparr.map((val, index) => (
                    <div className="salary-card1" key={index}>
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
                                <span className='rup'>+ ${amntarr[index]}</span>
                                <FiTrendingDown className="icon" />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
    </>
  );
}

export default Expense;



          {/* {!token ? (
            <Routes>
              <Route path="*" element={<Login setToken={setToken} />} />
            </Routes>
          ) : (
            <div className="app-layout">
              <nav className="sidebar">
                <h1 className='tracker'>FinSight</h1>
                <ul className="list">
                  <li>
                    <Link to="/dashboard" className="nav-link">
                      <MdDashboard style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/expense" className="nav-link">
                      <HiOutlineMinusCircle style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      Expense
                    </Link>
                  </li>
                  <li>
                    <Link to="/income" className="nav-link">
                      <FaMoneyCheckAlt style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      Income
                    </Link>
                  </li>
                  <li>
                    <button className="nav-link" onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <RiLogoutBoxRLine style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      Logout
                    </button>
                  </li>
                </ul>
                <Link to="/profile" className="profile-link">
                  <div className="profile-section">
                    <div className="profile">
                      <img src={image} alt="Profile" className="picture" />
                    </div>
                    <p className="profile-name">Shashaank</p>
                  </div>
                </Link>
              </nav>

              <main className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
                  <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
                  <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
                  <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          )} */}


      