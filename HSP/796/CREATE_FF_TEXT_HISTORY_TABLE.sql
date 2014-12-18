/*
      Author: Brandon Foster
      Create: May 2014
      Create statement for FF_TEXT_HISTORY table
      this table holds a history of the ff_text table
      as a sort of versioning of the text assets

      Action and Action_Date fields record both whether
      the action done to ff_text was update or delete
      and when that action happened- independent
      of the last_updt_dt field, which depends on 
      being set by CMA
*/
CREATE TABLE FF_TEXT_HISTORY(
      ACTION                      VARCHAR2 (32)
      ,ACTION_DATE                DATE
      ,SITE                       VARCHAR2(4)    NOT NULL 
      ,CTNT_ID                    NUMBER         NOT NULL 
      ,CTNT_TYPE                  VARCHAR2(64)   NOT NULL 
      ,TABLE_NAME                 VARCHAR2(32)   NOT NULL 
      ,TEXT_ID                    NUMBER         NOT NULL 
      ,WFLW_STATUS                VARCHAR2(16)   NOT NULL 
      ,DELV_STATUS                VARCHAR2(16)   NOT NULL 
      ,WFLW_STATUS_DT             DATE           NOT NULL 
      ,DELV_STATUS_DT             DATE           NOT NULL 
      ,RELEASE_DT                 DATE           NOT NULL 
      ,EXPIRE_DT                  DATE           NOT NULL 
      ,PURGE_DT                   DATE           NOT NULL 
      ,SOURCE                     VARCHAR2(16)   NOT NULL 
      ,HEADLINE                   VARCHAR2(240)  
      ,SUBHEADLINE                VARCHAR2(240)  
      ,ABSTRACT                   VARCHAR2(3000) 
      ,BYLINE                     VARCHAR2(240)  
      ,DESCR                      VARCHAR2(1024) 
      ,LONG_TEXT                  CLOB           
      ,ASSIGN_UID                 VARCHAR2(240)  
      ,ASSIGN_DT                  DATE           
      ,CREATE_UID                 VARCHAR2(240)  
      ,CREATE_DT                  DATE           
      ,SOURCE_ID                  VARCHAR2(128)  
      ,LAST_UPDT_UID              VARCHAR2(240)  
      ,LAST_UPDT_DT               DATE           
      ,ORIGIN_SITE                VARCHAR2(4)    
      ,CTNT_ROLE                  VARCHAR2(64)   
      ,HOME_SECTION               VARCHAR2(240)  
      ,TEXT_STYLE                 VARCHAR2(240)  
      ,SPONSORSHIP_VALUE          VARCHAR2(64)   
      ,KEYWORDS                   VARCHAR2(512)  
      ,DELV_FRMT                  VARCHAR2(40)   
      ,DELV_FRMT_SITE             VARCHAR2(4)    
      ,SEO_TITLE                  VARCHAR2(240)  
);