function downloadURI(uri, name = '') {
	var link = document.createElement('a')
	// If you don't know the name or want to use
	// the webserver default set name = ''
	link.setAttribute('download', name)
	link.href = uri
	document.body.appendChild(link)
	link.click()
	link.remove()
}
$(function () {
	//Initial json data
	var data = {
		css: [],
		lt_title: '',
		profile: [],
		lto_day: '',
		user_to: '',
		content: '',
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
			lt_title = 'ĐXV ' + $('#lto-name').text()
		}
		data['lt_title'] = lt_title
		data['profile'] = {
			name: $('#lto-name').text(),
			address: $('#lto-address').text(),
			birthday: $('#lto-birthday').text(),
		}
		data['user_to'] = $('#lto-user-to').html()
		var content = $('#lto-content').html()
		data['content'] = content
		data['local'] = $('#lto-local').text()
		data['ngay'] = $('#lto-ngay').text()
		data['thang'] = $('#lto-thang').text()
		data['nam'] = $('#lto-nam').text()
		data['user_don'] = $('#lto-user_don').html()
		//export data for box menu

		var ar_data = JSON.stringify(data)
		var ltid = $('#ltid').val()
		var lang = $('#cvo-toolbar-lang .active').attr('data-lang')
		$.ajax({
			cache: false,
			type: 'POST',
			url: 'site/save_don',
			dataType: 'json',
			data: { ltid: ltid, ar_data: ar_data, lang: lang },
			success: function (result) {},
		})
		console.log(JSON.stringify(data))
	}
	var is_busy = false
	$('#btn-save-file').on('click', function () {
		if ($(window).width() < 1300) {
			$(window).scrollTop(0)
			$(window).scrollLeft(0)
		}
		$('.bg-spinner').remove()
		$('body').append(
			'<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
		)

		// export data
		data['css'] = {
			color: $('#toolbar-color .color.active').attr('data-color'),
			font: $('#font-selector').find('option:selected').val(),
			font_size: $('#cvo-toolbar .fontsize.active').attr('data-size'),
			font_spacing: $('#cvo-toolbar .line-height.active').attr('data-spacing'),
		}
		var lt_title = $('#letter-title').text()
		if (lt_title == '') {
			lt_title = 'ĐXV ' + $('#lto-name').text()
		}
		data['lt_title'] = lt_title
		data['profile'] = {
			name: $('#lto-name').text(),
			address: $('#lto-address').text(),
			birthday: $('#lto-birthday').text(),
		}
		data['user_to'] = $('#lto-user-to').html()
		var content = $('#lto-content').html()
		data['content'] = content
		data['local'] = $('#lto-local').text()
		data['ngay'] = $('#lto-ngay').text()
		data['thang'] = $('#lto-thang').text()
		data['nam'] = $('#lto-nam').text()
		data['user_don'] = $('#lto-user_don').html()
		//export data for box menu

		var ar_data = JSON.stringify(data)
		var ltid = $('#ltid').val()
		var lang = $('#cvo-toolbar-lang .active').attr('data-lang')
		var uid = $('#uid_letter').val()
		// end export data

		// cookie
		const cookie = Cookies.get('work247_token')
		console.log(cookie)
		//Luu file anh
		html2canvas(document.querySelector('#form-letter')).then(function (canvas) {
			var img_val = canvas.toDataURL('image/png', 1.0)
			$.ajax({
				cache: false,
				type: 'POST',
				url: 'https://api.timviec365.vn/api/timviec/appli/save',
				headers: { Authorization: `Bearer ${cookie}` },
				data: { id: ltid, html: ar_data, lang: lang, name_img: `u_don_${Math.floor(Date.now() / 1000)}` },
				success: function (data) {
					console.log(data?.data?.data?.link_download)
					downloadURI(data?.data?.data?.link_download)
					setTimeout(() => {
						$('.bg-spinner').remove()
						window.location.href = '/ung-vien/danh-sach-mau-don'
					}, 5000)
				},
				error: (err) => {
					console.log(err)
					$('.bg-spinner').remove()
				},
			})
		})
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

// $(window).scroll(function () {
// 	if ($(this).scrollTop() >= 420 && $('#cvo-toolbar').hasClass('fx') == false) {
// 		$('#cvo-toolbar').addClass('fx')
// 	}
// 	if ($(this).scrollTop() < 420 && $('#cvo-toolbar').hasClass('fx') == true) {
// 		$('#cvo-toolbar').removeClass('fx')
// 	}
// })
