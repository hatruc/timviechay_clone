$(document).on('focus', '#form-cv [contenteditable="true"]:not(.box-title,.block-title)', function () {
  $(this).attr('data-edit', 1)
})

function replaceStr(str) {
  $('#checktext').html(str)
  return $('#checktext').html().replaceAll('&nsbp;', ' ').replaceAll('\n', '').replaceAll(' ', '').replaceAll('<br>', '').trim()
}

function check_cv_begin() {
  try {
    let show_error = 0
    let name_box = []
    let selector = $('#form-cv .cvo-block:not(.box-contact) [contenteditable="true"]:not(.box-title,.block-title):visible')
    // selector.removeClass('err_cv_content')
    if (selector.length) {
      selector.each(function () {
        let title = ''
        let error = 0
        if ($(this).parents('.block').length) {
          box_id = $(this).parents('.block').attr('id')
          content_suggest = data_box.find((box) => box.id == box_id)
          title = $(this).parents('.cvo-block').find('.box-title').text()
        } else if ($(this).parents('.cvo-block').length) {
          box_id = $(this).parents('.cvo-block').attr('id')
          content_suggest = data_block.find((block) => block.id == box_id)
          title = $(this).parents('.cvo-block').find('.block-title').text()
        }
        // console.log(">>> Check content_suggest 1: ", content_suggest);
        if (content_suggest) {
          //check nội dung box
          if ($(this).hasClass('box-content')) {
            if (
              (replaceStr(content_suggest.content.content) == replaceStr($(this).html()) && replaceStr(content_suggest.content.content) != '') ||
              replaceStr($(this).html().toLowerCase()).includes('cv365')
            ) {
              error = 1
            } else {
              //replaceStr(content_suggest.content));
              //replaceStr($(this).html()));
            }
          }
          //check nội dung block
          else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01') {
            content_suggest.content.forEach((item) => {
              if (
                (replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') ||
                replaceStr($(this).html().toLowerCase()).includes('cv365')
              ) {
                error = 1
              } else {
                //replaceStr(item.content));
                //replaceStr($(this).html()));
              }
            })
          }

          //check tên công ty trong block
          else if ($(this).hasClass('exp-title')) {
            content_suggest.content.forEach((item) => {
              if (
                (replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') ||
                replaceStr($(this).html().toLowerCase()).includes('cv365')
              ) {
                error = 1
              } else {
                // console.log(replaceStr($(this).html().toLowerCase()))
              }
            })
          }
          if (error == 1) {
            $(this).addClass('err_cv_content')
            show_error = 1
            if (name_box.indexOf(title) == -1 && title) {
              name_box.push(title)
            }
          }
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

function check_cv_content() {
  //Check thay đổi nội dung với các cv tạo mới
  // if ($('#issave').val() == 0) {
  let show_error = 0
  let name_box = []
  let selector = $('#form-cv .cvo-block:not(.box-contact) [contenteditable="true"]:not(.box-title,.block-title):visible')
  selector.removeClass('err_cv_content')
  if (selector.length) {
    selector.each(function () {
      let title = ''
      let error = 0
      if ($(this).parents('.block').length) {
        box_id = $(this).parents('.block').attr('id')
        content_suggest = data_box.find((box) => box.id == box_id)
        title = $(this).parents('.block').find('.box-title').text()
      } else if ($(this).parents('.cvo-block').length) {
        box_id = $(this).parents('.cvo-block').attr('id')
        content_suggest = data_block.find((block) => block.id == box_id)
        title = $(this).parents('.cvo-block').find('.block-title').text()
      }
      if (content_suggest) {
        console.log(">>> Check contentSuggest: ", content_suggest);
        //check nội dung box
        if ($(this).hasClass('box-content')) {
          // console.log(">>> Check box 1", replaceStr($(this).html()));
          // console.log(">>> Check box: ", content_suggest.content);
          // console.log(">>> Check box 2", replaceStr(content_suggest.content.content));
          if (
            (replaceStr(content_suggest.content.content) == replaceStr($(this).html()) && replaceStr(content_suggest.content.content) != '') ||
            replaceStr($(this).html().toLowerCase()).includes('cv365')
          ) {
            // console.log('loooix nef')
            error = 1
            console.log(error, 'error');
          } else {
            //replaceStr(content_suggest.content));
            //replaceStr($(this).html()));
          }
        }
        //check nội dung block
        else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01') {
          if (!$(`#${content_suggest.id}`).is(':hidden')) {
            content_suggest.content.forEach((item) => {
              // console.log(">>> Check content", replaceStr($(this).html()));
              if (
                (replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') ||
                replaceStr($(this).html().toLowerCase()).includes('cv365')
              ) {
                error = 1
                console.log(error, 'error')
              } else {
                //replaceStr(item.content));
                //replaceStr($(this).html()));
              }
            })
          }
        }
        //check vị trí công việc trong block
        // else if ($(this).hasClass('exp-subtitle')) {
        //     content_suggest.content.forEach(item => {
        //         html_suggest += render_item_suggest(item.subtitle);
        //         if (replaceStr(item.subtitle) == replaceStr($(this).html())&&replaceStr(item.subtitle)!='') {
        //             error = 1;
        //         }
        //     });
        // }

        //check tên công ty trong block
        else if ($(this).hasClass('exp-title')) {
          // console.log(content_suggest.id)
          // console.log($(`#${content_suggest.id}`).is(':hidden'))
          if (!$(`#${content_suggest.id}`).is(':hidden')) {
            content_suggest.content.forEach((item) => {
              // console.log(item, 'item')
              let path = window.location.pathname
              // console.log(path, 'path')
              if (
                (replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') ||
                replaceStr($(this).html().toLowerCase()).includes('cv365')
              ) {
                if (path == '/cv365/tao-cv-thu-ky-tro-ly/mau-10' && item.title == 'Thông tin thêm') {
                  error == 0
                  // console.log('done', error)
                } else {
                  const isHidden = !$(`#${content_suggest.id}`).is(':hidden')
                  if (!isHidden) error = 1
                }
              }
            })
          }
        }
        // console.log(error, name_box)
        // console.log('dfasdfadsfasd')
        //check tên kỹ năng,
        // else if ($(this).hasClass('skill-name')) {
        //    content_suggest);
        //     content_suggest.content.forEach(item => {
        //         if (replaceStr(item.name) == replaceStr($(this).html()) && replaceStr(item.name) != '') {
        //             error = 1;
        //         }
        //     });
        // }
        if (error == 1) {
          $(this).addClass('err_cv_content')
          show_error = 1
          if (name_box.indexOf(title) == -1 && title) {
            name_box.push(title)
            console.log(name_box)
          }
        }
      }
    })
  }
  // }

  //Check nội dung trống
  let empty = 0
  $('#form-cv .cvo-block:not(.box-contact) [contenteditable="true"]:visible').each(function () {
    if (!$(this).parents('#block05').length) {
      //Không check mục hoạt động, dự án tham gia, thông tin thêm
      if ($(this).text() == '') {
        empty = 1
        if ($(this).parents('.cvo-block').find('.block-title').length) {
          let title = $(this).parents('.cvo-block').find('.block-title').text()
          if (name_box.indexOf(title) == -1 && title) {
            // console.log('123123')
            name_box.push(title)
          }
        } else if ($(this).parents('.cvo-block').find('.box-title').length) {
          let title = $(this).parents('.cvo-block').find('.box-title').text()
          if (name_box.indexOf(title) == -1 && title) {
            // console.log('123123')
            name_box.push(title)
          }
        }
        $(this).addClass('err_cv_content')
      }
    }
  })
  // console.log('show_error', show_error)
  if (empty == 1) {
    show_error = 1
  }
  // console.log('show_error', show_error)
  if (show_error == 1) {
    // console.log('34werqwerqw')
    var msg = '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'
    msg +=
      '<div class="el-message-box"><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'
    msg += `Bạn chưa sửa các mục: <span style="color:red">${name_box.join(', ')}</span></div></div>`
    $('body').append(msg)
    // console.log('34werqwerqw')
    return false
  }
  // console.log('34werqwerqw')
  return true
}

function render_item_suggest(content) {
  return `<p class="item_suggest">${content}</p>`
}

// const focusFunc = (e) => {
// 	console.log('heheheh')
// 	try {
// 		$('.suggesting').removeClass('suggesting')
// 		let box_id
// 		if ($(this).parents('.block').length) {
// 			box_id = $(this).parents('.block').attr('id')
// 		} else if ($(this).parents('.cvo-block').length) {
// 			box_id = $(this).parents('.cvo-block').attr('id')
// 		}
// 		$(`.item_suggest`).removeClass('active')
// 		$('#hoso-scroll').css('height', $('#page-cv').height())
// 		$('#hoso-scroll .box_suggest .box_suggest_content').css('max-height', 'calc(100vh - 90px)')
// 		console.log($(this))
// 		boxOffset = $(this).offset()
// 		boxSuggestTop = $(`.item_suggest[data-id="${box_id}"]`)[0].offsetTop
// 		console.log(boxOffset)
// 		console.log(boxSuggestTop)
// 		$('#hoso-scroll .box_suggest .box_suggest_content').animate({ scrollTop: boxSuggestTop - 150 }, 'fast')
// 		$(`.item_suggest[data-id="${box_id}"]`).addClass('active')
// 		if ($('.container_sidebar_left').length && !$('.container_sidebar_left').hasClass('rutgon') && $(window).width() > 1200) {
// 			if (!$('#hdanvietcv').hasClass('active')) {
// 				let list_hide = $('#hdanvietcv').attr('data-hide')
// 				list_hide = list_hide ? list_hide : ''
// 				list_hide = list_hide.split(',')
// 				if (list_hide.indexOf(box_id) == -1) {
// 					$('#hdanvietcv').click()
// 					$('#hdanvietcv').attr('data-active', box_id)
// 				}
// 			}
// 		}
// 		console.log('done')
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

$(document)
  .on(
    "focus",
    ".block .box-content, #experience-table .ctbx .exp-content, #experience-table .ctbx .exp-subtitle, #experience-table .ctbx .exp-title,.skill-name",
    function (e) {
      $(".suggesting").removeClass("suggesting");
      let box_id;
      if ($(this).parents(".block").length) {
        box_id = $(this).parents(".block").attr("id");
      } else if ($(this).parents(".cvo-block").length) {
        box_id = $(this).parents(".cvo-block").attr("id");
      }
      $(`.item_suggest`).removeClass("active");
      $("#hoso-scroll").css("height", $("#page-cv").height());
      $("#hoso-scroll .box_suggest .box_suggest_content").css(
        "max-height",
        "calc(100vh - 90px)"
      );
      // console.log($(this))
      boxOffset = $(this).offset();
      // boxSuggestTop = $(`.item_suggest[data-id="${box_id}"]`)[0].offsetTop;
      // console.log(boxOffset)
      // console.log(boxSuggestTop)
      // $("#hoso-scroll .box_suggest .box_suggest_content").animate(
      //   { scrollTop: boxSuggestTop - 150 },
      //   "fast"
      // );
      $(`.item_suggest[data-id="${box_id}"]`).addClass("active");
      if (
        $(".container_sidebar_left").length &&
        !$(".container_sidebar_left").hasClass("rutgon") &&
        $(window).width() > 1200
      ) {
        if (!$("#hdanvietcv").hasClass("active")) {
          let list_hide = $("#hdanvietcv").attr("data-hide");
          list_hide = list_hide ? list_hide : "";
          list_hide = list_hide.split(",");
          if (list_hide.indexOf(box_id) == -1) {
            $("#hdanvietcv").click();
            $("#hdanvietcv").attr("data-active", box_id);
          }
        }
      }
      // console.log('done')
      // focusFunc(e)
      // return false;
      // if ($('#page-cv').attr('data-type') == 'classic') {
      //     $('#hdanvietcv').click();
      // }
    }
  )
  .on('click', '.cvo-block:not(.box-contact) [contenteditable="true"]', function () {
    if ($(this).text() != '' && $(this).hasClass('err_cv_content')) {
      $(this).text('')
      $(this).removeClass('err_cv_content')
    }
  })
  .on('input', '.cvo-block:not(.box-contact,.box-skills) [contenteditable="true"]', function () {
    if (!$(this).parents('#block03').length && !$(this).parents('#block04').length && !$(this).parents('#block05').length) {
      //Không check mục hoạt động, dự án tham gia, thông tin thêm
      if ($(this).text() == '') {
        $(this).addClass('err_cv_content')
      } else {
        $(this).removeClass('err_cv_content')
      }
    }
  })
  .on('input', '#cv-profile-phone,#cv-profile-email,#cv-profile-address', function () {
    if ($(this).text() != '') {
      $(this).removeAttr('style')
    } else {
      $(this).css('outline', 'red dashed 1px')
    }
  })
  .on('click', function () {
    var target = $(event.target)
    if (!target.closest('.el-message-box').length && !target.closest('.item.box_btn').length) {
      $('.v-modal').remove(), $('.el-message-box__wrapper').remove()
    }
  })
  .on('click', '.item_suggest .open', function () {
    if ($(this).parents('.item_suggest').hasClass('active')) {
      $(this).parents('.item_suggest').removeClass('active')
    } else {
      $(this).parents('.item_suggest').addClass('active')
    }
  })
  // .on('focus', '.box-content,.exp-subtitle, .exp-content,.exp-date,.exp-title', function() {
  //     let selector = $(this);
  //     if ($('#page-cv').attr('data-type') == 'mobile') {
  //         if ($(this).parents('#page-cv').length) {
  //             $('#page-cv').css('zoom', '1.2');
  //             setTimeout(function() {
  //                 selector[0].scrollIntoView({
  //                     behavior: "smooth", // or "auto" or "instant"
  //                     block: "center" // or "end"
  //                 });
  //             }, 0)
  //             setTimeout(function() {
  //                 $('#cvo-toolbar').removeClass('fx');
  //             }, 300);
  //         } else {
  //             $(document).css('zoom', '1');
  //         }
  //         return false;
  //     }
  // })
  .on('focus', '.box-title,.block-title', function () {
    let selector = $(this)
    if ($('#page-cv').attr('data-type') == 'mobile') {
      $('#page-cv').css('zoom', '1')
      /* setTimeout(function () {
        selector[0].scrollIntoView({
          behavior: 'smooth', // or "auto" or "instant"
          block: 'center', // or "end"
        })
      }, 0) */
      setTimeout(function () {
        $('#cvo-toolbar').removeClass('fx')
      }, 300)
      return false
    }
  })
  .on('click', '.close_zoom_cv', function () {
    $('#zoom_cv').hide()
    $('#cv_mau_new').hide()
  })
  .on('click', '.box_suggest .title', function () {
    let cid = $('#page-taocv').attr('data-cate-id')
    $.ajax({
      url: 'site/get_cv_mau',
      type: 'POST',
      data: { cid },
      dataType: 'JSON',
      success: function (result) {
        if (result) {
          $('#zoom_cv .img_cv').attr('src', result.link_image)
          $('#zoom_cv .view_count').text(result.view_count)
          $('#zoom_cv .view_time').text(result.time)
          $('#zoom_cv').show()
        }
      },
    })
  })

function changeLayoutCv() {
  // return false;

  let layout = detectLayout()
  // console.log(layout)
  if (layout.cv_all != '.all') {
    console.log('falseeeee')
    return false
  }
  console.log('Phân trang')
  let cv_all = layout.cv_all,
    cv_left = layout.cv_left,
    cv_right = layout.cv_right;
  //$(`#form-cv #cv-main`).length);
  if (!$("#form-cv .cv_page").length) {
    let htmlTop =
      $("#cv-top")[0] && !$("#cv-top").parents(".all").length
        ? $("#cv-top")[0].outerHTML
        : "",
      htmlFooter = $("#form-cv .footer")[0]
        ? $("#form-cv .footer")[0].outerHTML
        : "",
      htmlContent = $(`#form-cv ${cv_all}`)[0].outerHTML;
    //htmlTop);
    let html = `<div class="cv_page" data-page="1">
                              ${htmlTop}
                              ${htmlContent}
                              ${htmlFooter}
                          </div>`
    // $('#cv-top,#form-cv .footer,#form-cv .all').remove()
    const pathname = window.location.pathname

    $('#form-cv').prepend(html)

    $('#sortable').addClass('connectedSortable').addClass('sortable')
    $('#sort_block').addClass('connectedSortable').addClass('sort_block')
    if (pathname === '/cv365/tao-cv-it/mau-02') {
      $('.cv_page > #cv-top').remove()
      $('#form-cv > .page_more').remove()
      // console.log($('#form-cv > .page_more').length)
      $('#form-cv > #cv-main')[1] ? $('#form-cv > #cv-main')[1].remove() : ''
    }
  }
  let page = $('.cv_page').length
  adjustPage(1)
  // if (window.location.href.includes('/cv365/site/xem_cv_nodejs')) {
  //     // let page = $('.cv_page').attr('data-page')
  // } else {
  //     const LIST = ['/cv365/tao-cv-thu-vien/mau-09']
  //     console.log(window.location.pathname)
  //     if (LIST.includes(window.location.pathname)) {
  //         // console.log('adjust Page 1', page)
  //         adjustPage(page)
  //     } else if (window.location.pathname === '/cv365/tao-cv-mau-thiet-ke-sang-tao/cv-xin-viec-td-ionet') {
  //         // console.log('adjust Page 2', page)
  //         adjustPage(1)
  //     } else {
  //         // console.log('adjust Page 3', page)
  //         adjustPage(page)
  //             // deleteBox(window.location.pathname)
  //     }
  // }
}

function detectLayout() {
  let cv_all = '.all',
    cv_left = '#cv-main',
    cv_right = '#cv-content',
    selector_main = '.all>#cv-main',
    selector_content = '.all>#cv-content'

  if ($('.cv_page').length) {
    selector_main = '.cv_page[data-page="1"] .all>#cv-main'
    selector_content = '.cv_page[data-page="1"] .all>#cv-content'
  }

  if (!$('#form-cv .all').length || !$(selector_main).length || !$(selector_content).length) {
    cv_all = ''
    if ($('#cv-main>#cv-content').length) {
      cv_all = '#cv-main'
      cv_left = '#cv-right'
      cv_right = '#cv-content'
    }
  }
  // console.log(cv_all)
  let cv_left_offset = $(cv_left).first().offset(),
    cv_left_height = $(cv_left).first().outerHeight(true),
    cv_right_offset = $(cv_right).first().offset(),
    cv_right_height = $(cv_right).first().outerHeight(true)
  if (cv_left_offset && cv_right_offset) {
    //Check layout dạng dọc thì không phân trang
    if (cv_left_offset.top < cv_right_offset.top) {
      if (cv_right_offset.top - cv_left_height > 0) {
        cv_all = ''
      }
    } else if (cv_left_offset.top > cv_right_offset.top) {
      if (cv_left_offset.top - cv_right_height > 0 && cv_right_height > 0) {
        cv_all = ''
      }
    }
  } else {
    // console.log('test4')
    cv_all = ''
  }
  // console.log(cv_all)
  let data = {
    cv_all: cv_all,
    cv_left: cv_left,
    cv_right: cv_right,
  }
  //data);
  // console.log(data)
  return data
}
var height_page = 1118

//Xóa các box thừa
// function deleteBox(path) {
//   // console.log('chayj nef', path)
//   if (
//     path == '/cv365/tao-cv-ky-thuat-ung-dung/mau-11' ||
//     path == '/cv365/tao-cv-ke-toan/mau-14' ||
//     path == '/cv365/tao-cv-my-pham-thoi-trang-trang-suc/mau-12' ||
//     path == '/cv365/tao-cv-thiet-ke-my-thuat/mau-10' ||
//     path == '/cv365/tao-cv-sinh-vien-moi-ra-truong/mau-12'
//   ) {
//     //Xóa các box thừa
//     if ($('div#box07').length > 1) {
//       for (let i = 1; i < $('div#box07').length; i++) {
//         $('div#box07')[i] ? $('div#box07')[i].remove() : ''
//       }
//     }
//     if ($('div#box06').length > 1) {
//       for (let i = 1; i < $('div#box06').length; i++) {
//         $('div#box06')[i] ? $('div#box06')[i].remove() : ''
//       }
//     }
//     if ($('div#box05').length > 1) {
//       for (let i = 1; i < $('div#box05').length; i++) {
//         $('div#box05')[i] ? $('div#box05')[i].remove() : ''
//       }
//     }
//     if ($('div#box04').length > 1) {
//       for (let i = 1; i < $('div#box04').length; i++) {
//         $('div#box04')[i] ? $('div#box05')[i].remove() : ''
//       }
//     }
//     if ($('div#box03').length > 1) {
//       for (let i = 1; i < $('div#box03').length; i++) {
//         $('div#box03')[i] ? $('div#box03')[i].remove() : ''
//       }
//     }
//     if ($('div#box02').length > 1) {
//       for (let i = 1; i < $('div#box02').length; i++) {
//         $('div#box02')[i] ? $('div#box02')[i].remove() : ''
//       }
//     }
//     if ($('div#box01').length > 1) {
//       for (let i = 1; i < $('div#box01').length; i++) {
//         $('div#box01')[i] ? $('div#box01')[i].remove() : ''
//       }
//     }
//     if (document.querySelectorAll('#block02').length > 1) {
//       for (let i = 1; i < document.querySelectorAll('#block02').length; i++) {
//         document.querySelectorAll('#block02')[i].remove()
//       }
//     }
//     if (document.querySelectorAll('#block01').length > 1) {
//       for (let i = 1; i < document.querySelectorAll('#block01').length; i++) {
//         document.querySelectorAll('#block01')[i].remove()
//       }
//     }
//     if (document.querySelectorAll('#block03').length > 1) {
//       for (let i = 1; i < document.querySelectorAll('#block03').length; i++) {
//         document.querySelectorAll('#block03')[i].remove()
//       }
//     }
//     if (document.querySelectorAll('#block04').length > 1) {
//       for (let i = 1; i < document.querySelectorAll('#block04').length; i++) {
//         document.querySelectorAll('#block04')[i].remove()
//       }
//     }
//     if (document.querySelectorAll('#block05').length > 1) {
//       for (let i = 1; i < document.querySelectorAll('#block05').length; i++) {
//         document.querySelectorAll('#block05')[i].remove()
//       }
//     }
//     //ẩn footer thừa màn chỉnh sửa
//     if (document.querySelectorAll('.footer').length > 1) {
//       for (let i = 1; i < document.querySelectorAll('.footer').length; i++) {
//         document.querySelectorAll('.footer')[i].remove()
//       }
//     }
//   }
// }

function adjustPage(page = 1) {
  if ($('.page_cv').attr('data-nopagi') == 1) {
    unPaginationCV()
  } else {
    let layout = detectLayout()
    if (layout.cv_all != '.all') {
      return false
    }
    $('#form-cv .watermark').remove()
    const pathname = window.location.pathname
    removeLineHeight()

    // console.log(page, 'page')
    if (pathname !== '/cv365/tao-cv-quan-tri-kinh-doanh/mau-15') {
      // console.log('paginationCv', page)
      paginationCv(page)
    } else {
      // console.log('paginationCv xxx', page)
      paginationCv(2)
    }

    // adjustLineHeight1()
    // adjustLineHeightVer2()
    // adjustLineHeight()

    // adjustLineHeight()
    //Thêm marginTop  cho các block0x
    /* for (let index = 1; index <= 5; index++) {
      if (document.querySelector(`#block0${index}`)) {
        document.querySelector(`#block0${index}`).style.marginTop = `15px`
      }
      console.log('done')
    } */

    //Thêm watermark
    addWatermark()
  }
}

function paginationCv(page) {
  try {
    let layout = detectLayout()
    let cv_all = layout.cv_all,
      cv_left = layout.cv_left,
      cv_right = layout.cv_right
    if (cv_all != '.all') {
      // return false;
    }
    // console.log('cv_all:', cv_all);
    cv_all = '.all'
    // console.log(page)

    let page_current = $(`#form-cv .cv_page[data-page="${page}"]`)
    page_current.removeClass('height_page')
    let heightAll = page_current.outerHeight(true),
      heightTop = page_current.find('#cv-top')[0] ? page_current.find('#cv-top').outerHeight(true) : 0,
      heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0,
      htmlTop =
        page_current.find('#cv-top')[0] && !page_current.find('#cv-top').parents(`${cv_all}`).length ? page_current.find('#cv-top')[0].outerHTML : '',
      htmlFooter = page_current.find('.footer')[0] ? page_current.find('.footer')[0].outerHTML : '',
      htmlContent = page_current.find(`${cv_all}`)[0] ? page_current.find(`${cv_all}`)[0].outerHTML : ''

    // console.log(page)
    let heightFreeLeft = 0,
      heightFreeRight = 0
    let nextPage = $(`#form-cv .cv_page[data-page="${Number(page) + 1}"]`),
      new_page = 1
    while (nextPage.length || heightAll > height_page) {

      page_current = $(`#form-cv .cv_page[data-page="${page}"]`)
      page_current.removeClass('height_page')
      page_current.find(`${cv_right}`).removeAttr('style')
      page_current.find(`${cv_left}`).removeAttr('style')
      heightAll = page_current.outerHeight(true)
      nextPage = $(`#form-cv .cv_page[data-page="${Number(page) + 1}"]`)
      prevPage = $(`#form-cv .cv_page[data-page="${Number(page) - 1}"]`)
      // console.log('Page:', page, heightAll);
      // console.log(nextPage.length)
      heightTop =
        page_current.find('#cv-top')[0] && !page_current.find('#cv-top').parents(`${cv_all}`).length ?
          page_current.find('#cv-top').outerHeight(true) :
          0
      heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0
      htmlTop = page_current.find('#cv-top')[0] ? page_current.find('#cv-top')[0].outerHTML : ''
      htmlFooter = page_current.find('.footer')[0] ? page_current.find('.footer')[0].outerHTML : ''
      htmlContent = page_current.find(`${cv_all}`)[0] ? page_current.find(`${cv_all}`)[0].outerHTML : ''
      heightFreeLeft = 0
      heightFreeRight = 0

      page_current.find(`${cv_left}`).removeAttr('style')
      page_current.find(`${cv_right}`).removeAttr('style')
      new_page = 1
      if (nextPage.length) {
        new_page = 0
      }
      if (!nextPage.length && heightAll > height_page) {
        let html = `<div class="cv_page page_more" data-page="${Number(page) + 1}"></div>`
        $(html).insertAfter(page_current)
        nextPage = $(`#form-cv .cv_page[data-page="${Number(page) + 1}"]`)
        nextPage.prepend(htmlContent)
        nextPage.find('#cv-top').remove()
        nextPage.find(`${cv_right} #sort_block`).html('')
        nextPage.find(`${cv_right} .block.cvo-block `).remove('')
        nextPage.find(`${cv_left} #sortable`).html('')
      }
      if (heightFooter && nextPage.length) {
        page_current.find('.footer').remove()
        // htmlNextPage.push(htmlFooter);
        if (!nextPage.find('.footer').length) {
          nextPage.append(htmlFooter)
        }
      }
      if (nextPage.length && !nextPage.find('.all').length && heightAll > height_page) {
        nextPage.prepend(htmlContent)
        nextPage.find('#cv-top').remove()
        nextPage.find(`${cv_right} #sort_block`).html('')
        nextPage.find(`${cv_right} .block.cvo-block `).remove('')
        nextPage.find(`${cv_left} #sortable`).html('')
      }
      //Đẩy nội dung xuống page tiếp theo
      if (heightAll > height_page) {
        page_current.find(`${cv_right}`).hide()

        let boxLength = page_current.find(`${cv_left} .block`).length
        let htmlBox = []
        for (let i = boxLength - 1; i >= 0; i--) {
          if (page_current.outerHeight(true) > height_page) {
            let html = page_current.find(`${cv_left} .block`).eq(i)[0].outerHTML
            page_current.find(`${cv_left} .block`).eq(i).remove()
            // htmlBox.push(html);
            nextPage.find(`${cv_left} #sortable`).prepend(html)
          }
        }
        page_current.find(`${cv_right}`).show()
        page_current.find(`${cv_left}`).hide()

        let blockLength = page_current.find(`${cv_right} .cvo-block`).length
        for (let i = blockLength - 1; i >= 0; i--) {
          if (page_current.outerHeight(true) > height_page) {
            let html = page_current.find(`${cv_right} .cvo-block`).eq(i)[0].outerHTML
            let blockHeight = page_current.find(`${cv_right} .cvo-block`).eq(i).outerHeight(true)
            let id = page_current.find(`${cv_right} .cvo-block`).eq(i).attr('id')
            let head = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0] ?
              page_current.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0].outerHTML :
              ''
            let blockControls = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0] ?
              page_current.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0].outerHTML :
              ''
            let childLength = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.experience').length

            if (childLength > 1 || nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
              let d = 0
              for (let k = childLength - 1; k >= 0; k--) {
                let htmlChild = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k)[0].outerHTML
                if (page_current.outerHeight(true) > height_page) {
                  if (nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).prepend(htmlChild)
                  } else {
                    nextPage.find(`${cv_right} #sort_block`).prepend(html)
                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] .experience`).remove()
                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).prepend(htmlChild)
                  }
                  page_current.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k).remove()
                  d = k
                }
              }
              if (d > 0) {
                nextPage.find(`${cv_right} .cvo-block[id="${id}"] .blockControls`).remove()
                nextPage.find(`${cv_right} .cvo-block[id="${id}"] .head`).remove()
              } else {
                if (!nextPage.find(`${cv_right} .cvo-block[id="${id}"] .head`).length) {
                  nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).prepend(blockControls)
                  nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).prepend(head)
                }
                page_current.find(`${cv_right} .cvo-block`).eq(i).remove()
              }
            } else {
              if (blockHeight <= height_page) {
                nextPage.find(`${cv_right} #sort_block`).prepend(html)
                page_current.find(`${cv_right} .cvo-block`).eq(i).remove()
              }
            }
          } else {
            break;
          }
        }
        heightFreeRight = height_page - page_current.outerHeight(true)
      }

      page_current.find(`${cv_left}`).show()
      page_current.find(`${cv_right}`).hide()
      //Đẩy nội dung từ page sau lên page hiện tại
      heightFreeLeft = height_page - page_current.outerHeight(true)
      if (heightFreeLeft > 0) {
        let boxLength = nextPage.find(`${cv_left} .block`).length
        let listBoxRemove = []
        for (let i = 0; i <= boxLength - 1; i++) {
          let boxHeight = nextPage.find(`${cv_left} .block`).eq(i).outerHeight(true)
          if (boxHeight < heightFreeLeft) {
            let html = nextPage.find(`${cv_left} .block`).eq(i)[0].outerHTML
            page_current.find(`${cv_left} #sortable`).append(html)
            // console.log(html);
            listBoxRemove.push(i)
            heightFreeLeft -= boxHeight
          } else {
            break
          }
        }
        listBoxRemove.reverse().forEach(function callback(item, i) {
          nextPage.find(`${cv_left} .block`).eq(item).remove()
        })
      }

      page_current.find(`${cv_left}`).hide()
      page_current.find(`${cv_right}`).show()
      heightFreeRight = height_page - page_current.outerHeight(true)
      // console.log(nextPage.length, 'asdsads')
      if (heightFreeRight > 0 && nextPage.length > 0) {
        let blockLength = nextPage.find(`${cv_right} .cvo-block`).length
        let listBlockDelete = []

        for (let i = 0; i <= blockLength - 1; i++) {
          // console.log(i)
          let html = nextPage.find(`${cv_right} .cvo-block`).eq(i)[0] ? nextPage.find(`${cv_right} .cvo-block`).eq(i)[0].outerHTML : i
          let id = nextPage.find(`${cv_right} .cvo-block`).eq(i).attr('id')
          let head = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0] ?
            nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0].outerHTML :
            ''
          let blockControls = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0] ?
            nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0].outerHTML :
            ''
          let childLength = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').length
          let boxHeight = nextPage.find(`${cv_right} .cvo-block`).eq(i).outerHeight(true)
          if (childLength > 1 || page_current.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
            let childRemove = []
            for (let k = 0; k <= childLength - 1; k++) {
              let htmlChild = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k)[0].outerHTML
              let heightChild = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k).outerHeight(true)
              if (k == 0 && childLength > 1) {
                let heightRemove = 0
                for (let j = 1; j < childLength; j++) {
                  heightRemove += nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(j).outerHeight(true)
                }
                heightChild = boxHeight - heightRemove
              }
              if (heightFreeRight > heightChild) {
                if (page_current.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
                  page_current.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).append(htmlChild)
                } else {
                  page_current.find(`${cv_right} #sort_block`).append(html)
                  page_current.find(`${cv_right} .cvo-block[id="${id}"] .experience`).remove()
                  page_current.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).append(htmlChild)
                }
                childRemove.push(k)
                heightFreeRight -= heightChild
                if (k == 0) {
                  if (head) {
                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] .blockControls`).remove()
                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] .head`).remove()
                  }
                }
              } else {
                heightFreeRight -= heightChild
              }
            }
            childRemove.reverse().forEach((val) => {
              nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(val).remove()
            })
            heightFreeRight -= boxHeight
            if (!nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').length) {
              nextPage.find(`${cv_right} .cvo-block`).eq(i).remove()
            }
          } else {
            if (heightFreeRight >= boxHeight) {
              page_current.find(`${cv_right} #sort_block`).append(html)
              listBlockDelete.push(i)
              heightFreeRight -= boxHeight
            } else {
              break
            }
          }
        }

        listBlockDelete.reverse().forEach((val) => {
          nextPage.find(`${cv_right} .cvo-block `).eq(val).remove()
        })
      }
      page_current.find(`${cv_right}`).show()
      page_current.find(`${cv_left}`).show()
      if (!heightFooter) {
        heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0
        heightFreeLeft -= heightFooter
        heightFreeRight -= heightFooter
      }
      let heightAllNew = page_current.outerHeight(true)
      if (!nextPage.find(`${cv_left} .block:visible`).length &&
        !nextPage.find(`${cv_right} .cvo-block:visible`).length &&
        heightAllNew + heightFooter <= height_page
      ) {
        // console.log('allnew1:', heightAllNew)
        if (nextPage.find('.footer').length) {
          page_current.append(nextPage.find('.footer')[0].outerHTML)
          if (page_current.outerHeight(true) <= height_page) {
            nextPage.find('.footer').remove()
          } else {
            page_current.find('.footer').remove()
          }
        }
        // if (Number(page) + 1 == $('cv_page').length) {
        //     nextPage.remove()
        //     nextPage = ''
        // }
      }

      page_current.addClass('height_page')

      page = Number(page)
      page++
    }

    //Xóa các trang thừa
    for (let i = $(`#form-cv .cv_page`).length; i >= 0; i--) {
      let pagePrev = $(`#form-cv .cv_page[data-page="${i - 1}"]`)
      let page = $(`#form-cv .cv_page[data-page="${i}"]`)
      if (!page.find(`${cv_left} .block:visible`).length && !page.find(`${cv_right} .cvo-block:visible`).length && !page.find(`.footer`).length) {
        //Chuyển nội dung box đang ẩn lên page trước
        if (page.find(`${cv_left} .block:hidden`).length) {
          for (let i = 0; i < page.find(`${cv_left} .block:hidden`).length; i++) {
            let id = page.find(`${cv_left} .block:hidden`)[i].getAttribute('id')
            console.log(id)
            let html = page.find(`${cv_left} .block:hidden`)[i].outerHTML
            pagePrev.find(`${cv_left} #sortable`).append(html)
          }
        }
        if (page.find(`${cv_right} .cvo-block:hidden`).length) {
          for (let i = 0; i < page.find(`${cv_right} .cvo-block:hidden`).length; i++) {
            let id = page.find(`${cv_right} .cvo-block:hidden`)[i].getAttribute('id')
            console.log(id)
            let html = page.find(`${cv_right} .cvo-block:hidden`)[i].outerHTML
            pagePrev.find(`${cv_right} #sort_block`).append(html)
          }
        }
        page.remove()
      }
    }


    //Thêm padding để full trang
    heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0
    // while (!page_current.length && page >= 0) {
    //   page_current = $(`#form-cv .cv_page[data-page="${Number(page) - 1}"]`)
    //   page--
    // }

    if (heightFreeLeft > heightFreeRight) {
      page_current.find(`${cv_left}`).css('padding-bottom', heightFreeLeft - 20)
    } else {
      if (heightFreeRight > 0) {
        page_current.find(`${cv_right}`).css('padding-bottom', heightFreeRight - 20)
      }
    }
    if (page_current.attr('data-page') > $(`#form-cv .cv_page`).length) {
      paginationCv($(`#form-cv .cv_page`).length);
    }

    let url_image = $('#form-cv').attr('data-background')
    changeBackgroundCv(url_image)
  } catch (error) {
    console.log(error)
  }
}

