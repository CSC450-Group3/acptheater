import React from 'react';
import { Link } from "react-router-dom";

function Confirmation() {
    return (
        <div style={{backgroundColor: '#282c34', paddingTop: 75}}>
            <h1>Your order has been successfully processed and your seats are confirmed! < br/> Thank you for your purchase.</h1>
            < br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>< br/>
            <h2>You can now find your tickets within your user profile under the <Link to= "/UserDashboard">Tickets</Link > tab. </h2>
                < br/>
            <h3 style={{paddingLeft: 300, paddingRight: 300, paddingBottom: 100}}>We look forward to seeing you, and we hope you enjoy your experience here at ACP Theaters! 
                Should you have any questions or concerns in regards to your purchased tickets, 
                please navigate to either the message icon located in the navigation bar or 
                within your user profile under the <Link to= "/UserDashboard">Messaging</Link > tab.</h3>
            
        </div>
        //Addition of Movie card that the user has purchased should show up between the h1 and h2 tags. No clicking of the modal to brign up
        //information about the movie would be necessary. Just for visual purposes of the user's purchased tickets only
    );
}

export default Confirmation;