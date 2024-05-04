function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	return emailReg.test($email)
}

function validateUser($phone) {
	var phoneFormat = /^[0-9]+$/
	return phoneFormat.test($phone)
}

$(document).ready(function () {
	//Kiểm tra số điện thoại trong form
	$('#user_phone').keyup(function () {
		var valPhone = $('#user_phone')
		if ($('#user_phone').hasClass('valid') == true) {
			if (valPhone.val().length > 0) {
				$('#user_phone_error').remove()
				if (validateUser(valPhone.val()) == false) {
					if ($('#user_phone_error').hasClass('error') == false) {
						valPhone.after(
							'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập đúng định dạng số điện thoại.</label>'
						)
						valPhone.addClass('error')
					}
				} else {
					$('#user_phone_error').remove()
					valPhone.removeClass('error')
				}
			} else {
				$('#user_phone_error').remove()
				valPhone.after(
					'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập tài khoản đăng nhập.</label>'
				)
				valPhone.addClass('error')
			}
		}
	})
	$('#user_phone').blur(function () {
		var valPhone = $('#user_phone')
		if (valPhone.val().length > 0) {
			if (validateUser(valPhone.val()) == false) {
				if ($('#user_phone_error').hasClass('error') == false) {
					valPhone.after(
						'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập đúng định dạng số điện thoại.</label>'
					)
					valPhone.addClass('error')
				}
			} else {
				$('#user_phone_error').remove()
				valPhone.removeClass('error')
			}
			valPhone.addClass('valid')
		}
	})
	//Kiá»ƒm tra password trong form
	$('#user_password_first').keyup(function () {
		var valPass = $('#user_password_first')
		if ($('#user_password_first').hasClass('valid') == true) {
			if (valPass.val().length > 0) {
				$('#user_password_first_error').remove()
				if (valPass.val().length < 4) {
					if ($('#user_password_first_error').hasClass('error') == false) {
						valPass.after(
							'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Mật khẩu phải chứa 4-20 ký tự</label>'
						)
						valPass.addClass('error')
					}
				} else {
					$('#user_password_first_error').remove()
					valPass.removeClass('error')
				}
			} else {
				$('#user_password_first_error').remove()
				valPass.after(
					'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Vui lòng nhập mật khẩu.</label>'
				)
				valPass.addClass('error')
			}
		}
	})
	$('#user_password_first').blur(function () {
		var valPass = $('#user_password_first')
		if (valPass.val().length > 0) {
			if (valPass.val().length < 4) {
				if ($('#user_password_first_error').hasClass('error') == false) {
					valPass.after(
						'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Mật khẩu phải chứa 4-20 ký tự</label>'
					)
					valPass.addClass('error')
				}
			} else {
				$('#user_password_first_error').remove()
				valPass.removeClass('error')
			}
			valPass.addClass('valid')
		}
	})
})

function checkvali(id = '') {
	$('#idchecklogin').remove()
	var returnform = true
	var ccphone = $('#user_phone')
	var ccpass = $('#user_password_first')
	if (ccpass.val() == '') {
		$('#user_password_first_error').remove()
		ccpass.after(
			'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Vui lòng nhập mật khẩu.</label>'
		)
		ccpass.addClass('error')
		ccpass.focus()
		ccpass.addClass('valid')
		returnform = false
	} else {
		ccpass.addClass('valid')
		$('#user_password_first_error').remove()
		if (ccpass.val().length < 4) {
			if ($('#user_password_first_error').hasClass('error') == false) {
				ccpass.after(
					'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Mật khẩu phải từ 4-20 ký tự</label>'
				)
				ccpass.addClass('error')
				ccpass.focus()
				returnform = false
			}
		} else {
			$('#user_password_first_error').remove()
			ccpass.removeClass('error')
		}
	}
	if (ccphone.val() == '') {
		$('#user_phone_error').remove()
		ccphone.after(
			'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập tài khoản đăng nhập</label>'
		)
		ccphone.addClass('error')
		$('#user_phone').focus()
		ccphone.addClass('valid')
		returnform = false
	} else {
		ccphone.addClass('valid')
		$('#user_phone_error').remove()
		if (ccphone.val().length > 0) {
			if (validateUser(ccphone.val()) == false) {
				if ($('#user_phone_error').hasClass('error') == false) {
					ccphone.after(
						'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập đúng định dạng số điện thoại</label>'
					)
					ccphone.focus()
					ccphone.addClass('error')
				}
				returnform = false
			} else {
				$('#user_phone_error').remove()
				ccphone.removeClass('error')
			}
			ccphone.addClass('valid')
		}
	}
	if (returnform == true) {
		$.ajax({
			type: 'POST',
			url: '../ajax/checklogin.php',
			data: {
				email: ccphone.val(),
				pass: ccpass.val(),
			},
			success: function (data) {
				if (data == 1) {
					$('.auth_form').css('display', 'none')
					// alert("ChĂºc má»«ng báº¡n Ä‘Äƒng nháº­p tĂ i khoáº£n á»©ng viĂªn thĂ nh cĂ´ng!");
					if (id != '') {
						location.href = id + '?notice=1'
					} else {
						location.reload()
					}
				} else {
					$('.auth_form .hrdot').html(
						'<label id="idchecklogin" class="error" for="idchecklogin">Tài khoản, mật khẩu của bạn chưa chính xác</label>'
					)
				}
			},
		})
	}
}
$('.btn_login').click(function () {
	var id = $(this).attr('data')
	checkvali(id)
})

