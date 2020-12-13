import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
        background: '#282c34', 
        minHeight: "90vh",      
    },
    content: {
        height: "100vh",
        width: "100%"
    },
}));


const StreamVirtual = () => {
    const classes = styles();

    useEffect( () => {
		document.title = `ACP | Stream Movie`;

	}, [])



        return (
            <div className={classes.root}>
                <iframe 
                    className={classes.content}
                    title="Stream Movie Placeholder"
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