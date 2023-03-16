import React, { Component, Fragment } from "react";
import { Button, Row, Col, Modal } from "antd";

import * as seo from "../../helpers/seo";

const formmater = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

class NewOrder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 1,
			flavor: 0,
			size: 0,
			additions: [],
			isLoading: false,
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
			this.setState({ isLoading: true });

			const { flavor, size, additions } = this.state;
			
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
		const { orders } = this.props;

		const { step, isLoading } = this.state;

		const flavors = [
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

		const sizes = [
			{
				id: 1,
				name: "Pequeno",
				image: "/sizes/01.png",
				price: 10,
			},
			{
				id: 2,
				name: "Médio",
				image: "/sizes/02.png",
				price: 12,
			},
			{
				id: 3,
				name: "Grande",
				image: "/sizes/03.png",
				price: 15,
			},
		];

		const additions = [
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

		return (
			<main id="site-main" role="main">
				<div className="container">
					<header>
						<h1>Novo pedido</h1>
					</header>

					{step === 1 && (
						<Fragment>
							<h2>Primeiramente escolha o sabor do seu açaí:</h2>

							<div className="items-container flavors">
								<Row gutter={[20, 20]}>
									{flavors.map((flavor) => (
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
									{sizes.map((size) => (
										<Col xs={24} md={8} key={size.id}>
											<div className={`item${this.state.size === size.id ? " active" : ""}`} onClick={() => this.setState({ size: size.id })}>
												<img src={size.image} alt={size.name} />
												<p>{size.name}</p>
												<p className="price">{formmater.format(size.price)}</p>
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
									{additions.map((addition) => (
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

					<div className="button-container">
						{
							step > 1 && !isLoading && (
								<Button type="default" onClick={this.goPreviousStep}>Anterior</Button>
							)
						}
						<Button type="primary" className="btn-next" loading={isLoading} onClick={this.goNextStep}>{step === 3 ? (isLoading ? "Finalizando" : "Finalizar") : "Próximo"}</Button>
					</div>
				</div>
			</main>
		);
	}
}

export default NewOrder;