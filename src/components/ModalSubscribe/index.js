import React, { useState } from "react";
import { useRouter } from "next/router";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//Components
import { Flex, Text, Spinner } from "@/components";
import { useToastContext } from "@/components/Toast";

//Connections
import { subscriptionApi } from "@/connections";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useMutation, useQueryClient } from "react-query";

const ModalSubscribe = () => {
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { primaryColor } = useSelector(({ theme }) => theme);

  const stripe = useStripe();
  const elements = useElements();
  const addToast = useToastContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendSubscription } = useMutation(subscriptionApi);

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
    await sendSubscription(
      { paymentMethod: paymentMethod.id },
      {
        onSuccess: () => {
          addToast("El producto se creó correctamente", true);
          router.replace("/sales");
          queryClient.invalidateQueries(["products"]);
        },
        onError: () => {
          addToast("Algo salio mal", false);
        },
      }
    );
    setProcessing(false);
  };

  return (
    <Flex w="400px" pd="20px" h="200px" direction="column">
      <Text size="20px" weight="bold" mb="30px">
        Activa tu cuenta
      </Text>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <CardElement
          className="form-control"
          onChange={(event) => {
            setCardComplete(event.complete);
            setError(event.error ? event.error.message : null);
          }}
        />
        {error && (
          <div style={{ fontSize: "12px", color: "red", marginTop: "5px" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing || !cardComplete}
          style={{
            background: primaryColor,
            color: "white",
            padding: "10px 25px",
            fontSize: "16px",
            marginTop: "35px",
            cursor: "pointer",
          }}
        >
          {processing ? "Processing..." : "Subscribirme"}
        </button>
      </form>
    </Flex>
  );
};

export default ModalSubscribe;
