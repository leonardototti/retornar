import React, { Component, Fragment } from "react";
import { Button, Empty, Modal, Row, Col } from "antd";

import * as seo from "../../helpers/seo";

import * as ordersService from "../../redux/services/ordersService";

import { Link } from "react-router-dom";

import { HiPlus } from "react-icons/hi";

import { AiFillDelete } from "react-icons/ai";
import Skeleton from "../../components/Skeleton";

const formatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			orders: [],
		};
	}

	componentDidMount() {
		document.body.classList.add("page-home");

		seo.setTitle("Pedidos");

		this.fetchGetAll();
	}

	componentWillUnmount() {
		document.body.classList.remove("page-home");
	}

	fetchGetAll = () => {
		this.setState({
			isLoading: true,
		});

		// Simula o atraso na requisição
		setTimeout(() => {
			ordersService
				.getAll()
				.then((response) => {
					this.setState({
						isLoading: false,
						orders: response.data,
					});
				})
				.catch((data) => {
					Modal.error({
						title: "Ocorreu um erro!",
						content: String(data),
					});
				});
		}, 1000);
	};

	deleteOrder = (id) => {
		Modal.confirm({
			title: "Tem certeza que deseja excluir este pedido?",
			content: "Esta ação não poderá ser desfeita.",
			okText: "Sim",
			cancelText: "Não",
			autoFocusButton: null,
			onOk: () => {
				return ordersService
					.deleteOrder(id)
					.then((response) => {
						this.fetchGetAll();
					})
					.catch((data) => {
						Modal.error({
							title: "Ocorreu um erro!",
							content: String(data),
						});
					});
			},
		});
	};

	render() {
		const { isLoading, orders } = this.state;

		return (
			<main id="site-main" role="main">
				<div className="container">
					<header>
						<h1>Pedidos</h1>
						<Link to="/novo-pedido">
							<Button
								type="primary"
								icon={
									<HiPlus
										color="#fff"
										size="20px"
										style={{ verticalAlign: "-4px", marginRight: "8px" }}
									/>
								}
							>
								Novo pedido
							</Button>
						</Link>
					</header>
					<div className="orders-container">
						{isLoading ? (
							<Fragment>
								<Skeleton h={143} hxs={356} />
								<Skeleton h={143} hxs={356} />
								<Skeleton h={143} hxs={356} />
								<Skeleton h={143} hxs={356} />
							</Fragment>
						) :
							<Fragment>
								{orders?.length > 0 ? (
									orders.map((order) => (
										<Fragment key={order.id}>
											<div className="order">
												<div className="order-header">
													<h2 className="order-title">Pedido #{order.id}</h2>
												</div>
												<div className="order-body">
													<Row gutter={[20, 20]}>
														<Col xs={24} md={6}>
															<div className="order-body-item">
																<h3 className="order-body-item-title">Sabor</h3>
																<p className="order-body-item-value">
																	{order.flavor}
																</p>
															</div>
														</Col>
														<Col xs={24} md={6}>
															<div className="order-body-item">
																<h3 className="order-body-item-title">Tamanho</h3>
																<p className="order-body-item-value">
																	{order.size}
																</p>
															</div>
														</Col>
														<Col xs={24} md={6}>
															<div className="order-body-item">
																<h3 className="order-body-item-title">
																	Adicionais
																</h3>
																<p className="order-body-item-value">
																	{
																		order.additions.length > 1
																		? `${order.additions.slice(0, -1).join(', ')} e ${order.additions.slice(-1)[0]}.`
																		: (order.additions.length === 1 ? order.additions[0] : "Nenhum adicional.")
																	}
																</p>
															</div>
														</Col>
														<Col xs={24} md={6}>
															<div className="order-body-item">
																<h3 className="order-body-item-title">
																	Total
																</h3>
																<p className="order-body-item-value">
																	{formatter.format(order.totalPrice ?? 0)}
																</p>
															</div>
														</Col>
													</Row>
												</div>
												<div className="delete-container">
													<Button type="danger" shape="circle" onClick={() => this.deleteOrder(order.id)}><AiFillDelete size="24px" color="#fff" /></Button>
												</div>
											</div>
										</Fragment>
									))
								) : (
									<Empty
										style={{
											paddingTop: "2rem",
											paddingBottom: "2rem",
										}}
										description="Nenhum pedido cadastrado."
									/>
								)}
							</Fragment>
						}
					</div>
				</div>
			</main>
		);
	}
}

export default Home;
