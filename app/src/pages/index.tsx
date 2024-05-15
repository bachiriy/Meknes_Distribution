import { Layout } from "../components/Layout";
import Aside from "../components/Aside";
import { Login } from "../components/Login";

let isLoggedIn = true;

export const IndexPage = () => {
	return (
		<Layout>
			{
				isLoggedIn ? <Login /> : <Aside inPage={1} />
			}
		</Layout>
	);
};
