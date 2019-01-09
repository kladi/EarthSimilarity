/*
var validation_messages = {
	"key_1": {
		"your_name": "jimmy",
		"your_msg": "hello world"
	},
	"key_2": {
		"your_name": "billy",
		"your_msg": "foo equals bar"
	}
}
*/

import * as React from 'react';

export class ESILastSearch extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			dataHTML: Object,
		}
	}

	componentDidMount() {
		// let json = JSON.parse(String(this.props.data));
		// this.processJSON(json);
		this.processArrayData(this.props.data);
		console.log('-----------data = ' + this.props.data);
	}

	processArrayData(data) {
		console.log('-----------ARRAY = ' + data);
		// let objName;

		// var records = [];
		// for (objName in json) {
		// 	// console.log('for - json objName density = ..');
		// 	// console.log(json[objName]);
		// 	records.push(json[objName]);
		// 	// this.addRecord(json[objName]);
		// }
		// console.log(records);

		var rows = [];
		for (let i = 0; i < data.length; i++) {
			rows.push(
				<tr key={Math.random()}>
					{/* <td>{data[i*4]}</td>
					<td>{data[i*4+1]}</td>
					<td>{data[i*4+2]}</td>
					<td>{data[i*4+3]}</td> */}
					<td>{data[i][0]}</td>
					<td>{data[i][1]}</td>
					<td>{data[i][2]}</td>
					<td>{data[i][3]}</td>
				</tr>
			);
		}

		// console.log(rows);

		this.setState({
			dataHTML: rows,
		});
	}

	// processJSON(json) {
	// 	let objName;

	// 	var records = [];
	// 	for (objName in json) {
	// 		// console.log('for - json objName density = ..');
	// 		// console.log(json[objName]);
	// 		records.push(json[objName]);
	// 		// this.addRecord(json[objName]);
	// 	}
	// 	console.log(records);

	// 	var rows = [];
	// 	records.forEach(function(obj) {
	// 		rows.push(
	// 			<tr key={Math.random()}>
	// 				<td>{obj.radius}</td>
	// 				<td>{obj.density}</td>
	// 				<td>{obj.escapeVelocity}</td>
	// 				<td>{obj.meanTemperature}</td>
	// 			</tr>
	// 		);
	// 	});

	// 	console.log(rows);

	// 	this.setState({
	// 		dataHTML: rows,
	// 	});
	// }

	// addRecord(obj) {
	// 	console.log('ESILastSearch - addRecord - obj = ..');
	// 	console.log(obj);
	// 	let singleRow = (
	// 		<tr>
	// 			<td>{obj.radius}</td>
	// 			<td>{obj.density}</td>
	// 			<td>{obj.escapeVelocity}</td>
	// 			<td>{obj.meanTemperature}</td>
	// 		</tr>
	// 	);

	// 	var singleTr = '<tr>';
	// 	singleTr += '<td>' + obj.radius + '</td>';
	// 	singleTr += '<td>' + obj.density + '</td>';
	// 	singleTr += '<td>' + obj.escapeVelocity + '</td>';
	// 	singleTr += '<td>' + obj.meanTemperature + '</td>';
	// 	singleTr += '</tr>'

	// 	// console.log('ESILastSearch - addRecord - singleRow = ');
	// 	// console.log(singleRow);



	// 	this.setState({
	// 		dataHTML: this.state.dataHTML.appendChild(singleRow),
	// 		// dataHTML: singleRow,
	// 		// dataHTML: this.state.dataHTML + singleTr,
	// 	});
	// }

	render() {
		// console.log('ESILastSearch - render - this.state.dataHTML');
		console.log(this.state.dataHTML);

		return (
			<table>
				<thead>
					{this.header()}
				</thead>
				<tbody>
					{this.state.dataHTML}
				</tbody>
		  	</table>
		);
	}

	header() {
		return (
			<tr>
				<th>Radius</th>
				<th>Density</th>
				<th>Escape Velocity</th>
				<th>Mean Temperature</th>
			</tr>
		);
	}
}
