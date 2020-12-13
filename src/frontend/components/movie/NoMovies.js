import React from 'react';
import { Empty } from 'antd';
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
    root: {
        width: '100vw',
    },
    text: {
        color: 'white',
        fontSize: '18px'
    },
    empty: {
        width: '80vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '10vw',
        paddingBottom: '10vw',
    }
}));


function NoMovies(props) {
    const classes = styles();

    return (
        <div className={classes.root} >
            <Empty
                className={classes.empty}
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 95,
                }}

                description={
                    <span className={classes.text}>
                        {props.children}
                    </span>
                }
            />
        </div>
    );
}

export default NoMovies;