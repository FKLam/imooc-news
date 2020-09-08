import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const HISTORY_KEY = '__history__'

const store = new Vuex.Store({
	state: {
		historyList: uni.getStorageSync(HISTORY_KEY) || []
	},
	mutations: {
		SET_HISTORY_LIST (state, history) {
			state.historyList = history
		},
		CLEAR_HISTORY (state) {
			state.historyList = []
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
		}
	}
})

export default store