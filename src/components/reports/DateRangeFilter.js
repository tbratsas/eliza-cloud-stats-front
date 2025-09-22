import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

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
                <Form.Label>Από</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate || undefined}
                />
            </Col>

            <Col xs="auto">
                <Form.Label>Έως</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || undefined}
                />
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
