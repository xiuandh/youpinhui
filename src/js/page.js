document.addEventListener('DOMContentLoaded',()=>{
	// 头部轮播的动画效果
	var li = document.querySelector('.gps_l li:last-child');
	console.log(li);
	let div = li.children[0];
	// 无缝滚动关键1：把第一张复制到最后
	div.appendChild(div.children[0].cloneNode(true));
	// 初始化
	let idx = 0;
	let lenx = div.children.length;
	// 设置li高度，实现水平排列效果
	div.style.height = li.clientHeight * lenx + 'px';
	let timerdiv = setInterval(autoPlaydiv,3000);
	div.onmouseover = ()=>{
		clearInterval(timerdiv);
	}
	div.onmouseout = ()=>{
		timerdiv = setInterval(autoPlaydiv,3000);
	}
	function autoPlaydiv(){
		idx++;
		showdiv();
	}
	function showdiv(){

		//实现无缝
		if(idx>=lenx){
			// 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
			div.style.top = 0;
			idx = 1;
		}
		//ul的动画效果
		animate(div,{top:-idx*li.clientHeight});
	}

	// banner轮播图
	let banner = document.getElementsByClassName('banner')[0];
		let ul = banner.children[0];
		// 初始化
		let index = 0;
		// 无缝滚动关键1：把第一张复制到最后
		ul.appendChild(ul.children[0].cloneNode(true));

		let len = ul.children.length;

		// 设置ul宽度，实现水平排列效果
		ul.style.width = banner.clientWidth * len + 'px';

		// 添加分页
		let page = document.createElement('div');
		page.className = 'page';
		for(let i=0;i<len-1;i++){
			let span = document.createElement('span');
			span.innerText = i+1;
			if(i===index){
				span.className = 'active';
			}

			page.appendChild(span);
		}
		banner.appendChild(page);

		// 添加上一张、下一张按钮
		let btnNext = document.createElement('span');
		btnNext.className = 'btn-next';
		btnNext.innerHTML = '&gt;';

		let btnPrev = document.createElement('span');
		btnPrev.className = 'btn-prev';
		btnPrev.innerHTML = '&lt;';

		banner.appendChild(btnPrev);
		banner.appendChild(btnNext);

		let timer = setInterval(autoPlay,3000);

		// 鼠标移入移除
		banner.onmouseover = ()=>{
			clearInterval(timer);
		}

		banner.onmouseout = ()=>{
			timer = setInterval(autoPlay,3000);

		}

		banner.onclick = e=>{
			// 点击分页切换
			if(e.target.parentNode.className === 'page'){
				// 修改index值为当前分页数字-1
				index = e.target.innerText-1;

				show();
			}

			// 上一张，下一张
			else if(e.target.className === 'btn-prev'){
				index--;
				show();
			}else if(e.target.className === 'btn-next'){
				index++;
				show();
			}
		}
		//ul
		function autoPlay(){
			index++;
			show();
		}

		function show(){
			//实现无缝
			if(index>=len){
				// 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
				ul.style.left = 0;
				index = 1;
			}
			else if(index<0){
				index = len-2;
			}
			//ul的动画效果
			animate(ul,{left:-index*banner.clientWidth});

			//分页的高亮
			
			//先把其他的高亮给干掉
			for(let i=0;i<len-1;i++){
				page.children[i].className = ''
			}
			//给相应的分页按钮加上高亮
			if(index===len-1){
				page.children[0].className = 'active';
			}else{
				page.children[index].className = 'active';
				
			}
		}

	// 今日限购轮播图
	
	// 全球尖货部分页面的生成
	var globalList = document.querySelector('.global_list');
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200 || xhr.status === 304){
				var data = JSON.parse(xhr.responseText);
				console.log(data);
				globalList.innerHTML = data.map(function(item){
					return `<li data-id="${item.id}">
						<div class="list_box">
							<a href="javascript:void(0)">
								<div class="list_box_img">
									<img src="${item.image}">
								</div>
								<p class="box_tit">
									<em class="img_tit">${item.name}</em>
								</p>
								<p class="box_subtit">${item.introduce}</p>
								<div class="box_yan clearfix">
									<span class="box_price fl">${item.price}</span>
									<span class="sale_price fl">
										${item.decount}
										<del>${item.discount}</del>
									</span>
									<span class="purchased fr"><em>${item.num}</em>已购买</span>
								</div>
							</a>
						</div>
						<div class="box_bt"></div>
					</li>`;
				}).join('');
			}
		}
	}
	xhr.open('get','../api/goods.php',true);
	xhr.send();
});

