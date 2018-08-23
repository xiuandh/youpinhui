jQuery($=>{
	$('.header').load("../index.html #header");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');

	// var address = location.href;
	var prp = location.search;
	// console.log(address);
	var goodId = prp.slice(4);
	// console.log(goodId);
	$.ajax({
		url:'../api/goodetails.php',
		type:'POST',
		data:{id:goodId},
		success:function(datas){
			var data = $.parseJSON(datas)[0];
			// console.log(data);
			//生成点击轮播小图
			var imglist = data.imagelist.split(',');
			var imgs = `<i class="iconfont icon-arrow ff"></i>`;
			imglist.map(function(item){
				imgs += `<li><img src="${item}"/>`;
			})
			imgs += `<i class="iconfont icon-arrow rr"></i>`;
			$('.jqzoom').html(`<img src="${data.image}">`);
			$('.items').html(imgs);
			$('.count_brand').text(`${data.kind}`);
			$('.brand .title').text(`${data.name}`);
			$('.price').text(`${parseInt(data.price)}`);
		}
	})
	// 数量点击的添加与减少
	$('.num').on('click','button',function(e){
		var input = $('.num_num');
		var num = parseInt(input.val());
		if(e.target.className === 'num_dev fl'){
			if(input.val()==1){
				input.val('1');
			}else{
				input.val(num-1);
			}
		}
		if(e.target.className === 'num_add fl'){
			input.val(num+1);
		}
	})
	
	//点击按钮添加购物车效果
	$('.add_car').on('click',function(){
		
	})
})