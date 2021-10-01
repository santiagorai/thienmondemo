// Sử dụng proxy JSON được xây dựng
const URLPROXY = "https://cors-anywhere.herokuapp.com/";

// Mã Hóa Url
const encode = function (url) {
  //return encodeURIComponent(url);
  return url;
};
//chuyển từ index qua

$(document).ready(function () {
  timing();
});
// baner slide
var banners = $(".banner .banner-box ul>li a");
var index = 0;
function play() {
  index++;
  if (index == 5) {
    index = 0;
  }
  for (let i = 0; i <= banners.length; i++) {
    if (i == index) {
      banners.eq(i).attr("class", "show");
    } else {
      banners.eq(i).attr("class", "hidden");
    }
  }
}
var timer = setInterval(play, 2000);
$(".banner .banner-box ul>li").mouseover(function () {
  clearInterval(timer);
});
$(".banner .banner-box ul>li").mouseout(function () {
  timer = setInterval(play, 2000);
});

// Thời gian ViP
var freetime = $(".free-time .timing-block p.time");
function addZero(i) {
  return i <= 9 ? "0" + i : i;
}
function timing() {
  var nowtime = new Date();
  var endtime = new Date("2020/07/11,00:00:00");
  var time = parseInt(endtime.getTime() - nowtime.getTime());
  var days = parseInt(time / 1000 / 60 / 60 / 24);
  var hours = parseInt((time / 1000 / 60 / 60) % 24);
  var minutes = parseInt((time / 1000 / 60) % 60);
  var seconds = parseInt((time / 1000) % 60);
  freetime.text(
    days +
      "天" +
      addZero(hours) +
      ":" +
      addZero(minutes) +
      ":" +
      addZero(seconds)
  );
  // Sự Khác Biệt Hai Mốc Thời gian <0 Kết Thúc
  if (time <= 0) {
    $(".free-time").hide();
    // clearTimeout(timer);
    return;
  }
  var timer = setTimeout(timing, 1000);
}

// đổi màu di chuyển chuột menu
$(".banner-menu").on("mouseover", "a", function (e) {
  var index = $(this).index();
  var listImg = $(".banner-box ul>li a");
  $(".banner-box ul>li a")
    .eq($(this).index())
    .siblings("a")
    .removeClass("show")
    .addClass("hidden");
  if (listImg.eq(index).hasClass("hidden")) {
    listImg.eq(index).removeClass("hidden");
    listImg.eq(index).addClass("show");
  }
  clearInterval(timer);
});
// bỏ nút chế độ xoay tự dộngd
$(".banner-menu").on("mouseout", "a", function () {
  timer = setInterval(play, 2000);
});

/* Di Chuyển Chuột Để Hiển Thị Menu */
$("#show-allMenu").mouseover(function () {
  $(".menu-list").css("display", "block");
});
$(".menu-list").mouseout(function () {
  $(this).css("display", "none");
});
$(".menu-list").mouseover(function () {
  $(this).css("display", "block");
});

/* Hộp Đăng Nhập  */
function login(event) {
  this.id = $(event).attr("id");
  if (this.id === "login") {
    $(".login").css("display", "block");
    $('.login-box input[type="submit"]').attr("value", "Đăng Nhập");
    $(".tips p")[0].childNodes[0].nodeValue = "Đăng nhập có nghĩa Đồng ý";
  } else {
    // Đăng ký
    $(".login").css("display", "block");
    $('.login-box input[type="submit"]').attr("value", "Đăng Ký");
    $(".tips p")[0].childNodes[0].nodeValue = "Đăng ký có nghĩa Đồng ý";
    // $('.tips p').text($('.tips p').text().replace("登录","注册"))
  }
}

// Chăn Sự Kiện Mặt Định Của Hộp Tìm Kiếm
$(document).on("keypress", ".search-wrap form", function (event) {
  return event.keyCode != 13;
});
// Nhập Nút Tìm Kiếm Liên Kết
function search() {
  if (event.keyCode == 13) {
    $("#search-btn").click();
  }
}

// Đóng Hộp Đăng Nhập
$(".close").click(function () {
  $(".login").css("display", "none");
});

// box Đăng Nhập
$("#login_btn").click(function (event) {
  event.preventDefault();
  var username = $("#username").val();
  var password = $("#userpwd").val();
  var btn = event.currentTarget.value;
  if (username != "" && password != "") {
    var reg = /^[A-z]\w{5,8}/g;
    if (!reg.test(password)) {
      alert("密码必须以字母开头,长度6-8位！");
      return;
    }
    alert(btn + "成功！");
    $(".login").css("display", "none");
    $(".user-message,.user-avatar").css("display", "block");
    $(".user-wrap p").css("display", "none");
  } else {
    alert("用户名或密码不许为空！");
  }
});

