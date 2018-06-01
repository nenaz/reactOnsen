import Requester from './requester'
import Utils from './utils'
import config from './config'

export default class Sync {
    initialize() {
        this.req = new Requester()
        // this.allData = this.getAllDataFromServer()
    }

    getAllDataFromServer() {
        Promise.all([
            this.getAccounts(),
            this.getOperations(),
            this.getDataForChart(),
            this.getNew(),
        ]).then(values => {
            console.log('test')
        })
    }

    getOperations() {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            req.request('getOperations', {limit: 0}, true).then(result => {
                resolve(result)
            })
        })
    }

    getAccounts() {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            req.request('getAccounts', {}, true).then(result => {
                resolve(result)
            })
        })
    }

    getNew() {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            req.request('whatsnew', {
                version: config.version,
            }, true).then(result => {
                resolve(result)
            })
        })
    }

    getDataForChart() {
        const req = new Requester()
        return new Promise((resolve, reject) => {
            req.request('getDataForChart', {
                nowMonthDate: Utils.nowDate(false, true)
            }, true).then(data => {
                // const tt = Utils.formatingDataForChart(data)
                resolve(data)
            })
        })
    }
}