import store from '../store/index.js'
export default function (options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id: store.state.userInfo._id,
		...data
	}
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res) => {
			let reslut = res.result
			if (reslut.code === 200) {
				reslove(reslut)
			} else {
				reject(result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
}