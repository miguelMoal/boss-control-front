import { useRouter } from "next/router";

//Components
import { Layout, Flex, Text, CustomButton, CardPlan } from "@/components";
import { useToastContext } from "@/components/Toast";

//Redux
import { useSelector } from "react-redux";

const info = [
  { desc: "Vender productos", id: 1 },
  {
    desc: "Administrar productos (Agregar, Editar, Emilinar, etc...).",
    id: 2,
  },
  {
    desc: "Visualiza con exactitud en que productos necesitas reinvertir y cuanto te cuesta.",
    id: 3,
  },
  {
    desc: "Visualiza el historial de todas tus ventas.",
    id: 4,
  },
];

const infoPremium = [
  { desc: "Vender productos", id: 1 },
  {
    desc: "Administrar productos (Agregar, Editar, Emilinar, etc...).",
    id: 2,
  },
  {
    desc: "Visualiza con exactitud en que productos necesitas reinvertir y cuanto te cuesta.",
    id: 3,
  },
  {
    desc: "Visualiza el historial de todas tus ventas.",
    id: 4,
  },
  {
    desc: "Visualiza y analiza de forma grafica tus ventas, entérate de que productos se venden más y cuáles te generan más ganancias.",
    id: 5,
  },
  {
    desc: "Visualiza tus ventas por día y averigua que días hay más ventas en tu negocio.",
    id: 6,
  },
  {
    desc: "Conoce las ventas que tuviste hoy, últimos 7 días, últimos 30 días y últimos 365 días.",
    id: 7,
  },
  {
    desc: "Crea cuentas para tus empleados y asígnale los permisos que consideres necesarios a cada uno.",
    id: 8,
  },
];

const Plans = () => {
  const { btnDefault, secondaryColor, premium } = useSelector(
    (state) => state.theme
  );

  const router = useRouter();
  const addToast = useToastContext();

  return (
    <Layout>
      <Flex
        direction="column"
        justify="center"
        gap="20px"
        h="100%"
        align="center"
      >
        <Text textAlign="center" letterSpacing={"2px"} lineHeight="20px">
          Esta funcionalidad solo está disponible para el plan PREMIUM. Hazte
          <br />
          premium ahora por solo $129.00 MXN / MES.
        </Text>
        <Flex justify="center" gap="20px">
          <CardPlan
            title="GRATIS"
            data={info}
            colorBtn={btnDefault}
            textBtn="Activo"
            colorFligth={secondaryColor}
            price={0}
            action={() => addToast("Ya cuenta con este plan", true)}
          />
          <CardPlan
            title="PREMIUM"
            data={infoPremium}
            colorBtn={premium}
            textBtn="Subscribirme"
            colorFligth={premium}
            price={129}
            action={() => router.replace("/payment")}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};
export default Plans;
