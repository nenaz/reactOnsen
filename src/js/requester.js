import { SERVERURL } from './consts'

export default class Requester {
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

    initialize() {
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
        } else {
            console.log('error')
        }
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

    getItem(name, id) {
        const arr = this.getLocal(name)

    }
}