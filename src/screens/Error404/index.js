import React, { Component, Fragment } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import * as seo from "../../helpers/seo";

class Error404 extends Component {
	componentDidMount() {
		document.body.classList.add('page-error', 'page-error-404');

		seo.setTitle('404 - Página não encontrada');
	}

	componentWillUnmount() {
		document.body.classList.remove('page-error', 'page-error-404');
	}

	render() {
		return (
			<Fragment>
				<main id="site-main" role="main">
					<div className="container">
						<div className="main-content">
							<div className="general-error text-center">
								<h1 className="color-primary text-weight-700 mb-10">Página não encontrada!</h1>
								<p className="mb-35 text-color">O conteúdo que você tentou acessar não foi encontrado.</p>
								<Link to="/">
									<Button type="primary">Voltar para o início</Button>
								</Link>
							</div>
						</div>
					</div>
				</main>
			</Fragment>
		)
	}
}

export default Error404;