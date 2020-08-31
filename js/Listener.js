window.onload = function () {
    myChart.setOption(option);
    document.getElementById('show').innerHTML = document.getElementById("delay").value;
}

document.getElementById("start").onclick = function () {
    var Chart = new Echart();
    var temp = document.getElementById("data").value.split(/\s+/);
    console.log(temp);
    if (!check_data(temp)) {
        alert("您输入的数据有误，请保证您的输入仅包含数字，且数量大于1");
        //document.getElementById("data").value = "";
    }
    else {
        data = StringToFloat(temp);
        console.log(data);
        var choices = document.getElementsByName("sort_method");
        for (i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                running = confirm("您选择了" + choices[i].value + "，选择确认开始");
                delay = document.getElementById("delay").value;
                choice = i;
                break;
            }
        }
        if (running) {
            Chart.Sort(data, delay, choice);
        }
    }
}