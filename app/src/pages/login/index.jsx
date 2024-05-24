import { LoginComponent } from "../../components/Auth/LoginComponent";

export default function Login(props) {
  return <LoginComponent setIsConnected={props.setIsConnected} />;
}
