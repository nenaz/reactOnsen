import { 
    ADDACCOUNTTOLIST,
    REMOVEACCOUNTROMLIST
} from '../js/consts'

const addItem = (array,item) => {
    let newarray = array.slice()
    return newarray.splice(newarray.length, 0, item)
}

const removeItem = (array, item) => {
    let numItem = array.indexOf(item)
    return (array.slice(0, numItem)).concat(array.slice(numItem + 1))
}

export default (accountsList = [], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDACCOUNTTOLIST: return addItem(accountsList, payload)
        case REMOVEACCOUNTROMLIST: return removeItem(accountsList, payload)
        default: return accountsList
    }
}