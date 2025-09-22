import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { el } from 'date-fns/locale';

function DateRangeFilter({ onFilter }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        if (onFilter) {
            onFilter({ startDate, endDate });
        }
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        if (onFilter) {
            onFilter({ startDate: '', endDate: '' });
        }
    };

    const hasDates = startDate || endDate;

    return (
        <Row className="mb-3 align-items-end">
            <Col xs="auto">
                <Form.Group>
                    <Form.Label>Από</Form.Label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        placeholderText="Επιλέξτε ημερομηνία και ώρα"
                        locale={el}
                        className="form-control"
                        maxDate={endDate}
                    />
                </Form.Group>
            </Col>

            <Col xs="auto">
                <Form.Group>
                    <Form.Label>Έως</Form.Label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        placeholderText="Επιλέξτε ημερομηνία και ώρα"
                        locale={el}
                        className="form-control"
                        minDate={startDate}
                    />
                </Form.Group>
            </Col>

            <Col xs="auto">
                <Button variant="success"
                    onClick={handleFilter}
                    disabled={!startDate || !endDate || new Date(startDate) > new Date(endDate)}
                >
                    Εφαρμογή
                </Button>
            </Col>

            {hasDates && (
                <Col xs="auto">
                    <Button variant="warning" onClick={handleClear}>
                        Καθαρισμός
                    </Button>
                </Col>
            )}
        </Row>
    );
}

export default DateRangeFilter;
