import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const setInitialData = (data) => {
    setFormData(data);
  };

  return { handleChange, formData, setInitialData };
};

export default useForm;
