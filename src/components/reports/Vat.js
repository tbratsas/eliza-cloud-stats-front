import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { ListGroup } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

export default function VatTotals() {
    const [vat, setVat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [openItemIndex, setOpenItemIndex] = useState(null);

    const toggleCollapse = (index) => {
        setOpenItemIndex(prevIndex => (prevIndex === index ? null : index));
    };
    //console.log(vat)

    useEffect(() => {
        const token = localStorage.getItem('elizaAuthToken');
        axios.get(`${config.API_BASE_URL}/vat`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setVat(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching sales data:', err);
                setError('Failed to load sales data');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Φόρτωση δεδομένων...</div>;
    if (error) return <div>{error}</div>;
    //console.log("VAT", vat)
    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>ΦΠΑ</h2>
            <hr></hr>
            <ListGroup style={{ textAlign: 'left' }}>
                {vat.totalVat.map((item, index) => {
                    let vat_str = '';
                    const isOpen = openItemIndex === index;

                    if (item.vat === 1) {
                        vat_str = '24%';
                    } else if (item.vat === 2) {
                        vat_str = '13%';
                    }

                    return (
                        <ListGroup.Item key={index}>
                            <strong>{vat_str}:</strong> €{item.total_vat_amount.toFixed(2)}
                            <Button
                                onClick={() => toggleCollapse(index)}
                                aria-controls={`collapse-${index}`}
                                aria-expanded={isOpen}
                                variant="link"
                                style={{ marginLeft: '10px' }}
                            >
                                {isOpen ? 'Απόκρυψη' : 'Εμφάνιση'}
                            </Button>

                            <Collapse in={isOpen}>
                                <div id={`collapse-${index}`} style={{ marginTop: '10px' }}>
                                    {vat.totalVatPerRoduct
                                        .filter((el) => el.vat === item.vat)
                                        .map((el, i) => (
                                            <p key={i}>
                                                {el.product_name}: €{parseFloat(el.total_vat_amount).toFixed(2)}
                                            </p>
                                        ))}
                                </div>
                            </Collapse>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
}
