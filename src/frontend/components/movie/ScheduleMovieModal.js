import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, DatePicker, InputNumber, TimePicker, Button, Alert, Radio } from 'antd';
import { v4 } from 'node-uuid'; // used to generate unique ID
import axios from 'axios';
import moment from 'moment';
import { utcISODate, isoDate } from '../../helper/FormatDate';

function ScheduleMovieModal({ addSchedule, allScreens, setRerender, showings, movie, setActivateModal, activateModal, setScheduleError }) {
    const [availableScreens, setAvailableScreens] = useState([])
    const [screenID, setScreenID] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [price, setPrice] = useState(null);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isOverlapping, setIsOverlapping] = useState(false);
    const [overlapShowingTime, setOverlapShowingTime] = useState(null);
    const [success, setSuccess] = useState(false)
    const [form] = Form.useForm();
    var showingDateTime = startDate + " " + startTime;
    //stip of the 'min' off duration, so add it to the start time
    var duration = (movie.duration).replace(/[^0-9]/g, '');
    const dateFormat = 'MM/DD/YYYY'

    useEffect(() => {
        //set a 2 second timer
        let timer = setTimeout(() => setSuccess(false), 2000)

        // clear Timeout when component unmounts
        return () => {
            clearTimeout(timer)
        }
    },
        [success] // clearTimeout will run every time this value changes 
    )


    async function addNewShowing(bool) {
        await axios.get('/api/screen/' + screenID)
            .then(function (res) {
                //get the selected screen info and store the appropriate data to the database
                addSchedule(v4(), screenID, res.data.screen_name, startDate + " " + startTime, price)
                setScheduleError(false);
                setSuccess(true)
                if (bool) {
                    setActivateModal(false);
                }
                else {
                    //force a rerender on parent component so new recrod shows up
                    setRerender(true)
                    setRerender(false)
                }
            })
            .catch(function (err) {
                const errors = [];
                errors.push(err);

                console.log(errors)
            });
    }


    const onFinish = (e, bool) => {
        //add new showing if the fields are valid
        form.validateFields()
            .then(() => {
                // only add schedule if there are no errors
                if (!isDuplicateShowing() && !isOverlappingShowing()) {
                    addNewShowing(bool);
                }
            })
            .catch((err) => {
                //required fields were not populated
                //console.log(err)
            });
    }

    function onCancel() {
        setActivateModal(false);
        clearError();
    }

    function onScreenChange(e) {
        setScreenID(e.target.value);
        clearError();
    }

    function onDateChange(val) {
        setStartDate(moment(val).format('MM/DD/YYYY'));
        loadAvailableScreens(val);
        clearError();
    }

    function onTimeChange(val) {
        setStartTime(moment(val).format('h:mm A'));
        clearError();
    }

    function onPriceChange(val) {
        setPrice(val);
        clearError();
    }

    /**
     * // Can all dates before today's date   
     * @param {*} current 
     */
    const disabledDate = (current) => {
        return current.format("YYYY-MM-DD") < moment().format("YYYY-MM-DD");
    }

    /**
     * Load the screens that do not have an associated movie showing on 
     * a given date.
     * @param {*} date 
     */
    async function loadAvailableScreens(date) {
        //get all screens at the movie theater
        await axios.get('/api/screen/date/' + isoDate(date))
            .then(function (res) {
                //screens found successfully
                setAvailableScreens(res.data)
            })
            .catch(function (err) {
                console.log(err)
            });

    }

    function isDuplicateShowing() {
        var isDuplicate = false;

        // no schedules yet
        if (Object.keys(showings).length === 0) {
            return false;
        }

        // check schedules for duplicate screen showing times
        Object.keys(showings).forEach(element => {
            if (showings[element].screen_id === screenID && showings[element].start_date_time === showingDateTime) {
                setIsDuplicate(true)
                isDuplicate = true;
                return true;
            }
        });

        // no duplicates found
        return isDuplicate;
    }

    function isOverlappingShowing() {
        var isOverlapping = false;
        var newShowingStart = moment(showingDateTime).toDate();
        var newShowingEnd = moment(showingDateTime).add(duration, 'minutes').toDate();

        // no schedules yet
        if (Object.keys(showings).length === 0) {
            return false;
        }

        // check for overlapping screen times
        Object.keys(showings).forEach(element => {
            var existingShowing = showings[element].start_date_time;
            var existingShowingStart = moment(existingShowing).toDate();
            var existingShowingEnd = moment(existingShowing).add(duration, 'minutes').toDate();


            if (showings[element].screen_id === screenID) {
                isOverlapping = (
                    // the movie starts within the duration of another showing on the same screen
                    (moment(existingShowingStart).isBefore(newShowingStart) && moment(newShowingStart).isBefore(existingShowingEnd))
                    // the movie ends within the duration of another showing on the same screen
                    || (moment(existingShowingStart).isBefore(newShowingEnd) && moment(newShowingEnd).isBefore(existingShowingEnd))
                );

                if (isOverlapping) {
                    setIsOverlapping(true)
                    setOverlapShowingTime(moment(showings[element].start_date_time).format('h:mm A'))
                    return true;
                }
            }
        });

        // no overlap found
        return isOverlapping;


    }

    function clearError() {
        setIsDuplicate(false);
        setIsOverlapping(false)
    }

    function displayAlert() {
        if (isDuplicate) {
            return (
                <Alert
                    message="Error: cannot schedule showings on the same screen at the same time."
                    type="error"
                    showIcon
                />
            )
        }
        else if (isOverlapping) {
            const errorMessage = "Error: movie showtimes cannot overlap. " + movie.title + " runs for " + duration + " minutes and overlaps with showing starting at " + overlapShowingTime + "."
            return (
                <Alert
                    message={errorMessage}
                    type="error"
                    showIcon
                />
            )
        }
        else if (success) {
            return (
                <Alert
                    message="Showing added!"
                    type="success"
                    showIcon />
            )
        }
    }

