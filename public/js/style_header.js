var defaultDiacriticsRemovalMap = [
	{
		base: 'A',
		letters:
			'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F',
	},
	{ base: 'AA', letters: '\uA732' },
	{ base: 'AE', letters: '\u00C6\u01FC\u01E2' },
	{ base: 'AO', letters: '\uA734' },
	{ base: 'AU', letters: '\uA736' },
	{ base: 'AV', letters: '\uA738\uA73A' },
	{ base: 'AY', letters: '\uA73C' },
	{ base: 'B', letters: '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
	{
		base: 'C',
		letters: '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E',
	},
	{
		base: 'D',
		letters: '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779',
	},
	{ base: 'DZ', letters: '\u01F1\u01C4' },
	{ base: 'Dz', letters: '\u01F2\u01C5' },
	{
		base: 'E',
		letters:
			'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E',
	},
	{ base: 'F', letters: '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
	{
		base: 'G',
		letters: '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E',
	},
	{
		base: 'H',
		letters: '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D',
	},
	{
		base: 'I',
		letters: '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197',
	},
	{ base: 'J', letters: '\u004A\u24BF\uFF2A\u0134\u0248' },
	{
		base: 'K',
		letters: '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2',
	},
	{
		base: 'L',
		letters: '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780',
	},
	{ base: 'LJ', letters: '\u01C7' },
	{ base: 'Lj', letters: '\u01C8' },
	{ base: 'M', letters: '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
	{
		base: 'N',
		letters: '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4',
	},
	{ base: 'NJ', letters: '\u01CA' },
	{ base: 'Nj', letters: '\u01CB' },
	{
		base: 'O',
		letters:
			'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C',
	},
	{ base: 'OI', letters: '\u01A2' },
	{ base: 'OO', letters: '\uA74E' },
	{ base: 'OU', letters: '\u0222' },
	{ base: 'OE', letters: '\u008C\u0152' },
	{ base: 'oe', letters: '\u009C\u0153' },
	{ base: 'P', letters: '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
	{ base: 'Q', letters: '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
	{
		base: 'R',
		letters: '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782',
	},
	{
		base: 'S',
		letters: '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784',
	},
	{
		base: 'T',
		letters: '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786',
	},
	{ base: 'TZ', letters: '\uA728' },
	{
		base: 'U',
		letters:
			'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244',
	},
	{ base: 'V', letters: '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
	{ base: 'VY', letters: '\uA760' },
	{ base: 'W', letters: '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
	{ base: 'X', letters: '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
	{
		base: 'Y',
		letters: '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE',
	},
	{
		base: 'Z',
		letters: '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762',
	},
	{
		base: 'a',
		letters:
			'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250',
	},
	{ base: 'aa', letters: '\uA733' },
	{ base: 'ae', letters: '\u00E6\u01FD\u01E3' },
	{ base: 'ao', letters: '\uA735' },
	{ base: 'au', letters: '\uA737' },
	{ base: 'av', letters: '\uA739\uA73B' },
	{ base: 'ay', letters: '\uA73D' },
	{ base: 'b', letters: '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
	{
		base: 'c',
		letters: '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184',
	},
	{
		base: 'd',
		letters: '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A',
	},
	{ base: 'dz', letters: '\u01F3\u01C6' },
	{
		base: 'e',
		letters:
			'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD',
	},
	{ base: 'f', letters: '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
	{
		base: 'g',
		letters: '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F',
	},
	{
		base: 'h',
		letters: '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265',
	},
	{ base: 'hv', letters: '\u0195' },
	{
		base: 'i',
		letters: '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131',
	},
	{ base: 'j', letters: '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
	{
		base: 'k',
		letters: '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3',
	},
	{
		base: 'l',
		letters: '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747',
	},
	{ base: 'lj', letters: '\u01C9' },
	{ base: 'm', letters: '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
	{
		base: 'n',
		letters: '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5',
	},
	{ base: 'nj', letters: '\u01CC' },
	{
		base: 'o',
		letters:
			'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275',
	},
	{ base: 'oi', letters: '\u01A3' },
	{ base: 'ou', letters: '\u0223' },
	{ base: 'oo', letters: '\uA74F' },
	{ base: 'p', letters: '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
	{ base: 'q', letters: '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
	{
		base: 'r',
		letters: '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783',
	},
	{
		base: 's',
		letters: '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B',
	},
	{
		base: 't',
		letters: '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787',
	},
	{ base: 'tz', letters: '\uA729' },
	{
		base: 'u',
		letters:
			'\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289',
	},
	{ base: 'v', letters: '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
	{ base: 'vy', letters: '\uA761' },
	{ base: 'w', letters: '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
	{ base: 'x', letters: '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
	{
		base: 'y',
		letters: '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF',
	},
	{
		base: 'z',
		letters: '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763',
	},
]
var diacriticsMap = {}
for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
	var letters = defaultDiacriticsRemovalMap[i].letters
	for (var j = 0; j < letters.length; j++) {
		diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base
	}
}

function removeDiacritics(str) {
	return str.replace(/[^\u0000-\u007E]/g, function (a) {
		return diacriticsMap[a] || a
	})
}

function removeSpecial(string) {
	return string.replace(/[`×~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, '')
}

function remove_accent(url) {
	url = removeDiacritics(url)
	url = url.replace(/-/g, ' ')
	url = url.replace(/\s\s\s/g, ' ')
	url = url.replace(/\s\s/g, ' ')
	url = url.replace(/\s/g, '-')
	url = url.toLowerCase()
	return url
}

function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value)
}

function getCookie(cname) {
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

async function checkCookie() {
	var userid = getCookie('UID')
	if (userid != '') {
		window.sessionStorage.setItem('UID', getCookie('UID'))
	} else {
		window.sessionStorage.clear()
	}
}
checkCookie()

function show_sub(e) {
	if ($(e).find('.box_sub').hasClass('hidden')) {
		$('.sub_domain .box_sub').addClass('hidden')
		$('.mobi-ful').addClass('hidden')
		$('.usc_show_tb').addClass('hidden')
		$(e).find('.box_sub').removeClass('hidden')
	} else {
		$(e).find('.box_sub').addClass('hidden')
	}
}
// mạnh 20/5

// function down_up(e) {
//     $(e).parent().toggleClass('active');
//     $(e).parent().find('.ctn_mobi_sub_ul').toggleClass('hidden')
// }

function down_up(e) {
	$(e).parent().toggleClass('active')
	$(e).parent().find('.ctn_mobi_sub_ul').toggleClass('hidden')
	var data = $(e).attr('data')
	if (data == 1) {
		$(e).parent().find('.ic_menu_angle').css('transform', 'rotate(180deg)')
		$(e).attr('data', 2)
		$(e).find('.box_hd_saudn span').css('color', '#4C5BD4')
	} else if ((data = 2)) {
		$(e).parent().find('.ic_menu_angle').css('transform', 'rotate(0deg)')
		$(e).find('.box_hd_saudn span').css('color', '#474747')
		$(e).attr('data', 1)
	}
}

// end

function clk_notif(e) {
	if ($(e).find('.usc_show_tb').hasClass('hidden')) {
		$('.mobi-ful').addClass('hidden')
		$('.box_sub').addClass('hidden')
		$(e).find('.usc_show_tb').removeClass('hidden')
	} else {
		$(e).find('.usc_show_tb').addClass('hidden')
	}
}

function mobi_sel_op(e) {
	$('#close_mobi_sel').show()
	$('.ctn_mobi_sh_ul').show()
	$('#mobi_ul').addClass('displayblock')
	$(e).hide()
	event.stopPropagation()
}

function mobi_sel_clo(e) {
	$('#mobi-sel').show()
	$('.ctn_mobi_sh_ul').hide()
	$('#mobi_ul').removeClass('displayblock')
	$(e).hide()
	event.stopPropagation()
}

// function avt_clk() {
//     if ($(".mobi-ful").hasClass("hidden")) {
//         $(".mobi-ful").removeClass("hidden")
//         $(".notifice .usc_show_tb").addClass("hidden")
//         $(".box_sub").addClass("hidden")
//     } else {
//         $(".mobi-ful").addClass("hidden")
//     }
// }

function show_login() {
	$('.overlay_newci').show()
}

function close_login_pop() {
	$('.overlay_newci').hide()
}
// $(".notifice").click(function() {
//     $(".notifice .usc_show_tb").hasClass("hidden") ? ($(".notifice .usc_show_tb").removeClass("hidden"), $(".mobi-ful").addClass("hidden"), $(".box_sub").addClass("hidden")) : $(".notifice .usc_show_tb").addClass("hidden")
// });
$('.chat_notifice').click(function () {
	$('.mobi-ful').addClass('hidden'), $('.box_sub').addClass('hidden'), $('.notifice .usc_show_tb').addClass('hidden')
})
$('.usc_show_tb').click(function (i) {
	i.stopPropagation()
})
$('.notifice_1 .delete_tb').click(function () {
	var i = $(this).attr('data_id_tb')
	$('.delete_not_id_' + i).hide(1e3),
		$.post(
			'../ajax/delete_tb_ntd.php',
			{
				not_id: i,
			},
			function (i) {
				var t = $('.notifice_1 .number_tb').html()
				$('.notifice_1 .number_tb').html(t - 1),
					0 == $('.notifice_1 .number_tb').html() &&
						setTimeout(function () {
							$('.notifice .usc_show_tb').addClass('hidden')
						}, 1e3)
			}
		)
})
$('.notifice_1 .delete_all_tb').click(function () {
	var i = $(this).attr('delete_all_tb')
	$('.delete_all_all').siblings().hide(1e3),
		$.post(
			'../ajax/delete_tb_ntd.php',
			{
				not_id_all: i,
			},
			function (i) {
				$('.notifice_1 i').html('0'),
					setTimeout(function () {
						$('.notifice .usc_show_tb').addClass('hidden')
					}, 1e3)
			}
		)
})
$('.notifice_2 .delete_tb').click(function () {
	var i = $(this).attr('data_id_tb')
	$('.delete_not_id_' + i).hide(1e3),
		$.post(
			'../ajax/delete_tb_ntd.php',
			{
				not_id: i,
			},
			function (i) {
				var t = $('.notifice_2 .number_tb').html()
				$('.notifice_2 .number_tb').html(t - 1),
					0 == $('.notifice_2 .number_tb').html() &&
						setTimeout(function () {
							$('.notifice .usc_show_tb').addClass('hidden')
						}, 1e3)
			}
		)
})
$('.notifice_2 .delete_all_tb').click(function () {
	var i = $(this).attr('delete_all_tb')
	$('.delete_all_all').siblings().hide(1e3),
		$.post(
			'../ajax/delete_tb_uv.php',
			{
				not_id_all: i,
			},
			function (i) {
				$('.notifice_2 i').html('0'),
					setTimeout(function () {
						$('.notifice .usc_show_tb').addClass('hidden')
					}, 1e3)
			}
		)
})
if ($('.arrow_bot').length) {
	$('.arrow_bot')
		.before()
		.click(function () {
			$('.mobi-ful').hasClass('hidden')
				? ($('.mobi-ful').removeClass('hidden'), $('.notifice .usc_show_tb').addClass('hidden'), $('.box_sub').addClass('hidden'))
				: $('.mobi-ful').addClass('hidden')
		})
}
$('.box_header .avatar_lg').click(function () {
	$('.mobi-ful').hasClass('hidden')
		? ($('.mobi-ful').removeClass('hidden'), $('.notifice .usc_show_tb').addClass('hidden'), $('.box_sub').addClass('hidden'))
		: $('.mobi-ful').addClass('hidden')
})
// =================js header moi===============================
function show_mn_more(e) {
	var check_rotate = $(e).attr('rotate')
	if (check_rotate == 1) {
		$(e).find('.ic_menu_angle').css('transform', 'rotate(180deg)')
		$(e).find('.txt_ic_menu').css('color', '#4C5BD4')
		$(e).attr('rotate', 2)
	} else if (check_rotate == 2) {
		$(e).find('.ic_menu_angle').css('transform', 'rotate(0deg)')
		$(e).find('.txt_ic_menu').css('color', '#474747')
		$(e).attr('rotate', 1)
	}
	$(e).parents('.content_menu_chung').find('.show_menu_more').slideToggle()
	console.log($(e))
	if ($('.content_menu_chung:last').is($(e)) || $('.content_menu_chung:last').has($(e)).length) {
		let scr_height = $('.m_header_v2 .mn_lox')[0].scrollHeight
		console.log(scr_height)
		setTimeout(function () {
			$('.m_header_v2 .mn_lox').scrollTop(scr_height)
		}, 400)
	}
}
$(document).on('click', function (e) {
	let container = $('.m_menu_ut'),
		btn = $('.bgr_avatar')
	if (!container.is(e.target) && container.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0) {
		container.hide()
	}
})

$('.box_quanlychitiet').click(function () {
	var check_rotate = $(this).attr('rotate')
	if (check_rotate == 1) {
		$(this).find('.angle_menu_mobile').css('transform', 'rotate(180deg)')
		$(this).attr('rotate', 2)
		$(this).find('.txt_qlct').css('color', '#4C5BD4')
	} else if (check_rotate == 2) {
		$(this).find('.angle_menu_mobile').css('transform', 'rotate(0deg)')
		$(this).attr('rotate', 1)
		$(this).find('.txt_qlct').css('color', '#474747')
	}
	$(this).parents('.container_menu_mobile').find('.more_infor_menu').slideToggle()
})

$('.m_header_v2 .bgr_avatar').click(function () {
	$('.m_header_v2 .m_menu_ut').slideToggle(100)
})

function exit_nn(e) {
	var check_exit_nn = $(e).attr('data_exit')
	if (check_exit_nn == 1) {
		$('.popup_show_listnganhnghe').hide()
	} else if (check_exit_nn == 2) {
		$('.popup_show_listngongu').hide()
	}
}

function show_nganh_ngonngu(e) {
	var check_nn = $(e).attr('data_nn')
	if (check_nn == 1) {
		$('.popup_show_listnganhnghe').show()
	} else if (check_nn == 2) {
		$('.popup_show_listngongu').show()
	}
}
var iduser = getCookie('UID')
var code = getCookie('PHPSESPASS')

function refresh_uv(e) {
	$.ajax({
		type: 'POST',
		url: '/ajax/update_time_cv.php',
		data: {
			iduser: iduser,
			code: code,
		},
		success: function (data) {
			alert('Làm mới hồ sơ thành công')
		},
	})
}

function settingDisplay(e) {
	if ($(e).is(':checked') == true) {
		var setting = 1
	} else {
		var setting = 0
	}
	$.ajax({
		url: '/ajax/saveSettingDisplay.php',
		type: 'post',
		data: {
			iduser: iduser,
			code: code,
			setting: setting,
		},
		success: function (res) {},
	})
}

function close_qrdn_m(e) {
	$(e).parents('.qr_dn').hide()
}

function show_qr_tk(e) {
	$('.qr_dn').show()
	$('.m_menu_ut').hide()
	$('.mobi_sh_ul.ctn_mobi_sh_ul').hide()
}
// =================end js header moi===============================
$(document).on('click', '.menu_cv_nganhnghe, .menu_cv_ngonngu', function () {
	console.log('test')
	let menu = $(this).parents('ul').find('.box_cv_nganhnghe')
	if ($(this).hasClass('menu_cv_ngonngu')) {
		menu = $(this).parents('ul').find('.box_cv_ngonngu')
	}
	if (menu.is(':hidden')) {
		menu.removeClass('hidden')
	} else {
		menu.addClass('hidden')
	}
})
jQuery(window).scroll(function () {
	if (jQuery(this).scrollTop() > 300) {
		jQuery('#btn-top').fadeIn(800)
	} else {
		jQuery('#btn-top').fadeOut(800)
	}

	// if(jQuery(this).scrollTop()>200){
	//     if($('#load_tawk').hasClass('tawk_add') == false){
	//         $('#load_tawk').append("<script>var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();(function(){var s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0];s1.async=true;s1.src='https://embed.tawk.to/597813875dfc8255d623ef26/default';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();<\/script>");
	//         $('#load_tawk').addClass('tawk_add');
	//     }
	// }
})
$(document).ready(function () {})
$('.right_avatar').on('click', function () {
	if ($('.mobi-sel').is(':hidden')) {
		$('.mobi-ful').toggle()
	}
})
if ($(window).width() > 1000) {
	$('.box_gcs').attr('style', 'display: none')
}
$('#btn-top').click(function () {
	$('body,html').animate(
		{
			scrollTop: 0,
		},
		800
	)
})
$('.btn_dn_box').click(function () {
	$('.dk_box_uv').removeAttr('style')
	$('.dn_box_uv').attr('style', 'display: block')
})

$('.btn_dk_box').click(function () {
	$('.dn_box_uv').removeAttr('style')
	$('.dk_box_uv').attr('style', 'display: block')
})
$('.close_mobi_sel').click(function () {
	$('#mobi-sel').show()
	$('.ctn_mobi_sh_ul').hide()
	// $(".mobi_sh_ul").attr('style', 'display: block');
	$('#mobi_ul').removeClass('displayblock')
	$(this).hide()
	event.stopPropagation()
})

$('.mobi_sh_ul').click(function () {
	$('.mobi_sh_ul').removeAttr('style')
})

$('#mobi').click(function () {
	$('#mobi, .mobi-bac, .mobi-ful').toggle()
	$('.mobi-from').removeClass('mobi-from-login')
	$('.box_dangky').removeClass('hidden')
	$('.box_dangnhap_2').removeClass('hidden')
	$('.box_dangky').removeClass('top-34')
})

$('.mobi-from').click(function (e) {
	e.stopPropagation()
})

$('.nangcao,.sm_mobile').click(function (event) {
	event.preventDefault()
	$('.pop-nangcao').fadeToggle('fast')
})

$('.pop-nangcao').click(function (event) {
	event.preventDefault()
	var action = $(this).attr('data-action')
})

$('.close,.btn-pop-click:not(.close_uv)').click(function () {
	$('.pop-nangcao').fadeToggle('fast')
})
$('.close_uv').click(function () {
	$('.pop-nangcao').fadeToggle('fast')
})
if ($('.city_cate,.city_ab').length) {
	$('.city_cate,.city_ab').select2()
}
// js chung phần ứng tuyển
$(document).on('click', '.close_pop_login', function () {
	$('.overlay,.overlay_nhs,.overlay_lhs,.overlay_send_mess').hide()
})
$(document).on('change', '.check_vl', function () {
	var sll = $('.check_vl:checked').length
	$('.soluongcv').html(sll)
})

$(document).on('click', '.btn_ungtuyen', function () {
	var sll = $('.check_vl:checked').length
	$('.soluongcv').html(sll)
})
$(document).on('click', '.btn_ungtuyen_nvt', function () {
	console.log('test')
	var iduse = $(this).attr('data-id')
	var sll = $('.check_vl:checked').length
	var array_tin = []
	$('.check_vl:checked').each(function () {
		array_tin.push(this.value)
	})

	if (array_tin == '') {
		alert('Bạn phải chọn ít nhất một công việc')
	} else {
		$(this).prop('disabled', true)
		$.ajax({
			type: 'POST',
			url: '/ajax/nop_ho_so.php',
			beforeSend: function () {
				$('.loading').show()
			},
			data: {
				idtin: array_tin,
				iduse: iduse,
			},
			success: function (data) {
				$('.loading').hide()
				alert('Bạn vừa nộp hồ sơ thành công ' + sll + ' công việc')
				window.location.reload()
			},
		})
	}
})

function getVlgy(id_new, user_id = 0) {
	if ($('.pop_loader').length) {
		$('.pop_loader').show()
	}
	$.ajax({
		type: 'post',
		url: '../ajax/goi_y_vl_new.php',
		data: { new_id: id_new },
		dataType: 'json',
		success: function (data) {
			if ($('.pop_loader').length) {
				$('.pop_loader').hide()
			}
			let html_main = renderPopupNhs(data, user_id)
			$('.overlay_nhs').html(html_main)
			let html = ''
			$.each(data, function (index, val) {
				html += `
                <div class="item_cate item_cate_nhs">
                    <div class="input-checkbox">
                        <input type="checkbox" class="check_vl" name="fieldset" id="checkbox2-${val.new_id}" checked="" value="${val.new_id}" />
                        <label for="checkbox2-${val.new_id}"></label>
                    </div>
                    <div class="img_cate">
                        <img src="${val.logo_avt}" onerror='this.onerror=null;this.src="https://devnext.timviec365.vn/static-tv/images/no-image.png";' alt="${val.usc_company}" />
                    </div>
                    <div class="center_cate">
                        <div class="center_cate_l">
                            <p><a rel="nofollow" href="${val.link_job}" title="${val.new_title}" target="blank" class="title_cate">${val.new_title}</a></p>
                            <p><a href="${val.link_company}" rel="nofollow" title="${val.usc_company}">${val.usc_company}</a></p>
                            <p style="color: #6F6F6F;">Hạn nộp: ${val.date}</p>
                            <p>
                                <span class="cate_dd">${val.city_name}</span>
                                <span class="cate_ml">${val.salary}</span>
                            </p>
                        </div>
                    </div>
                </div>
            `
			})
			$('.nhs_main_2').append(html)
			$('.overlay_nhs').show()
		},
	})
}

function renderPopupNhs(list_new, user_id = 0) {
	let html = ''
	if (list_new.length > 0) {
		html += `<div class="wapper wapper_nhs">
                    <div class="auth_form form_vltt">
                        <div class="nhs_header">
                            <img class="nhs_bag" src="https://devnext.timviec365.vn/static-tv/images/loc/bag.png">
                            <p class="nhs_title_2">Timviec365.vn Thông báo</p>
                            <img class="close_pop_login" src="https://devnext.timviec365.vn/static-tv/images/loc/close.png" alt="close" />
                        </div>
                        <div class="nhs_main_2">
                            <div class="gy_tit">
                                <p class="gy_title" style="font-size: 16px"><span style="color: #3BB54A">Nộp hồ sơ thành công </span><span style="color: #307df1">Timviec365.vn</span> gợi ý cho bạn một số việc làm tương tự</p>
                                <? if ($layoutType != 'mobile') { ?>
                                    <p>Chúng tôi đã lọc ra danh sách công việc phù hợp với những tiêu chí của bạn</p>
                                    <p style="color: #FD1616">Click vào từng việc làm để xem thêm thông tin chi tiết !!</p>
                                <? } ?>
                            </div>
                        </div>
                        <div class="pop_footer">
                            <div class="pop_tf">
                                <p>Click <img src="https://devnext.timviec365.vn/static-tv/images/loc/tick_2.png"> để bỏ chọn công việc bạn không mong muốn</p>
                                <p>Bạn muốn ứng tuyển <span style="color: #FF490F;" class="soluongcv">5</span> vị trí ở trên</p>
                            </div>
                            <span class="btn_ungtuyen_nvt" data-id="${user_id}" data-alert="">Nộp hồ sơ</span>
                        </div>
                    </div>
                </div>`
	} else {
		html += `<div class="wapper">
                <div class="auth_form">
                    <p class="nhs_title">Timviec365.vn Thông báo</p>
                    <div class="nhs_main">
                        <p class="nhs_info">Bạn đã nộp hồ sơ thành công!</p>
                        <div class="nhs_nd">
                            <p>Hồ sơ của bạn đã được gửi thành công tới vị trí <b><?= $row['new_title'] ?></b> của <b><?= $name_company ?></b></p>
                            <p>Nhà tuyển dụng sẽ liên hệ với bạn qua email hoặc số điện thoại nếu hồ sơ của bạn phù hợp.</p>
                            <p>Vui lòng thường xuyên kiểm tra email và mở máy điện thoại để không bỏ lỡ cơ hội được phỏng vấn</p>
                        </div>
                        <div class="nhs_kk">
                            <p>Bạn gặp khó khăn? Hotline hỗ trợ <span style="color: #ff9a00;">1900633682</span> ấn phím <span style="color: #ff9a00;">1</span></p>
                            <span class="close_pop_login">Hoàn thành</span>
                        </div>
                    </div>
                </div>
            </div>`
	}
	return html
}
$(document).on('click', function (e) {
	let container = $('.usc_show_tb'),
		btn = $('.menu_item ')
	if (!btn.is(e.target) && btn.has(e.target).length === 0) {
		$('.usc_show_tb').addClass('hidden')
	}
})
$(document).on('click', '.popup_send_chat .btn_close', function () {
	$('.popup_send_chat').hide()
})
// end js chung phần ứng tuyển
// ứng tuyển
// $('.job_ut').click(function() {
//     $('.pop_loader').show();
//     var ut = $(this);
//     var idtin = [$(this).attr('data-id')];
//     var iduse = getCookie("UID");
//     nhs_chat365_arr(iduse, idtin);
//     $.ajax({
//         type: "POST",
//         url: '/ajax/nop_ho_so_nvt.php',
//         data: {
//             idtin: idtin,
//             iduse: iduse
//         },
//         success: function(data) {
//             $('.pop_loader').hide();
//             $('.pop_ut_success').show();
//             ut.removeClass('job_ut').addClass('job_w_ut').text('Đã ứng tuyển');
//             if (!$('#check_new_' + idtin).hasClass('active')) {
//                 $('#check_new_' + idtin).addClass('active');
//             }
//             if (!$('#check_new_' + idtin).parents('.box_input ').hasClass('v_hidden')) {
//                 !$('#check_new_' + idtin).parents('.box_input ').addClass('v_hidden')
//             }
//         }
//     });
// });

$.fn.hasAttr = function (name) {
	return this.attr(name) !== undefined
}
if ($('#new_header').hasAttr('data-checkpoint')) {
	$('body').addClass('line_noti_point')
}
