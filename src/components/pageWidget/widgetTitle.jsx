import React from 'react'

const TItleWidget = (props) => {
    return (
        <span style={{
            margin: '5px',
            display: 'inline-block',
            fontSize: '13px',
            width: '100%',
            marginBottom: '10px',
            marginTop: '0'
        }}>{props.title}</span>
    )
}

export default TItleWidget