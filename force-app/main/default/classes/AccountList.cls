public with sharing class AccountList {
    // @AuraEnabled (cacheable = true)
    // public static List<Account> searchAccount (String accList){
    //     string straccName = '%'+ accList + '%';
    //     return [Select Id, Name from Account WHERE Name LIKE: straccName ];
    // }
    //public List<Account> accAddress {get;set;}
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
        else if(strAddHCP != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddHCP];
        }
        else if(strAddHCO != null){
            accAddress = [SELECT  Id, Name, BillingAddress, ShippingAddress, Customer_Address__c From Account WHERE Name LIKE :strAddHCO];
        }

        return accAddress;
        //= Database.query(pSOQL);
    }
}


