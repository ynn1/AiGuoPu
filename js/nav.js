$(".center li").mouseenter(function(){
	$(this).addClass("active");
})
$(".center li").mouseleave(function(){
	$(this).removeClass("active");
})
$(".center li:eq(0)").click(function(){
	location="http://127.0.0.1:8020/AiGuoPu/%E9%A6%96%E9%A1%B5.html";
});
$(".center li:eq(1)").click(function(){
	location="http://127.0.0.1:8020/AiGuoPu/%E9%B2%9C%E6%9E%9C.html";
});
$(".center li:eq(2)").click(function(){
	location="http://127.0.0.1:8020/AiGuoPu/%E7%94%9F%E9%B2%9C.html";
});
$(".center li:eq(3)").click(function(){
	location="http://127.0.0.1:8020/AiGuoPu/%E7%A4%BC%E5%93%81.html";
});
$(".center li:eq(4)").click(function(){
	location="http://127.0.0.1:8020/AiGuoPu/%E6%B3%A8%E5%86%8C.html";
})
$(".nav-right .jr").click(function(){
	if($(".shopCar .add:has(li)")){
		$(".nav-right .shopCar").css({
			"display":"block"
		});
	}else{
		console.log("购物车中还没有商品，快去添加吧!")
	}
	
})
$(".shopCar i").click(function(){
	$(".nav-right .shopCar").css({
		"display":"none"
	});
})
