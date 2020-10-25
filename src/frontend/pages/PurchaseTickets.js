import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'antd/dist/antd.css';

function PurchaseTickets() {

const [activateModal, setActivateModal] = useState(true);
const [seatingChart, setSeatingChart] = useState(false);

    return (
        <div className="PurchaseForm">
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		
		<Modal
			title='Purchase Ticket Form'
			centered
			visible={activateModal}
			onCancel={() => setActivateModal(false)}
			onOk={() => setSeatingChart(true)}
			width={400}
			footer={[
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link >
				</Button>,
				<Button key="purchase" onClick={() =>setSeatingChart(true)}><Link to='/Showtimes'>Purchase Tickets</Link ></Button>
				]}
			>
			<form>
                <p>This will be the form to purchase Tickets</p>
			</form>
			</Modal>

	</div>
  );
}

export default PurchaseTickets;