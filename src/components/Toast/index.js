import { useCallback, useContext, useState, createContext } from "react";
import { useSelector } from "react-redux";
import { ContentToast, Line, Toast, ToastGrid } from "./elements";
import Icons from "./icons";

//Components
import { Text } from "@/components";

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const { warning, error, success } = useSelector((state) => state.theme);

  const addToast = useCallback(
    function (toast, state = true) {
      // console.warn(toast);
      setToasts((toasts) => [...toasts, { text: toast, state: state }]);
      setTimeout(() => setToasts((toasts) => toasts.slice(1)), 3000);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ContentToast>
        {toasts.map((toast, index) => (
          <div key={index}>
            <Toast>
              <ToastGrid>
                <Icons status={toast.state} />
                <Text color="black">{toast.text}</Text>
              </ToastGrid>
              {toast.state === true && <Line color={success} />}
              {toast.state === false && <Line color={error} />}
              {toast.state === null && <Line color={warning} />}
            </Toast>
          </div>
        ))}
      </ContentToast>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}
