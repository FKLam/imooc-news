<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}}浏览</text>
					<text>{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button class="detail-header-button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like ? '取消关注' : '关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
			</view>
			<view v-if="commentsList" class="detail-comment">
				<view class="detail-comment-title">最新评论</view>
				<view class="detail-comment-content" v-for="(item, index) in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons :type="formData.is_like ? 'heart-filled' : 'heart'" size="22" color="#f07373" @click="like"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons :type="formData.is_thumbs_up ? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#f07373" @click="thumbs"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup type="bottom" ref="popup" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<view class="popup-header-item" @click="close">取消</view>
					<view class="popup-header-item" @click="post">发布</view>
				</view>
				<view class="popup-content">
					<textarea class="popup-content-text" v-model="commentsValue" maxlength="200" fixed="true" placeholder="请输入评论内容"></textarea>
					<view class="popup-content-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formData: {},
				noData: '<p style="text-align: center;color: #666">详情加载中...</p>',
				commentsValue: '',
				commentsList: [],
				replyFormData: {}
			}
		},
		components: {
			uParse
		},
		onLoad (query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		onReady () {
			
		},
		methods: {
			getDetail () {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					console.log(res)
					const {data} = res
					this.formData = data
				})
			},
			openComment () {
				this.$refs.popup.open()
			},
			close () {
				this.$refs.popup.close()
			},
			post () {
				if (!this.commentsValue || this.commentsValue.length === 0) {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return
				}
				this.setUpdateComment({content: this.commentsValue, ...this.replyFormData})
			},
			setUpdateComment (contentData) {
				const formData = {
					article_id: this.formData._id,
					...contentData
				}
				uni.showLoading()
				this.$api.update_comment(formData).then((res) => {
					this.$refs.popup.close()
					this.commentsValue = ''
					uni.hideLoading()
					uni.showToast({
						title: '评论成功',
						icon: 'none'
					})
					this.getComments()
					this.replyFormData = {}
				}).catch((err) => {
					uni.hideLoading()
					console.log(err)
				})
			},
			getComments () {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then((res) => {
					const {data} = res
					console.log(data)
					this.commentsList = data.data
				})
			},
			reply (commentData) {
				const {comments, is_reply} = commentData
				this.replyFormData = {
					comment_id: comments.comment_id,
					is_reply
				}
				if (comments.reply_id) {
					this.replyFormData.reply_id = comments.reply_id
				}
				this.openComment()
			},
			follow (author_id) {
				this.setUpdateAuthor(author_id)
			},
			setUpdateAuthor (author_id) {
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then((res) => {
					console.log(res)
					this.formData.is_author_like = !this.formData.is_author_like
					uni.hideLoading()
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					})
				})
			},
			like () {
				this.setUpdateLike(this.formData._id)
			},
			setUpdateLike (article_id) {
				uni.showLoading()
				this.$api.update_likes({
					article_id
				}).then((res) => {
					console.log(res)
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.showToast({
						title: this.formData.is_like ? '文章收藏成功' : '取消收藏文章',
						icon: 'none'
					})
					uni.$emit('update_article')
				})
			},
			thumbs () {
				if (this.formData.is_thumbs_up) {
					uni.showToast({
						title: '您已点赞过了',
						icon: 'none'
					})
					return
				}
				this.setUpdateThumbsup(this.formData._id)
			},
			setUpdateThumbsup (article_id) {
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then((res) => {
					console.log(res)
					uni.hideLoading()
					this.formData.is_thumbs_up = !this.formData.is_thumbs_up
					this.formData.thumbs_up_count++
					uni.showToast({
						title: '文章点赞成功',
						icon: 'none'
					})
				})
			},
			open () {
				uni.navigateTo({
					url: '/pages/detail-comments/detail-comments?id=' + this.formData._id
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}
	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
		.detail-header-logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			image {
				height: 100%;
				width: 100%;
			}
		}
		.detail-header-content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			.detail-header-content-title {
				font-size: 14px;
				color: #333;
			}
			.detail-header-content-info {
				color: #999;
				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header-button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color: #fff;
		}
	}
	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding: 0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.detail-comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
			}
			.detail-comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}
	.detail-bottom {
		position: fixed;
		align-items: center;
		bottom: 0;
		left: 0;
		display: flex;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;
			text {
				color: #999;
				font-size: 14px;
			}
		}
		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;
			.detail-bottom-icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
	.popup-wrap {
		background-color: #fff;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #f5f5f5 solid;
			.popup-header-item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-content-text {
				width: 100%;
				height: 200px;
			}
			.popup-content-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
