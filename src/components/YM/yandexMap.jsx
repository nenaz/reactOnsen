import React,{ Component} from 'react'
import Proptypes from 'prop-types'
import { Map, Marker } from 'yandex-map-react';

class YandexMap extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        if (this.props.coord) {
            return (
                <Map className="nzYM"
                    onAPIAvailable={() => {
                        console.log('API loaded');
                    }}
                    center={[
                        this.props.coord.lat,
                        this.props.coord.lon
                    ]}
                    zoom={17}
                    width="100%" height="280px"
                >
                    <Marker lat={+this.props.coord.lat} lon={+this.props.coord.lon} />
                </Map>
            )
        } else {
            return <div />
        }
    }
}

YandexMap.propTypes = {
    coord: Proptypes.object
}

YandexMap.defaultProps = {
    coord: null
}

export default YandexMap