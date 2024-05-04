var list = [
  "/cv365/tao-cv-it/mau-02",
  "/cv365/tao-cv-it/mau-16",
  "/cv365/tao-cv-it/mau-07",
  "/cv365/tao-cv-it/mau-06",
  "/cv365/tao-cv-mau-thiet-ke-sang-tao/onepage",
  "/cv365/tao-cv-tieng-trung/mau-19",
  "/cv365/tao-cv-infographic-resume/infographic-resume-2",
  "/cv365/tao-cv-ky-thuat-ung-dung/mau-11",
  "/cv365/tao-cv-tieng-han/mau-19",
  "/cv365/tao-cv-tieng-nhat/mau-20",
  "/cv365/tao-cv-tieng-trung/mau-12",
  "/cv365/tao-cv-tieng-anh/mau-05",
  "/cv365/tao-cv-tieng-han/mau-05",
  "/cv365/tao-cv-sinh-vien-moi-ra-truong/mau-12",
  "/cv365/tao-cv-kinh-doanh/mau-05",
];

var cookieToken = "work247_token";
var cookieRfToken = "rf_token";
var cookiePhone = "phone";
var cookieType = "work247_type";
var cookieStep1 = "isStep1Ok";
var cookieTempId = "tempId";
var cookieId = "id";
var cookieAuth = "auth";
var cookieForgetPass = "isForgetPass";
var cookieOTP = "isOTP";
var cookieLogin = "isLogin";
var cookieName = "userName";
var cookieLogo = "logo";
var cookieCandiAllowSearch = "candiAllowSearch";

