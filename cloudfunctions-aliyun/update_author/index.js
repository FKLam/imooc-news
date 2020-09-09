'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		author_id
	} = event
	
	let user = await db.collection('user')
		.doc(user_id)
		.get()
	user = user.data[0]
	let author_likes_ids = user.author_likes_ids
	let author_ids = null
	if (!author_likes_ids.includes(author_id)) {
		author_ids = dbCmd.addToSet(author_id)
	} else {
		author_ids = dbCmd.pull(author_id)
	}
	await db.collection('user')
		.doc(user_id)
		.update({
			author_likes_ids: author_ids
		})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: {}
	}
};
