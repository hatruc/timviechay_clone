// ============ js phân quyền thông báo ===============
$('.type_notify').select2({
	dropdownParent: $('.box_user_permission'),
})
// thêm box thông báo
$(document).on('click', '.box_content_notify .btn_add_noti', function () {
	let check = true
	$('.box_content_notify .box_form_notify').each(function (i) {
		let total_user = $(this).find('.box_show_pqchat .txt_show_user').length,
			total_noti = $(this).find('.content_show_ltbao .box_content_loaitbao').length
		console.log(total_user, total_noti, 'test')
		if (total_user <= 0 || total_noti <= 0) {
			check = false
		}
	})
	if (check) {
		let html = `
        <div class="box_form_notify">
            <div class="form_noti">     
                <label class="form_title form_title_noti">Tên tài khoản</label> 
                <div class="box_show_pqchat" data_check_del="1">
                    <div class="box_inp_email">
                        <input class="form-control show_user_role input_account" placeholder="Nhập email hoặc số điện thoại">
                        <button class="btn_confirm_notify">Hoàn thành</button>
                    </div>
                    <p class="error_noti"></p>
                </div>
            </div>
            <div class="form_noti">
                <label for="" class="form_title">Loại thông báo và tin nhắn thông báo</label>
                <div class="reg_select2">
                  <select class="form-control type_notify" name="">
                    <option value="">Chọn loại thông báo và tin nhắn thông báo</option>`
		list_noti_type().forEach(function callback(noti, i) {
			html += `<option value="${i}">${noti}</option>`
		})
		html += `</select>
                </div>
            </div>
            <div class="form_table_noti">
                                            
            </div>
            <div class="btn_form_noti">
                <button type="button" class="btn_remove_noti">Xóa <img src="https://devnext.timviec365.vn/static-tv/images/btn_del.svg"></button>
            </div>
        </div>`
		$(this).parents('.box_btn_add_noti').before(html)
		$('.type_notify').select2({
			dropdownParent: $('.box_user_permission'),
		})
		$('.btn_form_noti').css('display', 'flex')
	} else {
		$('.pp_show_error').show()
		$('.pp_show_error .content_noti').html('Bạn phải nhập tài khoản và chọn loại thông báo trước khi thêm tiếp.')
	}
})
// enter khi nhập sdt và email
$(document).on('click', '.box_show_pqchat .btn_confirm_notify', function (e) {
	e.preventDefault()
	let el = $(this).parents('.box_inp_email').find('.input_account')
	eventPermission(el)
})

function eventPermission(el) {
	let account = el.val(),
		regex_email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	if (account) {
		regex_sdt =
			/^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/
		console.log(el)
		let total_user = $('.box_show_pqchat').find('.txt_show_user').length
		if (total_user >= 5) {
			$('.box_show_pqchat .input_account').prop('disabled', true).hide()
			$('.box_btn_add_noti .btn_add_noti').hide()
			alert('Được chọn tối đa 5 tài khoản')
		} else {
			if (account.match(regex_sdt) || account.match(regex_email)) {
				let exits_acc = true
				$('.box_show_pqchat')
					.find('.txt_show_user')
					.each(function (i) {
						if ($(this).find('.txt_show_email').html() == account) {
							exits_acc = false
						}
					})
				el.parents('.box_show_pqchat').find('.error_noti').html('')
				if (exits_acc) {
					$.ajax({
						type: 'POST',
						url: 'https://api.timviec365.vn/api/timviec/permission/getUserByIdChat',
						async: true,
						dataType: 'JSON',
						data: { Infor: account },
						success: function (res) {
							const data = res?.data
							if (data.result) {
								let list_user = data.listUser
								if (list_user.length < 2) {
									let box_user = `
                                                <div class="txt_show_user" data-id_chat="${list_user[0].id_chat}" data-type365="${list_user[0].type365}">
                                                    <p class="txt_show_email">${account}</p>
                                                    <button type="button" class="btn_del_acc"><img src="https://devnext.timviec365.vn/static-tv/images/charm_tick.svg" class="icon_delete_email"></button>
                                                </div>`
									el.parents('.box_inp_email').after(box_user)
									el.val('')
								} else {
									el.addClass('add_acc')
									let html = renderSelectUser(list_user, account)
									$('#popup_select_acc').show()
									$('#select_account').html(html)
									$('#select_account').select2({
										dropdownParent: $('#popup_select_acc .select'),
									})
								}
							} else {
								$('.pp_show_error').show()
								$('.pp_show_error .content_noti').html(data.message)
							}
						},
					})
				} else {
					$('.pp_show_error').show()
					$('.pp_show_error .content_noti').html('Tài khoản đã được chọn, vui lòng nhập tài khoản khác.')
				}
			} else {
				el.parents('.box_show_pqchat').find('.error_noti').html('Bạn đang nhập sai định dạng số điện thoại hoặc email.')
			}
		}
	}
}

