$(document).on('click', '#m_pagetaocv .show_sidebar_left', function () {
	$('#m_pagetaocv .show_sidebar').show()
	// var wid_sidebar_left = $('#m_pagetaocv .sidebar_left').width();
	// var show_sidebar = $('#m_pagetaocv .show_sidebar').width();
	// var wd_container_sidebar_left = $('#m_pagetaocv .container_sidebar_left').width(`${wid_sidebar_left + 350}`);
	// var wd_container_content_taocv = $('#m_pagetaocv .container_content_taocv').width();
	// $('#m_pagetaocv .container_content_taocv').width(wd_container_content_taocv - wd_container_sidebar_left);
	var data_show = $(this).attr('data-show')
	if (data_show) {
		$('#m_pagetaocv .box_sidebar').hide()
		$(`#m_pagetaocv .${data_show}`).show()
		$('#m_pagetaocv .show_sidebar_left').removeClass('active')
		$(this).addClass('active')
	}
	// $('#m_pagetaocv .box_content_taocv').css("margin-left", "65px");
})

function thugon_sbar(m) {
	$(m).parents('.show_sidebar').hide()
	// var wd_container_sidebar_left = $('#m_pagetaocv .container_sidebar_left').width('90');

	// $('#m_pagetaocv .box_content_taocv').css("margin-left", "0px");
	if ($('#hdanvietcv').hasClass('active')) {
		let item_hide = $('#hdanvietcv').attr('data-active')
		let list_hide = $('#hdanvietcv').attr('data-hide')
		list_hide = list_hide ? `${list_hide},${item_hide}` : item_hide
		$('#hdanvietcv').attr('data-hide', list_hide)
	}
	$('#m_pagetaocv .show_sidebar_left').removeClass('active')
}
$(document).on('click', '.ic_thugon ', function () {
	thugon_sbar(this)
})

$(document).on('click', '.input_show_nngu', function () {
	$('.img_show_nngu').removeClass('boder_nngu')
	$('.input_show_nngu').hide()
	$('.input_show_nngu').prop('checked', false)

	$(this).prop('checked', true)
	$(this).parent('.box_image_nngu').find('.img_show_nngu').addClass('boder_nngu')
	$(this).show()
})

$(document).on('change', '.zoom_web', function () {
	var change_size = $(this).val()
	$(this)
		.parents('.box_range_zoom')
		.find('.txt_input_range')
		.text(change_size + '%')
	var percent = (change_size / 100).toFixed(2)
	// $('#m_pagetaocv .box_content_taocv').find('.page_cv').css("transform", `scale(${percent})`);
	// $('#m_pagetaocv .box_content_taocv').find('.page_cv').css("zoom", `${percent}`);
	if (change_size <= 75) {
		$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('transform', `scale(${percent})`)
		$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', 'unset')
	} else {
		$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('transform', 'unset')
		$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', `${percent}`)
	}
	var width_all = $(window).width()
	if (width_all <= 600) {
		$(document).on('click', 'div#experience-table', function () {
			console.log(1)
		})
	}
})

