import { FC } from "react";
import { Layout } from "../components/Layout";

export const IndexPage: FC = () => {
	return (
		<Layout>
			<div className="text-red-600">Hello main (new update!)</div>
		</Layout>
	);
};