function renderSelectUser(list_user, account = '') {
	let html = ''
	list_user.forEach(function callback(user, i) {
		html += `<option value="${user.id_chat}" data-acc="${account}" data-type="${user.type365}">${user.user_name} (id: ${user.id_chat})</option>`
	})
	return html
}
$(document).on('click', '.confirm_acc', function () {
	let id_chat = $('#select_account').val()
	let total_user = $('.box_show_pqchat').find('.txt_show_user').length
	if (total_user >= 5) {
		$('.box_show_pqchat .input_account').prop('disabled', true).hide()
		$('.box_btn_add_noti .btn_add_noti').hide()
		alert('Được chọn tối đa 5 tài khoản')
	} else {
		if (id_chat != 0) {
			let el = $('.box_show_pqchat .input_account')
			if (el.hasClass('add_acc')) {
				let selected = $('#select_account :selected')
				let type365 = selected.attr('data-type'),
					account = selected.attr('data-acc')
				let check_exist = $(`.txt_show_user[data-id_chat="${id_chat}"][data-type365="${type365}"]`)
				if (check_exist.length) {
					alert('Tài khoản đã được chọn')
					return false
				}
				let box_user = `
                            <div class="txt_show_user" data-id_chat="${id_chat}" data-type365="${type365}">
                                <p class="txt_show_email">${account}</p>
                                <button type="button" class="btn_del_acc"><img src="https://devnext.timviec365.vn/static-tv/images/charm_tick.svg" class="icon_delete_email"></button>
                            </div>`
				$('.add_acc').parents('.box_inp_email').after(box_user)
				$('.add_acc').val('')
				$('#popup_select_acc').hide()
				el.removeClass('add_acc')
			}
		}
	}
})

