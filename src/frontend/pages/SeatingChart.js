import React, { useState, useEffect } from 'react';
import { Button, Col, Card, Row } from 'antd';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import SeatButton from '../components/seat/SeatButton';
import { withRouter } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { v4 } from 'node-uuid'; // used to generate unique ID
import Loader from '../components/util/Loader'

const styles = makeStyles((theme) => ({
	SeatingChart: {
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
	alert: {
		maxWidth: 350,
		marginTop: 20,
	},
	screen: {
		textAlign: "center",
		textDecoration: "underline"
	},
	grid: {
		maxWidth: 900,
		margin: "auto",
	},
	row: {
		padding: 2
	}
}));


function SeatingChart(props) {
	const { selectedSeats, selectedTicket, addSeat, removeSeat, clearSeats, clearMovieToWatch, clearSelectedTicket, history, clearMovieTicketSelections } = props;
	const classes = styles();
	const columns = 20;
	const rows = 10;
	var visitedSeat = 0;
	const [activateModal, setActivateModal] = useState(true);
	const [payment, setPayment] = useState(false);
	const [loadedSeatData, setLoadedSeatData] = useState([]);
	const [objSeatData, setObjSeatData] = useState({});
	const [isLoading, setIsLoading] = useState(true)
	const [seatError, setSeatError] = useState(false)


	useEffect(() => {
		// load the seats for the selected showing
		async function loadShowings() {
			await axios.get('/api/seat/showing/' + selectedTicket.showing_id)
				.then(function (res) {
					setLoadedSeatData(res.data);

					// map a copy of the data into key/value form for easy get access 
					{
						Object.keys(res.data).map((key) => (
							objSeatData[(res.data)[key].seat_id] = (res.data)[key]

						))
					}
					setIsLoading(false);
				})
				.catch(function (err) {
					console.log(err)
				})
		}

		loadShowings();

	}, [selectedTicket])


	const handleSubmit = e => {
		e.preventDefault();

		if (Object.keys(selectedSeats).length === 0) {
			setSeatError(true);
		}

		if (Object.keys(selectedSeats).length !== 0) {
			history.push("/Payment")
		}
	}

	const handleSeatClick = (e) => {
		//prevents rerendering
		e.preventDefault();
		setSeatError(false);

		const seat_id = e.target.value;

		// add the seat if it doesn't exist
		if (selectedSeats[seat_id] === undefined) {
			addSeat(
				seat_id,
				objSeatData[seat_id].screen_id,
				objSeatData[seat_id].blocked,
				objSeatData[seat_id].booked,
				objSeatData[seat_id].row_name,
				objSeatData[seat_id].seat_number,
				objSeatData[seat_id].wheelchair
			)
		}
		// remove the seat if it already exist (deselecting seat)
		else {
			removeSeat(seat_id)
		}
	}


	const handleCancel = () => {
		//clean up data and reroute to showtime page 
		clearMovieTicketSelections();
		history.push("/Showtimes")
	}


	/**
	 * Display an error if no seats are selected
	 */
	const SeatAlert = () => {
		if (seatError) {
			return (
				<Alert severity="error" className={classes.alert}>
					Error: At least one seat must be selected.
				</Alert>
			)
		}
	}

	const createRows = () => {
		var i = 0;
		const row = [];

		// wait for the databse data to load
		if (isLoading === false) {
			while (i < rows) {
				row.push(
					<Row justify="center" className={classes.row} key={v4()}>
						{createColumns()}
					</Row>
				)
				i++
			}
			return (row);
		}
	}

	const createColumns = () => {
		var j = 0;
		const cols = [];

		while (j < columns) {
			cols.push(
				<Col span={1} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }} key={v4()}>
					<SeatButton
						key={(loadedSeatData[visitedSeat]).seat_id}
						seat_id={(loadedSeatData[visitedSeat]).seat_id}
						blocked={(loadedSeatData[visitedSeat]).blocked}
						booked={(loadedSeatData[visitedSeat]).booked}
						row_name={(loadedSeatData[visitedSeat]).row_name}
						seat_number={(loadedSeatData[visitedSeat]).seat_number}
						selected={objSeatData[(loadedSeatData[visitedSeat]).seat_id].selected}
						handleSeatClick={handleSeatClick}
					/>
				</Col>
			)
			j++;
			visitedSeat++;
		}

		return (cols);
	}

	return (
		<div className={classes.SeatingChart}>
			<form className={classes.content} method="post" onSubmit={handleSubmit}>
				<Card
					className={classes.card}

					title="Seating Chart"
					style={{ width: "80vw", margin: "auto", marginBottom: 20 }}

					actions={[
						<div className={classes.actionBar}>
							<Button key="purchase" type="primary" htmlType="submit" className={classes.actionBar} >Confirm </Button>
							<Button key="cancel" className={classes.actionBar} onClick={handleCancel}>Cancel</Button>
						</div>
					]}
				>
					{ /* Display a loading screen if data is loading, otherwise display the form */
						isLoading ? <Loader /> :
							<div>
								<h1 className={classes.screen}>___________Screen___________</h1>

								<div className={classes.grid}>
									{createRows()}
								</div>
								{SeatAlert()}
							</div>
					}

				</Card>
			</form>
			{/* </Modal> */}
		</div>
	);
}

export default withRouter(SeatingChart);