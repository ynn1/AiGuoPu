$(function(){
	$(".nav").load("nav.html");
	setTimeout(function(){
		$(".nav .center li:eq(0)").removeClass("active");
	},30)
	$(".footer").load("footer.html");
//			console.log($(".pwdtxt1").text());
	//选择登录还是注册
	$(".btn").click(function(){
		($(".btn").val()=="会员登录")?$(".btn").val("会员注册"):$(".btn").val("会员登录");
		if($(".btn").val()=="会员登录"){
			$(".dl").css({
				"display":"none"
			});
			$(".zc").css({
				"display":"block"
			})
		}else if($(".btn").val()=="会员注册"){
			$(".dl").css({
				"display":"block"
			});
			$(".zc").css({
				"display":"none"
			})
		}
	});
	
	//getJSON后台获取
	var flag=0;
	$.getJSON("user.json",function(user){
		console.log(user);
		//----------------------------------登录框设置(模拟后台)-------------------------------
		$(".btn1").click(function(){
			$(".nametxt1").text("");
			$(".pwdtxt1").text("");
			if($(".name1").val()==""){
				$(".nametxt1").text("#用户名不能为空")
			}
			for(let i=0;i<user.length;i++){
				if($(".name1").val()==user[i].name){
					flag++;
					var x=i;
					if($(".pwd1").val()==user[x].pwd){
						alert("登陆成功");
						$(".name1").val("");
						$(".pwd1").val("");
					}else{
						$(".pwdtxt1").text("#密码错误");
					}
					break;
				}
			}
			if(flag==0){
				$(".nametxt1").text("#用户名不存在")
			}
		})
		//------------------------------注册框设置-------------------------------------
		//用户名设置
		var fg=0;
		$(".name2").blur(function(){
			$(".nametxt2").text("");
			for(let i=0;i<user.length;i++){
				if($(".name2").val()==user[i].name){
					$(".nametxt2").text("#用户名已存在")
					fg++;
				}else if($(".name2").val()==""){
					$(".nametxt2").text("#用户名不能为空")
					fg++;
				}else{
					fg=0;
				}
			}
		})
		//密码设置
		$(".pwd2").blur(function(){
			$(".pwdtxt2").text("");
			var mypwd=$(".pwd2").val();
			var reg=/^[0-9a-zA-Z][0-9a-zA-Z_]{5,11}$/;//
			if(reg.test(mypwd)){//
				$(".pwdtxt2").text("");
				//密码确认设置
					$(".nextpwd2").blur(function(){
						$(".nextpwdtxt2").text("");
						if($(".nextpwd2").val()==""){
							$(".nextpwdtxt2").text("确认密码不能为空");
							fg++;
						}else if($(".nextpwd2").val()==$(".pwd2").val()&&$(".nextpwd2").val()!=""){
							$(".nextpwdtxt2").text("");
							fg=0;
						}else{
							$(".nextpwdtxt2").text("#请保持与输入密码一致");
							fg++;
						}
					})
			}else if($(".pwd2").val()==""){
				$(".pwdtxt2").text("#密码不能为空");
				fg++;
			}else{
				$(".pwdtxt2").text("#密码由6-12位字母数字下划线组成");
				fg++;
			}
		})
		
		//验证码设置
		//验证码获取(4位)
		var n=parseInt(Math.random()*10000);
		//判断验证的位数
		if(n<1000&&n>100){		//验证码为三位数时
			n=""+0+n;
		}else if(n<100&&n>10){		//验证过吗为两位数时
			n=""+0+0+n;
		}else if(n<10){
			n=""+0+0+0+n;
		}
		$(".yzm2").text(n);
		$(".change").click(function(){
			$(".yzm").val("");
			var n=parseInt(Math.random()*10000);
			//判断验证的位数
			if(n<1000&&n>100){		//验证码为三位数时
				n=""+0+n;
			}else if(n<100&&n>10){		//验证过吗为两位数时
				n=""+0+0+n;
			}else if(n<10){
				n=""+0+0+0+n;
			}
			$(".yzm2").text(n);
		})
		//验证码的输入
		$(".yzm").blur(function(){
			if($(".yzm").val()==$(".yzm2").text()){
				$(".yzmtxt").text("");
			}else{
				$(".yzmtxt").text("#验证码输入错误!")
				fg++;
			}
		})
		//注册提交
		
		$(".zhuce").click(function(){				
			if(($(".nametxt2").text()=="")&&($(".pwdtxt2").text()=="")&&($(".nextpwdtxt2").text()=="")&&($(".yzmtxt").text()=="")&&($(".name2").val()!="")&&($(".pwd2").val()!="")&&($(".nextpwd2").val()!="")&&($(".yzm").val()!="")){
//						alert("注册成功!");
//				location="https://huodong.fruitday.com/cms/indexpc/1201?region_id=106092";
//				$(".name2").val("");
	//			$(".pwd2").val("");
	//			$(".nextpwd2").val("");
	//			$(".yzm").val("");
			//-------------提交到数据库-----------
			$.post("zhuce.php",
					{
						"userName":$(".name2").val(),
						"userPwd":$(".pwd2").val()
					},
					function(data){
//						alert(data);
						alert("注册成功！");
						location="https://huodong.fruitday.com/cms/indexpc/1201?region_id=106092";
						$(".name2").val("");
						$(".pwd2").val("");
						$(".nextpwd2").val("");
						$(".yzm").val("");
					}
			)
			}else{
				alert("请完善注册信息");
			}
		})
	})
})