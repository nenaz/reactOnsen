import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {
    Input
} from 'react-onsenui'

const renderField = (custStyle) => (
    <Input
        className={custStyle.className}
        modifier={custStyle.modifier}
        float={custStyle.float}
        placeholder={custStyle.placeholder}
    />
);

let Form = (props) => {
    return (
        <div className = "nzAccountPageInputBlock" >
            <Field
                name="accountName"
                component={renderField}
                type="text"
                custStyle={{
                    modifier: 'underbar',
                    float: true,
                    className: "nzNewAccountName",
                    placeholder: "Название счета",
                }}
            />
            <Field
                name="amount"
                component={renderField}
                type="text"
                custStyle={{
                    modifier: 'underbar',
                    float: false,
                    className: "nzNewAmountValue",
                    placeholder: "Начальное значение",
                }}
            />
            <Field
                name="accountNumber"
                component={renderField}
                className="nzNewAmountValue"
                value={this.state.accountNumber}
                // onChange={this.handleNumberChange}
                placeholder="Номер счета"
                type="text"
                custStyle={{
                    modifier: 'underbar',
                    float: false,
                    className: "nzNewAmountValue",
                    placeholder: "Начальное значение",
                }}
            />
            <Field
                name="accountDate"
                component={renderField}
                className="nzNewAmountValue"
                value={this.state.accountDate}
                // onChange={this.handleDateChange}
                placeholder="Действителен до"
            />
            <Field
                name="accountPeople"
                component={renderField}
                className="nzNewAmountValue"
                value={this.state.accountPeople}
                // onChange={this.handlePeopleChange}
                placeholder="Имя владельца"
                type="text"
            />
        </div >
    )
}

Form = reduxForm({
    form: 'addAccount', // имя формы в state (state.form.post)
})(Form);

export default Form