function checkvali2() {
	$('#idchecklogin').remove()
	var returnform = true
	var ccphone = $('#user_phone')
	var ccpass = $('#user_password_first')
	if (ccpass.val() == '') {
		$('#user_password_first_error').remove()
		ccpass.after(
			'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Vui lòng nhập mật khẩu.</label>'
		)
		ccpass.addClass('error')
		ccpass.focus()
		ccpass.addClass('valid')
		returnform = false
	} else {
		ccpass.addClass('valid')
		$('#user_password_first_error').remove()
		if (ccpass.val().length < 4) {
			if ($('#user_password_first_error').hasClass('error') == false) {
				ccpass.after(
					'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Mật khẩu phải chứa 4-20 ký tự</label>'
				)
				ccpass.addClass('error')
				ccpass.focus()
				returnform = false
			}
		} else {
			$('#user_password_first_error').remove()
			ccpass.removeClass('error')
		}
	}
	if (ccphone.val() == '') {
		$('#user_phone_error').remove()
		ccphone.after(
			'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập tài khoản đăng nhập</label>'
		)
		ccphone.addClass('error')
		$('#user_phone').focus()
		ccphone.addClass('valid')
		returnform = false
	} else {
		ccphone.addClass('valid')
		$('#user_phone_error').remove()
		if (ccphone.val().length > 0) {
			if (validateUser(ccphone.val()) == false) {
				if ($('#user_phone_error').hasClass('error') == false) {
					ccphone.after(
						'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập đúng định dạng số điện thoại</label>'
					)
					ccphone.focus()
					ccphone.addClass('error')
				}
				returnform = false
			} else {
				$('#user_phone_error').remove()
				ccphone.removeClass('error')
			}
			ccphone.addClass('valid')
		}
	}
	if (returnform == true) {
		check_login_permission(ccphone.val(), ccpass.val())
		return false
	} else {
		return false
	}
}

function checkvali3() {
	$('#idchecklogin').remove()
	var returnform = true
	var ccphone = $('#user_phone')
	var ccpass = $('#user_password_first')
	if (ccpass.val() == '') {
		$('#user_password_first_error').remove()
		ccpass.after(
			'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Vui lòng nhập mật khẩu.</label>'
		)
		ccpass.addClass('error')
		ccpass.focus()
		ccpass.addClass('valid')
		returnform = false
	} else {
		ccpass.addClass('valid')
		$('#user_password_first_error').remove()
		if (ccpass.val().length < 4) {
			if ($('#user_password_first_error').hasClass('error') == false) {
				ccpass.after(
					'<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Mật khẩu phải chứa 4-20 ký tự</label>'
				)
				ccpass.addClass('error')
				ccpass.focus()
				returnform = false
			}
		} else {
			$('#user_password_first_error').remove()
			ccpass.removeClass('error')
		}
	}
	if (ccphone.val() == '') {
		$('#user_phone_error').remove()
		ccphone.after(
			'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập tài khoản đăng nhập</label>'
		)
		ccphone.addClass('error')
		$('#user_phone').focus()
		ccphone.addClass('valid')
		returnform = false
	} else {
		ccphone.addClass('valid')
		$('#user_phone_error').remove()
		if (ccphone.val().length > 0) {
			if (validateUser(ccphone.val()) == false) {
				if ($('#user_phone_error').hasClass('error') == false) {
					ccphone.after(
						'<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập đúng định dạng số điện thoại</label>'
					)
					ccphone.focus()
					ccphone.addClass('error')
				}
				returnform = false
			} else {
				$('#user_phone_error').remove()
				ccphone.removeClass('error')
			}
			ccphone.addClass('valid')
		}
	}
	if (returnform == true) {
		check_login_permission(ccphone.val(), ccpass.val())
		return false
	} else {
		return false
	}
}
