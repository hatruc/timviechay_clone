async function downloadURI(uri, name = '') {
	var link = document.createElement('a')
	// If you don't know the name or want to use
	// the webserver default set name = ''
	link.setAttribute('download', name)
	link.href = uri
	document.body.appendChild(link)
	link.click()
	link.remove()
	return true
}

$(function () {
	//Initial json data
	var data = {
		css: [],
		lt_title: '',
		avatar: '',
		profile: [],
	}

	//Get content and export to json data
	$.exportData = function () {
		data['css'] = {
			color: $('#toolbar-color .color.active').attr('data-color'),
			font: $('#font-selector').find('option:selected').val(),
			font_size: $('#cvo-toolbar .fontsize.active').attr('data-size'),
			font_spacing: $('#cvo-toolbar .line-height.active').attr('data-spacing'),
		}
		var lt_title = $('#letter-title').text()
		if (lt_title == '') {
			lt_title = $('#tit_alias').val()
		}
		data['lt_title'] = lt_title
		data['avatar'] = $('#cvo-profile-avatar').attr('src')
		var giadinh = $('#giadinh').html()
		// giadinh = giadinh.replace(/<(?!br\s*\/?)[^>]+>/g, '');
		data['profile'] = {
			hoten: $('#hoten').text(),
			gioitinh: $('#gioitinh').text(),
			ns_ngay: $('#ns_ngay').text(),
			ns_thang: $('#ns_thang').text(),
			ns_nam: $('#ns_nam').text(),
			dk_tt: $('#dk_tt').text(),
			cmtnd: $('#cmtnd').text(),
			noicap: $('#noicap').text(),
			cm_ngay: $('#cm_ngay').text(),
			cm_thang: $('#cm_thang').text(),
			cm_nam: $('#cm_nam').text(),
			dt_home: $('#dt_home').text(),
			mobile: $('#mobile').text(),
			baotin: $('#baotin').html(),
			sohieu: $('#sohieu').text(),
			kyhieu: $('#kyhieu').text(),
			hoten_p2: $('#hoten_p2').text(),
			bidanh: $('#bidanh').text(),
			tenthuonggoi: $('#tenthuonggoi').text(),
			ns_ngay_p2: $('#ns_ngay_p2').text(),
			ns_thang_p2: $('#ns_thang_p2').text(),
			ns_nam_p2: $('#ns_nam_p2').text(),
			tai_p2: $('#tai_p2').text(),
			nguyenquan: $('#nguyenquan').text(),
			dk_tt_p2: $('#dk_tt_p2').text(),
			dantoc: $('#dantoc').text(),
			tongiao: $('#tongiao').text(),
			thanhphan_gd: $('#thanhphan_gd').text(),
			thanhphan_bt: $('#thanhphan_bt').text(),
			vanhoa: $('#vanhoa').text(),
			ngoaingu: $('#ngoaingu').text(),
			chuyenmon: $('#chuyenmon').text(),
			loaihinh_dt: $('#loaihinh_dt').text(),
			chuyennganh_dt: $('#chuyennganh_dt').text(),
			dang_ngay: $('#dang_ngay').text(),
			dang_thang: $('#dang_thang').text(),
			dang_nam: $('#dang_nam').text(),
			dang_ketnap: $('#dang_ketnap').text(),
			doan_ngay: $('#doan_ngay').text(),
			doan_thang: $('#doan_thang').text(),
			doan_nam: $('#doan_nam').text(),
			doan_ketnap: $('#doan_ketnap').text(),
			suckhoe: $('#suckhoe').text(),
			cao: $('#cao').text(),
			can_nang: $('#can_nang').text(),
			dang_thang: $('#dang_thang').text(),
			nghenghiep_chuyenmon: $('#nghenghiep_chuyenmon').text(),
			capbac: $('#capbac').text(),
			luongchinh: $('#luongchinh').text(),
			ngaynhapngu: $('#ngaynhapngu').text(),
			ngayxuatngu: $('#ngayxuatngu').text(),
			lydo_p2: $('#lydo_p2').text(),
			htbo: $('#htbo').text(),
			tuoibo: $('#tuoibo').text(),
			nn_bo: $('#nn_bo').text(),
			bo_thang8: $('#bo_thang8').text(),
			bo_khangphap: $('#bo_khangphap').text(),
			bo_1955: $('#bo_1955').html(),
			htme: $('#htme').text(),
			tuoime: $('#tuoime').text(),
			nn_me: $('#nn_me').text(),
			me_thang8: $('#me_thang8').text(),
			me_khangphap: $('#me_khangphap').text(),
			me_1955: $('#me_1955').html(),
			giadinh: giadinh,
			hotenvc: $('#hotenvc').text(),
			tuoivc: $('#tuoivc').text(),
			nn_vc: $('#nn_vc').text(),
			noi_nn_vc: $('#noi_nn_vc').text(),
			noio_vc: $('#noio_vc').text(),
			tencon1: $('#tencon1').text(),
			tuoicon1: $('#tuoicon1').text(),
			nn_con1: $('#nn_con1').text(),
			tencon2: $('#tencon2').text(),
			tuoicon2: $('#tuoicon2').text(),
			nn_con2: $('#nn_con2').text(),
			tencon3: $('#tencon3').text(),
			tuoicon3: $('#tuoicon3').text(),
			nn_con3: $('#nn_con3').text(),
			tencon4: $('#tencon4').text(),
			tuoicon4: $('#tuoicon4').text(),
			nn_con4: $('#nn_con4').text(),
			tencon5: $('#tencon5').text(),
			tuoicon5: $('#tuoicon5').text(),
			nn_con5: $('#nn_con5').text(),

			ht_day: $('#ht_day').html(),
			ht_congtac: $('#ht_congtac').html(),
			ht_odau: $('#ht_odau').html(),
			ht_chucvu: $('#ht_chucvu').html(),
			khenthuong: $('#khenthuong').text(),
			kyluat: $('#kyluat').text(),
			xacnhan: $('#xacnhan').text(),
			local: $('#local').text(),
			local_ngay: $('#local_ngay').text(),
			local_thang: $('#local_thang').text(),
			local_nam: $('#local_nam').text(),
		}
		//export data for box menu

		var ar_data = JSON.stringify(data)
		var ltid = $('#ltid').val()
		var lang = $('#cvo-toolbar-lang .active').attr('data-lang')
		var name_img = $('#cvo-profile-avatar').attr('src')
		const cookie = Cookies.get('work247_token')

		$.ajax({
			cache: false,
			type: 'POST',
			url: 'https://api.timviec365.vn/api/timviec/syll/save',
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', `Bearer ${cookie}`)
			},
			data: { id: ltid, html: ar_data, lang: lang },
			success: function (result) {
				console.log(result)
				if (result?.data?.result) {
					console.log(result?.data?.data?.link_download)
					downloadURI(result?.data?.data?.link_download)
					setTimeout(() => {
						$('.bg-spinner').remove()
						window.alert('Lưu sơ yếu lý lịch thành công')
						//handle download fil ehere

						window.location.href = '/ung-vien/danh-sach-mau-syll'
					}, 10000)
				}
			},
		})
		console.log(JSON.stringify(data))
	}
	var is_busy = false
	$('#btn-save-file').on('click', function () {
		data['css'] = {
			color: $('#toolbar-color .color.active').attr('data-color'),
			font: $('#font-selector').find('option:selected').val(),
			font_size: $('#cvo-toolbar .fontsize.active').attr('data-size'),
			font_spacing: $('#cvo-toolbar .line-height.active').attr('data-spacing'),
		}
		var lt_title = $('#letter-title').text()
		if (lt_title == '') {
			lt_title = $('#tit_alias').val()
		}
		data['lt_title'] = lt_title
		data['avatar'] = $('#cvo-profile-avatar').attr('src')
		var giadinh = $('#giadinh').html()
		// giadinh = giadinh.replace(/<(?!br\s*\/?)[^>]+>/g, '');
		data['profile'] = {
			hoten: $('#hoten').text(),
			gioitinh: $('#gioitinh').text(),
			ns_ngay: $('#ns_ngay').text(),
			ns_thang: $('#ns_thang').text(),
			ns_nam: $('#ns_nam').text(),
			dk_tt: $('#dk_tt').text(),
			cmtnd: $('#cmtnd').text(),
			noicap: $('#noicap').text(),
			cm_ngay: $('#cm_ngay').text(),
			cm_thang: $('#cm_thang').text(),
			cm_nam: $('#cm_nam').text(),
			dt_home: $('#dt_home').text(),
			mobile: $('#mobile').text(),
			baotin: $('#baotin').html(),
			sohieu: $('#sohieu').text(),
			kyhieu: $('#kyhieu').text(),
			hoten_p2: $('#hoten_p2').text(),
			bidanh: $('#bidanh').text(),
			tenthuonggoi: $('#tenthuonggoi').text(),
			ns_ngay_p2: $('#ns_ngay_p2').text(),
			ns_thang_p2: $('#ns_thang_p2').text(),
			ns_nam_p2: $('#ns_nam_p2').text(),
			tai_p2: $('#tai_p2').text(),
			nguyenquan: $('#nguyenquan').text(),
			dk_tt_p2: $('#dk_tt_p2').text(),
			dantoc: $('#dantoc').text(),
			tongiao: $('#tongiao').text(),
			thanhphan_gd: $('#thanhphan_gd').text(),
			thanhphan_bt: $('#thanhphan_bt').text(),
			vanhoa: $('#vanhoa').text(),
			ngoaingu: $('#ngoaingu').text(),
			chuyenmon: $('#chuyenmon').text(),
			loaihinh_dt: $('#loaihinh_dt').text(),
			chuyennganh_dt: $('#chuyennganh_dt').text(),
			dang_ngay: $('#dang_ngay').text(),
			dang_thang: $('#dang_thang').text(),
			dang_nam: $('#dang_nam').text(),
			dang_ketnap: $('#dang_ketnap').text(),
			doan_ngay: $('#doan_ngay').text(),
			doan_thang: $('#doan_thang').text(),
			doan_nam: $('#doan_nam').text(),
			doan_ketnap: $('#doan_ketnap').text(),
			suckhoe: $('#suckhoe').text(),
			cao: $('#cao').text(),
			can_nang: $('#can_nang').text(),
			dang_thang: $('#dang_thang').text(),
			nghenghiep_chuyenmon: $('#nghenghiep_chuyenmon').text(),
			capbac: $('#capbac').text(),
			luongchinh: $('#luongchinh').text(),
			ngaynhapngu: $('#ngaynhapngu').text(),
			ngayxuatngu: $('#ngayxuatngu').text(),
			lydo_p2: $('#lydo_p2').text(),
			htbo: $('#htbo').text(),
			tuoibo: $('#tuoibo').text(),
			nn_bo: $('#nn_bo').text(),
			bo_thang8: $('#bo_thang8').text(),
			bo_khangphap: $('#bo_khangphap').text(),
			bo_1955: $('#bo_1955').html(),
			htme: $('#htme').text(),
			tuoime: $('#tuoime').text(),
			nn_me: $('#nn_me').text(),
			me_thang8: $('#me_thang8').text(),
			me_khangphap: $('#me_khangphap').text(),
			me_1955: $('#me_1955').html(),
			giadinh: giadinh,
			hotenvc: $('#hotenvc').text(),
			tuoivc: $('#tuoivc').text(),
			nn_vc: $('#nn_vc').text(),
			noi_nn_vc: $('#noi_nn_vc').text(),
			noio_vc: $('#noio_vc').text(),
			tencon1: $('#tencon1').text(),
			tuoicon1: $('#tuoicon1').text(),
			nn_con1: $('#nn_con1').text(),
			tencon2: $('#tencon2').text(),
			tuoicon2: $('#tuoicon2').text(),
			nn_con2: $('#nn_con2').text(),
			tencon3: $('#tencon3').text(),
			tuoicon3: $('#tuoicon3').text(),
			nn_con3: $('#nn_con3').text(),
			tencon4: $('#tencon4').text(),
			tuoicon4: $('#tuoicon4').text(),
			nn_con4: $('#nn_con4').text(),
			tencon5: $('#tencon5').text(),
			tuoicon5: $('#tuoicon5').text(),
			nn_con5: $('#nn_con5').text(),

			ht_day: $('#ht_day').html(),
			ht_congtac: $('#ht_congtac').html(),
			ht_odau: $('#ht_odau').html(),
			ht_chucvu: $('#ht_chucvu').html(),
			khenthuong: $('#khenthuong').text(),
			kyluat: $('#kyluat').text(),
			xacnhan: $('#xacnhan').text(),
			local: $('#local').text(),
			local_ngay: $('#local_ngay').text(),
			local_thang: $('#local_thang').text(),
			local_nam: $('#local_nam').text(),
		}
		//export data for box menu

		var ar_data = JSON.stringify(data)
		var height_cv = $('#page-letter').height()
		var lang = $('#cvo-toolbar-lang .active').attr('data-lang')
		if ($(window).width() < 1300) {
			$(window).scrollTop(0)
			$(window).scrollLeft(0)
		}
		$('.bg-spinner').remove()
		$('body').append(
			'<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
		)
		$.exportData()
		//Luu file anh

		// html2canvas($('#form-letter'), {
		// 	onrendered: function (canvas) {
		// 		img_val = []
		// 		var val_img = canvas.toDataURL('image/png', 1.0)
		// 		var part1 = val_img.substring(0, val_img.length / 3)
		// 		var part2 = val_img.substring(val_img.length / 3, (2 * val_img.length) / 3)
		// 		var part3 = val_img.substring((2 * val_img.length) / 3)
		// 		img_val.push(part1)
		// 		img_val.push(part2)
		// 		img_val.push(part3)
		// 		var uid = $('#uid_letter').val()
		// 		var ltid = $('#ltid').val()
		// 		if (is_busy == true) {
		// 			return false
		// 		}
		// 		var token = $('#token').val()
		// 		$.ajax({
		// 			cache: false,
		// 			type: 'POST',
		// 			url: 'https://api.timviec365.vn/api/timviec/syll/save',
		// 			data: {
		// 				img_val: img_val,
		// 				uid: uid,
		// 				id: ltid,
		// 				type: 3,
		// 				ar_data: ar_data,
		// 				height_cv: height_cv,
		// 				lang: lang,
		// 			},
		// 			success: function () {
		// 				var msg = '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'
		// 				msg +=
		// 					'<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'
		// 				msg += 'Lưu sơ yếu lý lịch thành công</div></div>'
		// 				msg += '<div class="el-message-box__btns">'
		// 				msg +=
		// 					'<button type="button" onclick="hidemsg()" class="el-button el-button--default el-button--primary "><span>Đồng ý</span></button></div></div></div>'
		// 				$('body').append(msg)
		// 				$('.bg-spinner').remove()
		// 				is_busy = false
		// 				window.location.href = '/ung-vien/danh-sach-mau-syll'
		// 				//window.location.href = 'http://localhost:9000/cv365/luu-so-yeu-ly-lich/' + token + '-' + ltid;
		// 			},
		// 		})
		// 	},
		// })
		//////////////////////
	})

	//Them tool
	$(document).on('click', '#cvo-toolbar-lang .btn-lang-option', function () {
		//$('#cvo-toolbar-lang .btn-lang-option').removeClass('active');
		//$(this).addClass('active');
		var lang = $(this).attr('data-lang')
		$.ajax({
			cache: false,
			type: 'POST',
			url: 'site/loadLang',
			dataType: 'json',
			data: { lang: lang },
			success: function (result) {
				location.reload()
			},
		})
	})
	$(document).on('click', '#toolbar-color .color', function (e) {
		$('#toolbar-color .color').removeClass('active')
		$(this).addClass('active')
		var newcolor = $(this).attr('data-color')
		var oldlink = $('#cv-color-css').attr('href')
		var newlink = oldlink.slice(0, oldlink.lastIndexOf('/')) + '/' + newcolor + '.css'
		$('#cv-color-css').attr('href', newlink)
	})
	$(document).on('change', '#toolbar-font #font-selector', function (e) {
		var newfont = $(this).find('option:selected').val()
		var oldlink = $('#cv-font').attr('href')
		var newlink = oldlink.slice(0, oldlink.lastIndexOf('/')) + '/' + newfont + '.css'
		$('#cv-font').attr('href', newlink)
	})
	$(document).on('click', '#cvo-toolbar .fontsize', function (e) {
		$('#cvo-toolbar .fontsize').removeClass('active')
		$(this).addClass('active')
		var newsize = $(this).attr('data-size')
		var oldlink = $('#cv-font-size').attr('href')
		var newlink = oldlink.slice(0, oldlink.lastIndexOf('/')) + '/' + newsize + '.css'
		$('#cv-font-size').attr('href', newlink)
	})
	$(document).on('click', '#cvo-toolbar .line-height', function (e) {
		$('#cvo-toolbar .line-height').removeClass('active')
		$(this).addClass('active')
		var newspacing = $(this).attr('data-spacing')
		var oldlink = $('#cv-cpacing-css').attr('href')
		var newlink = oldlink.slice(0, oldlink.lastIndexOf('/')) + '/' + newspacing + '.css'
		$('#cv-cpacing-css').attr('href', newlink)
	})
})
