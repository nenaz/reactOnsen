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
            if (obj.typeOperation) {
                if (obj.typeOperation === '0') {
                    item.balance -= obj.balance * 1
                } else if (obj.typeOperation === '1') {
                    item.balance += obj.balance * 1
                }
            } else {
                item.balance = obj.balance
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