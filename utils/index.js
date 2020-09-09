export const parseTime = (time) => {
	let date = null
	const format = '{y}-{M}-{d} {h}:{m}:{s}'
	if (typeof time === 'string') {
		time = parseInt(time)
	}
	date = new Date(time)
	const formatObj = {
		y: date.getFullYear(),
		M: date.getMonth() + 1,
		d: date.getDay(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds()
	}
	const strTime = format.replace(/{(y|M|d|h|m|s)}/g, (result, key) => {
		let value = formatObj[key]
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value
	})
	return strTime
}