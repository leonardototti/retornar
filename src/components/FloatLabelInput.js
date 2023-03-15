import React, { forwardRef, useState } from "react";
import * as PropTypes from "prop-types";
import { Input } from "antd";

import { IS_MQ_MOBILE } from "../config/general";

const FloatLabelInput = forwardRef((props, ref) => {
	const [focus, setFocus] = useState(false);

	const {value, placeholder, labelTop, labelLeft, labelFocusTop, labelFocusLeft, labelFocusSize, mobileLabelTop, mobileLabelLeft, mobileLabelFocusTop, mobileLabelFocusLeft, mobileLabelFocusSize, ...rest} = props;

	let labelClass = (!!value || focus) ? "float-label float-label-focus" : "float-label";
	let labelStyle = (!!value || focus) ? {transform: `translate3d(${labelFocusLeft}, ${labelFocusTop},0) scale(${labelFocusSize})`} : {transform: `translate3d(${labelLeft}, ${labelTop},0) scale(1)`};

	if( IS_MQ_MOBILE )
	{
		labelStyle = (!!value || focus) ? {transform: `translate3d(${mobileLabelFocusLeft}, ${mobileLabelFocusTop},0) scale(${mobileLabelFocusSize})`} : {transform: `translate3d(${mobileLabelLeft}, ${mobileLabelTop},0) scale(1)`};
	}

	return (
		<div
			className="float-label-wrap"
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}>
			<Input
				ref={ref}
				value={value}
				{...rest}
			/>
			{!!placeholder && <label className={labelClass} style={labelStyle}>{placeholder}</label>}
		</div>
	);
});

FloatLabelInput.propTypes = {
	placeholder         : PropTypes.string,
	labelTop            : PropTypes.string,
	labelLeft           : PropTypes.string,
	labelFocusTop       : PropTypes.string,
	labelFocusLeft      : PropTypes.string,
	labelFocusSize      : PropTypes.number,
	mobileLabelTop      : PropTypes.string,
	mobileLabelLeft     : PropTypes.string,
	mobileLabelFocusTop : PropTypes.string,
	mobileLabelFocusLeft: PropTypes.string,
	mobileLabelFocusSize: PropTypes.number,
	...Input.propTypes,
}

FloatLabelInput.defaultProps = {
	placeholder         : '',
	labelTop            : '15px',
	labelLeft           : '20px',
	labelFocusTop       : '7px',
	labelFocusLeft      : '21px',
	labelFocusSize      : 0.7,
	mobileLabelTop      : '15px',
	mobileLabelLeft     : '20px',
	mobileLabelFocusTop : '7px',
	mobileLabelFocusLeft: '22px',
	mobileLabelFocusSize: 0.7,
}

export default FloatLabelInput;