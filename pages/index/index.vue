<template>
	<view>
		<view @click="loadHomeData">首页</view>
		<view @click="changeName">用户名：{{ username }}</view>
	</view>
</template>

<script>
import store from '../../store/index.js';
// http接口API集中管理引入部分
export default {
	data() {
		return {};
	},
	onLoad() {
		// get请求
	},
	computed: {
		username() {
			return store.state.username;
			// return this.$store.state.username;
		}
	},
	methods: {
		loadHomeData() {
			uni.$u.http.get('/api/index', { custom: { auth: false } }).then(res => {
				console.log('=======' + res.links[0].id);
			});
		},
		changeName() {
			// store.commit('changeName', '张三');
			store.dispatch('addChangeAction', 'lisi').then(() => {
				console.log('改变啦------');
			});
		}
	}
};
</script>

<style></style>
