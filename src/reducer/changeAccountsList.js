import _ from 'underscore'
import { 
    ADDACCOUNTTOLIST,
    EDITACCOUNTINLIST,
    REMOVEACCOUNTROMLIST
} from '../js/consts'

const addItem = (array,item) => {
    let newarray = array.slice()
    newarray.push(item)
    return newarray
}

const editItem = (array, obj) => {
    const newarray = _.map(array, (item) => {
        if (obj.id === item._id) {
            let typeOperation = obj.typeOperation
            if (typeOperation === '2') {
                typeOperation = obj.transfer ? '1' : '0'
            }
            if (typeOperation) {
                if (typeOperation === '0') {
                    item.amount -= obj.amount * 1
                } else if (typeOperation === '1') {
                    item.amount += obj.amount * 1
                }
            } else {
                item.amount = obj.amount
                item.name = (obj.name) ? obj.name : item.name
            }
        }
        return item
    })
    return newarray
}

const removeItem = (array, item) => {
    let numItem = array.indexOf(item)
    return (array.slice(0, numItem)).concat(array.slice(numItem + 1))
}

export default (accountsList = [], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDACCOUNTTOLIST: return addItem(accountsList, payload)
        case EDITACCOUNTINLIST: return editItem(accountsList, payload)
        case REMOVEACCOUNTROMLIST: return removeItem(accountsList, payload)
        default: return accountsList
    }
}