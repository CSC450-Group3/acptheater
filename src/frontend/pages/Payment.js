import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

function Payment() {

const [activateModal, setActivateModal] = useState(true);
const [confirm, setConfirm] = useState(false);

    return (
        <div className="PaymentForm">		
		<Modal
			title='Payment Information'
			centered
			visible={activateModal}
			onCancel={() => setActivateModal(false)}
			onOk={() => setConfirm(true)}
			width={600}
			footer={[
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link > </Button>,
				<Button key="purchase" onClick={() => setConfirm(true)}><Link to='/Confirmation'>Confirm Payment</Link > </Button>
				]}
			>
			<form>
				<div>
					<p>Billing Information:</p>
					<label for="name" style={{paddingLeft: 10, alignContent: "center"}}>Name on Card: </label>
						<input type="text" id="name" placeholder="Name" />

                    <label for="address" style={{paddingLeft: 10, alignContent: "center"}}>Billing Address: </label>
						<input type="text" id="address" placeholder="Address" />
                        < br/>
                        < br/>
                    <label for="city" style={{paddingLeft: 10, alignContent: "center"}}>City: </label>
						<input type="text" id="city" placeholder="City" />

                    <label for="state" style={{paddingLeft: 10, alignContent: "center"}}>State: </label>
						<input type="text" id="state" placeholder="State" />
                        < br/>
                        < br/>
					<label for="zip" style={{paddingLeft: 10, alignContent: "center"}}>Zipcode: </label>
                        <input type="text" id="zip" placeholder="Zipcode" />
                        < br/>
                        < br/>
                        < br/>
                    <p>Credit Card Information:</p>
                    <label for="card" style={{paddingLeft: 10, alignContent: "center"}}>Card Number: </label>
                        <input type="text" id="card" placeholder="Card Number" />

                    <label for="exp" style={{paddingLeft: 10, alignContent: "center"}}>Expiration: </label>
                        <input type="text" id="expiration" placeholder="MM/YY" />
						< br/>
						< br/>
                    <label for="cvv" style={{paddingLeft: 10, alignContent: "center", width: "2em"}}>CVV: </label>
                        <input type="text" id="cvv" placeholder="CVV" />
                        < br/>
                        < br/>
                    <p>**Likely Print out the total here based on amount of tickets purchased/total price**</p>
				</div>
			</form>
			</Modal>

	</div>
  );
}

export default Payment;