import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import jwtDecode from "jwt-decode";

export default function ProtectedRoute(Component) {
  return function ProtectedRouteWrapper(props) {
    const router = useRouter();
    const cookies = parseCookies();
    const token = cookies.token;

    useEffect(() => {
      // Si no hay un token, redirigir al usuario a la página de inicio de sesión
      if (!token) {
        router.push("/");
      } else {
        // Verificar si el token es válido
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp < Date.now() / 1000) {
            // Si el token ha expirado, redirigir al usuario a la página de inicio de sesión
            router.push("/");
          }
        } catch (error) {
          console.error("Error al decodificar el token", error);
          router.push("/");
        }
      }
    }, []);

    return <Component {...props} />;
  };
}
