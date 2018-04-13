import {
    SERVERURL,
    SERVERURLLOCAL,
    DEVELOP
} from './consts'

export default class Requester {
    initialize(value) {
        if (localStorage) {
            if (!localStorage.hasOwnProperty('localUserName')) {
                this.setLocal('localUserName', [], true)
            }
            if (!localStorage.hasOwnProperty('localAccounts')) {
                this.setLocal('localAccounts', [], true)
            }
            if (!localStorage.hasOwnProperty('localItems')) {
                this.setLocal('localItems', [], true)
            }
            if (!localStorage.hasOwnProperty('localItemsStatistic')) {
                this.setLocal('localItemsStatistic', [], true)
            }
            
            if (!localStorage.hasOwnProperty('localOptions')) {
                this.options = {
                    develop: DEVELOP,
                    connectDB: true,
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
                    lName = 'getLastFive'
                    break;
                case 'getAccounts':
                    lName = 'getAccounts'
                    break;
                case 'updateItem':
                    lName = 'updateAccountAmount'
                    break;
                default: lName = 'addOperation'
                    break;
            }
            return this.send(lName, 'POST', object)
        } else {
            switch (name) {
                case 'updateAccounts': lName = 'localAccounts'
                    this.setLocal(lName, object)
                    break;
                case 'addAccount': lName = 'localAccounts'
                    this.setLocal(lName, object)
                    break;
                case 'updateItem': lName = 'localAccounts'
                    this.updateItem(lName, object)
                    break;
                case 'getOperations':
                    lName = 'localItems'
                    return this.getLocal(lName, object)
                case 'getAccounts':
                    lName = 'localAccounts'
                    return this.getLocal(lName, object)
                default: lName = 'localItems'
                    this.setLocal(lName, object)
                    break;
            }
        }
    }

    send(name, type, params) {
        const webToken = this.getWebToken()
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, SERVERURL + name, true);
            // xhr.open(type, SERVERURLLOCAL + name, true);
            xhr.onprogress = (event) => {}
            xhr.setRequestHeader('Content-Type', 'application/json');
            if (name !== 'newUser' && name !== 'authUser') {
                
                xhr.setRequestHeader('Authorization', webToken);
            }
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
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send(JSON.stringify(params));
        });
    }

    setLocal(name, value, nameField, initialize) {
        console.log('setLocal = ' + name)
        let arr
        if (initialize) {
            arr = value
            localStorage.setItem(name, JSON.stringify(arr))
        } else {
            this.getLocal(name).then((arr) => {
                if (nameField) {
                    arr[nameField] = value
                    if (nameField === 'token') {
                        this.webToken = value
                    }
                } else {
                    arr.push(value)
                }
                localStorage.setItem(name, JSON.stringify(arr))
            })
        }
    }

    getLocal(name) {
        return new Promise(function (resolve, reject) {
            console.log('getLocal = ' + name)
            // return JSON.parse(localStorage.getItem(name))
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
        const arr = this.getLocal(optionsName)
        arr[name] = value
        localStorage.setItem(optionsName, JSON.stringify(arr))
    }
}