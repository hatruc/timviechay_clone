function deletePop() {
  $("#imageEditorWraper_AI").hide();
  $("#imageEditorWraper_AI .container").hide();
  $("#imageEditorWraper_AI .avatar-container").show();
  $(
    ".choose_image .bottom-container .right-span, .choose_image_style .bottom-container .right-span"
  ).attr("data-class", "");
  $(".choose_image .image-container").show();
  $(".avatar_handle").css({
    background: ``,
  });
  $("input:checked").parent().css({
    border: "none",
  });
  $("input:checked").attr("checked", false);
  $("#inp_avatar_ai365").val("");
  file_avatar = "";
  file_style = "";
}

function newCrop() {
  $("#imageEditorWraper .container h3:first-child").html(
    "Chỉnh sửa ảnh phong cách"
  );
  $("#imageEditorWraper .editor-col-right h4").html("Phong cách CV");
  $(".tipCompress").html("Lưu ý ảnh phong cách cần đủ sáng và nhìn thẳng");
}

function oldCrop() {
  $("#imageEditorWraper .container h3:first-child").html(
    "Chỉnh sửa ảnh đại diện"
  );
  $("#imageEditorWraper .editor-col-right h4").html("Ảnh hiển thị trên CV");
  $(".tipCompress").html(
    "Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng ảnh trước khi tải lên."
  );
}
$(function () {
  // var console = window.console || { log: function () {} }
  var URL = window.URL || window.webkitURL;
  var $image = $("#image");
  var $download = $(".btn-save-image");
  var $dataX = $("#dataX");
  var $dataY = $("#dataY");
  var $dataHeight = $("#dataHeight");
  var $dataWidth = $("#dataWidth");
  var $dataRotate = $("#dataRotate");
  var $dataScaleX = $("#dataScaleX");
  var $dataScaleY = $("#dataScaleY");
  var dataTile = $("#dataTile").val();
  var baseW = $dataWidth.val();
  var baseH = $dataHeight.val();
  var options = {
    aspectRatio: 1 / dataTile,
    preview: ".img-edit-preview",
    dragMode: "move",
    crop: function (e) {
      $dataX.val(Math.round(e.detail.x));
      $dataY.val(Math.round(e.detail.y));
      $dataHeight.val(Math.round(e.detail.height));
      $dataWidth.val(Math.round(e.detail.width));
      $dataRotate.val(e.detail.rotate);
      $dataScaleX.val(e.detail.scaleX);
      $dataScaleY.val(e.detail.scaleY);
    },
  };
  var originalImageURL = $image.attr("src");
  var uploadedImageName = "avatar.jpg";
  var uploadedImageType = "image/jpeg";
  var uploadedImageURL;

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Cropper
  $image
    .on({
      ready: function (e) {
        console.log(e.type);
      },
      cropstart: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropmove: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropend: function (e) {
        console.log(e.type, e.detail.action);
      },
      crop: function (e) {
        console.log(e.type);
      },
      zoom: function (e) {
        console.log(e.type, e.detail.ratio);
      },
    })
    .cropper(options);

  // Buttons
  if (!$.isFunction(document.createElement("canvas").getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
    $("button.btn-save-image").prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Download
  if (typeof $download[0].download === "undefined") {
    $download.addClass("disabled");
  }

  // Options
  $(".docs-toggles").on("change", "input", function () {
    var $this = $(this);
    var name = $this.attr("name");
    var type = $this.prop("type");
    var cropBoxData;
    var canvasData;

    if (!$image.data("cropper")) {
      return;
    }

    if (type === "checkbox") {
      options[name] = $this.prop("checked");
      cropBoxData = $image.cropper("getCropBoxData");
      canvasData = $image.cropper("getCanvasData");

      options.ready = function () {
        $image.cropper("setCropBoxData", cropBoxData);
        $image.cropper("setCanvasData", canvasData);
      };
    } else if (type === "radio") {
      options[name] = $this.val();
    }

    $image.cropper("destroy").cropper(options);
  });

  // Methods
  $(".docs-buttons").on("click", "[data-method]", function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data("cropper");
    var cropped;
    var $target;
    var result;

    if ($this.prop("disabled") || $this.hasClass("disabled")) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== "undefined") {
        $target = $(data.target);

        if (typeof data.option === "undefined") {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case "rotate":
          if (cropped && options.viewMode > 0) {
            $image.cropper("clear");
          }

          break;

        case "getCroppedCanvas":
          if (uploadedImageType === "image/jpeg") {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = "#fff";
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case "rotate":
          if (cropped && options.viewMode > 0) {
            $image.cropper("crop");
          }

          break;

        case "scaleX":
        case "scaleY":
          $(this).data("option", -data.option);
          break;

        case "getCroppedCanvas":
          if (result) {
            // Bootstrap's Modal
            $("#getCroppedCanvasModal")
              .modal()
              .find(".modal-body")
              .html(result);

            if (!$download.hasClass("disabled")) {
              download.download = uploadedImageName;
              $download.attr("href", result.toDataURL(uploadedImageType));
            }
          }

          break;

        case "destroy":
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = "";
            $image.attr("src", originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });

  // Keyboard
  /*$(document.body).on('keydown', function (e) {

    if (!$image.data('cropper') || this.scrollTop > 300) {
    return;
    }

    switch (e.which) {
    case 37:
      e.preventDefault();
      $image.cropper('move', -1, 0);
      break;

    case 38:
      e.preventDefault();
      $image.cropper('move', 0, -1);
      break;

    case 39:
      e.preventDefault();
      $image.cropper('move', 1, 0);
      break;

    case 40:
      e.preventDefault();
      $image.cropper('move', 0, 1);
      break;
    }

  });
  */
  // Import image
  var $inputImage = $("#inputImage");

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;
      if (!$image.data("cropper")) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image
            .cropper("destroy")
            .attr("src", uploadedImageURL)
            .cropper(options);
          $inputImage.val("");
          //Add them
          $(".imageEditor").show();
          $(".editorChooseImage").hide();
          $(".image-controls").show();
          $(".edit-image-btns").show();
          $(".edit-image-btns").css({
            display: "flex",
          });
          let bool = $(".isNewImage").val();
          if (bool == "no") {
            $(".tipCompress").hide();
            $(".tipCompress").css({
              "padding-bottom": "5px",
              "text-algin": "",
            });
          } else {
            $(".tipCompress").show();
            $(".tipCompress").css({
              "padding-bottom": "10px",
              "text-algin": "center",
            });
          }
          $download.removeClass("disabled");
          /////////////
        } else {
          window.alert("Hãy chọn file dạng ảnh!");
          $download.addClass("disabled");
        }
      }
    });
  } else {
    $inputImage.prop("disabled", true).parent().addClass("disabled");
    $download.addClass("disabled");
  }

  // change image
  var $inputImage = $("#inputImage1");

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;
      if (!$image.data("cropper")) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image
            .cropper("destroy")
            .attr("src", uploadedImageURL)
            .cropper(options);
          $inputImage.val("");
          //Add them
          $(".imageEditor").show();
          $(".editorChooseImage").hide();
          $(".image-controls").show();
          $(".edit-image-btns").show();
          $(".tipCompress").hide();
          $download.removeClass("disabled");
          /////////////
        } else {
          window.alert("Hãy chọn file dạng ảnh!");
          $download.addClass("disabled");
        }
      }
    });
  } else {
    $inputImage.prop("disabled", true).parent().addClass("disabled");
    $download.addClass("disabled");
  }

  $(".img-edit-preview").click(function () {
    $("#inputImage").trigger("click");
  });

  $(".btn-remove-image").click(function () {
    $image.cropper("destroy").cropper(options);
    $(".imageEditor").hide();
    $(".editorChooseImage").show();
  });
  $(".btn-rotate-right").click(function () {
    $image.cropper("rotate", 90);
  });
  $(".btn-rotate-left").click(function () {
    $image.cropper("rotate", -90);
  });
  $(".btn-zoom-in-image").click(function () {
    $image.cropper("zoom", 0.2);
  });
  $(".btn-zoom-out-image").click(function () {
    $image.cropper("zoom", -0.2);
  });
  $(".btn-save-image").click(function () {
    if ($(this).hasClass("disabled")) {
    } else {
      var dataX = $dataX.val();
      var dataY = $dataY.val();
      var dataHeight = $dataHeight.val();
      var dataWidth = $dataWidth.val();
      var dataRotate = $dataRotate.val();
      var dataScaleX = $dataScaleX.val();
      var dataScaleY = $dataScaleY.val();
      var cropper = $image.data("cropper");
      var result = $image.cropper("getCroppedCanvas", {
        width: baseW,
        height: baseH,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 4000,
        maxHeight: 4000,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      });

      var img = result.toDataURL(uploadedImageType);
      let bool = $(".isNewImage").val();
      if (!bool || bool == "no") {
        $.ajax("https://timviechay.vn/api/work247/user/uploadAvatarCV", {
          method: "POST",
          data: { image64: img },
          cache: false,
          success: function (img) {
            $("#cvo-profile-avatar").attr("src", img?.data?.img);
            console.log("Upload success");
          },
          error: function () {
            console.log("Upload error");
          },
        });

        $("#imageEditorWraper").hide();
      } else {
        base64 = img;
        detectAvatarUpload(base64);
      }
    }
  });

  // $(document).on('click', '#imageEditorWraper_AI .choose_image_style .update_examp', function (e) {
  // 	$image.cropper('destroy').cropper(options)
  // 	// $('#imageEditorWraper .img-edit-preview img').attr('src','images/no_avatar.jpg');
  // 	$('.imageEditor').hide()
  // 	$('.editorChooseImage').show()
  // 	$('#imageEditorWraper').show()

  // 	$('#imageEditorWraper_AI').hide()
  // })

  //Upload image
  function uploadImageCut(file) {
    $("#imageEditorWraper_AI").hide();
    $(".imageEditor").hide();
    $(".editorChooseImage").show();
    $("#imageEditorWraper").show();
    $(".edit-image-btns").css({
      display: "flex",
    });
    uploadedImageURL = URL.createObjectURL(file);
    $image.cropper("destroy").attr("src", uploadedImageURL).cropper(options);
    $(".imageEditor").show();
    $(".editorChooseImage").hide();
    $(".image-controls").show();
    $(".edit-image-btns").show();
    $download.removeClass("disabled");
  }
  $(document).on("change", "#inp_avatar_ai365", function (e) {
    let file = this.files[0];
    if (file) {
      uploadImageCut(file);
    }
  });
  //Drop image
  $(document).on("dragover", ".choose_image .avatar_handle", function (e) {
    e.preventDefault();
    $(this).addClass("active");
  });
  $(document).on("dragleave", ".choose_image .avatar_handle", function (e) {
    e.preventDefault();
    $(this).removeClass("active");
  });
  $(document).on("drop", ".choose_image .avatar_handle", function (e) {
    e.preventDefault();
    $(this).removeClass("active");
    result = e.originalEvent.dataTransfer.files[0];
    if (result.type.split("/")[0] != "image") {
      $(".choose_image .warning_text").html("Vui lòng chọn ảnh");
      setTimeout(() => {
        $(".choose_image .warning_text").html(
          "Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng ảnh trước khi tải lên."
        );
      }, 2000);
    } else {
      file_avatar = result;
      uploadImageCut(result);
    }
    // return false;
  });
  //Ajax clothes
  function dress(prompt_clothes, gender, clothes_type, image) {
    $.ajax({
      url: "/api/cv/dressUpAvatar",
      type: "POST",
      async: "false",
      data: {
        prompt_clothes: prompt_clothes,
        gender: gender,
        clothes_type: clothes_type,
        image: image,
      },
      beforeSend: function (response) {
        $(".profile_descripe").hide();
        $(".loading-container").show();
        $(".avatar-final-container .clothes_option .clothes_text").attr(
          "data-render",
          clothes_type
        );
        $(".avatar-final-container .clothes_option .dropdown-content p")
          .find(`[data-render='${clothes_type}']`)
          .addClass("active");
        $(".avatar-final-container textarea").val(prompt_clothes);
      },
      // dataType:"JSON",
      success: function (success) {
        const result = success?.data;
        // if (result?.data?.error) {
        // 	window.alert(result?.data?.error)
        // } else {
        let image_obj = result;
        $(".loading-container").hide();
        image_final_1 = `data:image/jpeg;base64,${image_obj?.b64_image_1}`;
        image_final_2 = `data:image/jpeg;base64,${image_obj?.b64_image_2}`;
        $(".avatar-final-container").show();
        $(
          ".avatar-final-container .avatar-show .left-avatar .handle-avatar"
        ).css({
          "background-image": `url(${image_final_1})`,
        });
        $(
          ".avatar-final-container .avatar-show .left-avatar .handle-avatar"
        ).attr("data-image", image_final_1);
        $(
          ".avatar-final-container .avatar-show .right-avatar .handle-avatar"
        ).css({
          "background-image": `url(${image_final_2})`,
        });
        $(
          ".avatar-final-container .avatar-show .right-avatar .handle-avatar"
        ).attr("data-image", image_final_2);
        // }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
        window.alert("Có lỗi xảy ra!");
        deletePop();
      },
    });
  }
  //Render avatar 1
  $(".profile_descripe .render_avatar").on("click", function (e) {
    gender = $(".profile_descripe .gender_option input:checked").attr(
      "data-gender"
    );
    clothes_type = $(".profile_descripe .clothes_option .clothes_text").attr(
      "data-render"
    );
    prompt_clothes = $(".profile_descripe textarea").val();
    dress(prompt_clothes, gender, clothes_type, image);
  });
  //Render avatar 2
  $(".avatar-final-container .avatar_change").on("click", function (e) {
    gender = $(".profile_descripe .gender_option input:checked").attr(
      "data-gender"
    );
    clothes_type = $(
      ".avatar-final-container .clothes_option .clothes_text"
    ).attr("data-render");
    prompt_clothes = $(".avatar-final-container textarea").val();
    $(".avatar-final-container").hide();
    dress(prompt_clothes, gender, clothes_type, image);
  });
});