function merge_block(block) {
  let id = block.attr('id'),
    page = block.parents('.cv_page').attr('data-page')
  let nextPage = $(`.cv_page[data-page="${Number(page) + 1}"]`)
  if (nextPage.length) {
    let check = nextPage.find(`#${id}`).length
    if (check) {
      let htmlAdd = nextPage.find(`#${id} #experience-table`).html()
      block.find(`#experience-table`).append(htmlAdd)
      nextPage.find(`#${id}`).remove()
    }
  }
}

function removeLineHeight() {
  let totalPage = $('.cv_page').length
  // console.log(totalPage, 'removeLineHeight')
  for (let page = 1; page <= totalPage; page++) {
    $('.cv_page .all').removeAttr('style')
    $('.cv_page .sortable .block:visible').removeAttr('style')
    $('.cv_page .sort_block .cvo-block:visible').removeAttr('style')
    $('.cv_page .sort_block .cvo-block .ctbx.experience:visible').removeAttr('style')
  }
}

function adjustLineHeight() {
  // return false;
  let totalPage = $('.cv_page').length
  // console.log(totalPage, 'adjustLineHeight')
  for (let page = 1; page <= totalPage; page++) {
    let curentPage = $(`.cv_page[data-page="${page}"]`)
    curentPage.removeClass('height_page')
    curentPage.find('#cv-content').hide()
    heightFreeLeft = height_page - curentPage.outerHeight(true)
    curentPage.find('#cv-content').show()
    curentPage.find('#cv-main').hide()
    heightFreeRight = height_page - curentPage.outerHeight(true)
    curentPage.find('#cv-main').show()
    heightFreeLeft = Number(heightFreeLeft)
    heightFreeRight = Number(heightFreeRight)

    let heightFreeMax = heightFreeRight > heightFreeLeft ? heightFreeRight : heightFreeLeft
    let marginForAll = 0
    if (curentPage.find('#cv-top').length && heightFreeMax < 200) {
      marginForAll = heightFreeMax * 0.25
    }
    heightFreeLeft -= marginForAll
    heightFreeRight -= marginForAll
    //`left: ${heightFreeLeft}`);
    //`right: ${heightFreeRight}`);
    curentPage.find('.all').css('padding-top', marginForAll)
    if (heightFreeLeft < 200) {
      let marginForBox = heightFreeLeft * 0.5
      let marginForContent = heightFreeLeft - marginForBox
      //Thêm margin cho các box cha
      let blockLength = curentPage.find('.sortable .block').length
      curentPage.find('.sortable .block').css('margin-top', marginForBox / blockLength)

      //Thêm margin cho các box cha
      let contentLength = curentPage.find('.sortable .block .box-content').length
      const pathname = window.location.pathname
      if (pathname == '/cv365/tao-cv-my-pham-thoi-trang-trang-suc/mau-12') {
        curentPage.find('.sortable .block .box-content').css('margin-top', '10px')
      } else {
        // console.log(marginForContent, blockLength)
        curentPage.find('.sortable .block .box-content').css('margin-top', marginForContent / blockLength)
      }
    }
    if (heightFreeRight < 200) {
      let marginForBox = heightFreeRight * 0.5
      let marginForContent = heightFreeRight - marginForBox
      //Thêm margin cho các box cha
      let blockLength = curentPage.find('.sort_block .cvo-block').length
      curentPage.find('.sort_block .cvo-block').css('margin-top', marginForBox / blockLength)

      //Thêm margin cho các box con

      let contentLength = curentPage.find('.sort_block .cvo-block .ctbx.experience').length
      curentPage.find('.sort_block .cvo-block .ctbx.experience').css('margin-top', marginForContent / contentLength)
    }
    curentPage.addClass('height_page')
  }
}

