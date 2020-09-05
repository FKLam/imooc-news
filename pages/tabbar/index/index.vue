<template>
	<view class="home">
		<!-- 自定义导航栏组件 -->
		<navbar></navbar>
		<tab :list="tabList" @click="clickTab"></tab>
		<list-scroll>
			<list-card v-for="(item, index) in 5" :key="index">
				
			</list-card>
		</list-scroll>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	// import navbar from '@/components/navbar/navbar.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel () {
				this.$api.get_labe({
					name: 'get_label'
				}).then((res) => {
					this.tabList = res.data.data
				})
			},
			clickTab (data) {
				console.log(data)
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
	}
</style>