$(document).click(function (event) {
	var target = $(event.target)
	if (!target.closest('#popup_select_acc .auth_form1').length && $('#popup_select_acc').is(':visible')) {
		$('#popup_select_acc').hide()
	}
})
// tắt popup thông báo lỗi
$(document).on('click', '.pp_show_error .btn_confirm', function () {
	$('.pp_show_error').hide()
})
// xóa user đã nhập
var arr_data = []
$(document).on('click', '.txt_show_user .btn_del_acc', function () {
	let el_box = $(this).parents('.box_form_notify'),
		el_parent = $('.box_show_pqchat')

	var data = $(this).parents('.txt_show_user[check_id_chat=0]').attr('data-id_chat')
	arr_data.push(data)
	var data_rm = $(this).parents('.box_user_permission[data_check_del=0]').attr('data_remove', arr_data)
	$(this).parents('.txt_show_user').remove()
	let total_user = el_parent.find('.txt_show_user').length
	if (total_user < 5) {
		el_parent.find('.input_account').removeAttr('disabled').show()
		$('.box_btn_add_noti .btn_add_noti').show()
	}
	let total_user_item = el_box.find('.box_show_pqchat .txt_show_user').length
	if (total_user_item <= 0) {
		el_box.find('.box_table_noti').remove()
	}
})
// hàm các loại thông báo
function list_noti_type(type_noti) {
	var lst = [
		'Tất cả thông báo',
		'Thông báo quên mật khẩu, đổi mật khẩu',
		'Thông báo nhà tuyển dụng xem hồ sơ',
		'Thông báo được tag, trả lời bình luận',
		'Thông báo khi có chuyên viên gửi gợi ý việc làm từ AI365',
	]

	if (type_noti == null || type_noti == 0) {
		return lst
	} else {
		return lst[parseInt(type_noti)]
	}
}
// chọn loại thông báo
$(document).on('change', '.box_form_notify .type_notify', function () {
	let type_notify = $(this).val(),
		total_user = $(this).parents('.box_form_notify').find('.box_show_pqchat .txt_show_user').length
	if (total_user > 0) {
		let list_noti = []
		if (type_notify != '') {
			if (type_notify == 0) {
				list_noti_text = list_noti_type()
				list_noti_text.forEach(function callback(item, type) {
					if (type > 0 && item) {
						list_noti.push(type)
					}
				})
				console.log(list_noti)
			} else {
				console.log(list_noti_type(type_notify))
				list_noti = [type_notify]
			}
			let box = $(this)
			list_noti.forEach(function callback(type_notify, i) {
				let check = box.parents('.box_form_notify').find(`.box_content_loaitbao[data-type="${type_notify}"]`).length
				if (type_notify > 0 && !check) {
					box
						.parents('.box_form_notify')
						.find('.box_table_noti .box_content_loaitbao')
						.each(function (i) {
							if (box.attr('data-type') == type_notify) {
								box.remove()
							}
						})
					let check_table = box.parents('.box_form_notify').find('.box_table_noti').length,
						row = `
                <div class="box_content_loaitbao" data-type="${type_notify}">
                    <p class="ct_stt_ltbao">1</p>
                    <div class="ct_noidung_ltbao">
                        <img src="https://devnext.timviec365.vn/static-tv/images/txt_noti.svg" class="icon_moreinfor_ltbao">
                        <p class="txt_ndung_ltbao">${list_noti_type(type_notify)}</p>
                    </div>
                    <button type="button" class="delete_ltbao">
                        <img src="https://devnext.timviec365.vn/static-tv/images/del_table.svg" class="icon_delete_ltbao">
                    </button>
                </div>`
					if (check_table == 0) {
						let table = `
                <div class="form_noti box_table_noti">
                    <div class="box_header_loaitbao">
                        <p class="hder_noti hder_txt_stt">STT</p>
                        <p class="hder_noti hder_txt_loaitbao">Loại thông báo</p>
                    </div>
                    <div class="content_show_ltbao">
                        ${row}
                    </div>
                </div>`
						box.parents('.box_form_notify').append(table)
					} else {
						box.parents('.box_form_notify').find('.box_table_noti .content_show_ltbao').append(row)
					}
				}
			})
			update_stt(box.parents('.box_form_notify'))
			if (type_notify != '') {
				$(this).val('').change()
			}
			// if (type_notify == 0) {
			//     el_table.addClass('all_noti');
			// }
		}
	} else {
		$('.pp_show_error').show()
		$('.pp_show_error .content_noti').html('Bạn vui lòng chọn tài khoản phần quyền để nhận thông báo.')
	}
})
// cập nhật số thú tự trong bảng noti
function update_stt(el_parent) {
	el_parent.find('.content_show_ltbao .box_content_loaitbao').each(function (i) {
		$(this)
			.find('.ct_stt_ltbao')
			.html(i + 1)
	})
}
// render các thông báo đc chọn vào bảng
function render_notify(type) {
	let html = ''
	if ($.isArray(list_noti_type(type))) {
		list_noti_type(type).forEach(function callback(item, i) {
			if (i != 0) {
				html += `<div class="box_content_loaitbao" data-type="${i}">
                            <p class="ct_stt_ltbao">1</p>
                            <div class="ct_noidung_ltbao">
                                <img src="https://devnext.timviec365.vn/static-tv/images/txt_noti.svg" class="icon_moreinfor_ltbao">
                                <p class="txt_ndung_ltbao">${item}</p>
                            </div>
                            <button type="button" class="delete_ltbao">
                                <img src="https://devnext.timviec365.vn/static-tv/images/del_table.svg" class="icon_delete_ltbao">
                            </button>
                        </div>`
			}
		})
	} else {
		html = `<div class="box_content_loaitbao" data-type="${type}">
                    <p class="ct_stt_ltbao">1</p>
                    <div class="ct_noidung_ltbao">
                        <img src="https://devnext.timviec365.vn/static-tv/images/txt_noti.svg" class="icon_moreinfor_ltbao">
                        <p class="txt_ndung_ltbao">${list_noti_type(type)}</p>
                    </div>
                    <button type="button" class="delete_ltbao">
                        <img src="https://devnext.timviec365.vn/static-tv/images/del_table.svg" class="icon_delete_ltbao">
                    </button>
                </div>`
	}
	return html
}
// xóa loại thông báo đã chọn
$(document).on('click', '.box_content_loaitbao .delete_ltbao', function () {
	let el = $(this),
		el_table = el.parents('.box_table_noti'),
		el_parent = el.parents('.box_form_notify')
	el.parents('.box_content_loaitbao').remove()
	let total_row = el_parent.find('.box_content_loaitbao').length
	update_stt(el_parent)
	if (total_row <= 0) {
		el_table.remove()
	}
})
// xóa box thông báo đã thêm
$(document).on('click', '.btn_form_noti .btn_remove_noti', function () {
	$(this).parents('.box_form_notify').remove()
	let total_box = $('.box_content_notify .box_form_notify').length
	if (total_box <= 1) {
		$('.btn_form_noti').css('display', 'none')
	}
})

