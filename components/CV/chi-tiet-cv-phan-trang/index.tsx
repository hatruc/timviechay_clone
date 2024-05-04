/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  base_timviec365,
} from "@/components/service/functions";
import { access_token } from "@/utils/convert";
import axios from "axios";
import { getCookie } from "cookies-next";
import $ from "jquery";
import jwtDecode from "jwt-decode";
import moment from "moment";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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
      holder_job: "Vị trí công việc bạn muốn ứng tuyển",
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

const parseable = (input: any) => {
  try {
    JSON.parse(input);

    return true;
  } catch (error) {
    return false;
  }
};

export async function loadRemoteComponent(url: string) {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
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

  // $('.bar-value-exp > input').keypress((e) => e.charCode >= 48 && e.charCode <= 57)

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

export const STATIC_URL = `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv`;

export default function DetailCV({
  in4CVSsr,
  id,
  idcv,
  in4user,
  dataCvMau,
  Cv,
  langcv,
  colorscv,
  isMobile,
  htmlData,
  imgCV,
  alias
}: any) {
  var data_box: any = [];
  var data_block: any = [];
  // const handleXemTruoc = () => {
  //   setIsOpenModal(true)
  // }

  const customCSS = (input: any, value: any) => {
    const el = document.querySelector(input)
    if (el) el.style.cssText = value
  }

  const handleSetData = (html: any, dataSample?: any) => {
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
    document.getElementById("cvo-profile-avatar")?.setAttribute('onerror', "this.src= '/images/cv/mau-cv/no_avatar.jpg';")

    document.getElementById("cvo-profile-avatar")?.setAttribute(
      "src", in4CVSsr?.nameimg
      // html?.avatar?.includes("no_avatar")
      //   ? // ? `https://timviec365.vn/static-tv/cv365/images/no_avatar.jpg`
      //   `/images/cv/mau-cv/no_avatar.jpg`
      //   : html?.avatar
    );
    // // profile

    sethtml('cv-profile-phone', box1?.phone)

    // sethtml('cv-profile-phone', '')
    sethtml('cv-profile-sex', box1?.sex)
    // sethtml('cv-profile-sex', '')
    sethtml('cv-profile-birthday', box1?.birthday)
    // sethtml('cv-profile-birthday', '')

    sethtml('cv-profile-email', box1?.email)

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
    // $('#cv-title').remove()
  }

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
  const [firstLoad, setFirstLoad] = useState(true);
  const [isntruc, setInstruc] = useState<any[]>([]);
  const [htmlStrings, setHtmlStrings] = useState();
  const [dataSaved, setDataSaved] = useState<any>();

  const removeContentEditable = () => {
    const elements = document.querySelectorAll('[contenteditable="true"]');
    elements.forEach((element) => {
      element.removeAttribute('contenteditable');
    });
  };

  // set data sample cv to local
  useLayoutEffect(() => {
    const savedLang = window.localStorage.getItem("langCV");
    window.localStorage.setItem('sampleCV', sampleCV?.[`html_${lang}`])
    // setTimeout(() => {
    //   setGlobalLoading(false);
    // }, 200);
    // axios
    //   .get(
    //     `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}`
    //     // `http://localhost:3070/cv365/upload/cv/co-khi`
    //   )
    //   .then((response) => {
    //     setHtmlStrings(response.data);
    //     // appendScriptJS()
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const load = async () => {
      let res

      res = await loadRemoteComponent(`${STATIC_URL}/cv365/upload/cv/${alias}/index.html`)

      setHtmlStrings(res)
    }

    load()

    const appendScript = (url: string, async: boolean) => {
      const script6 = document.createElement("script");
      script6.src = url;
      script6.async = async;
      document.head.appendChild(script6);
    };

    appendScript("/cv365/js/permissions_notify.js", false);
    appendScript("/cv365/js/cv_new_all1.js", false);
    appendScript("/cv365/js/1.js", false);
    appendScript("/cv365/js/cvh_new_all1.js", false);

    setTimeout(() => {
      setGlobalLoading(false);
    }, 200);

    const link = document.createElement("link");
    link.href = "/cv365/css/font-awesome.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    setLoading(true);
    if (firstLoad) {
      setTimeout(() => {
        removeContentEditable();
        const oldData = window.localStorage.getItem("cvData");
        if (oldData && parseable(oldData)) {
          console.log('>>> running in if');

          handleSetData(JSON.parse(oldData), dataCvMau?.[`html_${lang}`]);
        }
        else {
          console.log('>>> running in else');
          handleSetData(handleChangeLang(lang), dataCvMau?.[`html_${lang}`]);

          setGlobalLoading(false);
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
      handleSetData(handleChangeLang(lang), dataCvMau?.[`html_${lang}`]);
      setPlaceholderHTMl(
        lang,
        handleChangeLang(lang),
        dataCvMau?.[`html_${lang}`]
      );
      setLoading(false);
      setGlobalLoading(false);
    }

    return () => {
      document.head.removeChild(link);
    };
  }, [in4CVSsr, alias, lang, firstLoad]);

  // channge lang
  const handleChangeLang = (lang: string) => {
    if (in4CVSsr && in4CVSsr?.html) {
      // if (in4CVSsr?.item_ur) {
      //   return JSON?.parse(in4CVSsr?.item_ur?.html);
      // } else if (lang === "vi" && in4CVSsr?.html_vi !== undefined) {
      //   return JSON?.parse(in4CVSsr?.html_vi);
      // } else if (lang === "en" && in4CVSsr?.html_en !== undefined) {
      //   return JSON?.parse(in4CVSsr?.html_en);
      // } else if (lang === "cn" && in4CVSsr?.html_cn !== undefined) {
      //   return JSON?.parse(in4CVSsr?.html_cn);
      // } else if (lang === "kr" && in4CVSsr?.html_kr !== undefined) {
      //   return JSON?.parse(in4CVSsr?.html_kr);
      // } else if (lang === "jp" && in4CVSsr?.html_jp !== undefined) {
      //   return JSON?.parse(in4CVSsr?.html_jp);
      // } else if (!lang) {
      //   return null;
      // } else {
      //   return null; // Hoặc giá trị mặc định khác nếu cần
      // }
      return JSON.parse(in4CVSsr?.html)
    }
  };

  // const appendScriptJS = () => {
  //   const appendScript = (url: string, async: boolean) => {
  //     const script6 = document.createElement("script");
  //     script6.src = url;
  //     script6.async = async;
  //     document.head.appendChild(script6);
  //   };

  //   appendScript("/cv365/js/permissions_notify.js", false);
  //   appendScript("/cv365/js/cv_new_all1.js", false);
  //   appendScript("/cv365/js/1.js", false);
  //   appendScript("/cv365/js/cvh_new_all1.js", false);
  // }

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}`
  //       // `http://localhost:3070/cv365/upload/cv/co-khi`
  //     )
  //     .then((response) => {
  //       setHtmlStrings(response.data);
  //       // appendScriptJS()
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   //handle get uuid then set to local storage
  //   if (!window.localStorage.getItem("_DEVICEID_")) {
  //     const deviceid = uuidv4();
  //     window.localStorage.setItem("_DEVICEID_", deviceid);
  //   }

  //   const link = document.createElement("link");
  //   link.href = "/cv365/css/font-awesome.min.css";
  //   link.rel = "stylesheet";
  //   document.head.appendChild(link);
  //   return () => {
  //     document.head.removeChild(link);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (firstLoad) {
  //     setLoading(true);
  //     setTimeout(() => {
  //       const oldData = window.localStorage.getItem("cvData");
  //       if (oldData && parseable(oldData)) {
  //         console.log('>>> running in if');

  //         handleSetData(JSON.parse(oldData), dataCvMau?.[`html_${lang}`]);
  //       }
  //       else {
  //         console.log('>>> running in else');

  //         handleSetData(handleChangeLang(lang), dataCvMau?.[`html_${lang}`]);
  //       }
  //       setPlaceholderHTMl(
  //         lang,
  //         handleChangeLang(lang),
  //         dataCvMau?.[`html_${lang}`]
  //       );
  //     }, 1500);

  //     setFirstLoad(false);

  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //     handleSetData(handleChangeLang(lang), dataCvMau?.[`html_${lang}`]);
  //     setPlaceholderHTMl(
  //       lang,
  //       handleChangeLang(lang),
  //       dataCvMau?.[`html_${lang}`]
  //     );
  //     setLoading(false);
  //   }
  // }, [lang, firstLoad]);

  console.log('>>> check in4CVSsr.html: ', in4CVSsr);

  console.log('>>> check html cv: ', JSON.parse(in4CVSsr.html));

  return (
    <>
      <link rel="stylesheet" href={`/cv365/css/cvh.css`} type="text/css" />

      <link
        rel="stylesheet"
        // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/cv.css`}
        href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/cv.css`}
      // href={`http://localhost:3070/cv365/upload/cv/co-khi/css/cv.css`}
      />
      {/* <link
        rel="stylesheet"
        href={
          isMobile
            ? `${STATIC_URL}/cv365/upload/cv/cv_mobile/css/cv.css`
            : `${STATIC_URL}/cv365/upload/cv/dang-van-ban/cv-cho-sinh-vien-moi-ra-truong-12/css/cv.css`
        }
        type="text/css"
      /> */}
      <link
        id="cv-font"
        rel="stylesheet"
        href={`${isMobile
          ? `${STATIC_URL}/cv365/upload/cv/${dataCvMau?.alias}/css/fonts/${dataSaved?.css?.font || "Roboto"}.css`
          : `/cv365/css/font-family/${JSON.parse(in4CVSsr?.html)?.css?.font || "Roboto"}.css`
          }`
        }
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
      {/* <link
        rel="stylesheet"
        href="/cv365/css/taocv_v2.css?v=1700541007"
        type="text/css"
      ></link> */}
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
          : `/cv365/css/font-spacing/${JSON.parse(in4CVSsr?.html)?.css?.font_spacing || "normal"
          }.css`
          }`}
        type="text/css"
      />
      <link
        id="cv-font-size"
        rel="stylesheet"
        href={`${isMobile
          ? `${STATIC_URL}/cv365/upload/cv/cv_mobile/css/font-size/${dataSaved?.css?.font_size}.css`
          : `/cv365/css/fonts/${JSON.parse(in4CVSsr?.html)?.css?.font_size || "normal"}.css`
          }`}
        type="text/css"
      />
      {!isMobile && (
        <link
          id="cv-color-css"
          rel="stylesheet"
          // href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/dang-van-ban/cong-nghe-cao-10/css/colors/${JSON.parse(in4CVSsr?.html).css.color || dataCvMau?.colors?.split(",")?.[0]}.css`}
          href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/cv/cv365/upload/cv/${alias}/css/colors/${JSON.parse(in4CVSsr?.html).css.color || dataCvMau?.colors?.split(",")?.[0]}.css`}
          type="text/css"
        />
      )}
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
                <div className="box_content_taocv">
                  <div className="page_cv">
                    {/* <MauCV /> */}
                    {htmlStrings && (
                      <div
                        style={{ display: `${loading ? "none" : "block"}` }}
                        dangerouslySetInnerHTML={{ __html: htmlStrings }}
                      ></div>
                    )}
                    {!globalLoading && htmlStrings && !loading && <div id="loadingDone"></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="loadjs"></div>
    </>
  );
}
