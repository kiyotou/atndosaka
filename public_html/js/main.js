$(function(){

	$("#btnSrch").click(function(){
	
		var keywords = $("#txtSrch").val();

		$.getJSON(
			"http://api.atnd.org/events/?keyword="+keywords+"&format=jsonp&callback=?",
			null,
			function(data, status){
			
				var started_at;
				var html = '';
			
				$.each(data.events, function(i, item){
					
					started_at = item.started_at;
					started_date = started_at.split("T")[0];
					started_time = started_at.split("T")[1];
					started_time = started_time.split("+")[0];
					started_time = started_time.substr(0, started_time.lastIndexOf(":"));
					
					html += '<article>';
					html += '	<p class="evDate">'+started_date+' '+started_time+'</p>';
					html += '	<h2 class="evTitle"><a href="'+item.event_url+'" target="_blank">'+item.title+'</a></h2>';
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
