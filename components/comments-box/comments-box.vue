<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header-logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header-info">
				<view v-if="!comments.is_reply" class="comments-header-title">{{comments.author.author_name}}</view>
				<view v-else class="comments-header-title">
					{{comments.author.author_name}}
					<text class="reply-text">回复</text>
					{{comments.to}}
				</view>
				<view>{{comments.create_time | formatTime}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{comments.comment_content}}</view>
			<view class="comments-content-info">
				<view class="comments-content-info-button" @click="commentReply({comments, is_reply:reply})">回复</view>
			</view>
			<view class="comments-content-reply" v-for="(item, index) in comments.replys" :key="item.comment_id">
				<comment-box :reply="true" :comments="item" @reply="commentReply"></comment-box>
			</view>
		</view>
	</view>
</template>

<script>
	import CommentBox from '@/components/comments-box/comments-box.vue'
	import {parseTime} from '@/utils/index.js'
	export default {
		name: 'CommentBox',
		props: {
			comments: {
				type: Object,
				default () {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		components: {
			CommentBox
		},
		data() {
			return {
				
			};
		},
		filters: {
			formatTime (time) {
				return parseTime(time)
			}
		},
		methods: {
			commentReply (commentData) {
				const {comments, is_reply} = commentData
				if (is_reply) {
					comments.reply_id = comments.comment_id
					comments.comment_id = this.comments.comment_id
				}
				this.$emit('reply', commentData)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;
		.comments-header {
			display: flex;
			.comments-header-logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				overflow: hidden;
				border-radius: 5px;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.comments-header-info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				.comments-header-title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text {
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}
		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
			.comments-content-info {
				margin-top: 15px;
				display: flex;
				.comments-content-info-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
			}
			.comments-content-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
