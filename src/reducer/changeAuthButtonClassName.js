import { CHANGEAUTHBUTTONCLASSNAME } from "../js/consts"

export default (className = '', action) => {
    const { type, payload } = action
    switch (type) {
        case CHANGEAUTHBUTTONCLASSNAME: return payload
        default: return className
    }
}