$(document)
	.on('click', '.btn_huongdan', function () {
		$('.pop_huongdan').show()
	})
	.on('click', '.pop_huongdan .close_pop', function () {
		$('.pop_huongdan').hide()
	})
	.on('click', '.select_ask_permission .btn_y,.select_ask_permission .btn_view', function () {
		$('#popup_permission').show()
		let tk = 'Tài khoản'
		if ($('#email').length) {
			tk = $('#email').val()
		}
		$('#popup_permission .show_tk').text(tk)
		$('.type_notify').select2({
			// dropdownParent: $('.box_user_permission')
		})
	})
	.on('click', '.select_ask_permission .btn_n', function () {
		$('.form_ask_permission').hide()
	})
	.on('click', '.btn_close_pop', function () {
		$('#popup_permission').hide()
	})
	.on('click', '#popup_permission .confirm', function () {
		let check = $('.txt_show_user').length
		if (check > 0) {
			$('#popup_permission').hide()
			$('.form_ask_permission .not_confirm').hide()
			$('.form_ask_permission .confirm').show()
			$('.form_uv.form_ask_permission').attr('data-confirm', 1)
		} else {
			alert('Bạn chưa chọn tài khoản phân quyền')
		}
	})
	.on('click', '#popup_permission .cancel', function () {
		$('#popup_permission').hide()
	})
	// .on('click', '#popup_permission', function(event) {
	//     var target = $(event.target),
	//         btn = $('.select_ask_permission .btn_y,.select_ask_permission .btn_view');
	//     if (target.is('#popup_permission').length) {
	//         $('#popup_permission').hide();
	//     }
	// })
	.on('click', function (e) {
		let container_background = $('#popup_permission')
		let container = $('#popup_permission .box_permission'),
			btn = $('.select_ask_permission .btn_y,.select_ask_permission .btn_view')
		if (
			container_background.is(e.target) &&
			!container.is(e.target) &&
			container.has(e.target).length === 0 &&
			!btn.is(e.target) &&
			btn.has(e.target).length === 0
		) {
			$('#popup_permission').hide()
		}
	})

// ============ end js phân quyền thông báo ===============
