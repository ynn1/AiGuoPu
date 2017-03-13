$(function(){
	$(".nav").load("nav.html");
	//
	setTimeout(function(){
		$(".nav .center li:eq(0)").removeClass("active");
	},30)
	$(".footer").load("footer.html");
	//------------------------------------动态创建内容-------------------------------
	//----------------模拟后台----------------------
	let htmlStr="<ul>";
	$.getJSON("fruit.json",function(res){
		console.log(res);
		for(var i=0;i<res.length;i++){
		htmlStr+="<li><dl><dt class='dt2'><img src='img/"+res[i].url+"' class='"+res[i].id+"'/><span class='wrap2'>会员专享</span><p><marquee>"+res[i].beizhu+"</marquee></p></dt><dd><div class='ddleft'><a href='###'>"+res[i].title+"</a><br /><a href='###'>"+res[i].jiage+"</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[i].id+"'/></a></dd></dl></li>";
		}
		htmlStr+="</ul>";
		$(".containerCenter").append(htmlStr);
		xiaoguo();
		//-------------点击选择内容------------
		var a;
		var x;
		$(".containerTop a").click(function(){
			$(".containerCenter").text("");
			let htmlStr="<ul>";
			//--------按点击的内容选择商品-----
			for(var i=0;i<res.length;i++){
				a=res[i].tag;
				if($(this).hasClass(a)){
					x=i;
					htmlStr+="<li><dl><dt class='dt2'><img src='img/"+res[x].url+"' class='"+res[x].id+"'/><span class='wrap2'>会员专享</span><p><marquee>"+res[x].beizhu+"</marquee></p></dt><dd><div class='ddleft'><a href='###'>"+res[x].title+"</a><br /><a href='###'>"+res[x].jiage+"</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[x].id+"'/></a></dd></dl></li>";
				}
				//-------点击全部时------
				if($(this).hasClass("all")){
					htmlStr+="<li><dl><dt class='dt2'><img src='img/"+res[i].url+"' class='"+res[i].id+"'/><span class='wrap2'>会员专享</span><p><marquee>"+res[i].beizhu+"</marquee></p></dt><dd><div class='ddleft'><a href='###'>"+res[i].title+"</a><br /><a href='###'>"+res[i].jiage+"</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[i].id+"'/></a></dd></dl></li>";
				}
			}
			htmlStr+="</ul>";
			$(".containerCenter").append(htmlStr);
			xiaoguo();
		})
	})
	//------------内容效果封装函数----------------
	function xiaoguo(){
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
		//-----------------------点击跳转效果-------------------------------
	
		$.getJSON("fruit.json",function(res){
			console.log(res);
			var a;
			var x;
			//-------------------------点击添加到购物车-------------------------------
			$(".container ul dl dd a img").click(function(){
				for(var i=0;i<res.length;i++){
					a=res[i].id;
//					console.log(a);
					if($(this).hasClass(a)){
						console.log(a);
						console.log(i);
						x=i;
						let htmlStr='<li><img src="img/'+res[x].url+'" width="100" height="100" class="'+res[x].id+'"/><div class="right"><h2 class="title">'+res[x].title+'</h2><br /><p class="jiage">价格:'+res[x].jiage+'</p><input type="button" class="jian" value="-"/><input  type="text" value="1" class="num"/><input type="button" class="jia" value="+"/><a href="###" class="del">删除</a></div></li>';
						$(".nav .shopCar .add").append(htmlStr);
						//-------点击删除-------
						$(".del").click(function(){
							console.log($(this).parents("li").detach());
						})
						$.post("fruit.php",
								{
									"title":res[x].title,
									"jiage":res[x].jiage
								},
								function(data){
									alert(data);
								}
						)
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
		});
	
			//---------------------------------跳转到商品详情界面---------------------------------------
		$.getJSON("fruit.json",function(res){
			var x;
			var a;
			$(".containerCenter li dt img").click(function(){
				$(".container").text("");
				for(var i=0;i<res.length;i++){
					a=res[i].id;
//					console.log(res.length);
//					console.log(a);
					if($(this).hasClass(a)){
//						console.log(a);
//						console.log(i);
						x=i;
						let containerCenter='<p class="fanhui"><a href="###">返回&lt;&lt;</a></p><div class="containerLeft"><ul class="containerLeftMin"><li class="active"><img src="img/'+res[x].url+'" width="50"/></li><li><img src="img/'+res[x].url+'" width="50"/></li><li><img src="img/'+res[x].url+'" width="50"/></li></ul><div class="containerLeftMax"><img src="img/'+res[x].url+'" /></div></div><div class="containerRight"><p><h2>'+res[x].title+'</h2></p><p>果园价:'+res[x].jiage+'</p><p>规格:</p><p>配送至:<select><option>北京</option><option>上海</option><option>天津</option><option>深圳</option><option>西安</option></select></p><p>数量:<input type="button" class="delate" value="-"/><input type="text" class="txt" value="1"/><input type="button" class="add" value="+"/></p><p><input type="button" class="buy" value="立即购买"/><input type="button" class="car" value="加入购物车"/></p><div class="containerRightBottom"><p>商品编号:'+res[x].id+'</p><p>产地：'+res[x].chandi+'</p><p>备注:'+res[x].beizhu+'</p></div></div><div class="containerTop"></div>';
						$(".container").append(containerCenter);
//////						//-----点击返回上个界面----
						$(".container .fanhui").click(function(){
							location="http://127.0.0.1:8020/AiGuoPu/%E7%A4%BC%E5%93%81.html";
						})
						var m=0;
						var timer;
						//将准备展示的图片地址存放在数组imgsrc中
						var imgsrc=["img/"+res[x].url+"","img/"+res[x].url+"","img/"+res[x].url+""];
						function autoplay(){
							timer=setInterval (function(){
								m++;
								if(m==3){
									m=0;
								}
								$("#box .container .containerLeftMax img").attr({"src":imgsrc[m]});
								for(var i=0;i<imgsrc.length;i++){
									oli[i].className="";
								}
								oli[m].className="active";
							},1000)	
						}
						autoplay();
//						//鼠标移上停止播放，移下继续播放
						$(".containerLeftMin li").mouseenter(function(){
							clearInterval(timer);
						})
						$(".containerLeftMin li").mouseleave(function(){
							autoplay();
						})
						$(".containerLeftMax img").mouseenter(function(){
							clearInterval(timer);
						})
						$(".containerLeftMax img").mouseleave(function(){
							autoplay();
						})
//						//----------------------右边大图跟随左边图片变化----------------
						var container1=document.getElementById("box").getElementsByClassName("container")[0];
						var oli=container1.getElementsByClassName("containerLeftMin")[0].getElementsByTagName("li");
						console.log(oli.length);
						for(var k=0;k<oli.length;k++){
							oli[k].index=k;
							oli[k].onmouseover=function(){
								for(var j=0;j<oli.length;j++){
									oli[j].className="";
								}
								this.className="active";
								m=this.index;
								$(".containerLeftMax img").attr({"src":imgsrc[m]});
							}
						}
					}
					//-------------数量加减------------------
					var num=$(".container .containerRight .txt").val();
					$(".container .containerRight .add").click(function(){
						num++;
			//			console.log(num);
						$(".container .containerRight .txt").val(num);
					});
					$(".container .containerRight .delate").click(function(){
						if(num>0){
							num--;
							$(".container .containerRight .txt").val(num);
						}
					});
					$(".container .containerRight .txt").blur(function(){
						if($(".container .containerRight .txt").val()<0){
							$(".container .containerRight .txt").val(0);
						}
						var num2=$(".container .containerRight .txt").val();
						num2=num2.replace(/\D/,"1"); // \D 所有非数字的字符
						$(".container .containerRight .txt").val(num2);
						num=num2;
					});
				}
			})
		})
	}
	//--------------(xiaoguo)效果封装函数结束-------------
})