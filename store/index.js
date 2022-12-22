// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		"token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnNob3AuZWR1d29yay5jblwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MTU5MjAwNCwiZXhwIjoxNjcxOTUyMDA0LCJuYmYiOjE2NzE1OTIwMDQsImp0aSI6IlUyS0pYQ252Um40cUwyR0giLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ygmOaj92nYqvbZwvRWV4289wcgnK8iOKY0E39iZG3mU',
		"username": "foo",
		"age": 18,
		todos: [{
				id: 1,
				text: '我是内容一',
				done: true
			},
			{
				id: 2,
				text: '我是内容二',
				done: false
			}
		]
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		}
	},
	mutations: {
		changeName(state, name) {
			state.username = name
		}
	},
	actions: {
		// addChangeAction(context, name) {
		// 	context.commit('changeName', name)
		// }
		addChangeAction(context, name) {
			return new Promise((resolve, reject) => {
				context.commit('changeName', name)
				resolve()
			})
		}

	}

})
export default store