function adjustLineHeight1() {
  let totalPage = $('.cv_page').length
  let lastPage = $(`.cv_page[data-page="${totalPage}"]`)
  // console.log(totalPage, 'adjustLineHeight1')
  lastPage.find('#cv-content').removeAttr('style')
  lastPage.find('#cv-main').removeAttr('style')

  //Lấy chiều dài của 2 cột ở page cuối
  lastPage.removeClass('height_page')
  lastPage.find('.all #cv-content').hide()
  let lastPageHeightLeft = lastPage.find('.all').height() + lastPage.find('.footer').height()
  lastPage.find('.all #cv-main').hide()
  lastPage.find('.all #cv-content').show()
  let lastPageHeightRight = lastPage.find('.all').height() + lastPage.find('.footer').height()
  lastPage.find('.all #cv-main').show()
  lastPage.addClass('height_page')

  freeHeightLeft = 0
  freeHeightRight = 0

  //Lấy khoảng trống còn dư của 2 cột
  for (let page = 1; page < totalPage; page++) {
    let currentPage = $(`.cv_page[data-page="${page}"]`)

    if (page == totalPage - 1) {
      currentPage.removeClass('height_page')
      currentPage.find(`#cv-main`).removeAttr('style')
      currentPage.find(`#cv-content`).removeAttr('style')
      currentPage.find('#cv-content').hide()
      freeHeightLeft += height_page - currentPage.outerHeight(true)
      currentPage.find('#cv-content').show()

      currentPage.find('#cv-main').hide()
      freeHeightRight += height_page - currentPage.outerHeight(true)
      currentPage.find('#cv-main').show()
      currentPage.find('#cv-main .cvo-block').each(function () {
        let marginTop = $(this).css('margin-top').replace('px', '')
        let marginBottom = $(this).css('margin-bottom').replace('px', '')
        freeHeightLeft += Number(marginTop)
        freeHeightLeft += Number(marginBottom)
      })
      currentPage.find('#cv-content .cvo-block').each(function () {
        let marginTop = $(this).css('margin-top').replace('px', '')
        let marginBottom = $(this).css('margin-bottom').replace('px', '')
        freeHeightRight += Number(marginTop)
        freeHeightRight += Number(marginBottom)
      })
    }
    // currentPage.addClass('height_page');
  }
  if (lastPageHeightLeft <= 200 && lastPageHeightRight <= 200 && freeHeightLeft >= lastPageHeightLeft && freeHeightRight >= lastPageHeightRight) {
    let beforeLastPage = $(`.cv_page[data-page="${totalPage - 1}"]`)
    beforeLastPage.find('#cv-content').removeAttr('style')
    beforeLastPage.find('#cv-main').removeAttr('style')

    beforeLastPage.find('.all #cv-content').hide()
    let paddingLeft = height_page - beforeLastPage.outerHeight(true)
    beforeLastPage.find('.all #cv-main').hide()
    beforeLastPage.find('.all #cv-content').show()
    let paddingRight = height_page - beforeLastPage.outerHeight(true)
    beforeLastPage.find('.all #cv-main').show()
    let heightMarginLeft = freeHeightLeft - paddingLeft
    let heightMarginRight = freeHeightRight - paddingRight
    beforeLastPage.find('#cv-main .block').each(function () {
      let marginTop = $(this).css('margin-top').replace('px', '')
      let marginBottom = $(this).css('margin-bottom').replace('px', '')
      let marginTopAdjust = (marginTop / heightMarginLeft) * marginTop,
        marginBottomAdjust = (marginBottom / heightMarginLeft) * marginBottom
      $(this).css('margin-top', marginTopAdjust)
      $(this).css('margin-bottom', marginBottomAdjust)
    })
    beforeLastPage.find('#cv-content .cvo-block').each(function () {
      let marginTop = $(this).css('margin-top').replace('px', '')
      let marginBottom = $(this).css('margin-bottom').replace('px', '')
      let marginTopAdjust = (marginTop / heightMarginRight) * (freeHeightLeft - lastPageHeightRight),
        marginBottomAdjust = (marginBottom / heightMarginRight) * (freeHeightRight - lastPageHeightRight)
      $(this).css('margin-top', marginTopAdjust)
      $(this).css('margin-bottom', marginBottomAdjust)
    })

    // for (let page = 1; page < totalPage; page++) {
    //     let currentPage = $(`.cv_page[data-page="${page}"]`);
    //     $('.cv_page .cvo-block:visible').each(function() {
    //         let marginTop = $(this).css('margin-top').replace('px', '');
    //         let marginBottom = $(this).css('margin-bottom').replace('px', '');
    //         let marginTopAdjust = (marginTop / freeHeight) * (freeHeight - lastPageHeight),
    //             marginBottomAdjust = (marginBottom / freeHeight) * (freeHeight - lastPageHeight);
    //         $(this).css('margin-top', marginTopAdjust);
    //         $(this).css('margin-bottom', marginBottomAdjust);
    //     })
    // }
  }
  paginationCv(page)
}

