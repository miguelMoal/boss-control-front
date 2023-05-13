//componentes
import { Flex, Text, CustomButton } from "@/components";
//reactRedux
import { useSelector } from "react-redux";

const ModalConditions = ({ closeModal }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);
  return (
    <Flex gap="20px" direction="column" w="800px" h="100%" pd="20px">
      <Text>TÉRMINOS Y CONDICIONES DE BOSS CONTROL</Text>
      <Flex
        className="scroll"
        h="500px"
        style={{ overflowY: "auto" }}
        gap="20px"
      >
        <Text>
          Bienvenido a Boss Control. Al utilizar nuestro servicio, aceptas estos
          términos y condiciones ("Términos de Servicio"), que constituyen un
          acuerdo legalmente vinculante entre tú y Boss Control. Lee
          detenidamente estos Términos de Servicio antes de utilizar nuestro
          servicio.
          <br />
          Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos
          Términos. Si no está de acuerdo con alguno de los términos, no utilice
          el Servicio.
          <br />
          <br />
          Descripción del Servicio
          <br />
          El Servicio proporciona a los usuarios una plataforma en línea para
          administrar su inventario de productos. El Servicio está disponible a
          través de una suscripción mensual que se renueva automáticamente. Al
          utilizar el Servicio, usted acepta pagar la tarifa de suscripción
          mensual según lo establecido en el sitio web de la empresa.
          <br />
          <br />
          Pago y Facturación
          <br />
          Al suscribirse al Servicio, usted acepta pagar la tarifa de
          suscripción mensual de [285 pesos mexicanos] a través de los métodos
          de pago disponibles en el sitio web de la empresa. Si la suscripción
          no se renueva automáticamente debido a problemas con su método de
          pago, su cuenta puede ser suspendida hasta que se resuelvan los
          problemas de pago.
          <br />
          <br />
          Renovación Automática de la Suscripción
          <br />
          Su suscripción al Servicio se renovará automáticamente al final de
          cada período de suscripción mensual. Si no desea renovar su
          suscripción, debe cancelarla antes de la fecha de renovación. Las
          cancelaciones se pueden realizar en el sitio web de la empresa.
          <br />
          <br />
          Cancelaciones y Reembolsos
          <br />
          Las cancelaciones de la suscripción deben realizarse antes de la fecha
          de renovación para evitar cargos adicionales. Si cancela su
          suscripción, no se le reembolsará por el mes actual en curso, pero su
          suscripción se mantendrá activa hasta el final del período de
          suscripción actual.
          <br />
          <br />
          Modificaciones de los Términos de Servicio
          <br />
          Boss Control se reserva el derecho de modificar estos Términos de
          Servicio en cualquier momento. Las modificaciones entrarán en vigor en
          el momento en que se publiquen en nuestro sitio web. Al continuar
          utilizando el servicio después de la publicación de las
          modificaciones, aceptas los Términos de Servicio modificados.
          <br />
          <br />
          Propiedad intelectual
          <br />
          Todo el contenido y materiales disponibles en el Sitio web, incluyendo
          pero no limitado a texto, gráficos, logotipos, iconos de botones,
          imágenes, clips de audio, descargas digitales, compilaciones de datos
          y software, son propiedad de Boss Control o de sus proveedores de
          contenido y están protegidos por las leyes de propiedad intelectual
          aplicables.
          <br />
          Los usuarios no pueden copiar, reproducir, distribuir, publicar,
          vender, transferir o crear trabajos derivados del contenido y
          materiales del Sitio web o del Servicio sin la autorización previa por
          escrito de Boss Control.
          <br />
          <br />
          Exclusión de garantías y limitación de responsabilidades
          <br />
          Boss Control no garantiza que el Sitio web o el Servicio serán
          ininterrumpidos, libres de errores o seguros.
          <br />
          <br />
          Uso del Servicio
          <br />
          El Servicio solo puede ser utilizado para fines legales y de acuerdo
          con estos Términos, usted acepta no utilizar el Servicio para:
          <br />
          Violar cualquier ley o regulación aplicable Publicar o transmitir
          contenido ilegal, fraudulento, difamatorio, obsceno, ofensivo o de
          otra manera inapropiado Realizar ingeniería inversa, descompilar o
          intentar derivar el código fuente del Servicio Interferir con la
          operación del Servicio o cualquier otra actividad relacionada con el
          Servicio Utilizar robots, arañas o cualquier otro medio automatizado
          para acceder al Servicio Intentar obtener acceso no autorizado a
          cualquier cuenta, sistema informático o red conectada al Servicio.
          <br />
          <br />
          Limitación de Responsabilidad
          <br />
          El Servicio se proporciona "tal cual" sin garantía de ningún tipo, ya
          sea expresa o implícita. En ningún caso seremos responsables ante
          usted o cualquier tercero por cualquier daño directo, indirecto,
          incidental, especial, punitivo o consecuente que surja del uso o la
          imposibilidad de usar el Servicio, incluso si se nos ha informado de
          la posibilidad de dichos daños. Ley aplicable Estos Términos de
          Servicio se regirán e interpretarán de acuerdo con las leyes de
          México. Cualquier disputa derivada de o relacionada con estos Términos
          de Servicio se someterá a la jurisdicción exclusiva de los tribunales
          de México.
        </Text>
      </Flex>
      <Flex align="center" direction="column">
        <CustomButton
          onClick={() => closeModal()}
          color="white"
          bg={primaryColor}
        >
          Aceptar
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default ModalConditions;
