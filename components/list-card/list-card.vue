<template>
	<view>
		<view class="list-card">
			<view class="list-card-image">
				<image src="../../static/logo.png"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>uni-app开发框架uni-app开发框架uni-app开发框架uni-app开发框架uni-app开发框架uni-app开发框架uni-app开发框架</text>
				</view>
				<view class="list-card-content-desc">
					<view class="list-card-content-desc-label">
						<view class="list-card-content-desc-label-item">前端</view>
					</view>
					<view class="list-card-content-desc-browe">120人浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.list-card {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		.list-card-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.list-card-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			.list-card-content-title {
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.list-card-content-desc {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				.list-card-content-desc-label {
					display: flex;
					.list-card-content-desc-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 15px;
						color: $mk-base-color;
						border: 1px $mk-base-color solid;
					}
				}
				.list-card-content-desc-browe {
					color: #999;
					line-height: 1.5;
				}
			}
		}
	}
</style>
