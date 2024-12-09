import React, { useState } from "react";

const gridArray = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

function Cell({ filled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        filled ? "bg-green-500" : "bg-transparent"
      } border-2 border-black pb-[100%]`}
    ></button>
  );
}
const GridSelect = () => {
  const [order, setOrder] = useState([]);
  const [deactivating, setDeactivating] = useState(false);
  
  const ActivateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === gridArray.flat(1).filter(Boolean).length) {
        deactivateCells()
    }
  };

  const deactivateCells =()=>{
    setDeactivating(true);
    const timer = setInterval(()=>{
       setOrder((oriOrder)=>{
         const newOrder = oriOrder.slice(1)
         newOrder.pop()
         if (newOrder.length ===0) {
            clearInterval(timer)
            setDeactivating(false)
         }
         return newOrder;
       })
    },300)
}

  return (
    <div className="flex justify-center items-center gap-4 flex-col">
      <h1 className="text-3xl font-bold text-green-500 text-center top-0">
        GridSelect
      </h1>
      <div className="grid grid-cols-3 max-w-80 w-full p-5 border-2 border-black gap-5">
        {gridArray.flat(1).map((item, index) => {
          return item ? (
            <React.Fragment key={index}>
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => ActivateCells(index)}
            />
            </React.Fragment>
          ) : (
            <span key={index}></span>
          );
        })}
      </div>
    </div>
  );
};

export default GridSelect;
