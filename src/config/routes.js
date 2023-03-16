import Home from "./../screens/Home";
import NewOrder from "./../screens/NewOrder";
import Error404 from "./../screens/Error404";

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------
export const ROUTES = [
	{path: "/", component: Home},
	{path: "/novo-pedido", component: NewOrder},
	{path: "/error/404", component: Error404},
];