<script>
const g_cityName='gggggggg';           //天气城市名
const g_targetPoint=[];        //经纬度

function setCityName(cityName) {
    console.log(this.g_cityName,'yae',cityName)
    this.g_cityName = cityName;
}
function setTargetPoint(targetPoint) {
    this.g_targetPoint = targetPoint;
}

export default {
    g_cityName,
    g_targetPoint,
    setCityName,
    setTargetPoint,
}
</script>