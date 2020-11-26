import React, { useState, useEffect } from 'react';
import { Button, Radio, Col, Card, Row } from 'antd';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { isoDate } from '../helper/FormatDate'
import 'antd/dist/antd.css';
import MovieCard from '../components/movie/MovieCard';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from "react-router-dom";


const showtimeStyles = makeStyles((theme) => ({
	PurchaseForm: {
		background: '#282c34',
		minHeight: "90vh",
	},
	content: {
		background: '#282c34',
		padding: 60,
		minHeight: 300,
		textAlign: "left"
	},
	dateSelect: {
		margin: theme.spacing(1),
		minWidth: 140,
		backgroundColor: 'white',
		color: 'black',
		height: '2em',
	},
	formField: {
		paddingBottom: 15
	},
	actionBar: {
		textAlign: "left",
		paddingLeft: 15,
		marginRight: 15
	},
	alert:{maxWidth: 350},
}));



function PurchaseTickets(props) {
	const classes = showtimeStyles();
	const {customerMovie , selectedTicket, setSelectedTicketInfo, clearSelectedTicket, clearMovieTicketSelections, history} = props;
	const [dates, setDates] = useState([]);
	const [movieTimes, setMovieTimes] = useState([]);
	const [movieTimesObj] = useState({});
	const [numberOfViewers, setNumberOfViewers] = useState(1);
	const [selectedDate, setSelectedDate] = useState(customerMovie.selected_date)
	const [selectedShowingID, setselectedShowingID] = useState(null);
	const [ticketType, setTicketType] = useState("theater")
	const [timeError, setTimeError] = useState(false)

	useEffect(() => {
		// load all showing dates for a given movie on or after today
		async function loadShowings() {
			await axios.get('/api/showing/movie/' + customerMovie.movie_id)
				.then(function (res) {
					setDates(res.data);
				})
				.catch(function (err) {
					console.log(err)
				})
		}

		loadShowings();

		if (customerMovie.selected_date !== "") {
			loadShowingTimes(customerMovie.selected_date);
		}
	}, [customerMovie])


	async function loadShowingTimes(date) {
		//load movie times and time status
		await axios.get('/api/showing/movie/' + customerMovie.movie_id + '/date/' + isoDate(date))
			.then(function (res) {
				setMovieTimes(res.data);

				//map a copy of the data into key/value form for easy access of show time
				{
					Object.keys(res.data).map((key) => (
						movieTimesObj[(res.data)[key].showing_id] = (res.data)[key]
					))
				}
			})
			.catch(function (err) {
				console.log(err)
			})
	}

	function onTimeChange(e) {
		setselectedShowingID(e.target.value)
		setTimeError(false);
	}

	const handleDateChange = async (e) => {
		setSelectedDate(e.target.value);

		//load the show times for the date that was selected
		loadShowingTimes(e.target.value);
	}

	const handleSelectTicketType = (e) => {
		setTicketType(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedShowingID === null) {
			setTimeError(true)
		}

		// all other fields should be required by default
		if (selectedShowingID !== null) {
			setSelectedTicketInfo(
				selectedShowingID,
				selectedDate,
				movieTimesObj[selectedShowingID].time,
				numberOfViewers,
				ticketType,
				movieTimesObj[selectedShowingID].price,
				movieTimesObj[selectedShowingID].screen_name
			)

			if(ticketType === "theater"){
				history.push("/SeatingChart")
			}
			else{
				history.push("/Payment")
			}
		}
	}

	const handleCancel = () =>{
		//clean up data and reroute to showtime page 
		clearMovieTicketSelections();
		history.push("/Showtimes")
	}


	/**
	 * Time radio buttons. Shows active if the time is on or after the 
	 * current time for a given date, otherwise it shows inactive
	 * @param {*} showing_id 
	 * @param {*} time 
	 */
	const Time = ({ showing_id, time, disabled}) => {
		if (disabled) {
			return (
				<Radio.Button
					key={showing_id}
					value={showing_id}
					name={time}
					disabled
				>
					{time}
				</Radio.Button>
			)
		}
		else {
			return (
				<Radio.Button
					key={showing_id}
					value={showing_id}
					name={time}
				>
					{time}
				</Radio.Button>
			)
		}
	}

	/**
	 * Display an error if the time has not been selected upon attempted submit
	 */
	const TimeAlert = () => {
		if (timeError) {
			return (
				<Alert severity="error" className={classes.alert}>
					Error: Time is required.
				</Alert>
			)
		}
	}

	/**
	 * Display the number of viewers field if virtual ticket is selected
	 */
	function displayNumViewers() {
		if (ticketType === "virtual") {
			return (
				<div className={classes.formField}>
					<label htmlFor="viewers" style={{ padding: 10 }}>Number of Viewers: </label>
					<input
						type="number"
						min="1"
						value={numberOfViewers}
						onChange={(e) => setNumberOfViewers(e.target.value)}
						required
					/>
				</div>
			)
		}
	}

	return (
		<div className={classes.PurchaseForm}>
			<div className={classes.content}>
				<form method="post" onSubmit={handleSubmit}>
					<Card
						className={classes.card}
						title="Purchase Ticket"
						style={{ width: "80vw", margin: "auto", marginBottom: 20 }}

						actions={[
							<div className={classes.actionBar}>
								<Button key="purchase" type="primary" htmlType="submit" className={classes.actionBar} >Confirm </Button>
								<Button key="cancel" className={classes.actionBar} onClick={handleCancel}>Cancel</Button>
							</div>
						]}

					>
						<Row>
							<Col span={12}>
								<div>
									<p>Please select from all options below:</p>

									<div className={classes.formField}>
										<label htmlFor="date" style={{ padding: 10 }}>Date: </label>
										<select
											value={selectedDate}
											name="date"
											required
											onChange={(event) => handleDateChange(event)}
											className={classes.dateSelect}
										>
											{Object.keys(dates).map((key) => (
												<option
													key={dates[key].date}
													value={dates[key].date}
													name={dates[key].date}
												>
													{dates[key].date}
												</option>

											))}
										</select>
										<br />
									</div>
									<div className={classes.formField}>
										<label htmlFor="time" style={{ padding: 10 }}>Time (CST): </label>
										<br />
										<Radio.Group onChange={onTimeChange} style={{ padding: 10 }} required >
											{Object.keys(movieTimes).map((key) => (
												<Time

													key={movieTimes[key].showing_id}
													showing_id={movieTimes[key].showing_id}
													time={movieTimes[key].time}
													disabled={movieTimes[key].disabled}
												/>
											))}
										</Radio.Group>
										{TimeAlert()}
										<br />
									</div>


									<div className={classes.formField}>
										<Radio.Group onChange={handleSelectTicketType} value={ticketType}>
											<Radio value={"theater"}>Theater Ticket(s)</Radio>
											<Radio value={"virtual"}>Virtual Ticket(s) </Radio>
										</Radio.Group>
									</div>
									{displayNumViewers()}

								</div>

							</Col>
							<Col span={8}>
								<MovieCard title={customerMovie.title} poster_url={customerMovie.poster_url} className={classes.movieCard} />
							</Col>
						</Row>
					</Card>
				</form>
			</div>
		</div>
	);
}


export default withRouter(PurchaseTickets);
