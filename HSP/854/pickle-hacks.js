<script type="text/javascript">
$(function(){

	$('#hg-w').css('border-right','1px solid #DAE7E3');
	$('#gallery-tophat.gallery.upload #hg-e').css('border-left','none');
	$('div.fpSection-e').css('clear','both');
	$('li.save a.btn').hover(function(){
		$('input#caption').val($('input#userEmail_txt').val());
	});
	$('#fileSelectBtn.btn').click(function(){
		console.log('cake');
		if($('#image0').length > 0){
			console.log('one image');
		}
		$('li.create a.btn:not(#fileSelectBtn)').css('visibility','hidden');
		$('li.create a.btn:not(#fileSelectBtn)').css('display','none');
	});
});
</script>
<style>
#gallery-tophat.gallery.upload textarea {width: 380px !important;}
#p2-uplwide.nour.wide .uptop.typetwo, #p2-uplwide.nour.wide .upbottom.typetwo {margin:21px 0 21px 202px !important;}
#cgp-newedit-new-space-title {display:none !important;}
</style>