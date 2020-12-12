const currentPosition = {latitude:'gg'};
function getCurrentPosition(){
    //定位数据获取成功响应
    var onSuccess = function(position) {
        currentPosition.latitude = position.coords.latitude;
        currentPosition.longitude = position.coords.longitude;
        // alert(currentPosition);
        // alert('纬度: '          + position.coords.latitude          + '\n' +
        //       '经度: '         + position.coords.longitude         + '\n' //+
        //     //   '海拔: '          + position.coords.altitude          + '\n' +
        //     //   '水平精度: '          + position.coords.accuracy          + '\n' +
        //     //   '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
        //     //   '方向: '           + position.coords.heading           + '\n' +
        //     //   '速度: '             + position.coords.speed             + '\n' +
        //     //   '时间戳: '         + position.timestamp                + '\n'
        //       );
    };

    //定位数据获取失败响应
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    //开始获取定位数据
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
export {
    getCurrentPosition,currentPosition
}