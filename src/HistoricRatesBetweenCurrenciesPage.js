import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import {
    getHistoricRates,
    getHistoricRatesBetweenCurrencies,
} from "./requests";
import { Line } from "react-chartjs-2";
import { CURRENCIES } from "./exports";

const schema = yup.object({
    startDate: yup
        .string()
        .required("Start date is required")
        .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
        endDate: yup
        .string()
        .required('End date is required')
        .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
    fromCurrency: yup.string().required("From currency is required"),
    toCurrency: yup.string().required("To currency is required"),
});

const HistoricRatesBetweenCurrenciesPage = () => {
    const [data, setData] = useState({});

    const handleSubmit = async evt => {
        const isValid = await schema.validate(evt);
        if(!isValid) {
            return;
        }
        const params = {
            start_at: evt.startDate,
            end_at: evt.endDate,
            base: evt.fromCurrency,
            symbols: evt.toCurrency,
        }
        const response = await getHistoricRatesBetweenCurrencies(params);
        const rates = response.data.rates;
        const lineGraphData = {
            labels: Object.keys(rates),
            datasets: [
                {
                    data: Object.keys(rates).map(key => rates[key][evt.toCurrency]),
                    label: `${evt.fromCurrency} to ${evt.toCurrency}`,
                    borderColor: '#3e95cd',
                    fill:false,
                },
            ],
        };
        setData(lineGraphData);
    };

    return (
        <div className="historic-rates-page">
            <h1 className="center">Historic Rates</h1>
            <Formik validationSchema={schema} onSubmit={handleSubmit}>
                {/* //@TODO: left off here */}
            </Formik>
        </div>
    );
};
