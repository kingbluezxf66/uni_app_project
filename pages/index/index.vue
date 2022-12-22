<template>
	<view @click="loadHomeData">首页</view>
</template>

<script>
// http接口API集中管理引入部分
export default {
	data() {
		return {};
	},
	onLoad() {
		// get请求
	},
	methods: {
		loadHomeData() {
			uni.$u.http.get('/api/index', { custom: { auth: false } }).then(res => {
				console.log('=======' + res.links[0].id);
			});
		}
	}
};
</script>

<style></style>
