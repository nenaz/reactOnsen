export default class GetCoord {
    getPositions() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log(pos);
                resolve(pos);
            }, function (error) {
                console.log(error)
                reject(error)
            });
        })
    }

    initialize() {
        console.log(true)
    }
}