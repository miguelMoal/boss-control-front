import React, { useState } from "react";
import { useRouter } from "next/router";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//Components
import { Flex, Text, InfoConditions } from "@/components";
import { useToastContext } from "@/components/Toast";

//Connections
import { subscriptionApi } from "@/connections";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useMutation, useQueryClient } from "react-query";

import "./ModalSub.module.css";

const ModalSubscribe = () => {
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { gray, btnPrimary, primaryColor } = useSelector(({ theme }) => theme);

  const [checked, setChecked] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const addToast = useToastContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendSubscription } = useMutation(subscriptionApi);

  const toggleCheck = (value) => {
    setChecked(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checked) {
      setProcessing(true);

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
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
            queryClient.invalidateQueries(["products"]);
          },
        }
      );
    }
  };

  return (
    <Flex w="420px" pd="20px" direction="column" bg="white">
      <Text size="25px" weight="bold" mb="30px" color={primaryColor}>
        Activa tu cuenta
      </Text>
      <Flex direction="column" align="center" mb="30px">
        <Text size="20px" color={primaryColor}>
          $250.00 MXN / Mes
        </Text>
        <Text size="20px" color={primaryColor} mt="15px" mb="15px">
          TU PRIMER MES GRATIS
        </Text>
      </Flex>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <CardElement
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
        <Flex mt="35px">
          <InfoConditions toggleCheck={toggleCheck} checked={checked} />
        </Flex>
        <Flex justify="center">
          <button
            type="submit"
            disabled={!stripe || processing || !cardComplete}
            style={{
              background: checked ? btnPrimary : gray,
              color: "white",
              padding: "10px 25px",
              fontSize: "16px",
              marginTop: "45px",
              cursor: "pointer",
            }}
          >
            {processing ? "Processing..." : "Subscribirme"}
          </button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ModalSubscribe;
