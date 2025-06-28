import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExpenseContext } from "./ExpenseContext";
import { IncomeContext } from './IncomeContext';
import popcorn from "./assets/popcorn.png";
import icon from "./assets/icon.png";
import { useNavigate } from "react-router-dom";


function ExpenseDetail() {
  const navigate = useNavigate();
  const { title } = useParams(); // ✅ Get title from URL
  const [exp, setExp] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [temptitle, setTemptitle] = useState("");

  const { incometotal, setincometotal } = useContext(IncomeContext);
  const [progress, setProgress] = useState(incometotal);

  const {
    tot, setTot,
    cost, setCost,
    count, setCount
  } = useContext(ExpenseContext);

  const percentage = (progress / incometotal) * 100;

  function handleclose() {
    setOpen(false);
  }

  function handleopen(e) {
    setOpen(true);
    setTemptitle(e.target.value);
  }

  function handlesave() {
    if (temptitle.trim() !== "" && progress.toString().trim() !== "") {
      // You can optionally change the page title or update something
      setOpen(false);
    } else {
      alert("Fill in all the fields");
    }
  }

  const handleAddExpense = () => {
    if (exp.trim() !== "" && amount.trim() !== "") {
      const amt = parseFloat(amount);
      if ((progress - amt) >= 0) {
        setTot((prev) => [...prev, exp]);
        setCost((prev) => [...prev, amount]);
        setProgress((prev) => Math.max(prev - amt, 0));
        setCount((c) => c + 1);
        setExp("");
        setAmount("");
      } else {
        alert("Insufficient Balance");
      }
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
      <div className="button-container">
        <button className="buttons" onClick={handleopen}>Edit</button>
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Expense</h2>
            <input placeholder="Expense Source" onChange={(e) => setTemptitle(e.target.value)} />
            <input placeholder="Amount" onChange={(e) => setProgress(e.target.value)} />
            <div className="button-row">
              <button className="buttons1" onClick={handleclose}>Close</button>
              <button className="buttons1" onClick={handlesave}>Save</button>
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
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <button 
            onClick={() => navigate("/expense")} 
            style={{
            padding: "10px 20px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer"
            }}
        >
            ✅ Save & Go Back
        </button>
      </div>

    </>
  );
}

export default ExpenseDetail;