function adjustLineHeightVer2() {
  let totalPage = $('.cv_page').length
  let lastPage = $(`.cv_page[data-page="${totalPage}"]`)
  // console.log(totalPage, 'adjustLineHeight1')
  lastPage.find('#cv-content').removeAttr('style')
  lastPage.find('#cv-main').removeAttr('style')

  //Lấy chiều dài của 2 cột ở page cuối
  lastPage.removeClass('height_page')
  lastPage.find('.all #cv-content').hide()
  let lastPageHeightLeft = lastPage.find('.all').height() + lastPage.find('.footer').height()
  lastPage.find('.all #cv-main').hide()
  lastPage.find('.all #cv-content').show()
  let lastPageHeightRight = lastPage.find('.all').height() + lastPage.find('.footer').height()
  lastPage.find('.all #cv-main').show()
  lastPage.addClass('height_page')

  freeHeightLeft = 0
  freeHeightRight = 0

  //Lấy khoảng trống còn dư của 2 cột
  for (let page = 1; page < totalPage; page++) {
    let currentPage = $(`.cv_page[data-page="${page}"]`)

    if (page == totalPage - 1) {
      currentPage.removeClass('height_page')
      currentPage.find(`#cv-main`).removeAttr('style')
      currentPage.find(`#cv-content`).removeAttr('style')
      currentPage.find('#cv-content').hide()
      freeHeightLeft += height_page - currentPage.outerHeight(true)
      currentPage.find('#cv-content').show()

      currentPage.find('#cv-main').hide()
      freeHeightRight += height_page - currentPage.outerHeight(true)
      currentPage.find('#cv-main').show()
      currentPage.find('#cv-main .cvo-block').each(function () {
        let marginTop = $(this).css('margin-top').replace('px', '')
        let marginBottom = $(this).css('margin-bottom').replace('px', '')
        freeHeightLeft += Number(marginTop)
        freeHeightLeft += Number(marginBottom)
      })
      currentPage.find('#cv-content .cvo-block').each(function () {
        let marginTop = $(this).css('margin-top').replace('px', '')
        let marginBottom = $(this).css('margin-bottom').replace('px', '')
        freeHeightRight += Number(marginTop)
        freeHeightRight += Number(marginBottom)
      })
      // Lấy danh sách tất cả các phần tử phù hợp với selector
      // let elm = document.querySelectorAll('#cv-content .cvo-block.ui-sortable-handle')
    }
    // currentPage.addClass('height_page');
  }
  if (lastPageHeightLeft <= 200 && lastPageHeightRight <= 200 && freeHeightLeft >= lastPageHeightLeft && freeHeightRight >= lastPageHeightRight) {
    let beforeLastPage = $(`.cv_page[data-page="${totalPage - 1}"]`)
    beforeLastPage.find('#cv-content').removeAttr('style')
    beforeLastPage.find('#cv-main').removeAttr('style')

    beforeLastPage.find('.all #cv-content').hide()
    let paddingLeft = height_page - beforeLastPage.outerHeight(true)
    beforeLastPage.find('.all #cv-main').hide()
    beforeLastPage.find('.all #cv-content').show()
    let paddingRight = height_page - beforeLastPage.outerHeight(true)
    beforeLastPage.find('.all #cv-main').show()
    let heightMarginLeft = freeHeightLeft - paddingLeft
    let heightMarginRight = freeHeightRight - paddingRight
    beforeLastPage.find('#cv-main .block').each(function () {
      let marginTop = $(this).css('margin-top').replace('px', '')
      let marginBottom = $(this).css('margin-bottom').replace('px', '')
      let marginTopAdjust = (marginTop / heightMarginLeft) * marginTop,
        marginBottomAdjust = (marginBottom / heightMarginLeft) * marginBottom
      $(this).css('margin-top', marginTopAdjust)
      $(this).css('margin-bottom', marginBottomAdjust)
    })
    beforeLastPage.find('#cv-content .cvo-block').each(function () {
      let marginTop = $(this).css('margin-top').replace('px', '')
      let marginBottom = $(this).css('margin-bottom').replace('px', '')
      let marginTopAdjust = (marginTop / heightMarginRight) * (freeHeightLeft - lastPageHeightRight),
        marginBottomAdjust = (marginBottom / heightMarginRight) * (freeHeightRight - lastPageHeightRight)
      $(this).css('margin-top', marginTopAdjust)
      $(this).css('margin-bottom', marginBottomAdjust)
    })

    // for (let page = 1; page < totalPage; page++) {
    //     let currentPage = $(`.cv_page[data-page="${page}"]`);
    //     $('.cv_page .cvo-block:visible').each(function() {
    //         let marginTop = $(this).css('margin-top').replace('px', '');
    //         let marginBottom = $(this).css('margin-bottom').replace('px', '');
    //         let marginTopAdjust = (marginTop / freeHeight) * (freeHeight - lastPageHeight),
    //             marginBottomAdjust = (marginBottom / freeHeight) * (freeHeight - lastPageHeight);
    //         $(this).css('margin-top', marginTopAdjust);
    //         $(this).css('margin-bottom', marginBottomAdjust);
    //     })
    // }
  }
  paginationCv(1)
}

