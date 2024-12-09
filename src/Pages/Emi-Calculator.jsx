import React, { useState,useEffect } from "react";
// import Tenure from '../Data/tenure'
import { Tenure } from "../Data/tenure";
import { numberWithCommas } from "../utils/config";

const EmiCalculator = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [processingFee, setProcessingFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  //   Formula = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEmi = (downPayment) => {
    if (!totalCost) return;
    const loanAmt = totalCost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);
      return Number(EMI/12).toFixed(0);
  };
 
  const calculateDp = (emi)=>{
    if (!totalCost) return;
    const downPaymentPercent = 100-(emi/calculateEmi(0))*100;
    return Number((downPaymentPercent)*totalCost).toFixed(0);
  }

  useEffect(() => {
    if (!(totalCost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, totalCost]);


  const updateEmi = (e) => {
    if (!totalCost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEmi(dp);
    setEmi(emi)
  };

  const updateDownPayment = () => {
    if (!totalCost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDp(emi)
    setDownPayment(dp)
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (totalCost - downPayment) * (processingFee / 100)).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col p-4 shadow-2xl h-full w-[700px] gap-4">
        <h1 className="text-black text-3xl font-bold pb-4 text-center">
          EMI Calculator
        </h1>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Total Cost of Asset</label>
          <input
            type="number"
            className="p-2 border-2 rounded"
            placeholder="Total cost"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Interest Rate (in %)</label>
          <input
            type="number"
            className="p-2 border-2 rounded"
            placeholder="Total cost"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Processing Fee (in %)</label>
          <input
            type="number"
            className="p-2 border-2 rounded"
            placeholder="Total cost"
            value={processingFee}
            onChange={(e) => setProcessingFee(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Down Payment</label>
          <span className="font-semibold border-b-2 w-60">
            Total Down Payment- Rs {totalDownPayment()}
          </span>
          <input
            type="range"
            className="border-2 rounded"
            placeholder="Total cost"
            min={0}
            max={totalCost}
            value={downPayment}
            onChange={updateEmi}
          ></input>
          <div className="flex justify-between">
            <label>0%</label>
            <label>{numberWithCommas(downPayment)}</label>
            <label>100%</label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Emi per Month</label>
          <span className="font-semibold border-b-2 w-60">
            Total Emi Amount = Rs{totalEMI()}
          </span>
          <input
            type="range"
            className="border-2 rounded"
            placeholder="Total cost"
            min={calculateEmi(totalCost)}
            max={calculateEmi(0)}
            value={emi}
            onChange={updateDownPayment}
          ></input>
          <div className="flex justify-between">
            <label>{numberWithCommas(calculateEmi(totalCost))}</label>
            <label>{numberWithCommas(emi)}</label>
            <label>{numberWithCommas(calculateEmi(0))}</label>
          </div>
        </div>
        <div className="">
          <label className="font-semibold">Tenure</label>
          <div className="flex justify-between pt-2">
            {Tenure.map((item, index) => {  
              return (
                <button
                  onClick={() => setTenure(item)}
                  key={index}
                  className={`${
                    item === tenure ? "bg-green-300" : "bg-gray-300"
                  } px-8 py-2 rounded-3xl`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