var city_array = [
  {
    cit_id: 1,
    cit_name: "Hà Nội",
    cit_parent: 0,
  },
  {
    cit_id: 2,
    cit_name: "Hải Phòng",
    cit_parent: 0,
  },
  {
    cit_id: 3,
    cit_name: "Bắc Giang",
    cit_parent: 0,
  },
  {
    cit_id: 4,
    cit_name: "Bắc Kạn",
    cit_parent: 0,
  },
  {
    cit_id: 5,
    cit_name: "Bắc Ninh",
    cit_parent: 0,
  },
  {
    cit_id: 6,
    cit_name: "Cao Bằng",
    cit_parent: 0,
  },
  {
    cit_id: 7,
    cit_name: "Điện Biên",
    cit_parent: 0,
  },
  {
    cit_id: 8,
    cit_name: "Hòa Bình",
    cit_parent: 0,
  },
  {
    cit_id: 9,
    cit_name: "Hải Dương",
    cit_parent: 0,
  },
  {
    cit_id: 10,
    cit_name: "Hà Giang",
    cit_parent: 0,
  },
  {
    cit_id: 11,
    cit_name: "Hà Nam",
    cit_parent: 0,
  },
  {
    cit_id: 12,
    cit_name: "Hưng Yên",
    cit_parent: 0,
  },
  {
    cit_id: 13,
    cit_name: "Lào Cai",
    cit_parent: 0,
  },
  {
    cit_id: 14,
    cit_name: "Lai Châu",
    cit_parent: 0,
  },
  {
    cit_id: 15,
    cit_name: "Lạng Sơn",
    cit_parent: 0,
  },
  {
    cit_id: 16,
    cit_name: "Ninh Bình",
    cit_parent: 0,
  },
  {
    cit_id: 17,
    cit_name: "Nam Định",
    cit_parent: 0,
  },
  {
    cit_id: 18,
    cit_name: "Phú Thọ",
    cit_parent: 0,
  },
  {
    cit_id: 19,
    cit_name: "Quảng Ninh",
    cit_parent: 0,
  },
  {
    cit_id: 20,
    cit_name: "Sơn La",
    cit_parent: 0,
  },
  {
    cit_id: 21,
    cit_name: "Thái Bình",
    cit_parent: 0,
  },
  {
    cit_id: 22,
    cit_name: "Thái Nguyên",
    cit_parent: 0,
  },
  {
    cit_id: 23,
    cit_name: "Tuyên Quang",
    cit_parent: 0,
  },
  {
    cit_id: 24,
    cit_name: "Vĩnh Phúc",
    cit_parent: 0,
  },
  {
    cit_id: 25,
    cit_name: "Yên Bái",
    cit_parent: 0,
  },
  {
    cit_id: 26,
    cit_name: "Đà Nẵng",
    cit_parent: 0,
  },
  {
    cit_id: 27,
    cit_name: "Thừa Thiên Huế",
    cit_parent: 0,
  },
  {
    cit_id: 28,
    cit_name: "Khánh Hòa",
    cit_parent: 0,
  },
  {
    cit_id: 29,
    cit_name: "Lâm Đồng",
    cit_parent: 0,
  },
  {
    cit_id: 30,
    cit_name: "Bình Định",
    cit_parent: 0,
  },
  {
    cit_id: 31,
    cit_name: "Bình Thuận",
    cit_parent: 0,
  },
  {
    cit_id: 32,
    cit_name: "Đắk Lắk",
    cit_parent: 0,
  },
  {
    cit_id: 33,
    cit_name: "Đắk Nông",
    cit_parent: 0,
  },
  {
    cit_id: 34,
    cit_name: "Gia Lai",
    cit_parent: 0,
  },
  {
    cit_id: 35,
    cit_name: "Hà Tĩnh",
    cit_parent: 0,
  },
  {
    cit_id: 36,
    cit_name: "Kon Tum",
    cit_parent: 0,
  },
  {
    cit_id: 37,
    cit_name: "Nghệ An",
    cit_parent: 0,
  },
  {
    cit_id: 38,
    cit_name: "Ninh Thuận",
    cit_parent: 0,
  },
  {
    cit_id: 39,
    cit_name: "Phú Yên",
    cit_parent: 0,
  },
  {
    cit_id: 40,
    cit_name: "Quảng Bình",
    cit_parent: 0,
  },
  {
    cit_id: 41,
    cit_name: "Quảng Nam",
    cit_parent: 0,
  },
  {
    cit_id: 42,
    cit_name: "Quảng Ngãi",
    cit_parent: 0,
  },
  {
    cit_id: 43,
    cit_name: "Quảng Trị",
    cit_parent: 0,
  },
  {
    cit_id: 44,
    cit_name: "Thanh Hóa",
    cit_parent: 0,
  },
  {
    cit_id: 45,
    cit_name: "Hồ Chí Minh",
    cit_parent: 0,
  },
  {
    cit_id: 46,
    cit_name: "Bình Dương",
    cit_parent: 0,
  },
  {
    cit_id: 47,
    cit_name: "Bà Rịa Vũng Tàu",
    cit_parent: 0,
  },
  {
    cit_id: 48,
    cit_name: "Cần Thơ",
    cit_parent: 0,
  },
  {
    cit_id: 49,
    cit_name: "An Giang",
    cit_parent: 0,
  },
  {
    cit_id: 50,
    cit_name: "Bạc Liêu",
    cit_parent: 0,
  },
  {
    cit_id: 51,
    cit_name: "Bình Phước",
    cit_parent: 0,
  },
  {
    cit_id: 52,
    cit_name: "Bến Tre",
    cit_parent: 0,
  },
  {
    cit_id: 53,
    cit_name: "Cà Mau",
    cit_parent: 0,
  },
  {
    cit_id: 54,
    cit_name: "Đồng Tháp",
    cit_parent: 0,
  },
  {
    cit_id: 55,
    cit_name: "Đồng Nai",
    cit_parent: 0,
  },
  {
    cit_id: 56,
    cit_name: "Hậu Giang",
    cit_parent: 0,
  },
  {
    cit_id: 57,
    cit_name: "Kiên Giang",
    cit_parent: 0,
  },
  {
    cit_id: 58,
    cit_name: "Long An",
    cit_parent: 0,
  },
  {
    cit_id: 59,
    cit_name: "Sóc Trăng",
    cit_parent: 0,
  },
  {
    cit_id: 60,
    cit_name: "Tiền Giang",
    cit_parent: 0,
  },
  {
    cit_id: 61,
    cit_name: "Tây Ninh",
    cit_parent: 0,
  },
  {
    cit_id: 62,
    cit_name: "Trà Vinh",
    cit_parent: 0,
  },
  {
    cit_id: 63,
    cit_name: "Vĩnh Long",
    cit_parent: 0,
  },
  {
    cit_id: 66,
    cit_name: "Quận Ba Đình",
    cit_parent: 1,
  },
  {
    cit_id: 67,
    cit_name: "Quận Hoàn Kiếm",
    cit_parent: 1,
  },
  {
    cit_id: 68,
    cit_name: "Quận Tây Hồ",
    cit_parent: 1,
  },
  {
    cit_id: 69,
    cit_name: "Quận Long Biên",
    cit_parent: 1,
  },
  {
    cit_id: 70,
    cit_name: "Quận Cầu Giấy",
    cit_parent: 1,
  },
  {
    cit_id: 71,
    cit_name: "Quận Đống Đa",
    cit_parent: 1,
  },
  {
    cit_id: 72,
    cit_name: "Quận Hai Bà Trưng",
    cit_parent: 1,
  },
  {
    cit_id: 73,
    cit_name: "Quận Hoàng Mai",
    cit_parent: 1,
  },
  {
    cit_id: 74,
    cit_name: "Quận Thanh Xuân",
    cit_parent: 1,
  },
  {
    cit_id: 75,
    cit_name: "Huyện Sóc Sơn",
    cit_parent: 1,
  },
  {
    cit_id: 76,
    cit_name: "Huyện Đông Anh",
    cit_parent: 1,
  },
  {
    cit_id: 77,
    cit_name: "Huyện Gia Lâm",
    cit_parent: 1,
  },
  {
    cit_id: 78,
    cit_name: "Quận Nam Từ Liêm",
    cit_parent: 1,
  },
  {
    cit_id: 79,
    cit_name: "Huyện Thanh Trì",
    cit_parent: 1,
  },
  {
    cit_id: 80,
    cit_name: "Quận Bắc Từ Liêm",
    cit_parent: 1,
  },
  {
    cit_id: 81,
    cit_name: "Huyện Mê Linh",
    cit_parent: 1,
  },
  {
    cit_id: 82,
    cit_name: "Quận Hà Đông",
    cit_parent: 1,
  },
  {
    cit_id: 83,
    cit_name: "Thị xã Sơn Tây",
    cit_parent: 1,
  },
  {
    cit_id: 84,
    cit_name: "Huyện Ba Vì",
    cit_parent: 1,
  },
  {
    cit_id: 85,
    cit_name: "Huyện Phúc Thọ",
    cit_parent: 1,
  },
  {
    cit_id: 86,
    cit_name: "Huyện Đan Phượng",
    cit_parent: 1,
  },
  {
    cit_id: 87,
    cit_name: "Huyện Hoài Đức",
    cit_parent: 1,
  },
  {
    cit_id: 88,
    cit_name: "Huyện Quốc Oai",
    cit_parent: 1,
  },
  {
    cit_id: 89,
    cit_name: "Huyện Thạch Thất",
    cit_parent: 1,
  },
  {
    cit_id: 90,
    cit_name: "Huyện Chương Mỹ",
    cit_parent: 1,
  },
  {
    cit_id: 91,
    cit_name: "Huyện Thanh Oai",
    cit_parent: 1,
  },
  {
    cit_id: 92,
    cit_name: "Huyện Thường Tín",
    cit_parent: 1,
  },
  {
    cit_id: 93,
    cit_name: "Huyện Phú Xuyên",
    cit_parent: 1,
  },
  {
    cit_id: 94,
    cit_name: "Huyện Ứng Hòa",
    cit_parent: 1,
  },
  {
    cit_id: 95,
    cit_name: "Huyện Mỹ Đức",
    cit_parent: 1,
  },
  {
    cit_id: 96,
    cit_name: "Thành phố Hà Giang",
    cit_parent: 10,
  },
  {
    cit_id: 97,
    cit_name: "Huyện Đồng Văn",
    cit_parent: 10,
  },
  {
    cit_id: 98,
    cit_name: "Huyện Mèo Vạc",
    cit_parent: 10,
  },
  {
    cit_id: 99,
    cit_name: "Huyện Yên Minh",
    cit_parent: 10,
  },
  {
    cit_id: 100,
    cit_name: "Huyện Quản Bạ",
    cit_parent: 10,
  },
  {
    cit_id: 101,
    cit_name: "Huyện Vị Xuyên",
    cit_parent: 10,
  },
  {
    cit_id: 102,
    cit_name: "Huyện Bắc Mê",
    cit_parent: 10,
  },
  {
    cit_id: 103,
    cit_name: "Huyện Hoàng Su Phì",
    cit_parent: 10,
  },
  {
    cit_id: 104,
    cit_name: "Huyện Xín Mần",
    cit_parent: 10,
  },
  {
    cit_id: 105,
    cit_name: "Huyện Bắc Quang",
    cit_parent: 10,
  },
  {
    cit_id: 106,
    cit_name: "Huyện Quang Bình",
    cit_parent: 10,
  },
  {
    cit_id: 107,
    cit_name: "Thành phố Cao Bằng",
    cit_parent: 6,
  },
  {
    cit_id: 108,
    cit_name: "Huyện Bảo Lâm",
    cit_parent: 6,
  },
  {
    cit_id: 109,
    cit_name: "Huyện Bảo Lạc",
    cit_parent: 6,
  },
  {
    cit_id: 110,
    cit_name: "Huyện Thông Nông",
    cit_parent: 6,
  },
  {
    cit_id: 111,
    cit_name: "Huyện Hà Quảng",
    cit_parent: 6,
  },
  {
    cit_id: 112,
    cit_name: "Huyện Trà Lĩnh",
    cit_parent: 6,
  },
  {
    cit_id: 113,
    cit_name: "Huyện Trùng Khánh",
    cit_parent: 6,
  },
  {
    cit_id: 114,
    cit_name: "Huyện Hạ Lang",
    cit_parent: 6,
  },
  {
    cit_id: 115,
    cit_name: "Huyện Quảng Uyên",
    cit_parent: 6,
  },
  {
    cit_id: 116,
    cit_name: "Huyện Phục Hoà",
    cit_parent: 6,
  },
  {
    cit_id: 117,
    cit_name: "Huyện Hoà An",
    cit_parent: 6,
  },
  {
    cit_id: 118,
    cit_name: "Huyện Nguyên Bình",
    cit_parent: 6,
  },
  {
    cit_id: 119,
    cit_name: "Huyện Thạch An",
    cit_parent: 6,
  },
  {
    cit_id: 120,
    cit_name: "Thành Phố Bắc Kạn",
    cit_parent: 4,
  },
  {
    cit_id: 121,
    cit_name: "Huyện Pác Nặm",
    cit_parent: 4,
  },
  {
    cit_id: 122,
    cit_name: "Huyện Ba Bể",
    cit_parent: 4,
  },
  {
    cit_id: 123,
    cit_name: "Huyện Ngân Sơn",
    cit_parent: 4,
  },
  {
    cit_id: 124,
    cit_name: "Huyện Bạch Thông",
    cit_parent: 4,
  },
  {
    cit_id: 125,
    cit_name: "Huyện Chợ Đồn",
    cit_parent: 4,
  },
  {
    cit_id: 126,
    cit_name: "Huyện Chợ Mới",
    cit_parent: 4,
  },
  {
    cit_id: 127,
    cit_name: "Huyện Na Rì",
    cit_parent: 4,
  },
  {
    cit_id: 128,
    cit_name: "Thành phố Tuyên Quang",
    cit_parent: 23,
  },
  {
    cit_id: 129,
    cit_name: "Huyện Lâm Bình",
    cit_parent: 23,
  },
  {
    cit_id: 130,
    cit_name: "Huyện Nà Hang",
    cit_parent: 23,
  },
  {
    cit_id: 131,
    cit_name: "Huyện Chiêm Hóa",
    cit_parent: 23,
  },
  {
    cit_id: 132,
    cit_name: "Huyện Hàm Yên",
    cit_parent: 23,
  },
  {
    cit_id: 133,
    cit_name: "Huyện Yên Sơn",
    cit_parent: 23,
  },
  {
    cit_id: 134,
    cit_name: "Huyện Sơn Dương",
    cit_parent: 23,
  },
  {
    cit_id: 135,
    cit_name: "Thành phố Lào Cai",
    cit_parent: 13,
  },
  {
    cit_id: 136,
    cit_name: "Huyện Bát Xát",
    cit_parent: 13,
  },
  {
    cit_id: 137,
    cit_name: "Huyện Mường Khương",
    cit_parent: 13,
  },
  {
    cit_id: 138,
    cit_name: "Huyện Si Ma Cai",
    cit_parent: 13,
  },
  {
    cit_id: 139,
    cit_name: "Huyện Bắc Hà",
    cit_parent: 13,
  },
  {
    cit_id: 140,
    cit_name: "Huyện Bảo Thắng",
    cit_parent: 13,
  },
  {
    cit_id: 141,
    cit_name: "Huyện Bảo Yên",
    cit_parent: 13,
  },
  {
    cit_id: 142,
    cit_name: "Thị xã Sa Pa",
    cit_parent: 13,
  },
  {
    cit_id: 143,
    cit_name: "Huyện Văn Bàn",
    cit_parent: 13,
  },
  {
    cit_id: 144,
    cit_name: "Thành phố Điện Biên Phủ",
    cit_parent: 7,
  },
  {
    cit_id: 145,
    cit_name: "Thị Xã Mường Lay",
    cit_parent: 7,
  },
  {
    cit_id: 146,
    cit_name: "Huyện Mường Nhé",
    cit_parent: 7,
  },
  {
    cit_id: 147,
    cit_name: "Huyện Mường Chà",
    cit_parent: 7,
  },
  {
    cit_id: 148,
    cit_name: "Huyện Tủa Chùa",
    cit_parent: 7,
  },
  {
    cit_id: 149,
    cit_name: "Huyện Tuần Giáo",
    cit_parent: 7,
  },
  {
    cit_id: 150,
    cit_name: "Huyện Điện Biên",
    cit_parent: 7,
  },
  {
    cit_id: 151,
    cit_name: "Huyện Điện Biên Đông",
    cit_parent: 7,
  },
  {
    cit_id: 152,
    cit_name: "Huyện Mường Ảng",
    cit_parent: 7,
  },
  {
    cit_id: 153,
    cit_name: "Huyện Nậm Pồ",
    cit_parent: 7,
  },
  {
    cit_id: 154,
    cit_name: "Thành phố Lai Châu",
    cit_parent: 14,
  },
  {
    cit_id: 155,
    cit_name: "Huyện Tam Đường",
    cit_parent: 14,
  },
  {
    cit_id: 156,
    cit_name: "Huyện Mường Tè",
    cit_parent: 14,
  },
  {
    cit_id: 157,
    cit_name: "Huyện Sìn Hồ",
    cit_parent: 14,
  },
  {
    cit_id: 158,
    cit_name: "Huyện Phong Thổ",
    cit_parent: 14,
  },
  {
    cit_id: 159,
    cit_name: "Huyện Than Uyên",
    cit_parent: 14,
  },
  {
    cit_id: 160,
    cit_name: "Huyện Tân Uyên",
    cit_parent: 14,
  },
  {
    cit_id: 161,
    cit_name: "Huyện Nậm Nhùn",
    cit_parent: 14,
  },
  {
    cit_id: 162,
    cit_name: "Thành phố Sơn La",
    cit_parent: 20,
  },
  {
    cit_id: 163,
    cit_name: "Huyện Quỳnh Nhai",
    cit_parent: 20,
  },
  {
    cit_id: 164,
    cit_name: "Huyện Thuận Châu",
    cit_parent: 20,
  },
  {
    cit_id: 165,
    cit_name: "Huyện Mường La",
    cit_parent: 20,
  },
  {
    cit_id: 166,
    cit_name: "Huyện Bắc Yên",
    cit_parent: 20,
  },
  {
    cit_id: 167,
    cit_name: "Huyện Phù Yên",
    cit_parent: 20,
  },
  {
    cit_id: 168,
    cit_name: "Huyện Mộc Châu",
    cit_parent: 20,
  },
  {
    cit_id: 169,
    cit_name: "Huyện Yên Châu",
    cit_parent: 20,
  },
  {
    cit_id: 170,
    cit_name: "Huyện Mai Sơn",
    cit_parent: 20,
  },
  {
    cit_id: 171,
    cit_name: "Huyện Sông Mã",
    cit_parent: 20,
  },
  {
    cit_id: 172,
    cit_name: "Huyện Sốp Cộp",
    cit_parent: 20,
  },
  {
    cit_id: 173,
    cit_name: "Huyện Vân Hồ",
    cit_parent: 20,
  },
  {
    cit_id: 174,
    cit_name: "Thành phố Yên Bái",
    cit_parent: 25,
  },
  {
    cit_id: 175,
    cit_name: "Thị xã Nghĩa Lộ",
    cit_parent: 25,
  },
  {
    cit_id: 176,
    cit_name: "Huyện Lục Yên",
    cit_parent: 25,
  },
  {
    cit_id: 177,
    cit_name: "Huyện Văn Yên",
    cit_parent: 25,
  },
  {
    cit_id: 178,
    cit_name: "Huyện Mù Căng Chải",
    cit_parent: 25,
  },
  {
    cit_id: 179,
    cit_name: "Huyện Trấn Yên",
    cit_parent: 25,
  },
  {
    cit_id: 180,
    cit_name: "Huyện Trạm Tấu",
    cit_parent: 25,
  },
  {
    cit_id: 181,
    cit_name: "Huyện Văn Chấn",
    cit_parent: 25,
  },
  {
    cit_id: 182,
    cit_name: "Huyện Yên Bình",
    cit_parent: 25,
  },
  {
    cit_id: 183,
    cit_name: "Thành phố Hòa Bình",
    cit_parent: 8,
  },
  {
    cit_id: 184,
    cit_name: "Huyện Đà Bắc",
    cit_parent: 8,
  },
  {
    cit_id: 185,
    cit_name: "Huyện Kỳ Sơn",
    cit_parent: 8,
  },
  {
    cit_id: 186,
    cit_name: "Huyện Lương Sơn",
    cit_parent: 8,
  },
  {
    cit_id: 187,
    cit_name: "Huyện Kim Bôi",
    cit_parent: 8,
  },
  {
    cit_id: 188,
    cit_name: "Huyện Cao Phong",
    cit_parent: 8,
  },
  {
    cit_id: 189,
    cit_name: "Huyện Tân Lạc",
    cit_parent: 8,
  },
  {
    cit_id: 190,
    cit_name: "Huyện Mai Châu",
    cit_parent: 8,
  },
  {
    cit_id: 191,
    cit_name: "Huyện Lạc Sơn",
    cit_parent: 8,
  },
  {
    cit_id: 192,
    cit_name: "Huyện Yên Thủy",
    cit_parent: 8,
  },
  {
    cit_id: 193,
    cit_name: "Huyện Lạc Thủy",
    cit_parent: 8,
  },
  {
    cit_id: 194,
    cit_name: "Thành phố Thái Nguyên",
    cit_parent: 22,
  },
  {
    cit_id: 195,
    cit_name: "Thành phố Sông Công",
    cit_parent: 22,
  },
  {
    cit_id: 196,
    cit_name: "Huyện Định Hóa",
    cit_parent: 22,
  },
  {
    cit_id: 197,
    cit_name: "Huyện Phú Lương",
    cit_parent: 22,
  },
  {
    cit_id: 198,
    cit_name: "Huyện Đồng Hỷ",
    cit_parent: 22,
  },
  {
    cit_id: 199,
    cit_name: "Huyện Võ Nhai",
    cit_parent: 22,
  },
  {
    cit_id: 200,
    cit_name: "Huyện Đại Từ",
    cit_parent: 22,
  },
  {
    cit_id: 201,
    cit_name: "Thị xã Phổ Yên",
    cit_parent: 22,
  },
  {
    cit_id: 202,
    cit_name: "Huyện Phú Bình",
    cit_parent: 22,
  },
  {
    cit_id: 203,
    cit_name: "Thành phố Lạng Sơn",
    cit_parent: 15,
  },
  {
    cit_id: 204,
    cit_name: "Huyện Tràng Định",
    cit_parent: 15,
  },
  {
    cit_id: 205,
    cit_name: "Huyện Bình Gia",
    cit_parent: 15,
  },
  {
    cit_id: 206,
    cit_name: "Huyện Văn Lãng",
    cit_parent: 15,
  },
  {
    cit_id: 207,
    cit_name: "Huyện Cao Lộc",
    cit_parent: 15,
  },
  {
    cit_id: 208,
    cit_name: "Huyện Văn Quan",
    cit_parent: 15,
  },
  {
    cit_id: 209,
    cit_name: "Huyện Bắc Sơn",
    cit_parent: 15,
  },
  {
    cit_id: 210,
    cit_name: "Huyện Hữu Lũng",
    cit_parent: 15,
  },
  {
    cit_id: 211,
    cit_name: "Huyện Chi Lăng",
    cit_parent: 15,
  },
  {
    cit_id: 212,
    cit_name: "Huyện Lộc Bình",
    cit_parent: 15,
  },
  {
    cit_id: 213,
    cit_name: "Huyện Đình Lập",
    cit_parent: 15,
  },
  {
    cit_id: 214,
    cit_name: "Thành phố Hạ Long",
    cit_parent: 19,
  },
  {
    cit_id: 215,
    cit_name: "Thành phố Móng Cái",
    cit_parent: 19,
  },
  {
    cit_id: 216,
    cit_name: "Thành phố Cẩm Phả",
    cit_parent: 19,
  },
  {
    cit_id: 217,
    cit_name: "Thành phố Uông Bí",
    cit_parent: 19,
  },
  {
    cit_id: 218,
    cit_name: "Huyện Bình Liêu",
    cit_parent: 19,
  },
  {
    cit_id: 219,
    cit_name: "Huyện Tiên Yên",
    cit_parent: 19,
  },
  {
    cit_id: 220,
    cit_name: "Huyện Đầm Hà",
    cit_parent: 19,
  },
  {
    cit_id: 221,
    cit_name: "Huyện Hải Hà",
    cit_parent: 19,
  },
  {
    cit_id: 222,
    cit_name: "Huyện Ba Chẽ",
    cit_parent: 19,
  },
  {
    cit_id: 223,
    cit_name: "Huyện Vân Đồn",
    cit_parent: 19,
  },
  {
    cit_id: 225,
    cit_name: "Thị xã Đông Triều",
    cit_parent: 19,
  },
  {
    cit_id: 226,
    cit_name: "Thị xã Quảng Yên",
    cit_parent: 19,
  },
  {
    cit_id: 227,
    cit_name: "Huyện Cô Tô",
    cit_parent: 19,
  },
  {
    cit_id: 228,
    cit_name: "Thành phố Bắc Giang",
    cit_parent: 3,
  },
  {
    cit_id: 229,
    cit_name: "Huyện Yên Thế",
    cit_parent: 3,
  },
  {
    cit_id: 230,
    cit_name: "Huyện Tân Yên",
    cit_parent: 3,
  },
  {
    cit_id: 231,
    cit_name: "Huyện Lạng Giang",
    cit_parent: 3,
  },
  {
    cit_id: 232,
    cit_name: "Huyện Lục Nam",
    cit_parent: 3,
  },
  {
    cit_id: 233,
    cit_name: "Huyện Lục Ngạn",
    cit_parent: 3,
  },
  {
    cit_id: 234,
    cit_name: "Huyện Sơn Động",
    cit_parent: 3,
  },
  {
    cit_id: 235,
    cit_name: "Huyện Yên Dũng",
    cit_parent: 3,
  },
  {
    cit_id: 236,
    cit_name: "Huyện Việt Yên",
    cit_parent: 3,
  },
  {
    cit_id: 237,
    cit_name: "Huyện Hiệp Hòa",
    cit_parent: 3,
  },
  {
    cit_id: 238,
    cit_name: "Thành phố Việt Trì",
    cit_parent: 18,
  },
  {
    cit_id: 239,
    cit_name: "Thị xã Phú Thọ",
    cit_parent: 18,
  },
  {
    cit_id: 240,
    cit_name: "Huyện Đoan Hùng",
    cit_parent: 18,
  },
  {
    cit_id: 241,
    cit_name: "Huyện Hạ Hoà",
    cit_parent: 18,
  },
  {
    cit_id: 242,
    cit_name: "Huyện Thanh Ba",
    cit_parent: 18,
  },
  {
    cit_id: 243,
    cit_name: "Huyện Phù Ninh",
    cit_parent: 18,
  },
  {
    cit_id: 244,
    cit_name: "Huyện Yên Lập",
    cit_parent: 18,
  },
  {
    cit_id: 245,
    cit_name: "Huyện Cẩm Khê",
    cit_parent: 18,
  },
  {
    cit_id: 246,
    cit_name: "Huyện Tam Nông",
    cit_parent: 18,
  },
  {
    cit_id: 247,
    cit_name: "Huyện Lâm Thao",
    cit_parent: 18,
  },
  {
    cit_id: 248,
    cit_name: "Huyện Thanh Sơn",
    cit_parent: 18,
  },
  {
    cit_id: 249,
    cit_name: "Huyện Thanh Thuỷ",
    cit_parent: 18,
  },
  {
    cit_id: 250,
    cit_name: "Huyện Tân Sơn",
    cit_parent: 18,
  },
  {
    cit_id: 251,
    cit_name: "Thành phố Vĩnh Yên",
    cit_parent: 24,
  },
  {
    cit_id: 252,
    cit_name: "Thành phố Phúc Yên",
    cit_parent: 24,
  },
  {
    cit_id: 253,
    cit_name: "Huyện Lập Thạch",
    cit_parent: 24,
  },
  {
    cit_id: 254,
    cit_name: "Huyện Tam Dương",
    cit_parent: 24,
  },
  {
    cit_id: 255,
    cit_name: "Huyện Tam Đảo",
    cit_parent: 24,
  },
  {
    cit_id: 256,
    cit_name: "Huyện Bình Xuyên",
    cit_parent: 24,
  },
  {
    cit_id: 257,
    cit_name: "Huyện Yên Lạc",
    cit_parent: 24,
  },
  {
    cit_id: 258,
    cit_name: "Huyện Vĩnh Tường",
    cit_parent: 24,
  },
  {
    cit_id: 259,
    cit_name: "Huyện Sông Lô",
    cit_parent: 24,
  },
  {
    cit_id: 260,
    cit_name: "Thành phố Bắc Ninh",
    cit_parent: 5,
  },
  {
    cit_id: 261,
    cit_name: "Huyện Yên Phong",
    cit_parent: 5,
  },
  {
    cit_id: 262,
    cit_name: "Huyện Quế Võ",
    cit_parent: 5,
  },
  {
    cit_id: 263,
    cit_name: "Huyện Tiên Du",
    cit_parent: 5,
  },
  {
    cit_id: 264,
    cit_name: "Thị xã Từ Sơn",
    cit_parent: 5,
  },
  {
    cit_id: 265,
    cit_name: "Huyện Thuận Thành",
    cit_parent: 5,
  },
  {
    cit_id: 266,
    cit_name: "Huyện Gia Bình",
    cit_parent: 5,
  },
  {
    cit_id: 267,
    cit_name: "Huyện Lương Tài",
    cit_parent: 5,
  },
  {
    cit_id: 268,
    cit_name: "Thành phố Hải Dương",
    cit_parent: 9,
  },
  {
    cit_id: 269,
    cit_name: "Thành phố Chí Linh",
    cit_parent: 9,
  },
  {
    cit_id: 270,
    cit_name: "Huyện Nam Sách",
    cit_parent: 9,
  },
  {
    cit_id: 271,
    cit_name: "Huyện Kinh Môn",
    cit_parent: 9,
  },
  {
    cit_id: 272,
    cit_name: "Huyện Kim Thành",
    cit_parent: 9,
  },
  {
    cit_id: 273,
    cit_name: "Huyện Thanh Hà",
    cit_parent: 9,
  },
  {
    cit_id: 274,
    cit_name: "Huyện Cẩm Giàng",
    cit_parent: 9,
  },
  {
    cit_id: 275,
    cit_name: "Huyện Bình Giang",
    cit_parent: 9,
  },
  {
    cit_id: 276,
    cit_name: "Huyện Gia Lộc",
    cit_parent: 9,
  },
  {
    cit_id: 277,
    cit_name: "Huyện Tứ Kỳ",
    cit_parent: 9,
  },
  {
    cit_id: 278,
    cit_name: "Huyện Ninh Giang",
    cit_parent: 9,
  },
  {
    cit_id: 279,
    cit_name: "Huyện Thanh Miện",
    cit_parent: 9,
  },
  {
    cit_id: 280,
    cit_name: "Quận Hồng Bàng",
    cit_parent: 2,
  },
  {
    cit_id: 281,
    cit_name: "Quận Ngô Quyền",
    cit_parent: 2,
  },
  {
    cit_id: 282,
    cit_name: "Quận Lê Chân",
    cit_parent: 2,
  },
  {
    cit_id: 283,
    cit_name: "Quận Hải An",
    cit_parent: 2,
  },
  {
    cit_id: 284,
    cit_name: "Quận Kiến An",
    cit_parent: 2,
  },
  {
    cit_id: 285,
    cit_name: "Quận Đồ Sơn",
    cit_parent: 2,
  },
  {
    cit_id: 286,
    cit_name: "Quận Dương Kinh",
    cit_parent: 2,
  },
  {
    cit_id: 287,
    cit_name: "Huyện Thuỷ Nguyên",
    cit_parent: 2,
  },
  {
    cit_id: 288,
    cit_name: "Huyện An Dương",
    cit_parent: 2,
  },
  {
    cit_id: 289,
    cit_name: "Huyện An Lão",
    cit_parent: 2,
  },
  {
    cit_id: 290,
    cit_name: "Huyện Kiến Thuỵ",
    cit_parent: 2,
  },
  {
    cit_id: 291,
    cit_name: "Huyện Tiên Lãng",
    cit_parent: 2,
  },
  {
    cit_id: 292,
    cit_name: "Huyện Vĩnh Bảo",
    cit_parent: 2,
  },
  {
    cit_id: 293,
    cit_name: "Huyện Cát Hải",
    cit_parent: 2,
  },
  {
    cit_id: 294,
    cit_name: "Thành phố Hưng Yên",
    cit_parent: 12,
  },
  {
    cit_id: 295,
    cit_name: "Huyện Văn Lâm",
    cit_parent: 12,
  },
  {
    cit_id: 296,
    cit_name: "Huyện Văn Giang",
    cit_parent: 12,
  },
  {
    cit_id: 297,
    cit_name: "Huyện Yên Mỹ",
    cit_parent: 12,
  },
  {
    cit_id: 298,
    cit_name: "Thị xã Mỹ Hào",
    cit_parent: 12,
  },
  {
    cit_id: 299,
    cit_name: "Huyện Ân Thi",
    cit_parent: 12,
  },
  {
    cit_id: 300,
    cit_name: "Huyện Khoái Châu",
    cit_parent: 12,
  },
  {
    cit_id: 301,
    cit_name: "Huyện Kim Động",
    cit_parent: 12,
  },
  {
    cit_id: 302,
    cit_name: "Huyện Tiên Lữ",
    cit_parent: 12,
  },
  {
    cit_id: 303,
    cit_name: "Huyện Phù Cừ",
    cit_parent: 12,
  },
  {
    cit_id: 304,
    cit_name: "Thành phố Thái Bình",
    cit_parent: 21,
  },
  {
    cit_id: 305,
    cit_name: "Huyện Quỳnh Phụ",
    cit_parent: 21,
  },
  {
    cit_id: 306,
    cit_name: "Huyện Hưng Hà",
    cit_parent: 21,
  },
  {
    cit_id: 307,
    cit_name: "Huyện Đông Hưng",
    cit_parent: 21,
  },
  {
    cit_id: 308,
    cit_name: "Huyện Thái Thụy",
    cit_parent: 21,
  },
  {
    cit_id: 309,
    cit_name: "Huyện Tiền Hải",
    cit_parent: 21,
  },
  {
    cit_id: 310,
    cit_name: "Huyện Kiến Xương",
    cit_parent: 21,
  },
  {
    cit_id: 311,
    cit_name: "Huyện Vũ Thư",
    cit_parent: 21,
  },
  {
    cit_id: 312,
    cit_name: "Thành phố Phủ Lý",
    cit_parent: 11,
  },
  {
    cit_id: 313,
    cit_name: "Thị xã Duy Tiên",
    cit_parent: 11,
  },
  {
    cit_id: 314,
    cit_name: "Huyện Kim Bảng",
    cit_parent: 11,
  },
  {
    cit_id: 315,
    cit_name: "Huyện Thanh Liêm",
    cit_parent: 11,
  },
  {
    cit_id: 316,
    cit_name: "Huyện Bình Lục",
    cit_parent: 11,
  },
  {
    cit_id: 317,
    cit_name: "Huyện Lý Nhân",
    cit_parent: 11,
  },
  {
    cit_id: 318,
    cit_name: "Thành phố Nam Định",
    cit_parent: 17,
  },
  {
    cit_id: 319,
    cit_name: "Huyện Mỹ Lộc",
    cit_parent: 17,
  },
  {
    cit_id: 320,
    cit_name: "Huyện Vụ Bản",
    cit_parent: 17,
  },
  {
    cit_id: 321,
    cit_name: "Huyện Ý Yên",
    cit_parent: 17,
  },
  {
    cit_id: 322,
    cit_name: "Huyện Nghĩa Hưng",
    cit_parent: 17,
  },
  {
    cit_id: 323,
    cit_name: "Huyện Nam Trực",
    cit_parent: 17,
  },
  {
    cit_id: 324,
    cit_name: "Huyện Trực Ninh",
    cit_parent: 17,
  },
  {
    cit_id: 325,
    cit_name: "Huyện Xuân Trường",
    cit_parent: 17,
  },
  {
    cit_id: 326,
    cit_name: "Huyện Giao Thủy",
    cit_parent: 17,
  },
  {
    cit_id: 327,
    cit_name: "Huyện Hải Hậu",
    cit_parent: 17,
  },
  {
    cit_id: 328,
    cit_name: "Thành phố Ninh Bình",
    cit_parent: 16,
  },
  {
    cit_id: 329,
    cit_name: "Thành phố Tam Điệp",
    cit_parent: 16,
  },
  {
    cit_id: 330,
    cit_name: "Huyện Nho Quan",
    cit_parent: 16,
  },
  {
    cit_id: 331,
    cit_name: "Huyện Gia Viễn",
    cit_parent: 16,
  },
  {
    cit_id: 332,
    cit_name: "Huyện Hoa Lư",
    cit_parent: 16,
  },
  {
    cit_id: 333,
    cit_name: "Huyện Yên Khánh",
    cit_parent: 16,
  },
  {
    cit_id: 334,
    cit_name: "Huyện Kim Sơn",
    cit_parent: 16,
  },
  {
    cit_id: 335,
    cit_name: "Huyện Yên Mô",
    cit_parent: 16,
  },
  {
    cit_id: 336,
    cit_name: "Thành phố Thanh Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 337,
    cit_name: "Thị xã Bỉm Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 338,
    cit_name: "Thành phố Sầm Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 339,
    cit_name: "Huyện Mường Lát",
    cit_parent: 44,
  },
  {
    cit_id: 340,
    cit_name: "Huyện Quan Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 341,
    cit_name: "Huyện Bá Thước",
    cit_parent: 44,
  },
  {
    cit_id: 342,
    cit_name: "Huyện Quan Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 343,
    cit_name: "Huyện Lang Chánh",
    cit_parent: 44,
  },
  {
    cit_id: 344,
    cit_name: "Huyện Ngọc Lặc",
    cit_parent: 44,
  },
  {
    cit_id: 345,
    cit_name: "Huyện Cẩm Thủy",
    cit_parent: 44,
  },
  {
    cit_id: 346,
    cit_name: "Huyện Thạch Thành",
    cit_parent: 44,
  },
  {
    cit_id: 347,
    cit_name: "Huyện Hà Trung",
    cit_parent: 44,
  },
  {
    cit_id: 348,
    cit_name: "Huyện Vĩnh Lộc",
    cit_parent: 44,
  },
  {
    cit_id: 349,
    cit_name: "Huyện Yên Định",
    cit_parent: 44,
  },
  {
    cit_id: 350,
    cit_name: "Huyện Thọ Xuân",
    cit_parent: 44,
  },
  {
    cit_id: 351,
    cit_name: "Huyện Thường Xuân",
    cit_parent: 44,
  },
  {
    cit_id: 352,
    cit_name: "Huyện Triệu Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 353,
    cit_name: "Huyện Thiệu Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 354,
    cit_name: "Huyện Hoằng Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 355,
    cit_name: "Huyện Hậu Lộc",
    cit_parent: 44,
  },
  {
    cit_id: 356,
    cit_name: "Huyện Nga Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 357,
    cit_name: "Huyện Như Xuân",
    cit_parent: 44,
  },
  {
    cit_id: 358,
    cit_name: "Huyện Như Thanh",
    cit_parent: 44,
  },
  {
    cit_id: 359,
    cit_name: "Huyện Nông Cống",
    cit_parent: 44,
  },
  {
    cit_id: 360,
    cit_name: "Huyện Đông Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 361,
    cit_name: "Huyện Quảng Xương",
    cit_parent: 44,
  },
  {
    cit_id: 362,
    cit_name: "Huyện Tĩnh Gia",
    cit_parent: 44,
  },
  {
    cit_id: 363,
    cit_name: "Thành phố Vinh",
    cit_parent: 37,
  },
  {
    cit_id: 364,
    cit_name: "Thị xã Cửa Lò",
    cit_parent: 37,
  },
  {
    cit_id: 365,
    cit_name: "Thị xã Thái Hoà",
    cit_parent: 37,
  },
  {
    cit_id: 366,
    cit_name: "Huyện Quế Phong",
    cit_parent: 37,
  },
  {
    cit_id: 367,
    cit_name: "Huyện Quỳ Châu",
    cit_parent: 37,
  },
  {
    cit_id: 368,
    cit_name: "Huyện Tương Dương",
    cit_parent: 37,
  },
  {
    cit_id: 369,
    cit_name: "Huyện Nghĩa Đàn",
    cit_parent: 37,
  },
  {
    cit_id: 370,
    cit_name: "Huyện Quỳ Hợp",
    cit_parent: 37,
  },
  {
    cit_id: 371,
    cit_name: "Huyện Quỳnh Lưu",
    cit_parent: 37,
  },
  {
    cit_id: 372,
    cit_name: "Huyện Con Cuông",
    cit_parent: 37,
  },
  {
    cit_id: 373,
    cit_name: "Huyện Tân Kỳ",
    cit_parent: 37,
  },
  {
    cit_id: 374,
    cit_name: "Huyện Anh Sơn",
    cit_parent: 37,
  },
  {
    cit_id: 375,
    cit_name: "Huyện Diễn Châu",
    cit_parent: 37,
  },
  {
    cit_id: 376,
    cit_name: "Huyện Yên Thành",
    cit_parent: 37,
  },
  {
    cit_id: 377,
    cit_name: "Huyện Đô Lương",
    cit_parent: 37,
  },
  {
    cit_id: 378,
    cit_name: "Huyện Thanh Chương",
    cit_parent: 37,
  },
  {
    cit_id: 379,
    cit_name: "Huyện Nghi Lộc",
    cit_parent: 37,
  },
  {
    cit_id: 380,
    cit_name: "Huyện Nam Đàn",
    cit_parent: 37,
  },
  {
    cit_id: 381,
    cit_name: "Huyện Hưng Nguyên",
    cit_parent: 37,
  },
  {
    cit_id: 382,
    cit_name: "Thị xã Hoàng Mai",
    cit_parent: 37,
  },
  {
    cit_id: 383,
    cit_name: "Thành phố Hà Tĩnh",
    cit_parent: 35,
  },
  {
    cit_id: 384,
    cit_name: "Thị xã Hồng Lĩnh",
    cit_parent: 35,
  },
  {
    cit_id: 385,
    cit_name: "Huyện Hương Sơn",
    cit_parent: 35,
  },
  {
    cit_id: 386,
    cit_name: "Huyện Đức Thọ",
    cit_parent: 35,
  },
  {
    cit_id: 387,
    cit_name: "Huyện Vũ Quang",
    cit_parent: 35,
  },
  {
    cit_id: 388,
    cit_name: "Huyện Nghi Xuân",
    cit_parent: 35,
  },
  {
    cit_id: 389,
    cit_name: "Huyện Can Lộc",
    cit_parent: 35,
  },
  {
    cit_id: 390,
    cit_name: "Huyện Hương Khê",
    cit_parent: 35,
  },
  {
    cit_id: 391,
    cit_name: "Huyện Thạch Hà",
    cit_parent: 35,
  },
  {
    cit_id: 392,
    cit_name: "Huyện Cẩm Xuyên",
    cit_parent: 35,
  },
  {
    cit_id: 393,
    cit_name: "Huyện Kỳ Anh",
    cit_parent: 35,
  },
  {
    cit_id: 394,
    cit_name: "Huyện Lộc Hà",
    cit_parent: 35,
  },
  {
    cit_id: 395,
    cit_name: "Thị xã Kỳ Anh",
    cit_parent: 35,
  },
  {
    cit_id: 396,
    cit_name: "Thành Phố Đồng Hới",
    cit_parent: 40,
  },
  {
    cit_id: 397,
    cit_name: "Huyện Minh Hóa",
    cit_parent: 40,
  },
  {
    cit_id: 398,
    cit_name: "Huyện Tuyên Hóa",
    cit_parent: 40,
  },
  {
    cit_id: 399,
    cit_name: "Huyện Quảng Trạch",
    cit_parent: 40,
  },
  {
    cit_id: 400,
    cit_name: "Huyện Bố Trạch",
    cit_parent: 40,
  },
  {
    cit_id: 401,
    cit_name: "Huyện Quảng Ninh",
    cit_parent: 40,
  },
  {
    cit_id: 402,
    cit_name: "Huyện Lệ Thủy",
    cit_parent: 40,
  },
  {
    cit_id: 403,
    cit_name: "Thị xã Ba Đồn",
    cit_parent: 40,
  },
  {
    cit_id: 404,
    cit_name: "Thành phố Đông Hà",
    cit_parent: 43,
  },
  {
    cit_id: 405,
    cit_name: "Thị xã Quảng Trị",
    cit_parent: 43,
  },
  {
    cit_id: 406,
    cit_name: "Huyện Vĩnh Linh",
    cit_parent: 43,
  },
  {
    cit_id: 407,
    cit_name: "Huyện Hướng Hóa",
    cit_parent: 43,
  },
  {
    cit_id: 408,
    cit_name: "Huyện Gio Linh",
    cit_parent: 43,
  },
  {
    cit_id: 409,
    cit_name: "Huyện Đa Krông",
    cit_parent: 43,
  },
  {
    cit_id: 410,
    cit_name: "Huyện Cam Lộ",
    cit_parent: 43,
  },
  {
    cit_id: 411,
    cit_name: "Huyện Triệu Phong",
    cit_parent: 43,
  },
  {
    cit_id: 412,
    cit_name: "Huyện Hải Lăng",
    cit_parent: 43,
  },
  {
    cit_id: 413,
    cit_name: "Thành phố Huế",
    cit_parent: 27,
  },
  {
    cit_id: 414,
    cit_name: "Huyện Phong Điền",
    cit_parent: 27,
  },
  {
    cit_id: 415,
    cit_name: "Huyện Quảng Điền",
    cit_parent: 27,
  },
  {
    cit_id: 416,
    cit_name: "Huyện Phú Vang",
    cit_parent: 27,
  },
  {
    cit_id: 417,
    cit_name: "Thị xã Hương Thủy",
    cit_parent: 27,
  },
  {
    cit_id: 418,
    cit_name: "Thị xã Hương Trà",
    cit_parent: 27,
  },
  {
    cit_id: 419,
    cit_name: "Huyện A Lưới",
    cit_parent: 27,
  },
  {
    cit_id: 420,
    cit_name: "Huyện Phú Lộc",
    cit_parent: 27,
  },
  {
    cit_id: 421,
    cit_name: "Huyện Nam Đông",
    cit_parent: 27,
  },
  {
    cit_id: 422,
    cit_name: "Quận Liên Chiểu",
    cit_parent: 26,
  },
  {
    cit_id: 423,
    cit_name: "Quận Thanh Khê",
    cit_parent: 26,
  },
  {
    cit_id: 424,
    cit_name: "Quận Hải Châu",
    cit_parent: 26,
  },
  {
    cit_id: 425,
    cit_name: "Quận Sơn Trà",
    cit_parent: 26,
  },
  {
    cit_id: 426,
    cit_name: "Quận Ngũ Hành Sơn",
    cit_parent: 26,
  },
  {
    cit_id: 427,
    cit_name: "Quận Cẩm Lệ",
    cit_parent: 26,
  },
  {
    cit_id: 428,
    cit_name: "Huyện Hòa Vang",
    cit_parent: 26,
  },
  {
    cit_id: 429,
    cit_name: "Thành phố Tam Kỳ",
    cit_parent: 41,
  },
  {
    cit_id: 430,
    cit_name: "Thành phố Hội An",
    cit_parent: 41,
  },
  {
    cit_id: 431,
    cit_name: "Huyện Tây Giang",
    cit_parent: 41,
  },
  {
    cit_id: 432,
    cit_name: "Huyện Đông Giang",
    cit_parent: 41,
  },
  {
    cit_id: 433,
    cit_name: "Huyện Đại Lộc",
    cit_parent: 41,
  },
  {
    cit_id: 434,
    cit_name: "Thị xã Điện Bàn",
    cit_parent: 41,
  },
  {
    cit_id: 435,
    cit_name: "Huyện Duy Xuyên",
    cit_parent: 41,
  },
  {
    cit_id: 436,
    cit_name: "Huyện Quế Sơn",
    cit_parent: 41,
  },
  {
    cit_id: 437,
    cit_name: "Huyện Nam Giang",
    cit_parent: 41,
  },
  {
    cit_id: 438,
    cit_name: "Huyện Phước Sơn",
    cit_parent: 41,
  },
  {
    cit_id: 439,
    cit_name: "Huyện Hiệp Đức",
    cit_parent: 41,
  },
  {
    cit_id: 440,
    cit_name: "Huyện Thăng Bình",
    cit_parent: 41,
  },
  {
    cit_id: 441,
    cit_name: "Huyện Tiên Phước",
    cit_parent: 41,
  },
  {
    cit_id: 442,
    cit_name: "Huyện Bắc Trà My",
    cit_parent: 41,
  },
  {
    cit_id: 443,
    cit_name: "Huyện Nam Trà My",
    cit_parent: 41,
  },
  {
    cit_id: 444,
    cit_name: "Huyện Núi Thành",
    cit_parent: 41,
  },
  {
    cit_id: 445,
    cit_name: "Huyện Phú Ninh",
    cit_parent: 41,
  },
  {
    cit_id: 446,
    cit_name: "Huyện Nông Sơn",
    cit_parent: 41,
  },
  {
    cit_id: 447,
    cit_name: "Thành phố Quảng Ngãi",
    cit_parent: 42,
  },
  {
    cit_id: 448,
    cit_name: "Huyện Bình Sơn",
    cit_parent: 42,
  },
  {
    cit_id: 449,
    cit_name: "Huyện Trà Bồng",
    cit_parent: 42,
  },
  {
    cit_id: 450,
    cit_name: "Huyện Tây Trà",
    cit_parent: 42,
  },
  {
    cit_id: 451,
    cit_name: "Huyện Sơn Tịnh",
    cit_parent: 42,
  },
  {
    cit_id: 452,
    cit_name: "Huyện Tư Nghĩa",
    cit_parent: 42,
  },
  {
    cit_id: 453,
    cit_name: "Huyện Sơn Hà",
    cit_parent: 42,
  },
  {
    cit_id: 454,
    cit_name: "Huyện Sơn Tây",
    cit_parent: 42,
  },
  {
    cit_id: 455,
    cit_name: "Huyện Minh Long",
    cit_parent: 42,
  },
  {
    cit_id: 456,
    cit_name: "Huyện Nghĩa Hành",
    cit_parent: 42,
  },
  {
    cit_id: 457,
    cit_name: "Huyện Mộ Đức",
    cit_parent: 42,
  },
  {
    cit_id: 458,
    cit_name: "Thị xã Đức Phổ",
    cit_parent: 42,
  },
  {
    cit_id: 459,
    cit_name: "Huyện Ba Tơ",
    cit_parent: 42,
  },
  {
    cit_id: 460,
    cit_name: "Huyện Lý Sơn",
    cit_parent: 42,
  },
  {
    cit_id: 461,
    cit_name: "Thành phố Quy Nhơn",
    cit_parent: 30,
  },
  {
    cit_id: 462,
    cit_name: "Huyện Hoài Nhơn",
    cit_parent: 30,
  },
  {
    cit_id: 463,
    cit_name: "Huyện Hoài Ân",
    cit_parent: 30,
  },
  {
    cit_id: 464,
    cit_name: "Huyện Phù Mỹ",
    cit_parent: 30,
  },
  {
    cit_id: 465,
    cit_name: "Huyện Vĩnh Thạnh",
    cit_parent: 30,
  },
  {
    cit_id: 466,
    cit_name: "Huyện Tây Sơn",
    cit_parent: 30,
  },
  {
    cit_id: 467,
    cit_name: "Huyện Phù Cát",
    cit_parent: 30,
  },
  {
    cit_id: 468,
    cit_name: "Thị xã An Nhơn",
    cit_parent: 30,
  },
  {
    cit_id: 469,
    cit_name: "Huyện Tuy Phước",
    cit_parent: 30,
  },
  {
    cit_id: 470,
    cit_name: "Huyện Vân Canh",
    cit_parent: 30,
  },
  {
    cit_id: 471,
    cit_name: "Thành phố Tuy Hoà",
    cit_parent: 39,
  },
  {
    cit_id: 472,
    cit_name: "Thị xã Sông Cầu",
    cit_parent: 39,
  },
  {
    cit_id: 473,
    cit_name: "Huyện Đồng Xuân",
    cit_parent: 39,
  },
  {
    cit_id: 474,
    cit_name: "Huyện Tuy An",
    cit_parent: 39,
  },
  {
    cit_id: 475,
    cit_name: "Huyện Sơn Hòa",
    cit_parent: 39,
  },
  {
    cit_id: 476,
    cit_name: "Huyện Sông Hinh",
    cit_parent: 39,
  },
  {
    cit_id: 477,
    cit_name: "Huyện Tây Hoà",
    cit_parent: 39,
  },
  {
    cit_id: 478,
    cit_name: "Huyện Phú Hoà",
    cit_parent: 39,
  },
  {
    cit_id: 479,
    cit_name: "Huyện Đông Hòa",
    cit_parent: 39,
  },
  {
    cit_id: 480,
    cit_name: "Thành phố Nha Trang",
    cit_parent: 28,
  },
  {
    cit_id: 481,
    cit_name: "Thành phố Cam Ranh",
    cit_parent: 28,
  },
  {
    cit_id: 482,
    cit_name: "Huyện Cam Lâm",
    cit_parent: 28,
  },
  {
    cit_id: 483,
    cit_name: "Huyện Vạn Ninh",
    cit_parent: 28,
  },
  {
    cit_id: 484,
    cit_name: "Thị xã Ninh Hòa",
    cit_parent: 28,
  },
  {
    cit_id: 485,
    cit_name: "Huyện Khánh Vĩnh",
    cit_parent: 28,
  },
  {
    cit_id: 486,
    cit_name: "Huyện Diên Khánh",
    cit_parent: 28,
  },
  {
    cit_id: 487,
    cit_name: "Huyện Khánh Sơn",
    cit_parent: 28,
  },
  {
    cit_id: 488,
    cit_name: "Huyện Trường Sa",
    cit_parent: 28,
  },
  {
    cit_id: 489,
    cit_name: "Thành phố Phan Rang-Tháp Chàm",
    cit_parent: 38,
  },
  {
    cit_id: 490,
    cit_name: "Huyện Bác Ái",
    cit_parent: 38,
  },
  {
    cit_id: 491,
    cit_name: "Huyện Ninh Sơn",
    cit_parent: 38,
  },
  {
    cit_id: 492,
    cit_name: "Huyện Ninh Hải",
    cit_parent: 38,
  },
  {
    cit_id: 493,
    cit_name: "Huyện Ninh Phước",
    cit_parent: 38,
  },
  {
    cit_id: 494,
    cit_name: "Huyện Thuận Bắc",
    cit_parent: 38,
  },
  {
    cit_id: 495,
    cit_name: "Huyện Thuận Nam",
    cit_parent: 38,
  },
  {
    cit_id: 496,
    cit_name: "Thành phố Phan Thiết",
    cit_parent: 31,
  },
  {
    cit_id: 497,
    cit_name: "Thị xã La Gi",
    cit_parent: 31,
  },
  {
    cit_id: 498,
    cit_name: "Huyện Tuy Phong",
    cit_parent: 31,
  },
  {
    cit_id: 499,
    cit_name: "Huyện Bắc Bình",
    cit_parent: 31,
  },
  {
    cit_id: 500,
    cit_name: "Huyện Hàm Thuận Bắc",
    cit_parent: 31,
  },
  {
    cit_id: 501,
    cit_name: "Huyện Hàm Thuận Nam",
    cit_parent: 31,
  },
  {
    cit_id: 502,
    cit_name: "Huyện Tánh Linh",
    cit_parent: 31,
  },
  {
    cit_id: 503,
    cit_name: "Huyện Đức Linh",
    cit_parent: 31,
  },
  {
    cit_id: 504,
    cit_name: "Huyện Hàm Tân",
    cit_parent: 31,
  },
  {
    cit_id: 505,
    cit_name: "Huyện Phú Quí",
    cit_parent: 31,
  },
  {
    cit_id: 506,
    cit_name: "Thành phố Kon Tum",
    cit_parent: 36,
  },
  {
    cit_id: 507,
    cit_name: "Huyện Đắk Glei",
    cit_parent: 36,
  },
  {
    cit_id: 508,
    cit_name: "Huyện Ngọc Hồi",
    cit_parent: 36,
  },
  {
    cit_id: 509,
    cit_name: "Huyện Đắk Tô",
    cit_parent: 36,
  },
  {
    cit_id: 510,
    cit_name: "Huyện Kon Plông",
    cit_parent: 36,
  },
  {
    cit_id: 511,
    cit_name: "Huyện Kon Rẫy",
    cit_parent: 36,
  },
  {
    cit_id: 512,
    cit_name: "Huyện Đắk Hà",
    cit_parent: 36,
  },
  {
    cit_id: 513,
    cit_name: "Huyện Sa Thầy",
    cit_parent: 36,
  },
  {
    cit_id: 514,
    cit_name: "Huyện Tu Mơ Rông",
    cit_parent: 36,
  },
  {
    cit_id: 515,
    cit_name: "Huyện Ia H' Drai",
    cit_parent: 36,
  },
  {
    cit_id: 516,
    cit_name: "Thành phố Pleiku",
    cit_parent: 34,
  },
  {
    cit_id: 517,
    cit_name: "Thị xã An Khê",
    cit_parent: 34,
  },
  {
    cit_id: 518,
    cit_name: "Thị xã Ayun Pa",
    cit_parent: 34,
  },
  {
    cit_id: 519,
    cit_name: "Huyện KBang",
    cit_parent: 34,
  },
  {
    cit_id: 520,
    cit_name: "Huyện Đăk Đoa",
    cit_parent: 34,
  },
  {
    cit_id: 521,
    cit_name: "Huyện Chư Păh",
    cit_parent: 34,
  },
  {
    cit_id: 522,
    cit_name: "Huyện Ia Grai",
    cit_parent: 34,
  },
  {
    cit_id: 523,
    cit_name: "Huyện Mang Yang",
    cit_parent: 34,
  },
  {
    cit_id: 524,
    cit_name: "Huyện Kông Chro",
    cit_parent: 34,
  },
  {
    cit_id: 525,
    cit_name: "Huyện Đức Cơ",
    cit_parent: 34,
  },
  {
    cit_id: 526,
    cit_name: "Huyện Chư Prông",
    cit_parent: 34,
  },
  {
    cit_id: 527,
    cit_name: "Huyện Chư Sê",
    cit_parent: 34,
  },
  {
    cit_id: 528,
    cit_name: "Huyện Đăk Pơ",
    cit_parent: 34,
  },
  {
    cit_id: 529,
    cit_name: "Huyện Ia Pa",
    cit_parent: 34,
  },
  {
    cit_id: 530,
    cit_name: "Huyện Krông Pa",
    cit_parent: 34,
  },
  {
    cit_id: 531,
    cit_name: "Huyện Phú Thiện",
    cit_parent: 34,
  },
  {
    cit_id: 532,
    cit_name: "Huyện Chư Pưh",
    cit_parent: 34,
  },
  {
    cit_id: 533,
    cit_name: "Thành phố Buôn Ma Thuột",
    cit_parent: 32,
  },
  {
    cit_id: 534,
    cit_name: "Thị Xã Buôn Hồ",
    cit_parent: 32,
  },
  {
    cit_id: 535,
    cit_name: "Huyện Ea H'leo",
    cit_parent: 32,
  },
  {
    cit_id: 536,
    cit_name: "Huyện Ea Súp",
    cit_parent: 32,
  },
  {
    cit_id: 537,
    cit_name: "Huyện Buôn Đôn",
    cit_parent: 32,
  },
  {
    cit_id: 538,
    cit_name: "Huyện Cư M'gar",
    cit_parent: 32,
  },
  {
    cit_id: 539,
    cit_name: "Huyện Krông Búk",
    cit_parent: 32,
  },
  {
    cit_id: 679,
    cit_name: "Thành phố Vĩnh Long",
    cit_parent: 63,
  },
  {
    cit_id: 541,
    cit_name: "Huyện Krông Năng",
    cit_parent: 32,
  },
  {
    cit_id: 542,
    cit_name: "Huyện Ea Kar",
    cit_parent: 32,
  },
  {
    cit_id: 543,
    cit_name: "Huyện M'Đrắk",
    cit_parent: 32,
  },
  {
    cit_id: 544,
    cit_name: "Huyện Krông Bông",
    cit_parent: 32,
  },
  {
    cit_id: 545,
    cit_name: "Huyện Krông Pắc",
    cit_parent: 32,
  },
  {
    cit_id: 546,
    cit_name: "Huyện Krông A Na",
    cit_parent: 32,
  },
  {
    cit_id: 547,
    cit_name: "Huyện Lắk",
    cit_parent: 32,
  },
  {
    cit_id: 548,
    cit_name: "Huyện Cư Kuin",
    cit_parent: 32,
  },
  {
    cit_id: 549,
    cit_name: "Thị xã Gia Nghĩa",
    cit_parent: 33,
  },
  {
    cit_id: 550,
    cit_name: "Huyện Đăk Glong",
    cit_parent: 33,
  },
  {
    cit_id: 551,
    cit_name: "Huyện Cư Jút",
    cit_parent: 33,
  },
  {
    cit_id: 552,
    cit_name: "Huyện Đắk Mil",
    cit_parent: 33,
  },
  {
    cit_id: 553,
    cit_name: "Huyện Krông Nô",
    cit_parent: 33,
  },
  {
    cit_id: 554,
    cit_name: "Huyện Đắk Song",
    cit_parent: 33,
  },
  {
    cit_id: 555,
    cit_name: "Huyện Đắk R'Lấp",
    cit_parent: 33,
  },
  {
    cit_id: 556,
    cit_name: "Huyện Tuy Đức",
    cit_parent: 33,
  },
  {
    cit_id: 557,
    cit_name: "Thành phố Đà Lạt",
    cit_parent: 29,
  },
  {
    cit_id: 558,
    cit_name: "Thành phố Bảo Lộc",
    cit_parent: 29,
  },
  {
    cit_id: 559,
    cit_name: "Huyện Đam Rông",
    cit_parent: 29,
  },
  {
    cit_id: 560,
    cit_name: "Huyện Lạc Dương",
    cit_parent: 29,
  },
  {
    cit_id: 561,
    cit_name: "Huyện Lâm Hà",
    cit_parent: 29,
  },
  {
    cit_id: 562,
    cit_name: "Huyện Đơn Dương",
    cit_parent: 29,
  },
  {
    cit_id: 563,
    cit_name: "Huyện Đức Trọng",
    cit_parent: 29,
  },
  {
    cit_id: 564,
    cit_name: "Huyện Di Linh",
    cit_parent: 29,
  },
  {
    cit_id: 565,
    cit_name: "Huyện Đạ Huoai",
    cit_parent: 29,
  },
  {
    cit_id: 566,
    cit_name: "Huyện Đạ Tẻh",
    cit_parent: 29,
  },
  {
    cit_id: 567,
    cit_name: "Huyện Cát Tiên",
    cit_parent: 29,
  },
  {
    cit_id: 568,
    cit_name: "Thị xã Phước Long",
    cit_parent: 51,
  },
  {
    cit_id: 569,
    cit_name: "Thị xã Đồng Xoài",
    cit_parent: 51,
  },
  {
    cit_id: 570,
    cit_name: "Thị xã Bình Long",
    cit_parent: 51,
  },
  {
    cit_id: 571,
    cit_name: "Huyện Bù Gia Mập",
    cit_parent: 51,
  },
  {
    cit_id: 572,
    cit_name: "Huyện Lộc Ninh",
    cit_parent: 51,
  },
  {
    cit_id: 573,
    cit_name: "Huyện Bù Đốp",
    cit_parent: 51,
  },
  {
    cit_id: 574,
    cit_name: "Huyện Hớn Quản",
    cit_parent: 51,
  },
  {
    cit_id: 575,
    cit_name: "Huyện Đồng Phú",
    cit_parent: 51,
  },
  {
    cit_id: 576,
    cit_name: "Huyện Bù Đăng",
    cit_parent: 51,
  },
  {
    cit_id: 577,
    cit_name: "Huyện Chơn Thành",
    cit_parent: 51,
  },
  {
    cit_id: 578,
    cit_name: "Huyện Phú Riềng",
    cit_parent: 51,
  },
  {
    cit_id: 579,
    cit_name: "Thành phố Tây Ninh",
    cit_parent: 61,
  },
  {
    cit_id: 580,
    cit_name: "Huyện Tân Biên",
    cit_parent: 61,
  },
  {
    cit_id: 581,
    cit_name: "Huyện Tân Châu",
    cit_parent: 61,
  },
  {
    cit_id: 582,
    cit_name: "Huyện Dương Minh Châu",
    cit_parent: 61,
  },
  {
    cit_id: 583,
    cit_name: "Huyện Châu Thành",
    cit_parent: 61,
  },
  {
    cit_id: 584,
    cit_name: "Thị xã Hòa Thành",
    cit_parent: 61,
  },
  {
    cit_id: 585,
    cit_name: "Huyện Gò Dầu",
    cit_parent: 61,
  },
  {
    cit_id: 586,
    cit_name: "Huyện Bến Cầu",
    cit_parent: 61,
  },
  {
    cit_id: 587,
    cit_name: "Thị xã Trảng Bàng",
    cit_parent: 61,
  },
  {
    cit_id: 588,
    cit_name: "Thành phố Thủ Dầu Một",
    cit_parent: 46,
  },
  {
    cit_id: 589,
    cit_name: "Huyện Bàu Bàng",
    cit_parent: 46,
  },
  {
    cit_id: 590,
    cit_name: "Huyện Dầu Tiếng",
    cit_parent: 46,
  },
  {
    cit_id: 591,
    cit_name: "Thị xã Bến Cát",
    cit_parent: 46,
  },
  {
    cit_id: 592,
    cit_name: "Huyện Phú Giáo",
    cit_parent: 46,
  },
  {
    cit_id: 593,
    cit_name: "Thị xã Tân Uyên",
    cit_parent: 46,
  },
  {
    cit_id: 594,
    cit_name: "Thành phố Dĩ An",
    cit_parent: 46,
  },
  {
    cit_id: 595,
    cit_name: "Thành phố Thuận An",
    cit_parent: 46,
  },
  {
    cit_id: 596,
    cit_name: "Huyện Bắc Tân Uyên",
    cit_parent: 46,
  },
  {
    cit_id: 597,
    cit_name: "Thành phố Biên Hòa",
    cit_parent: 55,
  },
  {
    cit_id: 598,
    cit_name: "Thành phố Long Khánh",
    cit_parent: 55,
  },
  {
    cit_id: 599,
    cit_name: "Huyện Tân Phú",
    cit_parent: 55,
  },
  {
    cit_id: 600,
    cit_name: "Huyện Vĩnh Cửu",
    cit_parent: 55,
  },
  {
    cit_id: 601,
    cit_name: "Huyện Định Quán",
    cit_parent: 55,
  },
  {
    cit_id: 602,
    cit_name: "Huyện Trảng Bom",
    cit_parent: 55,
  },
  {
    cit_id: 603,
    cit_name: "Huyện Thống Nhất",
    cit_parent: 55,
  },
  {
    cit_id: 604,
    cit_name: "Huyện Cẩm Mỹ",
    cit_parent: 55,
  },
  {
    cit_id: 605,
    cit_name: "Huyện Long Thành",
    cit_parent: 55,
  },
  {
    cit_id: 606,
    cit_name: "Huyện Xuân Lộc",
    cit_parent: 55,
  },
  {
    cit_id: 607,
    cit_name: "Huyện Nhơn Trạch",
    cit_parent: 55,
  },
  {
    cit_id: 608,
    cit_name: "Thành phố Vũng Tàu",
    cit_parent: 47,
  },
  {
    cit_id: 609,
    cit_name: "Thành phố Bà Rịa",
    cit_parent: 47,
  },
  {
    cit_id: 610,
    cit_name: "Huyện Châu Đức",
    cit_parent: 47,
  },
  {
    cit_id: 611,
    cit_name: "Huyện Xuyên Mộc",
    cit_parent: 47,
  },
  {
    cit_id: 612,
    cit_name: "Huyện Long Điền",
    cit_parent: 47,
  },
  {
    cit_id: 613,
    cit_name: "Huyện Đất Đỏ",
    cit_parent: 47,
  },
  {
    cit_id: 614,
    cit_name: "Huyện Tân Thành",
    cit_parent: 47,
  },
  {
    cit_id: 615,
    cit_name: "Quận 1",
    cit_parent: 45,
  },
  {
    cit_id: 616,
    cit_name: "Quận 12",
    cit_parent: 45,
  },
  {
    cit_id: 617,
    cit_name: "Quận Thủ Đức",
    cit_parent: 45,
  },
  {
    cit_id: 618,
    cit_name: "Quận 9",
    cit_parent: 45,
  },
  {
    cit_id: 619,
    cit_name: "Quận Gò Vấp",
    cit_parent: 45,
  },
  {
    cit_id: 620,
    cit_name: "Quận Bình Thạnh",
    cit_parent: 45,
  },
  {
    cit_id: 621,
    cit_name: "Quận Tân Bình",
    cit_parent: 45,
  },
  {
    cit_id: 622,
    cit_name: "Quận Tân Phú",
    cit_parent: 45,
  },
  {
    cit_id: 623,
    cit_name: "Quận Phú Nhuận",
    cit_parent: 45,
  },
  {
    cit_id: 624,
    cit_name: "Quận 2",
    cit_parent: 45,
  },
  {
    cit_id: 625,
    cit_name: "Quận 3",
    cit_parent: 45,
  },
  {
    cit_id: 626,
    cit_name: "Quận 10",
    cit_parent: 45,
  },
  {
    cit_id: 627,
    cit_name: "Quận 11",
    cit_parent: 45,
  },
  {
    cit_id: 628,
    cit_name: "Quận 4",
    cit_parent: 45,
  },
  {
    cit_id: 629,
    cit_name: "Quận 5",
    cit_parent: 45,
  },
  {
    cit_id: 630,
    cit_name: "Quận 6",
    cit_parent: 45,
  },
  {
    cit_id: 631,
    cit_name: "Quận 8",
    cit_parent: 45,
  },
  {
    cit_id: 632,
    cit_name: "Quận Bình Tân",
    cit_parent: 45,
  },
  {
    cit_id: 633,
    cit_name: "Quận 7",
    cit_parent: 45,
  },
  {
    cit_id: 634,
    cit_name: "Huyện Củ Chi",
    cit_parent: 45,
  },
  {
    cit_id: 635,
    cit_name: "Huyện Hóc Môn",
    cit_parent: 45,
  },
  {
    cit_id: 636,
    cit_name: "Huyện Bình Chánh",
    cit_parent: 45,
  },
  {
    cit_id: 637,
    cit_name: "Huyện Nhà Bè",
    cit_parent: 45,
  },
  {
    cit_id: 638,
    cit_name: "Huyện Cần Giờ",
    cit_parent: 45,
  },
  {
    cit_id: 639,
    cit_name: "Thành phố Tân An",
    cit_parent: 58,
  },
  {
    cit_id: 640,
    cit_name: "Thị xã Kiến Tường",
    cit_parent: 58,
  },
  {
    cit_id: 641,
    cit_name: "Huyện Tân Hưng",
    cit_parent: 58,
  },
  {
    cit_id: 774,
    cit_name: "Huyện Châu Thành",
    cit_parent: 62,
  },
  {
    cit_id: 643,
    cit_name: "Huyện Mộc Hóa",
    cit_parent: 58,
  },
  {
    cit_id: 644,
    cit_name: "Huyện Tân Thạnh",
    cit_parent: 58,
  },
  {
    cit_id: 645,
    cit_name: "Huyện Thạnh Hóa",
    cit_parent: 58,
  },
  {
    cit_id: 646,
    cit_name: "Huyện Đức Huệ",
    cit_parent: 58,
  },
  {
    cit_id: 647,
    cit_name: "Huyện Đức Hòa",
    cit_parent: 58,
  },
  {
    cit_id: 648,
    cit_name: "Huyện Bến Lức",
    cit_parent: 58,
  },
  {
    cit_id: 649,
    cit_name: "Huyện Thủ Thừa",
    cit_parent: 58,
  },
  {
    cit_id: 650,
    cit_name: "Huyện Tân Trụ",
    cit_parent: 58,
  },
  {
    cit_id: 651,
    cit_name: "Huyện Cần Đước",
    cit_parent: 58,
  },
  {
    cit_id: 652,
    cit_name: "Huyện Cần Giuộc",
    cit_parent: 58,
  },
  {
    cit_id: 653,
    cit_name: "Thành phố Mỹ Tho",
    cit_parent: 60,
  },
  {
    cit_id: 654,
    cit_name: "Thị xã Gò Công",
    cit_parent: 60,
  },
  {
    cit_id: 655,
    cit_name: "Thị xã Cai Lậy",
    cit_parent: 60,
  },
  {
    cit_id: 656,
    cit_name: "Huyện Tân Phước",
    cit_parent: 60,
  },
  {
    cit_id: 657,
    cit_name: "Huyện Cái Bè",
    cit_parent: 60,
  },
  {
    cit_id: 658,
    cit_name: "Huyện Cai Lậy",
    cit_parent: 60,
  },
  {
    cit_id: 772,
    cit_name: "Huyện Châu Thành",
    cit_parent: 52,
  },
  {
    cit_id: 660,
    cit_name: "Huyện Gò Công Tây",
    cit_parent: 60,
  },
  {
    cit_id: 661,
    cit_name: "Huyện Gò Công Đông",
    cit_parent: 60,
  },
  {
    cit_id: 662,
    cit_name: "Huyện Tân Phú Đông",
    cit_parent: 60,
  },
  {
    cit_id: 663,
    cit_name: "Thành phố Bến Tre",
    cit_parent: 52,
  },
  {
    cit_id: 664,
    cit_name: "Huyện Chợ Lách",
    cit_parent: 52,
  },
  {
    cit_id: 665,
    cit_name: "Huyện Mỏ Cày Nam",
    cit_parent: 52,
  },
  {
    cit_id: 666,
    cit_name: "Huyện Giồng Trôm",
    cit_parent: 52,
  },
  {
    cit_id: 667,
    cit_name: "Huyện Bình Đại",
    cit_parent: 52,
  },
  {
    cit_id: 668,
    cit_name: "Huyện Ba Tri",
    cit_parent: 52,
  },
  {
    cit_id: 669,
    cit_name: "Huyện Thạnh Phú",
    cit_parent: 52,
  },
  {
    cit_id: 670,
    cit_name: "Huyện Mỏ Cày Bắc",
    cit_parent: 52,
  },
  {
    cit_id: 671,
    cit_name: "Thành phố Trà Vinh",
    cit_parent: 62,
  },
  {
    cit_id: 672,
    cit_name: "Huyện Càng Long",
    cit_parent: 62,
  },
  {
    cit_id: 673,
    cit_name: "Huyện Cầu Kè",
    cit_parent: 62,
  },
  {
    cit_id: 674,
    cit_name: "Huyện Tiểu Cần",
    cit_parent: 62,
  },
  {
    cit_id: 675,
    cit_name: "Huyện Cầu Ngang",
    cit_parent: 62,
  },
  {
    cit_id: 676,
    cit_name: "Huyện Trà Cú",
    cit_parent: 62,
  },
  {
    cit_id: 677,
    cit_name: "Huyện Duyên Hải",
    cit_parent: 62,
  },
  {
    cit_id: 678,
    cit_name: "Thị xã Duyên Hải",
    cit_parent: 62,
  },
  {
    cit_id: 680,
    cit_name: "Huyện Long Hồ",
    cit_parent: 63,
  },
  {
    cit_id: 681,
    cit_name: "Huyện Mang Thít",
    cit_parent: 63,
  },
  {
    cit_id: 682,
    cit_name: "Huyện  Vũng Liêm",
    cit_parent: 63,
  },
  {
    cit_id: 683,
    cit_name: "Huyện Tam Bình",
    cit_parent: 63,
  },
  {
    cit_id: 684,
    cit_name: "Thị xã Bình Minh",
    cit_parent: 63,
  },
  {
    cit_id: 685,
    cit_name: "Huyện Trà Ôn",
    cit_parent: 63,
  },
  {
    cit_id: 686,
    cit_name: "Huyện Bình Tân",
    cit_parent: 63,
  },
  {
    cit_id: 687,
    cit_name: "Thành phố Cao Lãnh",
    cit_parent: 54,
  },
  {
    cit_id: 688,
    cit_name: "Thành phố Sa Đéc",
    cit_parent: 54,
  },
  {
    cit_id: 689,
    cit_name: "Huyện Hồng Ngự",
    cit_parent: 54,
  },
  {
    cit_id: 690,
    cit_name: "Huyện Tân Hồng",
    cit_parent: 54,
  },
  {
    cit_id: 691,
    cit_name: "Thành phố Hồng Ngự",
    cit_parent: 54,
  },
  {
    cit_id: 692,
    cit_name: "Huyện Tháp Mười",
    cit_parent: 54,
  },
  {
    cit_id: 693,
    cit_name: "Huyện Cao Lãnh",
    cit_parent: 54,
  },
  {
    cit_id: 694,
    cit_name: "Huyện Thanh Bình",
    cit_parent: 54,
  },
  {
    cit_id: 695,
    cit_name: "Huyện Lấp Vò",
    cit_parent: 54,
  },
  {
    cit_id: 696,
    cit_name: "Huyện Lai Vung",
    cit_parent: 54,
  },
  {
    cit_id: 697,
    cit_name: "Thành phố Long Xuyên",
    cit_parent: 49,
  },
  {
    cit_id: 698,
    cit_name: "Thành phố Châu Đốc",
    cit_parent: 49,
  },
  {
    cit_id: 699,
    cit_name: "Huyện An Phú",
    cit_parent: 49,
  },
  {
    cit_id: 700,
    cit_name: "Thị xã Tân Châu",
    cit_parent: 49,
  },
  {
    cit_id: 701,
    cit_name: "Huyện Phú Tân",
    cit_parent: 49,
  },
  {
    cit_id: 702,
    cit_name: "Huyện Châu Phú",
    cit_parent: 49,
  },
  {
    cit_id: 703,
    cit_name: "Huyện Tịnh Biên",
    cit_parent: 49,
  },
  {
    cit_id: 704,
    cit_name: "Huyện Tri Tôn",
    cit_parent: 49,
  },
  {
    cit_id: 705,
    cit_name: "Huyện Thoại Sơn",
    cit_parent: 49,
  },
  {
    cit_id: 706,
    cit_name: "Thành phố Rạch Giá",
    cit_parent: 57,
  },
  {
    cit_id: 707,
    cit_name: "Thành phố Hà Tiên",
    cit_parent: 57,
  },
  {
    cit_id: 708,
    cit_name: "Huyện Kiên Lương",
    cit_parent: 57,
  },
  {
    cit_id: 709,
    cit_name: "Huyện Hòn Đất",
    cit_parent: 57,
  },
  {
    cit_id: 717,
    cit_name: "Huyện Phú Quốc",
    cit_parent: 57,
  },
  {
    cit_id: 711,
    cit_name: "Huyện Tân Hiệp",
    cit_parent: 57,
  },
  {
    cit_id: 712,
    cit_name: "Huyện Giồng Riềng",
    cit_parent: 57,
  },
  {
    cit_id: 713,
    cit_name: "Huyện Gò Quao",
    cit_parent: 57,
  },
  {
    cit_id: 714,
    cit_name: "Huyện An Biên",
    cit_parent: 57,
  },
  {
    cit_id: 715,
    cit_name: "Huyện An Minh",
    cit_parent: 57,
  },
  {
    cit_id: 716,
    cit_name: "Huyện Vĩnh Thuận",
    cit_parent: 57,
  },
  {
    cit_id: 718,
    cit_name: "Huyện Kiên Hải",
    cit_parent: 57,
  },
  {
    cit_id: 719,
    cit_name: "Huyện U Minh Thượng",
    cit_parent: 57,
  },
  {
    cit_id: 720,
    cit_name: "Huyện Giang Thành",
    cit_parent: 57,
  },
  {
    cit_id: 721,
    cit_name: "Quận Ninh Kiều",
    cit_parent: 48,
  },
  {
    cit_id: 722,
    cit_name: "Quận Ô Môn",
    cit_parent: 48,
  },
  {
    cit_id: 723,
    cit_name: "Quận Bình Thuỷ",
    cit_parent: 48,
  },
  {
    cit_id: 724,
    cit_name: "Quận Cái Răng",
    cit_parent: 48,
  },
  {
    cit_id: 725,
    cit_name: "Quận Thốt Nốt",
    cit_parent: 48,
  },
  {
    cit_id: 726,
    cit_name: "Huyện Cờ Đỏ",
    cit_parent: 48,
  },
  {
    cit_id: 727,
    cit_name: "Huyện Thới Lai",
    cit_parent: 48,
  },
  {
    cit_id: 728,
    cit_name: "Thành phố Vị Thanh",
    cit_parent: 56,
  },
  {
    cit_id: 729,
    cit_name: "Thành phố Ngã Bảy",
    cit_parent: 56,
  },
  {
    cit_id: 730,
    cit_name: "Huyện Châu Thành A",
    cit_parent: 56,
  },
  {
    cit_id: 731,
    cit_name: "Huyện Phụng Hiệp",
    cit_parent: 56,
  },
  {
    cit_id: 732,
    cit_name: "Huyện Vị Thuỷ",
    cit_parent: 56,
  },
  {
    cit_id: 733,
    cit_name: "Huyện Long Mỹ",
    cit_parent: 56,
  },
  {
    cit_id: 734,
    cit_name: "Thị xã Long Mỹ",
    cit_parent: 56,
  },
  {
    cit_id: 735,
    cit_name: "Thành phố Sóc Trăng",
    cit_parent: 59,
  },
  {
    cit_id: 736,
    cit_name: "Huyện Kế Sách",
    cit_parent: 59,
  },
  {
    cit_id: 737,
    cit_name: "Huyện Mỹ Tú",
    cit_parent: 59,
  },
  {
    cit_id: 738,
    cit_name: "Huyện Cù Lao Dung",
    cit_parent: 59,
  },
  {
    cit_id: 739,
    cit_name: "Huyện Long Phú",
    cit_parent: 59,
  },
  {
    cit_id: 740,
    cit_name: "Huyện Mỹ Xuyên",
    cit_parent: 59,
  },
  {
    cit_id: 741,
    cit_name: "Thị xã Ngã Năm",
    cit_parent: 59,
  },
  {
    cit_id: 742,
    cit_name: "Huyện Thạnh Trị",
    cit_parent: 59,
  },
  {
    cit_id: 743,
    cit_name: "Thị xã Vĩnh Châu",
    cit_parent: 59,
  },
  {
    cit_id: 744,
    cit_name: "Huyện Trần Đề",
    cit_parent: 59,
  },
  {
    cit_id: 745,
    cit_name: "Thành phố Bạc Liêu",
    cit_parent: 50,
  },
  {
    cit_id: 746,
    cit_name: "Huyện Hồng Dân",
    cit_parent: 50,
  },
  {
    cit_id: 747,
    cit_name: "Huyện Phước Long",
    cit_parent: 50,
  },
  {
    cit_id: 748,
    cit_name: "Huyện Vĩnh Lợi",
    cit_parent: 50,
  },
  {
    cit_id: 749,
    cit_name: "Thị xã Giá Rai",
    cit_parent: 50,
  },
  {
    cit_id: 750,
    cit_name: "Huyện Đông Hải",
    cit_parent: 50,
  },
  {
    cit_id: 751,
    cit_name: "Huyện Hoà Bình",
    cit_parent: 50,
  },
  {
    cit_id: 752,
    cit_name: "Thành phố Cà Mau",
    cit_parent: 53,
  },
  {
    cit_id: 753,
    cit_name: "Huyện U Minh",
    cit_parent: 53,
  },
  {
    cit_id: 754,
    cit_name: "Huyện Thới Bình",
    cit_parent: 53,
  },
  {
    cit_id: 755,
    cit_name: "Huyện Trần Văn Thời",
    cit_parent: 53,
  },
  {
    cit_id: 756,
    cit_name: "Huyện Cái Nước",
    cit_parent: 53,
  },
  {
    cit_id: 757,
    cit_name: "Huyện Đầm Dơi",
    cit_parent: 53,
  },
  {
    cit_id: 758,
    cit_name: "Huyện Năm Căn",
    cit_parent: 53,
  },
  {
    cit_id: 759,
    cit_name: "Huyện Ngọc Hiển",
    cit_parent: 53,
  },
  {
    cit_id: 760,
    cit_name: "Huyện Chợ Mới",
    cit_parent: 49,
  },
  {
    cit_id: 761,
    cit_name: "Huyện Châu Thành",
    cit_parent: 56,
  },
  {
    cit_id: 762,
    cit_name: "Huyện Châu Thành",
    cit_parent: 49,
  },
  {
    cit_id: 763,
    cit_name: "Thành phố Cam Đường",
    cit_parent: 13,
  },
  {
    cit_id: 764,
    cit_name: "Huyện Châu Thành",
    cit_parent: 54,
  },
  {
    cit_id: 765,
    cit_name: "Huyện Tam Nông",
    cit_parent: 54,
  },
  {
    cit_id: 766,
    cit_name: "Huyện Bạch Long Vĩ",
    cit_parent: 2,
  },
  {
    cit_id: 767,
    cit_name: "Huyện Bảo Lâm",
    cit_parent: 29,
  },
  {
    cit_id: 768,
    cit_name: "Huyện Vĩnh Hưng",
    cit_parent: 58,
  },
  {
    cit_id: 769,
    cit_name: "Huyện Châu Thành",
    cit_parent: 58,
  },
  {
    cit_id: 771,
    cit_name: "Huyện Châu Thành",
    cit_parent: 60,
  },
  {
    cit_id: 777,
    cit_name: "Thị xã Phú Mỹ",
    cit_parent: 47,
  },
  {
    cit_id: 775,
    cit_name: "Huyện Phong Điền",
    cit_parent: 48,
  },
  {
    cit_id: 776,
    cit_name: "Huyện Vĩnh Thạnh",
    cit_parent: 48,
  },
  {
    cit_id: 778,
    cit_name: "Thị xã Nghi Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 779,
    cit_name: "Huyện Châu Thành",
    cit_parent: 59,
  },
];

