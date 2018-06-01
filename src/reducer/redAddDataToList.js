import _ from 'underscore'
import {
    ADDDATATOLIST,
    EDITDATA,
    COLORS,
    LISTCATEGORY,
    ADDONECATEGORYFORCHART
} from '../js/consts'
import Utils from '../js/utils'

const addItem = (array, item) => {
    let newArray = array.slice()
    newArray = Utils.finishDataFormatingForChart(item)
    return newArray
}

const addOneCategoryForChart = (array, item) => {
    let newArray = array.slice()
    const catId = item.categoryId[0] * 1
    const res = LISTCATEGORY.find(row => {
        return row.value === catId
    })
    newArray.push({
        catId: catId,
        color: COLORS["color" + catId],
        id: res.title,
        label: res.title,
        value: item.amount * 1,
    })
    return newArray
}

const editItem = (data, item) => {
    const newarray = _.map(data, (row) => {
        const catId = +item.categoryId[0]
        if (row.catId === catId) {
            if (item.typeOperation) {
                if (item.typeOperation === '0') {
                    row.value += +item.amount
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
        case ADDONECATEGORYFORCHART: return addOneCategoryForChart(data, payload)
        default:
            return data;
    }
}