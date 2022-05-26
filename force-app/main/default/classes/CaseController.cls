public with sharing class CaseController {
  
    @AuraEnabled
    public static Case createCase(String subject, String description, Date caseDate, String accountId){

        String caseAutomatic = 'App Chamados';

        
        Case caseObj = new Case();
        caseObj.Subject = subject;
        caseObj.Description = description;
        caseObj.CaseDate__c = caseDate;
        caseObj.AccountId = accountId;
        caseObj.AutomaticCreatedCase__c = caseAutomatic;
                
        insert caseObj;

        return caseObj;
    }
    
}
