import React, { useState } from 'react';
import axios from 'axios';
import { Button, Layout, Col, Card, Row } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { withRouter } from "react-router-dom";
import { calculateTotalPrice } from '../helper/PaymentCalculation'

const styles = makeStyles((theme) => ({
	PaymentForm: {
		background: '#282c34',
		minHeight: "90vh",
	},
	content: {
		background: '#282c34',
		padding: 60,
		minHeight: 300,
		textAlign: "left"
	},
	actionBar: {
		textAlign: "left",
		paddingLeft: 15,
		marginRight: 15
	},
	label: {
		paddingLeft: 10,
		alignContent: "center"
	},
	cvv: {
		width: "2em"
	},
}));

function Payment(props) {
	const classes = styles();
	const { user, selectedSeats, customerMovie, selectedTicket, clearMovieToWatch, clearSelectedTicket, clearSeats, history, clearMovieTicketSelections } = props
	const [transaction, setTransaction] = useState([]);
	const [total_price] = useState(calculateTotalPrice(selectedTicket, selectedSeats));
	const tickets = [];
	const errors = [];

	function displayTicketInfo() {
		const tickets = [];
		if (selectedTicket.ticket_type === "theater") {
			Object.keys(selectedSeats).map(key => (
				tickets.push(<p key={selectedSeats[key].row_name + selectedSeats[key].seat_number}>Seat Number: {selectedSeats[key].row_name}{selectedSeats[key].seat_number}  &nbsp; Price: ${selectedTicket.price}</p>)
			))
		}
		else {
			tickets.push(<p>Virtual Tickets: {selectedTicket.number_of_viewers}</p>)
		}
		return (tickets);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		// attempt to save transaction
		await createTransaction();

	}


	async function createTransaction() {
		await axios.post('api/transaction/create', {
			"user_id": user.user_id,
			"total_price": total_price
		})
			.then(function (res) {
				//transaction created successfully
				if (res.status === 200) {
					setTransaction(res.data)

					console.log(selectedTicket.ticket_type === "theater")
					if (selectedTicket.ticket_type === "theater") {
						Object.keys(selectedSeats).map(async key => (
							await axios.post('api/ticket/create', {
								"transaction_id": res.data.transaction_id,
								"showing_id": selectedTicket.showing_id,
								"seat_id": selectedSeats[key].seat_id,
								"total_viewers": null
							})
								.then(function (res) {
									//transaction created successfully
									if (res.status === 200) {
										tickets.push(res.data)
										//go to confirmation page if save is successful
										history.push("/Confirmation")
									}
								})
								.catch(function (err) {
									errors.push(err)
									console.log(errors)
								})
						))
					}
					else {
						axios.post('api/ticket/create', {
							"transaction_id": res.data.transaction_id,
							"showing_id": selectedTicket.showing_id,
							"seat_id": null,
							"total_viewers": selectedTicket.number_of_viewers
						})
							.then(function (res) {
								//transaction created successfully
								if (res.status === 200) {
									tickets.push(res.data)
									//go to confirmation page if save is successful
									history.push("/Confirmation")
								}
							})
							.catch(function (err) {
								errors.push(err)
								console.log(errors)
							});
					}
				}
			})
			.catch(function (err) {
				errors.push(err)
				console.log(errors)
			});
	}

	const handleCancel = () =>{
		//clean up data and reroute to showtime page 
		clearMovieTicketSelections();
		history.push("/Showtimes")
	}

	return (
		<div className={classes.PaymentForm}>


			<form className={classes.content} method="post" onSubmit={handleSubmit}>
				<Layout className={classes.container}>
					<Card
						className={classes.card}
						title="Payment Information"

						actions={[
							<div className={classes.actionBar}>
								<Button key="purchase" type="primary" htmlType="submit" className={classes.actionBar} >Confirm </Button>
								<Button key="cancel" className={classes.actionBar} onClick={handleCancel}>Cancel</Button>
							</div>
						]}
					>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col span={14} >
								<div>
									<h4>Billing Information</h4>
									<label for="name" className={classes.label} >Name on Card: </label>
									<input type="text" required id="name" placeholder="Name" />

									<label for="address" className={classes.label} >Billing Address: </label>
									<input type="text" required id="address" placeholder="Address" />
									< br />
									< br />
									<label for="city" className={classes.label} >City: </label>
									<input type="text" required id="city" placeholder="City" />

									<label for="state" className={classes.label} >State: </label>
									<input type="text" required id="state" placeholder="State" />
									< br />
									< br />
									<label for="zip" className={classes.label} >Zipcode: </label>
									<input type="text" required id="zip" placeholder="Zipcode" />
									< br />
									< br />
									< br />
									<h4>Credit Card Information</h4>
									<label for="card" className={classes.label} >Card Number: </label>
									<input type="text" required id="card" placeholder="Card Number" />

									<label for="exp" className={classes.label} >Expiration: </label>
									<input type="text" required id="expiration" placeholder="MM/YY" />
									< br />
									< br />
									<label for="cvv" className={classNames(classes.label, classes.cvv)} >CVV: </label>
									<input type="text" required id="cvv" placeholder="CVV" />
									< br />
									< br />

								</div>
							</Col>
							<Col span={6}  >
								<h4>Purchase Summary</h4>
								<p>Selected Movie: {customerMovie.title}</p>
								{displayTicketInfo()}
								<p>Total Price: ${total_price}</p>
							</Col>
						</Row>
					</Card>
				</Layout>
			</form>


		</div>
	);
}

export default withRouter(Payment);
