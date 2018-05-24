import {
    SERVERURL,
    SERVERURLLOCAL,
    DEVELOP
} from './consts'
import config from './config'

export default class Requester {
    initialize(value) {
        if (localStorage) {
            if (!localStorage.hasOwnProperty('localUserName')) {
                this.setLocal('localUserName', '', null, true)
            }
            if (!localStorage.hasOwnProperty('localAccounts')) {
                this.setLocal('localAccounts', [], null, true)
            }
            if (!localStorage.hasOwnProperty('localItems')) {
                this.setLocal('localItems', [], null, true)
            }
            if (!localStorage.hasOwnProperty('localItemsStatistic')) {
                this.setLocal('localItemsStatistic', [], null, true)
            }
            if (!localStorage.hasOwnProperty('localDataForChart')) {
                this.setLocal('localDataForChart', [], null, true)
            }
            if (!localStorage.hasOwnProperty('localWhatsNew')) {
                this.setLocal('localWhatsNew', [], null, true)
            }
            if (!localStorage.hasOwnProperty('localOptions')) {
                this.options = {
                    develop: DEVELOP,
                    connectDB: true,
                    usePassCode: false,
                    urlConnectDB: (DEVELOP) ? SERVERURLLOCAL : SERVERURL,
                }
                this.setLocal('localOptions', this.options, null, true)
            }
        } else {
            console.log('error')
        }
    }

    request(name, object) {
        let lName = ''
        const connectDB = JSON.parse(localStorage.getItem('localOptions')).connectDB
        if (connectDB) {
            switch (name) {
                case 'updateAccounts':
                    // lName = 'updateAccountAmount'
                    lName = 'editAccount'
                    break;
                case 'addAccount':
                    lName = 'addAccount'
                    break;
                case 'getOperations':
                    lName = 'getOperations'
                    break;
                case 'getAccounts':
                    lName = 'getAccounts'
                    break;
                case 'updateItem':
                    // lName = 'updateAccountAmount'
                    lName = 'editAccount'
                    break;
                case 'transfer':
                    lName = 'transfer'
                    break;
                case 'whatsnew':
                    lName = 'whatsnew'
                    break;
                case 'setShowNews':
                    lName = 'setShowNews'
                    break;
                case 'deleteAccount':
                    lName = 'deleteAccount'
                    break;
                case 'getDataForChart':
                    lName = 'getOperLastMonth'
                    break;
                case 'setPass':
                    lName = 'setPass'
                    break;
                default: lName = 'addOperation'
                    break;
            }
            return this.send(lName, 'POST', object)
        } else {
            switch (name) {
                case 'updateAccounts':
                    lName = 'localAccounts'
                    // this.setLocal(lName, object)
                    this.setLocal2(lName, object)
                    break;
                case 'addAccount':
                    lName = 'localAccounts'
                    // this.setLocal(lName, object)
                    this.setLocal2(lName, object)
                    break;
                case 'updateItem':
                    lName = 'localAccounts'
                    this.updateItem(lName, object)
                    break;
                case 'getOperations':
                    lName = 'localItems'
                    return this.getLocal(lName, object)
                case 'getAccounts':
                    lName = 'localAccounts'
                    return this.getLocal(lName, object)
                case 'getDataForChart':
                    lName = 'localDataForChart'
                    return this.getLocal(lName, object)
                case 'whatsnew':
                    lName = 'localWhatsNew'
                    return this.getLocal(lName, object)
                case 'deleteAccount':
                    lName = 'localAccounts'
                    return this.setLocal(lName, object)
                default: lName = 'localItems'
                    this.setLocal(lName, object)
                    break;
            }
        }
    }

    send(name, type, params) {
        const webToken = this.getWebToken()
        const serverUrl = config.serverUrl
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, serverUrl + name, true);
            xhr.onprogress = (event) => {}
            xhr.setRequestHeader('Content-Type', 'application/json');
            if (name !== 'newUser' && name !== 'authUser' && name !== 'setPass') {
                
                xhr.setRequestHeader('Authorization', webToken);
            }
            xhr.timeout = 15000;
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(JSON.parse(this.response));
                } else if (this.status === 401) {
                    var obj = {
                        result: false,
                        statusText:  this.statusText,
                        status: this.status
                    }
                    resolve(JSON.stringify(obj));
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.ontimeout = function () {
                reject(new Error("Network Error"));
            }
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send(JSON.stringify(params));
        });
    }

    setLocal2(branch, value, nameField) {
        this.getLocal(branch).then((arr) => {
            if (arr.length !== undefined) {
                if (arr.length) {
                    let num = -1
                    let count = 0
                    arr.find((item, i) => {
                        num = i
                        return item._id === value.idFrom
                    })
                    // for (const field in value) {
                    //     arr[num][field] = value[field]
                    // }
                    arr[num] = value
                } else {
                    arr.push(value)
                }
            } else if (typeof arr === 'object') {
                arr[nameField] = value;
            } else {
                arr = value
            }
            localStorage.setItem(branch, JSON.stringify(arr))
        })
    }

    setLocal(name, value, nameField, initialize) {
        console.log('setLocal = ' + name)
        let arr
        if (initialize) {
            arr = value
            localStorage.setItem(name, JSON.stringify(arr))
        } else {
            this.getLocal(name).then((arr) => {
                const type = typeof(arr)
                switch(type) {
                    case 'object':
                        if (nameField) {
                            arr[nameField] = value
                            // if (nameField === 'webToken') {
                            //     this.webToken = value
                            // }
                        }
                        localStorage.setItem(name, JSON.stringify(arr))
                        break
                    case 'array': arr.push(value)
                        localStorage.setItem(name, JSON.stringify(arr))
                        break
                    default: localStorage.setItem(name, JSON.stringify(value))
                }
            })
        }
    }

    getLocal(name) {
        return new Promise(function (resolve, reject) {
            console.log('getLocal = ' + name)
            resolve(JSON.parse(localStorage.getItem(name)));
        })
    }

    getWebToken() {
        return JSON.parse(localStorage.getItem('localOptions')).webToken
    }

    updateItem(name, value) {
        const arr = this.getLocal(name)
        const one = arr.map((item, count) => {
            if (item._id === value._id) {
                for(let key in item) {
                    if (value[key]) {
                        item[key] = value[key]
                    }
                }
            }
            return item
        })
        localStorage.setItem(name, JSON.stringify(one))
    }

    updateOption(name, value) {
        const optionsName = 'localOptions'
        this.getLocal(optionsName).then(arr => {
            arr[name] = value
            localStorage.setItem(optionsName, JSON.stringify(arr))
        })
    }
}