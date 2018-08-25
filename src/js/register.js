jQuery($=>{
	$('.header').load("../index.html .gps");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');
	//检测电话号码是否已经注册
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

	$('.commit').on('click',function(e){
		//表单验证输入信息是否正确
		var tel = $('.tel').val();
		if(!/^1[3-8]\d{9}$/.test(tel)){
			alert('手机号码格式有误');
			//清空并聚焦
			$('.tel').val('');
			$('.tel').focus();
			return false;
		}
		var pass = $('.userpd').val();
		var confirm = $('.userpdq').val();
		if(pass != confirm){
			alert('两次输入的密码不一致');
			return false;
		}
		if(!$('.checkbox').is(':checked')){
			return false;
		}
		//清除表单提交的默认行为
		e.preventDefault();
		$.ajax({
			url:'../api/adduser.php',
			type:'POST',
			data:{passw:pass,telp:tel},
			success:function(datas){
				console.log(datas);
				if(datas === 'success'){
					window.location.href = 'html/login.html';
				}
			}
		})
	})
})