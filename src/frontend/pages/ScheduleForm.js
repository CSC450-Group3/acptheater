import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Popconfirm, message } from 'antd';
import { Link } from "react-router-dom";
import LoadingPage from '../components/util/LoadingPage'
import { Table } from 'antd';
import { v4 } from 'node-uuid'; // used to generate unique ID
import axios from 'axios';
import {isoDate} from '../helper/FormatDate'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const formStyle = makeStyles(() => ({
    footer: {
        background: '#000000',
        color: '#fff',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: "100%",
	},
	scheduleTable: {
		width: '80vw',
		textAlign: 'center',
	},
	tableWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center' 
	},
	formActionBar:{
		position:"absolute", 
		left: '10vw',
		bottom:70,
	} 
}));


function ScheduleForm(props) {
	const classes = formStyle();
	const {showings, movieToSchedule} = props
	const [activateModal, setActivateModal] = useState(false);
	const [allScreens, setAllScreens] = useState([]); 
	const [screenID, setScreenID] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [price, setPrice] = useState(null);
	const [isLoading, setIsLoading] = useState(false)
	const [keyToDelete, setKeyToDelete] = useState("");

	useEffect( () => {
		//get all screens at the movie theater
		async function getScreens(){
			await axios.get('/api/screen/getAll')
			.then(function(res) {
				//screens found successfully
				setAllScreens(res.data)
			})
			.catch(function (err) {
				console.log(err)
			});
		}

		getScreens();

	}, [showings])

	
	function displayTable(data){
		const columns = [
			{ title: 'Screen', dataIndex: 'screen_name', key: 'screen_name' },
			{ title: 'Showing', dataIndex: 'start_date_time', key: 'start_date_time' },
			{ title: 'Price', dataIndex: 'price', key: 'price' },
			{
			  title: 'Action',
			  dataIndex: '',
			  key: 'x',
			  render: (text, record) => (
				<Popconfirm
					title="Are you sure delete this schedule?"
					onConfirm={confirmDelete}
					okText="Yes"
					cancelText="No"
				>
				<Button danger
				  	onClick={() => {setKeyToDelete(record.key);}}
				>
				 <a> Delete </a>
				</Button>
				</Popconfirm>
			  ),
			},
		  ];
	
		// convert the object of objects into an array of objects
		// the AntD table would not work with the object of objects
		var myData = Object.keys(data).map(key => {
			return data[key];
		})

		return(
			<div className={classes.tableWrapper}>
				<Table columns={columns} dataSource={myData}  pagination={{ pageSize: 10 }} scroll={{ y: "calc(75vh - 150px)" }} className={classes.scheduleTable}/>
			</div>
		)
	}

	function displayLoading(){
		if(isLoading){
			return(
				<LoadingPage />
			)
		}
	}

	function dispalyScheduleModal(){
		return(
			<Modal
				title='Schedule Movie Form'
				centered
				visible={activateModal}
				width={300}
				footer={[
					<Space size='small'>
					<Button 
						type="primary" 
						key="schedule" 						
						onClick={() => {addNewShowing();}}
					>
						Add
					</Button>
					<Button key="cancel" onClick={() => setActivateModal(false)}>Cancel</Button>
					</Space>
					]}
				>
				<form >
	
					<label for="screen">Screen</label><br/>
					<select 
						value = {screenID} 
						name = "screen"
						required
						onChange =  {
							(event) =>	{
								setScreenID(event.target.value);
							}	
						}
					>
						<option disabled selected value> -- select an option -- </option>
						{/* Map screens from DB into list */}
						{Object.keys(allScreens).map((key) => (
							<option
								key={allScreens[key].screen_id}
								value = {allScreens[key].screen_id}
								name = {allScreens[key].screen_name}
								>{allScreens[key].screen_name}
							</option>
                        ))}
					</select>
					<br/>

					<label for="startDate">Date</label><br/>
					<input
						type="date"
						name="startDate"
						id="startDate"
						required
						onChange =  {
							(event) =>	{
								setStartDate(event.target.value);
							}
						}
					/>
					<br/>

					<label for="startTime">Showtime</label><br/>
					<input
						type="time"
						name="startTime"
						id="startTime"
						required
						onChange =  {
							(event) =>	{
								setStartTime(event.target.value);
							}
						}
					/>
					<br/>

					<label for="price">Price</label><br/>
					<input
						type="number"
						name="price"
						id="price"
						required
						onChange =  {
							(event) =>{
								setPrice(parseFloat(event.target.value).toFixed(2));
							}
						}
					/>
				</form>
			</Modal>
		)
	}

	async function addNewShowing(){
		await axios.get('/api/screen/' + screenID)
			.then(function(res) {
				//screens found successfully
				props.addSchedule(v4(), screenID, res.data.screen_name, startDate + " " + startTime, price)
			})
			.catch(function (err) {
				console.log(err)
		});
	
		
		setActivateModal(false);
	}


	function confirmDelete() {
		props.removeSchedule(keyToDelete)
	}

	async function handleSubmitSchedules(e){
		e.preventDefault();
		setIsLoading(true);
		//stip of the 'min' off duration, so we can store an int
		var duration = (movieToSchedule.duration).replace(/[^0-9]/g,''); 

		//format the date to yyyy-mm-dd format for storing in mysql 
		var release_date = isoDate(movieToSchedule.release_date);
		var movie_id = 0;

		//create movie record
	 	await axios.post('api/movie/create', {
	 		"title": movieToSchedule.title, 
	 		"director": null,
	 		"cast": movieToSchedule.cast,
	 		"plot": movieToSchedule.plot,
	 		"duration": duration,
	 		"rated": movieToSchedule.rated,
	 		"poster_URL": movieToSchedule.poster_URL, 
	 		"genre": movieToSchedule.genre,
	 		"release_date": release_date
	 	}
	 	, {headers:{"Content-Type" : "application/json"}})
        .then(function(res){
			movie_id = res.data.movie_id
        })
        .catch(function (err) {
			console.log(err)
			setIsLoading(false);
		})
		
		
		//Map showing schedules into the database
		Object.keys(showings).map(async (key) => (
		 	await axios.post('/api/showing/create',{
		 		screen_id: showings[key].screen_id ,
		 		movie_id: movie_id, 
		 		start_date_time: showings[key].start_date_time, 
		 		cancelled: null, 
		 		price: showings[key].price
		 	})
		 	.then(function(res) {
				 //console.log(res.data)
				 setIsLoading(false);
		
				 //Cleanup move/schedule data and redirect to Movies page
				 clearData();
				 props.history.push("/Movies");
		 	})
		 	.catch(function (err) {
				console.log(err)
				setIsLoading(false);
		 	})
		))
	
	}
	 
	function clearData(){
		props.clearMovieToSchedule()
		props.clearScheudles()
	}
	
	return (
		<div className="ScheduleForm">
			<h1>Scheduling Movie {movieToSchedule.title}</h1>
			<form  className="Schedule-Form"method="post" onSubmit={handleSubmitSchedules}>
				{displayTable(showings)}
				<div  className={classes.formActionBar}>
					<Space size='small'>
						<Button key="schedule"  type="primary"  onClick = {() => {
								setActivateModal(true);
							}
						}>Add Schedule</Button>
						<Button key="save" htmlType="submit" >Save</Button>
						<Button key="cancel"  onClick ={()=>clearData()}><Link to="/Movies">Cancel</Link></Button>
					</Space>
				</div>
				{dispalyScheduleModal()}
				{displayLoading()}
			</form>		
		</div>
  );
}

export default withRouter(ScheduleForm);