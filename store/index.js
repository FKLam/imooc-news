import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const HISTORY_KEY = '__history__'
const EDIT_LABEL_KEY = '__edit_label__'
const USER_INFO_KEY = '__user_info__'

const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync(USER_INFO_KEY) || {},
		historyList: uni.getStorageSync(HISTORY_KEY) || [],
		is_edited: uni.getStorageSync(EDIT_LABEL_KEY) || false
	},
	mutations: {
		SET_USER_INFO (state, user) {
			state.userInfo = user
		},
		SET_HISTORY_LIST (state, history) {
			state.historyList = history
		},
		CLEAR_HISTORY (state) {
			state.historyList = []
		},
		SET_EDITED_LABEL_RECORD (state) {
			state.is_edited = true
		}
	},
	actions: {
		set_history ({commit, state}, history) {
			let list = state.historyList || []
			list.unshift(history)
			uni.setStorageSync(HISTORY_KEY, list)
			commit('SET_HISTORY_LIST', list)
		},
		clear_history ({commit}) {
			uni.removeStorageSync(HISTORY_KEY)
			commit('CLEAR_HISTORY')
		},
		set_edit_label_record ({commit}) {
			uni.setStorageSync(EDIT_LABEL_KEY, true)
			commit('SET_EDITED_LABEL_RECORD')
		},
		set_user ({commit}, user) {
			uni.setStorageSync(USER_INFO_KEY, user)
			commit('SET_USER_INFO', user)
		}
	}
})

export default store