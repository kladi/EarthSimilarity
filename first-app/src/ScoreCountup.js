// TODO: on props change start interval again..!!!!

import * as React from 'react';

const COUNT_DOWN_STEP = 40; // ++/ms

export class ScoreCountup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};

		this.interval = undefined;

		// this.valueUpdate = this.valueUpdate.bind(this);
		// this.stopInterval = this.stopInterval.bind(this);
	}

	componentDidMount() {
		console.log('ScoreCountup - componentDidMount - this.props.inputValue=' + this.props.inputValue);
		this.interval = setInterval(function(){
			// update value
			if (this.state.value < this.props.inputValue) {
				this.setState({
					value: this.state.value + 1,
				});
			} else {
				this.stopInterval();
			}
		}.bind(this), COUNT_DOWN_STEP);
	}

	componentWillUnmount() {
		console.log('ScoreCountup - componentWillUnmount');
		this.stopInterval();
	}

	render() {
		return (
			<h3 className='countupStyle'>
				Similarity at level:
				<br/>
				{this.state.value} %
			</h3>
		);
	};

	stopInterval() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
}