'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	
	let user = await db.collection('user')
		.doc(user_id)
		.get()
	user = user.data[0]
	
	let author_likes_ids = user.author_likes_ids
	
	let list = await db.collection('user')
		.aggregate()
		.addFields({
			is_like: $.in(['$id', author_likes_ids])
		})
		.match({
			is_like: true
		})
		.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据获取成功',
		data: list
	}
};
