import { CHANGECATEGORYSTATISTIC, LISTCATEGORY } from '../js/consts';

const changeTopOperations = (arr, id) => {
    const newarr = arr.slice()
    const itemsId = id.join('-')
    const updateItem = newarr.each((item) => {
        if (item.value === itemsId[0]) {
            return item.data.find((one) => {
                return one.value === itemsId[1]
            })
        }
    })
    return updateItem
}

export default (topOperations = LISTCATEGORY, action) => {
    const {type, payload} = action
    switch (type) {
        case CHANGECATEGORYSTATISTIC: return changeTopOperations(topOperations, payload)
        default: return topOperations
    }
}