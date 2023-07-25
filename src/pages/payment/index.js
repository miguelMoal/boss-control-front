import { useState } from "react";
import { useRouter } from "next/router";

//Components
import { Flex } from "@/components";
import { useToastContext } from "@/components/Toast";

//Externals
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

//Redux
import { useDispatch } from "react-redux";

//Actions
import { addInfo } from "@/redux/slices/infoUser";

//Connections
import { subscriptionApi, infoPaymentApi, getInfoUser } from "@/connections";

//Hooks
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useForm } from "@/hooks";

//Section
import Subscribe from "./Subscribe";
import Due from "./Due";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const addToast = useToastContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [errorTregetName, setErrorTargetName] = useState(false);

  const { mutate: sendSubscription } = useMutation(subscriptionApi);
  const { data: infoPayment } = useQuery("infoPayment", infoPaymentApi);
  console.log(infoPayment);
  useQuery("infoUser", getInfoUser, {
    onSuccess: (data) => {
      setInitialData(data);
      dispatch(addInfo(data));
    },
  });

  const { formData, handleChange, setInitialData } = useForm();

  const toggleCheck = (value) => {
    setChecked(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (checked) {
      if (formData?.targetName) {
        setProcessing(true);
        setErrorTargetName(false);

        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.targetName,
            email: formData.email,
          },
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
              addToast("La subscripción se creó correctamente", true);
              if (router.route == "/sales") {
                router.replace("/products");
              } else {
                router.replace("/sales");
              }
              queryClient.invalidateQueries(["products"]);
            },
            onError: (err) => {
              addToast(err.response.data.msg, true);
              setProcessing(false);
            },
          }
        );
      } else {
        setErrorTargetName(true);
      }
    } else {
      addToast("Acepte los términos y condiciones", true);
    }
  };

  const updateError = (value) => {
    setError(value);
  };

  return (
    <Flex bg="#FDFDFD" h="100vh" justify="center" align="center" pd="20px">
      {!infoPayment?.subscriptionExist ? (
        <Due infoPayment={infoPayment} />
      ) : (
        <Subscribe
          updateError={updateError}
          handleChange={handleChange}
          formData={formData}
          errorTregetName={errorTregetName}
          error={error}
          handleSubmit={handleSubmit}
          toggleCheck={toggleCheck}
          checked={checked}
          processing={processing}
        />
      )}
    </Flex>
  );
};
export default Payment;
