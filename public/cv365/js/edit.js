var parms = [
	{
		cmd: 'aCommandName',
		desc: 'A DOMString representing the name of the command',
	},
	{
		cmd: 'aShowDefaultUI',
		desc: 'A Boolean indicating whether the default user interface should be shown. This is not implemented in Mozilla.',
	},
	{
		cmd: 'aValueArgument',
		desc: "A DOMString representing some commands (such as insertimage) require an extra value argument (the image's url). Pass an argument of null if no argument is needed.",
	},
]
var commands = [
	{
		cmd: 'bold',
		icon: 'bold',
		desc: 'In đậm',
	},
	{
		cmd: 'italic',
		icon: 'italic',
		desc: 'In nghiêng',
	},
	{
		cmd: 'underline',
		icon: 'underline',
		desc: 'Gạch chân',
	},
	{
		cmd: 'strikeThrough',
		icon: 'strikethrough',
		desc: 'Gạch ngang',
	},
	{
		cmd: 'justifyLeft',
		icon: 'align-left',
		desc: 'Căn trái',
	},
	{
		cmd: 'justifyCenter',
		icon: 'align-center',
		desc: 'Căn giữa',
	},
	{
		cmd: 'justifyRight',
		icon: 'align-right',
		desc: 'Căn phải',
	},
	{
		cmd: 'justifyFull',
		icon: 'align-justify',
		desc: 'Căn đều hai bên',
	},
	{
		cmd: 'undo',
		icon: 'undo',
		desc: 'Hoàn tác',
	},
	{
		cmd: 'redo',
		icon: 'repeat',
		desc: 'Làm lại',
	},
	{
		cmd: 'removeFormat',
		icon: 'eraser',
		desc: 'Xóa hết định dạng',
	},
]

var commandRelation = {}

function supported(cmd) {
	var css = !!document.queryCommandSupported(cmd.cmd) ? 'btn-succes' : 'btn-error'
	return css
}

function icon(cmd) {
	return typeof cmd.icon !== 'undefined' ? 'fa fa-' + cmd.icon : ''
}

function doCommand(cmdKey) {
	var cmd = commandRelation[cmdKey]
	if (supported(cmd) === 'btn-error') {
		alert('execCommand(“' + cmd.cmd + '”)\nis not supported in your browser')
		return
	}
	val = typeof cmd.val !== 'undefined' ? prompt('Value for ' + cmd.cmd + '?', cmd.val) : ''
	//document.execCommand("styleWithCSS",true ); //not need span style
	document.execCommand(cmd.cmd, false, val || '')
	if ($('.cmd-' + cmd.cmd).hasClass('actived')) {
		$('.cmd-' + cmd.cmd).removeClass('actived')
	} else {
		$('.cmd-' + cmd.cmd).addClass('actived')
	}
}

//click fucntions
$('.cmd-bold').click(() => {
	doCommand('bold')
})
$('.cmd-italic').click(() => {
	doCommand('italic')
})

$('.cmd-underline').click(() => {
	doCommand('underline')
})

$('.cmd-strikeThrough').click(() => {
	doCommand('strikeThrough')
})

$('.cmd-justifyLeft').click(() => {
	doCommand('justifyLeft')
})
$('.cmd-justifyCenter').click(() => {
	doCommand('justifyCenter')
})
$('.cmd-justifyRight').click(() => {
	doCommand('justifyRight')
})

$('.cmd-justifyFull').click(() => {
	doCommand('justifyFull')
})

$('.cmd-redo').click(() => {
	doCommand('redo')
})

$('.cmd-undo').click(() => {
	doCommand('undo')
})

$('.cmd-removeFormat').click(() => {
	doCommand('removeFormat')
})

if ($('#indam_khcach').length) {
	function init() {
		var html = '<div class="editor-control-group disabled">',
			template =
				'<span class="editor-control %btnClass%" title="%desc%" onmousedown="event.preventDefault();" onclick="doCommand(\'%cmd%\')"><i class="%iconClass%"></i></span>'
		commands.map(function (command, i) {
			commandRelation[command.cmd] = command
			var temp = template
			temp = temp.replace(/%iconClass%/gi, icon(command))
			temp = temp.replace(/%desc%/gi, command.desc)
			//temp = temp.replace(/%btnClass%/gi, supported(command));
			temp = temp.replace(/%btnClass%/gi, 'cmd-' + command.cmd)
			temp = temp.replace(/%cmd%/gi, command.cmd)

			html += temp
			if (i == 3 || i == 7) {
				html += '</div><div class="editor-control-group disabled">'
			}
		})
		html += '</div>'
		document.querySelector('#tools').innerHTML = html
	}
} else {
	function init() {
		var template =
			'<span class="editor-control %btnClass%" title="%desc%" onmousedown="event.preventDefault();" onclick="doCommand(\'%cmd%\')"><i class="%iconClass%"></i></span>'
		let list_btn = []
		commands.map(function (command, i) {
			commandRelation[command.cmd] = command
			var temp = template
			temp = temp.replace(/%iconClass%/gi, icon(command))
			temp = temp.replace(/%desc%/gi, command.desc)
			//temp = temp.replace(/%btnClass%/gi, supported(command));
			temp = temp.replace(/%btnClass%/gi, 'cmd-' + command.cmd)
			temp = temp.replace(/%cmd%/gi, command.cmd)
			list_btn.push(temp)
		})
		let html = '<div class="editor-control-group disabled">'
		for (let i = 0; i <= 3; i++) {
			html += list_btn[i]
		}
		html += '</div>'
		document.querySelector('#tool_1').innerHTML = html
		html = '<div class="editor-control-group disabled">'
		for (let i = 4; i <= 7; i++) {
			html += list_btn[i]
		}
		html += '</div>'
		document.querySelector('#tool_2').innerHTML = html
		html = '<div class="editor-control-group disabled">'
		for (let i = 8; i <= list_btn.length - 1; i++) {
			html += list_btn[i]
		}
		html += '</div>'
		document.querySelector('#tool_3').innerHTML = html
	}
}

init()
// $('.editor-control-group').removeClass('disabled');

setInterval(function () {
	$('.editor-control').removeClass('actived')
	commands.map(function (command, i) {
		if (document.queryCommandState(command.cmd) == true) {
			$('.cmd-' + command.cmd).addClass('actived')
		}
	})
}, 100)

// $(window).scroll(function () {
// 	if ($(this).scrollTop() >= 420 && $('#cvo-toolbar').hasClass('fx') == false) {
// 		$('#cvo-toolbar').addClass('fx')
// 	}
// 	if ($(this).scrollTop() < 420 && $('#cvo-toolbar').hasClass('fx') == true) {
// 		$('#cvo-toolbar').removeClass('fx')
// 	}
// })
// if ($('#page-cv').attr('data-type') == 'mobile') {
// 	$('.box_content_taocv').scroll(function () {
// 		if ($(this).scrollTop() >= 100 && $('#cvo-toolbar').hasClass('fx') == false) {
// 			$('#cvo-toolbar').addClass('fx')
// 		}
// 		if ($(this).scrollTop() < 100 && $('#cvo-toolbar').hasClass('fx') == true) {
// 			$('#cvo-toolbar').removeClass('fx')
// 		}
// 	})
// }

$(document)
	.on('focus', '.exp-content, .box-content,#lto-about, #lto-content', function () {
		$('.editor-control-group').removeClass('disabled')
	})
	.on('blur', '.exp-content, .box-content,#lto-about, #lto-content', function () {
		$('.editor-control-group').addClass('disabled')
	})
