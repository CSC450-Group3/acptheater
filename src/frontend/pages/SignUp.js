import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {isoDate} from '../helper/FormatDate'
import {validateDate, displayDateAlert, duplicateEmailAlert} from '../helper/UserValidation'


const style = makeStyles(() => ({
    input: {
        background: 'white',
        color: 'black',
    }
}));

function UserCreation(props) {
    const classes = style();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsConditions, setTermsConditions] = useState(0);
    const [sameEmailError, setSameEmailError] = useState(null);
    const [history] = useState(props.history);


    useEffect(() => {
        // Update the document title using the browser API
        document.title = `ACP | Sign Up`;
    });

    async function signUp(e) {
        e.preventDefault();
        // Check if user email already exists
        await axios.get('/api/user/email/' + email)
            .then(function (res) {
                //email address already exists for an account
                if (res.data.length > 0) {
                    setSameEmailError(true);
                }
            })
            .catch(function (err) {
                console.log(err)
            });

        // Attempt to create new user there aren't errors
        if (sameEmailError !== true && termsConditions !== 0 && validateDate(birthday) !== true) {
            await axios.post('/api/user/create', {
                first_name: firstName,
                last_name: lastName,
                middle_name: null,
                birthday: isoDate(birthday),
                email: email,
                password: password,
                type: 'C', // hard code customer
                diabled: null //new accounts are not disabled
            })
            .then(function (res) {
                //user created successfully
                if (res.status === 200) {
                    const user = res.data
                    //redirect to login screen upon successful creation
                    history.push("/Login");
                }
            })
            .catch(function (err) {
                // print error
                console.log(err);
            });
        }
    }

    return (
        <body class="signUpWelcome">
            <h1 class="signUpHeader">Become A Part Of The ACP Theatres Family</h1>

            <div class="row" className="userCreationRow">
                <div class="column" className="userCreationWelcome">
                    <p>
                        Turn your already wonderful ACP Theatres experience
                        up to the next level by customizing your own member
                        profile today!
                        <br></br><br></br>
                        To create your ACP Theatre account, simply enter your
                        Email, first and last name, birthday, and password.
                        <br></br><br></br>
                        In creating a your member account, you will be the first
                        to recieve important updates, deals, specials, and offers.
                    </p>
                </div>

                <div class="column" className="userCreationForm">

                    <form action="home.html" method="post" onSubmit={signUp}>
                        <div>
                            <input
                                value={email}
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                                className={classes.input}
                                onChange={event => {
                                    setEmail(event.target.value);
                                    setSameEmailError(false);
                                }
                                }
                            />
                            {duplicateEmailAlert(sameEmailError)}
                        </div>
                        <p></p>
                        <p></p>
                        <div>
                            <input
                                value={firstName}
                                type="text"
                                placeholder="First Name"
                                name="fName"
                                required
                                className={classes.input}
                                onChange={event => setFirstName(event.target.value)}
                            />
                            <input
                                value={lastName}
                                type="text"
                                placeholder="Last Name"
                                name="lName"
                                required
                                className={classes.input}
                                onChange={event => setLastName(event.target.value)}
                            />
                        </div>
                        <p></p>
                        <p></p>
                        <div>
                            <input
                                value={birthday}
                                type="date"
                                required
                                className={classes.input}
                                onChange={event => setBirthday(event.target.value)}
                            />
                            {displayDateAlert(birthday)}
                        </div>
                        <p></p>
                        <p></p>
                        <input
                            value={password}
                            type="password"
                            placeholder="password"
                            name="password"
                            className={classes.input}
                            required minlength="8"
                            onChange={event => setPassword(event.target.value)}
                        />
                        <p></p>
                        <p></p>
                        <div>
                            <input
                                value={termsConditions}
                                type="checkbox"
                                id="termsConditions"
                                name="termsConditions"
                                className={classes.input}
                                required
                                onChange={event => setTermsConditions(event.target.value)}
                            />
                            <label for="termsConditions"> I agree to ACP Theatres Terms & Conditions</label>
                        </div>
                        <p></p>
                        <p></p>
                        <div>
                            <button type="submit" class="btn btn-primary">Save</button>
                            <button><Link to='/'>Cancel</Link ></button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default withRouter(UserCreation);