import React, { useState } from "react";
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
        .required("End date is required")
        .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
    fromCurrency: yup.string().required("From currency is required"),
    toCurrency: yup.string().required("To currency is required"),
});

function HistoricRatesBetweenCurrenciesPage() {
    const [data, setData] = useState({});
    const handleSubmit = async evt => {
        const isValid = await schema.validate(evt);
        if (!isValid) {
            return;
        }
        const params = {
            start_at: evt.startDate,
            end_at: evt.endDate,
            base: evt.fromCurrency,
            symbols: evt.toCurrency,
        };
        const response = await getHistoricRatesBetweenCurrencies(params);
        const rates = response.data.rates;
        const lineGraphData = {
            labels: Object.keys(rates),
            datasets: [
                {
                    data: Object.keys(rates).map(key => rates[key][evt.toCurrency]),
                    label: `${evt.fromCurrency} to ${evt.toCurrency}`,
                    borderColor: "#3e95cd",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    };
    return (
        <div className="historic-rates-page">
            <h1 className="center">Historic Rates</h1>
            <Formik validationSchema={schema} onSubmit={handleSubmit}
                initialValues={{
                    startDate: "2020-05-05",
                    endDate: "2020-05-05",
                    fromCurrency: "",
                    toCurrency: "",
                }}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isInvalid,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="startDate"
                                    placeholder="YYYY-MM-DD"
                                    value={values.startDate || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.startDate && errors.startDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.startDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="endDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="endDate"
                                    placeholder="YYYY-MM-DD"
                                    value={values.endDate || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.endDate && errors.endDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.endDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="fromCurrency">
                                <Form.Label>From Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder="From Currency"
                                    name="fromCurrency"
                                    onChange={handleChange}
                                    value={values.fromCurrency || ""}
                                    isInvalid={touched.fromCurrency && errors.fromCurrency}
                                >
                                    <option>Select</option>
                                    {CURRENCIES.filter(c => c != values.toCurrency).map(c => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.fromCurrency}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="currency">
                                <Form.Label>To Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder="To Currency"
                                    name="toCurrency"
                                    onChange={handleChange}
                                    value={values.toCurrency || ""}
                                    isInvalid={touched.toCurrency && errors.toCurrency}
                                >
                                    <option>Select</option>
                                    {CURRENCIES.filter(c => c != values.fromCurrency).map(c => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.toCurrency}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" style={{ marginRight: "10px" }}>
                            Search
            </Button>
                    </Form>
                )}
            </Formik>
            <br />
            <div style={{ height: "400px", width: "90vw", margin: "0 auto" }}>
                <Line data={data} />
            </div>
        </div>
    );
}
export default HistoricRatesBetweenCurrenciesPage;