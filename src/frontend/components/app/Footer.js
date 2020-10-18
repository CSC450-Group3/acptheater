import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const footerStyle = makeStyles(() => ({
    footer: {
        background: '#3f51b5',
        color: '#fff',
        textAlign: 'center'
    }
}));

    function Footer() {
        const classes = footerStyle();
        return (
            <div style={{padding: 20}}className={classes.footer}>
                <p>ACP Theater | Caitlin Landrus, Patrick Garry, Alex Yahn | © 2020</p>
            </div>   
        )
      };


export default Footer;