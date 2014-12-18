/*
 * Author: Brandon Foster
 * Date: April 2014
 * Purpose:
 *    Timeline:   last twelve months
 *    The What:   how many articles on HGTV and HGRM were created
 *    The Format: sort by delivery format          
 *
 */


select site "Site" , delv_frmt "Delivery Format" , count(article_id) "Number of Articles" 
from ff_article 
where create_dt >= add_months(SYSDATE,-12) AND site in ('HGTV', 'HGRM')
group by site, delv_frmt 
order by "Number of Articles" desc, site;