$(document).on('click', '.img_thoat', function () {
	$(this).parents('.show_sidebar').hide()
	// var wd_container_sidebar_left = $('#m_pagetaocv .container_sidebar_left').width('64');
	$('#m_pagetaocv .box_content_taocv').css('margin-left', '0px')
})
$(document).on('click', '.icon_cong_zoom', function () {
	var change_size = $(this).parent().find('.input_range').val()
	if (change_size < 150) {
		var cong_val = Number(change_size) + Number(25)
		if (cong_val > 150) {
			cong_val = 150
			$(this).parent().find('.input_range').val(cong_val)
			$(this)
				.parents('.box_range_zoom')
				.find('.txt_input_range')
				.text(cong_val + '%')
			var percent = (cong_val / 100).toFixed(2)
			$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', `${percent}`)
		} else {
			$(this).parent().find('.input_range').val(cong_val)
			$(this)
				.parents('.box_range_zoom')
				.find('.txt_input_range')
				.text(cong_val + '%')
			var percent = (cong_val / 100).toFixed(2)
			if (change_size <= 75) {
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('transform', `scale(${percent})`)
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', 'unset')
			} else {
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('transform', 'unset')
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', `${percent}`)
			}
		}
		var width_all = $(window).width()
		if (width_all <= 600) {
			$(document).on('click', 'div#experience-table', function () {})
		}
	} else if (change_size > 150) {
		$(this).parent().find('.input_range').val(150)
	}
})
$(document).on('click', '.icon_tru_zoom', function () {
	var change_size = $(this).parent().find('.input_range').val()
	if (change_size >= 50) {
		var tru_val = Number(change_size) - Number(25)
		if (tru_val < 50) {
			tru_val = 50
			$(this).parent().find('.input_range').val(tru_val)
			$(this)
				.parents('.box_range_zoom')
				.find('.txt_input_range')
				.text(tru_val + '%')
			var percent = (tru_val / 100).toFixed(2)
			$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', `${percent}`)
		} else {
			$(this).parent().find('.input_range').val(tru_val)
			$(this)
				.parents('.box_range_zoom')
				.find('.txt_input_range')
				.text(tru_val + '%')
			var percent = (tru_val / 100).toFixed(2)
			if (tru_val <= 75) {
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('transform', `scale(${percent})`)
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', 'unset')
			} else {
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('transform', 'unset')
				$('#m_pagetaocv .box_content_taocv').find('.page_cv').css('zoom', `${percent}`)
			}
			// $('#m_pagetaocv .box_content_taocv').find('.page_cv').css("zoom", `${percent}`);
		}
		var width_all = $(window).width()
		if (width_all <= 600) {
			$(document).on('click', 'div#experience-table', function () {})
		}
	} else if (change_size < 50) {
		$(this).parent().find('.input_range').val(50)
	}
})
var width_all = $(window).width()
if (width_all <= 520) {
	$('.container_sidebar_rigth').find('.txt_input_range').text('75%')
	$('.container_sidebar_rigth').find('.input_range').val('75')
}
$(document).on('click', '#rutgon', function () {
	if (!$('#m_pagetaocv .container_sidebar_left').hasClass('rutgon')) {
		$('.icon_sidebar_left').hide()
		$('.icon_sidebar_left').eq(1).show()
		$('.icon_sidebar_left').last().show()
		$('#m_pagetaocv .container_sidebar_left .show_sidebar').hide()
		$('#m_pagetaocv .container_sidebar_left').addClass('rutgon')
		$(this).addClass('rutgon')
	} else {
		$('#m_pagetaocv .container_sidebar_left').removeClass('rutgon')
		$('.icon_sidebar_left').show()
		$('.icon_sidebar_left').first().hide()
		$('#m_pagetaocv .container_sidebar_left .show_sidebar').hide()
		$(this).removeClass('rutgon')
	}
})
$(document).on('click', '#rutgon_mobile', function () {
	if (!$('#m_pagetaocv .container_sidebar_left').hasClass('rutgon')) {
		$('.icon_sidebar_left').hide()
		$('#m_pagetaocv .container_sidebar_left .show_sidebar').hide()
		$('#m_pagetaocv .container_sidebar_left').addClass('rutgon')
		$(this).addClass('rutgon').show()
	} else {
		$('#m_pagetaocv .container_sidebar_left').removeClass('rutgon')
		$('.icon_sidebar_left').show()
		$('#m_pagetaocv .container_sidebar_left .show_sidebar').hide()
		$(this).removeClass('rutgon')
	}
})

$('body').css('height', $(window).height())

$(document).on('click', function (e) {
	if (!$(e.target).parents('.item').length) {
		if ($(e.target).parents('#form-cv').length) {
			$('#co_chu').show()
			$('#tool_1, #tool_2').css('display', 'flex')
			$('#cvo-toolbar-lang,#toolbar-color').hide()
		} else {
			$('#cvo-toolbar-lang,#toolbar-color').show()
			let list_hide = `#co_chu,#tool_2,.cmd-removeFormat`
			if ($(document).width() < 1024) {
				list_hide = `#tool_1,#tool_2,.cmd-removeFormat`
			}
			$(`${list_hide}`).hide()
		}
	}
})
