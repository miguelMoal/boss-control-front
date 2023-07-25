import "@/styles/globals.css";
import "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "styled-components";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

import { ToastContextProvider } from "@/components/Toast";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_KEY_STRIPE);

import { GoogleOAuthProvider } from "@react-oauth/google";

import "./module_login.css";

const clientGoogle = process.env.CLIENT_GOOGLE;

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "mxn",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <GoogleOAuthProvider clientId={clientGoogle}>
      <Elements stripe={stripePromise} options={options}>
        <Provider store={store}>
          <ToastContextProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={store.getState().theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </QueryClientProvider>
          </ToastContextProvider>
        </Provider>
      </Elements>
    </GoogleOAuthProvider>
  );
}

//
