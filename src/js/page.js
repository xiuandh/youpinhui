// jQuery($=>{
// 	$.ajax({
// 	url:"../api/goods.php",
// 	type:"POST",
// 	success:function(data){
// 		$('.global_list ul').html();
// 		}
// 	});
// })

document.addEventListener('DOMContentLoaded',()=>{
	var ul = document.querySelector('.global_list ul');
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200 || xhr.status === 304){
					var data = JSON.parse(xhr.responseText);
					console.log(data);
					ul.innerHTML = data.map(function(item){
						return `<li>
							<div class="list_box">
								<a href="">
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
											平日价
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
// function rander(){
// 	<li>
// 		<div class="list_box">
// 			<a href="">
// 				<div class="list_box_img">
// 					<img src="img/zb6.jpg">
// 				</div>
// 				<p class="box_tit">
// 					<em class="img_tit">afafadf发福答复啊发阿发发撒</em>
// 				</p>
// 				<p class="box_subtit">发福答复啊</p>
// 				<div class="box_yan clearfix">
// 					<span class="box_price fl">999</span>
// 					<span class="sale_price fl">
// 						平日价
// 						<del>7777</del>
// 					</span>
// 					<span class="purchased fr"><em>34</em>已购买</span>
// 				</div>
// 			</a>
// 		</div>
// 		<div class="box_bt"></div>
// 	</li>
// }