/**
	 * Screen radio buttons. Shows active there isn't a movie scheduled 
     * on the selected date. Shows inactive if there is already a movie scheduled
     * on the selected date for the given screen
	 * @param {*} screen_id 
	 * @param {*} screen_name 
	 */
	const Screen = ({ screen_id, screen_name, disabled}) => {
		if (disabled) {
			return (
				<Radio.Button
					key={screen_id}
					value={screen_id}
					name={screen_name}
					disabled
				>
					Screen {screen_name}
				</Radio.Button>
			)
		}
		else {
			return (
				<Radio.Button
					key={screen_id}
					value={screen_id}
					name={screen_name}
				>
					Screen {screen_name}
				</Radio.Button>
			)
		}
	}

    return (

        <Modal
            title='Schedule Movie Form'
            centered
            visible={activateModal}
            width={375}
            footer={[
                <div style={{ textAlign: "left" }} key={v4()}>
                    <Button
                        key="addAgain"
                        type="primary"
                        htmlType="submit"
                        onClick={(e) => onFinish(e, false)}
                        size={'middle'}
                        style={{ marginBottom: 5 }}
                    >
                        Add & Add Another
                    </Button>
                    <Button
                        key="Add"
                        type="secondary"
                        htmlType="submit"
                        onClick={(e) => onFinish(e, true)}
                        size={'middle'}
                        style={{ marginBottom: 5 }}
                    >
                        Add One
                    </Button>
                    <Button 
                        key="cancel" 
                        size={'middle'} 
                        onClick={onCancel}
                    >
                        Close
                    </Button>
                </div>
            ]}

        >
            <Form
                form={form}
                layout="vertical"
                name="Schedule Movie Form"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: 'Date is required.' }]}
                >
                    <DatePicker
                        name="date"
                        id="startDate"
                        required
                        onChange={onDateChange}
                        disabledDate={disabledDate}
                        format={dateFormat}
                    />
                </Form.Item>

                <Form.Item
                    label="Showtime (CST)"
                    name="time"
                    rules={[{ required: true, message: 'Showtime is required.' }]}
                >
                    <TimePicker
                        value={startTime}
                        use12Hours format="h:mm A"
                        minuteStep={15}
                        onChange={onTimeChange}
                    />
                </Form.Item>


                <Form.Item
                    label="Screen"
                    name="screen"
                    rules={[{ required: true, message: 'Screen is required.' }]}
                    tooltip='Select a date to see available screens.'

                >
                    <Radio.Group onChange={onScreenChange} style={{ padding: 10 }} required >
                        {Object.keys(availableScreens).map((key) => (
                            <Screen
                                key={availableScreens[key].screen_id}
                                screen_id={availableScreens[key].screen_id}
                                screen_name={availableScreens[key].screen_name}
                                disabled={availableScreens[key].disabled}
                            />
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Price is required.' }]}
                >
                    <InputNumber
                        value={price}
                        min={0.00}
                        max={999.99}
                        pattern="^\d*(\.\d{0,2})?$"
                        formatter={value => `${value}`}
                        parser={value => value.replace('%', '')}
                        onChange={onPriceChange}
                        onInput={(e) => {
                            // only allows 6 total digits, but we cap out at 999.99, 3 digits for numeric value and two for decimal. 
                            if (e.target.value.length > 6) {
                                e.target.value = e.target.value.slice(0, 6);
                            }
                            // formats the decimal to only allow 2 decimal places
                            else if (((e.target.value).toString().split(".")[1]) != undefined && ((e.target.value).toString().split(".")[1]).length > 2) {
                                let val = e.target.value
                                e.target.value = parseFloat(val).toFixed(2);
                                setStartTime(e.target.value)
                            }
                        }}
                    />
                </Form.Item>

                {displayAlert()}
            </Form>
        </Modal>

    )
}



export default ScheduleMovieModal;
