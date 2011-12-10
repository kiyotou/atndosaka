$(function(){

	$("#btnSrch").click(function(){
	
		var keywords = $("#txtSrch").val();

		$.getJSON(
			"http://api.atnd.org/events/?keyword="+keywords+"&format=jsonp&callback=?",
			null,
			function(data, status){
			
				$.each(data.events, function(i, item){
					
					alert(item.title);
					
				});
			}
			
		);
		
	});	

});
