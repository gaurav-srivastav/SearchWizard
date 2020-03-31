public with sharing class SearchController {
    @AuraEnabled(Cacheable = true)
    public static list<Account> retriveAccs(String strAccName ,String strAccEmail, String strAccRecord)  {
        strAccName = '%' + strAccName + '%';
        strAccEmail = '%' + strAccEmail + '%';
        strAccRecord = '%' + strAccRecord + '%';
            
        list<Account> lstAccs = [SELECT  Id, Name, Phone, Type, Description, AccountNumber, Customer_Email__c From Account WHERE Name LIKE :strAccName OR Customer_Email__c LIKE :strAccEmail];
        return lstAccs; 
    }
}
