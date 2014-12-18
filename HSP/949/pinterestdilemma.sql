select 'http://www.gactv.com/gac/pac_ctnt/text/0,,GAC_26058_'||text_id||',00.html' from ff_text
where long_text like '%http://www.foggyphils.com/storage/pinit.png%'
and (long_text like '%<img border="0" src="http://www.foggyphils.com/storage/pinit.png" title="Pin It" />%'
OR long_text like '%img alt="Pin It!" style="border: none;" src="http://www.foggyphils.com/storage/pinit.png">%')
and delv_status = 'LIVE' 
and WFLW_STATUS = 'APPROVED';

rollback;


-- 6 rows updated on dev and staging
update ff_text set long_text = REPLACE(long_text,'<img border="0" src="http://www.foggyphils.com/storage/pinit.png" title="Pin It" />','')
where long_text like '%<img border="0" src="http://www.foggyphils.com/storage/pinit.png" title="Pin It" />%'
and delv_status = 'LIVE' 
and WFLW_STATUS = 'APPROVED';
-- 130 rows updated on dev
--131 rows updated on staging
update ff_text set long_text = REPLACE(long_text,'<img alt="Pin It!" style="border: none;" src="http://www.foggyphils.com/storage/pinit.png">','')
where long_text like '%<img alt="Pin It!" style="border: none;" src="http://www.foggyphils.com/storage/pinit.png">%'
and delv_status = 'LIVE' 
and WFLW_STATUS = 'APPROVED';
commit;