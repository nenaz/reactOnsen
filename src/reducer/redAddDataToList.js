import { ADDDATATOLIST } from '../js/consts'
import Utils from '../js/utils'

const addItem = (array, item) => {
    let newArray = array.slice()
    newArray = Utils.finishDataFormatingForChart(item)
    // newarray.push(item)
    return newArray
}

export default (data = [], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDDATATOLIST: return addItem(data, payload)
        default:
            return data;
    }
}