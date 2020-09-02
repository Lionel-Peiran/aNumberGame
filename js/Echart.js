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
        selectedOffset: 50,
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
        this._delayCount = 0;//动画延时数量，用于规划任务序列完成动画
        this._databox = [];
    }
    //初始化图表
    initChart(gamerNumber, delay) {
        this._delay = delay;
        this._databox.Data = cur_data;
        option.animationDurationUpdate = delay * 0.8;

        myChart.setOption(option);
    }
    //更新图表
    updateChart(cur_data) {
        option.xAxis[0].data = cur_data;
        option.series[0].data = cur_data;
        document.getElementById("data_out").innerHTML = "当前排列情况：" + cur_data;
        myChart.setOption(option);
    }

    //显示排序过程
    ShowProcess() {
        var SortSequence = this._databox.ChartData;
        var i = 0;//计数器
        document.getElementById("start").disabled = true;
        //js没有阻塞函数，因此使用排列任务表的方式完成动画
        for (i = 0; i < SortSequence.length; i++) {
            setTimeout(this.updateChart, this._delay * (i + 1.5), SortSequence[i]);
            console.log(this._delay * (i + 2));
        }
        setTimeout(function () {
            alert("排序完成！");
            document.getElementById("start").disabled = false;
            console.log("clear");
        }, (i + 1.5) * delay);
    }
    //跟随页面变动变化大小
}