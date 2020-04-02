public with sharing class AccountList {
    @AuraEnabled(Cacheable = true)
        public static list<Account> searchAccount(String strAccName ,String strAccEmail, String strAccRecord ,String strExtId, String strBusiness,String strPersonal)  {
            strAccName = '%' + strAccName + '%';
            strAccEmail = '%' + strAccEmail + '%';
            strAccRecord = '%' + strAccRecord + '%';
            strExtId = '%' + strExtId + '%';
            strBusiness = '%' + strBusiness + '%';
            strPersonal = '%' + strPersonal + '%';
            List<Account> lstAccs = new List<Account>();

            if((strAccName != null) || (strAccEmail != null)){
                lstAccs = [SELECT  Id, Name, Phone, RecordType.Name, Description, AccountNumber, Customer_Email__c From Account WHERE Name LIKE :strAccName OR Customer_Email__c LIKE :strAccEmail];
            }
            else if(strAccRecord != null){
                lstAccs = [SELECT  Id, Name, Phone, RecordType.Name, Description, AccountNumber, Customer_Email__c From Account WHERE RecordType.Name LIKE :strAccRecord];
            }
            else if((strBusiness != null) || (strPersonal != null)){
                lstAccs = [SELECT  Id, Name, Phone, RecordType.Name, Description, AccountNumber, Customer_Email__c, Variant__c From Account WHERE Name LIKE :strBusiness OR Variant__c LIKE :strPersonal];
            }
            return lstAccs; 
    }

    @AuraEnabled (Cacheable = true)
    public static  list<Account> searchAddress(String strAccAddName,String strAddBrick,String strAddZip,String strAddCountry,
    String strAddHCP, String strAddHCO){
        strAccAddName = '%' + strAccAddName + '%';
        strAddBrick = '%' + strAddBrick + '%';
        strAddZip = '%' + strAddZip + '%';
        strAddCountry = '%' + strAddCountry + '%';
        strAddHCP = '%' + strAddHCP + '%';
        strAddHCO = '%' + strAddHCO + '%';
        List<Account> accAddress = new  list<Account>();
        //String pSOQL; 
        
        if((strAccAddName != null)||(strAddBrick != null)){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAccAddName OR Name LIKE :strAddBrick];
        }
        else if(strAddBrick != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddBrick];
        }
        else if(strAddZip != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddZip];
        }
        else if(strAddCountry != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddCountry];
        }
        else if(strAddHCP != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddHCP];
        }
        else if(strAddHCO != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddHCO];
        }

        return accAddress;
        //= Database.query(pSOQL);
    }


    @AuraEnabled (Cacheable = true)
    public static list<DataRelationAccount> searchRelation(String strAccNameRel){
        strAccNameRel = '%' +strAccNameRel+ '%';
        List<Account> accRelation = new  list<Account>();       
                accRelation =[SELECT  Id, Name, Phone, RecordType.Name, Parent_Account__r.Id,Parent_Account__r.name,Parent_Account__r.RecordType.Name, Customer_Email__c From Account WHERE Name LIKE :strAccNameRel];
                List<DataRelationAccount> response = new List<DataRelationAccount>();
                for(Account acc : accRelation){
                    DataRelationAccount obj = new DataRelationAccount();
                    obj.accId = acc.Id;
                    obj.name = acc.Name;
                    obj.recordType = acc.RecordType.Name;
                    obj.nameUrl = '/'+acc.Id;
                    obj.parenturlName='/'+acc.Parent_Account__r.Id;
                    obj.parentAccName = acc.Parent_Account__r.name;
                    obj.parentRecordType = acc.Parent_Account__r.RecordType.Name;
                    obj.emailAccount = acc.Customer_Email__c;
                    response.add(obj);
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
        public String emailAccount {get;set;}
        @AuraEnabled
        public String recordType {get;set;}
            
        }
    

}






