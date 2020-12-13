import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Layout, Col, Card, Row, Form, Input, InputNumber } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { calculateTotalPrice } from '../helper/PaymentCalculation'
import PaymentSummary from '../components/payment/PaymentSummary';


const styles = makeStyles((theme) => ({
	PaymentForm: {
		background: '#282c34',
		minHeight: "90vh",
		padding: '30px',
	},
	container: {
		maxWidth: 900,
		margin: "auto",
	},
	content: {
		background: '#282c34',
		padding: 60,
		minHeight: 300,
		textAlign: "left",
		align: "center",
	},
	actionBar: {
		textAlign: "left",
		paddingLeft: 15,
		marginRight: 15,
	},
	locationInput: {
		display: 'inline-block',
		marginRight: "5px",
	},
	cardNumber:{
		width: '100%',
	},
	cardInput:{
		display: 'inline-block',
		marginRight: "5px",
	},
	cardDetails:{
		width: '50%',
	},
	expiration:{
		display: 'inline-block'
	},
	form:{
		textAlign: "left"
	}
}));

function Payment(props) {
	const classes = styles();
	const { user, selectedSeats, customerMovie, selectedTicket, history, clearMovieTicketSelections } = props
	const [transaction, setTransaction] = useState([]);
	const [total_price] = useState(calculateTotalPrice(selectedTicket, selectedSeats));
	const tickets = [];
	const errors = [];
	const [form] = Form.useForm();

	useEffect( () => {
		document.title = `ACP | Payment`;
	}, [])


	const handleSubmit = async (e) => {
		e.preventDefault();

		// attempt to save transaction
		await createTransaction();
	}

	async function createTransaction() {
		//force form to validate
		form.validateFields()
			//attempt to save transaction when fields are valid
			.then(async () => {
				await axios.post('api/transaction/create', {
					"user_id": user.user_id,
					"total_price": total_price
				})
					//transaction created successfully
					.then(function (res) {
						if (res.status === 200) {
							setTransaction(res.data)

							//attempt to save theater movie ticket if transaction saved
							if (selectedTicket.ticket_type === "theater") {
								Object.keys(selectedSeats).map(async key => (
									await axios.post('api/ticket/create', {
										"transaction_id": res.data.transaction_id,
										"showing_id": selectedTicket.showing_id,
										"seat_id": selectedSeats[key].seat_id,
										"total_viewers": null
									})
										.then(function (res) {
											//ticket created successfully
											if (res.status === 200) {
												tickets.push(res.data)
												//go to confirmation page if save is successful
												history.push("/Confirmation")
											}
										})
										//ticket failed to save
										.catch(function (err) {
											errors.push(err)
											console.log(errors)
										})
								))
							}
							// attempt to save virtual movie tickets
							else {
								axios.post('api/ticket/create', {
									"transaction_id": res.data.transaction_id,
									"showing_id": selectedTicket.showing_id,
									"seat_id": null,
									"total_viewers": selectedTicket.number_of_viewers
								})
									//virtual ticket created successfully
									.then(function (res) {
										if (res.status === 200) {
											tickets.push(res.data)
											//go to confirmation page if save is successful
											history.push("/Confirmation")
										}
									})
									//ticket faield to save
									.catch(function (err) {
										errors.push(err)
										console.log(errors)
									});
							}
						}
					})
					//transaction failed to save
					.catch(function (err) {
						errors.push(err)
						console.log(errors)
					});
			})
			.catch((err) => {
				//user didn't populate fields correctly
				//console.log(err)
			})
	}

	const handleCancel = () => {
		//clean up data and reroute to showtime page 
		clearMovieTicketSelections();
		history.push("/Showtimes")
	}

	const onNameOnCardChange = (event) => {
		form.setFieldsValue({
			nameOnCard: event.target.value
		})
	}

	const onAddressChange = (event) => {
		form.setFieldsValue({
			address: event.target.value
		})
	}

	const onCityChange = (event) => {
		form.setFieldsValue({
			city: event.target.value
		})
	}


	const onStateChange = (event) => {
		form.setFieldsValue({
			state: event.target.value
		})
	}


	const onZipChange = (event) => {
		form.setFieldsValue({
			zipCode: event.target.value
		})
	}

	const onNumberChange = (value) => {
		form.setFieldsValue({
			cardNumber: value
		})
	}

	const onExpirationChange = (event) => {
		form.setFieldsValue({
			expiration: event.target.value
		})
	}

	const onCVVChange = (value) => {
		form.setFieldsValue({
			cvv: value
		})
	}


	return (
		<div className={classes.PaymentForm}>
			{/* <form className={classes.content} method="post" onSubmit={handleSubmit}> */}
			<Form
				form={form}
				layout="vertical"
				name="Payment Form"
				initialValues={{ remember: true }}
				className={classes.form}
			>
				<Layout className={classes.container}>
					<Card
						className={classes.card}
						title="Payment Information"

						actions={[
							<div className={classes.actionBar}>
								<Button key="purchase" type="primary" htmlType="submit" onClick={handleSubmit} className={classes.actionBar} >Confirm </Button>
								<Button key="cancel" className={classes.actionBar} onClick={handleCancel}>Cancel</Button>
							</div>
						]}
					>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col span={16} >
								<h3>Billing Information</h3>
	
									<Form.Item
										label="Name on Card"
										name="nameOnCard"
										rules={[{
											required: true,
											message: 'Name on Card is required.'
										}]}
									>
										<Input
											autoFocus
											onChange={onNameOnCardChange}
										/>
									</Form.Item>

									<Form.Item
										label="Billing Address"
										name="address"
										rules={[{ required: true, message: 'Billing Address is required.' }]}
									>
										<Input
											onChange={onAddressChange}
										/>
									</Form.Item>

									<div>
										<Form.Item
											label="City"
											name="city"
											rules={[{ required: true, message: 'City is required.' }]}
											className={classes.locationInput}
										>
											<Input
												onChange={onCityChange}

											/>
										</Form.Item>

										<Form.Item
											label="State"
											name="state"
											rules={[{ required: true, message: 'State is required.' }]}
											className={classes.locationInput}
										>
											<Input
												onChange={onStateChange}
											/>
										</Form.Item>

										<Form.Item
											label="Zip Code"
											name="zipCode"
											rules={[{ required: true, message: 'Zip Code is required.' }]}
											className={classes.locationInput}
										>
											<Input
												onChange={onZipChange}
											/>
										</Form.Item>
									</div>


									<h3>Credit Card Information</h3>

									<Form.Item
										label="Card Number"
										name="cardNumber"
										rules={[{ required: true, message: 'Card Number is required.' }]}
									>
										<InputNumber
											onChange={onNumberChange}
											className={classes.cardNumber}
										/>
									</Form.Item>

										
									<Form.Item
										label="Expiration"
										name="expiration"
										rules={[{ required: true, message: 'Expiration Year is required.' }]}
										className={classes.cardInput}
									>
										<Input
											placeholder="MM/YY"
											onChange={onExpirationChange}
											className={classes.cardDetails}
										/>
										
									</Form.Item>


									<Form.Item
										label="CVV"
										name="cvv"
										rules={[{ required: true, message: 'CVV is required.' }]}
										className={classes.cardInput}
									>
										<InputNumber
											placeholder="###"
											onChange={onCVVChange}
											className={classes.cardDetails}
										/>
									</Form.Item>

							
							</Col>
							<Col span={8}  >
								<PaymentSummary
									title={customerMovie.title}
									total_price={total_price}
									selectedSeats={selectedSeats}
									selectedTicket={selectedTicket}
									showtime={selectedTicket.date + " " + selectedTicket.time}
								/>
							</Col>
						</Row>
					</Card>
				</Layout>
				</Form>
			{/* </form> */}


		</div>
	);
}

export default withRouter(Payment);
