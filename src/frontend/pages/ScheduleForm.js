import React, { useEffect, useState } from 'react';
import { Button, Popconfirm , Card, Alert} from 'antd';
import { Link } from "react-router-dom";
import LoadingPage from '../components/util/LoadingPage'
import { Table } from 'antd';
import axios from 'axios';
import {isoDate} from '../helper/FormatDate'
import ScheduleMovieModal from '../components/movie/ScheduleMovieModal'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { utcISODateTime } from '../helper/FormatDate';

const formStyle = makeStyles(() => ({
	root:{
        background: '#282c34', 
		minHeight: "90vh",
		padding: '30px',
	},
	card:{
		minHeight: '75vh',
		width: '80vw',
		margin: 'auto',
		marginBottom: '70px'
	},
    actionButton: {
		marginRight:"5px"
	},
	scheduleTable: {
		width: '80vw',
		textAlign: 'center',
		minHeight: '60vh'
	},
	tableWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center' 
	},
	actionBar: {
		textAlign: "left",
		paddingLeft: 15,
		marginRight: 15,
	},
	formActionBar:{
		position:"absolute", 
		left: '10vw',
		bottom:90,
	},
	alert:{
		display: "inline",
		width:"500px",

	}
}));


function ScheduleForm(props) {
	const classes = formStyle();
	const {showings, movieToSchedule, history, removeSchedule, loadActiveMovies, clearMovieToSchedule, clearScheudles, addSchedule} = props
	const [activateModal, setActivateModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const [keyToDelete, setKeyToDelete] = useState("");
	const [scheduleError, setScheduleError] = useState(false)
	const [rerender, setRerender] = useState(false)

	useEffect( () => {
		document.title = `ACP | Schedule Movies`;

		return () => {
			// cleanup on unmount
			clearData();
        }

	}, [])

	
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
				  	Delete 
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
				<Alert 
					message="Error: At least one showing must be scheduled." 
					type="error" 
					showIcon 
					className={classes.alert}
				/>
			)
		}
	}

	function confirmDelete() {
		removeSchedule(keyToDelete)
	}

	async function handleSubmitSchedules(e){
		e.preventDefault();

		//only save to db if there is a showing in the table
		if(Object.keys(showings).length !==0 ){
			setIsLoading(true);

			var movie_id = 0;

			//create movie record
			await axios.post('api/movie/create', {
				"title": movieToSchedule.title, 
				"director": null,
				"cast": movieToSchedule.cast,
				"plot": movieToSchedule.plot,
				"duration": movieToSchedule.duration,
				"rated": movieToSchedule.rated,
				"poster_URL": movieToSchedule.poster_URL, 
				"genre": movieToSchedule.genre,
				"release_date": isoDate(movieToSchedule.release_date) //format the date to yyyy-mm-dd format for storing in mysql 
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
						setIsLoading(false);
						
						//Reload the active movies in the store
						loadActiveMovies()

						//Cleanup movie/schedule data and redirect to Movies page
						history.push("/Movies");
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
		clearMovieToSchedule()
		clearScheudles()
	}
	
	return (
		<div className={classes.root}>
			<form  className="Schedule-Form"method="post" onSubmit={handleSubmitSchedules}>
			<Card 
				className={classes.card}
				title= {"Schedule Movie: " + movieToSchedule.title}
				actions={[
					<div className={classes.actionBar}>
						<Button 
							key="schedule"  
							type="primary" 
							className={classes.actionButton} 
							onClick = {() => {
								setActivateModal(true);
							}
						}>
							Add Schedule
						</Button>
						<Button 
							key="save" 
							htmlType="submit" 
							className={classes.actionButton}
						>
							Save
						</Button>
						<Button 
							key="cancel"  
							className={classes.actionButton}
							onClick ={()=>clearData()}
						>
							<Link to="/Movies">Cancel</Link>
						</Button>
						{ScheduleAlert()}
					</div>
				]}
				
			>	
				{displayTable(showings)}
				
			
			<ScheduleMovieModal  
				addSchedule={addSchedule} 
				setActivateModal={setActivateModal}
				activateModal={activateModal}
				setScheduleError={setScheduleError}
				setRerender={setRerender}
				showings={showings}
				movie={movieToSchedule}
			/>
			{/* {dispalyScheduleModal()} */}
			
			</Card>

			</form>	
			{displayLoading()}
		</div>
  );
}

export default withRouter(ScheduleForm);