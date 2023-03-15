import React, { Component, Fragment } from "react";
import { Button, Empty } from "antd";

import { connect } from "react-redux";

import * as orderActions from "../../redux/actions/orderActions";

import * as seo from "../../helpers/seo";

import { Link } from "react-router-dom";

import { HiPlus } from "react-icons/hi";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		document.body.classList.add("page-home");

		seo.setTitle("Pedidos");
	}

	componentWillUnmount() {
		document.body.classList.remove("page-home");
	}

	render() {
		const { orders } = this.props;

		return (
			<main id="site-main" role="main">
				<div className="container">
					<header>
						<h1>Pedidos</h1>
						<Link to="/novo-pedido">
							<Button type="primary" icon={<HiPlus color="#fff" size="20px" style={{ verticalAlign: "-4px", marginRight: "8px" }} />}>Novo pedido</Button>
						</Link>
					</header>
					<div className="orders-container">
						{
							orders.length > 0 ?
								<Fragment></Fragment>
							:
							<Empty
								style={{
									paddingTop: "2rem",
									paddingBottom: "2rem",
								}}
								description="Nenhum pedido cadastrado."
							/>
						}
					</div>
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		orders: state.order.orders,
	};
};

export default connect(mapStateToProps, null)(Home);