import React, {useState, useEffect} from 'react'
import axios from 'axios';

const CreateInvoice = props => {

	const getInvoice = (e) => {
		e.preventDefault();
		console.log(e.target.amountInput.value)

		let data = JSON.stringify({
			"handle": props.handle,
			"amount": e.target.amountInput.value,
			"currency": props.currency
		})

		let config = {
			method: 'post',
			url: '/api/createInvoice',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data : data
		}

		axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data))
			props.passUpInvoice(response.data);
		})
		.catch((error) => {
			console.log(error)
		})
	}
	
	return (
		<div className="CreateInvoice">
			<form onSubmit={getInvoice}>
				<div className="InvoiceDetails">
				<label> <p>{props.currency} a enviar </p>
					<input type='number' step='.00000001' name='amountInput' value={0.10}/>
				</label>
				</div>
				<input type='submit' value='Generar qr' name='submitButton'/>
			</form>
		</div>
		)
}

export default CreateInvoice;