$(document).on("click", "#cvo-profile-avatar, .fake_img", function () {
  // $image.cropper('destroy').cropper(options);
  // $('#imageEditorWraper').show()
  // if ($(this).parents("#form-cv").length) {
  //   $("#imageEditorWraper_AI").show();
  //   // $('.avatar-containere').show()
  // } else {
  //   $("#imageEditorWraper").show();
  // }
  $(".isNewImage").val("no");
  $("#imageEditorWraper").show();
});

// $(document).on("click", ".avatar-container .show_new_avatar", function (e) {
//   newCrop();
//   $(".isNewImage").val("yes");
// });

$(document).on(
  "click",
  ".delete_wraper, .choose_image .bottom-container .left-span",
  function (e) {
    deletePop();
  }
);

$(document).on("click", function (e) {
  if (!$(e.target).closest(".avatar-container.container").length) {
    if ($(e.target).attr("id") !== "cvo-profile-avatar" && $(e.target).attr("id") !== "imageEditorWraper" && !$(e.target).closest(".container_crop_image").length) {
      // Thêm mã xử lý tại đây
      deletePop();
    }
  }
});

$(document).on("click", function (e) {
  if (!$(e.target).closest(".container_crop_image").length) {
    if ($(e.target).attr("id") !== "cvo-profile-avatar" && !$(e.target).closest(".avatar-container.container").length) {
      $("#imageEditorWraper").hide();
    }
  }
});

