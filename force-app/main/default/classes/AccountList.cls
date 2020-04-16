public with sharing class AccountList {
    @AuraEnabled (Cacheable = true)  
    public static list<Account> searchAccount(String strAccName ,String strAccEmail, String strAccRecord ,String strExtId, Boolean strBusiness,Boolean strPersonal)  {
        strAccName = strAccName;
        strAccEmail = strAccEmail;
        strAccRecord = strAccRecord;
        strExtId = strExtId ;
        strBusiness = strBusiness;
        strPersonal = strPersonal;
        String value ='';
        List<Account> lstAccs = new List<Account>();
        String baseQuery = 'SELECT Id, Name, Phone, RecordType.Name, Description, AccountNumber, Customer_Email__c FROM ACCOUNT WHERE Id != null ';
             if(strAccName != ''){
                baseQuery += ' AND Name LIKE \''+strAccName+'%\'';              
             }
            if(strAccEmail != ''){
                baseQuery += ' AND Customer_Email__c =:strAccEmail';
            }
            if(strAccRecord != ''){
                baseQuery += '  AND RecordType.Name =:strAccRecord';
            }
            if(strExtId != ''){
                baseQuery += '  AND External_Id__c LIKE:strExtId';
            }
            lstAccs = Database.query(baseQuery);
            return lstAccs;        
    }

    @AuraEnabled (Cacheable = true)
    public static  list<Account> searchAddress(String strAccAddName, String strExternalIdA,String strAddBrick,String strAddZip,String strAddCountry,
    Boolean strAddHCP, Boolean strAddHCO){
        strAccAddName = strAccAddName;
        strExternalIdA = strExternalIdA;
        strAddBrick = strAddBrick;
        strAddZip = strAddZip;
        strAddCountry = strAddCountry;
        strAddHCP = strAddHCP;
        strAddHCO = strAddHCO;
        String Bike ='Bike';
        String Car ='Car';
        List<Account> accAddress = new  list<Account>();
        String baseQuery= 'SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Id != null '; 
        if(strAccAddName != ''){
            baseQuery += ' AND Name LIKE \''+strAccAddName+'%\'';              
         }
        if(strExternalIdA != ''){
            baseQuery += '  AND External_Id__c =:strExternalIdA';
        }
        if(strAddBrick != ''){
            baseQuery += '  AND RecordType.Name =:strAddBrick';
        }
        if(strAddZip != ''){
            baseQuery += '  AND External_Id__c LIKE:strAddZip';
        }
        if(strAddCountry != ''){
            baseQuery += '  AND Country__c LIKE:strAddCountry';
        }
        if(strAddHCP == true){
            baseQuery += '  AND RecordType.Name =:Bike';
        }
        if(strAddHCO == true){
            baseQuery += '  AND RecordType.Name =:Car';
        }
        accAddress = Database.query(baseQuery);
        return accAddress;
         
    }


    @AuraEnabled (Cacheable = true)
    public static list<DataRelationAccount> searchRelation(String strAccNameRel , String strAccPC_Relation){
        strAccPC_Relation = strAccPC_Relation;       
        strAccNameRel = strAccNameRel+ '%';
        System.debug('Parent child Realtion values'+strAccPC_Relation+''+strAccNameRel);  
        List<Relation_Object__c> accRelation = new  list<Relation_Object__c>();  
        List<DataRelationAccount> response = new List<DataRelationAccount>();     
        switch on strAccPC_Relation {
            when 'parentRelation' {
                accRelation =[SELECT  Id, Name, Parent_Account__r.Id,Parent_Account__r.name,Child_Account__r.Id,Child_Account__r.name,Child_Account__r.RecordType.Name From Relation_Object__c  WHERE Parent_Account__r.Name LIKE :strAccNameRel];
                        
                        for(Relation_Object__c acc : accRelation){
                            DataRelationAccount obj = new DataRelationAccount();
                            obj.accId = acc.Id;
                            obj.name = acc.Name;
                            //obj.recordType = acc.RecordType.Name;
                            obj.nameUrl = '/'+acc.Id;
                            //obj.parenturlName='/'+acc.Parent_Account__r.Id;
                            //obj.parentAccName = acc.Parent_Account__r.name;
                            //obj.parentRecordType = acc.Parent_Account__r.RecordType.Name;
                            obj.childurlName='/'+acc.Child_Account__r.Id;
                            obj.childAccName = acc.Child_Account__r.name;                   
                            obj.childRecordType = acc.Child_Account__r.RecordType.Name;
                            response.add(obj);
                
            }
        }
            when 'childRelation'{
                accRelation =[SELECT  Id, Name, Parent_Account__r.Id,Parent_Account__r.name,Parent_Account__r.RecordType.Name,Child_Account__r.Id,Child_Account__r.name From Relation_Object__c  WHERE Parent_Account__r.Name LIKE :strAccNameRel];
                for(Relation_Object__c acc : accRelation){
                    DataRelationAccount obj = new DataRelationAccount();
                    obj.accId = acc.Id;
                    obj.name = acc.Name;
                    //obj.recordType = acc.RecordType.Name;
                    obj.nameUrl = '/'+acc.Id;
                    obj.parenturlName='/'+acc.Parent_Account__r.Id;
                    obj.parentAccName = acc.Parent_Account__r.name;
                    obj.parentRecordType = acc.Parent_Account__r.RecordType.Name;
                   // obj.childurlName='/'+acc.Child_Account__r.Id;
                    //obj.childAccName = acc.Child_Account__r.name;                   
                    //obj.childRecordType = acc.Child_Account__r.RecordType.Name;
                    response.add(obj);
                
            }
        }
            when else{
                System.debug('no match found');
            }
           
        }
        return response;
        
    }

    public class DataRelationAccount{
        @AuraEnabled
        public Id accId {get;set;} 
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
        public String nameUrl {get;set;}
        @AuraEnabled
        public String parentAccName {get;set;}
        @AuraEnabled
        public String parenturlName {get;set;}
        @AuraEnabled
        public String parentRecordType{get;set;}       
        @AuraEnabled
        public String childAccName {get;set;}
        @AuraEnabled
        public String recordType {get;set;}
        @AuraEnabled
        public String childRecordType {get;set;}
        @AuraEnabled
        public String childurlName {get;set;}
            
        }
    

}






