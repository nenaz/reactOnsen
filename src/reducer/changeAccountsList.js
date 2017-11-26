import { 
    ADDACCOUNTTOLIST,
    REMOVEACCOUNTROMLIST
} from '../js/consts'

const addItem = (array,item) => {
    let newarray = array.slice()
    newarray.push(item)
    return newarray
}

const removeItem = (array, item) => {
    let numItem = array.indexOf(item)
    return (array.slice(0, numItem)).concat(array.slice(numItem + 1))
}

export default (accountsList = [{
    name: 'Наличные',
    balance: 0.00,
    currency: 'RUB',
    pname: ''
}], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDACCOUNTTOLIST: return addItem(accountsList, payload)
        case REMOVEACCOUNTROMLIST: return removeItem(accountsList, payload)
        default: return accountsList
    }
}