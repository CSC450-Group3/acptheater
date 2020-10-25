import React from 'react';
import { Link } from "react-router-dom";

function PurchaseTickets() {

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
			onOk={() => setBackToMovies(true)}
			width={400}
			footer={[
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link >
				</Button>,
				<Button key="purchase" onClick={() =>setBackToMovies(true)}><Link to='/Showtimes'>Purchase Tickets</Link ></Button>
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