function deleteCookie(cookieName) {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "";
}

function setCookie(name, value, exdays) {
  let day = new Date();
  day.setDate(day.getDate() + exdays);
  let expires = "expires=" + day.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; " + "path=/";
}

function setMultipleCookie(
  token,
  id,
  auth,
  type,
  name,
  phone,
  logo,
  rf_token,
  percentHoSo = ""
) {
  setCookie(cookieToken, token, 60);
  setCookie(cookieId, id.toString(), 60);
  setCookie(cookieAuth, auth.toString(), 60);
  setCookie(cookieType, type.toString(), 60);
  setCookie(cookiePhone, phone, 60);
  setCookie(cookieName, name, 60);
  setCookie("percentHoSo", percentHoSo, 60);
  logo && setCookie(cookieLogo, logo, 60);
  rf_token && setCookie(cookieRfToken, rf_token, 60);
  setCookie(cookieLogin, "true", 60);
}

function syncTime() {
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          const parseValue = JSON.parse(value);
          if ("expires" in parseValue && "data" in parseValue) {
            const newData = {
              data: parseValue.data,
              expires: expiryDate,
            };
            localStorage.setItem(key, JSON.stringify(newData));
          }
        }
      }
    }
  } catch (error) { }
}

function saveDataWithTime(name, data) {
  try {
    if (!data) {
      return;
    }
    const expireDays = new Date();
    expireDays.setDate(expireDays.getDate() + 60);
    let saveData = {
      data,
      expires: expireDays,
    };
    localStorage.setItem(name, JSON.stringify(saveData));
    syncTime();
  } catch (e) {
    return;
  }
}

