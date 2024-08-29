import { useRecoilValue } from "recoil";
import authScreenAtom from "../../atoms/authatoms";
import Login from "./Login";
import Signup from "./SignUp";
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  console.log("authScreenState: ", authScreenState);
  return <div>{authScreenState === "login" ? <Login/> : <Signup/>}</div>
};
export default AuthPage