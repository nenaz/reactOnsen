import _ from 'underscore'
import { 
    ADDACCOUNTTOLIST,
    EDITACCOUNTINLIST,
    DELETEACCOUNTFROMLIST
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
                    if (obj.accountToAmount) {
                        item.amount = obj.accountToAmount + obj.amount
                    } else {
                        item.amount = obj.accountFromAmount + obj.amount
                    }
                }
            } else {
                item.amount = obj.amount
                item.accountName = (obj.accountName) ? obj.accountName : item.accountName
                item.accountNumber = (obj.accountNumber) ? obj.accountNumber : item.accountNumber
                item.accountDate = (obj.accountDate) ? obj.accountDate : item.accountDate
                item.accountPeople = (obj.accountPeople) ? obj.accountPeople : item.accountPeople
            }
        }
        return item
    })
    return newarray
}

const deleteItem = (array, item) => {
    const deleteItem = array.find(({it}) => ( item.idFrom ))
    const numItem = array.indexOf(deleteItem)
    return (array.slice(0, numItem)).concat(array.slice(numItem + 1))
}

export default (accountsList = [], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDACCOUNTTOLIST: return addItem(accountsList, payload)
        case EDITACCOUNTINLIST: return updateItem(accountsList, payload)
        case DELETEACCOUNTFROMLIST: return deleteItem(accountsList, payload)
        default: return accountsList
    }
}