// ID Và Tên Danh Mục
$.get(
  `${URLPROXY}http://admin.iqingtun.com/web/bookroom/bookcategory`,
  (data) => {
    $.each(data.data, (i, value) => {
      if (i >= 8) {
        return false;
      }
      $(".header-nav .menu-list ul").append(`
					<li><a href="./bookAll.html?class_id=${value.id}">${value.title}</a></li>
				`);
    });
    // Phân Loại Trang，Điềều Kiện Phân Loai
    if ($(".books-classify").length != 0) {
      $.each(data.data, (i, value) => {
        $(".books-classify .tags").eq(0).append(`
						<span id=${value.id} class=${i == 0 ? "active" : ""}>${value.title}</span>
					`);
      });
    }
  }
);

/**
 * 获取URL参数
 	参考 https://blog.csdn.net/suyu_happy/article/details/78643005
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //Xây dựng một đối tượng biểu thức chính quy với các tham số đích 
  var r = window.location.search.substr(1).match(reg); //Khớp các thông số mục tiêu 
  if (r != null) return decodeURI(r[2]);
  return null; //Giá trị tham số trả về 
}

// Hiển Thị Lớp Phủ
function setMask(state = "block") {
  $(".mask").css("display", state);
}

// Bám Vào Nút Tìm Kiếm
$("#search-btn").click(function () {
  window.open("./bookAll.html?search=" + $("#search-input").val(), "_self");
});

var book_id = getUrlParam('bookid');
	$('.bookName').attr('href',"catalog.html?bookid="+book_id);
	if (book_id != null) {
		// Nhận Thông Tin Truyện
		setMask()
		$.get(`${URLPROXY}http://admin.iqingtun.com/web/book/index?id=${book_id}&u_id=`,(data)=>{
			console.log(data);
			var content = data['data'].chapter_content
			$('.book-img img').attr('src','http://'+data['data'].front_cover);
			$('.book-info p.intro').text(content.replace(/(<\w>|<\/\w>)/g,''));
			$('.book-info h3').text(data['data'].title);
			$('.book-info p.book-author').text(data['data'].u_name);
			$('.book-info span.state').text(data['data'].update_status)
			$('.book-info span.class').text(data['data'].c_title)
			$('.book-info .book-mess span.number').text(data['data'].char_num)
			$('.book-info .book-mess span.hits').text(data['data'].hits)
			$('.process a.className').text(data['data'].c_title)
			$('.process a.bookName').text(data['data'].title)
			$('.book-info .btn a.read-btn').text(data['data'].is_vip == 0 ? 'Đọc Miễn Phí' :'Chỉ Đọc Vip').attr('data-vip',data['data'].is_vip)
			$('.catalog-list .uprocess').text(data['data'].chapter_title + "  "+ data['data'].last_update_chapter_time).attr('href',`./read.html?bid=${book_id}&cid=${data['data'].last_update_chapter_id}`)
		});

		// Cập Nhật Danh Mục
		$.get(`${URLPROXY}http://admin.iqingtun.com/web/book/directory?id=${book_id}&order=0`,(data)=>{
			var chapters = data.data.volume[0].chapter;
			// console.log($('.read-btn').attr('data-vip'));
			$('.read-btn').attr('href',$('.read-btn').attr('data-vip') == 0 ? `./read.html?bid=${chapters[0].b_id}&cid=${chapters[0].id}` :'javascript:alert("仅限VIP阅读哦！");')
			$('.catalog-list h5').text(`正文·共${chapters.length}章`)
			$('.nav-title p').text(`目录(${chapters.length}章)`)
			var chapter_list = "";
			try{
				$.each(chapters,(i,value)=>{
					chapter_list += `<li><a href="./read.html?bid=${book_id}&cid=${value.id}">第${i+1}章 ${value.title}</a></li>`
				})
			}catch{
				var chapters = data.data.volume[1].chapter;
				$.each(chapters,(i,value)=>{
					chapter_list += `<li><a href="./read.html?bid=${book_id}&cid=${value.id}">第${i+1}章 ${value.title}</a></li>`
				})
			}
			// Tránh Các Chương Trống
			chapter_list += chapters.length % 3==1? '<li></li><li></li>':chapters.length % 3==2 ? '<li></li>' :'';
			$('.catalog-list ul').html(chapter_list)
			setMask('none')
		});
	}

	$('.unfold').click(function(){
		if ($(this).text() == "Thu Gọn") {
			$(this).text("Xem Thêm")
			$('.intro').css('display','-webkit-box')
		}else{
			$(this).text("Thu Gọn")
			$('.intro').css('display','block')
		}
	})
// 更改主样式颜色
// $(":root").css('--main-color','pink')
