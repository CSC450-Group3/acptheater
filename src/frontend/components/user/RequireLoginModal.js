import React from 'react';
import { Modal, Button, Typography} from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';

const { Text, Paragraph } = Typography;

const RequireLoginModal = ( {activateLoginModal, setActivateLoginModal}) => {
    return (
        <Modal
            title='Login or Register'
            centered
            visible={activateLoginModal}
            onCancel={() => setActivateLoginModal(false)}
            width={350}
            footer={[
                <Button key="Login" type="primary" ><Link to='/Login'>Sign In</Link ></Button>,
                <Button key="SignUp" ><Link to='/SignUp'>Register</Link ></Button>,
                <Button key="cancel" onClick={() => setActivateLoginModal(false)}> Cancel </Button>,
            ]}
        >
           
            <Paragraph direction="vertical">
                <Text>You must be logged in to purchase tickets. Please register for an account or sign in to continue.</Text>
            </Paragraph>
            
        </Modal>
    )
}

export default RequireLoginModal;