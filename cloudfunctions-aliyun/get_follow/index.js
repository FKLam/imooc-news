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
	const article_likes_ids = user.article_likes_ids
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			is_like: true
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list
	}
};
