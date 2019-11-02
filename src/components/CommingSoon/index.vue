<template>
  <div class="movie_body">
    <loading v-if="isLoading"></loading>
    <Scroller v-else :handleStartUpdating="handleStartUpdating" :handleEndTouch="handleEndTouch">
      <ul>
        <!-- <li>
						<div class="pic_show"><img src="/images/movie_1.jpg"></div>
						<div class="info_list">
							<h2>无名之辈</h2>
							<p><span class="person">17746</span> 人想看</p>
							<p>主演: 陈建斌,任素汐,潘斌龙</p>
							<p>2018-11-30上映</p>
						</div>
						<div class="btn_pre">
							预售
						</div>
        </li>-->
		<!-- 第一个li用于显示下拉更新中 -->
		<li class="pullDown" ref="loading">{{pullDownMsg}}</li>
        <li v-for="item in comingList" :key="item.id">
          <div class="pic_show">
            <img :src="item.img|setWH('120.180')" />
          </div>
          <div class="info_list">
            <h2>{{item.nm}}</h2>
            <img v-if="item.version" src="@/assets/maxs.png" alt />
            <p>
              <span class="person">{{item.wish}}</span> 人想看
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.rt}}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "CommingSoon",
  data() {
    return {
	  comingList: [],
	  updating: false,
    pullDownMsg:"",
    isLoading:true,
    prevCity: -1,
    };
  },
  methods:{
	  	handleToDetail() {
      console.log("dianji");
    },
    //下拉开始更新
    handleStartUpdating(pos){
      if (pos.y > 100) {
          this.$refs.loading.style.height = "25px";
          this.pullDownMsg = "拼命加载中...";
          this.updating = true;
        }
    },
    //松开，更新成功
    handleEndTouch(pos){
      console.log(pos);
        if (this.updating) {
          this.axios.get("/api/movieComingList?cityId=168").then(res => {
            var msg = res.data.msg;
            if (msg === "ok") {
              this.pullDownMsg = "更新成功了!!!";
              this.movieList = res.data.data.movieList;
              setTimeout(() => {
                this.pullDownMsg = "";
                this.$refs.loading.style.height = "0px";
              }, 1000);
              console.log("更新数据了");
            }
          }); //get结束
          this.updating = false;
        }
    },
  },
  activated() {
    var cityId = this.$store.state.city.id;
    // 城市没改变时不发送请求，
    // 因为data中初始prevCity是-1，而cityId不可能是负数，保证了初次加载页面时能够正常发送请求
    if (cityId === this.prevCity) {
      return;
    }
    this.isLoading = true;


    this.axios.get("/api/movieComingList?cityId="+cityId).then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.comingList = res.data.data.comingList;
        this.isLoading=false;
        this.prevCity = cityId;
      }
    });
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  width: 100px;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  border: none;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>