import { SAVEDATAOFSCAN } from '../js/consts'

export default (obj = null, action) => {
    const { type, payload } = action
    switch (type) {
        case SAVEDATAOFSCAN: return payload
        default: return obj
    }
}