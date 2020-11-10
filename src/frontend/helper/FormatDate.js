import moment from 'moment'

/**
 * Returns the input date in the format YYYY-MM-DD
 * If the date is null, it retuns todays date in the new format
 * 
 * @param {*} date 
 */
export function isoDate(date){
    var returnDate = null;

    if(date !== null){
        returnDate = moment(date).format("YYYY-MM-DD")
    }
    else{
        returnDate = moment().format("YYYY-MM-DD")
    }
    
    return returnDate;
}
