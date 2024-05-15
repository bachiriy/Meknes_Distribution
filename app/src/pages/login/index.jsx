import { LoginComponent } from "../../components/LoginComponent";

export default function Login(props) {
  return <LoginComponent setIsConnected={props.setIsConnected} />;
}
