import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ROUTES } from "../../config/routes";
import Error404 from "../../screens/Error404";
import pt_BR from 'antd/es/locale/pt_BR';
import '../../styles/app.scss';

class Main extends Component {
	render() {
		return (
			<ConfigProvider locale={pt_BR}>
				<Switch>
					{ROUTES.map((route, i) => (
						<Route
							key={i}
							exact={route?.exact ?? true}
							path={route.path}
							component={(props) => {
								// Autenticação de rotas caso tivesse sistema de login
								
								// if( route.hasOwnProperty('logged') )
								// {
								// 	// Only logged
								// 	if( route.logged && !this.props.isAuthenticated )
								// 	{
								// 		const currentUrl = new URL(window.location.href);

								// 		return <Redirect to={{pathname: "/login", search: `?origin=${encodeURIComponent(`${currentUrl.pathname}${currentUrl.search}`)}`}} />;
								// 	}
								// 	// Only logged out
								// 	else if( !route.logged && this.props.isAuthenticated )
								// 	{
								// 		return <Redirect to="/account" />;
								// 	}
								// }

								return <route.component {...props} />;
							}}
						/>
					))}
					<Route path="*" component={Error404} />
				</Switch>
				<footer>
					<p>Desenvolvido por Leonardo Totti</p>
					<p><a href="https://github.com/leonardototti/retornar" target="_blank" rel="noopener noreferrer">Repositório</a> | <a href="https://www.linkedin.com/in/leonardototti/" target="_blank" rel="noopener noreferrer">Linkedin</a> | <a href="https://github.com/leonardototti" target="_blank" rel="noopener noreferrer">Github</a></p>
				</footer>
			</ConfigProvider>
		)
	}
}

export default withRouter(Main);