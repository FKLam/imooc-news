<template>
	<view class="detail-comments">
		<view class="comments-content" v-for="(item, index) in commentsLsit" :key="item.comment_id">
			<comment-box :comments="item"></comment-box>
		</view>
		<uni-load-more iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	import CommentBox from '../../components/comments-box/comments-box.vue'
	export default {
		components: {
			CommentBox
		},
		data() {
			return {
				article_id: '',
				commentsLsit: [],
				page: 1,
				pageSize: 5,
				loading: 'loading'
			}
		},
		onLoad (query) {
			const {id} = query;
			this.article_id = id
			this.getComments(id)
		},
		onReachBottom () {
			if (this.loading === 'noMore') {
				return
			}
			this.page++
			this.getComments(this.article_id)
		},
		methods: {
			getComments (article_id) {
				this.loading = 'loading'
				this.$api.get_comments({
					article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					console.log(res)
					let {data} = res
					data = data.data
					if (!data || data.length === 0) {
						this.loading = 'noMore'
						return
					}
					if (data.length < this.pageSize) {
						this.loading = 'noMore'
					}
					let oldList = this.commentsLsit
					oldList.push(...data)
					this.commentsLsit = oldList
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail-comments {
		padding: 0 10px;
	}
</style>
