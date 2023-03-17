import axios from "axios";
// import authConstants from "../redux/constants/authConstants";
// import { store } from "../redux/store/configureStore";

import {
	API_ERRO_TYPE_API, API_ERRO_TYPE_CANCEL, API_ERRO_TYPE_CONNECTION,
	API_ERRO_TYPE_OTHER, API_ERRO_TYPE_SERVER, API_ERRO_TYPE_VALIDATION, API_URL, IS_DEBUG
} from "./general";

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------
export const API_HEADER_DEFAULT = {
	Accept            : "application/json",
	"Content-Type"    : "application/json",
	Language          : "pt",
	"X-Requested-With": "XMLHttpRequest",
};

// -----------------------------------------------------------------------------
// Instance
// -----------------------------------------------------------------------------
export const api = axios.create({
	baseURL: API_URL,
	timeout: 30 * 1000,
	headers: API_HEADER_DEFAULT,
});

// /**
//  * Update acess token on default request
//  *
//  * @param accessToken
//  */
// export const apiUpdateAccessToken = (accessToken) => {
// 	accessToken = accessToken ? accessToken : store.getState().auth.accessToken;

// 	// Set accessToken to instance
// 	api.defaults.headers["Authorization"] = accessToken;
// };

// /**
//  * Reset acess token on default request
//  */
// export const apiResetAccessToken = () => {
// 	// Remove accessToken to instance
// 	delete api.defaults.headers["Authorization"];
// };

// -----------------------------------------------------------------------------
// Interceptors
// -----------------------------------------------------------------------------
api.interceptors.request.use((config) => {
	// Debug
	if( IS_DEBUG )
	{
		console.log("request", `${String(config.method).toUpperCase()} ${config.baseURL}${config.url}`);

		if( config.hasOwnProperty("data") )
		{
			console.log("request data", config.data);
		}
	}

	// if( !config.headers["Authorization"] )
	// {
	// 	const accessToken = store.getState().auth.accessToken;

	// 	if( accessToken )
	// 	{
	// 		config.headers["Authorization"] = accessToken;

	// 		// Update accessToken on instance
	// 		apiUpdateAccessToken(accessToken);
	// 	}
	// }

	return config;
});

api.interceptors.response.use((response) => {
	if( IS_DEBUG )
	{
		console.log("response status", response.status);
		console.log("response headers", response.headers);
		console.log("response data", response.data);
	}

	if( response.data )
	{
		if( typeof response.data !== 'object' || response.data?.status === 'erro' || response.data?.status === 'error' )
		{
			const error = {
				response,
			}

			let errorReturn = {
				error: error,
				...getError(error),
			};

			errorReturn.toString = () => errorReturn.error_message;

			return Promise.reject(errorReturn);
		}
	}

	return response;
}, (error) => {
	if( axios.isCancel(error) )
	{
		let errorReturn = {
			error        : error,
			error_type   : API_ERRO_TYPE_CANCEL,
			error_title  : "Ocorreu um erro!",
			error_message: "Requisição cancelada.",
			error_errors : {},
		};

		errorReturn.toString = () => errorReturn.error_message;

		return Promise.reject(errorReturn);
	}

	if( IS_DEBUG && error.response )
	{
		console.log("response status", error.response.status);
		console.log("response headers", error.response.headers);
		console.log("response data", error.response.data);
	}

	// Has response from server
	if( error.response )
	{
		// Invalid Token
		if( error.response.status === 401 )
		{
			// Logout
			// Like authActions.silentLogout()
			// store.dispatch({
			// 	type: authConstants.LOGOUT,
			// });

			let errorReturn = {
				error        : error,
				error_type   : API_ERRO_TYPE_OTHER,
				error_title  : "Ocorreu um erro!",
				error_message: error.response.data?.message ?? "Você foi deslogado" + ", por favor realize novamente o login.",
				error_errors : {},
			};

			errorReturn.toString = () => errorReturn.error_message;

			return Promise.reject(errorReturn);
		}
	}

	let errorReturn = {
		error: error,
		...getError(error),
	};

	errorReturn.toString = () => errorReturn.error_message;

	return Promise.reject(errorReturn);
});

/**
 * Get erro to response
 *
 * @param error
 * @returns {{error_type: string, error_title: string, error_message: string, error_errors}}
 */
export function getError(error) {
	let error_type    = "";
	let error_title   = "Ocorreu um erro!";
	let error_message = "";
	let error_errors  = {};

	// Has response from server
	if( error.response )
	{
		const {data} = error.response;

		// Invalid json
		if( typeof data !== 'object' )
		{
			error_message = 'API retornou uma resposta inválida, por favor tente novamente.';
		}

		// Key message on data
		if( data.hasOwnProperty("titulo") )
		{
			error_title = data.titulo;
		}

		// Key message on data
		if( data.hasOwnProperty("message") )
		{
			error_message = data.message;
		}

		// Key mensagem on data
		if( data.hasOwnProperty("mensagem") )
		{
			error_message = data.mensagem;
		}

		// 401 with message
		if( error.response.status === 401 )
		{
			error_type = API_ERRO_TYPE_OTHER;

			if( !error_message )
			{
				error_message = "Ocorreu um erro de autorização, por favor tente novamente.";
			}
		}
		// Form validation error
		else if( error.response.status === 422 )
		{
			error_type = API_ERRO_TYPE_VALIDATION;

			// Get first validation error
			if( data.hasOwnProperty("errors") )
			{
				let data_errors = data.errors;

				// First error
				for( let key in data_errors )
				{
					if( data_errors.hasOwnProperty(key) )
					{
						error_message = data_errors[key][0];

						break;
					}
				}

				for( let key in data_errors )
				{
					if( data_errors.hasOwnProperty(key) )
					{
						error_errors[key] = data_errors[key][0];
					}
				}
			}
		}
		// Too Many Requests
		else if( error.response.status === 429 )
		{
			error_type = API_ERRO_TYPE_SERVER;

			if( !error_message )
			{
				error_message = "Foi atingido o limite de requisições ao servidor, por favor tente novamente mais tarde.";
			}
		}
		// Internal server error
		else if( error.response.status === 500 )
		{
			error_type = API_ERRO_TYPE_SERVER;

			if( !error_message )
			{
				error_message = "Ocorreu uma falha de comunicação com o servidor.";
			}
		}
		// Not found
		else if( error.response.status === 404 )
		{
			error_type = API_ERRO_TYPE_OTHER;

			if( !error_message )
			{
				error_message = "A url acessada não existe.";
			}
		}
		// 400-499 with message
		else if( error.response.status > 400 && error.response.status < 499 )
		{
			error_type = API_ERRO_TYPE_API;

			if( !error_message )
			{
				error_message = "Ocorreu um erro, por favor tente novamente.";
			}
		}
		else
		{
			error_type = API_ERRO_TYPE_OTHER;

			if( !error_message )
			{
				error_message = "Ocorreu um erro, por favor tente novamente.";
			}
		}
	}
	else
	{
		error_type    = API_ERRO_TYPE_CONNECTION;
		error_message = "Falha de comunicação com o servidor, verifique sua conexão com a internet e tente novamente.";
	}

	return {
		error_type   : error_type,
		error_title  : error_title,
		error_message: error_message,
		error_errors : error_errors,
	};
}