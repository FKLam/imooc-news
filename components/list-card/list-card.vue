<template>
	<view>
		<!-- 基础卡片 -->
		<view class="list-card" v-if="item.mode === 'base'">
			<view class="list-card-image">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="list-card-content-desc">
					<view class="list-card-content-desc-label">
						<view class="list-card-content-desc-label-item">{{item.classify}}</view>
					</view>
					<view class="list-card-content-desc-browe">{{item.browse_count + '人浏览'}}</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode === 'column'">
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="list-card-image">
					<view class="list-card-image-item" v-if="index < 3" v-for="(innerItem, index) in item.cover" :key="index">
						<image :src="innerItem"></image>
					</view>
				</view>
				<view class="list-card-content-desc">
					<view class="list-card-content-desc-label">
						<view class="list-card-content-desc-label-item">{{item.classify}}</view>
					</view>
					<view class="list-card-content-desc-browe">{{item.browse_count + '人浏览'}}</view>
				</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="list-card mode-image" v-if="item.mode === 'image'">
			<view class="list-card-image">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="list-card-content-desc">
					<view class="list-card-content-desc-label">
						<view class="list-card-content-desc-label-item">{{item.classify}}</view>
					</view>
					<view class="list-card-content-desc-browe">{{item.browse_count + '人浏览'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
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
				position: relative;
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				padding-right: 30px;
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
		&.mode-column {
			.list-card-content {
				width: 100%;
				padding-left: 0;
			}
			.list-card-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;
				.list-card-image-item {
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;
					&:first-child {
						margin-left: 0;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.list-card-content-desc {
				margin-top: 10px;
			}
		}
		&.mode-image {
			flex-direction: column;
			.list-card-image {
				width: 100%;
				height: 100px;
			}
			.list-card-content {
				padding-left: 0;
				margin-top: 10px;
				.list-card-content-desc {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
