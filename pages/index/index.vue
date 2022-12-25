<template>
	<view>
		<u-swiper :list="swipeList"></u-swiper>
		<view class="tabConatainer"><u-tabs :list="tabsList" current="current" @change="changeCurrent"></u-tabs></view>
		<u-grid :border="false" col="2">
			<u-grid-item class="goods-item" v-for="item in goods">
				<image class="image" src="https://oss.shop.eduwork.cn/product/2020-0820-5f3e08d935cc4.png"></image>
				<view class="title">{{ item.title }}</view>
				<view class="bottom">
					<view class="price">¥ {{ item.price }}</view>
					<view class="sals">销量：{{ item.sales }}</view>
				</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
// import store from '../../store/index.js';
// http接口API集中管理引入部分
export default {
	data() {
		return {
			swipeList: [
				'https://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe85ae3fd.png',
				'https://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe85ae3fd.png',
				'https://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe85ae3fd.png'
			],
			tabsList: [
				{
					name: '默认'
				},
				{
					name: '销量'
					// badge: {
					// 	value: 5
					// }
				},
				{
					name: '推荐'
				},
				{
					name: '最新'
					// badge: {
					// 	isDot: true
					// }
				}
			],
			current: 0,
			goods: [],
			slides: [],
			page: 1
		};
	},
	onLoad() {
		this.loadHomeData();
	},
	// computed: {
	// 	username() {
	// 		return store.state.username;
	// 		// return this.$store.state.username;
	// 	}
	// },
	methods: {
		async loadHomeData() {
			const params = {
				page: this.page
			};
			if (this.current == 1) {
				params.sales = 1;
			}
			if (this.current == 2) {
				params.recommend = 1;
			}
			if (this.current == 3) {
				params.new = 1;
			}
			const res = await uni.$u.http.get('/api/index', { custom: { auth: false } }, params);
			this.goods = this.goods.concat(res.goods.data);
			this.slides = res.slides;
		},
		// changeName() {
		// 	// store.commit('changeName', '张三');
		// 	store.dispatch('addChangeAction', 'lisi').then(() => {
		// 		console.log('改变啦------');
		// 	});
		// },
		changeCurrent(index) {
			this.current = index;
			this.goods = [];
			this.page = 1;
			this.loadHomeData();
		}
	},
	onReachBottom() {
		//加载更多
		this.page += 1;
		this.loadHomeData();
	}
};
</script>

<style lang="scss">
.tabConatainer {
	display: flex;
	justify-content: center;
	margin-top: 30rpx;
}
.goods-item {
	padding: 10rpx;
	.image {
		width: 100%;
		height: 300;
	}
	.title {
		font-size: 32rpx;
	}
	.bottom {
		display: flex;
		.price {
			color: red;
		}
		.sals {
			padding-left: 20rpx;
			color: #888;
		}
	}
}
</style>
