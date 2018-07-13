import React from 'react'

export default class List extends React.Component {
    render() {
        return (
            <section className="myClass">
                {/* <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead> */}
                <div>
                    {this.props.data.map((item, index) => (
                        <div key={index}>
                            <span>
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}