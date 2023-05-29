import axios from "axios";
import { parseCookies } from "nookies";

const getHeaders = (requireToken) => {
  const cookies = parseCookies();
  const token = cookies.token;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (requireToken) {
    headers["x-token"] = token;
  }
  return headers;
};

export const makeRequest = async (url, method, body, requireToken = true) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_HOST}${url}`;
  const { data } = await axios({
    data: JSON.stringify(body),
    method,
    headers: getHeaders(requireToken),
    url: baseUrl,
  });
  return data;
};

export const validateEmail = (email = "") => {
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
    ) ||
    email.length < 1
  ) {
    return false;
  }
  return true;
};

// const baseUrl = `https://boss-control-one.vercel.app/api/${url}`;

export const validatePassword = (password) => {
  if (!password.match(/[a-z]/g))
    return "Se requiere almenos una letra minúscula";
  if (!password.match(/[A-Z]/g))
    return "Se requiere almenos una letra mayúscula";
  if (!password.match(/[0-9]/g)) return "Se requiere almenos un numero";
  if (!password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~])/))
    return "Se requiere almenos un símbolo";
  if (password.length <= 9)
    return "La contraseña debe tener al menos 10 caracteres";
  return null;
};

export const generateId = () => {
  const randomNumber = Math.random().toString();
  return randomNumber.substring(2);
};

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const validatePhone = (phone) => {
  return phone.length == 10;
};

export const transformDate = (_fecha) => {
  var fecha = new Date(_fecha);
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que debemos sumar 1
  var año = fecha.getFullYear();
  var horas = fecha.getHours();
  var minutos = fecha.getMinutes();

  // Paso 3: Agregar ceros a la izquierda si es necesario
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  // Paso 4: Formatear la fecha en el formato deseado
  var fechaFormateada =
    dia + "/" + mes + "/" + año + " - " + horas + ":" + minutos;

  // Paso 5: Imprimir la fecha formateada
  return fechaFormateada;
};

export const verifyNameProduct = (products, name) => {
  const exist = products.some((p) => p.name === name);
  return exist;
};

export const tranformProducts = (products) => {
  const newProducts = products.map((product) => {
    return {
      ...product,
      priceBuy: product.priceBuy.toFixed(2),
      priceSale: product.priceSale.toFixed(2),
    };
  });
  return newProducts;
};
