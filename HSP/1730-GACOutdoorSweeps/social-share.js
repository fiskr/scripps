(function(){
    var sharing = {
    url: document.URL
    ,title: 'New Series! Ultimate Sportsman&#x27;s Lodge, Tuesdays, 8|7c. You could win a getaway, an ATV and $25,000 cash!'
    ,html: '<div class="social-toolbar"><link rel="image_src" type="image/jpeg" href="http://images.gactv.com/packages/2011/ACA/images/fb-image.jpg" /><ul class="social-media">'
    ,formats: {
      email: {
        message: 'Share by Email'
        ,className: 'addthis_button_email email'
      }
      ,twitter: {
        message: 'Share on Twitter'
        ,className: 'addthis_button_twitter twitter'
      }
      ,facebook: {
        message: 'Share on Facebook'
        ,className: 'addthis_button_facebook facebook'
      }
      ,pinterest: {
        message: 'Share on Pinterest'
        ,className: 'addthis_button_pinterest pinterest'
      }
    }
  };

  for (var formats in sharing.formats){
    var message = null
        ,className = null
        ,currentFormat = sharing.formats[formats];

    for (var data in currentFormat){
        if( data === 'message' ){
          message = currentFormat[data];
        } else if ( data === 'className' ) {
          className = currentFormat[data];
        } else {
          console.error( data + ' is neither a message nor a className... ');
        }
        
    }
    sharing.html+='<li><a class="' + className + '" addthis:url="' + sharing.url + '" addthis:title="' + sharing.title + '">' + message + '</a></li>';
    //console.log('For currentFormat: ' + formats + ', className: ' + className + ' message: ' + message);
  }

  sharing.html += '<li class="fb-like"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3a%2f%2fwww.gactv.com%2fgac%2fpac_ctnt%2ftext%2f0%2c%2cgac_26058_108334%2c00.html&send=false&layout=button_count&width=450&font&colorscheme=light&action=like&height=21&appId=163945570304663" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe></li><sc' + 'ript type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pub=xa-4aea856f2716fef6"></' + 'script></ul></div>';

  //console.log(sharing.html);
  try {
    $('#nav-wrapper').append(sharing.html);
  }
  catch (errorMessage) {
    console.error('SOCIAL-SHARE: Attempting to append the social share toolbar has caused an error: ' + errorMessage );
  }
  
})();