function setAll(name, phone, ava) {
  name && saveDataWithTime(cookieName, name);
  phone && saveDataWithTime(cookiePhone, phone);
  ava && saveDataWithTime(cookieLogo, ava);
}

function setCandiAllowEmployerSearch(allow) {
  saveDataWithTime(cookieCandiAllowSearch, allow);
}

function downloadAsPDF(base64String, cv_name) {
  const downloadLink = document.createElement("a");
  downloadLink.target = "_blank";
  downloadLink.href = base64String;
  downloadLink.download = `${cv_name}.pdf`;
  downloadLink.click();
}

function downloadCVNTD(uid, cvid) {
  $.ajax({
    url: "/api/downloadcv",
    type: "POST",
    data: {
      uid, // người nhận
      cvid,
    },
    dataType: "json",
    success: function (data) {
      if (data.data && data.data.result) {
        alert(data.data.file);
        downloadAsPDF(`data:application/octet-stream;base64,${data.data.file}`, uid);
      }
    },
    error: (err) => {
      console.log(err);
      window.alert(JSON.stringify(err));
    },
  });
}
var timeoutPagi;
var focusoutActive = (e) => {
  let page = $(e.target).parents(".cv_page").attr("data-page");
  if (timeoutPagi) {
    clearTimeout(timeoutPagi);
  }
  //page)

  // if (page > 1) {
  //   adjustPage(page - 1);
  // } else {
  //   adjustPage(page);
  // }
  page = page > 1 ? page - 1 : page;
  timeoutPagi = setTimeout(() => { adjustPage(page) }, 1000);
};

