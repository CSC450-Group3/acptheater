import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";


function ScheduleForm() {

const [activateModal, setActivateModal] = useState(true);
const [backToMovies, setBackToMovies] = useState(false);

  return (
	<div className="ScheduleForm">
		<Modal
			title='Schedule Movie Form'
			centered
			visible={activateModal}
			onCancel={() => setActivateModal(false)}
			onOk={() => setBackToMovies(true)}
			width={215}
			footer={[
				<Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Movies'>Cancel</Link > </Button>,
				<Button key="schedule" onClick={() =>setBackToMovies(true)}><Link to='/Movies'>Schedule</Link > </Button>
				]}
			>
			<form>
				
				<p>Screen</p>
				<input
				type="text"
				/>
				<p>Start Date and Time</p>
				<input
				type="tezt"
				/>
				<p>Price</p>
				<input
				type="tezt"
				/>
			</form>
			</Modal>

	</div>
  );
}

export default ScheduleForm;