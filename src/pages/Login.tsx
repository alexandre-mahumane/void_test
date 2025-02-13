import { Login } from "../components/Login";
import useProgresso from "../hooks/useProgress";

export const LoginPage = () => {
  const { progresso } = useProgresso();

  console.log(progresso);
  return (
    <>
      <Login />
    </>
  );
};
