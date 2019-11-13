import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// require('../../../../../node_modules/react-datepicker/dist/react-datepicker.css');
// require('../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

class DateInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    render() {
        return (
            <div className="form-group">
                <label>Select Date: </label>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="startDate"
                    dateFormat="mm/dd/yyyy"
                />
            </div>
        );
    }
}

export default DateInput;