function addWatermark() {
  let html = `<div class="watermark_js">© Timviechay.vn</div>`
  let totalPage = $('.cv_page').length
  for (let page = 1; page <= totalPage; page++) {
    let currentPage = $(`.cv_page[data-page="${page}"]`)
    currentPage.find('.watermark_js').remove()
    if (!currentPage.find('.watermark_js').length && !currentPage.find('.watermark').length) {
      currentPage.append(html)
    }
  }
}

// Tự động viết hoa
function replaceVal(val, step) {
  var selection = window.getSelection()
  for (var i = 0; i < step; i += 1) {
    selection.modify('extend', 'backward', 'character')
  }
  document.execCommand('insertText', false, val)
}
var check_val = ['?', '.', '!']
$(document).on('keyup', '#form-cv [contenteditable="true"]', function (e) {
  if (check_val.includes(e.key) || e.which == 49 || e.which == 191) {
    $(this).attr('data-upper', 1)
  } else if ($(this).attr('data-upper') == 1 && e.key.length <= 1 && e.which != 32) {
    $(this).removeAttr('data-upper')
    let text = e.key.toUpperCase()
    replaceVal(text, 1)
  }
})

$(document)
  .on('click', '.content_qc .btn_remove_qc', function () {
    $('.qc_create_bg').hide()
  })
  .on('click', '.btn_change_bg', function () {
    $('input[name="radio_img"]:checked').prop('checked', false)
    $('.change_background .box_select_img,.change_background .box_select_img .box_try_ai').show()
    $('.change_background').show()
  })
  .on('click', '.pop_change_background .cancel_bg', function () {
    $('.change_background .box_change_bg').hide()
    $('.change_background .box_select_img,.change_background .box_select_img .box_try_ai').show()
    $('.change_background .box_select_img').attr('data-ai', 0)
    $('.change_background').hide()
  })
  .on('click', '.pop_change_background .box_select_img .btn_try', function () {
    $('.change_background .box_change_bg').hide()
    $('.change_background .box_input_des').show()
  })
  .on('click', '.pop_change_background .box_select_img .show_preview_bg', function () {
    let img_select = $('input[name="radio_img"]:checked')
    if (img_select.length) {
      let url_img = img_select.attr('data-image')
      if ($('.pop_change_background .box_select_img').attr('data-ai') == 1) {
        let text = $('#inp_des_bg').val()
        $.ajax({
          url: 'https://api.timviec365.vn/api/timviec/cv/createBackgroundAI',
          type: 'POST',
          data: { text, url_img },
          success: function (url_img) {
            if (url_img) {
              $('.change_background .box_preview .box_show_bg img').attr('src', `https://storage.timviec365.vn/timviec365${url_img}`)
              $('.change_background .box_preview').attr('data-img', url_img)
            }
          },
        })
      } else {
        $('.change_background .box_preview .box_show_bg img').attr('src', `https://storage.timviec365.vn/timviec365${url_img}`)
        $('.change_background .box_preview').attr('data-img', url_img)
      }
      $('.change_background .box_change_bg').hide()
      $('.change_background .box_preview').show()
    } else {
      unChangeBackgroundCv();
      $('.change_background').hide()
      // window.alert('Bạn chưa chọn ảnh nền')
    }
  })
  .on('click', '.pop_change_background .box_input_des .select_img_default', function () {
    $('.change_background .box_change_bg,.change_background .box_select_img .box_try_ai').hide()
    $('.change_background .box_select_img').attr('data-ai', 1).show()
  })
  .on('click', '.pop_change_background .box_input_des .btn_back', function () {
    $('.change_background .box_change_bg').hide()
    $('.change_background .box_select_img').attr('data-ai', 0)
    $('.change_background .box_select_img,.change_background .box_select_img .box_try_ai').show()
  })
  .on('focusout', '#inp_des_bg', function () {
    $('.change_background .box_input_des .err').text('')
    let text = $('#inp_des_bg').val()
    if (!text) {
      $('.change_background .box_input_des .err').text('Bạn chưa điền đầy đủ thông tin')
    }
  })
  .on('click', '.pop_change_background .box_input_des .btn_create_bg', function () {
    $('.change_background .box_input_des .err').text('')
    let text = $('#inp_des_bg').val(),
      style = $('#bg_style').val(),
      color = $('#bg_color').val()
    if (!text) {
      $('.change_background .box_input_des .err').text('Bạn chưa điền đầy đủ thông tin')
    } else {
      $.ajax({
        url: 'https://api.timviec365.vn/api/timviec/cv/createBackgroundAI',
        type: 'POST',
        data: { text, style, color },
        beforeSend: function (response) {
          $('.bg-spinner').remove()
          $('body').append(
            '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
          )
        },
        success: function (url_img) {
          if (url_img) {
            $('.change_background .box_preview .box_show_bg img').attr('src', `https://storage.timviec365.vn/timviec365${url_img}`)
            $('.change_background .box_preview').attr('data-img', url_img)
            $('.change_background .box_change_bg').hide()
            $('.change_background .box_preview').show()
          } else {
            window.alert('Đã có lỗi xảy ra. Vui lòng thử lại sau!')
          }
        },
      })
    }
  })
  .on('click', '.pop_change_background .box_preview .btn_refresh_create_bg', function () {
    $('.change_background .box_change_bg').hide()
    $('.change_background .box_select_img').attr('data-ai', 0)
    $('.change_background .box_select_img,.change_background .box_select_img .box_try_ai').show()
  })
  .on('click', '.pop_change_background .box_preview .btn_apply_bg', function () {
    let url_image = $('.change_background .box_preview').attr('data-img')
    $('.change_background .box_select_img').attr('data-ai', 0)
    $('.change_background .box_select_img .box_try_ai,.change_background .box_select_img').show()
    $('.change_background .box_change_bg,.change_background').hide()
    changeBackgroundCv(url_image)
  })
  .on('click', '.pop_change_background .upload_file_bg', function () {
    $('#inp_bg_file').click()
  })
  .on('change', '#inp_bg_file', function () {
    let files = $(this)[0].files
    if (files.length) {
      let file = files[0]
      let base64 = getBase64(file).then((base64_bg) => {
        $.ajax({
          url: 'https://api.timviec365.vn/api/timviec/cv/uploadBackgroundCV',
          type: 'POST',
          data: { img: base64_bg },
          success: function (data) {
            const url_img = data && data.data ? data.data.img : ''
            if (url_img) {
              if ($('.pop_change_background .box_select_img').attr('data-ai') == 1) {
                let text = $('#inp_des_bg').val()
                $.ajax({
                  url: 'https://api.timviec365.vn/api/timviec/cv/createBackgroundAI',
                  type: 'POST',
                  data: { text, url_img },
                  success: function (url_img) {
                    if (url_img) {
                      $('.change_background .box_preview .box_show_bg img').attr('src', `https://storage.timviec365.vn/timviec365${url_img}`)
                      $('.change_background .box_preview').attr('data-img', url_img)
                    }
                  },
                })
              } else {
                $('.change_background .box_preview .box_show_bg img').attr('src', `https://storage.timviec365.vn/timviec365${url_img}`)
                $('.change_background .box_preview').attr('data-img', url_img)
              }
              $('.change_background .box_change_bg').hide()
              $('.change_background .box_preview').show()
            }
          },
        })
      })
    }
  })

