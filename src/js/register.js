jQuery($=>{
	$('.header').load("../index.html .gps");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');
	//检测电话号码是否已经注册
	//
	$('.tel').blur(function(){
		var text = $('.tel').val();
		$.ajax({
			url:'../api/register.php',
			type:'POST',
			data:{userpd:text},
			success:function(data){
				if(data === 'no'){
					$('.telcheck').text('该电话号码已注册')
				}
			}
		})
	});


	$('.commit').on('click',function(){
		var tel = $('.tel').val();
		console.log(tel);
		var pass = $('.userpd').val();
		console.log(pass);

		$.ajax({
			url:'../api/adduser.php',
			type:'GET',
			data:{passw:pass,telp:tel},
			success:function(datas){
				if(datas === 'success'){
					location.href = 'login.html';
				}
			}
		})
	})
})