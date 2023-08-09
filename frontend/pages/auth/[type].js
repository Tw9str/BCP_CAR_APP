import { useRouter } from "next/router";
import LoginForm from "@/components/loginPage/LoginForm";
import RegisterForm from "@/components/loginPage/RegisterForm";
import NotFound from "../404";

const AuthPage = () => {
  const router = useRouter();
  const { type } = router.query;

  return type === "register" ? (
    <RegisterForm />
  ) : type === "login" ? (
    <LoginForm />
  ) : (
    <NotFound />
  );
};

export default AuthPage;
