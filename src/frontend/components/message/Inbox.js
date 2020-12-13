import React, { useEffect, useState } from 'react';
import Loader from '../../components/util/Loader'
import { Table, Tag} from 'antd';
import { v4 } from 'node-uuid'; // used to generate unique ID
import axios from 'axios';

import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { cstDateTime } from '../../helper/FormatDate';



const style = makeStyles(() => ({
    footer: {
        background: '#000000',
        color: '#fff',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: "100%",
	},
	table: {
		width: '80vw',
		textAlign: 'center',
	},
	tableWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center' 
	},
}));


function Inbox(props) {
    const classes = style();
    const {user, history, reload} = props
    const [threads, setThreads] =useState({})
    const [isLoading, setIsLoading] = useState(true)

    

	useEffect( () => {
		//get all threads by user (Admin will see all threads, customer only sees their threads)
		async function getThreads(){
			await axios.get('/api/thread/user/' + user.user_id + '/type/' + user.type)
			.then(function(res) {
                setThreads(res.data)
                setIsLoading(false)
			})
			.catch(function (err) {
                console.log(err)

			});
        }
        
        if(user.user_id !== ""){
            getThreads();
        }


	}, [user, reload])

	
	const InboxTable = () =>{
		const columns = [
			{ 
                title: 'Subject', 
                dataIndex: 'subject', 
                key: 'subject' 
            },
			{ 
                title: 'Last Message', 
                dataIndex: 'last_message_date',
                key: 'last_message_date' ,
                render: value => cstDateTime(value) + " (CST)"
            },
            //  { 
            //      title: 'Status2', 
            //      dataIndex: 'isNewMessage', 
            //      key: 'isNewMessage',  
            //      render: value =>  value === 1 ? <Tag color='green' key={v4()}>New Message</Tag> : null
            //  },
            { 
                title: 'Status', 
                dataIndex: 'totalNew', 
                key: 'totalNew',  
                render: value =>  {
                    if( value === 1){
                        return(<Tag color='green' key={v4()}> {value} New Message</Tag>)
                    }
                    else if( value > 1){
                        return(<Tag color='green' key={v4()}> {value} New Messages</Tag>)
                    }
                    else{
                        return null
                    }
                } 
            }
        ];
	
		// convert the object of objects into an array of objects
		// the AntD table would not work with the object of objects
		var myData = Object.keys(threads).map(key => {
			return threads[key];
		})

		return(
			<div className={classes.tableWrapper}>
                <Table 
                    columns={columns} 
                    dataSource={myData} 
                    rowKey={record => record.thread_id}  
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {history.push('/Thread/'+record.thread_id + '/User/'+ user.user_id)}, // click row
                        };
                      }}
                    pagination={{ pageSize: 10 }} 
                    scroll={{ y: "calc(75vh - 150px)" }} 
                    className={classes.table}
                />
			</div>
		)
	}


	return (
		<div className="Inbox">
			{isLoading ?  <Loader /> : <InboxTable/>}
		</div>
  );
}

export default withRouter(Inbox);