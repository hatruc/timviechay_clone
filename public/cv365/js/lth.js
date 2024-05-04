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
		avatar: '',
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
			lt_title = $('#tit_alias').val()
		}
		data['lt_title'] = lt_title
		data['avatar'] = $('#cvo-profile-avatar').attr('src')
		data['profile'] = {
			lto_name: $('#lto-name').text(),
			lto_job: $('#lto-job').text(),
			lto_about: $('#lto-about').text(),
			lto_address: $('#lto-address').text(),
			lto_email: $('#lto-email').text(),
			lto_phone: $('#lto-phone').text(),
		}
		data['lto_day'] = $('#lto-day').text()
		data['user_to'] = $('#lto-user-to').text()
		var content = $('#lto-content').html()
		content = content.replace(/<(?!br\s*\/?)[^>]+>/g, '')
		data['content'] = content
		//export data for box menu

		var ar_data = JSON.stringify(data)
		var ltid = $('#ltid').val()
		var lang = $('#cvo-toolbar-lang .active').attr('data-lang')
		const cookie = Cookies.get('work247_token')
		$.ajax({
			cache: false,
			type: 'POST',
			url: 'https://api.timviec365.vn/api/timviec/letter/saveThu',
			dataType: 'json',
			data: { id: ltid, html: ar_data, lang: lang, name_img: $('#cvo-profile-avatar').attr('src') },
			headers: {
				Authorization: `Bearer ${cookie}`,
			},
			success: function (res) {
				const result = res?.data
				console.log(result)
				if (result == true) {
					alert('Lưu thành công!')
				} else {
					alert('Lỗi khi lưu!')
				}
			},
		})
		console.log(JSON.stringify(data))
	}
	var is_busy = false
	$('#btn-save-file').on('click', function () {
		console.log('hehehe')
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
		data['profile'] = {
			lto_name: $('#lto-name').text(),
			lto_job: $('#lto-job').text(),
			lto_about: $('#lto-about').text(),
			lto_address: $('#lto-address').text(),
			lto_email: $('#lto-email').text(),
			lto_phone: $('#lto-phone').text(),
		}
		data['lto_day'] = $('#lto-day').text()
		data['user_to'] = $('#lto-user-to').text()
		var content = $('#lto-content').html()
		content = content.replace(/<(?!br\s*\/?)[^>]+>/g, '')
		data['content'] = content
		//export data for box menu

		var ar_data = JSON.stringify(data)
		var lang = $('#cvo-toolbar-lang .active').attr('data-lang')
		if ($(window).width() < 1300) {
			$(window).scrollTop(0)
			$(window).scrollLeft(0)
		}
		$('.bg-spinner').remove()
		$('body').append(
			'<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
		)
		// $.exportData()
		//Luu file anh
		console.log(lang)
		html2canvas(document.querySelector('#form-letter'), { useCORS: true, quality: 4, scale: '1' }).then((canvas) => {
			var img_val = canvas.toDataURL('image/png', 1.0)
			var uid = $('#uid_letter').val()
			var ltid = $('#ltid').val()
			var token = $('#token').val()
			var height_cv = $('#page-letter').height()
			if (is_busy == true) {
				return false
			}
			const cookie = Cookies.get('work247_token')
			$.ajax({
				cache: false,
				type: 'POST',
				url: 'https://api.timviec365.vn/api/timviec/letter/saveThu',
				dataType: 'json',
				data: { id: ltid, html: ar_data, lang: lang, name_img: `u_thu_${Math.floor(Date.now() / 1000)}` },
				headers: {
					Authorization: `Bearer ${cookie}`,
				},
				error: (err) => {
					console.log(err)
					window.alert(err?.responseJSON?.error?.message || 'Đã có lỗi xảy ra')
					$('.bg-spinner').remove()
				},
				success: function () {
					// downloadURI(`/cv365/download-cvpdf/thu.php?id=${ltid}&uid=${uid}&cvname=timviec365_thu`)
					// $('.bg-spinner').remove()
					// is_busy = false
					// window.location.href = '/ung-vien/danh-sach-mau-thu'

					// var imgData = canvas.toDataURL('image/jpeg', 1.0)
					var imgData = canvas.toDataURL('image/jpeg', 1.0)
					var doc = new jsPDF()
					doc.addImage(imgData, 'PNG', 0, 0, 0, 0)
					doc.save('thu-xin-viec.pdf')
					window.location.href = '/ung-vien/danh-sach-mau-thu'
					// window.location.href = '/cv365/luu-thu/' + token + '-' + ltid;
					//window.location.href = 'http://localhost:9000/cv365/luu-thu/' + token + '-' + ltid;
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
	//Them tool
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
