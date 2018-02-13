import { ACCOUNTTOEDIT } from '../js/consts'

export default (id = '', action) => {
    const { type, payload } = action
    switch (type) {
        case ACCOUNTTOEDIT: return payload
        default: return id
    }
}