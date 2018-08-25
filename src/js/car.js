jQuery($=>{
	$('.header').load("../index.html .gps_r");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');

	// 读取cookie取值
	//读取cookie，写入页面carList
	var cookie = Cookie.get('goodslist');//goodlist=[{"id":"g02","src":"http://localhost:8080/xx/cookie/images/162.jpg","h4":"精美包包2","price":"88.88","qty":1},
	if(cookie.length<=0){
		cookie = [];
	}else{
		cookie = JSON.parse(cookie);
	}
	rander();

	//点击单个删除按钮
	// 找出删除的商品 -> 从数组中移除 -> 重写cookie -> 渲染页面
	$('.cart').on('click','.c_del',function(e){
		console.log(e.target);
		var current = $(e.target).closest('.cart_split');
		var id = current.attr('data-carid');
		console.log(id);
		for(var i=0;i<cookie.length;i++){
			if(cookie[i].guid === id){
				//截取
				console.log(cookie.splice(i,1));
				break;
			}
		}
			//重写cookie
		Cookie.set('goodslist',JSON.stringify(cookie));
		rander();
	})
	//渲染页面
	function rander(){
		//读取cookie,写入页面
		$('.cart').empty();
		var html = '';
		$.each(cookie,function(index,array){
			html += `
			<div class="cart_split" data-carid="${array.guid}">
					<div class="car_split_tit">
						<input type="checkbox">
						<span>${array.shop}</span>
					</div>
					<div class="cart_con">
						<div class="cart_form clearfix" data-id="${array.guid}">
							<dl class="c_meg fl">
								<dt><a href=""><img src="${array.imgurl}" alt=""></a></dt>
								<dd>
									<p><a href="">${array.name}</a></p>
								</dd>
							</dl>
							<div class="c_price fl">
								<p class="price_num">￥<span>${array.price}</span></p>
							</div>
							<div class="c_quantity fl">
								<div class="c_amount">
									<span class="c_dev">-</span>
									<input type="text" class="c_nums" value="${array.qty}">
									<span class="c_add">+</span>
								</div>
							</div>
							<div class="c_sum fl">
								<p>￥<span>${array.price*array.qty}</span></p>
							</div>
							<div class="c_action fl">
								<span class="c_del">x</span>
							</div>
							<div class="c_check">
								<input type="checkbox">
							</div>
						</div>
					</div>
			</div>`
		})
		$('.cart').append(html);
	}

	// 数量点击的添加与减少
	$('.cart').on('click','span',function(ev){
		if(ev.target.className === 'c_dev'){
			var inputdevs = $(ev.target).closest('.c_amount').children('input:text');
			var devnum = parseInt(inputdevs.val());
			if(inputdevs.val()==1){
				inputdevs.val('1');
			}else{
				inputdevs.val(devnum-1);
			}
		}
		if(ev.target.className === 'c_add'){
			var inputadds = $(ev.target).closest('.c_amount').children('input:text');
			var addnum = parseInt(inputadds.val());
			inputadds.val(addnum+1);
		}
	})

	//点击数量改变的时候改变总价
	$('.cart').on('click','span',function(eve){
		// console.log(eve.target);
		var parent = $(eve.target).closest('.cart_form');
		var input = parent.find('.c_nums');
		var num = parseInt(input.val());

		//获取总价元素
		var sum = input.closest('.c_quantity').next('.c_sum').find('span');
		var prc = input.closest('.c_quantity').prev('.c_price').find('span').text()*1;
		
		var totalPrice = num*prc;
		sum.text(totalPrice);
	})
	//输入数量改变总价
	$('.c_nums').blur(function(){
		var cost = $(this).closest('.c_quantity').prev('.c_price').find('span').text()*1;
		var sums = $(this).closest('.c_quantity').next('.c_sum').find('span');
		sums.text(cost*parseInt($(this).val()));
	})

	//勾选全选不选
	$('#cart_all').on('click',function(){
		if($(this).is(':checked')){
			All();
		}else{
			No();
		}
		closing();
	})
	// 结算栏目下的全选全不选
	$('#check_all').on('click',function(){
		if($(this).is(':checked')){
			All();
		}else{
			No();
		}
		closing();
	})

	//若是一个商铺中的商品被勾上了，则商铺前面的复选框需要被勾上
	$('.cart').on('click',function(e){
		console.log(e.target);
		//找到当前列表的顶端，判断该店的都勾选了
		if(e.target.parentNode.className === 'c_check'){
			console.log(e.target);
			console.log(888);
			//获取到了顶端复选框
			var carsplit = $(e.target).closest('.cart_con').prev('.car_split_tit').children('input:checkbox');
			console.log(carsplit);
			//用户预先选了几种产品
			var length = $(e.target).closest('.cart_con').find('input:checkbox');
			console.log(length);
			//用户现如今勾选了几种
			var userlen = $(e.target).closest('.cart_con').find('input:checkbox').filter(':checked');
			console.log(userlen);
			$(carsplit).prop('checked',length.length === userlen.length);
		}
		if(e.target.parentNode.className === 'car_split_tit'){
			console.log(9999);
			//获取顶端的列表元素
			var cartit = $(e.target).closest('.car_split_tit').next('.cart_con').find(':checkbox');
			if($(e.target).is(':checked')){
				cartit.prop('checked',true);
			}else{
				cartit.prop('checked',false);
			}
		}
		checkAll();
		closing();
	})

	//点击结算栏目中的删除
	$('.b_del').on('click',function(e){
		var currentCart = $(e.target).closest('.cart_sum').prev('.cart').find('.cart_con');
		currentCart.each(function(idx){
			console.log(this);
			if($(this).find('input:checkbox').is(':checked')){
				var storeid = $(this).children('.cart_form').attr('data-id');
				console.log(storeid);
				for(var i=0;i<cookie.length;i++){
					if(cookie[i].guid === storeid){
						//截取
						console.log(cookie.splice(i,1));
						break;
					}
				}
				//重写cookie
				Cookie.set('goodslist',JSON.stringify(cookie));
				rander();
				closing();
			}
		})
	})

	function checkAll(){
		var target = $('.cart').find(':checkbox');
		console.log(target);
		var userlength =  target.filter(':checked');
		console.log(userlength);
		$('#cart_all').prop('checked',target.length===userlength.length);
		$('#check_all').prop('checked',target.length===userlength.length);
	}
	//全选
	function All(){
		$('.car input:checkbox').each(function(index){
			$(this).prop('checked',true);
		});
	}
	//全不选
	function No(){
		$('.car input:checkbox').each(function(index){
			$(this).prop('checked',false);
		});
	}
	//结算栏目
	//预先循环判断那些被勾选的商品，然后只算被勾选的那些总和
	function closing(){
		var totalnum = 0;
		var totalprice = 0;
		//计算总数
		$('.c_nums').each(function(index){
			if($(this).closest('.c_quantity').siblings('.c_check').children(':checkbox').is(':checked')){
				totalnum += parseInt($(this).val());
			}
		});
		//计算总价格
		$('.c_sum p span').each(function(idx){
			console.log(this);//<span>1589</span>
			if($(this).closest('.c_sum').siblings('.c_check').children(':checkbox').is(':checked')){
				totalprice += parseInt($(this).text());
			}
		});
		$('.c_num em').text(totalnum);
		$('.storeprice em').text(totalprice);
		$('.actualprice em').text(totalprice);
	}
})