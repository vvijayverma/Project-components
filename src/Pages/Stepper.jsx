import React from "react";
import { Stepper } from "react-form-stepper";
import CheckoutStepper from "../components/stepper";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div><Footer /></div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div><Header /></div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];
const Steppers = () => {
  return (
    <div className="p-8">
      <h1 className="text-center font-bold text-3xl">Stepper</h1>
      <Stepper
        steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
        activeStep={1}
      />

      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
};

export default Steppers;
