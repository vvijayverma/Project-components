import React, { useEffect, useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";

const Progressbar = () => {
  const [value, setValue] = useState(0);
  const [percentage, setPercentage] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((val) => {
        if (val >= 100) {
          clearInterval(interval);
          return 100;
        }
        return val + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

//   useEffect(() => {
//     // setPercentage(Math.min(100, Math.max(value, 0)));
//     setPercentage(value);
//   }, [value]);
  return (
    <div className="flex flex-col items-center gap-2">
        {/* <progress className="wrapper container barCompleted label" id="file" max="100" value={percentage}>70%</progress>
      <ProgressBar
        completed={percentage}
        maxCompleted={100}
        className="wrapper"
        barContainerClassName="container"
        completedClassName="barCompleted"
        labelClassName="label"
        ariaValuemin={0}
        ariaValuemax={100}
      /> */}
      <span className="">ProgressBar</span>
      <div className="overflow-hidden relative h-5 bg-gray-200 w-96 rounded-xl border-2 border-black flex justify-center items-center">
        <span
          className={`absolute z-10 ${
            value > 49 ? "text-white" : "text-black"
          }`}
        >
          {value.toFixed()}%
        </span>
        <div
          className="h-full w-full bg-green-400"
          style={{
            transform: `scaleX(${value / 100})`,
            transformOrigin: "left",
          }}
        //   role="progressbar"
        //   aria-valuemin={0}
        //   aria-valuemax={100}
        //   aria-valuenow={percentage.toFixed()}
        ></div>
      </div>
    </div>
  );
};

export default Progressbar;
