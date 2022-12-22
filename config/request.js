// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = 'https://api.shop.eduwork.cn'; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.Authorization = "Bearer" + vm.$store.state.access_token
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		// const data = response.data
		return response.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		const {
			statusCode,
			data
		} = response
		if (statusCode < 400) {
			return data
		} else if (statusCode == 400) {
			vm.$u.toast(data.message)
			return Promise.reject(response)
		} else if (statusCode == 401) {
			//token 失效，跳转到登录页面
			vm.$u.toast('验证失败，请重新登录')
			setTimeout(() => {
				vm.$u.route('pages/login/login')
			}, 1500)
			return Promise.reject(response)
		} else if (statusCode == 422) {
			const {
				errors
			} = data
			vm.$u.toast(Object.values(errors)[0][0])
			return Promise.reject(response)
		} else {
			return Promise.reject(response)
		}
	})

	//扩展patch请求
	uni.$u.http.patch = (url, params = {}, header = {}) => {
		//模拟patch 请求
		const _params = {
			...params,
			_method: 'PATCH'
		}
		return uni.$u.http.post(url, _params, header)
	}
}
