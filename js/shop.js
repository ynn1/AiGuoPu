$(function(){
		$(".nav").load("nav.html");
		$(".footer").load("footer.html");
		//----------------------------左边展示部分的设计----------------------
		var m=0;
		var timer;
		//将准备展示的图片地址存放在数组imgsrc中
		var imgsrc=["img/1-270x270-102-UXSXB7Y2.jpg","img/1-270x270-11-PTCD3DD6.jpg","img/1-270x270-12266-ACAPHW81.jpg" ];
		function autoplay(){
			timer=setInterval (function(){
				m++;
				if(m==3){
					m=0;
				}
				$(".containerLeftMax img").attr({"src":imgsrc[m]});
				for(var i=0;i<imgsrc.length;i++){
					oli[i].className="";
				}
				oli[m].className="active";
			},1000)	
		}
		autoplay();
		//鼠标移上停止播放，移下继续播放
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
		//----------------------右边大图跟随左边图片变化----------------
		var oli=document.getElementsByClassName("containerLeftMin")[0].getElementsByTagName("li");
		for(var i=0;i<oli.length;i++){
			oli[i].index=i;
			oli[i].onmouseover=function(){
				for(var j=0;j<oli.length;j++){
					oli[j].className="";
				}
				this.className="active";
				m=this.index;
				$(".containerLeftMax img").attr({"src":imgsrc[m]});
			}
		}
		//----------------------------------右边购物车部分设计-----------------------------------
		//-------------动态创建效果------------
		let htmlStr;
		htmlStr='<p><h2>美国华盛顿红地厘蛇果</h2></p><p>果园价:</p><p>规格:</p><p>配送至:<select><option>北京</option><option>上海</option><option>天津</option><option>深圳</option><option>西安</option></select></p><p>数量:<input type="button" class="delate" value="-"/><input type="text" class="txt" value="1"/><input type="button" class="add" value="+"/></p><p><input type="button" class="buy" value="立即购买"/><input type="button" class="car" value="加入购物车"/></p><div class="containerRightBottom"><p>商品编号:</p><p>产地：</p><p>备注:</p></div>';
		$(".containerRight").append(htmlStr);
		//-------------数量加减------------------
		var num=$(".containerRight .txt").val();
		$(".containerRight .add").click(function(){
			num++;
//			console.log(num);
			$(".containerRight .txt").val(num);
		});
		$(".containerRight .delate").click(function(){
			if(num>0){
				num--;
				$(".containerRight .txt").val(num);
			}
		});
		$(".containerRight .txt").blur(function(){
			if($(".containerRight .txt").val()<0){
				$(".containerRight .txt").val(0);
			}
			var num2=$(".containerRight .txt").val();
			num2=num2.replace(/\D/,"1"); // \D 所有非数字的字符
			$(".containerRight .txt").val(num2);
			num=num2;
		});
})