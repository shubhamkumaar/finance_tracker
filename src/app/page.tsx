'use client'
import React from "react";
import axios from 'axios';
export default function Home() {
  async function getTotalExpense(){
    try{
      const res = await axios.get("/api/expense/monthly");
      console.log(res.data);
    }catch(e:any){
      console.error("Error fetching monthly expenses:", e);
    }
  }
  
  const getMonthlyExpense = async () => {
    try {
      const res = await axios.post("/api/expense/monthly",{year:2025,month:2});
      console.log(res.data);
    }
    catch (e: any) {
      console.error("Error fetching monthly expenses:", e);
    }
  }

  React.useEffect(()=>{
    getMonthlyExpense();

  },[]);
  return (

    <div>
      <h1 className="text-2xl text-justify align-center text-red-400">Hello</h1>
    </div>
  );
}
