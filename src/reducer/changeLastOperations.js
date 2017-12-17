import { ADDOPERATIONTOLIST } from '../js/consts'

const addItem = (array, item) => {
    let newarray = array.slice()
    newarray.unshift(item)
    return newarray
}

export default (operationsList = [], action) => {
    const {type, payload} = action
    switch(type) {
        case ADDOPERATIONTOLIST: return addItem(operationsList, payload)
        default: return operationsList
    }
}