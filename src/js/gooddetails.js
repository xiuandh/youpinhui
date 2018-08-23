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
			imglist.map(function(item,index){
				imgs += `<li><img src="${item}" data-id="${index+1}" data-big="${item}"/>`;
			})
			imgs += `<i class="iconfont icon-arrow rr"></i>`;
			$('.jqzoom').html(`<img src="${data.image}" data-big="${data.image}">`);
			$('.items').html(imgs);
			$('.count_brand').text(`${data.kind}`);
			$('.brand .title').text(`${data.name}`);
			$('.price').text(`${parseInt(data.price)}`);

			//放大镜
			$('.jqzoom').lxzoom().addClass('.box');
			$('.items').on('click','img',function(){
				$('.jqzoom img').attr({
					'src':this.src,
					'data-big':this.dataset.big
				});
			})

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
	
	
	//小图的点击跳转下一张
	//思路：先判断是总共又几张图，然后，一个框可以放下5张图片，点击右键，序号为1的一张图+1，点击左键。序号为1的+1
	// $('.items').on('click','i',function(e){
	// 	var length = $('.items li').length;
	// 	if(length>5){
	// 		if(e.target.className === 'iconfont icon-arrow ll'){
	// 		//点击向左走的按钮
				
	// 		}
	// 	}
		
	// })
	//点击按钮添加购物车效果
	$('.add_car').on('click',function(){

	})
})
//小图的点击跳转下一张
	//思路：先判断是总共又几张图，然后，一个框可以放下5张图片，点击右键，序号为1的一张图+1，点击左键。序号为
// document.eventListener('DOMContentLoaded',function(){
// 	var ul.
// })