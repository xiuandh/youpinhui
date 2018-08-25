jQuery($=>{
	$('.header').load("../index.html .gps");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');
	$('.land_logo').load('html/register.html .land_logo');
	$('.regnav').load('html/register.html .regnav');

	$('.btn').on('click',function(e){
		var text = $('.tel').val();
		var pass = $('.userpd').val();
		e.preventDefault();
		$.ajax({
			url:'../api/checkname.php',
			type:'POST',
			data:{usertel:text,userpd:pass},
			success:function(data){
				console.log(data);
				if(data === 'yes'){
					$('.dialog').hide();
					$('.dialogs').hide();
					location.href = '../index.html';
				}
				if(data === 'no'){
					$('.dialog').show();
					$('.dialogs').show();
				}
			}
		})
		//设置cookie,把用户名传递给主页
		var now = new Date();
		now.setDate(now.getDate()+1);
		var obj = {expires:now,path:"/"};
		console.log(obj);
		Cookie.set('username',JSON.stringify(text),obj);
	})

	// 密码输入错误弹窗关闭
	$('.btn_close').on('click',function(){
		$(this).closest('.dialog').hide();
		$(this).closest('.dialogs').hide();
	})
	
	
})





