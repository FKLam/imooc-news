<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<!-- 导航栏 -->
			<view class="navbar-content" :class="{search: isSearch}" :style="{height: navBarheight+'px',width: windowWidth+'px'}" @click.stop="open">
				<view v-if="isSearch" class="navbar-content-back" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search">
					<!-- 非搜索页显示 -->
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
						<!-- <text class="iconfont iconsousuo"></text> -->
					</view>
					<view class="navbar-search_text">uni-app</view>
				</view>
				<view v-else class="navbar-search">
					<!-- 搜索页显示 -->
					<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入您要搜索的内容" @input="inputChange" />
				</view>
			</view>
		</view>
		<view :style="{height: navBarheight + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number,],
				default: ''
			},
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarheight: 45,
				windowWidth: 375,
				val: ''
			};
		},
		watch: {
			value (newVal) {
				this.val = newVal
			}
		},
		created() {
			// 获取设备信息
			const info = uni.getSystemInfoSync()
			// 状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			
			// #ifdef MP-WEIXIN
			// 获取按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// (按钮底部高度 - 状态栏的高度) + (按钮底部高度 - 状态栏内的高度)
			this.navBarheight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods: {
			open () {
				if (this.isSearch) {
					return
				}
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			inputChange (e) {
				const {value} = e.detail
				this.$emit('input', value)
			},
			back () {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				height: 45px;
				padding: 0 15px;
				&.search {
					padding-left: 0;
					.navbar-content-back {
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search {
						border-radius: 5px;
					}
				}
				.navbar-search {
					display: flex;
					align-items: center;
					border-radius: 30px;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					background-color: #FFF;
					.navbar-search_icon {
						margin-right: 6px;
					}
					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
			}
		}
	}
</style>
