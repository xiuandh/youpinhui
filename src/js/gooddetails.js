jQuery($=>{
	$('.header').load("../index.html #header");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');

	// var address = location.href;
	var prp = location.search;
	// console.log(address);
	var guid = prp.slice(4);
	// console.log(guid);
	$.ajax({
		url:'../api/goodetails.php',
		type:'POST',
		data:{id:guid},
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
			$('.price').children('em').text(`${parseInt(data.price)}`);

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
	
	// 收货地址的鼠标移入显示
	$('.mt .close').on('click',function(){
		// $('.content').css({display:'none'});
		$('.content').hide();
	})
	$('.input').on('mouseover',function(){
		// $('.content').css({display:'block'});
		$('.content').show();
	})

	// 点击关注，关注内容变为已关注，鼠标移入效果
	$('.baidu_share li:last-child').on('click',function(){
		$(this).children('span').text('已关注');
		$('.concerns_tip').show();
		$('.baidu_share li:last-child').on('mouseout',function(){
			$('.concerns_tip').hide();
		});
	})
	$('.baidu_share li:last-child').on('mouseover',function(){
		var love = $('.baidu_share li:last-child span').text();
		if(love === '已关注'){
			$('.concerns_tip').show();
		}else{
			$('.concerns_tip').hide();
		}
	});

	//点击省市区的时候填入地址栏一块
	$('.tab .tab_content li').on('click','span',function(e){
		console.log(e.target);
		var ulSear = $(e.target).closest('li').closest('ul');
		var nameSear = ulSear.attr('data-id');
		var addres = $(e.target).text();
		switch(nameSear){
			case 'province':
				$('.input .province_ed').text(addres);
			break;
			case 'city':
				$('.input .city_ed').text(addres);
			break;
			case 'area':
				$('.input .area_ed').text(addres);
			break;
		}
	})

	//点击按钮添加购物车效果
	//点击按钮的时候获取页面的信息，存入cookie,购物车页面读取cookie
	// $('.sh_goods_key').on('click','.add_car',function(e){
		// 声明一个变量，用于存放所有添加的商品信息
		var goodslist = Cookie.get('goodslist');//'[{},{}..]' 或 ''

		if(goodslist === ''){
			goodslist = []
		}else{
			goodslist = JSON.parse(goodslist);//goodslist必须为json字符串
		}
		console.log(goodslist);
		$('.sh_goods_key').on('click','.add_car',function(e){
		//获取父辈元素，取得title和price
		var goodDr = $(e.target).closest('.sh_goods_parameters');
		var title = goodDr.find('.title').text();
		var price = goodDr.find('span.price').children('em').text();
		var num = goodDr.find('.num_num').val()*1;
		//店铺名字
		var store = goodDr.find('.ugo_bar a').text();
		console.log(store);
		//找到兄弟节点，取图片
		var goodUrl = goodDr.prev('.sh_goods_gallery');
		var imgUrl = goodUrl.find('.jqzoom img').attr('src');
		//找到最外围的节点，获取购物车数量
		var buycar = $(e.target).closest('.details').siblings('.side').find('.bat-top .buycarnum');
		var buycarnum = buycar.text()*1;

		// 判断当前商品是否已经添加过
		// * 已添加：找出这个商品，数量+1
		// * 未添加：创建对象，商量为1，写入数组
		var currentGoods = goodslist.filter(function(g){
			return g.guid === guid;
		});//[{}]或[]

		if(currentGoods.length>0){
			// 存在，数量+1
			currentGoods[0].qty=currentGoods[0].qty+num;
			buycarnum = currentGoods[0].qty+buycarnum;
		}else{
			// 不存在，添加商品

			// 获取商品信息
			// 把goods保持外观，存入cookie(只能字符串)：json字符串
			var goods = {
				guid:guid,
				imgurl:imgUrl,
				name:title,
				price:price,
				qty:num,
				shop:store,
			}
			console.log(goods);
			buycarnum = goods.qty+buycarnum;

			// 当前商品添加到数组
			goodslist.push(goods);

		}
		//把数量写入
		buycar.text(buycarnum);
		var date = new Date();
		//一旦使用变量接收则变量是毫秒数，因此直接设置天数
		date.setDate(date.getDate()+1);
		var obj = {expires:date,path:'/'};
		Cookie.set('goodslist',JSON.stringify(goodslist),obj);
		
	})
})
//送至地址的tab切换
document.addEventListener("DOMContentLoaded",function(){
	var span = document.querySelectorAll('.mt li');
	// console.log(span);
	var dic = document.querySelectorAll('.tab .tab_content');
	// console.log(dic);
	for(var i=0;i<span.length;i++){
		span[i].onclick = function(i){
			// console.log(this.innerText);//可以很完美的展现出
			return function(){
				for(var j=0;j<span.length;j++){
						span[j].className = '';
						dic[j].style.display = 'none';
					}
					span[i].className = 'active';
					dic[i].style.display = 'block';
				}	
		}(i);
	}
})