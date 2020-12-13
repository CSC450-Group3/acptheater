import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Inbox from '../../components/message/Inbox';
import axios from 'axios';
import 'antd/dist/antd.css';


const UserMessagingDashboard = ({ user, history }) => {
    const [open, setOpen] = React.useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sentSuccessfully, setSetSuccessfully] = useState(false);

    useEffect(() => {
        if (sentSuccessfully) {
            //reset data (also forces rerender)
            setSetSuccessfully(false)
        }

    }, [sentSuccessfully])


    const handleSendNewMessage = async () => {
        //Create the thread record 
        await axios.post('/api/thread/create', {
            subject: subject,
            resolved: 0,
            user_id: user.user_id
        })
            .then(async function (res) {
                //create the message for the thread
                await axios.post('/api/message/create', {
                    thread_id: res.data.thread_id,
                    sending_user_id: user.user_id,
                    message_body: message
                })
                    .then(function (res) {
                        setSetSuccessfully(true)
                        setOpen(false)
                        //clear modal data
                        setMessage("");
                        setSubject("");
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    const handleClose = () => {
        setOpen(false);
        //clear modal data
        setMessage("");
        setSubject("");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className="inbox">
            <p>Inbox</p>
            <Inbox
                user={user}
                history={history}
                reload={sentSuccessfully}
            />
            <div className="newMessage">
                {
                    /* display New Message button to customers only - admin's only reply to messages from customers */
                    user.type === 'C' ? (
                            <Button type="primary" variant="contained"  onClick={handleClickOpen}>
                                New Message
                            </Button>
                        ) : ( 
                            null
                        )
                }
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Message</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Type a subject and a message, then send your message.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="subject"
                            label="Subject"
                            type="text"
                            fullWidth
                            value={subject}
                            onChange={event => setSubject(event.target.value)}
                            required
                        />
                        <TextField
                            multiline
                            margin="dense"
                            id="message"
                            label="Message"
                            type="text"
                            fullWidth
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSendNewMessage} variant="contained" color="primary">
                            Send
                            </Button>
                        <Button onClick={handleClose} color="#1890FF">
                            Cancel
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>

    )

}

export default UserMessagingDashboard;