fireBaseClient = {
	coderesult: null,
	config: (number) => {
		$.ajax({
			url: 'https://ht.timviec365.vn:9013/api/users/TakeDataFireBaseOTP',
			data: { number: number, type: 'yhytgaudasd' },
			method: 'post',
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response)
				if (response.data && response.data.firebase) {
					firebaseConfig = response.data.firebase
					const init = firebase.initializeApp(firebaseConfig)
					console.log(init)
				} else {
					console.log(333333)
					alert(response.error.message)
				}
			},
			error: (err) => console.log(err),
		})
	},
	RecaptchaVerifier: (btn) => {
		try {
			setTimeout(function () {
				$('#recaptcha-container').html('')
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
					size: 'normal',
					callback: (response) => {
						btn.click()
					},
					'expired-callback': () => {},
				})
				recaptchaVerifier.render()
			}, 2000)
		} catch (e) {
			console.log(e)
		}
	},
	RecaptchaVerifierNew: (btn) => {
		try {
			setTimeout(function () {
				$('#recaptcha-container').html('')
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
					size: 'normal',
					callback: (response) => {
						$('.verify_otp').remove()
						$('.recaptcha').after(`<input type="button" class="verify_otp otpSMS captcha" value="Tiếp tục">`)
					},
					'expired-callback': () => {},
				})
				recaptchaVerifier.render()
			}, 2000)
		} catch (e) {
			console.log(e)
		}
	},
	sendSms: (number) => {
		firebase
			.auth()
			.signInWithPhoneNumber('+84' + number, window.recaptchaVerifier)
			.then(function (confirmationResult) {
				console.log(12321321)
				window.confirmationResult = confirmationResult
				fireBaseClient.coderesult = confirmationResult
				console.log(fireBaseClient.coderesult)
				return true
			})
			.catch(function (error) {
				console.log(error)
				return false
			})
	},
	codeverify: (code) => {
		let auth = false
		let result = fireBaseClient.coderesult
			.confirm(code)
			.then(async () => {
				auth = true
				return auth
			})
			.catch(function (e) {
				console.log(e)
			})
		return result
	},
}
