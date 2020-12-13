import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
        background: '#282c34',
		minHeight: "90vh",
    },
    img:{
        maxHeight: "350px",
        padding:20,
    },
    text:{
        color: 'white',
        padding:20
    },
    link:{
        fontSize: '18px',
        padding:20
    }
	
}));


function Unauthorized(){
    const classes = useStyles();

    useEffect( () => {
      document.title = `ACP | Unauthorized Access`;

    }, [])

  return (
    <div className={classes.root}>
     
     <img src = "/images/403Error.png" alt = "403 Error" className={classes.img}/>
       
        <h2 className={classes.text}>You do not have authorization to view this page.</h2>
        <Link to="/" className={classes.link}> Back to home</Link>

    </div>
  )
}

export default Unauthorized;