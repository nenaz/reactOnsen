import _ from 'underscore'
import {
    ADDDATATOLIST,
    EDITDATA
} from '../js/consts'
import Utils from '../js/utils'

const addItem = (array, item) => {
    let newArray = array.slice()
    newArray = Utils.finishDataFormatingForChart(item)
    return newArray
}

const editItem = (data, item) => {
    const newarray = _.map(data, (row) => {
        if (row.catId === item.categoryId[0] * 1) {
            if (item.typeOperation) {
                // row.value = (item.typeOperation === '0')
                //     ? row.value - item.amount * 1
                //     : row.value + item.amount * 1
                if (item.typeOperation === '0') {
                    row.value += item.amount * 1
                }
            }
        }
        return row
    })
    return newarray
}

export default (data = [], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDDATATOLIST: return addItem(data, payload)
        case EDITDATA: return editItem(data, payload)
        default:
            return data;
    }
}