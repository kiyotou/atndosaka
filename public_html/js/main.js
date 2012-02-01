$(function(){

	var iniKey = "大阪";
	var calSource;
	
	// initial
	$("#calendar").hide();
	$("#txtSrch").focus();
	srchAtnd();

	// ready source
	calSource = function(start, end, callback) {
		
		var y = start.getFullYear();
		var m = start.getMonth()+1;
		if(m >= 12) {
			ym = ''+y+(('0'+m).slice(-2))+','+(y+1)+'01';
		} else {
			ym = ''+y+(('0'+m).slice(-2))+','+y+(('0'+(m+1)).slice(-2));
		}

		$.getJSON(
			"http://api.atnd.org/events/?keyword="+keywords+"&format=jsonp&ym="+ym+"&count=100&callback=?",
			null,
			function(data, status){
			
				var started_at;
				var events = [];
			
				$.each(data.events, function(i, item){
				
                    events.push({
                        title: item.title,
                        start: item.started_at,
                        url:   item.event_url
                    });
				
				});
				
				callback(events);
				
			}
		)
    }

	// description
	$('#descBox .descBtn').toggle(function(){
		$(this).prev().slideDown();
	},function(){
		$(this).prev().slideUp();
	});
	
	// switch
	$('#switch ul li').click(function(){
		$('#switch ul li').removeClass("select");
		$(this).addClass("select");
		if($(this).text() == "リスト"){
			$('#evs').show();
			$('#calendar').hide();
		} else if($(this).text() == "カレンダー"){
			$('#evs').hide();
			$('#calendar').show();
			$('#calendar').fullCalendar('render');
			showCalEvents();
		}
	});

	// search keywords
	$("#btnSrch").click(function(){
	
		srchAtnd();
		showCalEvents();
		
	});
	
	// enter search
	$("#txtSrch").keydown(function(e){
		if(e.keyCode == 13){
			srchAtnd();
			showCalEvents();
		}
	});

	// generate calendar
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		}
    });
    
    // show events on calendar 
    function showCalEvents(){

		$('#calendar').fullCalendar('removeEventSource', calSource);
		
		$('#calendar').fullCalendar('addEventSource', calSource);

    }
    
	function srchAtnd(){
	
		$("#btnSrch").hide();
		$("#loading").show();
		
		// 検索キーをAPI用に変換
		keywords = "";
		var keyword = $("#txtSrch").val();
		var arrWords = keyword.split(" ");
		$.each(arrWords, function(i, v){
			if(v.length > 0){
				keywords += ","+v;
			}
		});
		keywords = iniKey+keywords;
		console.log("keyword: "+keywords);
		
		// APIコール
		$.getJSON(
			"http://api.atnd.org/events/?keyword="+keywords+"&format=jsonp&count=20&callback=?",
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
					html += '	<p class="evCount"><span class="evAccepted">'+item.accepted+'</span>';
                    if(item.limit){
                        html += ' / <span class="evLimit">'+item.limit+'</span>';
                    }
                    html += '人</p>';
					html += '	<p class="evCatch">'+item.catch+'</p>';
					html += '	<p class="evPlace">'+item.place+' ('+item.address+')</p>';
					html += '</article>';
					
					$("#evs").html(html);
					
				});
				
				$("#btnSrch").show();
				$("#loading").hide();
				
			}
			
		);
		
	}

});
