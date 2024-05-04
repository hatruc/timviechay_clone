/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react-hooks/exhaustive-deps */
// import { access_token } from "@/utils/convert";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "select2";
import { POST } from "@/pages/api/base-api";

export async function loadRemoteComponent(url: string) {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
}

export function waitForElm(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const customCSS = (input: any, value: any) => {
  const el = document.querySelector(input)
  if (el) el.style.cssText = value
}

export const handleSetData = (html: any, dataSample?: any, isCreated?: boolean, hide?: any) => {
  // handle set data
  const box1 = html?.menu?.find((item: { id: string }) => item.id == 'box01')?.content?.content?.content
  const box2 = html?.menu?.find((item: { id: string }) => item.id == 'box02')?.content
  const box3 = html?.menu?.find((item: { id: string }) => item.id == 'box03')?.content
  const box4 = html?.menu?.find((item: { id: string }) => item.id == 'box04')?.content
  const box5 = html?.menu?.find((item: { id: string }) => item.id == 'box05')?.content
  const box6 = html?.menu?.find((item: { id: string }) => item.id == 'box06')?.content
  const box7 = html?.menu?.find((item: { id: string }) => item.id == 'box07')?.content
  const block1 = html?.experiences?.find((item: { id: string }) => item.id == 'block01')?.content
  const block2 = html?.experiences?.find((item: { id: string }) => item.id == 'block02')?.content
  const block3 = html?.experiences?.find((item: { id: string }) => item.id == 'block03')?.content
  const block4 = html?.experiences?.find((item: { id: string }) => item.id == 'block04')?.content
  const block5 = html?.experiences?.find((item: { id: string }) => item.id == 'block05')?.content

  //handle add morefield
  //skills -> find skills -> if more then remove, if less then add
  const listSkillsEl = $('#box03 .exp .ctbx')
  if (listSkillsEl.length > 0 && box3) {
    const el = listSkillsEl?.last().parent()
    const og = el.clone()
    //remove all
    listSkillsEl.each((index: number, el: HTMLElement) => el.remove())
    box3?.content?.skills?.map((item: any, index: number) => {
      const clone = og.clone()
      $('#box03 .exp').append(clone.find('.ctbx').first())
    })
  }

  // hide hidden blokc
  const menus = html?.menu
  const exps = html?.experiences

  menus?.forEach((item: any) => {
    if (item?.status === 'hide' || item?.content === '') {
      $(`#${item?.id}`).hide()
    }
  })

  exps?.forEach((item: any) => {
    if (item?.status === 'hide' || item?.content === '') {
      let el = document.querySelectorAll<HTMLElement>('#' + item?.id)
      $(`#${item?.id}`).hide()
    }
  })

  //rearrange order
  //menus
  const sorted = menus
  sorted?.forEach((item: any, index: number) => {
    for (let i = index + 1; i < sorted.length; i++) {
      const next = sorted[i]
      const itemc = sorted[index]
      if (itemc?.id > next?.id) {
        sorted[index] = next
        sorted[i] = itemc
      }
    }
  })
  sorted?.forEach((item: any, index: number) => {
    for (let i = index + 1; i < sorted.length; i++) {
      const next = sorted[i]
      const itemc = sorted[index]
      if (itemc?.id !== 'box01' && next?.id !== 'box01') {
        if (itemc?.order > next?.order) {
          const elm1 = $('#' + itemc?.id)
          const elm2 = $('#' + next.id)
          const clone1 = elm1.clone()
          const clone2 = elm2.clone()

          elm1.replaceWith(clone2)
          elm2.replaceWith(clone1)
          sorted[index] = next
          sorted[i] = itemc
        }
      }
    }
  })

  // experiences
  const sorted2 = exps
  sorted2?.forEach((item: any, index: number) => {
    for (let i = index + 1; i < sorted.length; i++) {
      const next = sorted2[i]
      const itemc = sorted2[index]
      if (itemc?.id > next?.id) {
        console.log('đổi chỗ')
        sorted2[index] = next
        sorted2[i] = itemc
      }
    }
  })
  sorted2?.forEach((item: any, index: number) => {
    for (let i = index + 1; i < sorted.length; i++) {
      const next = sorted2[i]
      const itemc = sorted2[index]
      if (itemc?.id !== 'box01' && next?.id !== 'box01') {
        if (itemc?.order > next?.order) {
          const elm1 = $('#' + itemc?.id)
          const elm2 = $('#' + next.id)
          const clone1 = elm1.clone()
          const clone2 = elm2.clone()

          elm1.replaceWith(clone2)
          elm2.replaceWith(clone1)
          sorted2[index] = next
          sorted2[i] = itemc
        }
      }
    }
  })

  //cv title

  sethtml('cv-title', html)

  const pathname1 = window.location.pathname
  if (pathname1 !== '/cv365/tao-cv-tai-chinh/mau-11') {
    sethtml('cv-boxtitle', html?.cv_title)
  }
  if (pathname1 === '/cv365/tao-cv-sinh-vien-moi-ra-truong/mau-12') {
    $(document).trigger('focusout')
  }

  const list = [
    '/cv365/tao-cv-tai-chinh/mau-11',
    '/cv365/tao-cv-trai-nganh/mau-11',
    '/cv365/tao-cv-bao-hiem/mau-12',
    '/cv365/tao-cv-kinh-doanh/mau-16',
  ]
  $('#cv-profile-sex').html()
  $('#page-cv #cv-title').html(html?.cv_title)

  if (pathname1 === '/cv365/tao-cv-kinh-doanh/mau-01') {
    $('h2').text()
    $('<span>', { id: 'cv-profile-job' }).appendTo('#box-hvt h2')
  }

  if (list.includes(pathname1)) {
    $('#page-cv #cv-title').html(html?.cv_title)
    $('#box01 #cv-boxtitle').html(html?.menu?.[0]?.content?.title)
  } else {
    sethtml('cv-boxtitle', html?.cv_title)
  }

  //fix cv title block 5 (Thông tin thêm)
  // if (pathname1 === '/cv365/tao-cv-mau-thiet-ke-sang-tao/onepage') {
  // $('#block05 div#cvo-experience-blocktitle').html(html?.experiences?.[4]?.content?.title)
  // }

  // name

  sethtml('cv-profile-fullname', html?.name)

  // sethtml('cv-profile-fullname', '')
  // pos
  sethtml('cv-profile-job', html?.position)
  // avatar
  document
    .getElementById('cvo-profile-avatar')
    ?.setAttribute('src', html?.avatar?.includes('no_avatar') ? `${STATIC_URL}/cv365/images/no_avatar.jpg` : html?.avatar)
  // // profile
  if (hide) {
    sethtml('cv-profile-phone', 'Xem ở trên')
  } else {
    sethtml('cv-profile-phone', box1?.phone)
  }
  // sethtml('cv-profile-phone', '')
  sethtml('cv-profile-sex', box1?.sex)
  // sethtml('cv-profile-sex', '')
  sethtml('cv-profile-birthday', box1?.birthday)
  // sethtml('cv-profile-birthday', '')

  if (hide) {
    sethtml('cv-profile-email', 'Xem ở trên')
  } else {
    sethtml('cv-profile-email', box1?.email)
  }
  // sethtml('cv-profile-email', '')
  sethtml('cv-profile-address', box1?.address)

  // BOX AND BLOCK
  // console.log({ box1, box2, box3, box4, box5, box6, box7, block1, block2, block3, block4, block5 })

  customQuerySelector('#box01 > h3 > #cv-boxtitle', html?.menu?.[0]?.content?.title)
  customQuerySelector('#box01 > .h3 > #cv-boxtitle', html?.menu?.[0]?.content?.title)
  customQuerySelector('#box01 > .tt-box1 > #cv-boxtitle', html?.menu?.[0]?.content?.title)
  // box2

  customQuerySelector('#box02 > .h3 > #cv-boxtitle', box2?.title)
  customQuerySelector('#box02 > h3 > #cv-boxtitle', box2?.title)
  customQuerySelector('#box02 > .cum > #cv-boxtitle', box2?.title)

  // zexp
  customQuerySelector('#box02 > div.z-exp > h3 > #cv-boxtitle', box2?.title)

  //fix cv
  customQuerySelector('#box02 > .cum > #boxtitle > #cv-boxtitle', box2?.title)
  customQuerySelector('#box02 > .cum > h3 > #cv-boxtitle', box2?.title)
  customQuerySelector('#box02 > .cum > #boxtitle > #cv-boxtitle', box2?.title)

  customQuerySelector('#box02 > .box-content', box2?.content)
  customQuerySelector('#box02 > div.ct_bo > div > div', box2?.content)
  customQuerySelector('#box02 > div.padd_box > span', box2?.content)
  customQuerySelector('#box02 > p > span.box-content', box2?.content)
  customQuerySelector('#box02 > .ct_bo > .ct_box > .box-content', box2?.content)

  // let el = document.querySelector('#box02 > div.padd_box > span')
  // if (el) {
  // 	el.innerHTML = 'ádasdsadadaadadas'
  // }

  //fix cv
  // if (window.location.href.includes('cv365/tao-cv-tieng-trung/mau-04')
  // 	|| window.location.href.includes('cv365/tao-cv-tieng-nhat/mau-15')) {

  // box3 skilss

  customQuerySelector('#box03 > .h3 > #cv-boxtitle', box3?.title)
  customQuerySelector('#box03 > h3 > #cv-boxtitle', box3?.title)
  customQuerySelector('#box03 > div.ski > #cv-boxtitle', box3?.title)
  customQuerySelector('#box03 > div.z-exp > h3 > #cv-boxtitle', box3?.title)
  // fix cv
  customQuerySelector('#box03 > .ski > #boxtitle > #cv-boxtitle', box3?.title)
  // box3?.title && customQuerySelector('#box03 > .ski > #boxtitle > #cv-boxtitle', box3?.title)

  // skills box
  const skilldata = box3?.content?.skills

  const listSkils = document.querySelectorAll('#box03 > div.skill > .ctbx')

  if (listSkils.length > 0)
    listSkils?.forEach((item: Element, index: number) => {
      // set skill name
      const skillName = item.querySelector('.skill-name')
      if (skillName) skillName.innerHTML = skilldata?.[index]?.name

      // set skill point

      const skillPoint = item.querySelector('.bar-exp > div')

      if (skillPoint) {
        skillPoint.setAttribute('style', `width : ${skilldata?.[index]?.exp}%;`)
      }

      //fix cv
      const skillPoint2: any = item.querySelector('.bar-value-exp > input')

      if (skillPoint2) {
        skillPoint2.value = `${skilldata?.[index]?.exp}`
      }
    })

  if (window.location.href.includes('tao-cv-marketing/mau-26')) {
    customQuerySelector('#box02 > .cum > #boxtitle > #cv-boxtitle', box2?.title)
  }

  // awards
  // customQuerySelector('#box04 > .h3 > #cv-boxtitle', box4?.title)
  customQuerySelector('#box04 > h3 > #cv-boxtitle', box4?.title)
  customQuerySelector('#box04 > div.cum > #cv-boxtitle', box4?.title)
  customQuerySelector('#box04 > div.z-exp > h3 > #cv-boxtitle', box4?.title)

  //fix cv
  customQuerySelector('#box04 > .cum > #boxtitle > #cv-boxtitle', box4?.title)
  // box4?.title && customQuerySelector('#box04 > .cum > #boxtitle > #cv-boxtitle', box4?.title)

  customQuerySelector('#box04 > .box-content', box4?.content)
  customQuerySelector('#box04 > div.ct_bo > div > div', box4?.content)
  customQuerySelector('#box04 > p > span.box-content', box4?.content)
  customQuerySelector('#box04 > .padd_box > span.box-content', box4?.content)

  //cert
  customQuerySelector('#box05 > .h3 > #cv-boxtitle', box5?.title)
  customQuerySelector('#box05 > h3 > #cv-boxtitle', box5?.title)
  customQuerySelector('#box05 > div.cum > #cv-boxtitle', box5?.title)
  customQuerySelector('#box05 > div.z-exp > h3 > #cv-boxtitle', box5?.title)
  customQuerySelector('#box05 > .cum > #boxtitle > #cv-boxtitle', box5?.title)
  // box5?.title && customQuerySelector('#box05 > .cum > #boxtitle > #cv-boxtitle', box5?.title)

  customQuerySelector('#box05 > .box-content', box5?.content)
  customQuerySelector('#box05 > div.ct_bo > div > div', box5?.content)

  customQuerySelector('#box05 > p > span.box-content', box5?.content)
  customQuerySelector('#box05 > .padd_box > span.box-content', box5?.content)
  // fav

  customQuerySelector('#box06 > .h3 > #cv-boxtitle', box6?.title)
  customQuerySelector('#box06 > h3 > #cv-boxtitle', box6?.title)
  customQuerySelector('#box06 > .cum > #cv-boxtitle', box6?.title)
  customQuerySelector('#box06 > div.z-exp > h3 > #cv-boxtitle', box6?.title)
  customQuerySelector('#box06 > .cum > #boxtitle > #cv-boxtitle', box6?.title)
  // box6?.title && customQuerySelector('#box06 > .h3 > #cv-boxtitle', box6?.title)
  // box6?.title && customQuerySelector('#box06 > h3 > #cv-boxtitle', box6?.title)
  // box6?.title && customQuerySelector('#box06 > .cum > #cv-boxtitle', box6?.title)
  // box6?.title && customQuerySelector('#box06 > div.z-exp > h3 > #cv-boxtitle', box6?.title)
  // box6?.title && customQuerySelector('#box06 > .cum > #boxtitle > #cv-boxtitle', box6?.title)

  customQuerySelector('#box06 > .padd_box > span.box-content', box6?.content)
  customQuerySelector('#box06 > p > span.box-content', box6?.content)
  customQuerySelector('#box06 > .box-content', box6?.content)
  customQuerySelector('#box06 > div.ct_bo > div > div', box6?.content)

  // ref
  customQuerySelector('#box07 > .h3 > #cv-boxtitle', box7?.title)
  customQuerySelector('#box07 > h3 > #cv-boxtitle', box7?.title)
  customQuerySelector('#box07 > .cum > #cv-boxtitle', box7?.title)
  customQuerySelector('#box07 > div.z-exp > h3 > #cv-boxtitle', box7?.title)
  customQuerySelector('#box07 > .cum > #boxtitle > #cv-boxtitle', box7?.title)
  // box7?.title && customQuerySelector('#box07 > .h3 > #cv-boxtitle', box7?.title)
  // box7?.title && customQuerySelector('#box07 > h3 > #cv-boxtitle', box7?.title)
  // box7?.title && customQuerySelector('#box07 > .cum > #cv-boxtitle', box7?.title)
  // box7?.title && customQuerySelector('#box07 > div.z-exp > h3 > #cv-boxtitle', box7?.title)
  // box7?.title && customQuerySelector('#box07 > .cum > #boxtitle > #cv-boxtitle', box7?.title)
  customQuerySelector('#box07 > .ct_bo > .ct_box > .box-content', box7?.content)
  customQuerySelector('#box07 > .padd_box > span.box-content', box7?.content)
  customQuerySelector('#box07 > p > span.box-content', box7?.content)
  customQuerySelector('#box07 > .box-content', box7?.content)
  //fix cv
  // customQuerySelector('#box07 > div.padd_box > span', box7?.content)

  const list_excludes = ['/cv365/tao-cv-khu-che-xuat-khu-cong-nghiep/mau-01', '/cv365/tao-cv-phat-trien-thi-truong/mau-10']
  const pathname = window.location.pathname
  // if (!list_excludes.includes(pathname)) {

  // }
  if (list_excludes.includes(pathname)) {
    if ($('#box04').length > 1) {
      $('#box04')?.[1]?.remove()
    }

    if ($('#box06').length > 1) {
      $('#box06')?.[1]?.remove()
    }
  }

  // EXPERIENCES
  if (block1) {
    customQuerySelector('#block01 > .head >  #cvo-experience-blocktitle', block1?.title)

    customQuerySelector('#block01 > div.z-exp > div.head > #cvo-experience-blocktitle', block1?.title)

    //fix cv
    customQuerySelector('#block01 > .head >  #blocktitle > #cvo-experience-blocktitle', block1?.title)
    customQuerySelector('#block01 > .head1 >  #cvo-experience-blocktitle', block1?.title)

    //handle map data
    handleMapData(
      '#block01 > #experience-table > div.ctbx',
      ['h3 > .exp-title', '.h3 > .exp-subtitle', 'div.exp-content'],
      block1?.content,
      ['title', 'subtitle', 'content'],
      '#block01 #experience-table'
    )
  }

  // EXp
  if (block2) {
    customQuerySelector('#block02 > .head >  #cvo-experience-blocktitle', block2?.title)
    customQuerySelector('#block02 > div.z-exp > div.head > #cvo-experience-blocktitle', block2?.title)

    //fix cv
    customQuerySelector('#block02 > .head >  #blocktitle > #cvo-experience-blocktitle', block2?.title)
    customQuerySelector('#block02 > .head2 >  #cvo-experience-blocktitle', block2?.title)

    //handle map data
    handleMapData(
      '#block02 > #experience-table > div.ctbx',
      ['h3 > .exp-title', 'h3 > div.exp-date', '.h3 > .exp-subtitle', 'div.exp-content'],
      block2?.content,
      ['title', 'date', 'subtitle', 'content'],
      '#block02 #experience-table'
    )
  }

  // activity
  if (block3) {
    customQuerySelector('#block03 > .head >  #cvo-experience-blocktitle', block3?.title)
    customQuerySelector('#block03 > div.z-exp > div.head > #cvo-experience-blocktitle', block3?.title)

    //fix cv
    customQuerySelector('#block03 > .head >  #blocktitle > #cvo-experience-blocktitle', block3?.title)
    customQuerySelector('#block03 > .head3 >  #cvo-experience-blocktitle', block3?.title)

    //handle map data
    handleMapData(
      '#block03 > #experience-table > div.ctbx',
      ['h3 > .exp-title', 'h3 > div.exp-date', '.h3 > .exp-subtitle', 'div.exp-content'],
      block3?.content,
      ['title', 'date', 'subtitle', 'content'],
      '#block03 #experience-table'
    )
  }

  // projects
  if (block4) {
    customQuerySelector('#block04 > .head >  #cvo-experience-blocktitle', block4?.title)
    customQuerySelector('#block04 > div.z-exp > div.head  >   #cvo-experience-blocktitle', block4?.title)

    //fix cv
    customQuerySelector('#block04 > .head > #blocktitle > #cvo-experience-blocktitle', block4?.title)
    customQuerySelector('#block04 > .head4 >  #cvo-experience-blocktitle', block4?.title)

    //handle map data
    handleMapData(
      '#block04 > #experience-table > div.ctbx',
      ['h3 > .exp-title', 'h3 > div.exp-date', '.h3 > .exp-subtitle', 'div.exp-content'],
      block4?.content,
      ['title', 'date', 'subtitle', 'content'],
      '#block04 #experience-table'
    )
  }

  // MORE
  if (block5) {
    /* customQuerySelector('#block05 > .head > #cvo-experience-blocktitle', block5?.title)
    customQuerySelector('#block05 > div.z-exp > div.head > #cvo-experience-blocktitle', block5?.title)

    //fix cv
    customQuerySelector('#block05 > .head >  #blocktitle > #cvo-experience-blocktitle', block5?.title)
    customQuerySelector('#block05 > .head5 >  #cvo-experience-blocktitle', block5?.title) */

    //fix lỗi title block 5 Thông tin thêm
    {
      $('#block05 .head #cvo-experience-blocktitle').html(block5?.title)
    }
    //handle map data
    handleMapData(
      '#block05 > #experience-table > div.ctbx',
      ['h3 > .exp-title', 'h3 > div.exp-date', '.h3 > .exp-subtitle', 'div.exp-content'],
      block5?.content,
      ['title', 'date', 'subtitle', 'content'],
      '#block05 #experience-table'
    )
  }

  //fix cv
  if (window.location.href.includes('cv365/tao-cv-hoa-hoc-sinh-hoc/mau-03')) {
    customCSS('#box07 > .cum > #boxtitle > #cv-boxtitle', 'max-width: 100% !important;')
  }
  if (pathname == '/cv365/tao-cv-ky-thuat-ung-dung/mau-11') {
    $('#cv-top,#cv-main,.footer').css('background', '')
  }

  if (window.location.href.includes('cv365/tao-cv-kinh-doanh/mau-16')) {
    customCSS('#block01', 'width: 100% !important')
    customCSS('#block03', 'width: 100% !important')
    customCSS('#block05', 'width: 100% !important')
    customCSS('#block02', 'margin-top: unset !important')
  }

  if (
    window.location.href.includes('tao-cv-khu-che-xuat-khu-cong-nghiep/mau-03') ||
    window.location.href.includes('cv365/tao-cv-dien-dien-tu/mau-05') ||
    window.location.href.includes('cv365/tao-cv-ky-thuat-ung-dung/mau-15')
  ) {
    customCSS('#block05 .head #blocktitle #cvo-experience-blocktitle', 'text-align: center !important;')
    customQuerySelector('#box02 > .cum > #boxtitle > #cv-boxtitle', box2?.title)
  }

  if (window.location.href.includes('cv365/tao-cv-cham-soc-khach-hang/mau-10')) {
    customCSS('.box-01 #box01', 'width: 51% !important;')
    customCSS('.box-01 #box01 #prof .ic_left', 'width: 52% !important;')
    customCSS('.box-01 #box01 #prof .ic_right', 'width: 45% !important;')
    customCSS('.box-01 #box-hvt', 'width: 66% !important;')
  }

  if (window.location.href.includes('cv365/tao-cv-tieng-trung/mau-04')) {
    customCSS('#cvo-profile-avatar-wraper', 'padding: unset !important;')
  }
  if (window.location.href.includes('cv365/tao-cv-kinh-doanh/mau-07')) {
    // $('#form-cv').each(function () {
    // 	var $newDiv = $('<div>').addClass('all')
    // 	$(this).children().appendTo($newDiv)
    // 	$(this).append($newDiv)
    // })
  }

  // if (window.location.href.includes('tao-cv-khu-che-xuat-khu-cong-nghiep/mau-03')
  // 	|| window.location.href.includes('tao-cv-tham-dinh-giam-dinh/mau-14')
  // 	|| window.location.href.includes('cv365/tao-cv-logistic/mau-14')
  // 	|| window.location.href.includes('cv365/tao-cv-ky-thuat/mau-01')
  // 	|| window.location.href.includes('cv365/tao-cv-marketing/mau-26')
  // 	|| window.location.href.includes('cv365/tao-cv-hang-khong/mau-12')
  // 	|| window.location.href.includes('cv365/tao-cv-le-tan/mau-5')
  // 	|| window.location.href.includes('cv365/tao-cv-tu-van-tai-chinh/mau-3')
  // 	|| window.location.href.includes('cv365/tao-cv-giao-thong-van-tai/mau-12')
  // 	|| window.location.href.includes('cv365/tao-cv-dien-dien-tu/mau-05')
  // 	|| window.location.href.includes('cv365/tao-cv-lao-dong-pho-thong/mau-1')
  // 	|| window.location.href.includes('cv365/tao-cv-ky-thuat-ung-dung/mau-14')
  // 	|| window.location.href.includes('cv365/tao-cv-dien-dien-tu/mau-05')

  // ) {

  // }

  // auto click
  const list2 = [
    '/cv365/tao-cv-developer/it-phan-cung-mang-10',
    '/cv365/tao-cv-thiet-ke-my-thuat/mau-10',
    '/cv365/tao-cv-cham-soc-khach-hang/mau-11',
    '/cv365/tao-cv-marketing/mau-26',
    '/cv365/tao-cv-khu-che-xuat-khu-cong-nghiep/mau-03',
  ]
  if (list2.includes(pathname)) {
    // $(document).trigger('focusout')
    // console.log($('#box03').length)
  }
  if (pathname === '/cv365/tao-cv-kinh-doanh/mau-16') {
    $('.connectedSortable').css('width', '100%')
  }
  $('#cv-title').remove()
}

const renderer = (
  removeHolder: string,
  title: string,
  id: string,
  value: string,
  isId: boolean = true,
  notPlaceholder: boolean = false
) => {
  if (removeHolder === title) {
    let list: NodeListOf<Element>;

    if (isId) {
      list = document.querySelectorAll(`[id=${id}]`);
    } else {
      list = document.querySelectorAll(`.${id}`);
    }
    if (!notPlaceholder) {
      list.forEach((el) => el.setAttribute("cvo-placeholder", value));
    } else {
      list.forEach((el) => (el.innerHTML = value));
    }
  }
};

const sethtml = (id: string, value: string) => {
  const el: any = document.getElementById(id);
  if (el) {
    el.innerText = value;
  }
};

const customQuerySelector = (input: string, value: string) => {
  const el = document.querySelector(input);
  if (el) el.innerHTML = value;
};

const handleMapData = (
  id: string,
  listIds: string[],
  listValues: any[],
  listKeys: string[],
  wrapperId?: string
) => {
  const init = $(id).first();
  const list = document.querySelectorAll(id);
  $(`${wrapperId} .ctbx`).remove();
  // if (list.length > 0) {
  // 	list.forEach((item: Element, index1: number) => {
  // 		listIds.forEach((id: string, index: number) => {
  // 			const el = item.querySelector(id)
  // 			const key = listKeys[index]
  // 			if (el) el.innerHTML = listValues?.[index1]?.[key]
  // 		})
  // 	})
  // }
  if (listValues?.length > 0) {
    listValues.forEach((item: any, indx: number) => {
      const cloned = init.clone();
      cloned.attr("id", `exp${indx + 1}`);
      cloned.find(".exp-title").html(item?.title);
      cloned.find(".exp-content").html(item?.content);
      cloned.find(".exp-subtitle").html(item?.subtitle);
      cloned.find(".exp-date").html(item?.date);
      $(`${wrapperId}`).first().append(cloned);
    });
  }
};

// const parseable = (input: any) => {
//   try {
//     JSON.parse(input);

//     return true;
//   } catch (error) {
//     return false;
//   }
// };

export const STATIC_URL = `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv`;

const Detail_cv: React.FC<{ idcv: any; id: any; alias: any; in4CVSsr: any, dataCvMau: any, isMobile: any }> = ({
  idcv,
  id,
  alias,
  in4CVSsr,
  dataCvMau,
  isMobile
}) => {

  const [htmlStrings, setHtmlStrings] = useState<any>();
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/`
  //     )
  //     .then((response) => {
  //       setHtmlStrings(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<any>("");
  const [html, setHtml] = useState<any>({});
  const [fontSize, setFontSize] = useState<any>("");
  const [fontSpacing, setFontSpacing] = useState<any>("");
  const [font, setFont] = useState<any>("");
  const [color, setColor] = useState<any>("");
  const [globalLoading, setGlobalLoading] = useState<boolean>(true);

  // console.log(html)
  // const fetchData = async () => {
  //   const result = await POST("candidate/detailCV", { idcv: idcv, id: id });
  //   if (result?.result) {
  //     setHtml(JSON.parse(result?.data?.result?.html));
  //     setImg(result?.data?.result?.nameimg);
  //     setFont(JSON.parse(result?.data?.result?.html)?.css?.font);
  //     setFontSize(JSON.parse(result?.data?.result?.html)?.css?.font_size);
  //     setFontSpacing(JSON.parse(result?.data?.result?.html)?.css?.font_spacing);
  //     setColor(JSON.parse(result?.data?.result?.html)?.css?.color);
  //     console.log(html);
  //   } else {
  //     console.log(result?.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  var data_box: any = [];
  var data_block: any = [];

  const addScript = () => {
    const appendScript = (url: string, async: boolean) => {
      const script6 = document.createElement("script");
      script6.src = url;
      script6.async = async;
      document.head.appendChild(script6);
    };

    // appendScript(
    //   "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js",
    //   false
    // );
    // appendScript(
    //   "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js",
    //   false
    // );
    // appendScript("/cv365/js/jquery.validate.min.js", false);
    appendScript("/cv365/js/permissions_notify.js", false);
    // appendScript("/cv365/js/cropper.js", false);
    // appendScript("/cv365/js/taocv_v2.js", false);
    // appendScript("/js/check_login_dt.js", false);
    // appendScript("/js/style_header.js", false);
    // appendScript("/cv365/js/cv.js", false);
    appendScript("/cv365/js/cv_new_all1.js", false);
    appendScript("/cv365/js/1.js", false);
    appendScript("/cv365/js/cvh_new_all1.js", false);

    setTimeout(() => {
      setGlobalLoading(false);
    }, 200);
  }

  useLayoutEffect(() => {
    axios
      .get(
        // `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/`
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/`
      )
      .then((response) => {
        setHtmlStrings(response.data);
        addScript();
      })
      .catch((error) => {
        console.error(error);
      });

    // fetchData();

    // setTimeout(() => {
    //   setGlobalLoading(false);
    // }, 200);
    return () => { }
  }, [])

  useEffect(() => {
    //handle get uuid then set to local storage
    if (!window.localStorage.getItem("_DEVICEID_")) {
      const deviceid = uuidv4();
      window.localStorage.setItem("_DEVICEID_", deviceid);
    }

    const link = document.createElement("link");
    link.href = "/cv365/css/font-awesome.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  //detect keyboard appear
  // useEffect(() => {
  //   setTimeout(() => {
  //     setGlobalLoading(false);
  //   }, 200);
  // }, []);

  useEffect(() => {
    const html = JSON.parse(in4CVSsr?.html)
    // setTimeout(() => {
    if (htmlStrings) {
      handleSetData(html, dataCvMau?.html_vi, false);
    }
    // }, 1500)
  }, [htmlStrings])

  return (
    <>
      <link rel="stylesheet" href={`/cv365/css/cvh.css`} type="text/css" />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      ></link>
      <link
        rel="stylesheet"
        href={`/cv365/css/avatar_ai.css`}
        type="text/css"
      />
      <link rel="stylesheet" href={`/cv365/css/1.css`} type="text/css" />
      <link
        rel="stylesheet"
        href={`/cv365/css/style_cv2.css`}
        type="text/css"
      />
      <link rel="stylesheet" href={`/cv365/css/cropper.css`} type="text/css" />
      <link
        rel="stylesheet"
        href={`/cv365/css/style_header_chung.css`}
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="/cv365/css/fonts/font_css.css"
        media="print"
      ></link>
      <script
        dangerouslySetInnerHTML={{
          __html: `var data_box = ${JSON.stringify(
            data_box
          )};var data_block = ${JSON.stringify(data_block)}`,
        }}
      />
      <link
        rel="stylesheet"
        // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/cv.css`}
        href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/cv.css`}
      />
      {color && <link
        id="cv-color-css"
        rel="stylesheet"
        // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/colors/${color}.css`}
        href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/colors/${color}.css`}
        type="text/css"
      />}
      {font && <link
        id="cv-font-css"
        rel="stylesheet"
        // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/fonts/${font}.css`}
        href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/fonts/${font}.css`}
        type="text/css"
      />}
      {fontSize && <link
        id="cv-fonSize-css"
        rel="stylesheet"
        // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/font-size/${fontSize}.css`}
        href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/font-size/${fontSize}.css`}
        type="text/css"
      />}
      {fontSpacing && <link
        id="cv-fontSpacing-css"
        rel="stylesheet"
        // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/font-spacing/${fontSpacing}.css`}
        href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/font-spacing/${fontSpacing}.css`}
        type="text/css"
      />}
      <link rel="stylesheet" href="/cv365/css/chi-tiet-cv.css" />

      <div
        id="page-taocv"
        className={`page_taocv`}
        style={{ display: `${globalLoading ? "none" : "block"}` }}
      >
        <div id="m_pagetaocv" className={`m_pagetaocv`}>
          {/* CV */}
          <div className="container_taocv_parent">
            <div className="container_taocv">
              {/* CV SECTION */}
              <div className="container_content_taocv">
                {/* CV */}
                <div className="box_content_taocv" style={{ width: "790px" }}>
                  <div className="page_cv" data-nopagi="1">
                    <input type="hidden" id="cvid" name="cvid" value={idcv} />
                    {htmlStrings && (
                      <div
                        style={{ display: `${loading ? "none" : "block"}` }}
                        dangerouslySetInnerHTML={{ __html: htmlStrings }}
                      ></div>
                    )}
                    {!globalLoading && htmlStrings && <div id="loadingDone"></div>}
                  </div>
                </div>
              </div>

              {/* END CV SECTION */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail_cv;
