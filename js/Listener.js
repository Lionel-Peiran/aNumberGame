window.onload = function () {
    myChart.setOption(option);
    document.getElementById('show').innerHTML = document.getElementById("delay").value;
}

window.addEventListener("resize", () => {
    myChart.resize();
})

document.getElementById("start").onclick = function () {
    var Chart = new Echart();
    var Gamer = document.getElementById('gamerNumber').value;
    if (Gamer >= 2) {
        var delay = document.getElementById('delay').value;
        if (confirm("游戏人数" + Gamer + "，点击确认开始模拟")) {
            Chart.initChart(Gamer, delay);
            Chart.startGame();
        }
    }
    else {
        alert("开始游戏的人数至少为2");
        document.getElementById('gamerNumber').value = 2;
    }

}