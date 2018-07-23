import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {
    Input
} from 'react-onsenui'
import PropTypes from 'prop-types'
import { listOfFields } from '../../../../js/consts'

const renderField = ({ input, custStyle }) => (
    <Input
        className={custStyle.className}
        modifier={custStyle.modifier}
        float
        placeholder={custStyle.placeholder}
        {...input}
    />
);

const renderItem = (props, item, key) => {
    const placeholder = (props.editList && props.editList[key])
        ? props.editList[key]
        : item.placeholder
    return (
        <Field
            name={item.name}
            component={renderField}
            type="text"
            custStyle={{
                modifier: 'underbar',
                className: item.className,
                placeholder,
            }}
            key={key}
        />
    )
}

let Form = (props) => {
    return (
        <div className="nzAccountPageInputBlock">
            {props.listOfFields.map((item, key) => {
                return renderItem(props, item, key)
            })}
        </div>
    )
}

Form.propTypes = {
    listOfFields: PropTypes.array.isRequired,
    editList: PropTypes.array,
}

Form.defaultProps = {
    listOfFields,
}

Form = reduxForm({
    form: 'addAccount',
})(Form);

export default Form