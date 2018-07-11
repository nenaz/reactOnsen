import React from 'react';
import AuthButton from '../../AuthButton'
import CustomProgressCircular from '../../CustomProgressCircular'; 

export default function LogonButton(props) {
    return (
        <div className={props.blockClassName}>
            <AuthButton
                buttonText={props.buttonText}
                buttonStyle={props.buttonStyle}
                logonFunc={props.logonFunc}
            />
            <CustomProgressCircular
                className={props.circularClassName}
            />
        </div>
    )
}