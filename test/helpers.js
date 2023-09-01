PROCEDURE sp_UpdateInitialEnrolment (
      p_APP_NB VARCHAR2   
   )
   
   IS 
   BEGIN
     UPDATE APP_CONTACT  
     SET First_NM = A.NAME1--(Select JSON_value(dbms_lob.substr( INIT_ENROLMENT_req),'$.enrolment.CustomerPrograms.loadMeterNb')  from APP_REGISTRATION WHERE APP_NB=p_APP_NB)
     WHERE APP_NB=p_APP_NB
    JSON_TABLE(dbms_lob.substr( INIT_ENROLMENT_req),   

                           '$.enrolment.Customer' COLUMNS (
                              NAME1                           VARCHAR PATH '$.FirstName',
                              LastName1                       VARCHAR PATH '$.LastName',
                              ADDRESS1                        VARCHAR PATH '$.Address1',
                              ADDRESS2                        VARCHAR PATH '$.Address2',
                              City                            VARCHAR PATH '$.City',
                              STATE                           VARCHAR PATH '$.State',
                              ZIPCODE                         VARCHAR PATH '$.ZipCode',
                              EMAIL                           VARCHAR PATH '$.Email',
                              COMPANYNAME                     VARCHAR PATH '$.CompanyName',
                              PRI_PHONE                       VARCHAR PATH '$.mobileNo',
                              SEC_PHONE                       VARCHAR PATH '$.contactNo',
                              CONTACTTYPE                     VARCHAR PATH '$.ContactType'
                          )
                      ) A
                       where APP_REGISTRATION.APP_NB=p_APP_NB;
