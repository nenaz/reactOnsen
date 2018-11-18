// import {
//   SERVERURL,
//   SERVERURLLOCAL,
//   DEVELOP
// } from './consts'
import config from '../config';

const getWebToken = () => {
  return JSON.parse(localStorage.getItem('localOptions')).webToken;
}

export const Send = (name, params = {}, type = 'POST') => {
  const webToken = getWebToken();
  const serverUrl = config.serverUrl
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, serverUrl + name, true);
    xhr.onprogress = (event) => { }
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (name !== 'newUser' && name !== 'authUser' && name !== 'setPass') {

      xhr.setRequestHeader('Authorization', webToken);
    }
    xhr.timeout = 15000;
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else if (this.status === 401) {
        var obj = {
          result: false,
          statusText: this.statusText,
          status: this.status
        }
        resolve(obj);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.ontimeout = function () {
      var obj = {
        result: false,
        statusText: "Time out error",
        status: this.status || 504,
      }
      resolve(obj);
    }
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
    xhr.send(JSON.stringify(params));
  });
}
