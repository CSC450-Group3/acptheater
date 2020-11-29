import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import LoadingPage from '../components/util/LoadingPage'
import { Table } from 'antd';
import { v4 } from 'node-uuid'; // used to generate unique ID
import axios from 'axios';
import {isoDate} from '../helper/FormatDate'
import Alert from '@material-ui/lab/Alert';
import ScheduleMovieModal from '../components/movie/ScheduleMovieModal'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { utcISODateTime } from '../helper/FormatDate';
var moment = require('moment-timezone');



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
		bottom:90,
	},
	alert:{
		marginTop: 15,
		marginBottom: 15,
		maxWidth:500,
		position:"absolute", 
		left: '10vw',
	}
}));


function ScheduleForm(props) {
	const classes = formStyle();
	const {showings, movieToSchedule} = props
	const [activateModal, setActivateModal] = useState(false);
	const [allScreens, setAllScreens] = useState([]); 
	const [screenID, setScreenID] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [price, setPrice] = useState(null);
	const [isLoading, setIsLoading] = useState(false)
	const [keyToDelete, setKeyToDelete] = useState("");
	const [scheduleError, setScheduleError] = useState(false)
	const [rerender, setRerender] = useState(false)

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

	
	/**
	 * Display an error if there are no schedules
	 */
	const ScheduleAlert = () => {
		if (scheduleError) {
			return (
				<Alert severity="error" className={classes.alert}>
					Error: At least one showing must be scheduled.
				</Alert>
			)
		}
	}

	function confirmDelete() {
		props.removeSchedule(keyToDelete)
	}

	async function handleSubmitSchedules(e){
		e.preventDefault();

		console.log()
		//only save to db if there is a showing in the table
		if(Object.keys(showings).length !==0 ){
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
			
			//Map showing schedules into the database if there are schedules to save
				Object.keys(showings).map(async (key) => (
					await axios.post('/api/showing/create',{
						screen_id: showings[key].screen_id ,
						movie_id: movie_id, 
						start_date_time: utcISODateTime(showings[key].start_date_time), 
						cancelled: null, 
						price: showings[key].price
					})
					.then(function(res) {
						//console.log(res.data)
						setIsLoading(false);
						
						//Reload the active movies in the store
						props.loadActiveMovies()

						//Cleanup movie/schedule data and redirect to Movies page
						clearData();
						props.history.push("/Movies");
					})
					.catch(function (err) {
						console.log(err)
						setIsLoading(false);
					})
				))
		}else{
			setScheduleError(true)
		}
	
	}
	 
	/**
	 * Clean up the movie and schedule data in the redux store. 
	 */
	function clearData(){
		props.clearMovieToSchedule()
		props.clearScheudles()
	}
	
	return (
		<div className="ScheduleForm">
			<h1>Scheduling Movie {movieToSchedule.title}</h1>
			<form  className="Schedule-Form"method="post" onSubmit={handleSubmitSchedules}>
				{displayTable(showings)}
				{ScheduleAlert()}
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
			</form>		
			<ScheduleMovieModal  
				addSchedule={props.addSchedule} 
				allScreens={allScreens}
				setActivateModal={setActivateModal}
				activateModal={activateModal}
				setScheduleError={setScheduleError}
				setRerender={setRerender}
				showings={showings}
				movie={movieToSchedule}
			/>
			{/* {dispalyScheduleModal()} */}
			{displayLoading()}
		</div>
  );
}

export default withRouter(ScheduleForm);