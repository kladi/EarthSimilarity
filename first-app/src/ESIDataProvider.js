import * as React from 'react';

export class ESIDataProvider extends React.Component {
	static sendData(rad, dens, escapeVel, meanTemp) {
		fetch('http://kwieszczek.kat.adbgroup.pl/REACT/react-simple-master/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				request: 'SAVERECORD',
				radius: rad,
				density: dens,
				escapeVelocity: escapeVel,
				meanTemperature: meanTemp,
			})
		});
	}

	static receiveData() {
		return fetch('http://kwieszczek.kat.adbgroup.pl/REACT/react-simple-master/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				request: 'GETALL',
			})
		});
	}
}