$(document).on("click", ".avatar-container .show_old_avatar", function (e) {
  oldCrop();
  $(".isNewImage").val("no");
  $("#imageEditorWraper_AI").hide();
  $("#imageEditorWraper").show();
  $(".edit-image-btns").css({
    display: "flex",
  });
});
// $(document).on("click", ".avatar-container .show_new_avatar", function (e) {
//   // $('#imageEditorWraper .img-edit-preview img').hide();
//   newCrop();
//   $(".isNewImage").val("yes");
// });
// $(".btn-close-image-editor").on("click", function () {
//   let bool = $(".isNewImage").val();
//   if (bool == "no") {
//     $("#imageEditorWraper").hide();
//   } else {
//     $("#imageEditorWraper").hide();
//     $("#imageEditorWraper_AI").show();
//   }
// });
// Create avatar AI
// Olf dunction
// Detect Avatar
function detectAvatar(base64) {
  $.ajax({
    url: "http://43.239.223.19:4090/detect",
    type: "POST",
    data: { source_image: base64 },
    beforeSend: function (response) {
      $(".bg-spinner").remove();
      $("body").append(
        '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
      );
    },
    // dataType: 'JSON',
    success: function (result) {
      $(".bg-spinner").remove();
      if (result && result.face) {
        $(".choose_image .bottom-container .right-span").attr(
          "data-class",
          "profile_descripe"
        );
        $("#avatarAI365Wraper .box_select_info").show();
        $(".choose_image .image-container").hide();
        $(".choose_image .avatar_handle").css({
          background: `url(${base64})`,
          "background-size": "contain",
          "background-repeat": "no-repeat",
          "background-position": "center center",
        });
      } else {
        $(".choose_image .warning_text").html("Ảnh không hợp lệ");
        setTimeout(() => {
          $(".choose_image .warning_text").html(
            "Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng ảnh trước khi tải lên."
          );
        }, 2000);

        $(
          "#avatarAI365Wraper .box_select_image,#avatarAI365Wraper .box_des,#avatarAI365Wraper .box_select_info,#avatarAI365Wraper .box_select_style,#avatarAI365Wraper .box_render_success"
        ).hide();
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log("failed");
    },
  });
}
// Detect upload image
function detectAvatarUpload(base64) {
  $.ajax({
    url: "/api/cv/detectFace",
    type: "POST",
    data: JSON.stringify({ base64: base64 }),
    beforeSend: function (response) {
      $(".bg-spinner").remove();
      $("body").append(
        '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
      );
    },
    contentType: "application/json; charset=utf-8",
    success: function (success) {
      const result = success?.data;
      $(".bg-spinner").remove();
      if (result && result.face) {
        $("#imageEditorWraper").hide();
        $("#imageEditorWraper_AI").show();
        $(".choose_image_style").hide();
        $(".choose_image").show();
        $(".choose_image .image-container").hide();
        image = base64;
        $(".choose_image  .avatar_handle").css({
          "background-size": "contain",
          "background-color": "#787878",
          "background-image": `url(${base64})`,
          "background-repeat": "no-repeat",
          border: "0.5px solid #979797",
        });
        $(".choose_image .bottom-container .right-span").attr(
          "data-class",
          "profile_descripe "
        );
      } else {
        $(".tipCompress").html("Ảnh không hợp lệ");
        setTimeout(() => {
          $(".tipCompress").html(
            "Lưu ý ảnh phong cách cần đủ sáng và nhìn thẳng"
          );
        }, 2000);
      }
    },
    error: function (errr) {
      console.log(errr);
    },
  });
}

function downloadBase64(base64String, cv_name) {
  const downloadLink = document.createElement("a");

  downloadLink.href = base64String;

  downloadLink.download = `${cv_name}.png`;

  downloadLink.click();
}
var file_avatar = "";
var file_style = "";
var avatar_final = "";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
// $(document).on('change', '#inp_avatar_ai365', function (e) {
// 	let file = this.files[0]
// 	if (file) {
// 		file_avatar = file
// 		let base64_avatar = getBase64(file).then((base64) => {
// 			detectAvatar(base64)
// 		})
// 	}
// })

//Upload image

$(document).on("click", ".upload_final", function (e) {
  let base64 = avatar_final;
  $.ajax("https://timviechay.vn/api/work247/user/uploadAvatarCV", {
    method: "POST",
    data: { image64: base64 },
    cache: false,
    beforeSend: function (response) {
      $(".bg-spinner").remove();
      $("body").append(
        '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
      );
    },
    success: function (img) {
      $(".bg-spinner").remove();
      $("#cvo-profile-avatar").attr("src", img);
      deletePop();
    },
    error: function () {
      console.log("Upload error");
    },
  });
});

$(document).on("dragover", ".choose_image .avatar_handle", function (e) {
  e.preventDefault();
  $(this).addClass("active");
});
$(document).on("dragleave", ".choose_image .avatar_handle", function (e) {
  e.preventDefault();
  $(this).removeClass("active");
});
$(document).on("drop", ".choose_image .avatar_handle", function (e) {
  e.preventDefault();
  $(this).removeClass("active");
  result = e.originalEvent.dataTransfer.files[0];
  if (result.type.split("/")[0] != "image") {
    $(".choose_image .warning_text").html("Vui lòng chọn ảnh");
    setTimeout(() => {
      $(".choose_image .warning_text").html(
        "Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng ảnh trước khi tải lên."
      );
    }, 2000);
  } else {
    file_avatar = result;
    let base64_avatar = getBase64(result).then((base64) => {
      detectAvatar(base64);
    });
  }
  // return false;
});
$(document).on(
  "click",
  ".choose_image .avatar_handle, .choose_image .avatar_change",
  function (e) {
    $("#inp_avatar_ai365").click();
  }
);
//Show list source image
$(document).on(
  "click",
  ".profile_descripe .bottom-container .right-span",
  function (e) {
    let gender = $('input[name="radio1"]:checked').attr("data-gender");
    if (gender != undefined) {
      $(this).parents(":eq(1)").hide();
      $("#imageEditorWraper_AI .choose_image_style").show();
    }
    html = "";
    for (let i = 1; i <= 6; i++) {
      html += `
        <div class="image-ai-wraper" data-image="/images/avatar_cv/${gender}/image_${i}.jpg?v=1" style = "background: url(https://devnext.timviec365.vn/static-tv/images/avatar_cv/${gender}/image_${i}.jpg?v=1) no-repeat; background-size: cover;">
        <div class="select-image-click"> </div>
        </div>
        `;
    }
    $(
      ".choose_image_style .image-ai-container .image-ai-wraper-container"
    ).html(html);
  }
);
//Call api fakeface
$(document).on(
  "click",
  ".choose_image_2  .bottom-container .right-span",
  function (e) {
    imageSource = file_style;
    if (imageSource.split("/")[1] != "images") {
      isBase64 = "true";
    } else {
      isBase64 = "false";
    }
    let base64_avatar = getBase64(file_avatar).then((base64) => {
      $.ajax({
        url: "site/swapAvatar",
        type: "POST",
        data: { base64, imageSource, isBase64 },
        beforeSend: function (response) {
          $(".bg-spinner").remove();
          $("body").append(
            '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
          );
        },
        dataType: "JSON",
        success: function (result) {
          $(".choose_image_2").hide();
          $(".ai_image_created").show();

          $(".bg-spinner").remove();
          if (result && result.result_image) {
            let base64 = `data:image/jpeg;base64,${result.result_image}`;
            $(".ai_image_created .avatar_handle").css({
              background: `url(${base64})`,
              "background-size": "cover",
            });
            avatar_final = base64;
          } else {
            $("#avatarAI365Wraper .box_image_error").show();
            $(
              "#avatarAI365Wraper .box_select_image,#avatarAI365Wraper .box_des,#avatarAI365Wraper .box_select_info,#avatarAI365Wraper .box_select_style,#avatarAI365Wraper .box_render_success"
            ).hide();
          }
        },
      });
    });
  }
);
//Upload final
$(document).on(
  "click",
  ".image_final_select, .ai_image_created .bottom-conatainer .right-span",
  function (e) {
    let base64 = avatar_final;
    $.ajax(`https://timviechay.vn/api/work247/user/uploadAvatar`, {
      method: "POST",
      data: { image64: base64 },
      cache: false,
      beforeSend: function (response) {
        $(".bg-spinner").remove();
        $("body").append(
          '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
        );
      },
      success: function (img) {
        $(".bg-spinner").remove();
        $("#cvo-profile-avatar").attr("src", img);
        file_avatar = "";
        deletePop();
      },
      error: function () {
        console.log("Upload error");
      },
    });
  }
);
$(document).on("click", ".download_avatar", function (e) {
  let base64 = avatar_final;
  downloadBase64(base64, "cv365_avatar");
});
// Select gender, age
$(".age_option > div, .gender_option > span").click(function (e) {
  $(this).parent().find("span input, div input").attr("checked", false);
  $(this).parent().find("span, div").css({
    border: "none",
  });
  $(this).find("input").attr("checked", true);
  $(this).css({
    border: "1.5px solid #4C5BD4",
  });
});
// Select drop-down menu
$(document).on("click", ".choose_type, .choose_tone", function () {
  $(this).find(".dropdown-content").toggle();
});
$(document).on(
  "click",
  ".choose_type .dropdown-content p, .choose_tone .dropdown-content p ",
  function () {
    text = $(this).html();
    $(this).parents(":eq(1)").find("div:first-child").html(text);
    $(this).parent().find("p").removeClass("active");
    $(this).addClass("active");
    $(this).parent().hide();
    return false;
  }
);
//
$(document).on("click", ".image-ai-wraper", function (e) {
  $(".image-ai-container .image-ai-wraper .select-image-click").removeClass(
    "active"
  );
  $(this).find(".select-image-click").addClass("active");
  image_source = $(this).attr("data-image");
  file_style = image_source;
  $(".choose_image_2  .avatar_handle").css({
    background: `url(${image_source})`,
    "background-size": "cover",
  });
  $(".choose_image_style .bottom-container .right-span").attr(
    "data-class",
    "choose_image_2"
  );
});
$(document).on("click", ".choose_image_2 .avatar_change", function (e) {
  $(".choose_image_style").show();
  $(this).parent().hide();
});
// Click show next div
$(document).on("click", ".bottom-container span", function (e) {
  if ($(this).attr("data-class") != "") {
    $(this).parents(":eq(1)").hide();
    data_class = $(this).attr("data-class");
    $(`.${data_class}.container`).show();
  }
});
//Create AI avatar again
$(document).on(
  "click",
  ".ai_image_created .image_option_wraper .image_change",
  function (e) {
    $(".ai_image_created ").hide();
    $(".choose_image").show();
    $(
      ".choose_image .bottom-container .right-span, .choose_image_style .bottom-container .right-span"
    ).attr("data-class", "");
    $(".choose_image .image-container").show();
    $(".avatar_handle").css({
      background: ``,
    });
    $("input:checked").parent().css({
      border: "none",
    });
    $("input:checked").attr("checked", false);
    $("#inp_avatar_ai365").val("");
    file_avatar = "";
    file_style = "";
  }
);

// new
$(".gender_option > span").click(function (e) {
  $(this).parent().find("span input").attr("checked", false);
  $(this).parent().find("span, div").css({
    border: "none",
  });
  $(this).find("input").attr("checked", true);
  $(this).css({
    border: "1.5px solid #4C5BD4",
  });
});
// Select drop-down menu
$(document).on("click", ".clothes_option", function () {
  $(this).parent().find(".dropdown-content").toggle();
});
$(document).on("click", ".clothes_option .dropdown-content p", function () {
  text = $(this).html();
  data_render = $(this).attr("data-render");
  $(".clothes_option .clothes_text").html(text);
  $(".clothes_option .clothes_text").attr("data-render", data_render);
  $(this).parent().find("p").removeClass("active");
  $(this).addClass("active");
  $(this).parent().hide();
  return false;
});
//
$(document).on("click", ".avatar-final-container .handle-avatar", function (e) {
  $(".avatar-final-container .handle-avatar .select-image-click").removeClass(
    "active"
  );
  $(this).find(".select-image-click").addClass("active");
  avatar_final = $(this).attr("data-image");
});
$(document).on("click", ".choose_image_2 .avatar_change", function (e) {
  $(".choose_image_style").show();
  $(this).parent().hide();
});
// Click show next div
$(document).on("click", ".bottom-container span", function (e) {
  if ($(this).attr("data-class") != "") {
    $(this).parents(":eq(1)").hide();
    data_class = $(this).attr("data-class");
    $(`#imageEditorWraper_AI .${data_class}`).show();
  }
});
// Delete Pop
$(document).on("click", "#imageEditorWraper_AI .delete_wraper", function (e) {
  deletePop();
});
// Back pop
$(document).on(
  "click",
  "#imageEditorWraper_AI .choose_image .bottom-container .left-span",
  function (e) {
    $("#imageEditorWraper_AI .container").hide();
    $("#imageEditorWraper_AI .avatar-container").show();
  }
);