function changeBackgroundCv(url_image) {
  if (url_image) {
    let url_full = `https://storage.timviec365.vn/timviec365${url_image}`
    $('#form-cv').attr('data-background', url_image)
    $('#form-cv').css('background', 'unset')

    if ($('#form-cv .cv_page').length) {
      $('#form-cv .cv_page').css('background', `url(${url_full})`).css('background-size', 'cover').css('background-position', 'center')
    } else {
      $('#form-cv').css('background', `url(${url_full})`).css('background-size', 'cover').css('background-position', 'center')
    }
    const pathname = window.location.pathname

    if (pathname === '/cv365/tao-cv-ky-thuat-ung-dung/mau-11') {
      $('#form-cv').css('background', `url(${url_full})`).css('background-size', 'cover').css('background-position', 'center')
    }
    // remove fake img after update background
    $('#prof .icoweb').css('color', 'black')
    $('.fake_img').hide()
    $('#dm').css('background', 'none')

    // old
    // $(
    // 	'#cv-top,.footer,.all,.exp-fake,.cvo-block,.head,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#cv-content .head div,#block01 .exp-date,div#prof,.cvo-block .cum,.ski,.tt-box1'
    // ).css('background', 'none')

    // // new

    // $(
    // 	'#cv-top,.footer,.all,.exp-fake,.cvo-block,.head,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#cv-content .head div,#block01 .exp-date,div#prof,.cvo-block, #cv-top h2'
    // ).css('background', 'none')

    // new 2 update 23.2.2024

    //Sửa màu text cv sau khi thay đổi background
    $('.ctbx .skill-name').css('color', '#000')
    if (
      pathname === '/cv365/tao-cv-khu-che-xuat-khu-cong-nghiep/mau-03' ||
      pathname === '/cv365/tao-cv-tai-chinh/mau-11' ||
      pathname === '/cv365/tao-cv-it/mau-03'
    ) {
      $('.box-content, .skill-name , #cv-boxtitle, #blocktitle').css('color', '#000')
      $('.bar-exp').css('background')
    } else {
      $('div#cv-boxtitle,#blocktitle,.box-content,#cv-content .head div,#block01 .exp-date,.exp-content,.exp-subtitle').css('color', '#000')
    }

    if (
      pathname === '/cv365/tao-cv-bao-hiem/mau-13' ||
      pathname === '/cv365/tao-cv-phat-trien-thi-truong/mau-10' ||
      pathname === '/cv365/tao-cv-it/mau-03'
    ) {
      $(
        '#cv-top,.footer,.all,.exp-fake,.cvo-block,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#cv-content h3,#block01 .exp-date,div#prof,.cvo-block, #cv-top h2,.head,.exp-fake'
      ).css('background', 'none')
      $('.block-title').css('cssText', 'color: #000 !important')
    } else {
      $(
        '#cv-top,.footer,.all,.exp-fake,.cvo-block,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#cv-content h3,#block01 .exp-date,div#prof,.cvo-block, #cv-top h2,#cv-content .head,.anh-ftt,#cvo-experience-blocktitle,.box-01,#box-hvt,#experience-table .ctbx,.cum,.tt-box1,.ski,.ct_bo,#boxtitle,#blocktitle,div#experience-table,.head,.exp-fake,.bg_cv,#cv-content,.box-info,.exp-fake,.icright5,.icright4,.icright3,.icright2,.icright1,.cumicc7,.cumicc6,.cumicc5,.cumicc4,.cumicc3,.cumicc2,.cumicc1'
      ).css('background', 'none')
    }
    if (pathname === '/cv365/tao-cv-developer/it-phan-cung-mang-10') {
      $('#cv-top h1,#cv-top h2').css('color', '#000')
    }
    if (pathname === '/cv365/tao-cv-truyen-thong/mau-14') {
      $('.skill-name').css('color', '#000')
    }
    if (pathname === '/cv365/tao-cv-my-pham-thoi-trang-trang-suc/mau-10' || pathname === '/cv365/tao-cv-my-pham-thoi-trang-trang-suc/mau-21') {
      $('.exp-content,.h3,.cum,.ski').css('border', 'none')
    }
    if (pathname === '/cv365/tao-cv-my-pham-thoi-trang-trang-suc/mau-12') {
      $('#cv-content .head div').css('background', 'none')
    }
    if (pathname === '/cv365/tao-cv-marketing/mau-21' || pathname === '/cv365/tao-cv-seo-website/mau-18') {
      $('.tt-box1,.cum,.ski').css('background', 'none')
    }
    if (pathname === '/cv365/tao-cv-kinh-doanh/mau-22') {
      $('.tt-box1,.cum,.ski').css('background', 'none')
      $('.ifo .chu h2').css('background', '')
    }
    if (pathname === '/cv365/tao-cv-kinh-doanh/mau-23') {
      $('#cv-content .cvo-block .head,.cum,.ski').css('background', 'none')
      $('.ifo .chu h2').css('background', '')
    }

    if (pathname === '/cv365/tao-cv-phat-trien-thi-truong/mau-10' || pathname === '/cv365/tao-cv-it/mau-03') {
      $(
        '#cv-profile-fullname, #cv-profile-job, #cv-boxtitle, #cv-profile-birthday, #cv-profile-sex, #cv-profile-phone, #cv-profile-email, #cv-profile-address, #cv-profile-face, .fa, .skill-name, #cvo-experience-blocktitle'
      ).css('color', '#000')

      $('.cvo-block > h3').css('background', '')
    }
    if (pathname === '/cv365/tao-cv-dien-dien-tu/mau-01' || pathname === '/cv365/tao-cv-it/mau-03') {
      $('#cv-profile-fullname').css('color', '#000')
      $('#cv-profile-job').css('color', '#000')
    }
    if (pathname === '/cv365/tao-cv-phat-trien-thi-truong/mau-10') {
      $('#block02 h3').css('background-color', '#fff0')
    }
    if (pathname === '/cv365/tao-cv-it/mau-18') {
      $('.cum,.ski, .tt-box1,#cv-content .head').css('background', 'none')
    }

    $('#cv-content .head div,#cv-boxtitle').css('border-color', '#000')
    $('#cv-content .ir .cvo-block').css('color', '#000')
    $('#cv-content h3').css('color', '#000')
    $('#cv-content .exp-date').css('color', '#000')
  }
}

