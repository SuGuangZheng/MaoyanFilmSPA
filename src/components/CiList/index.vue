<template>
  <div class="cinema_body">
    <loading v-if="isLoading"></loading>
    <scroller v-else>
    <ul>
      <!-- <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q">
            <span class="price">22.9</span> 元起
          </span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li> -->
      <li v-for="item in cinemaList" :key="item.id">
        <div>
          <span>{{item.nm}}</span>
          <span class="q">
            <span class="price">{{item.sellPrice}}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div v-for="(num,key) in item.tag" v-show="num === 1" 
          :key="key" :class="key|classCard">
            {{key|formatCard}}
            </div>
        </div>
      </li>
    </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data(){
    return {
      cinemaList:[],
      isLoading:true,
      prevCity: -1,
    }
  },
  activated:function(){
    var cityId = this.$store.state.city.id;
    // 城市没改变时不发送请求，
    // 因为data中初始prevCity是-1，而cityId不可能是负数，保证了初次加载页面时能够正常发送请求
    if (cityId === this.prevCity) {
      return;
    }
    this.isLoading = true;
    // 延吉是168
    this.axios.get("/api/cinemaList?cityId="+cityId).then((res)=>{
      var msg = res.data.msg;
      if(msg === "ok"){
        this.cinemaList = res.data.data.cinemas;
        this.isLoading = false;
        this.prevCity = cityId;
      }
    });
  },
  filters:{
    formatCard(key){
      var card = [{key:"allowRefund",value:"退票"},
      {key:"endorse",value:"背签"},
     {key:"snack",value:"小吃"},
     {key:"sell",value:"在售"},
      ];
      for(var i = 0;i<card.length;i++){
        if(card[i].key === key){
          return card[i].value;
        }
      };
      return "";
    },
    classCard(key){
      var card = [{key:"allowRefund",value:"or"},
      {key:"endorse",value:"or"},
     {key:"snack",value:"bl"},
     {key:"sell",value:"bl"},
      ];
      for(var i = 0;i<card.length;i++){
        if(card[i].key === key){
          return card[i].value;
        }
      };
      return "";
    }
  },

};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>