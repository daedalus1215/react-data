import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { getHistoricRates } from './requests';
import { Line } from 'react-chartjs-2';
import { CURRENCIES } from './exports';
import './HistoricRatesPage.css'

const schema = yup.object({
    startDate: yup
        .string()
        .required("Start date is required")
        .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
    endDate: yup
        .string()
        .required("End date is required")
        .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
    currency: yup.string().required("Currency is required"),
});

const HistoricRatesPage = async evt => {
    const [data, setData] = useState({});

    const handleSubmit = async evt => {
        const isValid = await schema.validate(evt);
        if (!isValid) {
            return;
        }
        const params = {
            start_at: evt.startDate,
            end_at: evt.endDate,
        };
        const response = await getHistoricRates(params);
        const rates = response.data.rates;
        const lineGraphData = {
            labels: Object.keys(rates),
            datasets: [
                {
                    data: Object.keys(rates)
                        .map.map(key => rates[key][evt.currency]),
                    label: `EUR to ${evt.currency}`,
                    borderColor: '#3e95cd',
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    };

    return (
        <div className="historic-rates-page">
            <h1 className="center">Historic Rates</h1>
            <Formik validationSchema={schema} onSubmit={handleSubmit}>
                {({
                    //@TODO: Left off here.
                })}
            </Formik>
        </div>
    );
};


export default HistoricRatesPage;