$(document).ready(function () {
  $(document).on("click", ".fieldgroup_controls .remove", function (e) {
    var item = $(this).parent().parent();

    const parent = $(this).parent().parent().parent();
    const totalItems = parent.find(".ctbx").length;
    // if (totalItems === 1) {
    // 	window.alert('Xin hãy dùng nút ẩn')
    // 	return
    // }
    var itemId = item.attr("id");
    var parentRemoveId = "#" + item.parent().attr("id");
    item.remove();
    for (var h = 0; h < sortAbleArea.length; h++) {
      if (sortAbleArea[h].el === parentRemoveId) {
        $.removeItem(sortAbleArea[h].area, itemId);

        $.initSortable(sortAbleArea[h], false);
        $.upAndDown(item, sortAbleArea[h].el);

        return false;
      }
    }
  });

  $(document).on("click", ".fieldgroup_controls .clone", function (e) {
    var item = $(this).parent().parent().clone();
    item.attr("id", $.randomStr);
    item.appendTo($(this).parent().parent().parent());
    for (var t = 0; t < sortAbleArea.length; t++) {
      if (sortAbleArea[t].el === "#" + item.parent().attr("id")) {
        var area = sortAbleArea[t];
        $.createOrder(area.area, item.attr("id"), $(area.el).children().length);
        $.initSortable(area, false);
        $.upAndDown(item, area.el);
        return false;
      }
    }
    const pathname = window.location.pathname;
    const checkMobile = isMobile.any();
    // if (!list.includes(pathname)) {
    if (isMobile.any()) {
      changeLayoutCv();
    }
    // }
  });

  $(document).on("click", ".blockControls .hide", function (e) {
    try {
      var item = $(this).parent().parent();
      var itemId = item.attr("id");
      var parentRemoveId = "#" + item.parent().attr("id");
      item.hide();
      for (var h = 0; h < sortAbleArea.length; h++) {
        if (sortAbleArea[h].el === parentRemoveId) {
          $.hideBlock(sortAbleArea[h].area, itemId);

          $.initSortable(sortAbleArea[h], false);

          $.upAndDown(item, sortAbleArea[h].el);

          break;
        }
      }
      const blockKey = $(this).parent().parent().attr("id");
      if (blockKey) {
        const blockMain = blockKey?.includes("box") ? "menu" : "experiences";
        doi_muc(
          document.querySelector(`[data-blockkey=${blockKey}]`),
          blockKey,
          blockMain
        );
      }
      adjustPage(1);
    } catch (error) {
      console.log(error);
    }
  });

  $(document).on("click", ".js-edit-content", function (e) {
    $(this).parent().parent().addClass("edit-content");
    $(this).parent().html('<div class="save js-save-content">Save</div>');
  });

  //fix input can be character
  $(document).on("keydown", ".bar-value-exp input", function (e) {
    var charCode = e.which ? e.which : e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
      return false;
    }
  });

  $(document).on("input", ".bar-value-exp input", function (e) {
    if ($(this).val() > 100) {
      $(this).val(100);
    } else if ($(this).val() < 0) {
      $(this).val(0);
    }
  });

  $(document).on("click", ".js-save-content", function (e) {
    var div = $(this).parent().parent();
    var bar = div.removeClass("edit-content").find(".bar-exp");
    var p = div.find(".bar-value-exp input").val();
    if (p > 100) {
      p = 100;
    } else if (p < 0) {
      p = 0;
    }
    div.find(".bar-value-exp input").val(p);
    bar.find("div").css("width", `${p}%`);
    // bar.html('<div style="width: ' + p + '%"></div>');
    $(this)
      .parent()
      .html(
        '<div class="clone"><i class="fa fa-plus"></i> Thêm</div>\n' +
        '<div class="edit js-edit-content">Sửa</div>\n' +
        '<div class="remove"><i class="fa fa-minus"></i> Xóa</div>'
      );
  });

  $(document).on("click", ".js-save-content", function (e) {
    var div = $(this).parent().parent();
    var bar = div.removeClass("edit-content").find(".bar-exp");
    var p = div.find(".bar-value-exp input").val();
    if (p > 100) {
      p = 100;
    } else if (p < 0) {
      p = 0;
    }
    div.find(".bar-value-exp input").val(p);
    console.log("exp: ", p);
    bar.find("div").css("width", `${p}%`);
    $(this)
      .parent()
      .html(
        '<div class="clone"><i class="fa fa-plus"></i> Thêm</div>\n' +
        '<div class="edit js-edit-content">Sửa</div>\n' +
        '<div class="remove"><i class="fa fa-minus"></i> Xóa</div>'
      );
  });

  $(".btn_xemtruoc").click(() => {
    xemtruoc_cv();
  });

  //Declare sortable area and item want to sort here
  var sortAbleArea = [
    { el: "#sortable", item: ".block", area: "menu" },
    { el: "#sort_block", item: ".cvo-block", area: "experiences" },
  ];

  //Initial json data
  var data = {
    css: [],
    cv_title: "",
    avatar: "",
    name: "",
    position: "",
    introduction: "",
    menu: [],
    experiences: [],
  };

  //Create order data for first time
  $.createOrder = function (area, id, order) {
    var sub = { id: id, order: order, content: "" };
    let check = data[area].find((item) => item.id == sub.id);
    if (!check) {
      data[area].push(sub);
    }
  };

  //Remove item from data
  $.removeItem = function (area, id) {
    data[area].forEach(function (arrayItem, index) {
      if (data[area][index].id === id) {
        data[area].splice(index, 1);
      }
    });
  };

  //Hide block from data
  $.hideBlock = function (area, id) {
    data[area].forEach(function (arrayItem, index) {
      if (data[area][index].id === id) {
        // data[area][index].status = 'hide'
        $("#layout-editor")
          .find("[blockkey='" + id + "']")
          .removeClass("active");
      }
    });
  };

  $.showBlock = function (area, id) {
    data[area].forEach(function (arrayItem, index) {
      if (data[area][index].id === id) {
        // data[area][index].status = null
      }
    });
  };
  //Update order by id
  $.updateOrder = function (area, id, order) {
    for (var i = 0; i < data[area].length; i++) {
      if (data[area][i].id === id) {
        data[area][i].order = order;

        return false;
      }
    }
  };

  $.initSortable = function (sortable, updown) {
    console.log(sortable);
    var item = $(sortable.el + " " + sortable.item);
    let listItem = [];
    let orderData = 1;
    item.each(function () {
      let self = $(this);
      let check = listItem.find((itemData) => itemData.id == self.attr("id"));
      if (!check) {
        listItem.push({ id: self.attr("id"), order: orderData });
        orderData++;
      }
    });
    // if ($('#form-cv .cv_page').length) {
    //     item = $($('.blockControls').parents(sortable.el + ' ' + sortable.item).get().reverse());
    // }
    //Handle sortable
    let connect = "";
    if (sortable.el == "sort_block") {
      connect = ".connectedSortable.sort_block";
    } else {
      connect = ".connectedSortable.sortable";
    }
    $(sortable.el).sortable({
      cancel: "input, [contenteditable]",
      connectWith: connect,
      // connectWith: '.connectedSortable',
      create: function (event, ui) {
        $.each(listItem, function (i, val) {
          $.createOrder(sortable.area, val.id, val.order);
        });
      },
      start: function (event, ui) {
        merge_block(ui.item);
      },
      stop: function (event, ui) {
        let page = ui.item.parents(".cv_page").attr("data-page");
        page = Number(page);
        page - 1 > 0 ? adjustPage(page - 1) : adjustPage(page);
      },
      update: function (event, ui) {
        var item = $(sortable.el + " " + sortable.item); //Lấy các phần tử chính có thẻ blockControls, không lấy phần tử chia
        let listItem = [];
        let orderData = 1;
        item.each(function () {
          let self = $(this);
          let check = listItem.find(
            (itemData) => itemData.id == self.attr("id")
          );
          if (!check) {
            listItem.push({ id: self.attr("id"), order: orderData });
            orderData++;
          }
        });
        $.each(listItem, function (i, val) {
          $(`#${val.id}`).css("opacity", 1);
          $.updateOrder(sortable.area, val.id, val.order);
        });
      },
    });
    if (updown) {
      $.upAndDown(item, sortable.el);
    }
  };

  $.upAndDown = function (items, sortableEl) {
    items.each(function callback(item, i) {
      var self = $(this);
      let id = self.attr("id");
      if (id) {
        $(document).on("click", `#${id} .up`, function (e) {
          //tien long them
          // rearrangeOrder();
          let order = items.toArray().indexOf(self) + 1;

          self = $(`#${id}`);
          if (self.parents("#cv-content").length) {
            let find_order = data["experiences"].find((x) => x.id == id);
            order = find_order.order;
          } else {
            let find_order = data["menu"].find((x) => x.id == id);
            order = find_order.order;
          }
          merge_block(self);

          if (order > 0) {
            if (self.parents("#cv-content").length) {
              let find_data = data["experiences"].find(
                (x) => x.order == order - 1
              );
              var prev = $(`#${find_data.id}`);
            } else {
              let find_data = data["menu"].find((x) => x.order == order - 1);
              var prev = $(`#${find_data.id}`);
            }
            merge_block(prev);
            if (
              prev.parents("#cv-content").length ||
              prev.parents("#cv-main").length
            ) {
              self.insertBefore(prev);
            }
            $(sortableEl).sortable("option", "update")();
            //tien long them
            // focusoutActive(e)
          }
        });

        $(document).on("click", `#${id} .down`, function (e) {
          //tien long them
          // rearrangeOrder();
          let order = items.toArray().indexOf(self) + 1;
          self = $(`#${id}`);
          let max = 0;
          if (self.parents("#cv-content").length) {
            let find_order = data["experiences"].find((x) => x.id == id);
            order = find_order.order;
            max = data["experiences"].length;
          } else {
            let find_order = data["menu"].find((x) => x.id == id);
            order = find_order.order;
            max = data["menu"].length;
          }
          merge_block(self);
          if (order < max) {
            if (self.parents("#cv-content").length) {
              let find_data = data["experiences"].find(
                (x) => x.order == order + 1
              );
              var next = $(`#${find_data.id}`);
            } else {
              let find_data = data["menu"].find((x) => x.order == order + 1);
              var next = $(`#${find_data.id}`);
            }
            merge_block(next);
            if (
              next.parents("#cv-content").length ||
              next.parents("#cv-main").length
            ) {
              self.insertAfter(next);
            }
            $(sortableEl).sortable("option", "update")();
            //tien long them
            // focusoutActive(e)
          }
        });
      }
    });
  };

  if (
    !$("#toolbar-color").hasClass("mobile") &&
    $("#page-cv").attr("data-type") != "mobile"
  ) {
    // changeLayoutCv()
    // const pathname = window.location.pathname;
    // if (!list.includes(pathname)) {
    //   changeLayoutCv();
    // }

    $(document).on("focusout", function (e) {
      // let page = $(e.target).parents(".cv_page").attr("data-page");
      // //page)
      // if (!page) {
      //   page = $(".cv_page").length || 1;
      // }
      // if (page > 1) {
      //   adjustPage(page - 1);
      // } else {
      //   adjustPage(page);
      // }
      // $(e.target).focus();
      focusoutActive(e);
    });
    $(document).on('focus', 'div[contenteditable="true"]', function (e) {
      console.log('test');
      console.log('Timeout:', timeoutPagi)
      if (timeoutPagi) {
        console.log('clearTO');
        clearTimeout(timeoutPagi)
      }
    })

    if ($("#form-cv .cv_page").length) {
      var sortAbleArea = [
        { el: ".sortable", item: ".block", area: "menu" },
        { el: ".sort_block", item: ".cvo-block", area: "experiences" },
      ];
    }

    $(document).on("click", function (e) {
      if (!$("#toolbar-color").hasClass("mobile")) {
      }
    });
  }
  // check_cv_begin()
  //Start create data
  for (var l = 0; l < sortAbleArea.length; l++) {
    $.initSortable(sortAbleArea[l], true);
  }
  //Get content and export to json data

  // CLICK

  // const rearrangeOrder = () => {
  //   const pathname = window.location.pathname;
  //   const allow = ["/cv365/tao-cv-sinh-vien-moi-ra-truong/mau-12"];
  //   // return;
  //   if (!allow.includes(pathname)) return;
  //   var sortAbleArea = [
  //     { el: ".sortable", item: ".block", area: "menu" },
  //     { el: ".sort_block", item: ".cvo-block", area: "experiences" },
  //   ];
  //   sortAbleArea?.forEach((sortable) => {
  //     var item = $(sortable.el + " " + sortable.item); //Lấy các phần tử chính có thẻ blockControls, không lấy phần tử chia
  //     let listItem = [];
  //     let orderData = 1;
  //     item.each(function (e) {
  //       console.log(e.target);
  //       let self = $(this);
  //       console.log(self.attr("id"));
  //       let check = listItem.find((itemData) => itemData.id == self.attr("id"));
  //       if (!check) {
  //         listItem.push({ id: self.attr("id"), order: orderData });
  //         orderData++;
  //       }
  //     });
  //     adjustPage();
  //     $.each(listItem, function (i, val) {
  //       $(`#${val.id}`).css("opacity", 1);
  //       $.updateOrder(sortable.area, val.id, val.order);
  //     });
  //   });
  // };

  // rearrangeOrder();

  $.exportData = function () {

    // console.log('>>> data["menu"]: ', data["menu"]);
    // console.log('>>> data["experiences"]: ', data["experiences"]);
    // console.log('>>> data exportData: ', data);

    for (let sortItem of sortAbleArea) {
      var item = $(sortItem.el + ' ' + sortItem.item)
      let listItem = []
      let orderData = 1
      item.each(function () {
        let self = $(this)
        let check = listItem.find((itemData) => itemData.id == self.attr('id'))
        if (!check) {
          listItem.push({ id: self.attr('id'), order: orderData })
          orderData++
        }
      })
      for (let itemData of data[sortItem.area]) {
        let itemCheck = listItem.find((item) => item.id == itemData.id)
        itemData.order = itemCheck.order
      }
      data[sortItem.area] = data[sortItem.area].sort((a, b) => {
        return a.order - b.order
      })
    }
    // tien long them
    data["css"] = {
      color: $("#toolbar-color .color.active").attr("data-color"),
      font: $("#font-selector").find("option:selected").val(),
      font_size: $("#cvo-toolbar .fontsize.active").attr("data-size"),
      font_spacing: $("#cvo-toolbar .line-height.active").attr("data-spacing"),
    };
    var cv_title = $("#page-cv #cv-title").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();

    // console.log('>>> check cv_title: ', cv_title);

    if (cv_title == "") {
      cv_title = $("#cv_alias").val();
    }
    data["cv_title"] = cv_title;
    let src = $("#page-cv #cvo-profile-avatar").attr("src");
    const splited = src?.split("/");
    data["avatar"] = src;
    data["name"] = $("#cv-profile-fullname").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();
    data["position"] = $("#cv-profile-job").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();
    data["introduction"] = $("#cv-profile-about").html();
    data["background"] = $("#form-cv").attr("data-background")
      ? $("#form-cv").attr("data-background")
      : "";

    //fix fake_img và background khi có background mới
    if (data.background) {
      console.log(data.background)
      $('.fake_img').css('display', 'none')
      let url_image = data.background
      let url_full = `https://storage.timviec365.vn/timviec365${url_image}`
      $('#form-cv').attr('data-background', url_image)
      $('#form-cv').css('background', 'unset')

      if ($('#form-cv .cv_page').length) {
        $('#form-cv .cv_page').css('background', `url(${url_full})`).css('background-size', 'cover').css('background-position', 'center')
      } else {
        $('#form-cv').css('background', `url(${url_full})`).css('background-size', 'cover').css('background-position', 'center')
      }
      $('#prof .icoweb').css('color', 'black')
    }
    //export data for box menu
    let page_count = $("#form-cv .cv_page").length;

    // console.log('>>> check pageCount: ', page_count);

    if (page_count > 0) {
      data["experiences"].forEach(function callback(item, key) {
        var tmpItemAll = $('#form-cv').find('#' + item.id)
        if (tmpItemAll.length && data['experiences'][key].content) {
          data['experiences'][key].content = []
        }
        // if (data["experiences"][key].content) {
        //   data["experiences"][key].content = [];
        // }
      });
      //Sắp xếp lại thứ tự
      // rearrangeOrder();
      for (let i = 0; i < page_count; i++) {
        //export data for box menu
        for (var k = 0; k < data["menu"].length; k++) {
          var tmpItem = $("#form-cv .cv_page")
            .eq(i)
            .find("#" + data["menu"][k].id);
          var tmpItemAll = $('#form-cv').find('#' + data['menu'][k].id)
          var content = "";
          var status = ''

          if (tmpItemAll.length == 0 || tmpItemAll.is(':hidden')) {
            status = 'hide'
          }
          data['menu'][k].status = status
          if (tmpItemAll.length) {
            if (
              tmpItem.hasClass("box-contact") ||
              tmpItem.find("#cv-profile-phone").length
            ) {
              var phone = $("#cv-profile-phone").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();
              var email = $("#cv-profile-email").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();

              content = {
                type: "profile",
                content: {
                  birthday: $("#cv-profile-birthday").text(),
                  sex: $("#cv-profile-sex").text(),
                  phone: phone,
                  email: email,
                  address: $("#cv-profile-address").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
                  face: $("#cv-profile-face").text(),
                },
              };
            } else if (tmpItem.hasClass("box-skills")) {
              content = {
                type: "skill",
                skills: [],
              };

              $(".box-skills .ctbx").each(function () {
                let width = 0;
                if ($(this).find(".bar-exp div")[0]) {
                  const widthString =
                    $(this).find(".bar-exp div")[0].style.width;
                  width = Number(widthString?.replace("%", ""));
                }
                content.skills.push({
                  name: $(this).find(".skill-name").text(),
                  exp: width,
                });
              });
            } else {
              content = tmpItem.find(".box-content").html();
            }
            // var status = "";
            // if (tmpItem.is(":hidden") == true) {
            //   status = "hide";
            // }
            if (content) {
              data["menu"][k].content = {
                title: tmpItem.find(".box-title").text(),
                content: content,
              };
            }
            // data["menu"][k].status = status;
          }
        }
        //export data for box experience
        for (var k = 0; k < data["experiences"].length; k++) {
          if (data["experiences"][k].id) {
            var tmpItem = $("#form-cv .cv_page")
              .eq(i)
              .find("#" + data["experiences"][k].id);
            var tmpItemAll = $('#form-cv').find('#' + data['experiences'][k].id)
            var content = data['experiences'][k].content.content ? data['experiences'][k].content.content : []
            //export data for box experience
            var status = ''
            if (tmpItemAll.length == 0 || tmpItemAll.is(':hidden')) {
              status = 'hide'
            }
            data['experiences'][k].status = status
            if (tmpItemAll.length) {
              // var content = data["experiences"][k].content.content
              //   ? data["experiences"][k].content.content
              //   : [];
              //export data for box experience
              for (var m = 0; m < tmpItem.find(".experience").length; m++) {
                var tmpExp = $("#form-cv .cv_page")
                  .eq(i)
                  .find(
                    "#" +
                    data["experiences"][k].id +
                    " #" +
                    tmpItem.find(".experience")[m].id
                  );
                var content1 = tmpExp.find(".exp-content").html();
                content.push({
                  title: tmpExp.find(".exp-title").html(),
                  date: tmpExp.find(".exp-date").text(),
                  subtitle: tmpExp.find(".exp-subtitle").html(),
                  content: content1,
                });
              }
              // var status = "";
              // if (tmpItem.is(":hidden") == true) {
              //   status = "hide";
              // }
              if (data["experiences"][k].content.title) {
                data["experiences"][k].content.content = content;
              } else {
                data["experiences"][k].content = {
                  title: tmpItem.find(".block-title").text(),
                  content: content,
                };
                // data["experiences"][k].status = status;
              }
            }
          }
        }
      }
    } else {
      //export data for box menu
      for (var k = 0; k < data["menu"].length; k++) {
        var tmpItem = $("#" + data["menu"][k].id);
        var content = "";
        if (tmpItem.hasClass("box-contact")) {
          var phone = $("#cv-profile-phone").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();
          var email = $("#cv-profile-email").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();
          content = {
            type: "profile",
            content: {
              birthday: $("#cv-profile-birthday").text(),
              sex: $("#cv-profile-sex").text(),
              phone: phone,
              email: email,
              address: $("#cv-profile-address").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
              face: $("#cv-profile-face").text(),
            },
          };
        } else if (tmpItem.hasClass("box-skills")) {
          content = {
            type: "skill",
            skills: [],
          };
          $(".box-skills .ctbx").each(function () {
            content.skills.push({
              name: $(this).find(".skill-name").text(),
              exp: $(this).find(".bar-value-exp input").val(),
            });
          });
        } else {
          content = tmpItem.find(".box-content").html();
        }
        var status = "";
        if (tmpItem.is(":hidden") == true) {
          status = "hide";
        }
        data["menu"][k].content = {
          title: tmpItem.find(".box-title").text(),
          content: content,
        };
        data["menu"][k].status = status;
      }
      for (var k = 0; k < data["experiences"].length; k++) {
        var tmpItem = $("#" + data["experiences"][k].id);
        var content = [];
        //export data for box experience
        for (var m = 0; m < tmpItem.find(".experience").length; m++) {
          var tmpExp = $(
            "#" +
            data["experiences"][k].id +
            " #" +
            tmpItem.find(".experience")[m].id
          );
          var content1 = tmpExp.find(".exp-content").html();
          content.push({
            title: tmpExp.find(".exp-title").html(),
            date: tmpExp.find(".exp-date").text(),
            subtitle: tmpExp.find(".exp-subtitle").html(),
            content: content1,
          });
        }
        var status = "";
        if (tmpItem.is(":hidden") == true) {
          status = "hide";
        }
        data["experiences"][k].content = {
          title: tmpItem.find(".block-title").text(),
          content: content,
        };
        data["experiences"][k].status = status;
      }
    }
    // up and down
    data?.menu?.forEach((item, index) => {
      // console.log(item, 'item')
      // $.createOrder('.sortable', item?.id, $('.sortable').children().length)
      var sub = { id: item?.id, order: item?.order, content: item?.content };
      let check = data["menu"].find((item) => item.id == sub.id);
      // console.log(check, `check ${index}`)
      if (!check) {
        // console.log(sub, 'sub')
        data["menu"].push(sub);
      }
    });
    if (window.location.pathname == "/cv365/tao-cv-thiet-ke-my-thuat/mau-10") {
      const checkBox01 = data?.menu?.some((item) => {
        return item?.id === "box01";
      });
      !checkBox01 &&
        data?.menu.unshift({
          id: "box01",
          order: 1,
          content: {
            title: "\n   \n  \n   \n    \n   \n  \n   THÔNG TIN LIÊN HỆ",
            content: {
              type: "profile",
              content: {
                birthday: "29/02/2000",
                sex: "Nữ",
                phone: "098567567567",
                email: "test@gmail.com",
                address: "Số 1 đường Cầu Giấy",
                face: "",
              },
            },
          },
          status: "",
        });
      //reOrder
      data?.menu?.forEach((item, index) => {
        item.order = index + 1;
      });
    }
    var ar_data = JSON.stringify(data);
    return ar_data;
  };
  $.exportData();
  check_cv_begin()
  var is_busy = false;

  $("#btn-save-cv,#btn-save-cv-download").on("click", function () {
    let type = "",
      allowSendChat = 0;
    if ($(this).attr("data-type") == "download") {
      type = "download";
      allowSendChat = 1;
    }
    $(window).scrollTop(0);
    $(window).scrollLeft(0);

    var phone = $("#cv-profile-phone").text().trim();
    var email = $("#cv-profile-email").text().trim();
    var address = $("#cv-profile-address").text().trim();
    var fname = $("#cv-profile-fullname").text().trim();

    if (phone == "" || email == "" || fname == "" || address == "") {
      if (fname == "") {
        document.getElementById("cv-profile-fullname").style.outline =
          "1px dashed red";
      }
      if (phone == "") {
        document.getElementById("cv-profile-phone").style.outline =
          "1px dashed red";
      }
      if (email == "") {
        document.getElementById("cv-profile-email").style.outline =
          "1px dashed red";
      }
      if (address == "" && document.getElementById("cv-profile-birthday")) {
        document.getElementById("cv-profile-address").style.outline =
          "1px dashed red";
      }
      var msg =
        '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">';
      msg +=
        '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
      var text_mis = "";
      if ("" == fname) {
        text_mis += "Họ tên,";
        document.getElementById("cv-profile-fullname").style.outline =
          "1px dashed red";
      }
      if ("" == email) {
        text_mis += "Email,";
        document.getElementById("cv-profile-email").style.outline =
          "1px dashed red";
      }
      if ("" == phone) {
        text_mis += "Số điện thoại,";
        document.getElementById("cv-profile-phone").style.outline =
          "1px dashed red";
      }
      if ("" == address) {
        text_mis += "Địa chỉ,";
        document.getElementById("cv-profile-address").style.outline =
          "1px dashed red";
      }
      text_mis = text_mis.substring(0, text_mis.length - 1);
      msg +=
        'Bạn chưa điền đầy đủ các trường: <span style="color:red">' +
        text_mis +
        "</span></div></div>";
      msg += '<div class="el-message-box__btns">';
      msg +=
        '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
      $("body").append(msg);
      return false;
    }

    if (!/^[0-9]+$/.test(phone)) {
      var msg =
        '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">';
      msg +=
        '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
      msg += "Số điện thoại không hợp lệ</div></div>";
      msg += '<div class="el-message-box__btns">';
      msg +=
        '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
      $("body").append(msg);
      document.getElementById("cv-profile-phone").style.outline =
        "1px dashed red";
      return false;
    }

    if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)) {
      var msg =
        '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">';
      msg +=
        '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
      msg += "Email không hợp lệ</div></div>";
      msg += '<div class="el-message-box__btns">';
      msg +=
        '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
      $("body").append(msg);
      document.getElementById("cv-profile-email").style.outline =
        "1px dashed red";
      return false;
    }
    if (phone.length < 10) {
      var msg =
        '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">';
      msg +=
        '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
      msg += "Số điện thoại tối thiểu 10 ký tự</div></div>";
      msg += '<div class="el-message-box__btns">';
      msg +=
        '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
      $("body").append(msg);
      document.getElementById("cv-profile-phone").style.outline =
        "1px dashed red";
      return false;
    }

    //Check nội dung cv
    if (!check_cv_content()) {
      return false;
    }

    // $('#cvo-toolbar').removeClass('fx');
    // $('body').append('<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
    const json_html_cv = $.exportData();

    var ckcook = $("#ckcook").val();
    if (ckcook == 1) {
      var x = $("#cv-profile-phone").text();
      var y = $("#cv-profile-email").text();
      // $('#cv-profile-phone').text('Xem ở trên');
      // $('#cv-profile-email').text('Xem ở trên');
    }

    $(".bar-value-exp").hide();
    $(".bar-exp").show();
    $(".bg-spinner").remove();
    $("body").append(
      '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
    );
    var cvid = $("#cvid").val();
    var height_cv = $("#form-cv").height();
    var lang = $("#cvo-toolbar-lang .active").attr("data-lang");
    $.ajax({
      type: "POST",
      url: "save.php",
      async: true,
      data: {
        json_html_cv,
        cvid,
        height_cv,
        lang,
        allowSendChat,
      },
      dataType: "json",
      beforeSend: function (response) {
        $(".bg-spinner").remove();
        $("body").append(
          '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
        );
      },
      success(response) {
        $(".bg-spinner").remove();
        var url = getCookie("url");
        if (isMac) {
          openChat(1192, linkChatMac, 'SendCv')
          // $('.popup_send_chat .btn_close').attr('onclick', `update_cv(${uid})`);
          // $(".popup_send_chat").find(".qr_area").html("");
          // let id_chat365 = get_Cookie_c("id_chat365"),
          //   uid_type = get_Cookie_c("UT");
          // let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
          //   id_chat365
          // )}%26contactId=${btoa("1191")}%26type365=${uid_type}&efr=1`;
          // let qr_box = $(".popup_send_chat").find(".qr_area")[0];
          // var QR_CODE = new QRCode(qr_box, {
          //   width: 110,
          //   height: 110,
          //   colorDark: "#000000",
          //   colorLight: "#ffffff",
          //   correctLevel: QRCode.CorrectLevel.L,
          // });
          // QR_CODE.makeCode(link_qr);
          // $(".popup_send_chat").show();
          // $(".popup_send_chat .download_mobile").hide();
          // $(".popup_send_chat .download_pc .btn_area").hide();
          // if (url != "") {
          //   $("#popup_back_ut").show();
          //   $(".back_ut").attr("href", url);
          //   document.cookie =
          //     "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          // } else {
          //   $(".popup_send_chat").show();
          // }
        } else if (isMobile.any()) {
          if (isMobile.any()) {
            var url = getCookie("url");
            if (url != "") {
              $("#popup_back_ut").show();
              $(".back_ut").attr("href", url);
              document.cookie =
                "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            } else {
              $(".popup_send_chat").show();
            }
            openChatMobile(1192);
          }
          // openChatMobile(1192);
        } else {
          openChat(0, linkChatWf, "SendCv");
          if (url != "") {
            $("#popup_back_ut").show();
            $(".back_ut").attr("href", url);
            document.cookie =
              "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        }

        // window.location.href = "/ung-vien/danh-sach-mau-cv";
      },
    });
  });

  $.randomStr = function () {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  //Them tool
  $(document).on("click", "#toolbar-color .pos_clr .color", function (e) {
    // if (!isMobile.any()) {
    var oldcolor = $("#toolbar-color .color.active").attr("data-color");
    $("#toolbar-color .pos_clr .color").removeClass("active");
    $(this).addClass("active");
    var newcolor = $(this).attr("data-color");
    $("#color_active").css("background-color", "#" + newcolor);
    var oldlink = $("#cv-color-css").attr("href");
    if (oldlink) {
      var newlink = oldlink.replace(oldcolor, newcolor);
    }
    $("#cv-color-css").attr("href", newlink);
    // }
  });

  // if(window.location.href.includes){

  // }

  $(document).on("click", "#cvo-toolbar-lang .btn-lang-option", function () {
    var lang = $(this).attr("data-lang");
    $.ajax({
      cache: false,
      type: "POST",
      url: "site/loadLang",
      dataType: "json",
      data: { lang: lang },
      success: function (result) {
        location.reload();
      },
    });
  });

  $(document).on("click", "#layout-editor .group .block", function (e) {
    var id = $(this).attr("blockkey");
    var boxid = $(this).attr("blockmain");
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $.hideBlock(boxid, id);
      $("#" + id).hide();
    } else {
      $(this).addClass("active");
      $.showBlock(boxid, id);
      $("#" + id).show();
    }
  });

  $(document).on("click", "#btn-edit-layout", function (e) {
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
    $("#layout-editor-container").show();
    $("#btn-shadow").show();
  });

  $(document).on("click", ".action-bar .btn-finish", function (e) {
    $("#layout-editor-container").hide();
    $("#btn-shadow").hide();
  });

  // jQuery.validator.addMethod('checkTwoCate', function (value, element) {
  // 	if ($('#cate-dk').val().length > 0 || $('#cate-suggest').val().length > 0) {
  // 		return true
  // 	} else {
  // 		return false
  // 	}
  // })

  $(document).on('change', '#city-selector', function (e) {
    console.log("Change data");
    let listCity = [];
    let data = $('#form_res').serializeArray();
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == "candiCityID[]") {
        listCity.push(Number(data[i].value))
      }
    };
    let dataDistrict = city_array.filter((e) => listCity.find((city) => city == e.cit_parent))
    // console.log("Dữ liệu quận huyện",dataDistrict);
    $('#district-selector').html("");
    for (let i = 0; i < dataDistrict.length; i++) {
      let district = dataDistrict[i];
      $("#district-selector").append(`<option value=${district.cit_id}>${district.cit_name}</option>`);
    };
  }
  )

  $(document).on("click", "#dk-btn", (t) => {
    t.preventDefault();
    $("#form_res").validate({
      rules: {
        name: "required",
        phoneTK: {
          required: !0,
          valid_phone: true,
          maxlength: 10,
          minlength: 10,
        },
        password: {
          required: !0,
          valid_password: true,
          minlength: 6,
        },
        repass: {
          required: !0,
          equalTo: "#password",
        },
        // candiCateID: {
        // 	checkTwoCate: true,
        // },
        // candiCateID2: {
        // 	checkTwoCate: true,
        // },
        candiCateID: "required",
        candiTitle: "required",
        "candiCityID[]": "required",
        // candiCateID2: "required",
        // diachi: "required",
        city_id: "required",
        qh_id: "required",
      },
      messages: {
        name: "Vui lòng nhập họ tên",
        phoneTK: {
          required: "Vui lòng nhập SĐT",
          valid_phone: "SĐT không đúng định dạng",
          maxlength: "SĐT không đúng định dạng",
          minlength: "SĐT không đúng định dạng",
          remote: "SĐT đã được sử dụng!",
        },
        password: {
          required: "Vui lòng nhập mật khẩu",
          valid_password: "Mật khẩu phải tối thiểu 6 kí tự, có ít nhất 1 chữ, 1 số và không chứa dấu cách",
          minlength: "Mật khẩu tối thiểu 6 ký tự",
        },
        repass: {
          required: "Vui lòng nhập mật khẩu",
          equalTo: "Không khớp với mật khẩu",
        },
        // candiCateID2: "Vui lòng chọn ngành nghề",
        candiCateID: "Vui lòng chọn ngành nghề",
        cv_title: "Vui lòng nhập công việc mong muốn.",
        "candiCityID[]": "Vui lòng chọn tỉnh thành",
        // diachi: "Vui lòng nhập địa chỉ",
        city_id: "Vui lòng chọn Tỉnh thành",
        qh_id: "Vui lòng chọn Quận huyện",
      },
    });
    const isValid = $("#form_res").valid();
    if (isValid) {
      let arr_noti = [];
      $(".box_content_notify .box_form_notify").each(function (i) {
        let arr_type_noti = [];
        $(this)
          .find(".box_content_loaitbao")
          .each(function (t, type) {
            arr_type_noti.push($(type).attr("data-type"));
          });
        $(this)
          .find(".txt_show_user")
          .each(function (u, user) {
            arr_noti.push({
              id_chat: $(user).attr("data-id_chat"),
              type_noti: arr_type_noti.join(","),
            });
          });
      });
      $(window).scrollTop(0);
      $(window).scrollLeft(0);
      $("#cvo-toolbar").removeClass("fx");
      var json_html_cv = $.exportData();

      const body = {};
      const data = $("#form_res").serializeArray();
      const emailTemp = $("#cv-profile-email").text();
      let phoneTK = data?.find((item) => item?.name === "phoneTK")?.value;
      body["phoneTK"] = phoneTK;
      const tempPass = data?.find((item) => item?.name === "password")?.value;

      const regex = /^([a-z0-9A-Z_@./#&+-]+){6,}$/;
      const passed = regex.test(tempPass);
      if (!passed) {
        window.alert(
          "Mật khẩu phải có ít nhất 1 ký tự chữ, 1 ký tự số, không chứa dấu cách và dài ít nhất 6 ký tự"
        );
        $(".bg-spinner").remove();
        return;
      }

      // Mã hóa chuỗi và lấy mã hex kết quả
      var pass = CryptoJS.MD5(tempPass).toString();

      body["candiTitle"] = data?.find(
        (item) => item?.name === "candiTitle"
      )?.value;
      body["userName"] = data?.find((item) => item?.name === "userName")?.value;
      if (!isNaN(body['userName'])) {
        alert('Tên không được là 1 số, vui lòng sửa lại tên của bạn trong cv')
        return false
      }
      body["emailContact"] = emailTemp;
      body["password"] = pass;

      // handle candi cateid
      let candi = [];
      data
        ?.filter((item) => item?.name === "candiCateID")
        ?.forEach((item) => {
          candi.push(item?.value);
        });

      // let candi2 = [];
      // data
      //   ?.filter((item) => item?.name === "candiCateID2")
      //   ?.forEach((item) => {
      //     candi2.push(item?.value);
      //   });
      //handle city

      let city = "";

      data
        .filter((item) => item.name === "candiCityID[]")
        .forEach((item) => {
          if (city === "") city += item.value;
          else city += "," + item.value;
        });

      for (let index = 0; index < 3; index++) {
        if (candi.length < 3 && candi.length > 0) {
          candi.push(candi.shift());
        }
      }
      // body["candiCateID"] = candi.join(",");
      // body["candiCityID"] = city;

      // $("#city-selector").change(function () {
      //   var citySelected = $(this).val();

      //   $("#district-selector option").hide();
      //   citySelected.forEach((city) => {
      //     $('#district-selector option[data-province="' + city + '"]').show();
      //   })
      // })

      let qh = ""
      data
        ?.filter((item) => item?.name === "qh_id")
        ?.forEach((item) => {
          if (qh === "") qh += item?.value;
          else qh += "," + item?.value;
        })
      for (let index = 0; index < 3; index++) {
        if (candi.length < 3 && candi.length > 0) {
          candi.push(candi.shift());
        }
      }
      body["candiCateID"] = candi.join(",");
      body['candiCityID'] = city
      body["qh_id"] = qh;

      fetch(`/api/get_suggest_cv_title?keyword=${cv_title}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let dataCVJson = "";
          data.data.forEach((item) => {
            dataCVJson += `
						<option value=${item.cat_id}>${item.cat_name}</option>
						`;
          });
          $("#cate-suggest").html(dataCVJson);
        })
        .catch((error) => {
          $("#cate-suggest").html("");
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
      var phone = $("#mobile").val(),
        password = $("#password").val(),
        rePassword = $("#confirm_password").val(),
        nganhNghe = $("#cate-dk option:selected").val(),
        ddlv = $("#city-selector option:selected").val(),
        district = $("#district-selector option:selected").val(),
        idcv = $("#cvid").val(),
        email = $("#cv-profile-email").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
        username = $("#cv-profile-fullname").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
        jobName = $("#cv-profile-job").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
        address = $("#cv-profile-address").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
        lang = $("#cvo-toolbar-lang .active").attr("data-lang"),
        height_cv = $("#form-cv").height();
      $.ajax({
        type: "POST",
        url: "https://timviechay.vn/api/work247/user/CreateCVInOrderToRegister",
        async: true,
        beforeSend: function (request) {
          $("body").append(
            '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
          );
        },
        data: {
          phone,
          password,
          rePassword,
          nganhNghe,
          ddlv,
          district,
          idcv,
          dataCVJson: json_html_cv,
          email,
          username: $("#name").val(),
          jobName: $("#cv_title").val(),
          address,
          lang,
          height_cv,
        },
        dataType: "json",
        success: function (respons) {
          console.log(respons);
          if (respons.data && respons.data.result == true) {
            alert("Đăng ký ứng viên thành công");
            $.ajax({
              type: "POST",
              url: "/",
              async: true,
            });
            setMultipleCookie(
              `${respons?.data.Token}`,
              `${respons?.data.use_id}`,
              `${respons?.data.auth}`,
              `${respons?.data.type}`,
              `${respons?.data.userName}`,
              `${respons?.data.phone}`,
              `${respons?.data.use_logo}`
            );
            setAll(
              `${respons?.data.userName}`,
              `${respons?.data.phone}`,
              `${respons?.data.use_logo}`
            );
            $(".bg-spinner").remove();
            setCandiAllowEmployerSearch("1");
            var user_id = respons?.data?.use_id;
            downloadAsPDF(
              `https://timviechay.vn/download/cv_pdf/user_${user_id}/cvid_${idcv}/${idcv}-timviechay`, username
            );
            deleteCookie(cookieStep1);
            window.location.href = "/";

            // var lang = $("#cvo-toolbar-lang .active").attr("data-lang");
            // var cvid = $("#cvid").val();
            // var height_cv = $("#form-cv").height();
            // $.ajax({
            //   type: "POST",
            //   url: "https://api.timviec365.vn/api/timviec/cv/saveCV",
            //   async: true,
            //   headers: {
            //     Authorization: `Bearer ${respons?.data?.access_token}`,
            //   },
            //   data: {
            //     cv: json_html_cv,
            //     cvid,
            //     height_cv,
            //     lang,
            //     // allowSendChat: 1,
            //     // name_img: "u_cv_" + Math.floor(Date.now() / 1000),
            //     // name_img_hide: "u_cv_" + Math.floor(Date.now() / 1000) + "_h",
            //   },
            //   dataType: "json",
            //   success(response) {
            //     console.log(response);
            //     window.alert("Lưu CV thành công");
            //     window.alert("CV của bạn đã được gửi về Appchat365");
            //     window.location.href = `/xac-thuc-tai-khoan-ung-vien.html?openApp=1&cvid=${cvid}`;
            //   },
            //   error: (err) => {
            //     window.alert(err);
            //   },
            // });
          } else {
            window.alert(respons?.error?.message);
            $(".bg-spinner").remove();
          }
        },
        error: (err) => {
          window.alert(err.responseJSON.error.message);
          $(".bg-spinner").remove();
        },
      });

      // $.ajax({
      //   url: `https://api.timviec365.vn/api/timviec/candidate/registerOneStep`,
      //   type: "POST",
      //   dataType: "json",
      //   data: body,
      //   beforeSend: function (response) {
      //     $(".bg-spinner").remove();
      //     $("body").append(
      //       '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
      //     );
      //   },
      //   success: function (respons) {
      //     if (respons.data && respons.data.result == true) {
      //       // call login
      //       $.ajax({
      //         type: "POST",
      //         url: "https://api.timviec365.vn/api/timviec/candidate/loginUv",
      //         async: true,
      //         data: {
      //           password_type: 0,
      //           password: tempPass,
      //           account: phoneTK,
      //         },
      //         dataType: "json",
      //         success(data) {
      //           console.log(data);
      //           if (data?.data?.result) {
      //             Cookies.set("work247_token", data?.data?.access_token);
      //             Cookies.set("rf_token", data?.data?.refreshToken);
      //             Cookies.set("role", "0");
      //             Cookies.set("id_chat365", data?.data?.user_infor.chat365_id);
      //             var userDataJSON = JSON.stringify(data?.data?.user_infor);
      //             localStorage.setItem("infor", userDataJSON);
      //             Cookies.set("infor", userDataJSON);
      //             // new
      //             Cookies.set("shouldRemove", "none");
      //           }
      //         },
      //       });

      //       var lang = $("#cvo-toolbar-lang .active").attr("data-lang");
      //       var cvid = $("#cvid").val();
      //       var height_cv = $("#form-cv").height();
      //       $.ajax({
      //         type: "POST",
      //         url: "https://api.timviec365.vn/api/timviec/cv/saveCV",
      //         async: true,
      //         headers: {
      //           Authorization: `Bearer ${respons?.data?.access_token}`,
      //         },
      //         data: {
      //           cv: json_html_cv,
      //           cvid,
      //           height_cv,
      //           lang,
      //           // allowSendChat: 1,
      //           // name_img: "u_cv_" + Math.floor(Date.now() / 1000),
      //           // name_img_hide: "u_cv_" + Math.floor(Date.now() / 1000) + "_h",
      //         },
      //         dataType: "json",
      //         success(response) {
      //           console.log(response);
      //           window.alert("Lưu CV thành công");
      //           window.alert("CV của bạn đã được gửi về Appchat365");
      //           window.location.href = `/xac-thuc-tai-khoan-ung-vien.html?openApp=1&cvid=${cvid}`;
      //         },
      //         error: (err) => {
      //           window.alert(err);
      //         },
      //       });
      //     } else {
      //       $(".bg-spinner").remove();
      //       window.alert(respons?.error?.message);
      //     }
      //   },
      //   error: function (err) {
      //     console.log(err);
      //     $(".bg-spinner").remove();
      //     window.alert(err?.responseJSON?.error?.message || "Có lỗi xảy ra ");
      //   },
      // });
      return false;
    }
  });
  //fix lỗi load lần đầu bị text chèn thừa ra bên ngoài trang
  $("img#cvo-profile-avatar").on("load", function () {
    // Thực hiện các hành động bạn muốn khi hình ảnh được tải
    adjustPage();
    // alert('Hình ảnh đã được tải thành công')
  });
  setTimeout(() => {
    changeLayoutCv()
  }, 0)
});

