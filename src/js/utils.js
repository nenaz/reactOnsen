const selectButtonsParams = (name) => {
    switch(name) {
        case 'AccountsButtonAdd': return {
            pname: 'AccountsButtonAdd',
            name: 'Добавить',
            balance: '0 руб.',
            backgroundColor: 'transparent',
            textColor: '#250606',
            textSize: null,
            borderColor: '#939687',
            iconEnable: true,
            icon: 'ion-plus',
            linkEnable: true,
            link: 'addAccount'
        }
        case 'AccountButton': return {
            pname: 'AccountButton',
            backgroundColor: 'yellow',
            textColor: '#250606',
            textSize: '8.5px',
            borderColor: '#939687',
            iconEnable: false,
            linkEnable: true,
            link: 'editAccount'
        }
        default: return {
            pname: 'default',
            name: 'Наличные',
            balance: '0 руб.',
            backgroundColor: '#939687',
            textColor: 'white',
            borderColor: '#939687',
            iconEnable: false,
            linkEnable: false,
        }

    }
}

const selectSectionsParams = (name) => {
    switch(name) {
        case 'Balance': return {
            title: "Баланс",
            balance: true,
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

const nowDate = (returnObject) => {
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
            time: hour + ':' + min + ':' + sec
        }
    } else {
        date = day + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ':' + sec
    }
    return date
}

const convertTypeOperation = (value) => {
    switch (value) {
        case "1": return "+";
        case "-1": return "";
        default: return "-";
    }
}

var utils = {
    selectButtonsParams,
    selectSectionsParams,
    selectAnimationClassForPage,
    addAccountFindError,
    nowDate,
    convertTypeOperation
}

export default utils