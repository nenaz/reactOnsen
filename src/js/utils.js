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
            name: '40702840500001015401',
            balance: '0 руб.',
            backgroundColor: 'yellow',
            textColor: '#250606',
            textSize: '8.5px',
            borderColor: '#939687',
            iconEnable: false,
            linkEnable: false,
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
    // debugger
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

var utils = {
    selectButtonsParams,
    selectSectionsParams,
    selectAnimationClassForPage
}

export default utils