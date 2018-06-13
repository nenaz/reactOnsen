import Requester from './requester'
import Utils from './utils'
import config from './config'
import _ from 'underscore'

class Sync {
    localObj = {}
    serverObj = {}
    testItems = ['Accounts', 'Operations', 'ChartData', 'News']
    localItems = ['localAccounts', 'localItems', 'localDataForChart', 'localWhatsNew']
    initialize() {
        // this.req = new Requester()
        // this.allData = this.getAllDataFromServer()
    }

    startSync() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAllDataFromServer(),
                this.getAllDataFromLocalstorage()
            ]).then(values => {
                const serverData = values[0]
                const localData = values[1]
                this.backupDataBeforeSync(localData)
                this.generateStatSync(serverData)
                this.arrayToObject(this.serverObj, serverData)
                this.arrayToObject(this.localObj, localData)
                this.syncLocalAndServerData()
                resolve(this.saveNewDataToBase())
                // const obj = _.extend(values[0], values[1])
            })
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
        const testItems = this.testItems
        for (let i = 0; i < testItems.length; i += 1) {
            glObj[testItems[i]] = arr[i] || [];
        }
    }

    syncLocalAndServerData() {
        const testItems = this.testItems
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
    }

    saveNewDataToBase() {
        const testItems = this.testItems
        const localItems = this.localItems
        for (let i = 0; i < testItems.length; i += 1) {
            localStorage.setItem(localItems[i], JSON.stringify(this.localObj[testItems[i]]))
        }
        return true;
    }

    backupDataBeforeSync(data) {
        localStorage.setItem('localBackup', JSON.stringify(data))
    }

    generateStatSync(data) {
        const stat = {
            statAccount: data[0].length,
            statOperations: data[1].length,
        }
        localStorage.setItem('localStat', JSON.stringify(stat))
    }
}

export default Sync