export default class Requester {
    // constructor() {
        // this.xhr = new XMLHttpRequest()
    // }

    // send(url, type, params) {
    //     this.xhr.open(type, url, true);
    //     this.xhr.setRequestHeader('Content-Type', 'application/json');
        
    //     this.xhr.onreadystatechange = function () {
    //         if (this.readyState !== 4) return;
    //         console.log(this.responseText);
    //         return this.responseText
    //     }
    //     this.xhr.send(JSON.stringify(params))
    // }

    send(url, type, params) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
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
}