import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

function SeatingChart() {

const [activateModal, setActivateModal] = useState(true);
const [payment, setPayment] = useState(false);

    return (
        <div className="SeatingChart">
		<Modal
			title='Seating Chart'
			centered
			visible={activateModal}
			onCancel={() => setActivateModal(false)}
			onOk={() => setPayment(true)}
			width={400}
			footer={[
				<Button 
				type="primary"
				key="chooseSeat" onClick={() => setPayment(true)}>
					<Link to='/Payment'>Confirm Seats</Link > 
					</Button>,
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link > </Button>
				]}
			>
				<form>
					<h1>___________Screen___________</h1>
					<Button style={{padding: 7}}>A1</Button>
					<Button style={{padding: 7}}>A2</Button>
					<Button style={{padding: 7}}>A3</Button>
					<Button style={{padding: 7}}>A4</Button>
					<Button style={{padding: 7}}>A5</Button>
					<Button style={{padding: 7}}>A6</Button>
					<Button style={{padding: 7}}>A7</Button>
					<Button style={{padding: 7}}>A8</Button>
					<Button style={{padding: 7}}>A9</Button>
					<Button style={{padding: 7}}>A10</Button>
					<Button style={{padding: 7.5}}>B1</Button>
					<Button style={{padding: 7.5}}>B2</Button>
					<Button style={{padding: 7.5}}>B3</Button>
					<Button style={{padding: 7.5}}>B4</Button>
					<Button style={{padding: 7.5}}>B5</Button>
					<Button style={{padding: 7.5}}>B6</Button>
					<Button style={{padding: 7.5}}>B7</Button>
					<Button style={{padding: 7.5}}>B8</Button>
					<Button style={{padding: 7.5}}>B9</Button>
					<Button style={{padding: 7.5}}>B10</Button>
					<Button style={{padding: 7.2}}>C1</Button>
					<Button style={{padding: 7.2}}>C2</Button>
					<Button style={{padding: 7.2}}>C3</Button>
					<Button style={{padding: 7.2}}>C4</Button>
					<Button style={{padding: 7.2}}>C5</Button>
					<Button style={{padding: 7.2}}>C6</Button>
					<Button style={{padding: 7.2}}>C7</Button>
					<Button style={{padding: 7.2}}>C8</Button>
					<Button style={{padding: 7.2}}>C9</Button>
					<Button style={{padding: 7.2}}>C10</Button>
					<Button style={{padding: 6.7}}>D1</Button>
					<Button style={{padding: 6.7}}>D2</Button>
					<Button style={{padding: 6.7}}>D3</Button>
					<Button style={{padding: 6.7}}>D4</Button>
					<Button style={{padding: 6.7}}>D5</Button>
					<Button style={{padding: 6.7}}>D6</Button>
					<Button style={{padding: 6.7}}>D7</Button>
					<Button style={{padding: 6.7}}>D8</Button>
					<Button style={{padding: 6.7}}>D9</Button>
					<Button style={{padding: 6.7}}>D10</Button>
					<Button style={{padding: 8}}>E1</Button>
					<Button style={{padding: 8}}>E2</Button>
					<Button style={{padding: 8}}>E3</Button>
					<Button style={{padding: 8}}>E4</Button>
					<Button style={{padding: 8}}>E5</Button>
					<Button style={{padding: 8}}>E6</Button>
					<Button style={{padding: 8}}>E7</Button>
					<Button style={{padding: 8}}>E8</Button>
					<Button style={{padding: 8}}>E9</Button>
					<Button style={{padding: 8}}>E10</Button>
				</form>
			</Modal>
	</div>
  );
}

export default SeatingChart;