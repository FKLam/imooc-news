<template>
	<view class="home">
		<!-- 自定义导航栏组件 -->
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyList.length > 0" class="label-content">
					<view class="label-content-item" v-for="(item, index) in historyList" :key="index" @click="openHistory(item)">{{item.name}}</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<list-scroll v-else class="list-scroll">
				<list-card v-for="(item, index) in searchList" :key="item._id" :item="item" @click="setHistory"></list-card>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				value: '',
				is_history: true,
				searchList: []
			}
		},
		computed: {
			...mapState([
				'historyList'
			])
		},
		methods: {
			change (value) {
				if (!value || value.length === 0) {
					if (this.timer) {
						clearTimeout(this.timer)
					}
					this.mark = false
					this.searchList = []
					this.is_history = true
					return
				}
				// 搜索节流
				if (!this.mark) {
					this.mark = true
					if (this.timer) {
						clearTimeout(this.timer)
					}
					this.timer = setTimeout(() => {
						this.mark = false
						this.getSearch(value)
					}, 500)
				}
			},
			getSearch (value) {
				if (!value || value.length === 0) {
					this.searchList = []
					this.is_history = true
					return
				}
				this.$api.get_search({
						value
					}).then((res) => {
						const {data} = res
						console.log(data)
						this.searchList = data
						this.is_history = false
				})
			},
			setHistory (item) {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			openHistory (item) {
				this.value = item.name
				this.getSearch(item.name)
			},
			clear () {
				this.$store.dispatch('clear_history')
				uni.showToast({
					title: '清空完成'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;
				.label-title {
					color: $mk-base-color;
				}
				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content-item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
			.no-data {
				height: 200px;
				line-height: 200px;
				width: 100%;
				text-align: center;
				font-size: 14px;
				color: #666;
			}
		}
	}
</style>
