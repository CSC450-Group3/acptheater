import React from 'react';
import { Alert } from 'antd';
import moment from 'moment';

/**
 * Takes in a birthday an ensures the date is not in the future
 * @param {*} DOB - birthday
 */
export function validateDate(DOB) {
    // only validate valid dates
    if(DOB!==null && DOB!== ""){
        const birthday = moment(DOB).format("YYYY-MM-DD")
        const currentDate = moment().format("YYYY-MM-DD")
            
        //make sure birthday isn't a future date
        if (birthday > currentDate) {
            return true;
        }
        else return false;
    }
}


export function duplicateEmailAlert(isSameEmail) {
    if (isSameEmail) {
        return (
            <Alert message="User with the entered email already exists." type="error" showIcon />
        )
    }
}


export function displayDateAlert(DOB) {
    //show error if birthday is in the future
    if (validateDate(DOB)) {
        return (
            <Alert message=" Birthday cannot be in the future." type="error" showIcon />
        )
    }
}

  
