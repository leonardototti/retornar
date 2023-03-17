import React, { Component, Fragment } from "react";
import { Button, Row, Col, Modal } from "antd";

import * as seo from "../../helpers/seo";

import * as ordersService from "../../redux/services/ordersService";

import { Link, withRouter } from "react-router-dom";

const formatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const flavorsArray = [
	{
		id: 1,
		name: "Açaí com morango",
		image: "/flavors/strawberry.png",
	},
	{
		id: 2,
		name: "Açaí com banana",
		image: "/flavors/banana.png",
	},
	{
		id: 3,
		name: "Açaí com kiwi",
		image: "/flavors/kiwi.png",
	},
];

const sizesArray = [
	{
		id: 1,
		name: "Pequeno 300ml",
		image: "/sizes/01.png",
		price: 10,
	},
	{
		id: 2,
		name: "Médio 500ml",
		image: "/sizes/02.png",
		price: 12,
	},
	{
		id: 3,
		name: "Grande 700ml",
		image: "/sizes/03.png",
		price: 15,
	},
];

const additionsArray = [
	{
		id: 1,
		name: "Granola",
		image: "/additions/01.png",
	},
	{
		id: 2,
		name: "Paçoca",
		image: "/additions/02.png",
	},
	{
		id: 3,
		name: "Leite ninho",
		image: "/additions/03.png",
	},
];

