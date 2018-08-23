jQuery($=>{
	$('.header').load("../index.html .gps");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');
	$('.land_logo').load('html/register.html .land_logo');
	$('.regnav').load('html/register.html .regnav');



		
	$('.btn').on('click',function(){
		var text = $('.tel').val();
		console.log(text);
		var pass = $('.userpd').val();
		console.log(pass);
		$.ajax({
			url:'../api/checkname.php',
			type:'POST',
			data:{usertel:text,userpd:pass},
			success:function(data){
				if(data === 'yes'){
					location.href = '../index.html';
					
				}
				if(data === 'no'){
					$('.dialog').show();
					$('.dislogs').show();
				}
			}
		})
	})
	
})





