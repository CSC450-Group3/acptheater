import moment from 'moment-timezone'

/**
 * Returns the input date in the format YYYY-MM-DD
 * If the date is null, it retuns todays date in the new format
 * 
 * @param {*} date 
 */
export function isoDate(date){
    var returnDate = null;

    if(date !== null){
        returnDate = moment(date).utc().tz('America/Chicago').format('YYYY-MM-DD');
    }
    else{
        returnDate = moment().utc().tz('America/Chicago').format('YYYY-MM-DD');
    }
    
    return returnDate;
}

/**
 *  Returns the date in UTC YYYY-MM-DD format 
 */
export function utcISODate(datetime){
    var returnDate = null;

    if(datetime !== null){
        returnDate = moment(datetime).utc().format("YYYY-MM-DD")
    }
    else{
        returnDate = moment().utc().format('YYYY-MM-DD')
    }
    
    return returnDate;
}



/**
 * Returns the input date in the format YYYY-MM-DD hh:mm:ss 
 * If the date is null, it retuns todays date in the new format
 * 
 * @param {*} datetime 
 */
export function isoDateTime(datetime){
    var returnDate = null;

    if(datetime !== null){
        returnDate = moment(datetime).format("YYYY-MM-DD hh:mm:ss")
    }
    else{
        returnDate = moment().format("YYYY-MM-DD hh:mm:ss")
    }
    
    return returnDate;
}



/**
 *  Returns the date in CST YYYY-MM-DD hh:mm:ss  format for timezone support
 */
export function cstISODateTime(datetime){
    var returnDate = null;

    if(datetime !== null){
        returnDate = moment(datetime).utc().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
    }
    else{
        returnDate = moment().utc().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
    }
    
    return returnDate;
}


/**
 *  Returns the date in CST MM/DD/YYYY h:mm AM/PM format 
 */
export function cstDateTime(datetime){
    var returnDate = null;

    if(datetime !== null){
        returnDate = moment(datetime).utc().tz('America/Chicago').format('MM/DD/YYYY h:mm A');
    }
    else{
        returnDate = moment().utc().tz('America/Chicago').format('MM/DD/YYYY h:mm A');
    }
    
    return returnDate;
}



/**
 *  Returns the date in UTC YYYY-MM-DD hh:mm:ss  format 
 */
export function utcISODateTime(datetime){
    var returnDate = null;

    if(datetime !== null){
        returnDate = moment(datetime).utc().format("YYYY-MM-DD HH:mm:ss")
    }
    else{
        returnDate = moment().utc().format('YYYY-MM-DD HH:mm:ss')
    }
    
    return returnDate;
}

// var a = moment('2020-11-19 19:02:00').utc().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
// var b = moment().utc().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
// console.log(a)
// console.log(b)