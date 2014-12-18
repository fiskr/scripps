var str = '',
yr = '2014';
function trim( str ) {
s = str.replace(/(^\s*)|(\s*$)/gi, '');
s = s.replace(/[ ]{2,}/gi, ' ');
s = s.replace(/\n /, '\n');
return s;
};
str += 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//HGTV//NONSGML Help Around the Home//EN//\n';
$('#cal-data').children().each(function() {
var el = this,
id = $(this).attr('id').replace(/detail-/, ''),
c = $('p', this).clone();
$('a', c).remove();
str += 'BEGIN:VEVENT\n';
str += 'UID:' + yr + id + 'T000000Z@hgtv.com\n';
str += 'DTSTAMP:' + yr + id + 'T141649Z\n';
str += 'DTSTART;VALUE=DATE:' + yr + id + '\n';
str += 'SUMMARY:' + (trim($('h2', this).text()) || '') + '\n';
str += 'DESCRIPTION:' + (trim($(c).text()) || '') + '\n';
str += 'URL:' + ($('a', this)[0] ? $('a', this).attr('href') : window.location) + '\n';
str += 'TRANSP:TRANSPARENT\n';
str += 'END:VEVENT\n';
});
str += 'END:VCALENDAR';
console.log(str);