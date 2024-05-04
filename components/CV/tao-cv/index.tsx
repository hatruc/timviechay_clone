/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  base_timviec365,
  cookieStep1,
  cookieTempId,
  cookieLogin,
} from "@/components/service/functions";
import { city_array, getAllCity } from "@/functions/functions";
import { access_token } from "@/utils/convert";
import {
  LoadingOutlined,
  EyeFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Select, Spin, Modal } from "antd";
import axios from "axios";
import { getCookie } from "cookies-next";
import $ from "jquery";
import jwtDecode from "jwt-decode";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import "select2";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

interface optionType {
  value: number | string;
  label: string;
}

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

//load remote component
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

const renderPlaceholder = (lang: string) => {
  if (lang == "vi") {
    return {
      holder_title_cv: "Tiêu đề CV",
      holder_name: "Họ tên",
      holder_birthday: "Ngày sinh",
      holder_sex: "Giới tính",
      holder_phone: "Điện thoại",
      holder_email: "Email",
      holder_address: "Địa chỉ",
      holder_face: "Facebook",
      holder_job: "Vị trí công việc ứng tuyển",
      holder_box_title: "Tiêu đề",
      holder_tool_add: "Thêm",
      holder_tool_edit: "Sửa",
      holder_tool_del: "Xóa",
      holder_box_content: "Nội dung",
      holder_block_title: "Tiêu đề mục lớn",
      holder_block_cp_name: "Tên công ty",
      holder_block_time: "Thời gian làm việc",
      holder_block_job: "Vị trí công việc",
      holder_block_job_info:
        "Mô tả chi tiết công việc, những gì đạt được trong quá trình làm việc.",
    };
  } else if (lang == "en") {
    return {
      holder_title_cv: "CV Title",
      holder_name: "Full name",
      holder_birthday: "Birthday",
      holder_sex: "Gender ",
      holder_phone: "Phone number",
      holder_email: "Email",
      holder_address: "Address",
      holder_face: "Facebook",

      holder_job: "Job position",
      holder_box_title: "Title",
      holder_tool_add: "Add",
      holder_tool_edit: "Edit",
      holder_tool_del: "Delete",
      holder_box_content: "Content",
      holder_block_title: "Heading",
      holder_block_cp_name: "Company name",
      holder_block_time: "Working time",
      holder_block_job: "Job position",
      holder_block_job_info: "Job description and task achievements.",
    };
  } else if (lang == "jp") {
    return {
      holder_title_cv: "CVタイトル",
      holder_name: "氏名",
      holder_birthday: "生年",
      holder_sex: "性別",
      holder_phone: "電話番号",
      holder_email: "Eメール",
      holder_address: "住所",
      holder_face: "ウェブサイト（Facebook)",
      holder_job: "応募仕事",
      holder_box_title: "タイトル",
      holder_tool_add: "追加",
      holder_tool_edit: "編集",
      holder_tool_del: "削除",
      holder_box_content: "内容",
      holder_block_title: "大きい項目タイトル",
      holder_block_cp_name: "会社名",
      holder_block_time: "勤務期間",
      holder_block_job: "職位",
      holder_block_job_info: "職歴の詳細内容",
    };
  } else if (lang == "kr") {
    return {
      holder_title_cv: "이력서 제목",
      holder_name: "성명",
      holder_birthday: "년생 ",
      holder_sex: "성별 ",
      holder_phone: "전화번호 ",
      holder_email: "메일",
      holder_address: "주소 ",
      holder_face: "홈페이지 (Facebook)",
      holder_job: "지원하고 싶은 위치",
      holder_box_title: "제목",
      holder_tool_add: "추가",
      holder_tool_edit: "수정",
      holder_tool_del: "삭제",
      holder_box_content: "내용",
      holder_block_title: "큰 제목",
      holder_block_cp_name: "회사명",
      holder_block_time: "근무시간",
      holder_block_job: "작업 위치",
      holder_block_job_info: " 업무에서 달성되는 업무 세부 사항을 설명한다.",
    };
  } else {
    return {
      holder_title_cv: "标题",
      holder_name: "全名",
      holder_birthday: "生日",
      holder_sex: "性别",
      holder_phone: "电话号码",
      holder_email: "邮箱",
      holder_address: "地址",
      holder_face: "Facebook",

      holder_job: "想应聘的岗位",
      holder_box_title: "标题",
      holder_tool_add: "加",
      holder_tool_edit: "修改",
      holder_tool_del: "删除",
      holder_box_content: "内容",
      holder_block_title: "大题目",
      holder_block_cp_name: "公司名称",
      holder_block_time: "工作时间",
      holder_block_job: "工作岗位",
      holder_block_job_info: "描述具体工作, 在工作期间所得到的收获",
    };
  }
};

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

const parseable = (input: any) => {
  try {
    JSON.parse(input);

    return true;
  } catch (error) {
    return false;
  }
};

//fix cv
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
      // if (itemc?.id !== 'box01' && next?.id !== 'box01') {
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
      // }
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
      // if (itemc?.id !== 'box01' && next?.id !== 'box01') {
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
      // }
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
  // $('#cv-title').remove()
}

