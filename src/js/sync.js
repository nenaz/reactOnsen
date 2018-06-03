import Requester from './requester'
import Utils from './utils'
import config from './config'
import _ from 'underscore'

export default class Sync {
    initialize() {
        this.req = new Requester()
        // this.allData = this.getAllDataFromServer()
    }

    startSync() {
        Promise.all([
            this.getAllDataFromServer(),
            this.getAllDataFromLocalstorage()
        ]).then(values => {
            const obj = _.extend(values[1], values[0])
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
}