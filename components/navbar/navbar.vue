<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<!-- 导航栏 -->
			<view class="navbar-content" :style="{height: navBarheight+'px',width: windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
						<!-- <text class="iconfont iconsousuo"></text> -->
					</view>
					<view class="navbar-search_text">uni-app</view>
				</view>
			</view>
		</view>
		<view :style="{height: navBarheight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarheight: 45,
				windowWidth: 375
			};
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
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>
