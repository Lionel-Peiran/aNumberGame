//electron组件bug修复
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf(' electron/') > -1) {
    const { dialog } = require('electron').remote;
    alert = function (str) {
        var options = {
            type: 'info',
            buttons: ["确定"],
            defaultId: 0,
            cancelId: 0,
            detail: str,
            message: ''
        }
        dialog.showMessageBoxSync(null, options)
    }
    confirm = function (str) {
        var options = {
            type: 'question',
            buttons: ["确认", "取消"],
            defaultId: 0,
            cancelId: 1,
            detail: '',
            message: str
        }
        var flag = dialog.showMessageBoxSync(null, options);
        if (flag == 0) {
            return true;
        } else {
            return false;
        }
    }
}

function copyObject(a) {
    var { ...b } = a;
    return b;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dice() {
    getRndInteger(0, 6);
}