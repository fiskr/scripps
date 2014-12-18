SNI.HGTV.MessageBoard = {
	init: function(url) {
		messageList = $('#messageboard .mb-bd ul');
		
		$.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
			success: function(xml) {
				var data = $(SNI.HGTV.MessageBoard.parseData(xml, 'item'));
				
				// the output should look like this
				/*
				<li>
					<div class="bubble">
						<q><a href="#">What do you think about this year's home?</a></q>
						<cite><span>RondaNJ</span></cite>
					</div>
				</li>
				*/
				data.each(function() {
					var item = '<li><div class="bubble">';
					item += '<q><a href="' + this.link + '">' + this.title + '</a></q>';
					item += '<cite><span>' + this.author + '</span></cite>';
					item += '</div></li>';
					messageList.append(item);
				});
			},
			error: function (data, status, e) {
				messageList.append("<li>Sorry, we're having trouble loading the message board information...</li>");
			}
		});
	},

	// take an xml string and turn it into an array of objects
	parseData: function (xml, nodeName) {
		var data = [];
		
		$(nodeName, xml).each(function() {
			var item = {};
			$(this).children().each(function() {
				item[this.nodeName] = $(this).text();
			});
			data.push(item);
		});
		
		return data;
	}
};
