import * as React from 'react';
import './App.css';
import { validatorNumber } from './validators.js';

/**
 * Props
 * - inputValue: string;
 * - placeholder: string;
 * - onChange?: (value: string) => void;
 * - onValidate?:
 * - number: if field is type of number
 *
 * @export
 * @class InputField
 * @extends {React.PureComponent}
 */
export class InputField extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: props.inputValue || '',
			isValid: true,
		};

		this.handleChange = this.handleChange.bind(this);
		this.isValueValid = this.isValueValid.bind(this);

		console.log(this.props.onValidate);
	}

	getDerivedStateFromProps(nextProps, prevState) {
		console.log('<<<--- getDerivedStateFromProps');
		console.log(nextProps);
		console.log(prevState);
		console.log('>>>--- getDerivedStateFromProps');
		return null;
	}

	render() {
		// const styleInvalid = this.isValid(inputValue) ? 'text-medium-16-600 text-color-3 full-width' : 'fieldInvalid';

		return (
			<input
				type='text'
				// className={this.state.isValid ? `text-medium-16-600 text-color-3 full-width`}
				placeholder={this.props.placeholder}
				value={this.state.inputValue}
				onChange={this.handleChange}
				className='inputStyle'
			/>
		);
	}

	handleChange(event) {
		const newValue = event.target.value;
		this.setState({
			inputValue: newValue,
		}, () => {
			this.props.onChange && this.props.onChange(newValue);
			// console.log("handle change - inputValue: " + newValue + "  , is valid? " +
			// 	this.isValueValid(newValue),
			// );

			// let changeObj = {
			// 	new_value: newValue,
			// 	new_validation: this.props.number ? validatorNumber(newValue || "") : true,
			// }
			// this.props.onChange && this.props.onChange(changeObj);

			this.isValueValid(newValue);
		});
	}

	isValueValid(value) {
		let isValid = this.props.number ? validatorNumber(value || "") : true;
		this.props.onValidate && this.props.onValidate(isValid);
	}
}