import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const footerStyle = makeStyles(() => ({
    footer: {
        background: '#000000',
        color: '#1890ff',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: "100%",
    }
}));

    function Footer() {
        const classes = footerStyle();
        return (
            <div className="footer-wrapper">
            <div style={{padding: 20}}className={classes.footer}>
                <footer className="footer">
                    ACP Theatres | Caitlin Landrus, Patrick Garry, Alex Yahn | © 2020
                </footer>
            </div>   
            </div>
        )
      };


export default Footer;