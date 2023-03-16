import React, { Component } from "react";
import { Button } from "antd";

import * as seo from "../../helpers/seo";

import { Link } from "react-router-dom";

class OrderSuccess extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		document.body.classList.add("page-ordersuccess");

		seo.setTitle("Sucesso!");
	}

	componentWillUnmount() {
		document.body.classList.remove("page-ordersuccess");
	}

	render() {
		return (
			<main id="site-main" role="main">
				<div className="container">
					<h1>Sucesso!</h1>
					<p>Pedido realizado com sucesso!</p>
					<Link to="/">
						<Button type="primary">Voltar ao início</Button>
					</Link>
				</div>
			</main>
		);
	}
}

export default OrderSuccess;