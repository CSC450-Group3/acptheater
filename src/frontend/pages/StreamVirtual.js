import React from 'react';
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
        minHeight: "90vh",
        height: "100%",
        margin: 40
    },
    header: {
        color: "white"
    },
    content: {
        minHeight: 300,
        height: "100%",
    },

}));


const StreamVirtual = () => {
    const classes = styles();


        return (
            <div className={classes.root}>
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/ZxQ0Q6uyHWY" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        )

}

export default StreamVirtual;