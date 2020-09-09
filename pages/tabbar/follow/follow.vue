<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-wrapper">
				<view class="follow-tab-item" :class="{active: activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab-item" :class="{active: activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list-swapper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="list.length === 0 && !noArticle" iconType="snow" status="loading"></uni-load-more>
						<list-card v-for="(item, index) in list" :key="item._id" :item="item" types="follow"></list-card>
						<view v-if="noArticle" class="follow-list-nodata">没有数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="authors.length === 0 && !noAuthor" iconType="snow" status="loading"></uni-load-more>
						<list-author v-for="(item, index) in authors" :key="item.id" :author="item"></list-author>
						<view v-if="noAuthor" class="follow-list-nodata">没有数据</view>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				noArticle: false,
				authors: [],
				noAuthor: false
			}
		},
		onLoad () {
			uni.$on('update_article', () => {
				this.list = []
				this.noArticle = false
				this.getFollow()
			})
			uni.$on('update_author', () => {
				this.authors = []
				this.noAuthor = false
				this.getAuthor()
			})
			this.getFollow()
			this.getAuthor()
		},
		methods: {
			tab (index) {
				this.activeIndex = index
			},
			getFollow () {
				this.noArticle = false
				this.$api.get_follow().then((res) => {
					const {data} = res
					this.list = data.data
					this.noArticle = this.list.length === 0 ? true : false
				})
			},
			change (e) {
				const {current} = e.detail
				this.activeIndex = current
			},
			getAuthor () {
				this.noAuthor = false
				this.$api.get_author().then((res) => {
					console.log(res)
					const {data} = res
					this.authors = data.data
					this.noAuthor = this.authors.length === 0 ? true : false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px #f5f5f5 solid;
			.follow-tab-wrapper {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px $mk-base-color solid;
				.follow-tab-item {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					color: #666;
					font-size: 14px;
					&:first-child {
						border-right: 1px $mk-base-color solid;
					}
					&.active {
						color: $mk-base-color;
					}
				}
			}
		}
		.follow-list {
			flex: 1;
			.follow-list-swapper {
				height: 100%;
				.follow-list-item {
					height: 100%;
				}
			}
		}
		.follow-list-nodata {
			padding: 50px;
			font-size: 14px;
			color: #999;
			text-align: center;
		}
	}
</style>
