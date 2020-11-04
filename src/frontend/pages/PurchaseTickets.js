import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

function PurchaseTickets() {

const [activateModal, setActivateModal] = useState(true);
const [seatingChart, setSeatingChart] = useState(false);

    return (
        <div className="PurchaseForm">		
		<Modal
			title='Purchase Tickets'
			centered
			visible={activateModal}
			onCancel={() => setActivateModal(false)}
			onOk={() => setSeatingChart(true)}
			width={400}
			footer={[
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link > </Button>,
				<Button key="purchase" onClick={() => setSeatingChart(true)}><Link to='/SeatingChart'>Confirm</Link > </Button>
				]}
			>
			<form>
				<div>
					<p>Please select from all options below:</p>
					<label for="date" style={{padding: 10}}>Date: </label>
						<select></select>
					<label for="time" style={{padding: 10}}>Time: </label>
						<select></select>
					<label for="viewers" style={{padding: 10}}>Number of Viewers: </label>
						<select></select>
						< br/>
						< br/>
				</div>
				<div>
					<input type="checkbox" id="virtual" />
						<label for="virtual" style={{padding: 20}}> Virtual Ticket(s)</label>
					<input type="checkbox" id="theater" />
						<label for="theater" style={{padding: 20}}> Theater Ticket(s)</label>
				</div>
			</form>
			</Modal>

	</div>
  );
}

export default PurchaseTickets;