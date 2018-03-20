import {
    SERVERURL,
    SERVERURLLOCAL,
    DEVELOP
} from './consts'

export default class Requester {
    options = {}

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
                this.options.develop = DEVELOP
                this.options.connectDB = false
                this.options.urlConnectDB = (DEVELOP) ? SERVERURLLOCAL : SERVERURL
                this.setLocal('localOptions', this.options, true)
            }
        } else {
            console.log('error')
        }
    }

    request(name, object) {
        let lName = ''
        if (this.options.connectDB) {
            switch (name) {
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
            this.send(lName, 'POST', object)
        } else {
            switch (name) {
                case 'updateItem': lName = 'localAccounts'
                    this.updateItem(lName, object)
                    break;
            
                default: lName = 'localItems'
                    this.setLocal(lName, object)
                    break;
            }
        }
    }

    send(name, type, params) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, SERVERURL + name, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
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

    setLocal(name, value, initialize) {
        console.log('setLocal = ' + name)
        let arr
        if (initialize) {
            arr = value
        } else {
            arr = this.getLocal(name)
            arr.push(value)
        }
        localStorage.setItem(name, JSON.stringify(arr))
    }

    getLocal(name) {
        console.log('getLocal = ' + name)
        return JSON.parse(localStorage.getItem(name))
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