// vlong moi
function doi_mau_cl(e) {
  $(".box_content_taocv").scrollTop(0);
  var arr = $.exportData();
  var id_cv = $(e).attr("data-id");
  var alias = $(e).attr("data-alias");
  var cv_title = $("#cv-title").text();
  $.ajax({
    type: "POST",
    url: "site/new_layout_cv",
    data: {
      arr: arr,
      id_cv: id_cv,
      alias: alias,
      cv_title: cv_title,
    },
    success: function (data) {
      $(".page_cv").html(data);
      check_cv_begin();
      // }
    },
  });

  $.ajax({
    type: "POST",
    url: "site/new_clr_cv",
    data: {
      id_cv: id_cv,
    },
    success: function (data) {
      $("#toolbar-color").html(data);
      changeLayoutCv();
    },
  });
  $(".img_thoat").click();
}

function save_cv_login(uid) {
  $(window).scrollTop(0);
  $(window).scrollLeft(0);
  $("#cvo-toolbar").removeClass("fx");
  $(".bg-spinner").remove();
  $("body").append(
    '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
  );
  $(".bar-value-exp").hide();
  $(".bar-exp").show();

  $.exportData();
  var img_val = "",
    img_val2 = "";
  var name = $("#cv-title").text();
  var cvid = $("#cvid").val();
  if (name == "") {
    name = $("#cv_alias").val();
  }
  html2canvas($("#form-cv"), {
    onrendered: function (canvas) {
      img_val = canvas.toDataURL("image/png", 1.0);
      $.ajax({
        type: "POST",
        url: "save_img_dk.php",
        data: { img_val: img_val, uid: uid, cvid: cvid },
        success: function () { },
      });
    },
  });

  var is_busy = false;
  var x = $("#cv-profile-phone").text();
  var y = $("#cv-profile-email").text();

  $("#cv-profile-phone").text("Xem ở trên");
  $("#cv-profile-email").text("Xem ở trên");

  html2canvas($("#form-cv"), {
    onrendered: function (canvas) {
      img_val2 = canvas.toDataURL("image/png", 1.0);
      $.ajax({
        cache: false,
        type: "POST",
        url: "save_test.php",
        data: { img_val: img_val2, name: name, cvid: cvid, uid: uid, auto: 1 },
        dataType: "JSON",
        //success: function(res) {
        //result = res.result;
        //$('.bg-spinner').remove();
        //is_busy = false;
        //$('#cv-profile-phone').text(x);
        //$('#cv-profile-email').text(y);
        // $.exportData();
        //window.location.href = 'https://timviec365.vn/cv365/dang-ky-thanh-cong';
        //}
      });
      is_busy = false;
    },
  });
  $("#cv-profile-phone").text(x);
  $("#cv-profile-email").text(y);
  let user_tk = $("#email").val(),
    user_name = $("#name").val();
  show_xt(user_tk, uid, user_name);
}

