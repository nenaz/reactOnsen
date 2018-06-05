import Requester from './requester'
import Utils from './utils'
import config from './config'
import _ from 'underscore'

export default class Sync {
    localObj = {}
    serverObj = {}
    initialize() {
        // this.req = new Requester()
        // this.allData = this.getAllDataFromServer()
    }

    startSync() {
        Promise.all([
            this.getAllDataFromServer(),
            this.getAllDataFromLocalstorage()
        ]).then(values => {
            const serverData = values[0]
            const localData = values[1]
            this.arrayToObject(this.serverObj, serverData)
            this.arrayToObject(this.localObj, localData)
            this.syncLocalAndServerData()
            // const obj = _.extend(values[0], values[1])
        })
    }

    getAllDataFromServer() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAccounts(true),
                this.getOperations(true),
                // this.getDataForChart(),
                // this.getNew(),
            ]).then(values => {
                resolve(values)
            })
        })
    }

    getAllDataFromLocalstorage() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAccounts(),
                this.getOperations(),
                // this.getDataForChart(),
                // this.getNew(),
            ]).then(values => {
                resolve(values)
            })
        })
    }

    getAccounts(server) {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            if (server) {
                req.send('getAccounts', 'POST', {}).then(result => {
                    resolve(result)
                })
            } else {
                req.getLocal('localAccounts', {}).then(result => {
                    resolve(result)
                })
            }
        })
    }
 
    getOperations(server) {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            if (server) {
                req.send('getOperations', 'POST', {limit: 0}).then(result => {
                    resolve(result)
                })
            } else {
                req.getLocal('localItems', {}).then(result => {
                    resolve(result)
                })
            }
        })
    }

    getNew() {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            req.send('whatsnew', 'POST', {
                version: config.version,
            }).then(result => {
                resolve(result)
            })
        })
    }

    getDataForChart() {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            req.send('getOperLastMonth', 'POST', {
                nowMonthDate: Utils.nowDate(false, true)
            }).then(data => {
                // const tt = Utils.formatingDataForChart(data)
                resolve(data)
            })
        })
    }

    arrayToObject(glObj, arr) {
        const m = ['Accounts', 'Operations', 'ChartData', 'News']
        for (let i = 0; i < m.length; i += 1) {
            glObj[m[i]] = arr[i] || [];
        }
    }

    syncLocalAndServerData() {
        const testItems = ['Accounts', 'Operations', 'ChartData', 'News']
        for (let i = 0; i < testItems.length; i += 1) {
            let item = this.serverObj[testItems[i]]
            for (let j = 0; j < item.length; j += 1) {
                const find = this.localObj[testItems[i]].find((num) => {
                    return num._id === item[j]._id
                })
                if (find) {
                    _.extend(this.localObj[testItems[i]], item)
                } else {
                    this.localObj[testItems[i]].push(item[j])
                }
            }
        }
        console.log(this.localObj)
    }
}