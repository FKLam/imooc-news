'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id
		} = event
	const userInfo = await db.collection('user')
		.doc(user_id)
		.get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	const article_ids = userInfo.data[0].article_ids
	
	// 聚合 更精细化处理数据 求和、分组、指定哪些字段
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
		.match({
			id: dbCmd.in(article_ids)
		})
		.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