function unChangeBackgroundCv() {
  $('#form-cv').removeAttr('data-background')
  $('#form-cv').removeAttr('style')
  $('#form-cv .cv_page').removeAttr('style')

  const pathname = window.location.pathname
  // remove fake img after update background
  $('#prof .icoweb').removeAttr('style')
  $('.fake_img').show()

  //Sửa màu text cv sau khi thay đổi background
  if (
    pathname === '/cv365/tao-cv-khu-che-xuat-khu-cong-nghiep/mau-03' ||
    pathname === '/cv365/tao-cv-tai-chinh/mau-11' ||
    pathname === '/cv365/tao-cv-it/mau-03'
  ) {
    $('.box-content, .skill-name , #cv-boxtitle').removeAttr('style')
    $('.bar-exp').removeAttr('style')
  } else {
    $('div#cv-boxtitle,.box-content,#cv-content .head div,#block01 .exp-date').removeAttr('style')
  }

  if (
    pathname === '/cv365/tao-cv-bao-hiem/mau-13' ||
    pathname === '/cv365/tao-cv-phat-trien-thi-truong/mau-10' ||
    pathname === '/cv365/tao-cv-it/mau-03'
  ) {
    $('#cv-top,.footer,.all,.exp-fake,.cvo-block,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#block01 .exp-date,div#prof,.cvo-block, #cv-top h2').css('background', 'none')
    $('.block-title').removeAttr('style')
  } else {
    $('#cv-top,.footer,.all,.exp-fake,.cvo-block,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#block01 .exp-date,div#prof,.cvo-block, #cv-top h2,#cv-content .head').removeAttr('style')
  }
  if (pathname === '/cv365/tao-cv-marketing/mau-21') {
    $('.tt-box1,.cum,.ski').removeAttr('style')
  }
  if (pathname === '/cv365/tao-cv-kinh-doanh/mau-22') {
    $('.tt-box1,.cum,.ski').removeAttr('style')
    $('.ifo .chu h2').removeAttr('style')
  }
  if (pathname === '/cv365/tao-cv-kinh-doanh/mau-23') {
    $('#cv-content .cvo-block .head,.cum,.ski').removeAttr('style')
    $('.ifo .chu h2').removeAttr('style')
  }

  if (pathname === '/cv365/tao-cv-phat-trien-thi-truong/mau-10' || pathname === '/cv365/tao-cv-it/mau-03') {
    $(
      '#cv-profile-fullname, #cv-profile-job, #cv-boxtitle, #cv-profile-birthday, #cv-profile-sex, #cv-profile-phone, #cv-profile-email, #cv-profile-address, #cv-profile-face, .fa, .skill-name, #cvo-experience-blocktitle'
    ).removeAttr('style')

    $('.cvo-block > h3').removeAttr('style')
  }
  if (pathname === '/cv365/tao-cv-dien-dien-tu/mau-01' || pathname === '/cv365/tao-cv-it/mau-03') {
    $('#cv-profile-fullname').removeAttr('style')
    $('#cv-profile-job').removeAttr('style')
  }
  if (pathname === '/cv365/tao-cv-phat-trien-thi-truong/mau-10') {
    $('#block02 h3').removeAttr('style')
  }
  if (pathname === '/cv365/tao-cv-it/mau-18') {
    $('.cum,.ski, .tt-box1,#cv-content .head').removeAttr('style')
  }

  $('#cv-content .head div,#cv-boxtitle').removeAttr('style')
}
$(document).ready(function () {
  let url_image = $('#form-cv').attr('data-background')
  // changeBackgroundCv(url_image)
  changeBackgroundCv(url_image)
  // setTimeout(() => {
  // 	$('.box-content').trigger('click')
  // }, 2000)
})

