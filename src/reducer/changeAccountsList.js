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

export default (accountsList = [
    {
        name: 'Наличные',
        balance: 0.00,
        currency: 'RUB',
        pname: ''
    },
    {
        name: 'Тинькоф',
        balance: 64506.77,
        currency: 'RUB',
        pname: ''
    },
    {
        name: 'Сбер',
        balance: 3947.25,
        currency: 'RUB',
        pname: ''
    },
    {
        name: 'Открытие',
        balance: 28825.96,
        currency: 'RUB',
        pname: ''
    },
    {
        name: 'Номос',
        balance: 12402.94,
        currency: 'RUB',
        pname: ''
    },
    {
        name: 'Рокет',
        balance: 10000.00,
        currency: 'RUB',
        pname: ''
    }
    ], action) => {
    const { type, payload } = action
    switch (type) {
        case ADDACCOUNTTOLIST: return addItem(accountsList, payload)
        case REMOVEACCOUNTROMLIST: return removeItem(accountsList, payload)
        default: return accountsList
    }
}