function update_cv(uid) {
  $(window).scrollTop(0);
  $(window).scrollLeft(0);
  $("#cvo-toolbar").removeClass("fx");
  $("body").append(
    '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
  );
  $.exportData();
  var is_busy = false;

  $("#cv-profile-phone").text("Xem ở trên");
  $("#cv-profile-email").text("Xem ở trên");

  $(".bar-value-exp").hide();
  $(".bar-exp").show();
  var name = $("#cv-title").text();
  if (name == "") {
    name = $("#cv_alias").val();
  }
  var token = $("#token").val();
  var cvid = $("#cvid").val();
  if (is_busy == true) {
    return false;
  }
  var result = false;
  while (!result) {
    $.ajax({
      cache: false,
      type: "POST",
      url: "save.php",
      async: false,
      data: { name: name, cvid: cvid, uid: uid, auto: 1 },
      dataType: "JSON",
      beforeSend: function (response) {
        $(".bg-spinner").remove();
        $("body").append(
          '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
        );
      },
      success: function (res) {
        result = res.result;
        $(".bg-spinner").remove();
        is_busy = false;
        window.location.href =
          "https://timviec365.vn/cv365/luu-cv/" + token + "-" + cvid;
      },
      error: function () {
        result = true;
      },
    });
  }
}

function cv_login_user(uid) {
  $(window).scrollTop(0);
  $(window).scrollLeft(0);

  $("#cvo-toolbar").removeClass("fx");
  $("body").append(
    '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
  );
  var is_busy = false;
  $.exportData();
  var x = $("#cv-profile-phone").text();
  var y = $("#cv-profile-email").text();

  $("#cv-profile-phone").text("Xem ở trên");
  $("#cv-profile-email").text("Xem ở trên");
  $(".bar-value-exp").hide();
  $(".bar-exp").show();
  var name = $("#cv-title").text();
  if (name == "") {
    name = $("#cv_alias").val();
  }
  var token = $("#token").val();
  var cvid = $("#cvid").val();
  if (is_busy == true) {
    return false;
  }
  var result = false;
  while (!result) {
    $.ajax({
      cache: false,
      async: false,
      type: "POST",
      url: "save.php",
      data: { name: name, cvid: cvid, uid: uid },
      dataType: "JSON",
      beforeSend: function (response) {
        $(".bg-spinner").remove();
        $("body").append(
          '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
        );
      },
      success: function (res) {
        result = res.result;
        $(".bg-spinner").remove();
        is_busy = false;
        $("#cv-profile-phone").text(x);
        $("#cv-profile-email").text(y);
        $.exportData();
        location.reload();
      },
    });
  }
}

function xemtruoc_cv() {
  var sortAbleArea = [
    { el: ".sortable", item: ".block", area: "menu" },
    { el: ".sort_block", item: ".cvo-block", area: "experiences" },
  ];

  const dataCVJson = $.exportData();

  let lang = $("#cvo-toolbar-lang .active").attr("data-lang");
  let height_cv = $("#form-cv").height();
  let idcv = $("#cvid").val();
  let avatar = $("#page-cv #cvo-profile-avatar").attr("src");
  $(".bg-spinner").remove();
  $("body").append(
    '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
  );
  $.ajax({
    cache: false,
    type: "POST",
    url: `https://timviechay.vn/api/work247/user/PreviewCv`,
    data: { dataCVJson, lang, idcv, height_cv },
    dataType: "JSON",
    beforeSend: function (response) { },
    success: function (res) {
      console.log(">>> Check res: ", res);
      if (res.data && res.data.result) {
        let img_val = res.data.data;
        $("#cv_mau_new .img_cv").attr(
          "src",
          `${img_val}`
        );
        $("#cv_mau_new").show();
        $(".bg-spinner").remove();
      } else {
        alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
        $(".bg-spinner").remove();
      }
      $(".bg-spinner").remove();
    },
    error: (err) => {
      console.log(err.message);
      $(".bg-spinner").remove();
    },
  });
}

function btnsb() {
  $(window).scrollTop(0);
  $(window).scrollLeft(0);

  $("#cvo-toolbar").removeClass("fx");
  // $.exportData();
}

