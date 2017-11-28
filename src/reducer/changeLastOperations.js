import { ADDOPERATIONTOLIST } from '../js/consts'

const addItem = (array, item) => {
    let newarray = array.slice()
    newarray.push(item)
    return newarray
}

export default (operationsList = [1,2,3,4,5,6,7], action) => {
    const {type, payload} = action
    switch(type) {
        case ADDOPERATIONTOLIST: return addItem(operationsList, payload)
        default: return operationsList
    }
}