import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [tot, setTot] = useState([]);     
  const [cost, setCost] = useState([]);
  const [title, setTitle] = useState("Theatre");
  const [cards, setCards] = useState([]);
  const [exparr, setexparr] = useState([]);
  const [amntarr, setamntarr] = useState([]);
  const [expenseDate, setExpenseDate] = useState("");
  const [option, setoption] = useState("");
  const [datea, setdatea] = useState([]);
  const [expopt, setexpopt] = useState([]);
  const [month, setmonth]  = useState([]);

  const [transactions, setTransactions] = useState([]);

  return (
    <ExpenseContext.Provider value={{
      tot, setTot, cost, setCost, count, setCount, title, setTitle, cards, setCards, exparr, setexparr,
      amntarr, setamntarr, expenseDate, setExpenseDate, option, setoption, datea, setdatea, expopt, setexpopt, month, setmonth,
      transactions, setTransactions
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

