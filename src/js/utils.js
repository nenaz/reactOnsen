const selectButtonsParams = (name) => {
    switch(name) {
        case 'AccountsButtonAdd': return {
            name: 'Добавить',
            balance: '0 руб.',
            backgroundColor: 'transparent',
            icon: '',
            textColor: '#250606',
            textSize: null,
            borderColor: '#939687'
        }
        case 'AccountButton': return {
            name: '40702840500001015401',
            balance: '0 руб.',
            backgroundColor: 'yellow',
            icon: '',
            textColor: '#250606',
            textSize: '8.5px',
            borderColor: '#939687'
        }
        default: return {
            name: 'Наличные',
            balance: '0 руб.',
            backgroundColor: '#939687',
            icon:'',
            textColor: 'white',
            borderColor: '#939687'
        }

    }
}

var utils = {
    selectButtonsParams
}

export default utils