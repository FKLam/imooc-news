<template>
	<view>
		<view class="feedback-title">意见反馈:</view>
		<view class="feedback-content">
			<textarea class="feedback-content-text" v-model="content" placeholder="请输入您要反馈的问题"></textarea>
		</view>
		<view class="feedback-title">反馈图片:</view>
		<view class="feedback-image-wrapper">
			<view class="feedback-image-item" v-for="(item, index) in imageList" :key="index">
				<view class="feedback-image-item-close" @click="deleteImage(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="feedback-image-item-wrapper">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="addImage">
				<view class="feedback-image-item-wrapper">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				content: ''
			}
		},
		methods: {
			addImage () {
				const _this = this
				const count = 5 - this.imageList.length
				uni.chooseImage({
					count: count,
					success (res) {
						console.log(res)
						const tempFilePaths = res.tempFilePaths
						const tempFiles = res.tempFiles
						tempFilePaths.forEach((item, index) => {
							_this.imageList.push({
								url: item,
								name: tempFiles[index].name
							})
						})
					}
				})
			},
			deleteImage (index) {
				this.imageList.splice(index, 1)
			},
			async submit () {
				if (this.content.length === 0) {
					uni.showToast({
						title: '请输入要反馈的问题',
						icon: 'none'
					})
					return
				}
				let iamgeFileIDs = []
				uni.showLoading()
				for (let i = 0; i < this.imageList.length; i++) {
					const filePath = this.imageList[i].url
					const name = this.imageList[i].name
					const fileID = await this.uploadFiles(filePath, name)
					iamgeFileIDs.push(fileID)
				}
				this.updateFeedback({
					content: this.content,
					feedbackImages:iamgeFileIDs
				})
			},
			async uploadFiles (filePath, name) {
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath: name
				}).catch((err) => {
					console.log(err)
				})
				return result.fileID
			},
			updateFeedback ({content, feedbackImages}) {
				this.$api.update_feedback({
					content,
					feedbackImages
				}).then((res) => {
					console.log(res)
				    uni.hideLoading()
					uni.showToast({
						title: '反馈提交成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					}, 2000)
				}).catch((err) => {
					console.log(err)
					uni.hideLoading()
					uni.showToast({
						title: '反馈提交失败',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		font-size: 14px;
		margin: 15px;
		margin-bottom: 0;
		color: #666;
	}
	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px #eee solid;
		.feedback-content-text {
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}
	.feedback-image-wrapper {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;
			.feedback-image-item-close {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}
			.feedback-image-item-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px #eee solid;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback-button {
		margin: 0 15px;
		background-color: $mk-base-color;
	}
</style>
