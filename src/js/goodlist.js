jQuery($=>{
	$('.header').load("../index.html #header");
	$('.footer').load('../index.html .footer');
	$('.side').load('../index.html .sidebar');
	$('.sideout').load('../index.html .sideout');
	// ajax生成页面
	var curPage = 1;
	var totalPage,pageQuity,datalist;
	function getData(page,phpUrl){
		// 默认第一张
		$.ajax({
			// url:'../api/goodlist.php',
			url:phpUrl,
			type:'POST',
			data:{pagenum:page-1},
			success:function(datas){
				// console.log(datas);
				// console.log($.type(datas));//string

				datalist = $.parseJSON(datas);
				// console.log(datalist);
				curPage = page;
				pageQuity = datalist.pageQuity;
				// console.log(pageQuity)
				totalPage = datalist.totalPage;
				var html = '';
				var list = datalist.list;
				// console.log(list);
				$.each(list,function(index,array){
					html += `<li data-id="${array.id}">
					<img src="${array.imgUrl}">
					<div class="good_tit">
						<h3>${array.title}</h3>
						<p class="good_tip clearfix">
							<span class="good_price fl">￥${array.price}</span>
							<span class="good_count fr">评论<em>${array.commentnum}</em>条</span>
						</p>
					</div>
				</li>`
				})
				$('.good_list').append(html);
			},
			complete:function(){
				//生成分页
				getPageBar();
			},
			error:function(){
				alert('加载失败');
			}
		})
	}
	function getPageBar(rel){
		var pageStr;
		if(curPage>totalPage){
			curPage = totalPage;
		}
		if(curPage<1){
			curPage = 1;
		}
		//如果是第一页  
		if(curPage==1){  
			pageStr = `<a href='javascript:void(0)' class="text">首页</a><a href='javascript:void(0)' class="text">上一页</a>`;  
		}else{  
			pageStr = `<a href='javascript:void(0)' rel="1" class="text">首页</a><a href='javascript:void(0)' rel="${curPage-1}" class="text">上一页</a>`;  
		}  
		//生成中心按钮
		for(var i = 0;i<totalPage;i++){
			pageStr += `<a href='javascript:void(0)' rel='${i+1}' class="p_num">${i+1}</a>`;
		}

		//如果是最后页  
		if(curPage>=totalPage){  
			pageStr += `<a href='javascript:void(0)' class="text">下一页</a><a href='javascript:void(0)' class="text">尾页</a>`;  
		}else{  
			pageStr += `<a href='javascript:void(0)' rel="${curPage*1+1}" class="text">下一页</a><a href='javascript:void(0)' rel="${totalPage}" class="text">尾页</a>`;  
		}  
		$('.comment_page').append(pageStr);
	}
	$(function(){
		getData(1,'../api/goodlist.php');
		$('.comment_page').on('click','a',function(){
			var rel = $(this).attr('rel');
			if(rel){
				$('.comment_page').empty();
				$('.good_list').empty();
				getData(rel,'../api/goodlist.php');
			}
		})
	})

	//价格的排序,思考，是否可以在接口内进行判断是那个发出的请求
	$('.quily_sear li').on('click','.quilyprice',function(){
		console.log(1111);
		getData(1,'../api/price.php');
		$('.comment_page').on('click','a',function(){
			var rel = $(this).attr('rel');
			if(rel){
				$('.comment_page').empty();
				$('.good_list').empty();
				getData(rel,'../api/price.php');
			}
		})
	})

	// 点击商品进入详情页
	//jQuery 使用on绑定动态生成的元素时，不能直接用该对象操作，而是选择其非动态生成的父节点然后再找到本身才能达到效果。
	//获取自定义属性使用jquery的attr();
	$('.good_list').on('click','img',function(){
		// console.log(this);
		var id = $(this).closest('li').attr('data-id');
		// console.log(id);
		location.href = 'html/gooddetails.html?id='+id;
	})
	
})
