'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id = ''
	} = event
	if (!user_id || user_id === '') {
		return {
			code: 201,
			msg: '数据获取失败',
			data: {}
		}
	}
	let user = await db.collection('user')
		.doc(user_id)
		.get()
	user = user.data[0]
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据获取成功',
		data: user
	}
};
