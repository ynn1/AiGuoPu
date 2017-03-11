$(function(){
	//-----------导航直接引用外部写好的nav.html------------------
	$(".nav").load("nav.html");
	//-----------轮播图----------------
	//-----------调用对象封装的的函数----------
	var l = new AutoPlayerImgs(
		"banner",
		1421,
		400,
		["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg","img/banner4.jpg","img/banner5.jpg"],
		["https://huodong.fruitday.com/cms/indexpc/1201?region_id=106092","https://huodong.fruitday.com/cms/indexpc_v3/1926?region_id=106092","https://huodong.fruitday.com/cms/indexpc/1817?region_id=106092","https://huodong.fruitday.com/cms/indexpc/1873?region_id=106092","https://huodong.fruitday.com/cms/indexpc_v3/1917?region_id=106092"],
		1500,
		{width:20,height:20,bgColor:"white",highLightColor:"#0f0"}
	);
	l.go();	
	//-----------------尾部引用外部写好的footer.html-----------------
	$(".footer").load("footer.html");
	//------------
	$(".container-top li img").mouseenter(function(){
		$(this).animate({
			"top":"15px"
		})
	});
	$(".container-top li img").mouseleave(function(){
		$(this).animate({
			"left":"0",
			"top":"0"
		})
	});
	//---------------内容左半部分效果设置------------
	$(".center1-left img").mouseenter(function(){
		$(this).animate({
			"width":"260px"
		})
	});
	$(".center1-left img").mouseleave(function(){
		$(this).animate({
			"width":"248px"
		})
	})
	//-------------------------动态创建内容-------------------------
	//---------------------效果封装函数xiaoguo()----------------------
	//------------------------内容效果设计（放在动态添加之后才会显示效果）---------------------------
	function xiaoguo(){
		var _left=0;
		//--------鼠标移到图片上-------
		$(".container ul dl dt").mouseenter(function(){
			//-------图片放大-------
			$(this).children("img").animate({
				"width":"300px"
			})
			//-----滚动文字出现-----
			$(this).children("p").animate({
				"bottom":"0"
			})
		});
		//--------鼠标移开--------
		$(".container ul dl dt").mouseleave(function(){
			$(this).children("img").animate({
				"width":"275px"
			})
			$(this).children("p").animate({
				"bottom":"-60px"
			})
			$(".container ul dl dt p i").animate({
				"left":"0px"
			})
		});
		//-------------------点击跳转商品详情----------------
		$(".container ul dl dt img").click(function(){
			location="http://127.0.0.1:8020/AiGuoPu/%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85.html";
		});
		//-------------------------点击添加到购物车-------------------------------
		$.getJSON("fruit.json",function(res){
			console.log(res);
			var a;
			var x;
			$(".container ul dl dd a img").click(function(){
				for(var i=0;i<res.length;i++){
					a=res[i].id;
//					console.log(a);
					if($(this).hasClass(a)){
						console.log(a);
						console.log(i);
						x=i;
						let htmlStr='<li><img src="img/'+res[x].url+'" width="100" height="100"/><div class="right"><h2 class="title">'+res[x].title+'</h2><br /><p class="jiage">价格:'+res[x].jiage+'</p><input type="button" class="jian" value="-"/><input  type="text" value="1" class="num"/><input type="button" class="jia" value="+"/><a href="###" class="del">删除</a></div></li>';
						$(".nav .shopCar .add").append(htmlStr);
						//-------点击删除-------
						$(".del").click(function(){
							console.log($(this).parents("li").detach());
						})
					}
				}
				//--------加入购物车时提示信息出现-----------
				$(".nav .shopping").css({
					"display":"block"
				})
				//----------一秒过后提示信息消失---------
				setTimeout(function(){
					$(".nav .shopping").css({
						"display":"none"
					})
				},1000)
			})
		})
	}
	//-----------第一部分-----果园推荐部分--------------------
	//滚动条设计-------------<marquee>滚动文字</marquee>
	$.getJSON("fruit.json",function(res){
		for(var i=0;i<res.length;i++){
		htmlStr="<li><dl><dt class='dt2'><img src='img/"+res[i].url+"'/><span class='wrap2'>"+res[i].youhui+"</span><p><marquee>"+res[i].beizhu+"</marquee></p></dt><dd><div class='ddleft'><a class='title' href='###'>"+res[i].title+"</a><br /><a href='###'>"+res[i].jiage+"</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[i].id+"'/></a></dd></dl></li>";
			//----------------第一部分-------果园推荐部分---------------
			$(".center1-right").append(htmlStr);
			//----------------第二部分·-------全球鲜果部分----------------
			$(".container-center2 .center2").append(htmlStr);
			//----------------第三部分------生鲜美食---------------------------
			$(".container-center3 .center2").append(htmlStr);
			//----------------第四部分---礼品卡劵部分--------------
			$(".container-center4 .center2").append(htmlStr);
		}
		//-----------效果实现------------
		xiaoguo();
	})
})