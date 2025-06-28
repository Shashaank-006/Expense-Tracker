import { createContext, useState } from "react";

export const IncomeContext = createContext();

export const IncomeProvider = ({children})=> {
    const [incometotal, setincometotal] = useState(0)
    const [salarray, setsalarray] = useState([]);
    const [ruparray, setruparray] = useState([]);
    const [opt, setOpt] = useState("");
    const [temp,setTemp] = useState("");
    const [optarray, setoptarr] = useState([])
    const [date, setdate] = useState("")
    const [datearr, setdatearr] = useState([])

    return(
        <IncomeContext.Provider value={{
            incometotal,
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
            setdatearr}}>
            {children}
        </IncomeContext.Provider>
    )

}