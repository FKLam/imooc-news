<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id: '5f52ddd6c07b77000156940c'
			}).then((res) => {
				const {data} = res
				console.log(data)
				this.$store.dispatch('set_user', data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css'
</style>
