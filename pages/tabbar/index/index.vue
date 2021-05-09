<template>
	<view class="home">
		<!-- 自定义导航栏组件 -->
		<navbar></navbar>
		<tab :list="tabList" @click="clickTab" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list :tab="tabList" @change="change" :activeIndex="activeIndex"></list>
		</view>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	// import navbar from '@/components/navbar/navbar.vue'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		computed: {
			...mapState([
				'is_edited',
				'userInfo'
			])
		},
		watch: {
			userInfo (newVal, oldVal) {
				this.getLabel()
			}
		},
		onLoad() {
			uni.$on('labelChange', (res) => {
				console.log('labelChange')
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		methods: {
			getLabel () {
				let params = {
					type: 'all'
				}
				if (this.is_edited) {
					params = {}
				}
				this.$api.get_label(params).then((res) => {
					const {data} = res.data
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})
			},
			clickTab ({data, index}) {
				if (index === this.activeIndex) {
					return
				}
				this.activeIndex = index
			},
			change (current) {
				this.tabIndex = current
				this.activeIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
