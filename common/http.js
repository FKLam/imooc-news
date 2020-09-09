export default function (options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id: '5f52ddd6c07b77000156940c',
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