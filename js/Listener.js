window.onload = function () {
    myChart.setOption(option);
    document.getElementById('show').innerHTML = document.getElementById("delay").value;
}

document.getElementById("start").onclick = function () {
    var Chart = new Echart();
    var Gamer = document.getElementById('gamerNumber').value;
    var delay = document.getElementById('delay').value;
    Chart.initChart(Gamer, delay);

}