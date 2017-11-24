import React from 'react'
import { Page, ProgressCircular } from 'react-onsenui'

const Loading = (props) => {
    return (
        <Page>
            <div style={{
                position: 'absolute',
                top: 'calc(50% - 25px)',
                left: 'calc(50% - 25px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <ProgressCircular indeterminate />
                <span style={{
                    color: '#0076ff'
                }}></span>
            </div>
        </Page>
    )
}

export default Loading