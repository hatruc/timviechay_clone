$(function () {
	// let arr_city = [
	// 	{
	// 		_id: 1,
	// 		cit_id: 1,
	// 		cit_name: 'Hà Nội',
	// 	},
	// 	{
	// 		_id: 2,
	// 		cit_id: 2,
	// 		cit_name: 'Hải Phòng',
	// 	},
	// 	{
	// 		_id: 3,
	// 		cit_id: 3,
	// 		cit_name: 'Bắc Giang',
	// 	},
	// 	{
	// 		_id: 6,
	// 		cit_id: 6,
	// 		cit_name: 'Cao Bằng',
	// 	},
	// 	{
	// 		_id: 4,
	// 		cit_id: 4,
	// 		cit_name: 'Bắc Kạn',
	// 	},
	// 	{
	// 		_id: 8,
	// 		cit_id: 8,
	// 		cit_name: 'Hòa Bình',
	// 	},
	// 	{
	// 		_id: 9,
	// 		cit_id: 9,
	// 		cit_name: 'Hải Dương',
	// 	},
	// 	{
	// 		_id: 5,
	// 		cit_id: 5,
	// 		cit_name: 'Bắc Ninh',
	// 	},
	// 	{
	// 		_id: 11,
	// 		cit_id: 11,
	// 		cit_name: 'Hà Nam',
	// 	},
	// 	{
	// 		_id: 12,
	// 		cit_id: 12,
	// 		cit_name: 'Hưng Yên',
	// 	},
	// 	{
	// 		_id: 13,
	// 		cit_id: 13,
	// 		cit_name: 'Lào Cai',
	// 	},
	// 	{
	// 		_id: 14,
	// 		cit_id: 14,
	// 		cit_name: 'Lai Châu',
	// 	},
	// 	{
	// 		_id: 15,
	// 		cit_id: 15,
	// 		cit_name: 'Lạng Sơn',
	// 	},
	// 	{
	// 		_id: 16,
	// 		cit_id: 16,
	// 		cit_name: 'Ninh Bình',
	// 	},
	// 	{
	// 		_id: 17,
	// 		cit_id: 17,
	// 		cit_name: 'Nam Định',
	// 	},
	// 	{
	// 		_id: 18,
	// 		cit_id: 18,
	// 		cit_name: 'Phú Thọ',
	// 	},
	// 	{
	// 		_id: 19,
	// 		cit_id: 19,
	// 		cit_name: 'Quảng Ninh',
	// 	},
	// 	{
	// 		_id: 20,
	// 		cit_id: 20,
	// 		cit_name: 'Sơn La',
	// 	},
	// 	{
	// 		_id: 21,
	// 		cit_id: 21,
	// 		cit_name: 'Thái Bình',
	// 	},
	// 	{
	// 		_id: 22,
	// 		cit_id: 22,
	// 		cit_name: 'Thái Nguyên',
	// 	},
	// 	{
	// 		_id: 23,
	// 		cit_id: 23,
	// 		cit_name: 'Tuyên Quang',
	// 	},
	// 	{
	// 		_id: 24,
	// 		cit_id: 24,
	// 		cit_name: 'Vĩnh Phúc',
	// 	},
	// 	{
	// 		_id: 7,
	// 		cit_id: 7,
	// 		cit_name: 'Điện Biên',
	// 	},
	// 	{
	// 		_id: 26,
	// 		cit_id: 26,
	// 		cit_name: 'Đà Nẵng',
	// 	},
	// 	{
	// 		_id: 27,
	// 		cit_id: 27,
	// 		cit_name: 'Thừa Thiên Huế',
	// 	},
	// 	{
	// 		_id: 28,
	// 		cit_id: 28,
	// 		cit_name: 'Khánh Hòa',
	// 	},
	// 	{
	// 		_id: 29,
	// 		cit_id: 29,
	// 		cit_name: 'Lâm Đồng',
	// 	},
	// 	{
	// 		_id: 31,
	// 		cit_id: 31,
	// 		cit_name: 'Bình Thuận',
	// 	},
	// 	{
	// 		_id: 10,
	// 		cit_id: 10,
	// 		cit_name: 'Hà Giang',
	// 	},
	// 	{
	// 		_id: 32,
	// 		cit_id: 32,
	// 		cit_name: 'Đắk Lắk',
	// 	},
	// 	{
	// 		_id: 33,
	// 		cit_id: 33,
	// 		cit_name: 'Đắk Nông',
	// 	},
	// 	{
	// 		_id: 34,
	// 		cit_id: 34,
	// 		cit_name: 'Gia Lai',
	// 	},
	// 	{
	// 		_id: 35,
	// 		cit_id: 35,
	// 		cit_name: 'Hà Tĩnh',
	// 	},
	// 	{
	// 		_id: 36,
	// 		cit_id: 36,
	// 		cit_name: 'Kon Tum',
	// 	},
	// 	{
	// 		_id: 37,
	// 		cit_id: 37,
	// 		cit_name: 'Nghệ An',
	// 	},
	// 	{
	// 		_id: 38,
	// 		cit_id: 38,
	// 		cit_name: 'Ninh Thuận',
	// 	},
	// 	{
	// 		_id: 39,
	// 		cit_id: 39,
	// 		cit_name: 'Phú Yên',
	// 	},
	// 	{
	// 		_id: 40,
	// 		cit_id: 40,
	// 		cit_name: 'Quảng Bình',
	// 	},
	// 	{
	// 		_id: 41,
	// 		cit_id: 41,
	// 		cit_name: 'Quảng Nam',
	// 	},
	// 	{
	// 		_id: 42,
	// 		cit_id: 42,
	// 		cit_name: 'Quảng Ngãi',
	// 	},
	// 	{
	// 		_id: 43,
	// 		cit_id: 43,
	// 		cit_name: 'Quảng Trị',
	// 	},
	// 	{
	// 		_id: 44,
	// 		cit_id: 44,
	// 		cit_name: 'Thanh Hóa',
	// 	},
	// 	{
	// 		_id: 45,
	// 		cit_id: 45,
	// 		cit_name: 'Hồ Chí Minh',
	// 	},
	// 	{
	// 		_id: 46,
	// 		cit_id: 46,
	// 		cit_name: 'Bình Dương',
	// 	},
	// 	{
	// 		_id: 47,
	// 		cit_id: 47,
	// 		cit_name: 'Bà Rịa Vũng Tàu',
	// 	},
	// 	{
	// 		_id: 25,
	// 		cit_id: 25,
	// 		cit_name: 'Yên Bái',
	// 	},
	// 	{
	// 		_id: 30,
	// 		cit_id: 30,
	// 		cit_name: 'Bình Định',
	// 	},
	// 	{
	// 		_id: 50,
	// 		cit_id: 50,
	// 		cit_name: 'Bạc Liêu',
	// 	},
	// 	{
	// 		_id: 51,
	// 		cit_id: 51,
	// 		cit_name: 'Bình Phước',
	// 	},
	// 	{
	// 		_id: 52,
	// 		cit_id: 52,
	// 		cit_name: 'Bến Tre',
	// 	},
	// 	{
	// 		_id: 53,
	// 		cit_id: 53,
	// 		cit_name: 'Cà Mau',
	// 	},
	// 	{
	// 		_id: 54,
	// 		cit_id: 54,
	// 		cit_name: 'Đồng Tháp',
	// 	},
	// 	{
	// 		_id: 55,
	// 		cit_id: 55,
	// 		cit_name: 'Đồng Nai',
	// 	},
	// 	{
	// 		_id: 56,
	// 		cit_id: 56,
	// 		cit_name: 'Hậu Giang',
	// 	},
	// 	{
	// 		_id: 57,
	// 		cit_id: 57,
	// 		cit_name: 'Kiên Giang',
	// 	},
	// 	{
	// 		_id: 58,
	// 		cit_id: 58,
	// 		cit_name: 'Long An',
	// 	},
	// 	{
	// 		_id: 59,
	// 		cit_id: 59,
	// 		cit_name: 'Sóc Trăng',
	// 	},
	// 	{
	// 		_id: 60,
	// 		cit_id: 60,
	// 		cit_name: 'Tiền Giang',
	// 	},
	// 	{
	// 		_id: 61,
	// 		cit_id: 61,
	// 		cit_name: 'Tây Ninh',
	// 	},
	// 	{
	// 		_id: 62,
	// 		cit_id: 62,
	// 		cit_name: 'Trà Vinh',
	// 	},
	// 	{
	// 		_id: 63,
	// 		cit_id: 63,
	// 		cit_name: 'Vĩnh Long',
	// 	},
	// 	{
	// 		_id: 48,
	// 		cit_id: 48,
	// 		cit_name: 'Cần Thơ',
	// 	},
	// 	{
	// 		_id: 49,
	// 		cit_id: 49,
	// 		cit_name: 'An Giang',
	// 	},
	// ]
	// let check_ip = $('#new_header').attr('data-checkip') == 1 ? true : false
	//Chuyển sang dùng API theo y/c của Tuấn Anh
	$(document).on('ready', function () {
		if ($('.list_chat_uv').length) {
			var city_id = $('.luv-right').attr('data-id')
			var cate_id = $('.luv-right').attr('data-cate')
			$.ajax({
				url: '/ajax/get_json_online_v2.php',
				type: 'POST',
				dataType: 'JSON',
				data: {
					type: 0,
					city_id: city_id,
					cate_id: cate_id,
				},
				success: function (data) {
					if (data != '') {
						let html = '',
							i = 0
						data.forEach((element) => {
							html += `<li class="online_item" id-chat="${element.chat365_id}">
                                    <a rel="nofollow" target="_blank" href="${element.link}?notice">
                                        <span class="ava_mess m_online" title="Đang online">
                                            <img alt="${element.use_first_name}" src="${element.logo}" onerror='this.onerror=null;this.src="/images/user_no.png";'>
                                        </span>
                                        <span class="ct_online box_tooltip">
                                            <p>${element.use_first_name}</p>
                                            <p>${element.cv_city}</p>
                                            <p class="con-tooltip top">
                                                <span>${element.cv_title}</span>
                                                <span class="tooltip ">
                                                    <span>${element.cv_title}</span>
                                                </span>
                                            </p>
                                        </span>
                                    </a>
                                </li>`
							i++
							if (i % 10 == 0) {
								$('.list_chat_uv').prepend(html)
								html = ''
							}
						})
					}
				},
			})
		}
		if ($('.list_chat_ntd').length) {
			var city_id = $('.vl_left').attr('data-id')
			$.ajax({
				url: '/ajax/get_online_v2.php',
				type: 'POST',
				data: {
					type: 1,
					city_id: city_id,
				},
				success: function (data) {
					if (data != '') {
						$('.list_chat_ntd').html(data)
					}
				},
			})
		}
	})
	// const socket = io.connect('https://socket.timviec365.vn', {
	// 	secure: true,
	// 	enabledTransports: ['https'],
	// 	transports: ['websocket', 'polling'],
	// })

	function get_Cookie_c(cname) {
		var name = cname + '='
		var decodedCookie = decodeURIComponent(document.cookie)
		var ca = decodedCookie.split(';')
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i]
			while (c.charAt(0) == ' ') {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ''
	}

	function setCookie_c(cname) {
		const d = new Date()
		d.setTime(d.getTime() + 40000)
		let expires = 'expires=' + d.toUTCString()
		document.cookie = cname + '=1;' + expires + ';path=/'
	}

	function runDownload(url) {
		let arr_name = url.split('/')
		let name = arr_name[arr_name.length - 1]
		const a = document.createElement('a')
		a.href = url
		a.download = name
		a.click()
		$('#popup_download_chat').show()

		// let height = ($(window).height());
		// $(window).resize(function() {
		//    'tải xuống');
		//     //Check box download hiển thị
		//     if ($(window).height() < height) {
		//         $('#popup_download_chat').show();
		//     }
		//     $(window).off('resize');
		// });
	}

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i)
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i)
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i)
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i)
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i)
		},
		any: function () {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
		},
	}

	const linkChatWf = 'https://app.timviec365.vn/Download/Chat365/InstallAndUpdate/Chat365.msi'

	const id_chat365 = get_Cookie_c('id_chat365')
	var id_chat365_general = id_chat365
	const work247_token = get_Cookie_c('work247_token')
	const stop_no = get_Cookie_c('stop_no')

	const chat365 = get_Cookie_c('chat365')

	const uid_type = get_Cookie_c('UT')
	var uid_type_general = uid_type

	const uid = get_Cookie_c('UID')

	const name_room = 'timviec365_' + uid_type

	let ttc = get_Cookie_c('ttc')
	let json_ttc = null

	// if (Number(id_chat365) > 0) {
	// cập nhật vào base
	// $.ajax({
	//     url: "https://api.timviec365.vn/api/getData/timviec/updateActive",
	//     type: "POST",
	//     data: {
	//         chat_id: Number(id_chat365),
	//         token: work247_token,
	//         updatedAt: new Date().getTime() / 1000,
	//         lastActivedAt: new Date()
	//     },
	//     success: function(data) {
	//        "Cập nhật trạng thái thành công")
	//     }
	// });

	// socket.emit('Login', id_chat365, 'timviec365')

	// 	const data_ol = { uid, uid_type }

	// 	if (stop_no == '') {
	// 		// Nhận dữ liệu tin nhắn
	// 		socket.on('SendNotificationToHHP', (message, userName, conversationId, conversationName, senderId) => {
	// 			if (conversationName != '') {
	// 				$('.tb_chat365 .name').text(conversationName)
	// 			} else {
	// 				$('.tb_chat365 .name').text(userName)
	// 			}
	// 			if (message.includes('was add friend to')) {
	// 				message = 'Lời mời kết bạn'
	// 			}
	// 			if (message.includes('joined this consersation')) {
	// 				message = 'Một thành viên đã tham gia cuộc trò chuyện'
	// 			}
	// 			if (message.includes('edited a pin to')) {
	// 				message = 'Tin nhắn được ghim đã thay đổi'
	// 			}
	// 			if (message.includes('unpinned a message')) {
	// 				message = 'Tin nhắn ghim đã bị gỡ bỏ'
	// 			}
	// 			if (message.includes('pinned a message')) {
	// 				message = 'Tin nhắn vừa được ghim'
	// 			}
	// 			if (message.includes('has removed') || message.includes('added') || message.includes('from this conversation')) {
	// 				message = ''
	// 			}
	// 			if (message != '' && $('.tb_chat365').is(':hidden')) {
	// 				$('.tb_chat365 .nd').text(message)

	// 				$.ajax({
	// 					url: '/ajax/get_link_chat.php',
	// 					type: 'POST',
	// 					data: {
	// 						cv_id: conversationId,
	// 						my_id: id_chat365,
	// 					},
	// 					success: function (data) {
	// 						if (data != '') {
	// 							// $('.tb_chat365 .btn_login').attr('href', data);
	// 							$('.tb_chat365 .btn_login').attr('conv_id', conversationId)
	// 						}
	// 					},
	// 				})
	// 				$('.tb_chat365').show()
	// 			}
	// 		})
	// 	}
	// } else {
	// 	socket.emit('Login', 0, 'timviec365')
	// }

	// socket.on('connect', () => {
	// 	// $.ajax({
	// 	//     url: "/ajax/update_online.php",
	// 	//     type: "POST",
	// 	//     success: function(data) {
	// 	//        data);
	// 	//     }
	// 	// });
	// 	// lưu lại lịch sử chuyển page mỗi lần vào trang
	// 	// bắn thẳng lên server 202s
	// 	// $.ajax({
	// 	//     url: "/ajax/history_next_page.php",
	// 	//     type: "POST",
	// 	//     data: {
	// 	//         url: window.location.href
	// 	//     },
	// 	//     success: function() {}
	// 	// });
	// })

	var arr_online

	// Sử dụng emit và on lấy danh sách online theo web
	// socket.emit('GetOnline', 'timviec365')
	// socket.on('GetOnline', (userId) => {
	// 	arr_online = userId
	// 	//arr_online);
	// 	var indexs = arr_online.indexOf(0)
	// 	if (indexs !== -1) {
	// 		arr_online.splice(indexs, 1)
	// 	}

	// 	var i
	// 	for (i = 0; i < arr_online.length; ++i) {
	// 		if (arr_online[i] > 0) {
	// 			$('[id-chat="' + arr_online[i] + '"]').addClass('m_online')
	// 			// th
	// 			$('.no_logo_chat[id-chat="' + arr_online[i] + '"]')
	// 				.attr('src', '/images/user_chat_onl.png')
	// 				.attr('data-src', '/images/user_chat_onl.png')
	// 			$('[id-chat="' + arr_online[i] + '"]')
	// 				.find('.box_time_off')
	// 				.hide()
	// 		}
	// 	}

	// 	// if ($('.list_chat_uv').length) {
	// 	//     var city_id = $('.luv-right').attr('data-id');
	// 	//     var cate_id = $('.luv-right').attr('data-cate');
	// 	//     $.ajax({
	// 	//         url: "/ajax/get_json_online.php",
	// 	//         type: "POST",
	// 	//         dataType: 'Json',
	// 	//         data: {
	// 	//             online_arr: arr_online,
	// 	//             type: 0,
	// 	//             city_id: city_id,
	// 	//             cate_id: cate_id
	// 	//         },
	// 	//         success: function(data) {
	// 	//             if (data != '') {
	// 	//                 let html = '',
	// 	//                     i = 0;
	// 	//                 data.forEach(element => {
	// 	//                     html += `<li class="online_item" id-chat="${element.chat365_id}">
	// 	//                                 <a rel="nofollow" target="_blank" href="${element.link}?notice">
	// 	//                                     <span class="ava_mess m_online" title="Đang online">
	// 	//                                         <img alt="${element.use_first_name}" src="${element.logo}" onerror='this.onerror=null;this.src="/images/user_no.png";'>
	// 	//                                     </span>
	// 	//                                     <span class="ct_online box_tooltip">
	// 	//                                         <p>${element.use_first_name}</p>
	// 	//                                         <p>${element.cv_city}</p>
	// 	//                                         <p class="con-tooltip top">
	// 	//                                             <span>${element.cv_title}</span>
	// 	//                                             <span class="tooltip ">
	// 	//                                                 <span>${element.cv_title}</span>
	// 	//                                             </span>
	// 	//                                         </p>
	// 	//                                     </span>
	// 	//                                 </a>
	// 	//                             </li>`;
	// 	//                     i++;
	// 	//                     if (i % 10 == 0) {
	// 	//                         $('.list_chat_uv').prepend(html);
	// 	//                         html = '';
	// 	//                     }
	// 	//                 });
	// 	//             }
	// 	//         }
	// 	//     });
	// 	// }

	// 	// if ($('.list_chat_ntd').length) {
	// 	//     var city_id = $('.vl_left').attr('data-id');
	// 	//     $.ajax({
	// 	//         url: "/ajax/get_online.php",
	// 	//         type: "POST",
	// 	//         data: {
	// 	//             online_arr: arr_online,
	// 	//             type: 1,
	// 	//             city_id: city_id
	// 	//         },
	// 	//         success: function(data) {
	// 	//             if (data != '') {
	// 	//                 $('.list_chat_ntd').html(data);
	// 	//             }
	// 	//         }
	// 	//     });
	// 	// }
	// })

	// socket.on('Login', (userId, json_ttc) => {
	// 	// hiển thị trạng thái online đối với chế độ xem ứng viên
	// 	let idUngVien = $('#contain_chat_id').text()
	// 	if (userId == Number(idUngVien)) {
	// 		$('#status_time').text('Đang online')
	// 	}

	// 	if (arr_online.length > 0 && arr_online.indexOf(userId) != -1) {
	// 		return false
	// 	}
	// 	arr_online.push(userId)
	// 	if (userId > 0) {
	// 		$('[id-chat="' + userId + '"]').addClass('m_online')
	// 		//th
	// 		$('.no_logo_chat[id-chat="' + userId + '"]')
	// 			.attr('src', '/images/user_chat_onl.png')
	// 			.attr('data-src', '/images/user_chat_onl.png')
	// 		$('[id-chat="' + userId + '"]')
	// 			.find('.box_time_off')
	// 			.hide()
	// 	}

	// 	var id_onl = [userId]

	// 	if ($('.list_chat_uv').length && $('.online_item[id-chat="' + userId + '"]').length == 0 && userId > 0) {
	// 		var city_id = $('.luv-right').attr('data-id')
	// 		var cate_id = $('.luv-right').attr('data-cate')
	// 		let data = {
	// 			ntd_city: city_id != 0 ? city_id : '',
	// 			list_id: id_onl.join(','),
	// 			city_id,
	// 			cate_id,
	// 			keyword: '',
	// 			type: 'em',
	// 		}
	// 		$.ajax({
	// 			url: 'https://api.timviec365.vn/api/getData/timviec/getDataUserOnline',
	// 			type: 'POST',
	// 			data: data,
	// 			dataType: 'JSON',
	// 			success: function (data) {
	// 				let listUV = data['data']['dataUvFinal']
	// 				//listUV);
	// 				listUV.forEach((row, i) => {
	// 					let city_name = []
	// 					row.cv_city_id.forEach((cit_id, i) => {
	// 						let cit_name = cit_id == 0 ? 'Toàn quốc' : arr_city.find((e) => e._id == cit_id).cit_name
	// 						city_name.push(cit_name)
	// 					})
	// 					city_name = city_name.join(',')
	// 					//city_name);
	// 					let html = `<li class="online_item" id-chat="${row['chat365_id']}">
	//                                     <a rel="nofollow" target="_blank" href="${row['link']}?notice">
	//                                         <span class="ava_mess m_online" title="Đang online">
	//                                             <img alt="${row['name'].trim()}" src="${
	// 						row['logo']
	// 					}" onerror='this.onerror=null;this.src="/images/user_no.png";'>
	//                                         </span>
	//                                         <span class="ct_online box_tooltip">
	//                                             <p>${row['name']}</p>
	//                                             <p>${city_name}</p>
	//                                             <p class="con-tooltip top">
	//                                                 <span>${row['cv_title'].trim()}</span>
	//                                                 <span class="tooltip ">
	//                                                     <span>${row['cv_title']}</span>
	//                                                 </span>
	//                                             </p>
	//                                         </span>
	//                                     </a>
	//                                 </li>`
	// 					if (html != '') {
	// 						$('.list_chat_uv').prepend(html)
	// 					} else {
	// 						// thêm box rỗng để không load lại
	// 						$('.list_chat_uv').append('<li class="online_item false_div" id-chat="' + userId + '"></li>')
	// 					}
	// 				})
	// 			},
	// 		})
	// 		// $.ajax({
	// 		//     url: "/ajax/get_online_v2.php",
	// 		//     type: "POST",
	// 		//     data: {
	// 		//         online_arr: id_onl,
	// 		//         type: 0,
	// 		//         city_id: city_id,
	// 		//         cate_id: cate_id
	// 		//     },
	// 		//     success: function(data) {
	// 		//         if (data != '') {
	// 		//             $('.list_chat_uv').prepend(data);
	// 		//         } else {
	// 		//             // thêm box rỗng để không load lại
	// 		//             $('.list_chat_uv').append('<li class="online_item false_div" id-chat="' + userId + '"></li>');
	// 		//         }
	// 		//     }
	// 		// });
	// 	} else if ($('.list_chat_uv').length && $('.online_item[id-chat="' + userId + '"]').length != 0 && userId > 0) {
	// 		if ($('.online_item[id-chat="' + userId + '"]').hasClass('false_div')) {
	// 			// div khác loại
	// 		} else {
	// 			$('.online_item[id-chat="' + userId + '"]').show()
	// 		}
	// 	}

	// 	if ($('.list_chat_ntd').length && $('.online_item[id-chat="' + userId + '"]').length == 0 && userId > 0) {
	// 		var city_id = $('.vl_left').attr('data-id')
	// 		let data = {
	// 			ntd_city: city_id != 0 ? city_id : '',
	// 			list_id: id_onl.join(','),
	// 			city_id,
	// 			cate_id,
	// 		}
	// 		$.ajax({
	// 			url: 'https://api.timviec365.vn/api/getData/timviec/getDataUserOnline',
	// 			type: 'POST',
	// 			data: data,
	// 			dataType: 'JSON',
	// 			success: function (data) {
	// 				let listNtd = data['data']['dataNtdFinal']
	// 				//listNtd);
	// 				listNtd.forEach((row, i) => {
	// 					let city_name = ''
	// 					row.cv_city_id.forEach((cit_id, i) => {
	// 						city_name = cit_id == 0 ? 'Toàn quốc' : arr_city.find((e) => e._id == cit_id).cit_name
	// 					})
	// 					var html = `<li class="online_item openApp" id-chat="${row.chat365_id}">
	//                     <a rel="nofollow" target="_blank">
	//                         <span class="ava_mess m_online" title="Đang online">
	//                             <img alt="${row.usc_company}" src="${row.logo}" onerror='this.onerror=null;this.src="/images/no-image.png";'>
	//                         </span>
	//                         <span class="ct_online box_tooltip">
	//                             <p>${row.usc_company}</p>
	//                             <p class=" con-tooltip top">
	//                                 <span style="display:block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">${row.new_title}</span>
	//                                 <span class="tooltip ">
	//                                     <span>${row.new_title}</span>
	//                                 </span>
	//                             </p>
	//                             <p>${row.usc_city}</p>
	//                         </span>
	//                     </a>
	//                 </li>`
	// 					$('.list_chat_ntd').prepend(html)
	// 				})
	// 			},
	// 		})
	// 		// $.ajax({
	// 		//     url: "/ajax/get_json_online_v2.php",
	// 		//     type: "POST",
	// 		//     dataType: "json",
	// 		//     data: {
	// 		//         online_arr: id_onl,
	// 		//         type: 1,
	// 		//         city_id: city_id
	// 		//     },
	// 		//     success: function(response) {
	// 		//         isbusy = 0;
	// 		//         if (response.result) {
	// 		//             var data = response.list;
	// 		//             var html = `<li class="online_item openApp" id-chat="${data[0].chat365_id}">
	// 		//                 <a rel="nofollow" target="_blank">
	// 		//                     <span class="ava_mess m_online" title="Đang online">
	// 		//                         <img alt="${data[0].usc_company}" src="${data[0].logo}" onerror='this.onerror=null;this.src="/images/no-image.png";'>
	// 		//                     </span>
	// 		//                     <span class="ct_online box_tooltip">
	// 		//                         <p>${data[0].usc_company}</p>
	// 		//                         <p class=" con-tooltip top">
	// 		//                             <span style="display:block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">${data[0].new_title}</span>
	// 		//                             <span class="tooltip ">
	// 		//                                 <span>${data[0].new_title}</span>
	// 		//                             </span>
	// 		//                         </p>
	// 		//                         <p>${data[0].usc_city}</p>
	// 		//                     </span>
	// 		//                 </a>
	// 		//             </li>`;
	// 		//             $('.list_chat_ntd').prepend(html);
	// 		//         } else {
	// 		//             // thêm box rỗng để không load lại
	// 		//             $('.list_chat_ntd').append('<li class="online_item false_div" id-chat="' + userId + '"></li>');
	// 		//         }

	// 		//     }
	// 		// });
	// 	} else if ($('.list_chat_ntd').length && $('.online_item[id-chat="' + userId + '"]').length != 0 && userId > 0) {
	// 		if ($('.online_item[id-chat="' + userId + '"]').hasClass('false_div')) {
	// 			// div khác loại
	// 		} else {
	// 			$('.online_item[id-chat="' + userId + '"]').show()
	// 		}
	// 	}

	// 	if ($('#box_nd_uv').length && $('.s-row-nd[c-chat="' + userId + '"]').length == 0 && userId > 0) {
	// 		var data_s = $('#box_nd_uv').attr('data-s')
	// 		var cit_id = $('.ctn_lay_uv').attr('data-id')
	// 		var qh_id = $('.ctn_lay_uv').attr('data-qh')
	// 		var mien_id = $('.ctn_lay_uv').attr('data-mien')
	// 		if (!data_s && !cit_id && !qh_id && !mien_id) {
	// 			$.ajax({
	// 				url: '/ajax/get_ndnv_online_v2.php',
	// 				type: 'POST',
	// 				data: {
	// 					online_id: userId,
	// 					data: data_s,
	// 					cit_id: cit_id,
	// 					qh_id: qh_id,
	// 					mien_id: mien_id,
	// 				},
	// 				success: function (data) {
	// 					if (data != '') {
	// 						// check là page UV tia sét thì k dùng
	// 						if ($('#box_nd_uv').parents('.contain_list_uv_badge').length == 0) {
	// 							$(data).prependTo('#box_nd_uv')
	// 							$('#box_nd_uv').find('.s-row-nd:last').remove()
	// 						}
	// 					}
	// 				},
	// 			})
	// 		}
	// 	}
	// })

	// socket.on('Logout', (userId) => {
	// 	var index = arr_online.indexOf(userId)
	// 	if (index !== -1) {
	// 		arr_online.splice(index, 1)
	// 	}
	// 	$('.online_item[id-chat="' + userId + '"]').hide()
	// 	$('.job_chat[id-chat="' + userId + '"]').removeClass('m_online')
	// 	$('.uv_chat[id-chat="' + userId + '"]').removeClass('m_online')
	// 	//th
	// 	$('.logo_user_th[id-chat="' + userId + '"]').removeClass('m_online')
	// 	$('.no_logo_chat[id-chat="' + userId + '"]')
	// 		.attr('src', '/images/user_chat_off.png')
	// 		.attr('data-src', '/images/user_chat_off.png')
	// 	$('.chat_call[id-chat="' + userId + '"]').removeClass('m_online')
	// 	$('.btn_chat_now[id-chat="' + userId + '"]').removeClass('m_online')

	// 	if ($('[id-chat="' + userId + '"]').find('.box_time_off').length > 0) {
	// 		$('[id-chat="' + userId + '"]')
	// 			.find('.box_time_off')
	// 			.show()
	// 			.text('1 giây')
	// 		// $.ajax({
	// 		//     url: "/ajax/get_time_offline.php",
	// 		//     type: "POST",
	// 		//     data: {
	// 		//         userId: userId,
	// 		//     },
	// 		//     success: function(data) {
	// 		//         if (data != '') {
	// 		//             $('[id-chat="' + userId + '"]').find('.box_time_off').text(data);
	// 		//         } else {
	// 		//             $('[id-chat="' + userId + '"]').find('.box_time_off').text("1 phút");
	// 		//         }
	// 		//     }
	// 		// });
	// 	}
	// })

	// socket.on('Logout_reload', (userId) => {
	// 	var offline_user = get_Cookie_c('offline_user')
	// 	if (offline_user == userId && userId != 0) {
	// 		window.location.reload()
	// 	}
	// })

	function remove_on(id) {
		// ẩn box thông báo
		$('.tb_chat365').hide()
		$('#xh_f').remove()
	}

	function close_tb() {
		if (chat365 != '') {
			document.cookie = 'chat365=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
		}
		$('.tb_chat365').hide()
		$('.pop_ut_success').hide()
		$('#xh_f').remove()
	}

	function show_login() {
		$('.overlay').show()
	}

	function get_chat_name(id_chat) {
		let res = ''
		$.ajax({
			url: '/ajax/get_name_chat.php',
			type: 'POST',
			data: {
				id_chat,
			},
			dataType: 'JSON',
			async: false,
			success: function (data) {
				res = data
			},
		})
		return res
	}
	var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
	var btn_chat = '.job_chat,.job_chat_th,.job_chat_cty,.job_chat_tb,.openApp,.chat_notifice'
	// if (id_chat365 == 167567) {
	//     alert('test');
	//     isMac = true;
	// }
	// $(document).on('click', function(e) {
	//     $('.box_show_qrchat').hide();
	// })
	$(document).on('click', function (e) {
		let container = $(btn_chat)
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$('.popup_chat_info').hide()
		}
	})
	$(document).on('click', `${btn_chat}`, function () {
		var x = $(this).attr('id-chat')
		var conv_id = $(this).attr('conv_id')
		let check_ip = $('#new_header').length ? $('#new_header').attr('data-checkip') : 0
		let list_use_web = [266381, 1419055, 1428683, 1242119]
		console.log(12312131)
		if (list_use_web.indexOf(Number(id_chat365)) != -1) {
			if (id_chat365 > 0) {
				if (x > 0) {
					$.ajax({
						url: '/ajax/chat_now.php',
						type: 'POST',
						data: {
							u_id: x,
							type: 0,
						},
						success: function (data) {
							if (data != '') {
								//Thêm setTimeout do safari không ăn window.open
								setTimeout(() => {
									window.open(data, '_blank')
								})
							}
						},
					})
				} else {
					setTimeout(() => {
						window.open('https://chat365.timviec365.vn/', '_blank')
					})
				}
			} else {
				$('.overlay').show()
			}
		} else {
			if (isMac || isMobile.any()) {
				let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
					id_chat365
				)}%26contactId=${btoa(x)}%26type365=${uid_type}`
				if (conv_id) {
					link_qr += `%26conversationId=${btoa(conv_id)}`
				}
				link_qr += `&efr=1`
				if (isMobile.any()) {
					setTimeout(() => {
						window.open(link_qr, '_blank')
					})
				} else {
					let data_chat = get_chat_name(x)
					$(`${btn_chat}`).find('.popup_chat_info').hide()
					if (!$(this).find('.popup_chat_info').length) {
						let html = `
                        <div class="popup_chat_info">
                        <div class="chat_avatar">
                        <img src="${data_chat.avatar}" alt="ảnh đại diện">
                        </div>
                        <div class="chat_info">
                        <p class="chat_name">${data_chat.name}</p>
                        <p class="chat_text">Quét mã QR tải Chat365 để trò chuyện với ${data_chat.name}</p>
                        </div>
                        <div class="chat_info_qr">

                        </div>
                        </div>`
						if (!data_chat.avatar && !data_chat.name) {
							html = `
                        <div class="popup_chat_info">
                        <div class="chat_info">
                        <p class="chat_name">${data_chat.name}</p>
                        <p class="chat_text">Quét mã QR tải Chat365 để trò chuyện ${data_chat.name}</p>
                        </div>
                        <div class="chat_info_qr">

                        </div>
                        </div>`
						}
						let qr_box = ''
						if ($('.box_show_qrchat').length) {
							$('.box_show_qrchat').html('').append(html)
							qr_box = $('.box_show_qrchat').find('.chat_info_qr')[0]
							$('.box_show_qrchat').show()
						} else {
							$(this).css('position', 'relative').css('z-index', '9999').append(html)
							qr_box = $(this).find('.chat_info_qr')[0]
						}
						var QR_CODE = new QRCode(qr_box, {
							width: 185,
							height: 185,
							colorDark: '#000000',
							colorLight: '#ffffff',
							correctLevel: QRCode.CorrectLevel.L,
						})
						QR_CODE.makeCode(link_qr)
						$(this).find('.popup_chat_info').show()
					}
				}
			} else {
				openChat(x, linkChatWf, conv_id)
			}
		}
		// else {
		//     if (isMac || isMobile.any()) {
		//         let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(id_chat365)}%26contactId=${btoa(x)}%26type365=${uid_type}`;
		//         if (conv_id) {
		//             link_qr += `%26conversationId=${btoa(conv_id)}`;
		//         }
		//         link_qr += `&efr=1`;
		//         if (isMobile.any()) {
		//             if (isMobile.iOS()) {
		//                 if (id_chat365 > 0) {
		//                     if (x > 0) {
		//                         $.ajax({
		//                             url: "/ajax/chat_now.php",
		//                             type: "POST",
		//                             data: {
		//                                 u_id: x,
		//                                 type: 1
		//                             },
		//                             success: function(data) {
		//                                 if (data != '') {

		//                                     //Thêm setTimeout do safari không ăn window.open
		//                                     setTimeout(() => {
		//                                         window.open(data, '_blank');
		//                                     })
		//                                 }
		//                             }
		//                         });
		//                     } else {
		//                         setTimeout(() => {
		//                             window.open('https://chat365.timviec365.vn/', '_blank');
		//                         })
		//                     }
		//                 } else {
		//                     $('.overlay').show();
		//                 }
		//             } else {
		//                 setTimeout(() => {
		//                     window.open(link_qr, '_blank');
		//                 })
		//             }
		//         } else {
		//             let data_chat = get_chat_name(x);
		//             $(`${btn_chat}`).find('.popup_chat_info').hide();
		//             if (!$(this).find('.popup_chat_info').length) {
		//                 let html = `
		//                         <div class="popup_chat_info">
		//                         <div class="chat_avatar">
		//                         <img src="${data_chat.avatar}" alt="ảnh đại diện">
		//                         </div>
		//                         <div class="chat_info">
		//                         <p class="chat_name">${data_chat.name}</p>
		//                         <p class="chat_text">Quét mã QR tải Chat365 để trò chuyện với ${data_chat.name}</p>
		//                         </div>
		//                         <div class="chat_info_qr">

		//                         </div>
		//                         </div>`;
		//                 if (!data_chat.avatar && !data_chat.name) {
		//                     html = `
		//                         <div class="popup_chat_info">
		//                         <div class="chat_info">
		//                         <p class="chat_name">${data_chat.name}</p>
		//                         <p class="chat_text">Quét mã QR tải Chat365 để trò chuyện ${data_chat.name}</p>
		//                         </div>
		//                         <div class="chat_info_qr">

		//                         </div>
		//                         </div>`;
		//                 }
		//                 let qr_box = '';
		//                 if ($('.box_show_qrchat').length) {
		//                     $('.box_show_qrchat').html('').append(html);
		//                     qr_box = $('.box_show_qrchat').find('.chat_info_qr')[0];
		//                     $('.box_show_qrchat').show();
		//                 } else {
		//                     $(this).css('position', 'relative').css('z-index', '9999').append(html);
		//                     qr_box = $(this).find('.chat_info_qr')[0];
		//                 }
		//                 var QR_CODE = new QRCode(qr_box, {
		//                     width: 185,
		//                     height: 185,
		//                     colorDark: "#000000",
		//                     colorLight: "#ffffff",
		//                     correctLevel: QRCode.CorrectLevel.L,
		//                 });
		//                 QR_CODE.makeCode(link_qr);
		//                 $(this).find('.popup_chat_info').show();
		//             }
		//         }

		//     } else {
		//         openChat(x, linkChatWf, conv_id)
		//     }
		// }
	})

	$('.uv_chat').click(function () {
		var x = $(this).attr('id-chat')
		if (id_chat365 > 0 && uid_type == 1) {
			// if (x > 0) {
			// 	$.ajax({
			// 		url: "/ajax/chat_now.php",
			// 		type: "POST",
			// 		data: {
			// 			u_id : x,
			// 			type : 0
			// 		},
			// 		success: function(data) {
			// 			if (data != '') {
			// 				window.open(data, 'myChat').focus();
			// 			}
			// 		}
			// 	});
			// }
		} else {
			$('.overlay').show()
		}
	})

	$('.close_pop_login').click(function () {
		$('.overlay').hide()
	})

	$('.chat_notifice').click(function () {
		var cov_id = $(this).attr('co-id')
		if (cov_id > 0) {
			$.ajax({
				url: '/ajax/get_link_chat.php',
				type: 'POST',
				data: {
					cv_id: cov_id,
					my_id: id_chat365,
				},
				success: function (data) {
					//Thêm setTimeout do safari không ăn window.open
					setTimeout(() => {
						window.open(data, '_blank')
					})
				},
			})
		} else {
			if (uid > 0) {
				console.log(uid)
				//Thêm setTimeout do safari không ăn window.open
				// setTimeout(() => {
				//     window.open("https://chat365.timviec365.vn/", "_blank");
				// })
			}
		}
	})

	$('.chat_call').click(function () {
		setCookie_c('op_chat')
	})

	function iOS() {
		return (
			['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
			// iPad on iOS 13 detection
			(navigator.userAgent.includes('Mac') && 'ontouchend' in document)
		)
	}
	if (iOS()) {
		$('.ios_check').each(function (index) {
			var rl_href = $(this).attr('ios-href')
			if (rl_href != '') {
				$(this).attr('href', rl_href).removeAttr('target')
			}
		})
	}

	function openChat(id_chat, link_chat, conv_id = 0) {
		const kt = {
			success: 'success',
			cancel: 'cancel',
			unsupport: 'unsupport',
		}
		const r = 1500
		conv_id = conv_id != 0 ? btoa(conv_id) : ''
		let id_chat_send = id_chat365 ? id_chat365 : 0,
			type_send = uid_type ? uid_type : 0
		id_chat = id_chat ? id_chat : 0
		let e = `chat365:/${btoa(id_chat_send)}/${btoa(id_chat)}/${type_send}/${conv_id}`
		if (!conv_id) {
			e = `chat365:/${btoa(id_chat_send)}/${btoa(id_chat)}/${type_send}`
		}
		console.log(e)
		const t = () => {
			'unsupport' === t && (null === e || void 0 === e || e())
		}
		const n = {
			name: 'chrome',
			alertW: 500,
			alertH: 125,
		}
		var a =
			document.querySelector('#hiddenIframe') ||
			(((a = document.createElement('iframe')).id = 'hiddenIframe'), (a.style.display = 'none'), document.body.appendChild(a))
		let o = setTimeout(function () {
				runDownload(link_chat)
				// if (confirm('Bạn chưa có ứng dụng Chat365 trên máy tính. Vui lòng tải ứng dụng này để có thể tiếp tục cuộc trò chuyện.')) {
				//Thêm setTimeout do safari không ăn window.open
				// setTimeout(() => {
				//     window.open(link_chat, 'download');
				// })

				// runXHR(link_chat, 'download');
				// }
			}, r),
			i = {}

		function l() {
			clearTimeout(o)
		}
		window.addEventListener('blur', l),
			window.addEventListener('focus', function e() {
				setTimeout(function () {
					document.hasFocus()
						? t(
								(function (e) {
									if (!e.x) return !0
									var t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
										r = n.alertW,
										a = n.alertH,
										o = e.x - 100 < 0.5 * (t + r) && e.x + 100 > 0.5 * (t + r),
										i = e.y - 40 < a && e.y + 40 > a
									return o && i
								})(i)
									? kt.cancel
									: kt.success
						  )
						: t(kt.success),
						window.removeEventListener('focus', e),
						window.removeEventListener('blur', l)
				}, 500)
			}),
			(a.contentWindow.location.href = e)
	}

	function openChatMobile(id_chat, conv_id = 0) {
		let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
			id_chat365
		)}%26contactId=${btoa(id_chat)}%26type365=${uid_type}`
		if (conv_id) {
			link_qr += `%26conversationId=${btoa(conv_id)}`
		}
		link_qr += `&efr=1`
		setTimeout(() => {
			window.location.href = link_qr
		}, 200)
	}

	function openChatMac(id_chat, conv_id = 0) {
		let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
			id_chat365
		)}%26contactId=${btoa(id_chat)}%26type365=${uid_type}`
		if (conv_id) {
			link_qr += `%26conversationId=${btoa(conv_id)}`
		}
		link_qr += `&efr=1`
		$('.popup_send_chat').find('.qr_area').html('')
		let qr_box = $('.popup_send_chat').find('.qr_area')[0]
		var QR_CODE = new QRCode(qr_box, {
			width: 110,
			height: 110,
			colorDark: '#000000',
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.L,
		})
		QR_CODE.makeCode(link_qr)
		$('.popup_send_chat').show()
		$('.popup_send_chat .download_mobile').hide()
		$('.popup_send_chat .download_pc .btn_area').hide()
	}

	$(document).on('ready', function () {
		//Mở app chat sau khi tải CV
		if ($('.popup_send_chat').hasClass('show_cv')) {
			if (isMobile.any()) {
				openChatMobile(1191)
			} else if (isMac) {
				openChatMac(1191)
			} else {
				openChat(0, linkChatWf, 'SendCv')
			}
		}
	})
})
