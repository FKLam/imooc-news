<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="index">
			<list-item :list="listCacheData[activeIndex] ? listCacheData[activeIndex] : []" @loadmore="loadMore" :loadStatus="load[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import ListItem from './list-item.vue'
	export default {
		props: {
			tab: {
				type: Array,
				default: []
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
				// js的限制 
				listCacheData: {},
				load: {
				},
				pageSize: 5
			};
		},
		components: {
			ListItem
		},
		watch: {
			tab (newVal, oldVal) {
				if (newVal.length === 0) {
					return
				}
				this.load = {}
				this.listCacheData = {}
				this.getList(this.activeIndex)
			}
		},
		// onLoad 在页面中，created 组件中
		created () {
			uni.$on('update_article', () => {
				this.load = {}
				this.listCacheData = {}
				this.getList(this.activeIndex)
			})
		},
		methods: {
			change (e) {
				const {current} = e.detail
				this.$emit('change', current)
				if (!this.listCacheData[current] || this.listCacheData[current].length === 0) {
					this.getList(current)
				}
			},
			loadMore () {
				if (this.load[this.activeIndex].loading === 'noMore') {
					return
				}
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			getList (index) {
				if (!this.load[index]) {
					this.load[index] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
						name: this.tab[index].name,
						page: this.load[index].page,
						pageSize: this.pageSize
					}).then((res) => {
						const {data} = res
						console.log(data)
						// this.list = data
						// this.listCacheData[index] = data
						if (!data || data.length === 0) {
							let oldLoad = {}
							oldLoad.loading = 'noMore'
							oldLoad.page = this.load[index].page
							this.$set(this.load, index, oldLoad)
							this.$forceUpdate()
							return
						}
						let oldList = this.listCacheData[index]
						if (!oldList) {
							oldList = []
						}
						if (data.length < this.pageSize) {
							let oldLoad = {}
							oldLoad.loading = 'noMore'
							oldLoad.page = this.load[index].page
							this.$set(this.load, index, oldLoad)
						}
						oldList.push(...data)
						this.$set(this.listCacheData, index, oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;
		.swiper-item {
			height: 100%;
			overflow: hidden;
			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
