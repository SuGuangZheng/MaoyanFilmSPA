<template>
	<div id="main">
		<Header title="张爽爽要看电影"></Header>
		<div id="content">
			<div class="movie_menu">
				<router-link to="city" tag="div" class="city_name">
					<span>{{$store.state.city.nm}}</span>
					<i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link to="nowPlaying" class="hot_item" tag="div">正在热映</router-link>
					<router-link to="commingSoon" class="hot_item" tag="div">即将上映</router-link>
				</div>
				<router-link tag="div" to="search" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<TabBar></TabBar>
		<router-view name="detail"></router-view>
	</div>
</template>

<script>
	import Header from "@/components/Header";
	import TabBar from "@/components/TabBar";
	import { messageBox } from "@/components/JS";
	export default {
		name: "Movie",
		components: {
			Header,
			TabBar
		},
		mounted() {
			setTimeout(() => {
				this.axios.get("/api/getLocation").then(res => {
					var msg = res.data.msg;
					if (msg === "ok") {
						var storageCityName = window.localStorage.getItem(
							"nowCityName"
						);

						var nm = res.data.data.nm;
						// var id = res.data.data.id;
						//定位为延边时返回内容无id，所以手动加上
						var id = nm === "延边朝鲜族自治州" ? 168 : res.data.data.id;
						console.log(nm, storageCityName);
						if (nm != storageCityName) {
							messageBox({
								title: "定位",
								content: nm,
								ok: "确定",
								cancel: "切换城市",
								// handleCancel() {},
								handleOk() {
									window.localStorage.setItem("nowCityName", nm);
									window.localStorage.setItem("nowCityId", id);
									window.location.reload();
									// this.$store.commit("city/CITY_INFO", { nm, id });
									// console.log(this);
								}
							});
						}
					}
				});
			}, 1000);
		}
	};
</script>

<style scoped>
	#content {
		flex: 1;
		overflow: auto;
		margin-bottom: 50px;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	#content .movie_menu {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		z-index: 10;
	}
	.movie_menu .city_name {
		margin-left: 20px;
		height: 100%;
		line-height: 45px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.movie_menu .city_name.router-link-active {
		color: #ef4238;
		border-bottom: 2px #ef4238 solid;
	}
	.movie_menu .hot_swtich {
		flex: 1;
		display: flex;
		height: 100%;
		line-height: 45px;
	}
	.movie_menu .hot_item {
		flex: 1;
		font-size: 15px;
		color: #666;
		width: 80px;
		text-align: center;
		margin: 0 12px;
		font-weight: 700;
	}
	/* .movie_menu .hot_item.active { */
	.movie_menu .hot_item.router-link-active {
		color: #ef4238;
		border-bottom: 2px #ef4238 solid;
	}
	.movie_menu .search_entry {
		margin-right: 20px;
		height: 100%;
		line-height: 45px;
	}
	.movie_menu .search_entry.router-link-active {
		color: #ef4238;
		border-bottom: 2px #ef4238 solid;
	}
	.movie_menu .search_entry i {
		font-size: 24px;
		color: red;
	}
</style>