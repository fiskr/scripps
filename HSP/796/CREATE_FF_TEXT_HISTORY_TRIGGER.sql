CREATE TRIGGER FF_TEXT_HISTORY_TRIGGER
BEFORE UPDATE OR DELETE
ON FF_TEXT
REFERENCING OLD AS OLD NEW AS NEW
FOR EACH ROW

DECLARE
   v_errorcode   NUMBER;
   v_errormsg    VARCHAR2 (200);
   v_action      VARCHAR2 (32);
BEGIN

    IF (UPDATING)
    THEN
        v_action := 'UPDATE';
    ELSIF (DELETING)
    THEN
        v_action := 'DELETE';
    ELSE
        v_action := 'UNKNOWN';
    END IF;

    INSERT INTO FF_TEXT_HISTORY
    (
      ACTION
      ,ACTION_DATE
      ,SITE              
      ,CTNT_ID           
      ,CTNT_TYPE         
      ,TABLE_NAME        
      ,TEXT_ID           
      ,WFLW_STATUS       
      ,DELV_STATUS       
      ,WFLW_STATUS_DT    
      ,DELV_STATUS_DT    
      ,RELEASE_DT        
      ,EXPIRE_DT         
      ,PURGE_DT           
      ,SOURCE            
      ,HEADLINE          
      ,SUBHEADLINE       
      ,ABSTRACT          
      ,BYLINE            
      ,DESCR             
      ,LONG_TEXT         
      ,ASSIGN_UID        
      ,ASSIGN_DT         
      ,CREATE_UID        
      ,CREATE_DT         
      ,SOURCE_ID         
      ,LAST_UPDT_UID     
      ,LAST_UPDT_DT      
      ,ORIGIN_SITE       
      ,CTNT_ROLE         
      ,HOME_SECTION      
      ,TEXT_STYLE        
      ,SPONSORSHIP_VALUE 
      ,KEYWORDS          
      ,DELV_FRMT         
      ,DELV_FRMT_SITE    
      ,SEO_TITLE         
    )
    VALUES
    (
      v_action
     ,SYSDATE
     ,:OLD.SITE              
     ,:OLD.CTNT_ID           
     ,:OLD.CTNT_TYPE         
     ,:OLD.TABLE_NAME        
     ,:OLD.TEXT_ID           
     ,:OLD.WFLW_STATUS       
     ,:OLD.DELV_STATUS       
     ,:OLD.WFLW_STATUS_DT    
     ,:OLD.DELV_STATUS_DT    
     ,:OLD.RELEASE_DT        
     ,:OLD.EXPIRE_DT         
     ,:OLD.PURGE_DT          
     ,:OLD.SOURCE            
     ,:OLD.HEADLINE          
     ,:OLD.SUBHEADLINE       
     ,:OLD.ABSTRACT          
     ,:OLD.BYLINE            
     ,:OLD.DESCR             
     ,:OLD.LONG_TEXT         
     ,:OLD.ASSIGN_UID        
     ,:OLD.ASSIGN_DT         
     ,:OLD.CREATE_UID        
     ,:OLD.CREATE_DT         
     ,:OLD.SOURCE_ID         
     ,:OLD.LAST_UPDT_UID     
     ,:OLD.LAST_UPDT_DT      
     ,:OLD.ORIGIN_SITE       
     ,:OLD.CTNT_ROLE         
     ,:OLD.HOME_SECTION      
     ,:OLD.TEXT_STYLE        
     ,:OLD.SPONSORSHIP_VALUE 
     ,:OLD.KEYWORDS          
     ,:OLD.DELV_FRMT         
     ,:OLD.DELV_FRMT_SITE    
     ,:OLD.SEO_TITLE         
    );

EXCEPTION
   WHEN OTHERS
   THEN
      v_errorcode := SQLCODE;
      v_errormsg := SQLERRM;

      INSERT INTO ff_prcs_error
                  (prcs_name, err_nbr, err_txt, site
                  )
           VALUES ('FF_TEXT_HISTORY_TRIGGER', v_errorcode, v_errormsg, :NEW.site
                  );
END FF_TEXT_HISTORY_TRIGGER; 