import * as React from 'react';
import './App.css';
import earth from './earth.svg';
import {InputField} from './InputField.js';
import {ScoreCountup} from './ScoreCountup.js';
import {countEsi} from './esiCalculations.js';
import {ESILastSearch} from './ESILastSearch.js';
import {ESIDataProvider} from './ESIDataProvider.js';
import Modal from 'react-modal';

// const INPUT_FIELDS_NUMBER = 4;

export class ESIPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputRadius: '',
			inputDensity: '',
			inputEscapeVelocity: '',
			inputMeanTemperature: '',

			ESIcounted: false,
			showLastSearches: false,

			validRadius: false,
			validDensity: false,
			validEscapeVelocity: false,
			validMeanTemperature: false,
			allFieldsValid: false,

			records: [],

			/*
				{
					"1": {
						"radius": "1",
						"density": "11",
						"escapeVelocity": "111",
						"meanTemperature": "1111"
					},
					"2": {
						"radius": "2",
						"density": "22",
						"escapeVelocity": "222",
						"meanTemperature": "2222"
					}
				}
			*/
			json: '{"1": {"radius": "1","density": "11","escapeVelocity": "111","meanTemperature": "1111"},"2": {"radius": "2","density": "22","escapeVelocity": "222","meanTemperature": "2222"}}'
		};

		this.handleCountClick = this.handleCountClick.bind(this);
		this.handleShowLastDataClick = this.handleShowLastDataClick.bind(this);
		this.checkAllFieldsValid = this.checkAllFieldsValid.bind(this);

		this.handleRadiusChange = this.handleRadiusChange.bind(this);
		this.handleDensityChange = this.handleDensityChange.bind(this);
		this.handleEscapeVelocityChange = this.handleEscapeVelocityChange.bind(this);
		this.handleMeanTemperatureChange = this.handleMeanTemperatureChange.bind(this);

		this.handleRadiusValidate = this.handleRadiusValidate.bind(this);
		this.handleDensityValidate = this.handleDensityValidate.bind(this);
		this.handleEscapeVelocityValidate = this.handleEscapeVelocityValidate.bind(this);
		this.handleMeanTemperatureValidate = this.handleMeanTemperatureValidate.bind(this);

		this.closeModal = this.closeModal.bind(this);
	}

	render() {
		// let record = {
		// 	radius: this.state.inputRadius,
		// 	density: this.state.inputDensity,
		// 	escapeVelocity: this.state.inputEscapeVelocity,
		// 	meanTemperature: this.state.inputMeanTemperature,
		// };

		// const args = [6371, 5.51, 1, 288];
		const args = [
			Number(this.state.inputRadius),
			Number(this.state.inputDensity),
			Number(this.state.inputEscapeVelocity),
			Number(this.state.inputMeanTemperature),
		];

		console.log('--- render args ---');
		console.log(args);

		console.log('--render-- allFieldsValid = ' + this.state.allFieldsValid);
		console.log('--render-- valid?  = ' + this.state.validRadius + this.state.validDensity + this.state.validEscapeVelocity + this.state.validMeanTemperature);

		const customStyles = {
			content : {
			  top                   : '50%',
			  left                  : '50%',
			  right                 : 'auto',
			  bottom                : 'auto',
			  marginRight           : '-50%',
			  transform             : 'translate(-50%, -50%)'
			}
		  };

		return (
			<form>
				<h1> EARTH SIMILARITY INDEX </h1>
				<img src={earth} className="App-logo" alt="logo" />

				{this.state.ESIcounted &&
					<ScoreCountup
						inputValue={countEsi(args)}
					/>
				}

				<hr className='style1 hr75'/>
				<InputField
					number={true}
					placeholder='Radius [km]'
					inputValue={this.state.inputRadius}
					onChange={this.handleRadiusChange}
					onValidate={this.handleRadiusValidate}
				/>
				<hr className='style1 hr50'/>
				<InputField
					number={true}
					placeholder='Density [g/cm3]'
					inputValue={this.state.inputDensity}
					onChange={this.handleDensityChange}
					onValidate={this.handleDensityValidate}
				/>
				<hr className='style1 hr75'/>
				<InputField
					number={true}
					placeholder='EscapeVelocity [km/s]'
					inputValue={this.state.inputEscapeVelocity}
					onChange={this.handleEscapeVelocityChange}
					onValidate={this.handleEscapeVelocityValidate}
				/>
				<hr className='style1 hr50'/>
				<InputField
					number={true}
					placeholder='MeanTemperature [K]'
					inputValue={this.state.inputMeanTemperature}
					onChange={this.handleMeanTemperatureChange}
					onValidate={this.handleMeanTemperatureValidate}
				/>
				<hr className='style1 hr75'/>

				<button
					type='submit'
					className='btn btn-primary btnStyle'
					disabled={!this.checkAllFieldsValid()}
					onClick={this.handleCountClick}
				>
					Count similarity
				</button>

				<button
					type='button'
					className='btn btn-primary btnStyle'
					onClick={this.handleShowLastDataClick}
				>
					{this.state.showLastSearches ? 'Hide latest searches' : 'Show latest searches'}
				</button>

				{this.state.showLastSearches &&
					<ESILastSearch
						data={this.state.records}
					/>
				}

			<Modal
				isOpen={this.state.showLastSearches}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				contentLabel="Example Modal"
				style={customStyles}
			>
				<h2 ref={subtitle => this.subtitle = subtitle}>Latest Searches List</h2>
				<form>
					<ESILastSearch
						data={this.state.records}
					/>
				</form>		  
				<button onClick={this.closeModal} style={{marginLeft: '80%', width: '16%'}}>close</button>
			</Modal>

			</form>
		);
	}

	closeModal() {
		this.setState({
			showLastSearches: !this.state.showLastSearches,
		});
	}

	handleCountClick(e) {
		e.preventDefault();
		this.setState({
			ESIcounted: true,
		});

		console.log('buttonClicked = sending data POST..');
		ESIDataProvider.sendData(
			this.state.inputRadius,
			this.state.inputDensity,
			this.state.inputEscapeVelocity,
			this.state.inputMeanTemperature,
		);

		let obj = [
			this.state.inputRadius,
			this.state.inputDensity,
			this.state.inputEscapeVelocity,
			this.state.inputMeanTemperature,
		];
		this.state.records.push(obj);
		console.log('!!!!!!!!!!!!!!!!!! this.state.records = ' + this.state.records);
	}

	handleShowLastDataClick(e) {
		e.preventDefault();
		if (!this.state.showLastSearches) {
			ESIDataProvider.receiveData().then((response) => {
				console.log('receiveData result = ..');
				console.log(response.json);
				this.setState({
					json: response.json,
				})
			});
		}

		this.setState({
			showLastSearches: !this.state.showLastSearches,
		});
	}

	checkAllFieldsValid() {
		return this.state.validRadius &&
			this.state.validDensity &&
			this.state.validEscapeVelocity &&
			this.state.validMeanTemperature;
	}

	handleRadiusChange(val) {
		console.log(val.new_value + " - " + val.new_validation);
		this.setState({
			inputRadius: val,
			ESIcounted: false,
		});
	}
	handleDensityChange(val) {
		console.log(val);
		this.setState({
			inputDensity: val,
			ESIcounted: false,
		});
	}
	handleEscapeVelocityChange(val) {
		this.setState({
			inputEscapeVelocity: val,
			ESIcounted: false,
		});
	}
	handleMeanTemperatureChange(val) {
		this.setState({
			inputMeanTemperature: val,
			ESIcounted: false,
		});
	}

	handleRadiusValidate(isValid) {
		this.setState({
			validRadius: isValid,
			allFieldsValid: this.checkAllFieldsValid(),
		});
	}
	handleDensityValidate(isValid) {
		this.setState({
			validDensity: isValid,
			allFieldsValid: this.checkAllFieldsValid(),
		});
	}
	handleEscapeVelocityValidate(isValid) {
		this.setState({
			validEscapeVelocity: isValid,
			allFieldsValid: this.checkAllFieldsValid(),
		});
	}
	handleMeanTemperatureValidate(isValid) {
		this.setState({
			allFieldsValid: this.checkAllFieldsValid(),
			validMeanTemperature: isValid,
		});
	}
}
