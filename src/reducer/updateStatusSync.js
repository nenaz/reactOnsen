import { UPDATESTATUSSYNC } from '../js/consts'

export default (obj = {}, action) => {
    const { type, payload } = action
    switch (type) {
        case UPDATESTATUSSYNC: return payload
        default: return obj
    }
}