jQuery(function($){
	//倒计时效果
	var timer = setInterval(time,1000);
	function time(){
		console.log('ssss');
		//活动时间
		var end = new Date('2018-8-24 12:20:00');
		var now = new Date();
		console.log(now);
		//转换为毫秒，比较差值
		var offset = Date.parse(end) - Date.parse(now);
		if(offset <= 0){
			clearInterval(timer);
			offset = 0;
		}
		offset = offset/1000;
		//把差值转换为几天几时几分几秒
		var sec = offset%60;
		var min = Math.floor(offset/60)%60;
		var hour = Math.floor(offset/60/60)%24;

		//补零操作
		hour = hour<10? '0'+hour: hour;
		min = min<10? '0'+min: min;
		sec = sec<10? '0'+sec: sec;
		$('.hours').html(hour);
		$('.mins').html(min);
		$('.secs').html(sec);
	}
	//侧边栏登录 点击关闭按钮
	$('.bat-top .closeX').on('click',function(){
		$('.side_login').hide();
	})
	$('.bat-top .icon-photo').on('mouseover',function(){
		$('.side_login').show();
	})

	//返回顶部效果
	$('.bat-bottom .icon-arrow').on('click',function(){
		var sorrll = window.scrollY;
		sorrll = window.scrollTo(0,0);
	})

	//点击商品图片调转致详情页面
	$('.global_list').on('click','img',function(){
		// console.log(this);
		var id = $(this).closest('li').attr('data-id');
		// console.log(id);
		location.href = 'html/gooddetails.html?id='+id;
	})

	//由登录页面跳转进来的首页，读取cookie，更改首页头部的名字
	var userCookie = Cookie.get('username');
	var user = JSON.parse(userCookie);
	$('.gps_r li:first-child').find('span').text('欢迎您,'user);
	$('.gps_r li:nth-child(2)').find('span').text('退出');
	$('.gps_r li:nth-child(2) span').on('click',function(e){
		Cookie.remove('username');
		e.preventDefault();
		$('.gps_r li:first-child').find('span').text('注册');
		$('.gps_r li:nth-child(2)').find('span').text('登录');
	})

	//根据cookie生成小型购物车
	var carCookie = Cookie.get('goodslist');
	if(carCookie.length<=0){
		carCookie = [];
	}else{
		carData = JSON.parse(carCookie);
		render();
	}
	
	function render(){
		var carNum = 0;
		var carSum = 0;
		var html = '';
		$.each(carData,function(index,car){
			html +=`
				<li data-car="${car.guid}">
					<a href="" class="clearfix">
						<div class="carting">
							<img src="${car.imgurl}">
						</div>
						<p class="cartlink">${car.name}</p>
						<p class="pricemx">￥<span>${car.price}</span>x<em>${car.qty}</em></p>
					</a>
				</li>
			`
		})
		$('.carul').append(html);
		$('.carul').children('li').each(function(idx){
			carNum += $(this).find('em').text()*1;
			carSum += $(this).find('span').text()*1;
		})
		$('.carnum').children('em').text(carNum);
		$('.cartotal').children('em').text(carSum);
	}

	//点击小型购物车的的链接,返回商品详情
	$('.carul li').on('click','a',function(e){
		var aid = $(e.target).closest('li').attr('data-car');
		location.href = 'html/gooddetails.html?id='+aid;
		e.preventDefault();
	})

})
