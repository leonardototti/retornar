import { osName, browserName } from "./../helpers/client";

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------
export const IS_DEBUG    = process.env.NODE_ENV === 'development';
export const CLIENT_DATA = {
	os_name     : osName(),
	browser_name: browserName(),
};
export const ROUTE_PATH  = process.env.PUBLIC_URL || '/';

// -----------------------------------------------------------------------------
// SEO
// -----------------------------------------------------------------------------
export const SEO_TITLE     = "Retornar";
export const SEO_SEPARATOR = " - ";

// -----------------------------------------------------------------------------
// Responsive
// -----------------------------------------------------------------------------
export const IS_TOUCH_DEVICE = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

export const MQ_MOBILE       = "(max-width: 767px)";
export const MQ_MOBILE_SMALL = "(max-width: 575px)";
export const MQ_TABLET       = "(min-width: 768px) and (max-width: 1199px)";
export const MQ_TABLET_SMALL = "(min-width: 768px) and (max-width: 991px)";
export const MQ_DESKTOP      = "(min-width: 1200px)";

export let IS_MQ_MOBILE       = window.matchMedia(MQ_MOBILE).matches;
export let IS_MQ_MOBILE_SMALL = window.matchMedia(MQ_MOBILE_SMALL).matches;
export let IS_MQ_TABLET       = window.matchMedia(MQ_TABLET).matches;
export let IS_MQ_TABLET_SMALL = window.matchMedia(MQ_TABLET_SMALL).matches;
export let IS_MQ_DESKTOP      = window.matchMedia(MQ_DESKTOP).matches;

(window.matchMedia(MQ_MOBILE)).addEventListener('change', (e) => {
	IS_MQ_MOBILE = e.matches;
});

(window.matchMedia(MQ_MOBILE_SMALL)).addEventListener('change', (e) => {
	IS_MQ_MOBILE_SMALL = e.matches;
});

(window.matchMedia(MQ_TABLET)).addEventListener('change', (e) => {
	IS_MQ_TABLET = e.matches;
});

(window.matchMedia(MQ_TABLET_SMALL)).addEventListener('change', (e) => {
	IS_MQ_TABLET_SMALL = e.matches;
});

(window.matchMedia(MQ_DESKTOP)).addEventListener('change', (e) => {
	IS_MQ_DESKTOP = e.matches;
});