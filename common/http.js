export default function (options) {
	const {
		url,
		data
	} = options
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: url,
			data
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