<script>
const g_addressProvince='';     //省
const g_addressCity='';         //市
const g_address=['',''];       //城市地址（省+市）
const g_addressString='';
const g_targetPoint=[];        //经纬度

function setAddressProvince(province) {
    this.g_addressProvince = province;
}
function setAddressCity(city) {
    this.g_addressCity = city;
}
function setAddress(address) {
    this.g_address = address;
}
function setTargetPoint(targetPoint) {
    this.g_targetPoint = targetPoint;
}
function addressToString() {
    this.g_addressString = this.g_addressProvince+"省"+this.g_addressCity+"市";
    
}

export default {
    g_addressProvince,
    g_addressCity,
    g_address,
    g_targetPoint,
    g_addressString,

    setAddressProvince,
    setAddressCity,
    setAddress,
    setTargetPoint,
    addressToString,
}
</script>