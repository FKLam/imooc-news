<template>
	<list-scroll class="list-scroll" @loadmore="loadMore">
		<list-card mode="base" v-for="(item, index) in list" :key="item._id" :item="item"></list-card>
		<uni-load-more type="snow" :status="loadStatus.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			loadStatus: {
				type: Object,
				default () {
					return {
						loading: 'loading'
					}
				}
			}
		},
		methods: {
			loadMore () {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
