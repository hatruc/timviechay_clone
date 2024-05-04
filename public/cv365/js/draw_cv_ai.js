$(document).ready(function () {
	let screenWidth = $(window).width()
	// zoom Cv
	$(document).on('change', '.zoom_web', function () {
		var change_size = $(this).val()
		$(this)
			.parents('.box_range_zoom')
			.find('.txt_input_range')
			.text(change_size + '%')
		var percent = (change_size / 100).toFixed(2)
		$('.page_cv').css('zoom', `${percent}`)
		if (Number(change_size) >= 75) {
			$('.block_img').css('padding-bottom', '300px')
		} else {
			$('.block_img').css('padding-bottom', '0')
		}
	})

	$(document).on('click', '.icon_cong_zoom', function () {
		var change_size = $(this).parent().find('.input_range').val()
		if (change_size < 100) {
			var cong_val = Number(change_size) + Number(10)
			if (cong_val > 100) {
				cong_val = 100
			}
			if (cong_val >= 75) {
				$('.block_img').css('padding-bottom', '300px')
			} else {
				$('.block_img').css('padding-bottom', '0')
			}
			$(this).parent().find('.input_range').val(cong_val)
			$(this)
				.parents('.box_range_zoom')
				.find('.txt_input_range')
				.text(cong_val + '%')
			var percent = (cong_val / 100).toFixed(2)
			$('.page_cv').css('zoom', `${percent}`)
		}
	})

	$(document).on('click', '.icon_tru_zoom', function () {
		var change_size = $(this).parent().find('.input_range').val()
		if (change_size >= 50) {
			var tru_val = Number(change_size) - Number(10)
			if (tru_val < 50) {
				tru_val = 50
			}
			if (tru_val >= 75) {
				$('.block_img').css('padding-bottom', '300px')
			}
			$(this).parent().find('.input_range').val(tru_val)
			$(this)
				.parents('.box_range_zoom')
				.find('.txt_input_range')
				.text(tru_val + '%')
			var percent = (tru_val / 100).toFixed(2)
			$('.page_cv').css('zoom', `${percent}`)
		}
	})

	// handle hide/show Cv Ai
	function checkScreenWidth() {
		if (screenWidth > 1600) {
			$('.xem_cv_ai_tao').removeClass('mobi_type').addClass('pc_type')
			$('.xem_cv_ai_tao').attr('show-ai', 1)
		} else {
			$('.xem_cv_ai_tao').removeClass('pc_type').addClass('mobi_type')
			$('.xem_cv_ai_tao').attr('show-ai', 0)
		}

		if (screenWidth > 768) {
			$('.noidung_cv').removeClass('input_mobi_type').addClass('input_pc_type')
		} else {
			$('.noidung_cv').removeClass('input_pc_type').addClass('input_mobi_type')
		}
	}
	checkScreenWidth()
	$(window).resize(checkScreenWidth)

	$('.mobi_type').click(function () {
		if ($(this).attr('show-ai') == 1) {
			$(this).attr('show-ai', 0)
			$('.cv_ai_tao').hide()
			$('.cv_tutao').show()
		} else {
			$(this).attr('show-ai', 1)
			$('.cv_ai_tao').show()
			$('.cv_tutao').hide()
		}
	})

	$('.pc_type').click(function () {
		if ($(this).attr('show-ai') == 1) {
			$(this).attr('show-ai', 0)
			$('.cv_ai_tao').hide()
		} else {
			$(this).attr('show-ai', 1)
			$('.cv_ai_tao').show()
		}
	})

	// function set cookie
	function setCookie(cname, cvalue, exdays) {
		var d = new Date()
		d.setTime(d.getTime() + exdays)
		var expires = 'expires=' + d.toUTCString()
		document.cookie = cname + '=' + cvalue + '; ' + expires
	}

	// change language
	$('.choose_lang').click(function () {
		if ($('.block_choose_lang').attr('data-show') == 0) {
			$('.block_choose_lang').css('display', 'flex')
			$('.block_choose_lang').attr('data-show', 1)
		} else {
			$('.block_choose_lang').css('display', 'none')
			$('.block_choose_lang').attr('data-show', 0)
		}
	})

	$('.block_choose_lang button').click(function () {
		let lang = $(this).attr('data-lang'),
			checkTyped = false
		$('.block_left')
			.find('input:not(.type_src, .aspect_ratio), textarea')
			.each(function () {
				if ($(this).val() != '') {
					checkTyped = true
					return false
				}
			})
		if (checkTyped) {
			$('.popup_recognite_voice').show()
			$('.popup_recognite_voice .wapper').empty()
			$('.popup_recognite_voice .wapper').html(`
        		<div class="content_tb">
        			<span>Các thông tin mới thêm sẽ bị mất, bạn có muốn đổi ngôn ngữ?</span>
        		</div>
        		<div class="list_btn_tb">
        			<button class="btn_close_lang">Hủy</button>
        			<button class="btn_change_lang" data-lang="${lang}">Đổi ngôn ngữ</button>
        		</div>
        	`)
		} else {
			setCookie('lang', lang, 3600000)
			window.location.reload()
		}
	})

	$(document).on('click', '.btn_change_lang', function () {
		let lang = $(this).attr('data-lang')
		setCookie('lang', lang, 3600000)
		window.location.reload()
	})

	$(document).on('click', '.btn_close_lang', function () {
		$('.popup_recognite_voice .wapper').empty()
		$('.popup_recognite_voice').hide()
	})

	// select2
	$('#cate-dk2').select2({
		placeholder: 'Chọn ngành nghề bạn mong muốn',
		maximumSelectionLength: 3,
		allowClear: true,
		multiple: true,
	})
	$('#city-selector2').select2({
		placeholder: 'Chọn nơi làm việc bạn mong muốn',
		maximumSelectionLength: 3,
		allowClear: true,
		multiple: true,
	})

	$('.exit').click(function () {
		$('#boxRes2').hide()
	})

	// validate form register
	$('#form_res2').validate({
		rules: {
			name2: 'required',
			phone2: {
				required: !0,
				maxlength: 13,
				minlength: 10,
				number: true,
			},
			pass2: {
				required: !0,
				minlength: 6,
			},
			repass2: {
				required: !0,
				equalTo: '#password2',
			},
			email_lh2: {
				required: true,
				email: true,
			},
			'category[]2': 'required',
			'city[]2': 'required',
			cv_title2: 'required',
		},
		messages: {
			name2: 'Vui lòng nhập họ tên',
			phone2: {
				required: 'Vui lòng nhập SĐT',
				maxlength: 'SĐT không đúng định dạng',
				minlength: 'SĐT không đúng định dạng',
				number: 'SĐT không đúng định dạng',
				remote: 'SĐT đã được sử dụng!',
			},
			pass2: {
				required: 'Vui lòng nhập mật khẩu',
				minlength: 'Mật khẩu tối thiểu 6 ký tự',
			},
			repass2: {
				required: 'Vui lòng nhập mật khẩu',
				equalTo: 'Không khớp với mật khẩu',
			},
			email_lh2: {
				email: 'Email không đúng định dạng',
				required: 'Vui lòng nhập email',
			},
			'category[]2': 'Vui lòng chọn ngành nghề',
			'city[]2': 'Vui lòng chọn tỉnh thành',
			cv_title2: 'Vui lòng nhập công việc mong muốn.',
		},
		submitHandler: function (t) {
			let arr_noti = []
			$('.box_content_notify .box_form_notify').each(function (i) {
				let arr_type_noti = []
				$(this)
					.find('.box_content_loaitbao')
					.each(function (t, type) {
						arr_type_noti.push($(type).attr('data-type'))
					})
				$(this)
					.find('.txt_show_user')
					.each(function (u, user) {
						arr_noti.push({
							id_chat: $(user).attr('data-id_chat'),
							type_noti: arr_type_noti.join(','),
						})
					})
			})

			$(window).scrollTop(0)
			$(window).scrollLeft(0)
			let phone = $('#phone2').val(),
				pass = $('#password2').val(),
				name = $('#name2').val(),
				email_lh = $('#email_lh2').val(),
				cv_title = $('#cv_title2').val(),
				category = $('#cate-dk2').val(),
				city = $('#city-selector2').val()
			let data = {
				phone,
				pass,
				name,
				email_lh,
				cv_title,
				category,
				city,
				notify: arr_noti,
			}
			$.ajax({
				url: '/api/cv_ai/register',
				type: 'POST',
				dataType: 'json',
				data: data,
				beforeSend: function () {
					$('.bg-spinner').remove()
					$('body').append(
						'<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
					)
				},
				success: function (respons) {
					$('.bg-spinner').remove()
					if (respons.data && respons.data.result) {
						$.ajax({
							url: '/api/cv_ai/login',
							type: 'POST',
							dataType: 'json',
							data: data,
							beforeSend: function () {
								$('body').append(
									'<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
								)
							},
							success: function (response) {
								if (response.data && response.data.result) {
									setCookie('work247_token', response.data.access_token, 86400000)
									setCookie('rf_token', response.data.refreshToken, 86400000)
									setCookie('role', 2, 86400000)
									setCookie('id_chat365', response.data.user_infor.chat365_id, 86400000)
									setCookie('infor', JSON.stringify(response.data.user_infor), 86400000)
								}
							},
						})
						$.saveCv(respons.data.user_id, function () {
							window.location.href = '/xac-thuc-tai-khoan-ung-vien.html'
						})
					} else {
						handlePopup('Số điện thoại đã được đăng ký')
					}
				},
			})
			return false
		},
	})

	// function save Cv
	$.saveCv = function (user_id, callback) {
		let cv_id = $('.cv_id').val(),
			json_cv = $.getJsonCv()
		result = ''

		$.ajax({
			cache: false,
			type: 'POST',
			dataType: 'json',
			async: 'false',
			beforeSend: function (response) {
				$('.bg-spinner').remove()
				$('body').append(
					'<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
				)
			},
			url: '/api/cv_ai/saveCvDrawed',
			data: {
				cv_id: cv_id,
				user_id: user_id,
				json_cv: json_cv,
			},
			success: function (respons) {
				$('.bg-spinner').remove()
				result = respons
				if (typeof callback === 'function') {
					callback(result)
				}
			},
		})
	}

	// handle avavat
	$(function () {
		var aspectRatio = $('.aspect_ratio').val()
		var typeSrc = $('.type_src').val()
		var console = window.console || { log: function () {} }
		var URL = window.URL || window.webkitURL
		var $image = $('#image')
		var $download = $('.btn-save-image')
		var $dataX = $('#dataX')
		var $dataY = $('#dataY')
		var $dataHeight = $('#dataHeight')
		var $dataWidth = $('#dataWidth')
		var $dataRotate = $('#dataRotate')
		var $dataScaleX = $('#dataScaleX')
		var $dataScaleY = $('#dataScaleY')
		var baseW = $dataWidth.val()
		var baseH = $dataHeight.val()
		var options = {
			aspectRatio: 1 / aspectRatio,
			preview: '.img-edit-preview',
			dragMode: 'move',
			crop: function (e) {
				$dataX.val(Math.round(e.detail.x))
				$dataY.val(Math.round(e.detail.y))
				$dataHeight.val(Math.round(e.detail.height))
				$dataWidth.val(Math.round(e.detail.width))
				$dataRotate.val(e.detail.rotate)
				$dataScaleX.val(e.detail.scaleX)
				$dataScaleY.val(e.detail.scaleY)
			},
		}
		var originalImageURL = $image.attr('src')
		var uploadedImageName = 'avatar.jpg'
		var uploadedImageType = 'image/jpeg'
		var uploadedImageURL

		// Tooltip
		$('[data-toggle="tooltip"]').tooltip()

		// Cropper
		$image
			.on({
				ready: function (e) {},
				cropstart: function (e) {},
				cropmove: function (e) {},
				cropend: function (e) {},
				crop: function (e) {},
				zoom: function (e) {},
			})
			.cropper(options)

		// Buttons
		if (!$.isFunction(document.createElement('canvas').getContext)) {
			$('button[data-method="getCroppedCanvas"]').prop('disabled', true)
			$('button.btn-save-image').prop('disabled', true)
		}

		if (typeof document.createElement('cropper').style.transition === 'undefined') {
			$('button[data-method="rotate"]').prop('disabled', true)
			$('button[data-method="scale"]').prop('disabled', true)
		}

		// Download
		if (typeof $download[0].download === 'undefined') {
			$download.addClass('disabled')
		}

		// Options
		$('.docs-toggles').on('change', 'input', function () {
			var $this = $(this)
			var name = $this.attr('name')
			var type = $this.prop('type')
			var cropBoxData
			var canvasData
			if (!$image.data('cropper')) {
				return
			}
			if (type === 'checkbox') {
				options[name] = $this.prop('checked')
				cropBoxData = $image.cropper('getCropBoxData')
				canvasData = $image.cropper('getCanvasData')

				options.ready = function () {
					$image.cropper('setCropBoxData', cropBoxData)
					$image.cropper('setCanvasData', canvasData)
				}
			} else if (type === 'radio') {
				options[name] = $this.val()
			}
			$image.cropper('destroy').cropper(options)
		})

		// Methods
		$('.docs-buttons').on('click', '[data-method]', function () {
			var $this = $(this)
			var data = $this.data()
			var cropper = $image.data('cropper')
			var cropped
			var $target
			var result
			if ($this.prop('disabled') || $this.hasClass('disabled')) {
				return
			}
			if (cropper && data.method) {
				data = $.extend({}, data) // Clone a new one

				if (typeof data.target !== 'undefined') {
					$target = $(data.target)
					if (typeof data.option === 'undefined') {
						try {
							data.option = JSON.parse($target.val())
						} catch (e) {}
					}
				}
				cropped = cropper.cropped
				switch (data.method) {
					case 'rotate':
						if (cropped && options.viewMode > 0) {
							$image.cropper('clear')
						}
						break
					case 'getCroppedCanvas':
						if (uploadedImageType === 'image/jpeg') {
							if (!data.option) {
								data.option = {}
							}
							data.option.fillColor = '#fff'
						}
						break
				}
				result = $image.cropper(data.method, data.option, data.secondOption)
				switch (data.method) {
					case 'rotate':
						if (cropped && options.viewMode > 0) {
							$image.cropper('crop')
						}
						break
					case 'scaleX':
					case 'scaleY':
						$(this).data('option', -data.option)
						break
					case 'getCroppedCanvas':
						if (result) {
							// Bootstrap's Modal
							$('#getCroppedCanvasModal').modal().find('.modal-body').html(result)
							if (!$download.hasClass('disabled')) {
								download.download = uploadedImageName
								$download.attr('href', result.toDataURL(uploadedImageType))
							}
						}
						break
					case 'destroy':
						if (uploadedImageURL) {
							URL.revokeObjectURL(uploadedImageURL)
							uploadedImageURL = ''
							$image.attr('src', originalImageURL)
						}
						break
				}
				if ($.isPlainObject(result) && $target) {
					try {
						$target.val(JSON.stringify(result))
					} catch (e) {}
				}
			}
		})

		// Import image
		var $inputImage = $('#inputImage')

		if (URL) {
			$inputImage.change(function () {
				var files = this.files
				var file
				if (!$image.data('cropper')) {
					return
				}

				if (files && files.length) {
					file = files[0]
					if (/^image\/\w+$/.test(file.type)) {
						uploadedImageName = file.name
						uploadedImageType = file.type
						if (uploadedImageURL) {
							URL.revokeObjectURL(uploadedImageURL)
						}
						uploadedImageURL = URL.createObjectURL(file)
						$image.cropper('destroy').attr('src', uploadedImageURL).cropper(options)
						$inputImage.val('')
						$('.imageEditor').show()
						$('.editorChooseImage').hide()
						$('.image-controls').show()
						$('.edit-image-btns').show()
						$('.tipCompress').hide()
						$download.removeClass('disabled')
					} else {
						window.alert('Please choose an image file.')
						$download.addClass('disabled')
					}
				}
			})
		} else {
			$inputImage.prop('disabled', true).parent().addClass('disabled')
			$download.addClass('disabled')
		}

		// change image
		var $inputImage = $('#inputImage1')
		if (URL) {
			$inputImage.change(function () {
				var files = this.files
				var file
				if (!$image.data('cropper')) {
					return
				}
				if (files && files.length) {
					file = files[0]

					if (/^image\/\w+$/.test(file.type)) {
						uploadedImageName = file.name
						uploadedImageType = file.type
						if (uploadedImageURL) {
							URL.revokeObjectURL(uploadedImageURL)
						}
						uploadedImageURL = URL.createObjectURL(file)
						$image.cropper('destroy').attr('src', uploadedImageURL).cropper(options)
						$inputImage.val('')
						$('.imageEditor').show()
						$('.editorChooseImage').hide()
						$('.image-controls').show()
						$('.edit-image-btns').show()
						$('.tipCompress').hide()
						$download.removeClass('disabled')
					} else {
						window.alert('Please choose an image file.')
						$download.addClass('disabled')
					}
				}
			})
		} else {
			$inputImage.prop('disabled', true).parent().addClass('disabled')
			$download.addClass('disabled')
		}

		$('.img-edit-preview').click(function () {
			$('#inputImage').trigger('click')
		})
		$('.btn-remove-image').click(function () {
			$image.cropper('destroy').cropper(options)
			$('.imageEditor').hide()
			$('.editorChooseImage').show()
		})
		$('.btn-rotate-right').click(function () {
			$image.cropper('rotate', 90)
		})
		$('.btn-rotate-left').click(function () {
			$image.cropper('rotate', -90)
		})
		$('.btn-zoom-in-image').click(function () {
			$image.cropper('zoom', 0.2)
		})
		$('.btn-zoom-out-image').click(function () {
			$image.cropper('zoom', -0.2)
		})
		$('.btn-save-image').click(function () {
			if ($(this).hasClass('disabled')) {
			} else {
				var result = $image.cropper('getCroppedCanvas', {
					width: baseW,
					height: baseH,
					minWidth: 100,
					minHeight: 100,
					maxWidth: 4000,
					maxHeight: 4000,
					fillColor: '#fff',
					imageSmoothingEnabled: true,
					imageSmoothingQuality: 'high',
				})

				var img = result.toDataURL(uploadedImageType)
				$.ajax('/api/cv_ai/upload_avatar', {
					method: 'POST',
					data: { img64: img },
					cache: false,
					success: function (img) {
						$('.img_avatar').attr(typeSrc, img.url)
						$('#job_input_avatar').html(`
							<div id="job_input_avatar">
							<img src="/cv365/images/tuan_images/icon_edit.svg" alt="upload">
							<span style="color: #FF3232">Chỉnh sửa</span>
						</div>
							`)
					},
					error: function () {},
				})
				$('#imageEditorWraper').hide()
			}
		})
		$(document).on('click', '.ttin_noidung[data-id="cv_content_avatar"]', function () {
			$image.cropper('destroy').cropper(options)
			$('#imageEditorWraper').show()
		})
		$('.btn-close-image-editor').click(function () {
			$('#imageEditorWraper').hide()
		})
	})
})
