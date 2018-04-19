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

const updateItem = (array, obj) => {
    const userId  = (!obj.transfer)
        ? obj.idFrom
        : obj.idTo
    const newarray = _.map(array, (item) => {
        if (userId === item._id) {
            if (obj.typeOperation) {
                if (obj.typeOperation === '0') {
                    item.amount = obj.accountFromAmount - obj.amount
                } else if (obj.typeOperation === '1') {
                    item.amount = obj.accountToAmount + obj.amount
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
        case EDITACCOUNTINLIST: return updateItem(accountsList, payload)
        case REMOVEACCOUNTROMLIST: return removeItem(accountsList, payload)
        default: return accountsList
    }
}