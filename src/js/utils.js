import { LISTCATEGORY } from './consts'

const selectButtonsParams = (name) => {
    switch(name) {
        case 'AccountsButtonAdd': return {
            pname: 'AccountsButtonAdd',
            name: 'Добавить',
            amount: '0 руб.',
            backgroundColor: 'transparent',
            textColor: '#250606',
            // textSize: null,
            borderColor: '#939687',
            iconEnable: true,
            icon: 'ion-plus',
            linkEnable: true,
            link: 'addAccount',
            textSize: '9.5px',
        }
        case 'AccountButton': return {
            pname: 'AccountButton',
            backgroundColor: '#9a9a9a',
            textColor: '#fff',
            textSize: '9.5px',
            borderColor: '#939687',
            iconEnable: false,
            linkEnable: true,
            link: 'editAccount'
        }
        default: return {
            pname: 'default',
            name: 'Наличные',
            amount: '0 руб.',
            backgroundColor: '#808c50',
            textColor: '#fff',
            borderColor: '#939687',
            iconEnable: false,
            linkEnable: true,
            link: 'editAccount',
            textSize: '9.5px',
        }

    }
}

const selectSectionsParams = (name) => {
    switch(name) {
        case 'Balance': return {
            title: "Баланс",
            amount: true,
            defaultButtons: false,
        }
        case 'Chart': return {
            title: "Расходы",
            chart: true,
            defaultButtons: false,
        }
        case 'LastOperations': return {
            title: "Последние операции",
            last: true,
            defaultButtons: false,
        }
        default: return {
            title: "Список счетов",
            defaultButtons: true,
            defautlButtonsCount: 2,
            defaultButtonsArr: ['', 'AccountsButtonAdd']
        }
    }
}

const selectAnimationClassForPage = (param) => {
    switch(param) {
        case 'backMainFromNewAccount': return {
            'enter': 'exp-enter-left-to-right',
            'enterActive': 'exp-enter-active-left-to-right',
            'leave': 'exp-leave-left-to-right',
            'leaveActive': 'exp-leave-active-left-to-right',
        }
        default: return {
            'enter': 'exp-enter-right-to-left',
            'enterActive': 'exp-enter-active-right-to-left',
            'leave': 'exp-leave-right-to-left',
            'leaveActive': 'exp-leave-active-right-to-left',
        }
    }
}

const addAccountFindError = (name) => {
    return {
        errorMes: '',
        errorCode: 0
    }
}

const formatDate = (str) => {
    return ('0' + str).slice(-2)
}

const nowDate = (returnObject, returnStartMonth, returnISO) => {
    let ddd = new Date()
    const year = ddd.getUTCFullYear(),
        month = formatDate(ddd.getMonth() + 1),
        day = formatDate(ddd.getDate()),
        hour = formatDate(ddd.getHours()),
        min = formatDate(ddd.getMinutes()),
        sec = formatDate(ddd.getSeconds())
    let date = ''
    if (returnObject) {
        date = {
            date: day + '.' + month + '.' + year,
            time: hour + ':' + min + ':' + sec,
            dateObj: ddd,
        }
    } else {
        date = day + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ':' + sec
    }
    if (returnStartMonth) {
        date = year + '-' + formatDate(ddd.getMonth()) + '-01T00:00:00.000Z'
    }
    if (returnISO) {
        date = ddd
    }
    return date
}

const convertTypeOperation = (value) => {
    switch (value) {
        case "1": return "+";
        case "-1": return "/";
        default: return "-";
    }
}

const getRandomId = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const deleteFirstSymbol = (value) => {
    return value.slice(1);
}

const createTopCategorys = (data) => {
    const arr = [];
    for(let i = 0; i < data.length; i += 1) {
        data[i].data.map((item) => {
            arr.push({
                value: `${data[i].value}-${item.value}`,
                count: item.count,
                title: item.title
            })
            return true;
        })
    }
    const newarr = arr.sort((a, b) => {
        return b.count - a.count;
    })
    return newarr.slice(0,4);
}

const dailyCounting = (data) => {
    let count = 0;
    const date = new Date()
    const nowDate = new Date(`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`)
    data.map(item => {
        if (item.data && item.data.dateObj) {
            count += (new Date(item.data.dateObj) > nowDate) ?
                item.amount * 1 : 0
        }
        return true
    })
    return count;
}

const findCateGoryNameOnId = (id) => {
    const ids = id.split('-')
    const row = LISTCATEGORY.find((item) => {
        return item.value === ids[0]*1
    })
    const col = row.data.find((item) => {
        return item.value === ids[1] * 1
    })
    return {
        title: row.title,
        subTitle: col.title,
    }
}

const findAccountDataOnId = (id) => {
    const ids = id.split('-')
    const row = LISTCATEGORY.find((item) => {
        return item.value === ids[0] * 1
    })
    const col = row.data.find((item) => {
        return item.value === ids[1] * 1
    })
    return {
        title: row.title,
        subTitle: col.title,
    }
}

const finishDataFormatingForChart = (data) => {
    const newData = data.map(item => {
        const res = LISTCATEGORY.find(row => {
            return row.value === item.id
        })
        item.label = res.title
        item.catId = item.id
        item.id = res.title
        return item
    })
    return newData
}

const qrProcessing = () => {
    return new Promise(function (resolve, reject) {
        window.cordova.plugins.barcodeScanner.scan(
            function (result) {
                // alert("We got a barcode\n" +
                //     "Result: " + result.text + "\n" +
                //     "Format: " + result.format + "\n" +
                //     "Cancelled: " + result.cancelled);
                resolve(result)
            },
            function (error) {
                // alert("Scanning failed: " + error);
                reject(error)
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        )
    })
}

const utils = {
    selectButtonsParams,
    selectSectionsParams,
    selectAnimationClassForPage,
    addAccountFindError,
    nowDate,
    convertTypeOperation,
    getRandomId,
    deleteFirstSymbol,
    createTopCategorys,
    dailyCounting,
    findCateGoryNameOnId,
    findAccountDataOnId,
    finishDataFormatingForChart,
    qrProcessing,
}

export default utils