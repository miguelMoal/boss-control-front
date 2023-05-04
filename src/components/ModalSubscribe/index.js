import React, { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//Connections
import { subscriptionApi } from "@/connections";

const ModalSubscribe = () => {
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log("error>>>", error);
      setError(error.message);
      setProcessing(false);
      return;
    }
    const res = await subscriptionApi({ paymentMethod: paymentMethod.id });
    // Send paymentMethod.id to your server to create the subscription
    console.log(paymentMethod.id, res);

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        onChange={(event) => {
          setCardComplete(event.complete);
          setError(event.error ? event.error.message : null);
        }}
      />
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe || processing || !cardComplete}>
        {processing ? "Processing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default ModalSubscribe;
