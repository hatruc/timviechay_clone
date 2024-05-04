$(document).ready(function () {
	$(document).keypress(function (event) {
		var keycode = event.keyCode ? event.keyCode : event.which
		if (keycode == '13') {
			$('.verify_otp').click()
			event.preventDefault()
		}
	})
	$('.close_modal_tbcc,.img_close_cc').click(function () {
		$('.modal_tbcc').hide()
	})

	function validateConfirmOTP(otp) {
		if (otp == '' || otp.length != 6 || otp == 'NaN' || id_tk == 0) {
			$('.txt_nd_modal').html('Vui lòng điền mã OTP hợp lệ!')
			$('.modal_tbcc .nd_modal').css('width', '420px')
			$('.modal_tbcc').show()
			return false
		}
		return true
	}

	//Nếu là email
	let account = document.getElementById('#phone')
	console.log(account)

	if (account.includes('@')) {
		//Gửi lại email
		$('.re_send_otp').click(function () {
			if (!$(this).hasClass('active')) {
				$.ajax({
					type: 'POST',
					url: '../codelogin/email_redo.php',
					data: {
						email: $('.xt_email').val(),
						name: $('.xt_name').val(),
						id: $('.xt_id').val(),
						or: 'uv',
					},
					success: function (data) {
						$('.txt_nd_modal').html(
							'Mã OTP đã được gửi lại email <span>' + $('.xt_email').val() + '</span> thành công!'
						)
						$('.modal_tbcc .nd_modal').css('width', '680px')
						$('.modal_tbcc').show()
						$('.re_send_otp').addClass('active')
					},
				})
			}
		})
		$('.verify_otp').click(function () {
			xac_thuc_otp()
		})
	}
	//Nếu là SĐT
	else {
		$(document).on('click', '.re_send_otp', function () {
			// let btn_confirm = $(this)
			$('#partitioned').addClass('hidden')
			if (!$('.verify_otp').hasClass('send_sms2')) {
				$('.verify_otp').addClass('send_sms2')
			}
			if (!$('.verify_otp').hasClass('captcha')) {
				$('.verify_otp').addClass('captcha')
			}

			let html = `
                <div class="inp_captcha">
                    <input type="text" class="inp_cap">
                    <div class="img_cap">
                        <img src="/classes/securitycode.php" alt="timviec365.vn">
                    </div>
                </div>
            `
			$('.recaptcha').after(html)
			$('.send_sms').remove()
		})

		$(document).on('click', '#verify_otp_btn', function () {
			let self = this
			const btn_confirm = $(this)
			if ($(this).hasClass('send_sms2')) {
				if ($(this).hasClass('captcha')) {
					let xt_phone = $('.xt_email').val()
					let captcha = $('.inp_cap').val()
					$.ajax({
						type: 'POST',
						url: '../codelogin/check_captcha.php',
						data: {
							xt_phone: xt_phone,
							captcha: captcha,
							or,
						},
						dataType: 'JSON',
						success: function (data) {
							if (data.status == 0) {
								$('.txt_nd_modal').html(data.mes)
								$('.modal_tbcc .nd_modal').css('width', '420px')
								$('.modal_tbcc').show()
							} else if (data.status == 1) {
								$('.inp_captcha').remove()
								$('.recaptcha').html('')
								$('#partitioned').removeClass('hidden')
								$(self).removeClass('captcha')
								re_time_sms(self)
							} else if (data.status == 3) {
								alert(data.mes)
								window.location.assign('/')
							}
						},
					})
				} else {
					xac_thuc_otp()
				}
			} else {
				if (!btn_confirm.hasClass('confirm_otp')) {
					if (!btn_confirm.hasClass('captcha')) {
						console.log(account)
						fireBaseClient.config(account, btn_confirm)
						fireBaseClient.RecaptchaVerifierNew(btn_confirm)
						$(this).remove()
					} else {
						fireBaseClient.sendSms(account)
						btn_confirm.addClass('confirm_otp')
						setTimeout(() => {
							$('#recaptcha-container').html('')
							$('#partitioned').removeClass('hidden')
							re_time_sms(self)
						}, 1000)
					}
				}
				//Xác thực OTP
				else {
					var otp = $('#partitioned').val()
					if (validateConfirmOTP(otp)) {
						fireBaseClient.codeverify(otp).then((result) => {
							if (result) {
								$.ajax({
									url: '/codelogin/verify_otp_sms.php',
									type: 'POST',
									data: {
										id: id_tk,
										otp: otp,
										or,
									},
									success: function (data) {
										if (data == 2) {
											$('.txt_nd_modal').html('Đã có lỗi xảy ra')
											$('.modal_tbcc .nd_modal').css('width', '420px')
											$('.modal_tbcc').show()
										} else {
											if (or == 'uv') {
												window.location.href = '/'
											} else if (or == 'ntd') {
												window.location.href = '/'
											}
										}
									},
								})
							} else {
								$('.txt_nd_modal').html('Mã OTP không khớp, vui lòng thử lại!')
								$('.modal_tbcc .nd_modal').css('width', '420px')
								$('.modal_tbcc').show()
							}
						})
					}
				}
			}
		})
	}
})

function re_time_sms(self) {
	let num = 15
	$(self).after(
		`<p class="send_sms">Trường hợp bạn không nhận được OTP, bạn vui lòng click <span class="re_send_otp active_sms">Gửi lại OTP</span> <span class="time_re_sms" style="color: #4c5bd4;">(${num} s)</span></p>`
	)
	let interval = setInterval(function () {
		num = num - 1
		if (num == 0) {
			$('.re_send_otp').prop('disabled', false)
			$('.time_re_sms').remove()
			clearInterval(interval)
		} else {
			$('.time_re_sms').html(`(${num} s)`)
			$('.re_send_otp').prop('disabled', true)
		}
	}, 1000)
}

function xac_thuc_otp() {
	var otp = $('#partitioned').val()
	var id_uv = $('.xt_id').val()
	var otp = Number($('#partitioned').val())
	if (otp == '' || otp < '100000' || otp > '999999' || otp == 'NaN' || id_uv == 0) {
		$('.txt_nd_modal').html('Vui lòng điền mã OTP hợp lệ!')
		$('.modal_tbcc .nd_modal').css('width', '420px')
		$('.modal_tbcc').show()
	} else {
		$.ajax({
			type: 'POST',
			url: '../codelogin/verify_otp.php',
			data: {
				id: id_tk,
				otp: otp,
				or,
			},
			success: function (data) {
				if (data == 1) {
					if (or == 'uv') {
						window.location.href =
							'/xac-thuc-tai-khoan-ung-vien-thanh-cong.html?code=' + otp + '&id=' + id_tk
					} else if (or == 'ntd') {
						window.location.href =
							'/xac-thuc-tai-khoan-nha-tuyen-dung-thanh-cong.html?otp=' + otp + '&id=' + id_tk
					}
				} else {
					$('.txt_nd_modal').html('Mã OTP không khớp, vui lòng thử lại!')
					$('.modal_tbcc .nd_modal').css('width', '420px')
					$('.modal_tbcc').show()
				}
			},
		})
	}
}
