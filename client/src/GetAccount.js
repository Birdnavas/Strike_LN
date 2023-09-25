import {useEffect, useState} from 'react'
import axios from 'axios'

const GetAccount = props => {

	const [userInfo, setUserInfo] = useState(false);
	const [error, setError] = useState(false);

	const getAccountInfo = (e) => {
		e.preventDefault();
		let data = JSON.stringify({
			"handle": 'ricardofv'
		})

		let config = {
			method : 'post',
			url: '/api/getAccount',
			headers: {
				    'Content-Type': 'application/json', 
    				'Accept': 'application/json'
			},
			data : data
		};

		axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data))
			if (response.data != 'error') {
			setUserInfo(response.data);

			props.passUpUserInfo(response.data);
			setError(false);
			} else {
			setUserInfo(false);
			setError('Usuario no encontrado')
			}
		})
		.catch((error) => {
  		console.log(error);
		});
	}
	
	return (
		<div>
			<button onClick={getAccountInfo}>Play</button>
		</div>
	)
}

export default GetAccount;