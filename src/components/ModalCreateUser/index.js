import { useState } from "react";
//Componenets
import { Flex, Text, CustomButton, CustomInput, Spinner } from "@/components";
import { useToastContext } from "@/components/Toast";
//Redux
import { useSelector } from "react-redux";
//Hooks
import { useForm } from "@/hooks";
//Helpers
import { validateEmail, validatePassword } from "@/helpers";
//Connections
import { createSubUserApi } from "@/connections";
//Externals
import { useMutation, useQueryClient } from "react-query";
//icons
import { EyeIcon, EyeCloseIcon } from "@/assets/icons";

const ModalCreateUser = ({ closeModal }) => {
  const {
    primaryColor,
    error,
    btnDanger,
    btnDefault,
    gray,
    btnSuccess,
    success,
    btnPrimary,
  } = useSelector((state) => state.theme);

  const { handleChange, formData } = useForm();

  const queryClient = useQueryClient();
  const addToast = useToastContext();

  const { mutate: createSubUser, isLoading: loadingCreateUser } =
    useMutation(createSubUserApi);

  const [type, setType] = useState("password");
  const [typeConfirmation, setTypeConfirmation] = useState("password");

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(null);
  const [validRepeatPassword, setValidRepeatPassword] = useState(true);
  const [permissions, setPermission] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const [type, setType] = useState("password");
  const [typeConfirmation, setTypeConfirmation] = useState("password");

  const togglePermissions = (value) => {
    if (!loadingCreateUser) {
      setPermission({ ...permissions, [value]: !permissions[value] });
    }
  };

  const allReady =
    formData?.name &&
    formData?.email &&
    formData?.password &&
    formData?.repeatPassword;

  const sendUser = () => {
    if (!allReady) return;
    const validEmail = validateEmail(formData.email);
    const validPassword = validatePassword(formData.password);
    if (!validEmail) {
      setValidEmail(false);
    } else if (validPassword) {
      setValidEmail(true);
      setValidPassword(validPassword);
    } else if (formData.password !== formData.repeatPassword) {
      setValidPassword(null);
      setValidRepeatPassword(false);
    } else {
      setValidRepeatPassword(true);
      createSubUser(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          permissions: [
            { name: "edit", active: permissions.edit },
            { name: "add", active: permissions.add },
            { name: "delete", active: permissions.delete },
          ],
        },

        {
          onSuccess: () => {
            queryClient.invalidateQueries("subUsers");
            closeModal();
          },
          onError: (err) => {
            addToast(err.response.data.msg, false);
          },
        }
      );
    }
  };

  return <Flex direction="column"></Flex>;
};
export default ModalCreateUser;