export const setPlaceholderHTMl = (lang: string, html: any, sample: any) => {
  // //handle check skill input

  let isSample = false;
  if (sample && html) {
    if (JSON.stringify(sample) === JSON.stringify(html)) {
      isSample = true;
    }
  }

  document.querySelectorAll(".bar-value-exp > input").forEach((el: Element) => {
    el.setAttribute("type", "number");
  });

  //handle remove watermark
  document.querySelector(".watermark")?.setAttribute("style", "display:none;");

  // handle check token then set user data to cv
  const info = window.localStorage.getItem("inforFull");
  const token: any = getCookie("work247_token");

  if (info && token && isSample) {
    try {
      const data = JSON.parse(info);

      sethtml("cv_title", data?.cv_title);
      sethtml("cv-profile-fullname", data?.use_first_name);
      sethtml("cv-profile-sex", data?.use_gioi_tinh === 1 ? "Nam" : "Nữ");
      sethtml("cv-profile-email", data?.use_email_lienhe);
      sethtml("cv-profile-phone", data?.use_phone);
      sethtml("cv-profile-address", data?.use_address);

      sethtml(
        "cv-profile-birthday",
        data?.use_birth_day
          ? moment(data?.use_birth_day)?.format("DD/MM/YYYY")
          : moment().format("DD/MM/YYYY")
      );

      // set image
      if (data?.use_logo) {
        const decoded: any = jwtDecode(token);
        const createdAt = moment(decoded?.data?.createdAt * 1000)?.format(
          "YYYY/MM/DD"
        );
        document
          .getElementById("cvo-profile-avatar")
          ?.setAttribute("src", data?.use_logo);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // handle set placeholder by lang
  const tempPlaceholder: any = renderPlaceholder(lang);
  Object.keys(tempPlaceholder)?.forEach((key: string) => {
    const removeHolder = key?.replace("holder_", "");

    // cv title
    renderer(removeHolder, "title_cv", "cv-title", tempPlaceholder[key]);
    renderer(removeHolder, "name", "cv-profile-fullname", tempPlaceholder[key]);
    renderer(
      removeHolder,
      "birthday",
      "cv-profile-birthday",
      tempPlaceholder[key]
    );
    renderer(removeHolder, "sex", "cv-profile-sex", tempPlaceholder[key]);
    renderer(removeHolder, "phone", "cv-profile-phone", tempPlaceholder[key]);
    renderer(removeHolder, "email", "cv-profile-email", tempPlaceholder[key]);
    renderer(
      removeHolder,
      "address",
      "cv-profile-address",
      tempPlaceholder[key]
    );
    renderer(removeHolder, "face", "cv-profile-face", tempPlaceholder[key]);
    renderer(removeHolder, "job", "cv-profile-job", tempPlaceholder[key]);

    renderer(
      removeHolder,
      "block_title",
      "cvo-experience-blocktitle",
      tempPlaceholder[key]
    );
    renderer(removeHolder, "box_title", "cv-boxtitle", tempPlaceholder[key]);
    renderer(
      removeHolder,
      "box_content",
      "box-content",
      tempPlaceholder[key],
      false
    );
    renderer(
      removeHolder,
      "block_cp_name",
      "exp-title",
      tempPlaceholder[key],
      false
    );
    renderer(
      removeHolder,
      "block_job",
      "exp-subtitle",
      tempPlaceholder[key],
      false
    );
    renderer(
      removeHolder,
      "block_job_info",
      "exp-content",
      tempPlaceholder[key],
      false
    );
    renderer(
      removeHolder,
      "block_cp_name",
      "exp-title",
      tempPlaceholder[key],
      false
    );
    renderer(
      removeHolder,
      "block_time",
      "exp-date",
      tempPlaceholder[key],
      false
    );

    renderer(
      removeHolder,
      "tool_add",
      "clone",
      tempPlaceholder[key],
      false,
      true
    );
    renderer(
      removeHolder,
      "tool_del",
      "remove",
      tempPlaceholder[key],
      false,
      true
    );
    renderer(
      removeHolder,
      "tool_edit",
      "edit",
      tempPlaceholder[key],
      false,
      true
    );
  });
};

export const setDataForCV = (inputArr: any[]) => {
  //set data avatar
  inputArr.forEach((item) => {
    const query = document.querySelectorAll(`${item.id}`);
    const doc: HTMLElement[] = [];

    query.forEach((item) => doc.push(item as HTMLElement));

    if (doc.length > 0) {
      if (doc.length > 1)
        doc.forEach((elm: HTMLElement, index) => {
          if (item.notText) {
            elm.style[item.attr] = item?.listData[index];
          } else {
            elm.innerHTML = item.listData?.[index] || "";
          }
        });
      else {
        doc[0].innerHTML = item.data;
      }
    }
  });
};

export const STATIC_URL = `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv`;

export default function Tao_cv({
  in4CVSsr,
  in4user,
  dataCvMau,
  Cv,
  langcv,
  colorscv,
  isMobile,
  idcv
}: any) {
  var data_box: any = [];
  var data_block: any = [];

  const [cvTitle, setCvTitle] = useState<any>(in4CVSsr?.name || 'CV')

  const breadcrumbItems = [
    {
      href: "/",
      text: "Trang chủ",
    },
    {
      href: "/CV/trang-chu-cv",
      text: "CV xin việc",
    },
    {
      href: "/CV/trang-chu-cv",
      text: "Mẫu CV",
    },
    {
      href: "/CV/tao-cv",
      text: cvTitle,
    },
  ];

  const [optionCity, setOptionCity] = useState<optionType[]>(getAllCity())

  // Hiển thị mục
  const [isShow, setIsShow] = useState(false);
  const dataForMucRef = useRef<any>(null);
  const btnRef = useRef<any>(null);

  const handleClickOutOpenTime = (event: any) => {
    if (dataForMucRef.current && !dataForMucRef.current.contains(event.target)) {
      setIsShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutOpenTime);
    return () => {
      document.removeEventListener("mousedown", handleClickOutOpenTime);
    };
  }, []);

  const showDataForMuc = () => {
    setIsShow(true);
  }

  const hideDataForMuc = () => {
    setIsShow(false);
  }

  const [in4CV, setin4CV] = useState(in4CVSsr);

  const [lang, setlang] = useState(
    in4CVSsr?.lang
      ? in4CVSsr?.lang
      : window.localStorage.getItem("langCV")
        ? window.localStorage.getItem("langCV")
        : "vi"
  );
  const [sampleCV, setSampleCV] = useState(dataCvMau);
  const [globalLoading, setGlobalLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [htmlString, setHtmlString] = useState();
  const [similar, setSimilar] = useState([]);
  const [data, setdata] = useState<any>({
    fontsize: null,
    fontFamily: "",
    line_heght: 24,
    background: colorscv ? colorscv : "",
    fontStyle: "",
    justify: "",
    imgxemtruoc: "",
  });
  const [show, setshow] = useState(false);
  const [listColor, setListColor] = useState<string[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [isntruc, setInstruc] = useState<any[]>([]);
  const [dataSaved, setDataSaved] = useState<any>();
  const [dataMuc, setDataMuc] = useState<any[]>();

  // set data sample cv to local

  useEffect(() => {
    // let sampleCv = "";
    const savedLang = window.localStorage.getItem("langCV");
    localStorage.setItem('sampleCV', JSON.stringify(sampleCV?.[`html_${lang}`]))

  }, [lang]);

  //detect keyboard appear
  useEffect(() => {
    setTimeout(() => {
      setGlobalLoading(false);
    }, 200);
  }, []);

  //channge lang
  const handleChangeLang = (lang: string) => {
    if (in4CVSsr) {
      if (in4CVSsr?.item_ur) {
        return (in4CVSsr?.item_ur?.html);
      } else if (lang === "vi" && in4CVSsr?.html_vi !== undefined) {
        return (in4CVSsr?.html_vi);
      } else if (lang === "en" && in4CVSsr?.html_en !== undefined) {
        return (in4CVSsr?.html_en);
      } else if (lang === "cn" && in4CVSsr?.html_cn !== undefined) {
        return (in4CVSsr?.html_cn);
      } else if (lang === "kr" && in4CVSsr?.html_kr !== undefined) {
        return (in4CVSsr?.html_kr);
      } else if (lang === "jp" && in4CVSsr?.html_jp !== undefined) {
        return (in4CVSsr?.html_jp);
      } else if (!lang) {
        return null;
      } else {
        return null; // Hoặc giá trị mặc định khác nếu cần
      }
    }
  };

  const addScript = () => {
    const appendScript = (url: string, async: boolean) => {
      const script6 = document.createElement("script");
      script6.src = url;
      script6.async = async;
      document.head.appendChild(script6);
    };

    appendScript(
      "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js",
      false
    );
    appendScript(
      "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js",
      false
    );

    appendScript("/cv365/js/select2.js", false);
    appendScript("/cv365/js/jquery.validate.min.js", false);
    appendScript("/cv365/js/cv.js", false);
    appendScript("/js/style_header.js", false);
    appendScript("/cv365/js/permissions_notify.js", false);
    appendScript("/js/check_login_dt.js", false);
    appendScript("/cv365/js/cropper.js", false);

    appendScript("/cv365/js/1.js", false);
    appendScript("/cv365/js/cv_new_all1.js", false);
    appendScript("/cv365/js/taocv_v2.js", false);

    appendScript("/cv365/js/cvh_new_all1.js", false);
    appendScript("/cv365/js/edit.js", false);
    appendScript("/cv365/js/main.js", false);

  }

  const [htmlStrings, setHtmlStrings] = useState();
  useEffect(() => {

    const load = async () => {
      let res

      if (isMobile) {
        res = await loadRemoteComponent(`${STATIC_URL}/cv365/upload/cv/cv_mobile/index.html`)
      } else {
        res = await loadRemoteComponent(`${STATIC_URL}/cv365/upload/cv/${in4CVSsr?.alias}/index.html`)
      }
      setHtmlStrings(res)
    }

    load()
    addScript();
  }, [in4CVSsr, in4CVSsr?.alias]);


  // get similar cvs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${base_timviec365}/api/timviec/cv/getList`,
          {
            pageSize: 5,
            cate: in4CVSsr?.cate_id,
            notEqualId: in4CVSsr?._id,
          }
        );

        if (res?.status === 200) {
          setSimilar(
            res?.data?.data?.data?.filter(
              (item: any) => item?._id !== in4CVSsr?._id
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (in4CVSsr) {
      fetchData();
    }
  }, [in4CVSsr]);

  useEffect(() => {
    if (access_token) {
      setshow(true);
    }
  }, [access_token]);

  useEffect(() => {
    setListColor(
      in4CVSsr?.colors
        ?.split(",")
        ?.map((item: string) => "#" + item?.toLowerCase())
    );
  }, [in4CVSsr]);

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

  useEffect(() => {
    setLoading(true);
    if (firstLoad) {
      setTimeout(() => {
        const oldData = window.localStorage.getItem("cvData");
        if (oldData && parseable(oldData))
          handleSetData(JSON.parse(oldData), dataCvMau?.[`html_${lang}`]);
        else {
          handleSetData(handleChangeLang(lang), dataCvMau?.[`html_${lang}`]);
        }
        setPlaceholderHTMl(
          lang,
          handleChangeLang(lang),
          dataCvMau?.[`html_${lang}`]
        );
      }, 1500);

      setFirstLoad(false);

      setLoading(false);
    } else {
      setLoading(true);
      handleSetData(handleChangeLang(lang), dataCvMau?.[`html_${lang}`]);
      setPlaceholderHTMl(
        lang,
        handleChangeLang(lang),
        dataCvMau?.[`html_${lang}`]
      );
      setLoading(false);
    }
  }, [lang, firstLoad]);

  const setLangData = (lang: string) => {
    window.localStorage.setItem("langCV", lang);
    window.localStorage.removeItem("cvData");
    window.location.reload();
    // setlang(lang)
  };

  const handleChangeInstruction = (inp: any) => {
    const html: any = (inp);
    // const html = handleChangeLang(lang)
    let data: any[] = [];
    const box1 = html?.menu?.[0]?.content?.content?.content;
    const box2 = html?.menu?.[1]?.content;
    const box3 = html?.menu?.[2]?.content;
    const box4 = html?.menu?.[3]?.content;
    const box5 = html?.menu?.[4]?.content;
    const box6 = html?.menu?.[5]?.content;
    const box7 = html?.menu?.[6]?.content;

    const block1 = html?.experiences?.[0]?.content;
    const block2 = html?.experiences?.[1]?.content;
    const block3 = html?.experiences?.[2]?.content;
    const block4 = html?.experiences?.[3]?.content;
    const block5 = html?.experiences?.[4]?.content;

    // muc tieu nghe nghiep - box 2
    data.push({ id: "box02", title: box2?.title, content: box2?.content });
    data.push({
      id: "box03",
      title: box3?.title,
      content: box3?.content?.skills
        ?.map((item: any) => item?.name)
        ?.join("</br>"),
    });
    data.push({ id: "box04", title: box4?.title, content: box4?.content });
    data.push({ id: "box05", title: box5?.title, content: box5?.content });
    data.push({ id: "box06", title: box6?.title, content: box6?.content });
    data.push({ id: "box07", title: box7?.title, content: box7?.content });

    data.push({
      id: "block01",
      title: block1?.title,
      content: block1?.content
        ?.map((item: any) =>
          Object.keys(item)
            ?.map((key: any) => item[key])
            ?.join("</br>")
        )
        .join("</br>"),
    });
    data.push({
      id: "block02",
      title: block2?.title,
      content: block2?.content
        ?.map((item: any) =>
          Object.keys(item)
            ?.map((key: any) => item[key])
            ?.join("</br>")
        )
        .join("</br>"),
    });
    data.push({
      id: "block03",
      title: block3?.title,
      content: block3?.content
        ?.map((item: any) =>
          Object.keys(item)
            ?.map((key: any) => item[key])
            ?.join("</br>")
        )
        .join("</br>"),
    });
    data.push({
      id: "block04",
      title: block4?.title,
      content: block4?.content
        ?.map((item: any) =>
          Object.keys(item)
            ?.map((key: any) => item[key])
            ?.join("</br>")
        )
        .join("</br>"),
    });
    data.push({
      id: "block05",
      title: block5?.title,
      content: block5?.content
        ?.map((item: any) =>
          Object.keys(item)
            ?.map((key: any) => item[key])
            ?.join("</br>")
        )
        .join("</br>"),
    });

    return data;
  };

  const dataForMuc = (lang: string) => {
    const data = in4CVSsr?.[`html_${lang}`];
    let final: any[] = [];
    if (data) {
      const jsonData = data;
      final.push({
        id: "box01",
        name: "Thông tin liên hệ",
        status: jsonData?.menu?.[0]?.status,
      });
      final.push({
        id: "box02",
        name: "Mục tiêu nghề nghiệp",
        status: jsonData?.menu?.[1]?.status,
      });
      final.push({
        id: "box03",
        name: "Kỹ năng",
        status: jsonData?.menu?.[2]?.status,
      });
      final.push({
        id: "box04",
        name: "Giải thưởng",
        status: jsonData?.menu?.[3]?.status,
      });
      final.push({
        id: "box05",
        name: "Chứng chỉ",
        status: jsonData?.menu?.[4]?.status,
      });
      final.push({
        id: "box06",
        name: "Sở thích",
        status: jsonData?.menu?.[5]?.status,
      });
      final.push({
        id: "box07",
        name: "Người tham chiếu",
        status: jsonData?.menu?.[6]?.status,
      });
      final.push({
        id: "block01",
        name: "Trình độ học vấn",
        status: jsonData?.experiences?.[0]?.status,
      });
      final.push({
        id: "block02",
        name: "Kinh nghiệm làm việc",
        status: jsonData?.experiences?.[1]?.status,
      });
      final.push({
        id: "block03",
        name: "Hoạt động",
        status: jsonData?.experiences?.[2]?.status,
      });
      final.push({
        id: "block04",
        name: "Dự án tham gia",
        status: jsonData?.experiences?.[3]?.status,
      });
      final.push({
        id: "block05",
        name: "Thông tin thêm",
        status: jsonData?.experiences?.[4]?.status,
      });

      setDataMuc(final);
    }
  };

  useEffect(() => {
    setInstruc(handleChangeInstruction(dataCvMau?.[`html_${lang || "vi"}`]));
    setDataSaved((in4CVSsr?.[`html_${lang}`]));
    dataForMuc(lang);
  }, [lang]);

  return (
    <>
      <link rel="stylesheet" href={`/cv365/css/cvh.css`} type="text/css" />
      <link
        rel="stylesheet"
        href={
          isMobile
            ? `${STATIC_URL}/cv365/upload/cv/cv_mobile/css/cv.css`
            : `${STATIC_URL}/cv365/upload/cv/${in4CV?.alias}/css/cv.css`
        }
        type="text/css"
      />
      <link
        id="cv-font"
        rel="stylesheet"
        href={`${isMobile
          ? `${STATIC_URL}/cv365/upload/cv/${in4CV?.alias}/css/fonts/${dataSaved?.css?.font || "Roboto"
          }.css`
          : `/cv365/css/font-family/${dataSaved?.css?.font || "Roboto"}.css`
          }`}
        type="text/css"
      />
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
        href="/cv365/css/taocv_v2.css?v=1700541007"
        type="text/css"
      ></link>
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
        id="cv-cpacing-css"
        rel="stylesheet"
        href={`${isMobile
          ? `${STATIC_URL}/cv365/upload/cv/cv_mobile/css/font-spacing/${data?.line_heght}.css`
          : `/cv365/css/font-spacing/${dataSaved?.css?.font_spacing || "normal"
          }.css`
          }`}
        type="text/css"
      />
      <link
        id="cv-font-size"
        rel="stylesheet"
        href={`${isMobile
          ? `${STATIC_URL}/cv365/upload/cv/cv_mobile/css/font-size/${dataSaved?.css?.font_size}.css`
          : `/cv365/css/fonts/${dataSaved?.css?.font_size || "normal"}.css`
          }`}
        type="text/css"
      />
      {!isMobile && (
        <link
          id="cv-color-css"
          rel="stylesheet"

          href={`${process.env.NEXT_PUBLIC_BASE_URL_API
            }/cv/cv365/upload/cv/${in4CVSsr?.alias}/css/colors/${dataSaved?.css?.color || in4CVSsr?.colors?.split(",")?.[0]
            }.css`}

          type="text/css"
        />
      )}
      <link
        rel="stylesheet"
        href="/cv365/css/select2.css"
        media="print"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
      />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>

      <Header />

      <div className="container">
        {/* Thanh navigation */}
        <div className="navigation">
          {/* Breadcrumb */}
          <div className="list_breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="breadcrumb">
                {item.href ? (
                  <>
                    <Link href={item.href}>
                      <span>{item.text}</span>
                    </Link>
                    {index < breadcrumbItems.length - 1 && <span>/</span>}
                  </>
                ) : (
                  <>
                    <span>{item.text}</span>
                    {index < breadcrumbItems.length - 1 && <span>/</span>}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="select">
            {/* Ngôn ngữ */}
            <Select
              title="Ngôn ngữ"
              className="language"
              optionFilterProp="children"
              filterOption={filterOption}
              placeholder={
                <div className="desc">
                  <img
                    src="/images/cv/tao-cv/language.png"
                    alt="Ngôn ngữ"
                    className="img"
                  />
                  <div>Ngôn ngữ</div>
                </div>
              }
            >
              <option value="Vietnamese">Tiếng Việt</option>
              <option value="English">Tiếng Anh</option>
              <option value="Japanese">Tiếng Nhật</option>
              <option value="Korean">Tiếng Hàn</option>
              <option value="Chinese">Tiếng Trung</option>
            </Select>

            {/* Ngành nghề */}
            <Select
              title="Ngành nghề"
              className="job"
              optionFilterProp="children"
              filterOption={filterOption}
              placeholder={
                <div className="desc">
                  <img
                    src="/images/cv/tao-cv/linear---design--tools---layers.png"
                    alt="Ngành nghề"
                    className="img"
                  />
                  <div>Tất cả ngành nghề</div>
                </div>
              }
            >
              <option value="Business">Kinh doanh</option>
              <option value="Seafood">Thủy sản</option>
              <option value="Engine">Cơ khí</option>
              <option value="IT">IT</option>
              <option value="Manage">Quản lý</option>
            </Select>
          </div>
        </div>
      </div>
      <div
        id="page-taocv"
        className={`page_taocv`}
        style={{ display: `${globalLoading ? "none" : "block"}` }}
      >
        <div id="m_pagetaocv" className={`m_pagetaocv`}>
          {/* TOOL BAR */}
          <div id="cvo-toolbar">
            <div className="toolbar-global-controls">
              <div className="ctr ctn_cv_new">
                {/* Tải xuống mobile */}
                {isMobile && <div className="item box_btn">
                  <div
                    className="btn_taixuong cursor_pt html2canvas btn"
                    data-type="download"
                  // onClick="resg_new()"
                  >
                    <p className="txt">Lưu và tải xuống</p>
                    <img
                      // onClick={() => registerNew}
                      src="/images/cv/mau-cv/icon-save.png"
                      className="ic_taixuong_cv img26 m_img20 sm_img24 cursor_pt"
                      alt="icon tải xuống"
                    />
                  </div>
                </div>}

                {/* Ngôn ngữ */}
                <div className="item" id="cvo-toolbar-lang">
                  <div className="options gap_12">
                    <span className="flag btn-lang-option">Ngôn ngữ</span>
                    <div className="item_selected">
                      <div className="flag">
                        <div className="img_rd">
                          <img src={`/cv365/images/${lang}.png`} />
                        </div>
                        <img src="/images/cv/mau-cv/icon-online.svg" />
                      </div>
                      <div className="box_select">
                        <span
                          className={`flag btn-lang-option vi ${lang === "vi"}`}
                          data-lang="vi"
                          onClick={() => setLangData("vi")}
                        >
                          <div className="img_rd">
                            <img src="/cv365/images/vi.png" />
                          </div>
                          <i className="flag-selected" />
                          <img
                            src="/images/cv/mau-cv/icon-online.svg"
                            className={`${lang === "vi"}`}
                          />
                        </span>
                        <span
                          className={`flag btn-lang-option en ${lang === "en"}`}
                          data-lang="en"
                          onClick={() => setLangData("en")}
                        >
                          <div className="img_rd">
                            <img src="/cv365/images/en.png" />
                          </div>
                          <i className="flag-selected" />
                          <img
                            src="/images/cv/mau-cv/icon-online.svg"
                            className={`${lang === "en"}`}
                          />
                        </span>
                        <span
                          className={`flag btn-lang-option jp ${lang === "jp"}`}
                          data-lang="jp"
                          onClick={() => setLangData("jp")}
                        >
                          <div className="img_rd">
                            <img src="/cv365/images/jp.png" />
                          </div>
                          <i className="flag-selected" />
                          <img
                            src="/images/cv/mau-cv/icon-online.svg"
                            className={`${lang === "jp"}`}
                          />
                        </span>
                        <span
                          className={`flag btn-lang-option cn ${lang === "cn"}`}
                          data-lang="cn"
                          onClick={() => setLangData("cn")}
                        >
                          <div className="img_rd">
                            <img src="/cv365/images/cn.png" />
                          </div>
                          <i className="flag-selected" />
                          <img
                            src="/images/cv/mau-cv/icon-online.svg"
                            className={`${lang === "cn"}`}
                          />
                        </span>
                        <span
                          className={`flag btn-lang-option kr ${lang === "kr"}`}
                          data-lang="kr"
                          onClick={() => setLangData("kr")}
                        >
                          <div className="img_rd">
                            <img src="/cv365/images/kr.png" />
                          </div>
                          <i className="flag-selected" />
                          <img
                            src="/images/cv/mau-cv/icon-online.svg"
                            className={`${lang === "kr"}`}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tông màu */}
                <div className="item" id="toolbar-color">
                  <div className="options gap_12">
                    <span>Tông màu</span>
                    <div className="color_selected">
                      <span
                        className="color"
                        id="color_active"
                        style={{
                          backgroundColor:
                            `#${dataSaved?.css?.color}` || listColor?.[0],
                        }}
                        data-color={
                          dataSaved?.css?.color ||
                          listColor?.[0]?.replace("#", "")
                        }
                      />

                      {dataSaved && (
                        <div className="pos_clr">
                          {listColor?.map((item: any, index: number) => {
                            return (
                              <span
                                key={index}
                                className={`color ${item?.replace("#", "") ===
                                  dataSaved?.css?.color
                                  ? "active"
                                  : ""
                                  } `}
                                style={{ backgroundColor: `${item}` }}
                                data-color={item?.replace("#", "")}
                                onClick={() =>
                                  setSelectedColor(item?.replace("#", ""))
                                }
                              >
                                <i className="fa fa-check" />
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="item" id="toolbar-font">
                  <div className="title">Font chữ</div>
                  <div className="options">
                    {dataSaved && (
                      <select
                        name="font"
                        id="font-selector"
                        style={{ width: 115 }}
                        defaultValue={dataSaved?.css?.font}
                      >
                        <option value="Roboto">Roboto</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Arial">Arial</option>
                        <option value="sun-exta">sun-exta</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Cỡ chữ */}
                <div
                  className="item item_nopd"
                  id="co_chu"
                  style={{ display: "flex" }}
                >
                  <div className="title">Cỡ chữ</div>
                  {dataSaved && (
                    <div className="options">
                      <span
                        className={`fontsize small ${dataSaved?.css?.font_size === "small" ? "active" : ""
                          }`}
                        data-size="small"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 15.4L6.45833 11.9M12 15.4L10.5417 11.9M6.45833 11.9L8.5 7L10.5417 11.9M6.45833 11.9H10.5417"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="16.1999"
                            cy="12.6"
                            r="2.8"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                          <line
                            x1="19.5"
                            y1="9.59985"
                            x2="19.5"
                            y2="15.5999"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={`fontsize normal ${dataSaved?.css?.font_size === "normal" ? "active" : ""
                          }`}
                        data-size="normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 15.4L6.45833 11.9M12 15.4L10.5417 11.9M6.45833 11.9L8.5 7L10.5417 11.9M6.45833 11.9H10.5417"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="16.1999"
                            cy="12.6"
                            r="2.8"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                          <line
                            x1="19.5"
                            y1="9.59985"
                            x2="19.5"
                            y2="15.5999"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={`fontsize large ${dataSaved?.css?.font_size === "large" ? "active" : ""
                          }`}
                        data-size="large"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 15.4L6.45833 11.9M12 15.4L10.5417 11.9M6.45833 11.9L8.5 7L10.5417 11.9M6.45833 11.9H10.5417"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="16.1999"
                            cy="12.6"
                            r="2.8"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                          <line
                            x1="19.5"
                            y1="9.59985"
                            x2="19.5"
                            y2="15.5999"
                            stroke="#474747"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>

                {/* Giãn dòng */}
                <div className="item item_nopd" id="cach_dong">
                  <div className="title">Giãn dòng</div>
                  {dataSaved && (
                    <div className="options">
                      <span
                        className={`line-height small ${dataSaved?.css?.font_spacing === "small"
                          ? "active"
                          : ""
                          }`}
                        data-spacing="small"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.5 6.43333C19.5 6.54826 19.4566 6.65848 19.3794 6.73975C19.3022 6.82101 19.1974 6.86667 19.0882 6.86667H5.91176C5.80256 6.86667 5.69782 6.82101 5.6206 6.73975C5.54338 6.65848 5.5 6.54826 5.5 6.43333C5.5 6.31841 5.54338 6.20819 5.6206 6.12692C5.69782 6.04565 5.80256 6 5.91176 6H19.0882C19.1974 6 19.3022 6.04565 19.3794 6.12692C19.4566 6.20819 19.5 6.31841 19.5 6.43333ZM19.0882 18.1333H5.91176C5.80256 18.1333 5.69782 18.179 5.6206 18.2603C5.54338 18.3415 5.5 18.4517 5.5 18.5667C5.5 18.6816 5.54338 18.7918 5.6206 18.8731C5.69782 18.9543 5.80256 19 5.91176 19H19.0882C19.1974 19 19.3022 18.9543 19.3794 18.8731C19.4566 18.7918 19.5 18.6816 19.5 18.5667C19.5 18.4517 19.4566 18.3415 19.3794 18.2603C19.3022 18.179 19.1974 18.1333 19.0882 18.1333ZM11.1445 14.7932C11.0672 14.7118 10.9623 14.6661 10.8529 14.6661C10.7436 14.6661 10.6387 14.7118 10.5614 14.7932C10.4841 14.8746 10.4407 14.9849 10.4407 15.1C10.4407 15.2151 10.4841 15.3254 10.5614 15.4068L12.2085 17.1401C12.2467 17.1805 12.2922 17.2125 12.3422 17.2344C12.3922 17.2562 12.4458 17.2674 12.5 17.2674C12.5542 17.2674 12.6078 17.2562 12.6578 17.2344C12.7078 17.2125 12.7533 17.1805 12.7915 17.1401L14.4386 15.4068C14.5159 15.3254 14.5593 15.2151 14.5593 15.1C14.5593 14.9849 14.5159 14.8746 14.4386 14.7932C14.3613 14.7118 14.2564 14.6661 14.1471 14.6661C14.0377 14.6661 13.9328 14.7118 13.8555 14.7932L12.9118 15.7873V9.21273L13.8555 10.2068C13.9328 10.2882 14.0377 10.3339 14.1471 10.3339C14.2564 10.3339 14.3613 10.2882 14.4386 10.2068C14.5159 10.1254 14.5593 10.0151 14.5593 9.9C14.5593 9.78493 14.5159 9.67457 14.4386 9.5932L12.7915 7.85987C12.7533 7.81951 12.7078 7.78749 12.6578 7.76565C12.6078 7.7438 12.5542 7.73256 12.5 7.73256C12.4458 7.73256 12.3922 7.7438 12.3422 7.76565C12.2922 7.78749 12.2467 7.81951 12.2085 7.85987L10.5614 9.5932C10.4841 9.67457 10.4407 9.78493 10.4407 9.9C10.4407 10.0151 10.4841 10.1254 10.5614 10.2068C10.6387 10.2882 10.7436 10.3339 10.8529 10.3339C10.9623 10.3339 11.0672 10.2882 11.1445 10.2068L12.0882 9.21273V15.7873L11.1445 14.7932Z"
                            fill="#474747"
                          />
                        </svg>
                      </span>
                      <span
                        className={`line-height normal ${dataSaved?.css?.font_spacing === "normal"
                          ? "active"
                          : ""
                          }`}
                        data-spacing="normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.5 6.43333C19.5 6.54826 19.4566 6.65848 19.3794 6.73975C19.3022 6.82101 19.1974 6.86667 19.0882 6.86667H5.91176C5.80256 6.86667 5.69782 6.82101 5.6206 6.73975C5.54338 6.65848 5.5 6.54826 5.5 6.43333C5.5 6.31841 5.54338 6.20819 5.6206 6.12692C5.69782 6.04565 5.80256 6 5.91176 6H19.0882C19.1974 6 19.3022 6.04565 19.3794 6.12692C19.4566 6.20819 19.5 6.31841 19.5 6.43333ZM19.0882 18.1333H5.91176C5.80256 18.1333 5.69782 18.179 5.6206 18.2603C5.54338 18.3415 5.5 18.4517 5.5 18.5667C5.5 18.6816 5.54338 18.7918 5.6206 18.8731C5.69782 18.9543 5.80256 19 5.91176 19H19.0882C19.1974 19 19.3022 18.9543 19.3794 18.8731C19.4566 18.7918 19.5 18.6816 19.5 18.5667C19.5 18.4517 19.4566 18.3415 19.3794 18.2603C19.3022 18.179 19.1974 18.1333 19.0882 18.1333ZM11.1445 14.7932C11.0672 14.7118 10.9623 14.6661 10.8529 14.6661C10.7436 14.6661 10.6387 14.7118 10.5614 14.7932C10.4841 14.8746 10.4407 14.9849 10.4407 15.1C10.4407 15.2151 10.4841 15.3254 10.5614 15.4068L12.2085 17.1401C12.2467 17.1805 12.2922 17.2125 12.3422 17.2344C12.3922 17.2562 12.4458 17.2674 12.5 17.2674C12.5542 17.2674 12.6078 17.2562 12.6578 17.2344C12.7078 17.2125 12.7533 17.1805 12.7915 17.1401L14.4386 15.4068C14.5159 15.3254 14.5593 15.2151 14.5593 15.1C14.5593 14.9849 14.5159 14.8746 14.4386 14.7932C14.3613 14.7118 14.2564 14.6661 14.1471 14.6661C14.0377 14.6661 13.9328 14.7118 13.8555 14.7932L12.9118 15.7873V9.21273L13.8555 10.2068C13.9328 10.2882 14.0377 10.3339 14.1471 10.3339C14.2564 10.3339 14.3613 10.2882 14.4386 10.2068C14.5159 10.1254 14.5593 10.0151 14.5593 9.9C14.5593 9.78493 14.5159 9.67457 14.4386 9.5932L12.7915 7.85987C12.7533 7.81951 12.7078 7.78749 12.6578 7.76565C12.6078 7.7438 12.5542 7.73256 12.5 7.73256C12.4458 7.73256 12.3922 7.7438 12.3422 7.76565C12.2922 7.78749 12.2467 7.81951 12.2085 7.85987L10.5614 9.5932C10.4841 9.67457 10.4407 9.78493 10.4407 9.9C10.4407 10.0151 10.4841 10.1254 10.5614 10.2068C10.6387 10.2882 10.7436 10.3339 10.8529 10.3339C10.9623 10.3339 11.0672 10.2882 11.1445 10.2068L12.0882 9.21273V15.7873L11.1445 14.7932Z"
                            fill="#474747"
                          />
                        </svg>
                      </span>
                      <span
                        className={`line-height large ${dataSaved?.css?.font_spacing === "large"
                          ? "active"
                          : ""
                          }`}
                        data-spacing="large"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.5 6.43333C19.5 6.54826 19.4566 6.65848 19.3794 6.73975C19.3022 6.82101 19.1974 6.86667 19.0882 6.86667H5.91176C5.80256 6.86667 5.69782 6.82101 5.6206 6.73975C5.54338 6.65848 5.5 6.54826 5.5 6.43333C5.5 6.31841 5.54338 6.20819 5.6206 6.12692C5.69782 6.04565 5.80256 6 5.91176 6H19.0882C19.1974 6 19.3022 6.04565 19.3794 6.12692C19.4566 6.20819 19.5 6.31841 19.5 6.43333ZM19.0882 18.1333H5.91176C5.80256 18.1333 5.69782 18.179 5.6206 18.2603C5.54338 18.3415 5.5 18.4517 5.5 18.5667C5.5 18.6816 5.54338 18.7918 5.6206 18.8731C5.69782 18.9543 5.80256 19 5.91176 19H19.0882C19.1974 19 19.3022 18.9543 19.3794 18.8731C19.4566 18.7918 19.5 18.6816 19.5 18.5667C19.5 18.4517 19.4566 18.3415 19.3794 18.2603C19.3022 18.179 19.1974 18.1333 19.0882 18.1333ZM11.1445 14.7932C11.0672 14.7118 10.9623 14.6661 10.8529 14.6661C10.7436 14.6661 10.6387 14.7118 10.5614 14.7932C10.4841 14.8746 10.4407 14.9849 10.4407 15.1C10.4407 15.2151 10.4841 15.3254 10.5614 15.4068L12.2085 17.1401C12.2467 17.1805 12.2922 17.2125 12.3422 17.2344C12.3922 17.2562 12.4458 17.2674 12.5 17.2674C12.5542 17.2674 12.6078 17.2562 12.6578 17.2344C12.7078 17.2125 12.7533 17.1805 12.7915 17.1401L14.4386 15.4068C14.5159 15.3254 14.5593 15.2151 14.5593 15.1C14.5593 14.9849 14.5159 14.8746 14.4386 14.7932C14.3613 14.7118 14.2564 14.6661 14.1471 14.6661C14.0377 14.6661 13.9328 14.7118 13.8555 14.7932L12.9118 15.7873V9.21273L13.8555 10.2068C13.9328 10.2882 14.0377 10.3339 14.1471 10.3339C14.2564 10.3339 14.3613 10.2882 14.4386 10.2068C14.5159 10.1254 14.5593 10.0151 14.5593 9.9C14.5593 9.78493 14.5159 9.67457 14.4386 9.5932L12.7915 7.85987C12.7533 7.81951 12.7078 7.78749 12.6578 7.76565C12.6078 7.7438 12.5542 7.73256 12.5 7.73256C12.4458 7.73256 12.3922 7.7438 12.3422 7.76565C12.2922 7.78749 12.2467 7.81951 12.2085 7.85987L10.5614 9.5932C10.4841 9.67457 10.4407 9.78493 10.4407 9.9C10.4407 10.0151 10.4841 10.1254 10.5614 10.2068C10.6387 10.2882 10.7436 10.3339 10.8529 10.3339C10.9623 10.3339 11.0672 10.2882 11.1445 10.2068L12.0882 9.21273V15.7873L11.1445 14.7932Z"
                            fill="#474747"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>

                {/* Thêm mục */}
                <div
                  className="item box_btn cursor_pt"
                  onClick={isShow ? hideDataForMuc : showDataForMuc}
                  ref={btnRef}
                >
                  <p className="txt">Thêm mục</p>
                  <img
                    src="/images/cv/mau-cv/them-muc.png"
                    className="img26 m_img20 sm_img24 cursor_pt"
                  />
                </div>
                <div className={`box_sidebar box_themmuccv ${isShow ? "" : "d_none"}`} ref={dataForMucRef}>
                  <div className="container_show">
                    <div className="content_show_tmuc" id="content_show_tmuc">
                      <div className="container_show_tmuc">
                        <div className="box_show_mucchuasd">
                          <div className="title_mucchuasd">
                            <p className="txt_mucchuasd">Mục chưa sử dụng</p>
                          </div>
                          <div className="show_mucchuasd">
                            {dataMuc?.map((item: any, index: number) => {
                              if (item?.status === "hide") {
                                return (
                                  <div
                                    key={index}
                                    className="mucchuasd muc_chua_sd "
                                    id={`muc_chua_sd_${item?.id}`}
                                  >
                                    <img
                                      src="/cv365/images/new_image/ic_cv_warning.svg"
                                      className="icon_warning_muc cursor_pt"
                                      alt="icon cảnh báo"
                                    />
                                    <div className="mucchuasd_frame">
                                      <p className="txt_frame_mcsd">
                                        {item?.name}
                                      </p>
                                    </div>
                                    <img
                                      src="/cv365/images/new_image/ic_cv_plus.svg"
                                      className="icon_add_muc cursor_pt"
                                      alt="icon thêm mục"
                                      data-blockmain="menu"
                                      data-blockkey={item?.id}
                                    />
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                        <div className="box_show_mucdasd">
                          <div className="title_mucdasd">
                            <p className="txt_mucdasd">Mục đã sử dụng</p>
                          </div>
                          <div className="show_mucdasd">
                            {dataMuc?.map((item: any, index: number) => {
                              if (item?.status !== "hide") {
                                return (
                                  <div
                                    key={index}
                                    className="mucchuasd muc_da_sd"
                                    id={`muc_da_sd_${item?.id}`}
                                  >
                                    <img
                                      src="/cv365/images/new_image/ic_cv_warning.svg"
                                      className="icon_warning_muc cursor_pt"
                                      alt="icon cảnh báo"
                                    />
                                    <div className="mucchuasd_frame">
                                      <p className="txt_frame_mcsd">
                                        {item?.name}
                                      </p>
                                    </div>
                                    <img
                                      src="/cv365/images/new_image/ic_cv_minus.svg"
                                      className="icon_add_muc cursor_pt"
                                      alt="icon bỏ mục"
                                      data-blockmain="menu"
                                      data-blockkey={item?.id}
                                    />
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Xem trước */}
                <div className="item box_btn"
                // onClick={() => handlePreview()}
                >
                  <button className="btn btn_xemtruoc cursor_pt">
                    <p className="txt">Xem trước</p>
                    <EyeFilled
                      className="cursor_pt img26 m_img20 sm_img24"
                      style={{ color: "#92c8f9", fontSize: "28px" }}
                    />
                  </button>
                </div>

                {/* Lưu và tải xuống */}
                {!isMobile && <div className="item box_btn">
                  <div
                    className="btn_taixuong cursor_pt html2canvas btn"
                    data-type="download"
                  // onClick="resg_new()"
                  >
                    <p className="txt">Lưu và tải xuống</p>
                    <img
                      // onClick={() => registerNew}
                      src="/images/cv/mau-cv/icon-save.png"
                      className="ic_taixuong_cv img26 m_img20 sm_img24 cursor_pt"
                      alt="icon tải xuống"
                    />
                  </div>
                </div>}
              </div>
            </div>

            {/* Toolbar */}
            <div id="cvo-toolbar-1">
              <div className="item tool" id="tool_1">
                <div className="editor-control-group disabled">
                  <span
                    className="editor-control cmd-bold"
                    title="In đậm"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('bold')"
                  >
                    <i className="fa fa-bold" />
                  </span>
                  <span
                    className="editor-control cmd-italic"
                    title="In nghiêng"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('italic')"
                  >
                    <i className="fa fa-italic" />
                  </span>
                  <span
                    className="editor-control cmd-underline"
                    title="Gạch chân"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('underline')"
                  >
                    <i className="fa fa-underline" />
                  </span>
                  <span
                    className="editor-control cmd-strikeThrough"
                    title="Gạch ngang"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('strikeThrough')"
                  >
                    <i className="fa fa-strikethrough" />
                  </span>
                </div>
              </div>
              <div className="item tool" id="tool_2">
                <div className="editor-control-group disabled">
                  <span
                    className="editor-control cmd-justifyLeft"
                    title="Căn trái"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('justifyLeft')"
                  >
                    <i className="fa fa-align-left" />
                  </span>
                  <span
                    className="editor-control cmd-justifyCenter actived"
                    title="Căn giữa"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('justifyCenter')"
                  >
                    <i className="fa fa-align-center" />
                  </span>
                  <span
                    className="editor-control cmd-justifyRight"
                    title="Căn phải"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('justifyRight')"
                  >
                    <i className="fa fa-align-right" />
                  </span>
                  <span
                    className="editor-control cmd-justifyFull"
                    title="Căn đều hai bên"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('justifyFull')"
                  >
                    <i className="fa fa-align-justify" />
                  </span>
                </div>
              </div>
              <div className="item tool" id="tool_3">
                <div className="editor-control-group disabled">
                  <span
                    className="editor-control cmd-undo"
                    title="Hoàn tác"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('undo')"
                  >
                    <i className="fa fa-undo" />
                  </span>
                  <span
                    className="editor-control cmd-redo"
                    title="Làm lại"
                    onMouseDown={(e) => e.preventDefault()}
                  // onclick="doCommand('redo')"
                  >
                    <i className="fa fa-repeat" />
                  </span>
                  <span
                    className="editor-control cmd-removeFormat"
                    title="Xóa hết định dạng"

                  // onclick="doCommand('removeFormat')"
                  //   style={{ display: "none" }}
                  >
                    <i className="fa fa-eraser" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* END TOOLBAR */}

          {/* CV */}
          <div className="container_taocv_parent">
            <div className="container_taocv">
              {/* CV SECTION */}
              <div className="container_content_taocv">
                {/* CV */}
                <div className="box_content_taocv">
                  <div className="page_cv">
                    <input type="hidden" id="cvid" name="cvid" value={`${idcv}`} />
                    <p id="checktext" style={{ display: "none" }}>
                      bà nguyễn vũ anh linh
                      <br />
                      giám đốc kinh doanh tại công ty tnhh mốt quốc tế cv365
                      <br />
                      0987 541 258
                    </p>
                    {/* <MauCV /> */}
                    {htmlStrings && (
                      <div
                        style={{ display: `${loading ? "none" : "block"}` }}
                        dangerouslySetInnerHTML={{ __html: htmlStrings }}
                      ></div>
                    )}

                  </div>
                </div>

                {/* CV cùng ngành nghề */}
                <div className="same_job_cv">
                  <div className="btn_box">
                    <LeftOutlined className="btn" />
                  </div>
                  <div className="same_cv">
                    <div className="title">CV cùng ngành nghề</div>
                    <div className="img">
                      <img
                        src="/images/cv/mau-cv/ava_1.png"
                        alt="CV cùng ngành nghề"
                      />
                      <div className="hover_img">
                        <Button className="f_btn">Xem trước cv</Button>
                        <Button>
                          <Link href="/CV/tao-cv">Sử dụng mẫu này</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="txt">Mẫu CV Nhân viên S.E.O 12</div>
                  </div>
                  <div className="btn_box">
                    <RightOutlined className="btn" />
                  </div>
                </div>
              </div>

              {/* END CV SECTION */}

              {/* LEFT BAR */}
              <div
                className="container_sidebar_left"
                style={{ display: "none" }}
              >
                <div className="show_sidebar d_none">
                  <img
                    src="/cv365/images/new_image/ic_cv_thugon.svg"
                    className="ic_thugon cursor_pt"
                    alt="Thu gọn"
                  />
                  <div className="box_sidebar box_doimaucv">
                    <div className="container_show">
                      <div className="title_show">
                        <img
                          src="/cv365/images/new_image/lightbulb.svg"
                          className="img_show img24"
                          alt="icon đổi mẫu cv"
                        />
                        <p className="txt_show">ĐỔI MẪU CV</p>
                        <img
                          src="/cv365/images/new_image/ic_thoat_cv.svg"
                          className="img_thoat ic_414 img19"
                          alt="icon thoát"
                        />
                      </div>
                      <div className="content_show_cv" data-lang="">
                        {similar?.map((item: any, index: number) => (
                          <div className="container_show_cv" key={index}>
                            <div className="box_show_cv">
                              <div className="show_cv cursor_pt">
                                {/* <a href="https://timviec365.vn/cv365/tao-cv-sinh-vien-moi-ra-truong/mau-12a" data="tao-cv-sinh-vien-moi-ra-truong/mau-12a" > */}
                                <a
                                  className="click-elm"
                                  // href={`/cv365/tao-cv-${item?.url_alias}`}
                                  href="/CV/tao-cv"
                                  data-alias={item?.alias}
                                  data-id=""
                                >
                                  <img
                                    src={item?.image}
                                    className="img_doi_cvmau"
                                    alt="CV cho sinh viên mới ra trường 12a"
                                    // data-url={`/cv365/tao-cv-${item?.url_alias}`}
                                    data-url="/CV/tao-cv"
                                  />
                                </a>
                              </div>
                              <div className="title_cv">
                                <p className="text_cv">
                                  {/* <a href="https://timviec365.vn/cv365/tao-cv-sinh-vien-moi-ra-truong/mau-12a" target="_blank" rel="nofollow"> */}
                                  <a
                                    data-alias={item?.alias}
                                    data-id=""
                                    href={`/cv365/tao-cv-${item?.url_alias}`}
                                  >
                                    {item?.name}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="box_sidebar box_themmuccv d_none">
                      <div className="container_show">
                        <div className="title_show">
                          <img
                            src="/cv365/images/new_image/lightbulb.svg"
                            className="img_show img24"
                            alt="icon thêm mục"
                          />
                          <p className="txt_show">THÊM MỤC</p>
                          <img
                            src="/cv365/images/new_image/ic_thoat_cv.svg"
                            className="img_thoat ic_414 img19"
                            alt="icon thoát"
                          />
                        </div>
                        <div className="content_show_tmuc" id="content_show_tmuc">
                          <div className="container_show_tmuc">
                            <div className="box_show_mucchuasd">
                              <div className="title_mucchuasd">
                                <p className="txt_mucchuasd">Mục chưa sử dụng</p>
                              </div>
                              <div className="show_mucchuasd">
                                {dataMuc?.map((item: any, index: number) => {
                                  if (item?.status === "hide") {
                                    return (
                                      <div
                                        key={index}
                                        className="mucchuasd muc_chua_sd "
                                        id={`muc_chua_sd_${item?.id}`}
                                      >
                                        <img
                                          src="/cv365/images/new_image/ic_cv_warning.svg"
                                          className="icon_warning_muc cursor_pt"
                                          alt="icon cảnh báo"
                                        />
                                        <div className="mucchuasd_frame">
                                          <p className="txt_frame_mcsd">
                                            {item?.name}
                                          </p>
                                        </div>
                                        <img
                                          src="/cv365/images/new_image/ic_cv_plus.svg"
                                          className="icon_add_muc cursor_pt"
                                          alt="icon thêm mục"
                                          data-blockmain="menu"
                                          data-blockkey={item?.id}
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                            <div className="box_show_mucdasd">
                              <div className="title_mucdasd">
                                <p className="txt_mucdasd">Mục đã sử dụng</p>
                              </div>
                              <div className="show_mucdasd">
                                {dataMuc?.map((item: any, index: number) => {
                                  if (item?.status !== "hide") {
                                    return (
                                      <div
                                        key={index}
                                        className="mucchuasd muc_da_sd"
                                        id={`muc_da_sd_${item?.id}`}
                                      >
                                        <img
                                          src="/cv365/images/new_image/ic_cv_warning.svg"
                                          className="icon_warning_muc cursor_pt"
                                          alt="icon cảnh báo"
                                        />
                                        <div className="mucchuasd_frame">
                                          <p className="txt_frame_mcsd">
                                            {item?.name}
                                          </p>
                                        </div>
                                        <img
                                          src="/cv365/images/new_image/ic_cv_minus.svg"
                                          className="icon_add_muc cursor_pt"
                                          alt="icon bỏ mục"
                                          data-blockmain="menu"
                                          data-blockkey={item?.id}
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  <div className="box_sidebar box_hdvietcv d_none">
                    <div className="container_show">
                      <div className="title_show">
                        <img
                          src="/cv365/images/new_image/lightbulb.svg"
                          className="img_show img24"
                          alt="icon hướng dẫn viết cv"
                        />
                        <p className="txt_show">HƯỚNG DẪN VIẾT CV</p>
                        <img
                          src="/cv365/images/new_image/ic_thoat_cv.svg"
                          className="img_thoat ic_414 img19"
                          alt="icon thoát"
                        />
                      </div>
                      <div className="content_show_hdvcv">
                        <div className="container_show_hdvcv">
                          {isntruc?.map((item: any, index: any) => (
                            <div
                              key={index}
                              className="box_hdavietcv item_suggest"
                              data-id={item?.id}
                            >
                              <div className="title_hdvietcv">
                                <p className="txt_hdvietcv">{item?.title}</p>
                              </div>
                              <div className="hdanvietcv">
                                <p
                                  className="txt_hdanvietcv"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.content,
                                  }}
                                ></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="box_sidebar box_vlgy d_none"
                    id="vlam_goiy_cv_moi"
                  >
                    <div className="container_show">
                      <div className="title_show">
                        <img
                          src="/cv365/images/new_image/lightbulb.svg"
                          className="img_show img24"
                          alt="icon gợi ý việc làm AI365"
                        />
                        <p className="txt_show">VIỆC LÀM GỢI Ý TỪ AI365</p>
                        <img
                          src="/cv365/images/new_image/ic_thoat_cv.svg"
                          className="img_thoat ic_414 img19"
                          alt="icon thoát"
                        />
                      </div>
                      <div className="content_show_vlgy">
                        {/* <div class="container_show_vlgy">
                                        <div class="box_show_imgaevlgy">
                                            <a class="" href="#">
                                                <img src="/cv365/images/new_image/avatar_vlgy.svg" class="img_avatar" alt="avatar tin việc làm">
                                            </a>
                                            <span class="show_tthd_vlgy">12 phút</span>
                                        </div>
                                        <div class="box_show_inforvlgy">
                                            <div class="title_name_vlgy">
                                                <a class="" href="#">
                                                    <p class="txt_name_vlgy">Nhân sự tuyển dụng 20 nhân viên kinh doanh</p>
                                                </a>
                                            </div>
                                            <div class="title_name_user">
                                                <p class="txt_name_user">
                                                    Công ty Cổ phần đầu tư xây dựng và phát triển
                                                </p>
                                            </div>
                                            <div class="box_add_mess">
                                                <div class="box_add_vlgy">
                                                    <img src="/cv365/images/new_image/ic_cv_location.svg" class="ic_cv_location img16" alt="icon địa chỉ">
                                                    <p class="txt_add_vlgy txt_chung_vlgy">
                                                        Hà Nội
                                                    </p>
                                                </div>
                                                <div class="box_monney_vlgy">
                                                    <img src="/cv365/images/new_image/ic_cv_monney.svg" class="ic_cv_monney img16" alt="icon tiền">
                                                    <p class="txt_monney_vlgy txt_chung_vlgy">
                                                        15 - 30 triệu
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="box_sidebar box_doingonngu d_none">
                    <div className="container_show">
                      <div className="title_show">
                        <img
                          src="/cv365/images/new_image/lightbulb.svg"
                          className="img_show img24"
                          alt="icon đổi ngôn ngữ"
                        />
                        <p className="txt_show">ĐỔI NGÔN NGỮ</p>
                        <img
                          src="/cv365/images/new_image/ic_thoat_cv.svg"
                          className="img_thoat ic_414 img19"
                          alt="icon thoát"
                        />
                      </div>
                      <div
                        className="content_show_ngonngu"
                        id="cvo-toolbar-lang"
                        style={{}}
                      >
                        {/* <div class="content_show_ngonngu"> */}
                        <div className="container_show_ngonngu">
                          <div className="box_show_nngu">
                            <label
                              className={`box_image_nngu cursor_pt flag btn-lang-option vi ${lang === "vi" ? "active" : ""
                                }`}
                              data-lang="vi"
                              onClick={() => setLangData("vi")}
                            >
                              <img
                                src="/cv365/images/new_image/ic-vietnam.svg"
                                className={`img_show_nngu img75 ${lang === "vi" && "boder_nngu"
                                  }`}
                                alt="icon hiển thị ngôn ngữ tiếng việt"
                              />
                              <input
                                className="input_show_nngu cursor_pt"
                                name="ngonngucv"
                                type="radio"
                                checked={lang === "vi"}
                                style={{
                                  display: `${lang === "vi" ? "block" : "none"
                                    }`,
                                }}
                                onChange={() => { }}
                              />
                              <p className="txt_show_nngu">Việt Nam</p>
                            </label>
                          </div>
                          <div className="box_show_nngu">
                            <label
                              className={`box_image_nngu cursor_pt flag btn-lang-option en ${lang === "en" ? "active" : ""
                                }`}
                              data-lang="en"
                              onClick={() => setLangData("en")}
                            >
                              <img
                                src="/cv365/images/new_image/ic_england.svg"
                                className={`img_show_nngu img75 ${lang === "en" && "boder_nngu"
                                  }`}
                                alt="icon hiển thị ngôn ngữ tiếng anh"
                              />
                              <input
                                className="input_show_nngu cursor_pt"
                                name="ngonngucv"
                                type="radio"
                                checked={lang === "en"}
                                style={{
                                  display: `${lang === "en" ? "block" : "none"
                                    }`,
                                }}
                                onChange={() => { }}
                              />
                              <p className="txt_show_nngu">Tiếng Anh</p>
                            </label>
                          </div>
                          <div className="box_show_nngu">
                            <label
                              className={`box_image_nngu cursor_pt flag btn-lang-option kr ${lang === "kr" ? "active" : ""
                                }`}
                              data-lang="kr"
                              onClick={() => setLangData("kr")}
                            >
                              <img
                                src="/cv365/images/new_image/ic-korea.svg"
                                className={`img_show_nngu img75 ${lang === "kr" && "boder_nngu"
                                  }`}
                                alt="icon hiển thị ngôn ngữ tiếng hàn"
                              />
                              <input
                                className="input_show_nngu cursor_pt"
                                name="ngonngucv"
                                type="radio"
                                checked={lang === "kr"}
                                style={{
                                  display: `${lang === "kr" ? "block" : "none"
                                    }`,
                                }}
                                onChange={() => { }}
                              />
                              <p className="txt_show_nngu">Tiếng Hàn</p>
                            </label>
                          </div>
                          <div className="box_show_nngu">
                            <label
                              className={`box_image_nngu cursor_pt flag btn-lang-option jp ${lang === "jp" ? "active" : ""
                                }`}
                              data-lang="jp"
                              onClick={() => setLangData("jp")}
                            >
                              <img
                                src="/cv365/images/new_image/ic-japan.svg"
                                className={`img_show_nngu img75 ${lang === "jp" && "boder_nngu"
                                  }`}
                                alt="icon hiển thị ngôn ngữ tiếng nhật"
                              />
                              <input
                                className="input_show_nngu cursor_pt"
                                name="ngonngucv"
                                type="radio"
                                checked={lang === "jp"}
                                style={{
                                  display: `${lang === "jp" ? "block" : "none"
                                    }`,
                                }}
                                onChange={() => { }}
                              />
                              <p className="txt_show_nngu">Tiếng Nhật</p>
                            </label>
                          </div>
                          <div className="box_show_nngu">
                            <label
                              className={`box_image_nngu cursor_pt flag btn-lang-option cn ${lang === "cn" ? "active" : ""
                                }`}
                              data-lang="cn"
                              onClick={() => setLangData("cn")}
                            >
                              <img
                                src="/cv365/images/new_image/ic-china.svg"
                                className={`img_show_nngu img75 ${lang === "cn" && "boder_nngu"
                                  }`}
                                alt="icon hiển thị ngôn ngữ tiếng trung"
                              />
                              <input
                                className="input_show_nngu cursor_pt"
                                name="ngonngucv"
                                type="radio"
                                checked={lang === "cn"}
                                style={{
                                  display: `${lang === "cn" ? "block" : "none"
                                    }`,
                                }}
                                onChange={() => { }}
                              />
                              <p className="txt_show_nngu">Tiếng Trung</p>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar_left box_suggest">
                  <div
                    className="icon_sidebar_left cursor_pt show_sidebar_left"
                    id="rutgon_mobile"
                  >
                    <div className="icon">
                      <p className="txtic_sidebar_left">+</p>
                    </div>
                  </div>
                  {/* <div className="icon_sidebar_left cursor_pt show_sidebar_left" id="hdanvietcv" data-show="box_hdvietcv">
                                          <img src="/cv365/images/new_image/ic_cv_hdancv.svg" className="ic_hdcv img31 ic_check" alt="hướng dẫn viết cv" />
                                          <img
                                              src="/cv365/images/new_image/ic_hdcv_blue.svg"
                                              className="ic_hdcv_blue img31 ic_check_blue d_none"
                                              alt="hướng dẫn viết cv blue"
                                          />
                                          <p className="txtic_sidebar_left">Hướng dẫn viết CV</p>
                                      </div> */}
                  <div
                    className="icon_sidebar_left cursor_pt show_sidebar_left"
                    id="doimaucv"
                    data-show="box_doimaucv"
                  >
                    <img
                      src="/cv365/images/new_image/ic_cv_doimaucv.svg"
                      className="ic_doimaucv img31 ic_check"
                      alt="đổi mẫu cv"
                    />
                    <img
                      src="/cv365/images/new_image/ic_doimaucv_blue.svg"
                      className="ic_doimaucv_blue img31 ic_check_blue d_none"
                      alt="đổi mẫu cv blue"
                    />
                    <p className="txtic_sidebar_left">Đổi mẫu CV</p>
                  </div>
                  <div
                    className="icon_sidebar_left cursor_pt show_sidebar_left"
                    id="themuccv"
                    data-show="box_themmuccv"
                  >
                    <img
                      src="/cv365/images/new_image/ic_cv_themmuc.svg"
                      className="ic_themmuc img31 ic_check"
                      alt="thêm mục cv"
                    />
                    <img
                      src="/cv365/images/new_image/ic_themmuccv_blue.svg"
                      className="ic_themmuc_blue img31 ic_check_blue d_none"
                      alt="thêm mục cv blue"
                    />
                    <p className="txtic_sidebar_left">Thêm mục</p>
                  </div>
                  {/* <div
                      className="icon_sidebar_left cursor_pt show_sidebar_left"
                      id="vieclamgy"
                      data-show="box_vlgy"
                    >
                      <img
                        src="/cv365/images/new_image/ic_cv_vlgy.svg"
                        className="ic_vlgy img31 ic_check"
                        alt="việc làm gợi ý AI365"
                      />
                      <img
                        src="/cv365/images/new_image/ic_vlgy_blue.svg"
                        className="ic_vlgy_blue img31 ic_check_blue d_none"
                        alt="việc làm gợi ý AI365 blue"
                      />
                      <p className="txtic_sidebar_left">
                        Việc làm gợi ý từ AI365
                      </p>
                    </div> */}
                  {/* <div
                      className="icon_sidebar_left cursor_pt title"
                      onClick={() => {
                        const el = document.getElementById("zoom_cv");
                        if (el) el.style.display = "block";
                      }}
                    >
                      <img
                        src="/cv365/images/new_image/ic_cv_cvmau.svg"
                        className="ic_cvmau img31 ic_check"
                        alt="CV mẫu"
                      />
                      <img
                        src="/cv365/images/new_image/ic_cvmau_blue.svg"
                        className="ic_cvmau_blue img31 ic_check_blue d_none"
                        alt="CV mẫu blue"
                      />
                      <p className="txtic_sidebar_left">CV mẫu</p>
                    </div> */}
                  {/* <div
                      className="icon_sidebar_left cursor_pt show_sidebar_left"
                      id="doinngu"
                      data-show="box_doingonngu"
                    >
                      <img
                        src="/cv365/images/new_image/ic_cv_nngu.svg"
                        className="ic_doinngu img31 ic_check"
                        alt="Đổi ngôn ngữ"
                      />
                      <img
                        src="/cv365/images/new_image/ic_nngu_blue.svg"
                        className="ic_doinngu_blue img31 ic_check_blue d_none"
                        alt="Đổi ngôn ngữ blue"
                      />
                      <p className="txtic_sidebar_left">Đổi ngôn ngữ</p>
                    </div> */}
                  {/* <a
                      href="/tao-cv-boi-ai.html?cvid=2062"
                      className="icon_sidebar_left cursor_pt show_sidebar_left"
                      id="tao_cv_ai"
                    >
                      <img
                        src="/cv365/images/new_image/ic_create_cv_ai.svg"
                        className="ic_create_cv_ai img31 ic_check"
                        alt="Tạo CV bằng AI"
                      />
                      <img
                        src="/cv365/images/new_image/ic_create_cv_ai.svg"
                        className="ic_create_cv_ai_blue img31 ic_check_blue d_none"
                        alt="Tạo CV bằng AI"
                      />
                      <p className="txtic_sidebar_left">
                        Sửa nội dung bằng AI365
                      </p>
                    </a> */}
                  <div
                    className="icon_sidebar_left cursor_pt show_sidebar_left"
                    id="rutgon"
                  >
                    <img
                      src="/cv365/images/new_image/arrow_top.svg"
                      className="ic_doinngu img31"
                      alt="Rút gọn"
                    />
                    <p className="txtic_sidebar_left">Rút gọn</p>
                  </div>
                </div>
              </div>

              {/* END LEFT BAR */}

              {/* RIGHT Bar */}
              <div
                className="container_sidebar_rigth"
                style={{ display: "none" }}
              >
                <div className="container_sidebar_rigth cursor_pt">
                  <div className="box_range_zoom">
                    <img
                      src="/cv365/images/new_image/plus_black.svg"
                      className="icon_cong_zoom img33 cursor_pt"
                      alt="Cộng zoom"
                    />
                    <div className="box_input_range">
                      <input
                        className="input_range zoom_web d_none"
                        type="range"
                        min={50}
                        max={150}
                        defaultValue={100}
                        onChange={() => { }}
                      />
                    </div>
                    <p className="txt_input_range">100%</p>
                    <img
                      src="/cv365/images/new_image/minus_black.svg"
                      className="icon_tru_zoom img33 cursor_pt"
                      alt="Trừ zoom"
                    />
                  </div>
                </div>
              </div>

              {/* END RIGHT BAR */}
            </div>
          </div>
        </div>
      </div>

      <div className="overlay zoom_cv" id="zoom_cv" style={{ display: "none" }}>
        <div className="wapper">
          <div className="auth_form po_r">
            <div className="p_left">
              <div className="frame_img">
                <img
                  className="img_cv"
                  src={`${STATIC_URL}/cv365/upload/cv/${in4CVSsr?.alias}/${in4CVSsr?.colors?.split(",")?.[0]
                    }.jpg`}
                  alt="CV"
                />
                <div className="box_point_cv">
                  <div className="item">
                    <p>
                      Lượt xem:{" "}
                      <span className="view_count">{in4CVSsr?.view}</span>
                    </p>
                  </div>
                  <div className="item">
                    <p>
                      Thời gian: <span className="view_time">1248456</span> phút
                    </p>
                  </div>
                </div>
                <img
                  className="close_zoom_cv"
                  src="/cv365/images/close_zoom_cv.png"
                  alt="close"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE IMAGE AI */}

      {/* CHANGE IMG PROFFILE */}
      <div id="imageEditorWraper" style={{ display: "none" }}>
        <div className="container container_crop_image">
          <h3>Chỉnh sửa ảnh đại diện</h3>
          <div className="editor-col-left">
            <h4>Ảnh gốc</h4>
            <div className="imageEditor" style={{ display: "none" }}>
              <img id="image" src="/" />
            </div>
            <div className="editorChooseImage">
              <label
                htmlFor="inputImage"
                className="btn-choose-image"
                title="Upload image file"
              >
                <input
                  type="file"
                  className="sr-only"
                  id="inputImage"
                  name="file"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff"
                  onChange={() => { }}
                />
                <i className="fa fa-picture-o" />
                <br />
                Click chọn ảnh để tải lên!
              </label>
            </div>
            <div className="image-controls" style={{ display: "none" }}>
              <div className="image-control-group">
                <button className="image-control-btn btn-zoom-in-image">
                  <span className="fa fa-search-plus" />
                </button>
                <button className="image-control-btn btn-zoom-out-image">
                  <span className="fa fa-search-minus" />
                </button>
              </div>
              <div className="image-control-group">
                <button className="image-control-btn btn-rotate-left">
                  <span className="fa fa-rotate-left" />
                </button>
                <button className="image-control-btn btn-rotate-right">
                  <span className="fa fa-rotate-right" />
                </button>
              </div>
            </div>
            <div
              className="tipCompress"
              style={{
                fontSize: 14,
                color: "red",
                marginTop: 5,
                marginLeft: 20,
                textAlign: "left",
              }}
            >
              Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng
              ảnh trước khi tải lên.
            </div>
            <div className="loadingShow" style={{ display: "none" }}>
              <i className="fa fa-spinner fa-spin" />
              <br />
              <br />
              <span className="loadingMessage">Đang tải ảnh lên ...</span>
            </div>
          </div>
          <div className="editor-col-right">
            <h4>Ảnh hiển thị trên CV</h4>
            <div className="imageEditorControls">
              <div
                className="img-edit-preview"
                style={{ border: "1px solid #efefef" }}
              >
                <img src="/cv365/images/no_avatar.jpg" alt="ảnh đại diện" />
              </div>
              <div className="edit-image-btns" style={{ display: "none" }}>
                <label htmlFor="inputImage1" className="btn-change-image">
                  <input
                    type="file"
                    className="sr-only"
                    id="inputImage1"
                    name="file"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff"
                    onChange={() => { }}
                  />
                  Đổi ảnh
                </label>
                <button type="button" className="btn-remove-image">
                  Xóa ảnh
                </button>
                <br />
              </div>
              <div>
                <button type="button" className="btn-save-image disabled">
                  Xong
                </button>
              </div>
              <div>
                <a
                  className="btn-close-image-editor"
                  title="Đóng trình chỉnh sửa (Không lưu thay đổi)"
                  onClick={() => {
                    const el = document.getElementById("imageEditorWraper");

                    if (el) el.style.display = "none";
                  }}
                >
                  Đóng lại (Không lưu)
                </a>
              </div>
              <form
                action=""
                method="post"
                id="saveEditedAvatar"
                style={{ display: "none" }}
              >
                <input
                  type="hidden"
                  name="cropx"
                  id="dataX"
                  defaultValue={0}
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="cropy"
                  id="dataY"
                  defaultValue={0}
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="cropw"
                  id="dataWidth"
                  defaultValue={280}
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="croph"
                  id="dataHeight"
                  defaultValue={280}
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="rotate"
                  id="dataRotate"
                  defaultValue={0}
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="tile"
                  id="dataTile"
                  defaultValue={1}
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="cv_alias"
                  id="cv_alias"
                  defaultValue="CV Hóa Học - Sinh Học 06"
                  onChange={() => { }}
                />
              </form>
            </div>
          </div>
        </div>
        <div
          className="container container_image_AI"
          style={{ display: "none" }}
        >
          <p className="title">Bạn có muốn biến hình với AI365</p>
          <div className="box_img">
            {/* <img src="https://devnext.timviec365.vn/static-tv/images/tuan_image/image_AI_big.png" alt="logo AI" /> */}
          </div>
          <div className="box_btn">
            <button className="btn_confirm">Có</button>
            <button className="btn_not">Không</button>
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      <div
        className="overlay zoom_cv cv_mau_new"
        id="cv_mau_new"
        style={{ display: "none" }}
      >
        <div className="wapper">
          <div className="auth_form po_r">
            <div className="p_left">
              <div className="tle_cls">
                <p>Xem trước</p>
                <img
                  className="close_zoom_cv"
                  src="/cv365/images/exp_cls_cv.png"
                  alt="close"
                />
              </div>
              <div className="frame_img">
                <img className="img_cv" src="" alt="CV" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* change background */}
      <div className="change_background" style={{ display: "none" }}>
        <div className="pop_change_background">
          <div className="box_change_bg box_select_img">
            <input
              type="file"
              name="inp_bg_file"
              id="inp_bg_file"
              hidden={true}
              onChange={() => { }}
            />
            <div className="cb_header">
              <div className="cb_hd_text">AI365 – Chọn hình nền mẫu </div>
              <button className="btn_close cancel_bg">
                <img
                  src="https://timviec365.vn/images/background_cv/btn_close_rounder.svg"
                  alt="Đóng"
                />
              </button>
            </div>
            <div className="cb_body">
              <div className="cb_content">
                <div className="box_title">
                  <p className="title">Chọn hình nền</p>
                  <button className="upload_file_bg">
                    Tải mẫu lên{" "}
                    <img
                      src="https://timviec365.vn/images/background_cv/icon_upload.svg"
                      alt="Tải tệp lên"
                    />
                  </button>
                </div>
                <div className="box_select_img">
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_1.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_1.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_2.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_2.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_3.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_3.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_4.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_4.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_5.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_5.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_6.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_6.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_7.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_7.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container_radio_bg">
                    <img
                      className="img_select"
                      src="https://storage.timviec365.vn/timviec365/pictures/background_cv/background_8.jpg"
                      alt="chọn ảnh"
                    />
                    <input
                      type="radio"
                      name="radio_img"
                      data-image="/pictures/background_cv/background_8.jpg"
                      onChange={() => { }}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="box_try_ai">
                  <p className="sub_text">hoặc</p>
                  <p className="title_try">
                    Tạo hình nền theo sở thích với{" "}
                    <span className="txt_blue">AI365</span>
                  </p>
                  <button className="btn_try">THỬ NGAY</button>
                </div>
              </div>
              <div className="cb_btn">
                <button className="cancel_bg">Hủy</button>
                <button className="btn_blue show_preview_bg">Chọn</button>
              </div>
            </div>
          </div>
          <div
            className="box_change_bg box_input_des"
            style={{ display: "none" }}
          >
            <div className="cb_header">
              <div className="cb_hd_text">AI365 – Tạo ảnh nền</div>
              <button className="btn_close cancel_bg">
                <img
                  src="https://timviec365.vn/images/background_cv/btn_close_rounder.svg"
                  alt="Đóng"
                />
              </button>
            </div>
            <div className="cb_body">
              <div className="cb_content">
                <div className="box_inp box_input_des_bg">
                  <p className="inp_title">
                    Cho AI365 biết bạn muốn một bức ảnh như thế nào{" "}
                    <span className="txt_error">*</span>
                  </p>
                  <textarea
                    className="inp_des_bg"
                    name="inp_des_bg"
                    id="inp_des_bg"
                    cols={30}
                    rows={10}
                    placeholder="Nhập danh từ, màu sắc, hình dáng,... Ví dụ:Sư tử Núi rừng châu âu"
                    defaultValue={""}
                  />
                  <p className="err" />
                </div>
                <div className="box_inp box_select_bg_type">
                  <p className="inp_title">Chọn</p>
                  <div className="row_select_bg">
                    <select name="bg_style" id="bg_style">
                      <option value={1}>Chuyên nghiệp</option>
                      <option value={2}>Đơn giản</option>
                    </select>
                    <select name="bg_color" id="bg_color">
                      <option value={1}>Tone màu</option>
                      <option value={2}>Đơn giản</option>
                    </select>
                  </div>
                </div>
                <div className="box_inp box_btn_select">
                  <p className="inp_title">hoặc</p>
                  <button className="select_img_default">
                    Sử dụng ảnh nền có sẵn
                  </button>
                </div>
              </div>
              <div className="cb_btn">
                <button className="btn_back">Quay lại</button>
                <button className="btn_blue btn_create_bg">Tạo ảnh</button>
              </div>
            </div>
          </div>
          <div
            className="box_change_bg box_preview"
            style={{ display: "none" }}
          >
            <div className="cb_header">
              <div className="cb_hd_text">AI365 – Tạo ảnh nền</div>
              <button className="btn_close cancel_bg">
                <img
                  src="https://timviec365.vn/images/background_cv/btn_close_rounder.svg"
                  alt="Đóng"
                />
              </button>
            </div>
            <div className="cb_body">
              <div className="cb_content">
                <div className="box_show_bg">
                  {/* <img src="https://devnext.timviec365.vn/static-tv/images/background_cv/img_ex.png" alt="chọn ảnh" /> */}
                </div>
                <div className="box_refresh">
                  <button className="btn_refresh_create_bg">
                    <img
                      src="https://timviec365.vn/images/background_cv/icon_refresh.svg"
                      alt="Tải tệp lên"
                    />
                    Đổi ảnh
                  </button>
                </div>
              </div>
              <div className="cb_btn">
                <button
                  onClick={() => {
                    const el = document.querySelector(".change_background");
                    if (el) el.setAttribute("style", "display: none;");
                  }}
                >
                  Hủy
                </button>
                <button className="btn_blue btn_apply_bg">Chọn</button>
              </div>
            </div>
          </div>
          <div className="box_change_bg box_adjust" style={{ display: "none" }}>
            <div className="cb_header">
              <div className="cb_hd_text">AI365 – Tạo ảnh nền</div>
              <button className="btn_close">
                <img
                  src="https://timviec365.vn/images/background_cv/btn_close_rounder.svg"
                  alt="Đóng"
                />
              </button>
            </div>
            <div className="cb_content" />
            <div className="cb_btn" />
          </div>
        </div>
      </div>

      {/* MODAL ROLE */}

      {false && (
        <div
          className="overlay popup_permission"
          id="popup_permission"
          style={{ display: "none", zIndex: 99999 }}
          data-select2-id="popup_permission"
        >
          <div className="box_permission">
            <div className="box_header">
              <div className="text">PHÂN QUYỀN TÀI KHOẢN</div>
              <button className="btn_close_pop">
                <img
                  src="https://devnext.timviec365.vn/static-tv/images/icon_close_pop.svg"
                  alt="đóng"
                />
              </button>
            </div>
            <div className="box_tk">
              <div className="tk_title">Tài khoản của bạn</div>
              <div className="show_tk">Tài khoản</div>
            </div>
            <div className="form_uv box_user_permission">
              <div className="title_user_permission">
                <label htmlFor="" className="form_title">
                  Tài khoản được phân quyền{" "}
                  <span className="note">(tối đa 5 tài khoản)</span>
                </label>
                <div className="box_dess_permission">
                  <button type="button" className="btn_dess_permission">
                    Chi tiết
                  </button>
                  <div className="content_dess_permission">
                    <p className="tt_dess">Chi tiết</p>
                    <p className="ct_dess">
                      Tài khoản được phân quyền là tài khoản nhân viên hoặc cá
                      nhân hoặc công ty trên chat365, khi được phân quyền sẽ có
                      chức năng như tài khoản của nhà tuyển dụng: Đăng nhập bằng
                      QR, nhận tin nhắn, nhận thông báo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="box_content_notify">
                <div className="box_form_notify">
                  <div className="form_noti">
                    <label className="form_title form_title_noti">
                      Tên tài khoản
                    </label>
                    <div className="box_show_pqchat">
                      <div className="box_inp_email">
                        <input
                          className="form-control show_user_role input_account"
                          onChange={() => { }}
                          placeholder="Nhập email hoặc số điện thoại"
                        />
                        <button className="btn_confirm_notify">Xác nhận</button>
                      </div>
                      <p className="error_noti" />
                    </div>
                    {/* <p class="note_enter_user">Enter để chọn tài khoản.</p> */}
                  </div>
                  <div className="form_noti">
                    <label htmlFor="" className="form_title">
                      Loại thông báo và tin nhắn thông báo
                    </label>
                    <div className="reg_select2">
                      <select
                        className="form-control type_notify select2-hidden-accessible"
                        name=""
                        data-select2-id={3}
                        tabIndex={-1}
                        aria-hidden="true"
                        style={{ width: "100%" }}
                      >
                        <option value="" data-select2-id={5}>
                          Chọn loại thông báo và tin nhắn thông báo
                        </option>
                        <option value={0} data-select2-id={6}>
                          Tất cả thông báo
                        </option>
                        <option value={1} data-select2-id={7}>
                          Thông báo quên mật khẩu, đổi mật khẩu
                        </option>
                        <option value={2} data-select2-id={8}>
                          Thông báo nhà tuyển dụng xem hồ sơ
                        </option>
                        <option value={3} data-select2-id={9}>
                          Thông báo được tag, trả lời bình luận
                        </option>
                        <option value={4} data-select2-id={10}>
                          Thông báo khi có chuyên viên gửi gợi ý việc làm từ
                          AI365
                        </option>
                      </select>
                      {/* <span
                        className="select2 select2-container select2-container--default select2-container--above select2-container--focus"
                        dir="ltr"
                        data-select2-id={11}
                        // style={{ width: '100%' }}
                      > */}
                      {/* <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-labelledby="select2--bf-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2--bf-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Chọn loại thông báo và tin nhắn thông báo"
                            >
                              Chọn loại thông báo và tin nhắn thông báo
                            </span>
                            <span className="select2-selection__arrow" role="presentation">
                              <b role="presentation" />
                            </span>
                          </span>
                        </span> */}
                      {/* <span className="dropdown-wrapper" aria-hidden="true" />
                      </span> */}
                    </div>
                  </div>
                  <div className="form_table_noti" />
                  <div className="btn_form_noti">
                    <button type="button" className="btn_remove_noti">
                      Xóa{" "}
                      <img src="https://devnext.timviec365.vn/static-tv/images/btn_del.svg" />
                    </button>
                  </div>
                </div>
                <div className="box_btn_add_noti">
                  <button type="button" className="btn_add_noti">
                    Thêm +
                  </button>
                </div>
              </div>
            </div>
            <div className="box_btn">
              <button className="cancel">Hủy</button>
              <button className="confirm">Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {/* END MODAL ROLE */}

      <div className="overlay zoom_cv" id="zoom_cv" style={{ display: "none" }}>
        <div className="wapper">
          <div className="auth_form po_r">
            <div className="p_left">
              <div className="frame_img">
                <img
                  className="img_cv"
                  src={`${STATIC_URL}/cv365/upload/cv/${in4CVSsr?.alias}/${in4CVSsr?.colors?.split(",")?.[0]
                    }.jpg`}
                  alt="CV"
                />
                <div className="box_point_cv">
                  <div className="item">
                    <p>
                      Lượt xem:
                      <span className="view_count">{in4CVSsr?.view}</span>
                    </p>
                  </div>
                  <div className="item">
                    <p>
                      Thời gian: <span className="view_time">1248456</span> phút
                    </p>
                  </div>
                </div>
                <img
                  className="close_zoom_cv"
                  src="/cv365/images/close_zoom_cv.png"
                  alt="close"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SIGN IN NOW */}

      <div id="boxLog" className="lightbox" style={{ display: "none" }}>
        <div className="box-a">
          <span
            className="exit"
            title="Thoát"
            onClick={() => {
              const el: any = document.getElementById("boxLog");
              if (el) el.style.display = "none";
            }}
          >
            ×
          </span>
          <p className="img_login">
            <img
              src="https://timviechay.vn/images/header/logo.jpg"
              alt="Timviechay.vn"
              style={{ width: "36%" }}
            />
          </p>
          <div className="r6">
            <div className="ir">
              <p
                style={{
                  fontSize: 20,
                  // lineHeight: 23,
                  textAlign: "center",
                  color: "#363636",
                }}
              >
                Đăng nhập tài khoản ứng viên
              </p>
              <p className="tb">
                Bạn có thể đăng nhập bằng tài khoản ứng viên của timviechay.vn
              </p>
              <form id="form_loguv" method="POST" noValidate={true}>
                <input
                  type="hidden"
                  id="boxlink"
                  onChange={() => { }}
                  defaultValue="https://timviec365.vn/cv365/tao-cv-hoa-hoc-sinh-hoc/mau-06"
                  name="boxlink"
                />
                <div className="row">
                  <input
                    type="text"
                    id="user_phone"
                    defaultValue=""
                    placeholder="Tài khoản đăng nhập"
                    name="phone"
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    id="user_password_first"
                    defaultValue=""
                    placeholder="Mật khẩu"
                    name="pass"
                    onChange={() => { }}
                  />
                </div>
                <a
                  href="https://timviec365.vn/quen-mat-khau-ung-vien.html"
                  title="Quên mật khẩu"
                  className="qmk"
                >
                  Quên mật khẩu
                </a>
                <input
                  type="submit"
                  className="btn bg-blue btn_login_cv"
                  value="Đăng nhập"
                  onChange={() => { }}
                // onClick={async (e) => {
                // 	e.preventDefault()
                // 	const formData = $('#form_loguv').serializeArray()

                // 	const email = formData?.find((item) => item?.name === 'email')?.value
                // 	const pass = formData?.find((item) => item?.name === 'pass')?.value

                // 	if (email && pass) {
                // 		const res = await loginUngVien(email, pass, 0)
                // 		if (res?.code === 500) {
                // 			alert(res?.error?.message)
                // 		} else if (res?.data?.result && res?.data?.access_token) {
                // 			alert('Đăng nhập thành công')
                // 			window.location.reload()
                // 		} else {
                // 			alert('Đăng nhập lỗi')
                // 		}
                // 	}
                // }}
                />
              </form>
            </div>
          </div>
          <div className="r4">
            <div className="ir">
              <div className="bdn">
                <p>Bạn chưa có tài khoản?</p>
                <a
                  href="https://timviechay.vn/dang-ky"
                  target="_blank"
                >
                  Đăng ký ngay
                </a>
              </div>
            </div>
          </div>
          <div className="clr" />
        </div>
      </div>

      {/* END MODAL SIGN IN NOW */}

      {/* MODAL CEREATE AVA WITH AI */}
      {/* <div id="imageEditorWraper_AI" style={{ display: "none" }}>
          <input
            type="file"
            name="inp_avatar_ai365"
            id="inp_avatar_ai365"
            hidden={true}
            accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff"
            onChange={() => { }}
          />
          <div className="avatar-container container active">
            <h3>
              <span className="span_text">Cập nhập ảnh đại diện</span>
              <span className="delete_wraper">
                <img
                  src="https://timviec365.vn/static-tv/images/avatar_ai/tabler_plus.svg"
                  alt="out"
                />
              </span>
            </h3>
            <div className="middle-container">
              <h4>Bạn có muốn chọn trang phục với AI365</h4>
              <div className="avatar-show">
                <div className="left-avatar avatar">
                  <div className="handle-avatar"></div>
                  <h2>Trước</h2>
                </div>
                <div className="right-avatar avatar">
                  <div className="handle-avatar"></div>
                  <h2>Sau</h2>
                </div>
              </div>
            </div>
            <div className="bottom-container">
              <span className="left-span show_old_avatar" data-class="">
                <h5>Không</h5>
                <h6>Dùng ảnh của tôi</h6>
              </span>
            </div>
          </div>
          <div className="choose_image container" style={{ display: "none" }}>
            <h3>
              <span className="span_text">Chọn ảnh gốc</span>
              <span className="delete_wraper">
                <img
                  src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/tabler_plus.svg"
                  alt="out"
                />
              </span>
            </h3>
            <div className="avatar_handle">
              <div className="image-container">
                <div className="image_click"></div>
                <div>Click hoặc kéo thả ảnh để tải</div>
              </div>
            </div>
            <div className="warning_text">
              Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng ảnh
              trước khi tải lên.
            </div>
            <div className="avatar_change">Đổi ảnh</div>
            <hr />
            <div className="bottom-container">
              <span className="left-span">
                <h5>Quay lại</h5>
              </span>
              <span className="right-span" data-class="">
                Sử dụng
              </span>
            </div>
          </div>
          <div
            className="loading-container container active"
            style={{ display: "none" }}
          >
            <h3>
              <span className="span_text">AI365 - Thêm trang phục</span>
              <span className="delete_wraper">
                <img
                  src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/tabler_plus.svg"
                  alt="out"
                />
              </span>
            </h3>
            <div className="middle-container">
              <h5>Vui lòng chờ trong khi AI365 tạo trang phục cho bạn</h5>
            </div>
            <div
              className="loading_container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <div>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: "40px" }} />}
                  size="large"
                />
              </div>
            </div>
            <div className="bottom-container">
              <span className="left-span" data-class="" onClick={() => {
                const rel = document.getElementById('imageEditorWraper_AI')
                if(rel) rel.remove()
              }}>
                <h5>Quay lại</h5>
              </span>
            </div>
          </div>
          <div className="profile_descripe container" style={{ display: "none" }}>
            <h3>
              <span className="span_text">AI365 - Thêm trang phục</span>
              <span className="delete_wraper">
                <img
                  src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/tabler_plus.svg"
                  alt="out"
                />
              </span>
            </h3>
            <div className="profile_text">Bạn là?</div>
            <div className="gender_option">
              <span>
                <input
                  type="radio"
                  name="radio1"
                  id="man"
                  data-gender="male"
                  onChange={() => { }}
                />
                <label htmlFor="man">Nam</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="radio1"
                  data-gender="female"
                  onChange={() => { }}
                />
                <label htmlFor="">Nữ</label>
              </span>
            </div>
            <div className="profile_text">Trang phục muốn thêm</div>
            <div className="clothes_option">
              <span className="clothes_text" data-render="vest">
                Vest
              </span>
              <span className="choose_clothes">
                <img src="images/avatar_ai/down_icon.svg" alt="" />
              </span>
              <div className="dropdown-content">
                <p data-render="vest" className="active">
                  Áo Vest
                </p>
                <p data-render="shirt">Áo Sơ mi</p>
              </div>
            </div>
            <div className="profile_text">Mô tả trang phục</div>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="VD: Vest mau xanh"
              defaultValue={""}
            />
            <div className="bottom-container">
              <span className="left-span" data-class="choose_image">
                <h5>Quay lại</h5>
              </span>
              <span className="right-span render_avatar" data-class="">
                Tiếp tục
              </span>
            </div>
          </div>
          <div
            className="avatar-final-container container active"
            style={{ display: "none" }}
          >
            <h3>
              <span className="span_text">AI365 - Thêm trang phục</span>
              <span className="delete_wraper">
                <img
                  src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/tabler_plus.svg"
                  alt="out"
                />
              </span>
            </h3>
            <div className="middle-container">
              <div className="fix_avatar">
                <span className="fix_text">
                  Vùng trang phục nhận diện chưa đúng?
                </span>
                <span className="fix_button">
                  <img src="images/avatar_ai/fix_icon.svg" alt="" />
                  Sửa
                </span>
              </div>
              <div className="avatar-show">
                <div className="left-avatar avatar">
                  <div className="handle-avatar">
                    <div className="select-image-click"> </div>
                    <div className="download_avatar">
                      <img
                        src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/download_icon.svg"
                        alt=""
                      />
                    </div>
                    <div className="share_avatar">
                      <img
                        src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/share_icon.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <h2>Ảnh thường</h2>
                </div>
                <div className="right-avatar avatar">
                  <div className="handle-avatar">
                    <div className="select-image-click"> </div>
                    <div className="download_avatar">
                      <img
                        src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/download_icon.svg"
                        alt=""
                      />
                    </div>
                    <div className="share_avatar">
                      <img
                        src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/share_icon.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <h2>Ảnh đã làm đẹp</h2>
                </div>
              </div>
            </div>
            <div className="profile_text">Trang phục muốn thêm</div>
            <div className="clothes_option">
              <span
                className="clothes_text"
              // c=""
              >
                Vest
              </span>
              <span className="choose_clothes">
                <img src="images/avatar_ai/down_icon.svg" alt="" />
              </span>
              <div className="dropdown-content">
                <p data-render="vest" className="active">
                  Áo Vest
                </p>
                <p data-render="shirt">Áo Sơ mi</p>
              </div>
            </div>
            <div className="profile_text">Mô tả trang phục</div>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="VD: Vest mau xanh"
              defaultValue={""}
            />
            <div className="avatar_change">
              <img
                src="https://devnext.timviec365.vn/static-tv/images/avatar_ai/change_image.svg"
                alt="Change avatar"
              />
              Thử lại
            </div>
            <hr />
            <div className="bottom-container">
              <span className="left-span" data-class="profile-describe">
                <h5>Quay lại</h5>
              </span>
              <span className="right-span upload_final" data-class="">
                Sử dụng
              </span>
            </div>
          </div>
        </div> */}

      {/* END MODAL CREATE AVA WITH AI */}

      <input
        type="hidden"
        className="isNewImage"
        value="yes"
        onChange={() => { }}
      />

      <div
        id="boxRes"
        className="lightbox"
        data-select2-id="boxRes"
        style={{ display: "none" }}
      >
        <div className="box-a">
          <span
            className="exit"
            title="Thoát"
            onClick={() => {
              const el: any = document.getElementById("boxRes");
              if (el) el.style.display = "none";
            }}
          >
            ×
          </span>
          <div className="r6">
            <div className="ir">
              <p className="tb">
                Bạn cần có tài khoản để lưu thông tin CV, ĐĂNG KÝ NGAY!
              </p>
              <form id="form_res" noValidate={true} method="post">
                <input
                  type="hidden"
                  name="link"
                  defaultValue="https://timviec365.vn/cv365/tao-cv-hoa-hoc-sinh-hoc/mau-06"
                  onChange={() => { }}
                />
                <input
                  type="hidden"
                  name="birthday"
                  id="birthday"
                  defaultValue="24/11/1996"
                  onChange={() => { }}
                />
                <div className="row">
                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Tài khoản đăng nhập
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      defaultValue=""
                      placeholder="Vui lòng nhập số điện thoại"
                      name="phoneTK"
                      onChange={() => { }}
                    />
                  </div>
                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Họ và tên <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue=""
                      placeholder="Họ và tên"
                      name="userName"
                      onChange={() => { }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Mật khẩu <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      defaultValue=""
                      placeholder="Vui lòng nhập mật khẩu *"
                      name="password"
                      onChange={() => { }}
                    />
                  </div>
                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Xác nhận lại mật khẩu{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      defaultValue=""
                      placeholder="Xác nhận lại mật khẩu *"
                      name="repass"
                      onChange={() => { }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Ngành nghề mong muốn
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="el-select2">
                      <select
                        multiple
                        name="candiCateID"
                        id="cate-dk"
                        style={{ width: "100%" }}
                        data-select2-id="cate-dk"
                        tabIndex={-1}
                        className="select2-hidden-accessible"
                        // className="js-example-basic-single"
                        aria-hidden="true"
                      >
                        <option value={95} data-select2-id={4}>
                          An toàn lao động
                        </option>
                        <option value={22} data-select2-id={5}>
                          Biên - Phiên dịch
                        </option>
                        <option value={35} data-select2-id={6}>
                          Báo chí - Truyền hình
                        </option>
                        <option value={48} data-select2-id={7}>
                          Bưu chính viễn thông
                        </option>
                        <option value={66} data-select2-id={8}>
                          Bảo hiểm
                        </option>
                        <option value={107} data-select2-id={9}>
                          Bảo trì
                        </option>
                        <option value={30} data-select2-id={10}>
                          Bảo vệ
                        </option>
                        <option value={45} data-select2-id={11}>
                          Chăm sóc khách hàng
                        </option>
                        <option value={93} data-select2-id={12}>
                          Chăn nuôi - Thú y
                        </option>
                        <option value={123} data-select2-id={13}>
                          Copywriter
                        </option>
                        <option value={68} data-select2-id={14}>
                          Công chức - Viên chức{" "}
                        </option>
                        <option value={127} data-select2-id={15}>
                          Công nghệ cao
                        </option>
                        <option value={91} data-select2-id={16}>
                          Công nghệ thực phẩm
                        </option>
                        <option value={11} data-select2-id={17}>
                          Cơ khí - Chế tạo
                        </option>
                        <option value={34} data-select2-id={18}>
                          Du lịch
                        </option>
                        <option value={49} data-select2-id={19}>
                          Dầu khí - Địa chất
                        </option>
                        <option value={23} data-select2-id={20}>
                          Dệt may - Da giày
                        </option>
                        <option value={21} data-select2-id={21}>
                          Dịch vụ
                        </option>
                        <option value={67} data-select2-id={22}>
                          Freelancer
                        </option>
                        <option value={50} data-select2-id={23}>
                          Giao thông vận tải - Thủy lợi - Cầu đường
                        </option>
                        <option value={17} data-select2-id={24}>
                          Giáo dục - Đào tạo
                        </option>
                        <option value={81} data-select2-id={25}>
                          Giúp việc
                        </option>
                        <option value={73} data-select2-id={26}>
                          Hoạch định - Dự án
                        </option>
                        <option value={109} data-select2-id={27}>
                          Hàng hải
                        </option>
                        <option value={97} data-select2-id={28}>
                          Hàng không
                        </option>
                        <option value={2} data-select2-id={29}>
                          Hành chính - Văn phòng
                        </option>
                        <option value={65} data-select2-id={30}>
                          Hóa học - Sinh học
                        </option>
                        <option value={26} data-select2-id={31}>
                          IT Phần cứng - mạng
                        </option>
                        <option value={13} data-select2-id={32}>
                          IT phần mềm
                        </option>
                        <option value={40} data-select2-id={33}>
                          In ấn - Xuất bản
                        </option>
                        <option value={33} data-select2-id={34}>
                          KD bất động sản
                        </option>
                        <option value={51} data-select2-id={35}>
                          Khu chế xuất - Khu công nghiệp
                        </option>
                        <option value={8} data-select2-id={36}>
                          Khách sạn - Nhà hàng
                        </option>
                        <option value={24} data-select2-id={37}>
                          Kiến trúc - Tk nội thất
                        </option>
                        <option value={1} data-select2-id={38}>
                          Kế toán - Kiểm toán
                        </option>
                        <option value={18} data-select2-id={39}>
                          Kỹ thuật
                        </option>
                        <option value={47} data-select2-id={40}>
                          Kỹ thuật ứng dụng
                        </option>
                        <option value={12} data-select2-id={41}>
                          Lao động phổ thông
                        </option>
                        <option value={129} data-select2-id={42}>
                          Logistic
                        </option>
                        <option value={53} data-select2-id={43}>
                          Luật - Pháp lý
                        </option>
                        <option value={6} data-select2-id={44}>
                          Làm bán thời gian
                        </option>
                        <option value={52} data-select2-id={45}>
                          Làm đẹp - Thể lực - Spa
                        </option>
                        <option value={75} data-select2-id={46}>
                          Lương cao
                        </option>
                        <option value={135} data-select2-id={47}>
                          Lễ tân - PG - PB
                        </option>
                        <option value={14} data-select2-id={48}>
                          Marketing - PR
                        </option>
                        <option value={54} data-select2-id={49}>
                          Môi trường - Xử lý chất thải
                        </option>
                        <option value={55} data-select2-id={50}>
                          Mỹ phẩm - Thời trang - Trang sức
                        </option>
                        <option value={57} data-select2-id={51}>
                          Nghệ thuật - Điện ảnh
                        </option>
                        <option value={37} data-select2-id={52}>
                          Ngành nghề khác
                        </option>
                        <option value={56} data-select2-id={53}>
                          Ngân hàng - Chứng khoán - Đầu tư
                        </option>
                        <option value={27} data-select2-id={54}>
                          Nhân sự
                        </option>
                        <option value={9} data-select2-id={55}>
                          Nhân viên kinh doanh
                        </option>
                        <option value={43} data-select2-id={56}>
                          Nhập liệu
                        </option>
                        <option value={41} data-select2-id={57}>
                          Nông - Lâm - Ngư - Nghiệp
                        </option>
                        <option value={137} data-select2-id={58}>
                          Pha chế - Bar
                        </option>
                        <option value={58} data-select2-id={59}>
                          Phát triển thị trường
                        </option>
                        <option value={59} data-select2-id={60}>
                          Phục vụ - Tạp vụ
                        </option>
                        <option value={60} data-select2-id={61}>
                          Quan hệ đối ngoại
                        </option>
                        <option value={61} data-select2-id={62}>
                          Quản lý điều hành
                        </option>
                        <option value={139} data-select2-id={63}>
                          Quản lý đơn hàng
                        </option>
                        <option value={20} data-select2-id={64}>
                          Quản trị kinh doanh
                        </option>
                        <option value={3} data-select2-id={65}>
                          Sinh viên làm thêm
                        </option>
                        <option value={46} data-select2-id={66}>
                          Sinh viên mới tốt nghiệp - Thực tập
                        </option>
                        <option value={115} data-select2-id={67}>
                          Startup
                        </option>
                        <option value={62} data-select2-id={68}>
                          Sản xuất - Vận hành sản xuất
                        </option>
                        <option value={145} data-select2-id={69}>
                          Telesales
                        </option>
                        <option value={28} data-select2-id={70}>
                          Thiết kế - Mỹ thuật
                        </option>
                        <option value={39} data-select2-id={71}>
                          Thiết kế web
                        </option>
                        <option value={141} data-select2-id={72}>
                          Thu ngân
                        </option>
                        <option value={32} data-select2-id={73}>
                          Thư ký - Trợ lý
                        </option>
                        <option value={119} data-select2-id={74}>
                          Thư viện
                        </option>
                        <option value={42} data-select2-id={75}>
                          Thương mại điện tử
                        </option>
                        <option value={63} data-select2-id={76}>
                          Thẩm định - Giám thẩm định - Quản lý chất lượng
                        </option>
                        <option value={64} data-select2-id={77}>
                          Thể dục - Thể thao
                        </option>
                        <option value={121} data-select2-id={78}>
                          Thống kê
                        </option>
                        <option value={89} data-select2-id={79}>
                          Thủy sản
                        </option>
                        <option value={36} data-select2-id={80}>
                          Thực phẩm - Đồ uống
                        </option>
                        <option value={77} data-select2-id={81}>
                          Tiếp thị - Quảng cáo
                        </option>
                        <option value={113} data-select2-id={82}>
                          Truyền thông
                        </option>
                        <option value={103} data-select2-id={83}>
                          Trắc địa
                        </option>
                        <option value={131} data-select2-id={84}>
                          Tài chính
                        </option>
                        <option value={87} data-select2-id={85}>
                          Tìm việc làm thêm
                        </option>
                        <option value={29} data-select2-id={86}>
                          Tư vấn
                        </option>
                        <option value={101} data-select2-id={87}>
                          Tổ chức sự kiện
                        </option>
                        <option value={79} data-select2-id={88}>
                          Việc làm Tết
                        </option>
                        <option value={10} data-select2-id={89}>
                          Việc làm bán hàng
                        </option>
                        <option value={44} data-select2-id={90}>
                          Việc làm thêm tại nhà
                        </option>
                        <option value={83} data-select2-id={91}>
                          Việc làm thời vụ
                        </option>
                        <option value={133} data-select2-id={92}>
                          Vận chuyển giao nhận
                        </option>
                        <option value={7} data-select2-id={93}>
                          Vận tải - Lái xe
                        </option>
                        <option value={38} data-select2-id={94}>
                          Vật tư - Thiết bị
                        </option>
                        <option value={25} data-select2-id={95}>
                          Xuất - nhập khẩu
                        </option>
                        <option value={125} data-select2-id={96}>
                          Xuất khẩu lao động
                        </option>
                        <option value={4} data-select2-id={97}>
                          Xây dựng
                        </option>
                        <option value={19} data-select2-id={98}>
                          Y tế - Dược
                        </option>
                        <option value={31} data-select2-id={99}>
                          Ô tô - xe máy
                        </option>
                        <option value={5} data-select2-id={100}>
                          Điện - Điện tử
                        </option>
                        <option value={71} data-select2-id={101}>
                          Điện tử viễn thông
                        </option>
                        <option value={111} data-select2-id={102}>
                          Đầu bếp - phụ bếp
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Tên công việc <span style={{ color: "red" }}>*</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        defaultValue=""
                        placeholder="Tên công việc *"
                        id="cv_title"
                        name="candiTitle"
                        onChange={() => { }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="iw5">
                    <label style={{ color: "#000" }}>
                      Nơi làm việc mong muốn
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="el-select2">
                      <select
                        multiple
                        name="candiCityID[]"
                        id="city-selector"
                        style={{ width: "100%" }}
                        data-select2-id="city-selector"
                        tabIndex={-1}
                        className="select2-hidden-accessible"
                        aria-hidden="true"
                      >
                        {optionCity.map((city, index) => {
                          return <option key={index} value={city.value}>{city.label}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="iw5">
                    <label style={{ color: "#000" }} >
                      Quận, huyện mong muốn
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="el-select2">
                      <select
                        multiple
                        name="qh_id"
                        id="district-selector"
                        style={{ width: "100%" }}
                        data-select2-id="district-selector"
                        tabIndex={-1}
                        className="select2-hidden-accessible"
                        aria-hidden="true"
                      >
                        {city_array.filter((e: any) => e.cit_parent !== 0).map((item: any, index) => {
                          return <option key={index} value={item.cit_id} data-province={`${item.cit_parent}`}>{item.cit_name}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div className="form_uv form_ask_permission">
                    <label className="form_title title_ask_permission">
                      Phân quyền tài khoản <span className="red_star">*</span>
                    </label>
                    <div className="select_ask_permission">
                      <button type="button" className="btn btn_y not_confirm">
                        Có
                      </button>
                      <button type="button" className="btn btn_n not_confirm">
                        Không
                      </button>
                      <a className="btn btn_guide not_confirm btn_huongdan">Hướng dẫn</a>
                      <button type="button" className="btn btn_view confirm" style={{ display: 'none' }}>
                        Xem
                      </button>
                    </div>
                  </div> */}
                <input
                  type="submit"
                  id="dk-btn"
                  className="btn bg-blue"
                  value="Đăng ký"
                  name="dk-btnnn"
                  onChange={() => { }}
                />
              </form>
            </div>
          </div>
          <div className="r4">
            <div className="ir">
              <div className="bdn">
                <p style={{ marginRight: "10px" }}>Bạn đã có tài khoản?</p>
                <button
                  id="login_button"
                // onclick="login()"
                >
                  Đăng nhập ngay
                </button>
              </div>
            </div>
          </div>
          <div className="clr" />
        </div>
      </div>

      <div id="loadjs"></div>

      <Footer />

      {/* <Modal open={isOpen}
          width={790}
          onCancel={closeModal}
          title="Xem trước"
          footer={null}>
          <img src={previewCV} alt="Xem trước" />
        </Modal> */}

      {/* <Spin fullscreen={true} spinning={loadingXemTruoc} /> */}

    </>
  );
}
