<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit ? '完成' : '编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content-item" v-for="(item, index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="is_edit" class="icons-close" type="clear" size="20" color="red" @click="del(index)"></uni-icons>
				</view>
			</view>
			<view v-if="labelList.length === 0" class="no-data">
				当前没有数据
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content-item" v-for="(item, index) in list" :key="item._id" @click="add(index)">{{item.name}}</view>
			</view>
			<view v-if="list.length === 0" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: true
			}
		},
		onLoad () {
			this.getLabel()
		},
		methods: {
			editLabel () {
				this.is_edit = !this.is_edit
				if (!this.is_edit) {
					let label = []
					this.labelList.forEach((item) => {
						label.push(item._id)
					})
					this.setUpdateLabel(label)
				}
			},
			getLabel () {
				this.loading = true
				this.$api.get_label({
					type: 'all'
				}).then((res) => {
					const {data} = res.data
					console.log(data)
					this.labelList = data.filter(item => item.current)
					this.list = data.filter(item => !item.current)
					this.loading = false
				})
			},
			del (index) {
				if (!this.is_edit) {
					return
				}
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			add (index) {
				if (!this.is_edit) {
					return
				}
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			setUpdateLabel (label) {
				uni.showLoading()
				this.$api.update_label({
					label
				}).then((res) => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					uni.$emit('labelChange')
					this.$store.dispatch('set_edit_label_record')
				}).catch((err) => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.label-edit {
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
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
	.no-data {
		text-align: center;
		padding: 50px 0;
		width: 100%;
		color: #999;
		font-size: 14px;
	}
</style>