$(".btn_login_cv").click(function (e) {
  e.preventDefault();
  var id = $(this).attr("data");
  $("#idchecklogin").remove();
  var returnform = true;
  var ccphone = $("#user_phone");
  var ccpass = $("#user_password_first");
  if (ccpass.val() == "") {
    $("#user_password_first_error").remove();
    ccpass.after(
      '<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Vui lòng nhập mật khẩu.</label>'
    );
    ccpass.addClass("error");
    ccpass.focus();
    ccpass.addClass("valid");
    returnform = false;
  } else {
    ccpass.addClass("valid");
    $("#user_password_first_error").remove();
    if (ccpass.val().length < 4) {
      if ($("#user_password_first_error").hasClass("error") == false) {
        ccpass.after(
          '<label id="user_password_first_error" class="error" for="user_password_first" style="display: inline-block;">Mật khẩu phải từ 4-20 ký tự</label>'
        );
        ccpass.addClass("error");
        ccpass.focus();
        returnform = false;
      }
    } else {
      $("#user_password_first_error").remove();
      ccpass.removeClass("error");
    }
  }
  if (ccphone.val() == "") {
    $("#user_phone_error").remove();
    ccphone.after(
      '<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập tài khoản đăng nhập.</label>'
    );
    ccphone.addClass("error");
    $("#user_phone").focus();
    ccphone.addClass("valid");
    returnform = false;
  } else {
    ccphone.addClass("valid");
    $("#user_phone_error").remove();
    if (ccphone.val().length > 0) {
      if (validateUser(ccphone.val()) == false) {
        if ($("#user_phone_error").hasClass("error") == false) {
          ccphone.after(
            '<label id="user_phone_error" class="error" for="user_phone">Vui lòng nhập đúng định dạng số điện thoại.</label>'
          );
          ccphone.focus();
          ccphone.addClass("error");
        }
        returnform = false;
      } else {
        $("#user_phone_error").remove();
        ccphone.removeClass("error");
      }
      ccphone.addClass("valid");
    }
  }
  if (returnform == true) {
    $.ajax({
      type: "POST",
      url: "https://timviechay.vn/api/work247/user/LoginCandidate",
      data: {
        username: ccphone.val(),
        password: ccpass.val(),
      },
      success: function (data) {
        console.log(data);
        if (data?.data?.result) {
          // set cookies
          // Cookies.set("work247_token", data?.data?.access_token);
          // Cookies.set("rf_token", data?.data?.refreshToken);
          // Cookies.set("role", "2");
          Cookies.set(cookieToken, data?.data?.data?.Token)
          Cookies.set(cookieStep1, '0')
          Cookies.set(cookieTempId, '0')
          setMultipleCookie(
            `${data?.data?.data?.Token}`,
            `${data?.data?.data?.data?.use_id}`,
            `${data?.data?.data?.data?.auth}`,
            `${data?.data?.data?.data?.type}`,
            `${data?.data?.data?.data?.userName}`,
            `${data?.data?.data?.data?.use_phone_tk}`,
            `${data?.data?.data?.data?.use_logo}`
          );
          setAll(
            `${data?.data?.data?.data.userName}`,
            `${data?.data?.data?.data.use_phone_tk}`,
            `${data?.data?.data?.data.use_logo}`
          );
          // var userDataJSON = JSON.stringify(data?.data?.user_infor);
          // localStorage.setItem("infor", userDataJSON);
          // Cookies.set("infor", userDataJSON);

          // new
          // Cookies.set("shouldRemove", "none");

          $(".auth_form").css("display", "none");
          $(window).scrollTop(0);
          $(window).scrollLeft(0);
          $("#cvo-toolbar").removeClass("fx");

          var json_html_cv = $.exportData();
          var id = data?.data?.data?.data?.use_id;
          var lang = $("#cvo-toolbar-lang .active").attr("data-lang");
          var idcv = $("#cvid").val();
          var height_cv = $("#form-cv").height();
          $("body").append(
            '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
          );
          $.ajax({
            type: "POST",
            url: "https://timviechay.vn/api/work247/candidate/UpdateInfoCv",
            async: true,
            beforeSend: function (request) {
              $("body").append(
                '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
              );
              request.setRequestHeader(
                "Authorization",
                "Bearer " + data?.data?.data?.Token
              );
            },
            data: {
              id,
              idcv,
              html: json_html_cv,
              height_cv,
              lang,
            },
            dataType: "json",
            success(response) {
              if (response?.data?.result) {
                console.log(response.data);
                // setMultipleCookie(
                //   `${data?.data?.data?.Token}`,
                //   `${data?.data?.data?.data.use_id}`,
                //   `${data?.data?.data?.data.auth}`,
                //   `${data?.data?.data?.data.type}`,
                //   `${data?.data?.data?.data.userName}`,
                //   `${data?.data?.data?.data.use_phone_tk}`,
                //   `${data?.data?.data?.data.use_logo}`
                // );
                // setAll(
                //   `${data?.data?.data?.data.userName}`,
                //   `${data?.data?.data?.data.use_phone_tk}`,
                //   `${data?.data?.data?.data.use_logo}`
                // );
                alert("Lưu CV thành công");
                downloadAsPDF(
                  `https://timviechay.vn/download/cv_pdf/user_${response?.data?.use_id}/cvid_${idcv}/${idcv}-timviechay`, data?.data?.data?.data?.userName
                );
                $(".bg-spinner").remove();
                window.location.href = "/";
                // open chat
                return;
                var url = getCookie("url");
                if (isMac) {
                  $(".popup_send_chat").find(".qr_area").html("");
                  let id_chat365 = get_Cookie_c("id_chat365"),
                    uid_type = get_Cookie_c("UT");
                  let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
                    id_chat365
                  )}%26contactId=${btoa("1191")}%26type365=${uid_type}&efr=1`;
                  let qr_box = $(".popup_send_chat").find(".qr_area")[0];
                  var QR_CODE = new QRCode(qr_box, {
                    width: 110,
                    height: 110,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L,
                  });
                  QR_CODE.makeCode(link_qr);
                  $(".popup_send_chat").show();
                  $(".popup_send_chat .download_mobile").hide();
                  $(".popup_send_chat .download_pc .btn_area").hide();
                  if (url != "") {
                    $("#popup_back_ut").show();
                    $(".back_ut").attr("href", url);
                    document.cookie =
                      "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  } else {
                    $(".popup_send_chat").show();
                  }
                } else if (isMobile.any()) {
                  if (isMobile.any()) {
                    var url = getCookie("url");
                    if (url != "") {
                      $("#popup_back_ut").show();
                      $(".back_ut").attr("href", url);
                      document.cookie =
                        "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    } else {
                      $(".popup_send_chat").show();
                    }
                    openChatMobile(1192);
                  }
                } else {
                  openChat(0, linkChatWf, "SendCv");
                  if (url != "") {
                    $("#popup_back_ut").show();
                    $(".back_ut").attr("href", url);
                    document.cookie =
                      "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  }
                }
                location.href = "/xac-thuc-tai-khoan-ung-vien.html";
              }
            },
          });

          // export data save cv
        } else {
          $(".auth_form .hrdot").html(
            '<label id="idchecklogin" class="error" for="idchecklogin">Tài khoản,mật khẩu của bạn không đúng</label>'
          );
        }
      },
      error: function (err) {
        $(".bg-spinner").remove();
        console.log(err);
        window.alert(err?.responseJSON?.error?.message || "Có lỗi xảy ra");
      },
    });
  }
});
// cộng 1 điểm cho cv khi xem đc 3p
$(document).on("scroll", function () {
  addPointCv();
  $(document).unbind("scroll");
});
var addPoint = setInterval(function () {
  addPointCv();
}, 180000);

function addPointCv() {
  $.ajax({
    url: "https://api.timviec365.vn/api/timviec/cv/update_point_cv",
    dataType: "JSON",
    data: {
      cv_id: $("#cvid").val(),
    },
    type: "POST",
    success: function (data) { },
  });
}
// end cộng điểm tin

//Xác thực tài khoản
$(".close_modal_tbcc,.img_close_cc").click(function () {
  $(".modal_tbcc").hide();
});

$("document").ready(function () {
  $(".click_mail").click(function () {
    var active_dk = $(".click_mail").attr("data-href");
    var mail = $(".p1_xt span").text();
    $.ajax({
      cache: false,
      type: "POST",
      url: "site/send_active_again2",
      data: {
        active_dk: active_dk,
      },
      success: function (data) {
        if (data == 1) {
          $(".txt_nd_modal").html(
            "Mã OTP đã được gửi lại email <span>" + mail + "</span> thành công!"
          );
          $(".modal_tbcc .nd_modal").css("width", "680px");
          $(".modal_tbcc").show();
        }
      },
    });
  });
});

function validateConfirmOTP(otp) {
  let id_tk = $(".xt_id").val();
  if (otp == "" || otp.length != 6 || otp == "NaN" || id_tk == 0) {
    $(".txt_nd_modal").html("Vui lòng điền mã OTP hợp lệ!");
    $(".modal_tbcc .nd_modal").css("width", "420px");
    $(".modal_tbcc").show();
    return false;
  }
  return true;
}

function show_xt(user_tk, user_id, user_name) {
  $(".xt_email").val(user_tk);
  $(".p1_xt span").text(user_tk);
  $(".xt_id").val(user_id);
  $(".xt_name").val(user_name);
  $("#page-taocv").hide();
  $(".bg-spinner").remove();
  $("#boxRes").hide();
  $("#page-xt").show();
}

var linkChatWf =
  "https://app.timviec365.vn/Download/Chat365/InstallAndUpdate/Chat365.msi";

function openChat(id_chat, link_chat, conv_id = 0) {
  let id_chat365 = get_Cookie_c("id_chat365"),
    uid_type = get_Cookie_c("UT");
  const kt = {
    success: "success",
    cancel: "cancel",
    unsupport: "unsupport",
  };
  const r = 1000;
  conv_id = conv_id != 0 ? btoa(conv_id) : "";
  let id_chat_send = id_chat365 ? id_chat365 : 0,
    type_send = uid_type ? uid_type : 0;
  id_chat = id_chat ? id_chat : 0;
  let e = `chat365:/${btoa(id_chat_send)}/${btoa(
    id_chat
  )}/${type_send}/${conv_id}`;
  if (!conv_id) {
    e = `chat365:/${btoa(id_chat_send)}/${btoa(id_chat)}/${type_send}`;
  }
  const t = () => {
    "unsupport" === t && (null === e || void 0 === e || e());
  };
  const n = {
    name: "chrome",
    alertW: 500,
    alertH: 125,
  };
  var a =
    document.querySelector("#hiddenIframe") ||
    (((a = document.createElement("iframe")).id = "hiddenIframe"),
      (a.style.display = "none"),
      document.body.appendChild(a));
  let o = setTimeout(function () {
    runDownload(link_chat);
  }, r),
    i = {};

  function l() {
    clearTimeout(o);
  }
  window.addEventListener("blur", l),
    window.addEventListener("focus", function e() {
      setTimeout(function () {
        document.hasFocus()
          ? t(
            (function (e) {
              if (!e.x) return !0;
              var t =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth,
                r = n.alertW,
                a = n.alertH,
                o = e.x - 100 < 0.5 * (t + r) && e.x + 100 > 0.5 * (t + r),
                i = e.y - 40 < a && e.y + 40 > a;
              return o && i;
            })(i)
              ? kt.cancel
              : kt.success
          )
          : t(kt.success),
          window.removeEventListener("focus", e),
          window.removeEventListener("blur", l);
      }, 500);
    }),
    (a.contentWindow.location.href = e);
}

function runDownload(url) {
  let arr_name = url.split("/");
  let name = arr_name[arr_name.length - 1];
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  $("#popup_download_chat").show();
}

function get_Cookie_c(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

var isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
if ($(".popup_send_chat").hasClass("open_app")) {
  if (isMobile.any()) {
    openChatMobile(1192);
  } else if (isMac) {
    let id_chat365 = get_Cookie_c("id_chat365"),
      uid_type = get_Cookie_c("UT");
    let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
      id_chat365
    )}%26contactId=${btoa("1191")}%26type365=${uid_type}&efr=1`;
    $(".popup_send_chat").find(".qr_area").html("");
    let qr_box = $(".popup_send_chat").find(".qr_area")[0];
    var QR_CODE = new QRCode(qr_box, {
      width: 110,
      height: 110,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.L,
    });
    QR_CODE.makeCode(link_qr);
    $(".popup_send_chat").show();
    $(".popup_send_chat .download_mobile").hide();
    $(".popup_send_chat .download_pc .btn_area").hide();
  } else {
    openChat(0, linkChatWf, "SendCv");
  }
}

function openChatMobile(id_chat, conv_id = 0) {
  if (false) {
  } else {
    let id_chat365 = get_Cookie_c("id_chat365"),
      uid_type = get_Cookie_c("UT");
    let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
      id_chat365
    )}%26contactId=${btoa(id_chat)}%26type365=${uid_type}`;

    if (conv_id) {
      link_qr += `%26conversationId=${btoa(conv_id)}`;
    }
    link_qr += `&efr=1`;
    setTimeout(() => {
      window.location.href = link_qr;
    }, 200);
  }
}

function resg_new() {
  console.log("Lưu và tải về CV");
  var cv_title = $("#cv-profile-job").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
    phone = $("#cv-profile-phone").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
    email_lh = $("#cv-profile-email").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
    address = $("#cv-profile-address").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
    name = $("#cv-profile-fullname").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
    sex = $('#cv-profile-sex').text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim(),
    birthday = $("#cv-profile-birthday").text().replace(/\n/g, '').replace(/<br>/g, '').replace(/\s\s+/g, ' ').trim();
  if (name.toLowerCase() == 'admin') {
    alert('Tên không hợp lệ, vui lòng đặt lại tên')
    return
  }
  var err = 2;
  if ("" != $("#cvid").val()) {
    if (
      "" == phone ||
      "" == name ||
      "" == address ||
      "" == cv_title ||
      '' == sex ||
      (document.getElementById("cv-profile-birthday") && "" == birthday)
    ) {
      "" == name &&
        (document.getElementById("cv-profile-fullname").style.outline =
          "1px dashed red"),
        "" == phone &&
        (document.getElementById("cv-profile-phone").style.outline =
          "1px dashed red"),
        "" == email_lh &&
        (document.getElementById("cv-profile-email").style.outline =
          "1px dashed red"),
        "" == cv_title &&
        (document.getElementById("cv-profile-job").style.outline =
          "1px dashed red"),
        "" == birthday &&
        document.getElementById("cv-profile-birthday") &&
        (document.getElementById("cv-profile-birthday").style.outline =
          "1px dashed red"),
        "" == address &&
        document.getElementById("cv-profile-address") &&
        (document.getElementById("cv-profile-address").style.outline =
          "1px dashed red"),
        '' == sex && document.getElementById('cv-profile-sex') && (document.getElementById('cv-profile-sex').style.outline = '1px dashed red')
      var l =
        '<div class="v-modal" style="z-index: 2009; display: block;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">';
      var text_mis = "";
      if ("" == name) {
        text_mis += "Họ tên, ";
      }
      if ("" == birthday && document.getElementById("cv-profile-birthday")) {
        text_mis += "Ngày sinh, ";
      }
      if ("" == email_lh) {
        text_mis += "Email, ";
      }
      if ("" == phone) {
        text_mis += "Số điện thoại, ";
      }
      if ("" == address) {
        text_mis += "Địa chỉ, ";
      }
      if ("" == cv_title) {
        text_mis += "Công việc mong muốn, ";
      }
      if ('' == sex) {
        text_mis += 'Giới tính, '
      }
      text_mis = text_mis.substring(0, text_mis.length - 2);
      (l +=
        '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'),
        (l +=
          "Vui lòng nhập đầy đủ thông tin: <span style='color:red'>" +
          text_mis +
          "</span> trong khung đỏ trước khi lưu CV</div></div>"),
        (l += '<div class="el-message-box__btns">'),
        (l +=
          '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>');
      $("body").append(l);
      return !1;
    }

    if (!/^[0-9]+$/.test(phone)) {
      return (
        (l =
          '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'),
        (l +=
          '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'),
        (l += "Số điện thoại không hợp lệ</div></div>"),
        (l += '<div class="el-message-box__btns">'),
        (l +=
          '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>'),
        $("body").append(l),
        !1
      );
    }

    if (phone.length !== 10) {
      return (
        (l =
          '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'),
        (l +=
          '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'),
        (l += "Số điện thoại không hợp lệ</div></div>"),
        (l += '<div class="el-message-box__btns">'),
        (l +=
          '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>'),
        $("body").append(l),
        !1
      );
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email_lh)) {
      return (
        (l =
          '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'),
        (l +=
          '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'),
        (l += "Địa chỉ email không hợp lệ</div></div>"),
        (l += '<div class="el-message-box__btns">'),
        (l +=
          '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>'),
        $("body").append(l),
        !1
      );
    }

    //fix cv
    const isDate = (str) => {
      let [d, M, y] = str.split("/");
      return y && M <= 12 && d <= 31 ? true : false;
    };

    let checkBirthDay = isDate(birthday);
    if (document.getElementById("cv-profile-birthday")) {
      if (!checkBirthDay) {
        return (
          (l =
            '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'),
          (l +=
            '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'),
          (l +=
            "Ngày sinh không hợp lệ (Ngày sinh phải có định dạng ngày/tháng/năm)</div></div>"),
          (l += '<div class="el-message-box__btns">'),
          (l +=
            '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>'),
          $("body").append(l),
          !1
        );
      } else {
        let age =
          new Date().getFullYear() -
          birthday.split("/")[birthday.split("/").length - 1];
        if (age < 6 || age > 80) {
          return (
            (l =
              '<div class="v-modal" style="z-index: 2009;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2010;">'),
            (l +=
              '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'),
            (l += "Ngày sinh không hợp lệ (Năm sinh sai quy định)</div></div>"),
            (l += '<div class="el-message-box__btns">'),
            (l +=
              '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>'),
            $("body").append(l),
            !1
          );
        }
      }
    }

    if (!check_cv_content()) {
      return false;
    }
    err = "1";
  }

  let user_tk = phone;
  var token = Cookies.get("work247_token");
  let cookieIsLogin = getCookie(cookieLogin);
  let tempId = getCookie(cookieTempId);
  let isStep1Ok = getCookie(cookieStep1);

  var id = tempId;
  var json_html_cv = $.exportData();
  var lang = $("#cvo-toolbar-lang .active").attr("data-lang");
  var idcv = $("#cvid").val();
  var height_cv = $("#form-cv").height();

  if (err != "" && tempId != null && isStep1Ok == "1" &&
    cookieIsLogin != "true") {
    console.log('>>> Đăng ký rồi tạo cv');
    $.ajax({
      type: "POST",
      url: "https://timviechay.vn/api/work247/user/CandidateRegisterByCVOnline",
      async: true,
      beforeSend: function (request) {
        $("body").append(
          '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
        );
        request.setRequestHeader("Authorization", "Bearer " + token);
      },
      data: {
        id,
        cv: json_html_cv,
        idcv,
        height_cv,
        lang,
      },
      dataType: "json",
      success(response) {
        if (response?.data?.result) {
          console.log("Đăng ký bước 2 thành công");
          setMultipleCookie(
            `${response?.data.Token}`,
            `${response?.data.use_id}`,
            `${response?.data.auth}`,
            `${response?.data.type}`,
            `${response?.data.userName}`,
            `${response?.data.phone}`,
            `${response?.data.use_logo}`
          );
          setAll(
            `${response?.data.userName}`,
            `${response?.data.phone}`,
            `${response?.data.use_logo}`
          );
          $(".bg-spinner").remove();
          setCandiAllowEmployerSearch("1");
          deleteCookie(cookieStep1);
          var user_id = response?.data?.use_id;
          downloadAsPDF(
            `https://timviechay.vn/download/cv_pdf/user_${user_id}/cvid_${idcv}/${idcv}-timviechay`, response?.data.userName
          );
          console.log("Tải về CV thành công");
          // window.location.href = "/";
          console.log('change url');
          var url = Cookies.get('urlUt')
          if (url) {
            window.location.href = url
          } else {
            window.location.href = "/";
          }
        }
      },
      error: (err) => {
        console.log(err.message);
        $(".bg-spinner").remove();
      },
    });
  }
  if (err != "" && (!isStep1Ok || isStep1Ok != "1") && cookieIsLogin != "true") {
    console.log('>>> Tạo cv rồi đăng ký');
    if (!token) {
      $(window).scrollTop(0);
      $(window).scrollLeft(0);
      $(".box_content_taocv").animate({ scrollTop: 0 }, "slow");
      $(".box_content_taocv").animate({ scrollTop: 0 }, "slow");
      $("#form_res #birthday").val(birthday),
        $("#form_res #email").val(user_tk),
        $("#form_res #name").val(name),
        $("#form_res #mobile").val(phone),
        $("#form_res #cv_title").val(cv_title),
        // $("#form_res #diachi").val(address),
        $("#boxLog").hide(),
        $("#boxRes").show(),
        $(".modal").hide();
      $("#loadjs").append(
        '<script type="text/javascript">$("#cate-dk").select2({multiple : true,maximumSelectionLength: 3,placeholder: "Chọn ngành nghề",allowClear: true});$("#city-selector").select2({maximumSelectionLength: 3,placeholder: "Chọn nơi làm việc",allowClear: true});$("#district-selector").select2({multiple : true, maximumSelectionLength: 3, placeholer: "Chọn quận huyện",allowClear: true});$("#city2").select2();$("#qh2").select2();$("#cate-suggest").select2({multiple : true,maximumSelectionLength: 3,placeholder: "Chọn ngành nghề",allowClear: true});</script>'
      );
      return;
      fetch(`/api/get_suggest_cv_title?keyword=${cv_title}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let html = "";
          data.data.forEach((item) => {
            html += `
      			<option value=${item.cat_id}>${item.cat_name}</option>
      			`;
          });
          $("#cate-suggest").html(html);
        })
        .catch((error) => {
          $("#cate-suggest").html("");
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }

    $(window).scrollTop(0);
    $(window).scrollLeft(0);
    $("#cvo-toolbar").removeClass("fx");

    // var json_html_cv = $.exportData();
    const formatted = JSON.parse(json_html_cv);
    const listerr = [];
    const pathname = window.location.pathname;
    // const LIST = [
    //   "/cv365/tao-cv-marketing/mau-26",
    //   "/cv365/tao-cv-giao-thong-van-tai/mau-14",
    // ];
    const block04Data = formatted?.experiences?.find((x) => x.id === "block04");

    // check block04
    block04Data?.content?.content?.forEach((item) => {
      if (!item?.title || !item?.subtitle || !item?.date || !item?.content) {
        if (!listerr.includes(block04Data?.content?.title)) {
          listerr.push(block04Data?.content?.title);
        }
      }
    });

    // check block03
    const block03Data = formatted?.experiences?.find((x) => x.id === "block03");

    // check block04
    block03Data?.content?.content?.forEach((item) => {
      if (!item?.subtitle || !item?.content) {
        if (!listerr.includes(block03Data?.content?.title)) {
          listerr.push(block03Data?.content?.title);
        }
      }
    });
    let err_empty = false;

    const jsonData = JSON.parse(json_html_cv);

    const block03 = jsonData?.experiences?.find(
      (item) => item?.id === "block03"
    );
    const block04 = jsonData?.experiences?.find(
      (item) => item?.id === "block04"
    );

    if (block03?.status !== "hide") {
      block03?.content?.content?.forEach((item) => {
        if (item && Object.keys(item).length > 0) {
          Object.keys(item).forEach((k) => {
            if (k !== "date") {
              if (item[k] === "" || !item[k]) {
                err_empty = true;
              }
            }
          });
        }
      });
    }

    if (block04?.status !== "hide") {
      block04?.content?.content?.forEach((item) => {
        if (item && Object.keys(item).length > 0) {
          Object.keys(item).forEach((k) => {
            if (k !== "date") {
              if (item[k] === "" || !item[k]) {
                err_empty = true;
              }
            }
          });
        }
      });
    }

    if (!jsonData?.experiences?.length || !jsonData?.menu?.length) {
      window.alert('Đã có lỗi xảy ra, vui lòng tải lại trang và thử lại!')
      return
    }

    if (err_empty) {
      window.alert("Bạn phải điền đầy đủ các trường thông tin");
      if (jsonData.name.toLowerCase() == 'admin') {
        alert('Tên không hợp lệ, vui lòng đặt lại tên')
      }
      return
    } else {
      var lang = $("#cvo-toolbar-lang .active").attr("data-lang");
      var cvid = $("#cvid").val();
      var height_cv = $("#form-cv").height();
      if (token) {
        $.ajax({
          type: "POST",
          url: "https://api.timviec365.vn/api/timviec/cv/saveCV",
          async: true,
          beforeSend: function (request) {
            $("body").append(
              '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
            );
            request.setRequestHeader("Authorization", "Bearer " + token);
          },
          data: {
            html: json_html_cv,
            cvid,
            height_cv,
            lang,
            allowSendChat: 1,
            name_img: "u_cv_" + Math.floor(Date.now() / 1000),
            name_img_hide: "u_cv_" + Math.floor(Date.now() / 1000) + "_h",
          },
          dataType: "json",
          success(response) {
            if (response?.data?.result) {
              alert("Lưu CV thành công");
              // open chat
              $(".bg-spinner").remove();
              deleteCookie(cookieStep1);
              var url = getCookie("url");

              return;
              const authen = window.sessionStorage.getItem("authentic");
              // if (!authen || authen != "1") {
              //   window.location.href = `/xac-thuc-tai-khoan-ung-vien.html?openApp=1&cvid=${cvid}`;
              // } else {
              //   return;
              //   if (isMac) {
              //     $(".popup_send_chat").find(".qr_area").html("");
              //     let id_chat365 = get_Cookie_c("id_chat365"),
              //       uid_type = get_Cookie_c("UT");
              //     let link_qr = `https://appchat365.timviec365.vn?apn=vn.timviec365.chat_365&ibi=vn.timviec365.chat365&isi=1623353330&link=https://chat365.timviec365.vn?userId=${btoa(
              //       id_chat365
              //     )}%26contactId=${btoa("1191")}%26type365=${uid_type}&efr=1`;
              //     let qr_box = $(".popup_send_chat").find(".qr_area")[0];
              //     var QR_CODE = new QRCode(qr_box, {
              //       width: 110,
              //       height: 110,
              //       colorDark: "#000000",
              //       colorLight: "#ffffff",
              //       correctLevel: QRCode.CorrectLevel.L,
              //     });
              //     QR_CODE.makeCode(link_qr);
              //     $(".popup_send_chat").show();
              //     $(".popup_send_chat .download_mobile").hide();
              //     $(".popup_send_chat .download_pc .btn_area").hide();
              //     if (url != "") {
              //       $("#popup_back_ut").show();
              //       $(".back_ut").attr("href", url);
              //       document.cookie =
              //         "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              //     } else {
              //       $(".popup_send_chat").show();
              //     }
              //   } else if (isMobile.any()) {
              //     if (isMobile.any()) {
              //       var url = getCookie("url");
              //       if (url != "") {
              //         $("#popup_back_ut").show();
              //         $(".back_ut").attr("href", url);
              //         document.cookie =
              //           "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              //       } else {
              //         $(".popup_send_chat").show();
              //       }
              //       openChatMobile(1192);
              //     }
              //   } else {
              //     openChat(0, linkChatWf, "SendCv");
              //     if (url != "") {
              //       $("#popup_back_ut").show();
              //       $(".back_ut").attr("href", url);
              //       document.cookie =
              //         "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              //     }
              //   }
              // }

              // setTimeout(() => {
              //   window.location.href = "/ung-vien/danh-sach-mau-cv";
              // }, 5000);
            }
            // deleteCookie(isStep1Ok);
          },
          error: (err) => {
            alert('Lưu cv không thành công vui lòng chọn mẫu khác')
            console.log(err.message);
            $(".bg-spinner").remove();
          },
        });
      }
    }
  }
  if (err != "" && (!isStep1Ok || isStep1Ok != "1") && cookieIsLogin == "true") {
    console.log(">>> Đã đăng nhập và tạo cv");
    // var idcv = $("#cvid").val();
    var id = getCookie(cookieId);
    $.ajax({
      type: "POST",
      url: "https://timviechay.vn/api/work247/candidate/UpdateInfoCv",
      async: true,
      beforeSend: function (request) {
        $("body").append(
          '<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
        );
        request.setRequestHeader("Authorization", "Bearer " + token);
      },
      data: {
        id,
        idcv,
        html: json_html_cv,
        height_cv,
        lang,
      },
      dataType: "json",
      success(response) {
        console.log('>>>  check payload: ', json_html_cv);
        if (response?.data?.result) {
          console.log(">>> check response: ", response?.data);
          setCandiAllowEmployerSearch("1");
          downloadAsPDF(
            `https://timviechay.vn/download/cv_pdf/user_${id}/cvid_${idcv}/${idcv}-timviechay`, name
          );

          $(".bg-spinner").remove();
          const url = Cookies.get('urlUt')
          if (url) {
            window.location.href = url
          } else {
            window.location.href = '/'
          }
        }
      },
      error: (err) => {
        console.log(err.message);
        $(".bg-spinner").remove();
      },
    });
  }
}

$(".btn_taixuong").click(() => {
  resg_new();
});

$(document).on("click", "#cvo-toolbar .line-height", function (e) {
  $("#cvo-toolbar .line-height").removeClass("active");
  $(this).addClass("active");
  var newspacing = $(this).attr("data-spacing");
  var oldlink = $("#cv-cpacing-css").attr("href");
  let version = Math.ceil(new Date().getTime() / 1000);
  var newlink =
    oldlink.slice(0, oldlink.lastIndexOf("/")) +
    "/" +
    newspacing +
    `.css?v=${version}`;
  $("#cv-cpacing-css").attr("href", newlink);
});

$(document).on("change", "#toolbar-font #font-selector", function (e) {
  e.preventDefault();
  var newfont = $(this).find("option:selected").val();
  var oldlink = $("#cv-font").attr("href");
  var newlink =
    oldlink.slice(0, oldlink.lastIndexOf("/")) + "/" + newfont + ".css";
  $("#cv-font").attr("href", newlink);
});
$(document).on("click", "#cvo-toolbar .fontsize", function (e) {
  e.preventDefault();
  let version = Math.ceil(new Date().getTime() / 1000);
  $("#cvo-toolbar .fontsize").removeClass("active");
  $(this).addClass("active");
  var newsize = $(this).attr("data-size");
  var oldlink = $("#cv-font-size").attr("href");
  var newlink =
    oldlink.slice(0, oldlink.lastIndexOf("/")) +
    "/" +
    newsize +
    ".css?v=" +
    version;
  $("#cv-font-size").attr("href", newlink);
});

$("#verify_otp_btn").click(function () {
  let account = document.getElementById("phone").innerHTML;
  //Nếu là email
  if (account.includes("@")) {
    var otp = Number($("#partitioned").val());
    var id = $("#active_dk").val();
    if (
      otp == "" ||
      otp < "100000" ||
      otp > "999999" ||
      otp == "NaN" ||
      id == 0
    ) {
      $(".txt_nd_modal").html("Vui lòng điền mã OTP hợp lệ!");
      $(".modal_tbcc .nd_modal").css("width", "420px");
      $(".modal_tbcc").show();
    } else {
      $.ajax({
        cache: false,
        type: "POST",
        url: "site/security2",
        data: {
          otp: otp,
          id: id,
        },
        success: function (data) {
          if (data == "") {
            $(".txt_nd_modal").html("Mã OTP không khớp, vui lòng thử lại!");
            $(".modal_tbcc .nd_modal").css("width", "420px");
            $(".modal_tbcc").show();
          } else {
            window.location.href = data;
          }
        },
      });
    }
  }
  //Nếu là SĐT
  else {
    //fire base evenet

    const btn_confirm = $(this);
    if (!btn_confirm.hasClass("confirm_otp")) {
      if (!btn_confirm.hasClass("captcha")) {
        fireBaseClient.config(account, btn_confirm);
        fireBaseClient.RecaptchaVerifier(btn_confirm);
        btn_confirm.val("Tiếp tục").addClass("captcha");
      } else {
        fireBaseClient.sendSms(account);
        btn_confirm.addClass("confirm_otp");
        setTimeout(() => {
          $("#recaptcha-container").html("");
          $("#partitioned").removeClass("hidden");
        }, 1000);
      }
    }
    //Xác thực OTP
    else {
      var otp = $("#partitioned").val();
      if (validateConfirmOTP(otp)) {
        fireBaseClient.codeverify(otp).then((result) => {
          if (result) {
            let id_tk = $(".xt_id").val();
            $.ajax({
              url: "site/verify_otp_sms",
              type: "POST",
              data: {
                id: id_tk,
                otp: otp,
              },
              success: function (data) {
                if (data == 2) {
                  $(".txt_nd_modal").html("Đã có lỗi xảy ra");
                  $(".modal_tbcc .nd_modal").css("width", "420px");
                  $(".modal_tbcc").show();
                } else {
                }
              },
            });
          } else {
            $(".txt_nd_modal").html("Mã OTP không khớp, vui lòng thử lại!");
            $(".modal_tbcc").show();
          }
        });
      }
    }
  }
});

$("#login_button").click((e) => {
  login(e);
});

$(".click-elm").click((e) => {
  e.preventDefault();
  const data = $.exportData();
  window.localStorage.setItem("cvData", data);
  const url = e.target.getAttribute("data-url");

  window.location.href = url;
});

$(".box_content_taocv").on("scroll", function () {
  if (!$(this).attr("data-pagi")) {
    console.log("test123131");
    changeLayoutCv();
    $(this).attr("data-pagi", 1);
  }
});