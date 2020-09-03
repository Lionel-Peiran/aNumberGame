//Echart 配置全局使用
var myChart = echarts.init(document.querySelector(".chart"));
const baseColor = 100;
const increase = 50;
var option = {
    legend: {
        orient: "vertical",
        left: "left"
    },
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',

    },
    series: [{
        type: "pie",
        data: [
            {
                value: 1,
                name: 1,
                selected: true
            },
            {
                value: 1,
                name: 2
            },
            {
                value: 1,
                name: 3
            },
            {
                value: 1,
                name: 4
            }
        ],
        label: {
            fontSize: 30
        },
        hoverAnimation: false,
        selectedMode: "single",
        selectedOffset: 30,
        silent: true,
        animationEasingUpdate: "backOut"
    }]
}



myChart.setOption(option);

//Echart类定义
class Echart {
    //目前js对于私有属性的支持还不到位，暂时使用python命名规则
    //以 _ 开始的属性均为私有属性
    constructor() {
        this._delay = 1000;//默认值
        this._delayCount = 1;//动画延时数量，用于规划任务序列完成动画
        this._databox = new Databox();
    }
    //初始化图表
    initChart(gamerNumber, delay) {
        this._delay = delay;
        this._databox.init(gamerNumber);
        option.animationDurationUpdate = delay * 0.8;
        var defaultObj = {
            name: 0,
            value: 1
        }
        //导入数据
        option.series[0].data = [];
        for (var i = 1; i <= gamerNumber; i++) {
            var obj = defaultObj;
            obj.name = i;
            option.series[0].data.push(copyObject(obj));
        }
        //检查导入结果
        myChart.setOption(option);
        // console.log(this._databox.data);
        // console.log(this._databox.Number);
        // console.log(this._databox.curGamer);
    }
    //更新图表
    updateChart(temp) {
        setTimeout(() => {
            myChart.setOption(temp);
        }, this._delay * this._delayCount++);
    }
    showCurrentMessage(curGamer, dice) {
        setTimeout(() => {
            document.getElementById("current_person").innerHTML = curGamer;
            console.log(dice);
            document.getElementById("diceResult").src = "image/1.png";
        }, this._delayCount++ * this._delay);
    }
    showOrder(finalOrder) {
        setTimeout(() => {
            document.getElementById("data_out").innerHTML = "出列顺序：" + finalOrder;
        }, this._delay * this._delayCount++);
    }
    showARound(order) {
        for (var i = 0; i < order.length; i++) {
            var b = JSON.parse(JSON.stringify(option));
            b.series[0].data[order[i]].selected = true;
            this.updateChart(b);
        }
        return order[order.length - 1];
    }
    startGame() {
        document.getElementById("start").disabled = true;
        var finalOrder = [];
        while (this._databox.data.length > 1) {
            var arr = this._databox.data;
            var curGamer = this._databox.curGamer;
            var curDice = dice();
            this.showCurrentMessage(arr[curGamer], curDice);
            //  console.log(curDice);
            var order = this._databox.aGround(curDice);
            //console.log(order);
            var pos = this.showARound(order);
            console.log(option.series[0].data[pos].name);
            finalOrder.push(option.series[0].data[pos].name);
            option.series[0].data.splice(pos, 1);
            this.updateChart(copyObject(option));
            this.showOrder(copyArray(finalOrder));
        }
        setTimeout(() => {
            alert(this._databox.data[0] + "号是最终赢家！");
            document.getElementById("start").disabled = false;
        }, this._delay * this._delayCount);
    }
    //显示排序过程

}