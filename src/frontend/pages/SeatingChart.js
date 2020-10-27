import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

function SeatingChart() {

const [activateModal, setActivateModal] = useState(true);
const [nextPage, setNextPage] = useState(false);

    return (
        <div className="SeatingChart">
		<Modal
			title='Seating Chart'
			centered
			visible={activateModal}
			onCancel={() => setActivateModal(false)}
			onOk={() => setNextPage(true)}
			width={400}
			footer={[
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link >
				</Button>,
				<Button key="chooseSeat" onClick={() =>setNextPage(true)}><Link to='/NextPage'>Continue</Link ></Button>
				]}
			>
			<form>
                <p>This will be the form to Select Seats</p>
			</form>
			</Modal>

	</div>
  );
}

export default SeatingChart;