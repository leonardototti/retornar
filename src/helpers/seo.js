import { SEO_TITLE, SEO_SEPARATOR } from "../config/general";

/**
 * Set title tag
 *
 * @param {string|Array} title
 * @param {boolean} raw
 *
 * @returns {string}
 */
export function setTitle(title, raw = false) {
	let title_;

	if( Array.isArray(title) )
	{
		title_ = title.join(SEO_SEPARATOR);
	}
	else
	{
		title_ = String(title);
	}

	if( raw )
	{
		document.title = title_;
	}
	else if( !title_ )
	{
		document.title = SEO_TITLE;
	}
	else
	{
		if( title_.length > 60 )
		{
			title_ = `${title_.substring(0, 60)}...`;
		}

		document.title = title_ + SEO_SEPARATOR + SEO_TITLE;
	}
}

/**
 * URL games sort parameters
 *
 * @returns {string}
 */
export function getUrlGamesSortParameters(url) {
	const params = {
		'sort'                : [],
		'term'                : [],
		'players'             : [],
		'network'             : [],
		'monetization'        : [],
		'monetization-android': [],
		'monetization-ios'    : [],
		'score'               : [],
		'screen-orientation'  : [],
		'category'            : [],
		'sub-category'        : [],
		'tags'                : [],
		'countries'           : [],
		'countries-android'   : [],
		'countries-ios'       : [],
		'listType'            : [],
	};

	Object.entries(params).forEach(([key, values]) => {
		// Check has url param
		if( url.searchParams.has(key) )
		{
			// Unique vals, no escape +(space)
			if( key === 'sort' || key === 'term' || key === 'listType' )
			{
				params[key] = [url.searchParams.get(key)];
			}
			else
			{
				params[key] = url.searchParams.get(key).split(' ');
			}
		}
		else
		{
			// Remove
			delete params[key];
		}
	});

	// Sort values
	Object.entries(params).forEach(([key, values]) => {
		params[key] = values.sort((a, b) => a.localeCompare(b))
	});

	const search = [];

	// Prepare
	Object.entries(params).forEach(([key, values]) => {
		search.push(`${key}=${values.join('+')}`)
	});

	return `?${search.join('&')}`;
}
