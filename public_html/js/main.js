$(function(){

	$("#btnSrch").click(function(){
	
		var keywords = $("#txtSrch").val();

		$.getJSON(
			"http://api.atnd.org/events/?keyword="+keywords+"&format=jsonp&callback=?",
			null,
			function(data, status){
			
				var html = '';
			
				$.each(data.events, function(i, item){
					
					alert(item.title);
					
					html += '<article>';
					html += '	<p class="evDate">'+item.started_at+'</p>';
					html += '	<h2 class="evTitle"><a href="'+item.event_url+'">'+item.title+'</a></h2>';
					html += '	<p class="evCount"><span class="evAccepted">'+item.accepted+'</span> / <span class="evLimit">'+item.limit+'</span> 人</p>';
					html += '	<p class="evCatch">'+item.catch+'</p>';
					html += '	<p class="evPlace">'+item.place+' ('+item.address+')</p>';
					html += '</article>';
					
					$("#evs").html(html);
					
				});
			}
			
		);
		
	});	

});