function unPaginationCV() {
  if ($('#form-cv .cv_page').length) {
    $('#form-cv .cv_page[data-page = "1"]').removeClass('height_page')
    $('#form-cv .cv_page').each(function () {
      let page = $(this).attr('data-page')
      if (page > 1) {
        $(this)
          .find('#sortable .block')
          .each(function () {
            let id = $(this).attr('id')
            let html = $(this)[0].outerHTML
            console.log($('#form-cv .cv_page[data-page = "1"] #sortable').length)
            $('#form-cv .cv_page[data-page = "1"] #sortable').append(html)
            $(this).remove()
          })
        $(this)
          .find('#sort_block .cvo-block')
          .each(function () {
            let id = $(this).attr('id')
            if ($(`#form-cv .cv_page[data-page = "1"] #sort_block #${id}`).length) {
              let html = $(this).find(`#experience-table`).html()
              $(`#form-cv .cv_page[data-page = "1"] #sort_block #${id} #experience-table`).append(html)
            } else {
              let html = $(this)[0].outerHTML
              $(`#form-cv .cv_page[data-page = "1"] #sort_block`).append(html)
            }
          })
        if ($(this).find('.footer').length) {
          let html = $(this).find('.footer')[0].outerHTML
          $(`#form-cv .cv_page[data-page = "1"]`).append(html)
        }
        $(this).remove()
      }
    })
  }
}