import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Modal, Button } from 'react-onsenui'
import { ICONCAHMINUS, ICONCAHPLUS } from '../../js/consts'
import Icon from '../Icon'

import TitleSelect from '../TitleSelect'
// import Title from '../Title'
import { FILTERLIST } from '../../js/consts'
import { Map, Marker } from 'yandex-map-react';

class WaigetLastOperations extends Component{
    constructor(props){
        super(props)
        this.state ={
            moreFive: false,
            filter: 'last5',
            modalOpen: false,
        }
        this.filterOperations = this.filterOperations.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.renderRow = this.renderRow.bind(this)
        this.showDetails = this.showDetails.bind(this)
        this.handleHideModal = this.handleHideModal.bind(this)
        this.getCoord = this.getCoord.bind(this)

        
    }

    componentWillMount() {
        // this.positionObj = this.getCoord()
        this.getCoord().then((obj) => {
            this.setState({
                lat: obj.coords.latitude,
                lon: obj.coords.longitude
            })
        })
    }

    componentDidMount() {
        // const map = new ymaps.Map("map", {
        //     center: [55.76, 37.64],
        //     zoom: 7
        // });
    }

    showDetails() {
        this.setState({ modalOpen: true });
    }

    handleHideModal() {
        this.setState({ modalOpen: false });
    }

    renderRow(row, index) {
        const icon = (row.typeOperation === "1") ? ICONCAHPLUS : ICONCAHMINUS
        return (
            <ListItem
                key={index}
                tapBackgroundColor="#0f0f0f"
                tappable
                onClick={this.showDetails}
            >
                <div className="left">
                    <Icon
                        iconBase64={icon} styleObj={{
                            width: '40px'
                        }}
                    />
                </div>
                <div className="center" style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{
                        flexGrow: 1,
                        justifyContent: 'space-around',
                        display: 'flex'
                }}>
                        <span style={{ paddingRight: '7px' }}>{row.balance}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <span>{row.data.date}</span>
                        <span>{row.data.time}</span>
                    </div>
                </div>
            </ListItem>
        )
    }

    handleChangeSelect(e) {
        this.setState({
            filter: e.target.value
        })
    }

    filterOperations() {
        let result = []
        switch(this.state.filter) {
            case 'last5': result = this.props.operations.slice(0, 5)
                break
            default: result = this.props.operations
        }
        return result
    }

    getCoord() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log(pos);
                resolve(pos);
            }, function(error) {
                console.log(error)
                reject(error)
            });
        })
    }

    render(){
        // console.log(this.positionObj)
        return (
            <div>
                <TitleSelect data={FILTERLIST} handleChangeSelect={this.handleChangeSelect} />
                {/* <Title title={FILTERLIST[0].title} /> */}
                <List 
                    style={{
                        overflowY: 'scroll',
                        maxHeight: '55vh',
                        minHeight: '55vh'
                    }}
                    dataSource={this.filterOperations()}
                    renderRow={this.renderRow}
                />
                <Modal isOpen={this.state.modalOpen}>
                    <section style={{
                        margin: '15px',
                        backgroundColor: '#eceff1',
                        color: 'black'
                    }}>
                        {this.state.lon && (
                            <Map className="nzYM"
                                onAPIAvailable={function () { console.log('API loaded'); }} center={[this.state.lat, this.state.lon]} zoom={17}
                                width="100%" height="280px"
                            >
                                <Marker lat={this.state.lat} lon={this.state.lon} />
                            </Map>)}
                        <Button
                            onClick={() => {
                                this.handleHideModal()
                            }}
                            modifier='quiet large'
                        >
                            Close
                        </Button>
                    </section>
                </Modal>
            </div>
        )
    }
}

export default connect((state) => ({
    operations: state.changeLastOperations
}))(WaigetLastOperations)