class NewOrder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			step: 1,
			flavor: 0,
			size: 0,
			additions: [],
			additionsNames: [],
			deliveryTime: 0,
			totalPrice: 0,
		};
	}

	componentDidMount() {
		document.body.classList.add("page-neworder");

		seo.setTitle("Novo pedido");
	}

	componentWillUnmount() {
		document.body.classList.remove("page-neworder");
	}

	goNextStep = () => {
		const { step } = this.state;

		if(step === 1 && this.state.flavor === 0) {
			Modal.error({
				title: "Erro",
				content: "Você precisa escolher um sabor para continuar.",
			});

			return false;
		}

		if(step === 2 && this.state.size === 0) {
			Modal.error({
				title: "Erro",
				content: "Você precisa escolher um tamanho para continuar.",
			});

			return false;
		}

		if(step === 3) {
			const { additions } = this.state;

			this.setState({
				isLoading: true,
				additionsNames: additions.map((addition) => additionsArray.find((additionItem) => additionItem.id === addition).name),
			});

			let deliveryTime = 0;
			let totalPrice = 0;

			switch(this.state.size) {
				// Pequeno
				case 1:
					deliveryTime = 5;
					totalPrice = 10;
					break;
				// Médio
				case 2:
					deliveryTime = 7;
					totalPrice = 12;
					break;
				// Grande
				case 3:
					deliveryTime = 9;
					totalPrice = 15;
					break;
			}

			this.setState({
				deliveryTime,
				totalPrice,
			});

			ordersService.createOrder({
				flavor: flavorsArray.find((flavor) => flavor.id === this.state.flavor).name,
				size: sizesArray.find((size) => size.id === this.state.size).name,
				additions: additions.map((addition) => additionsArray.find((additionItem) => additionItem.id === addition).name),
				deliveryTime,
				totalPrice,
			})
			.then((response) => {
				this.setState({ isLoading: false, step: 4 });
			})
			.catch((data) => {
				this.setState({ isLoading: false });

				Modal.error({
					title: "Ocorreu um erro!",
					content: String(data),
				});
			});
			
			return false;
		}

		this.setState({ step: step + 1 });
	};

	goPreviousStep = () => {
		const { step } = this.state;

		this.setState({ step: step - 1 });
	};

	toggleAddition = (id) => {
		const { additions, isLoading } = this.state;

		if(!isLoading) {
			if(additions.includes(id)) {
				this.setState({ additions: additions.filter((addition) => addition !== id) });
			} else {
				this.setState({ additions: [...additions, id] });
			}
		}
	};

	render() {
		const { step, isLoading, flavor, size, additions, additionsNames } = this.state;

		return (
			<main id="site-main" role="main">
				<div className="container">
					{
						step !== 4 ? (
							<Fragment>
								<header>
									<h1>Novo pedido</h1>
								</header>

								{step === 1 && (
									<Fragment>
										<h2>Primeiramente escolha o sabor do seu açaí:</h2>

										<div className="items-container flavors">
											<Row gutter={[20, 20]}>
												{flavorsArray.map((flavor) => (
													<Col xs={24} md={8} key={flavor.id}>
														<div className={`item${this.state.flavor === flavor.id ? " active" : ""}`} onClick={() => this.setState({ flavor: flavor.id })}>
															<img src={flavor.image} alt={flavor.name} />
															<p>{flavor.name}</p>
														</div>
													</Col>
												))}
											</Row>
										</div>
									</Fragment>
								)}

								{step === 2 && (
									<Fragment>
										<h2>Agora escolha o tamanho do seu açaí:</h2>

										<div className="items-container sizes">
											<Row gutter={[20, 20]}>
												{sizesArray.map((size) => (
													<Col xs={24} md={8} key={size.id}>
														<div className={`item${this.state.size === size.id ? " active" : ""}`} onClick={() => this.setState({ size: size.id })}>
															<img src={size.image} alt={size.name} />
															<p>{size.name}</p>
															<p className="price">{formatter.format(size.price)}</p>
														</div>
													</Col>
												))}
											</Row>
										</div>
									</Fragment>
								)}

								{step === 3 && (
									<Fragment>
										<h2>Por fim, escolha os adicionais do seu açaí:</h2>

										<div className="items-container additions">
											<Row gutter={[20, 20]}>
												{additionsArray.map((addition) => (
													<Col xs={24} md={8} key={addition.id}>
														<div className={`item${this.state.additions.includes(addition.id) ? " active" : ""}`} style={{ cursor: isLoading ? "not-allowed" : "pointer" }} onClick={() => this.toggleAddition(addition.id)}>
															<img src={addition.image} alt={addition.name} />
															<p>{addition.name}</p>
														</div>
													</Col>
												))}
											</Row>
										</div>
									</Fragment>
								)}

								<div className="button-container steps">
									{
										step > 1 && !isLoading && (
											<Button type="default" onClick={this.goPreviousStep}>Anterior</Button>
										)
									}
									<Button type="primary" className="btn-next" loading={isLoading} onClick={this.goNextStep}>{step === 3 ? (isLoading ? "Finalizando" : "Finalizar") : "Próximo"}</Button>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<div className="order-finished">
									<h1 className="text-center">Pedido finalizado</h1>
									<p className="subtitle">Seu pedido foi realizado com sucesso!</p>

									<div className="order-summary">
										<h2>Resumo do pedido</h2>

										<div className="order-summary-item">
											<span>Sabor:</span> <span>{flavorsArray.find((flavor) => flavor.id === this.state.flavor).name}</span>
										</div>

										<div className="order-summary-item">
											<span>Tamanho:</span> <span>{sizesArray.find((size) => size.id === this.state.size).name}</span>
										</div>

										<div className="order-summary-item">
											<span>Adicionais:</span> <span>{additionsNames.length > 1 ? `${additionsNames.slice(0, -1).join(', ')} e ${additionsNames.slice(-1)[0]}.` : (additionsNames.length === 1 ? additionsNames[0] : "Nenhum adicional.")}</span>
										</div>

										<div className="order-summary-item" style={{ marginTop: "20px", fontWeight: "600" }}>
											<span>Tempo de entrega:</span> <span>{this.state.deliveryTime} minutos</span>
										</div>

										<div className="order-summary-item" style={{ fontWeight: "600" }}>
											<span>Total:</span> <span>{formatter.format(this.state.totalPrice)}</span>
										</div>
									</div>

									<div className="button-container">
										<Link to="/">
											<Button type="primary">Voltar para o início</Button>
										</Link>
									</div>
								</div>
							</Fragment>
						)
					}
				</div>
			</main>
		);
	}
}

export default withRouter(NewOrder);