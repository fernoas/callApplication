public with sharing class CaseController {
  
    @AuraEnabled
    public static Case createCase(String caseName, String description, Date caseDate, String accountId){

        Case caseObj = new Case();
        caseObj.Subject = caseName;
        caseObj.Description = description;
        caseObj.CaseDate__c = caseDate;
        caseObj.AccountId = accountId;
                
        insert caseObj;

        return caseObj;
    }
    
}
