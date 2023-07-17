//components
import { CustomButton, Flex, Text, LayoutBoarding } from "@/components";
import { useToastContext } from "@/components/Toast";
import { useSelector } from "react-redux";
//Hooks
import { useMutation } from "react-query";
import { useRouter } from "next/router";
//conections
import { loginGoogleApi } from "@/connections";

//Helpers
import { saveTokenToLocalStorage } from "@/helpers";

//Externals
import { setCookie } from "nookies";
import { GoogleLogin } from "@react-oauth/google";

const info = [
  { desc: "Nunca vuelvas a quedarte sin inventario.", id: 1 },
  {
    desc: "Mantén el control total sobre tus ventas y ganancias mensuales.",
    id: 2,
  },
  {
    desc: "Descubre cómo invertir de manera precisa y eficiente en tus productos más solicitados.",
    id: 3,
  },
  {
    desc: "Conoce en detalle cuáles son tus artículos más vendidos y asegúrate de tener suficiente cantidad para satisfacer la demanda.",
    id: 4,
  },
  {
    desc: "No dejes que la falta de stock te tome por sorpresa.",
    id: 5,
  },
  {
    desc: "Toma decisiones informadas y maximiza tus ganancias.",
    id: 6,
  },
];

export default function Home() {
  const { tertiaryColor, btnPrimary } = useSelector((state) => state.theme);

  const { mutate: loginGoogle } = useMutation(loginGoogleApi);

  const router = useRouter();

  const addToast = useToastContext();

  const handelLoginGloogle = (credentialResponse) => {
    loginGoogle(
      { credentials: credentialResponse.credential },
      {
        onSuccess: (data) => {
          saveTokenToLocalStorage(data.token);
          setCookie(null, "token", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          router.replace("/sales");
        },
        onError: (error) => {
          addToast(error.response.data.msg, error.response.data.ok);
        },
      }
    );
  };

  return (
    <LayoutBoarding>
      <Flex
        justify="center"
        mt="50px"
        pd="20px 0px"
        style={{ minHeight: "calc(100vh - 165px)" }}
      >
        <Flex
          pd="20px"
          gap="70px"
          w="400px"
          direction="column"
          bg={tertiaryColor}
          style={{ borderRadius: "5px", position: "relative" }}
        >
          <Flex
            h="70px"
            w="250px"
            bg={btnPrimary}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              borderRadius: "0px 0px 100px 0px",
              backgroundSize: "210% 210%",
              backgroundPosition: "100% 0",
            }}
          ></Flex>
          <Text
            size="25px"
            weight="bold"
            style={{ position: "absolute", zIndex: 1, top: 20 }}
          >
            Iniciar Sesión
          </Text>

          <Flex
            justify="center"
            mt="60px"
            pd="20px"
            direction="column"
            gap="20px"
            align="center"
          >
            <Flex align="center" direction="column" gap="10px">
              <Text size="20px" weight="bold">
                Inicia gratis con Google
              </Text>
              <Flex w="fit-content" mb="20px" mt="10px">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handelLoginGloogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Flex>
              <Flex direction="column" gap="10px" align="center">
                {info.map((inf) => (
                  <Flex key={inf.id}>
                    <Text style={{ color: "#6E8FD7" }}>•</Text>
                    <Text style={{ color: "#6E8FD7" }} ml="10px">
                      {inf.desc}
                    </Text>
                  </Flex>
                ))}
                <CustomButton color="white" bg={btnPrimary} mt="10px">
                  Más Información
                </CustomButton>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </LayoutBoarding>
  );
}
