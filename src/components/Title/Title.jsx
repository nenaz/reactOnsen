import React from 'react'

const TitleWidget = (props) => {
    return (
        <span style={{
            paddingLeft: '15px',
            display: 'inline-block',
            fontSize: '13px',
            height: '30px',
            lineHeight: '30px'
        }}>{props.title}</span>
    )
}

export default TitleWidget