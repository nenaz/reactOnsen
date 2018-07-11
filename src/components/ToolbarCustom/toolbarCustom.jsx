import React from 'react'
import {
    BackButton,
    Toolbar
} from 'react-onsenui'

export default function ToolbarCustom(props) {
    const backButton = props.hasBackButton
        ? <BackButton onClick={props.handlerCanselClick}>Back</BackButton>
        : null;
    const cName = props.className || ''
    return (
        <Toolbar className={cName}>
            <div className='left'>{backButton}</div>
            <div className='center'>{props.title}</div>
        </Toolbar>
    )
}