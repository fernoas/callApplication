import { LightningElement, wire } from 'lwc';
import { registerListener } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';
import createCase from '@salesforce/apex/CaseController.createCase';

export default class Case2Detail extends NavigationMixin(LightningElement) {
    
    @wire(CurrentPageReference) pageRef;
    case = null;
    accountName = null;
    accountId = null;
    caseName = null;
    caseDate = null;
    description = null;
    showAccountAlert = false;


    connectedCallback(){
        registerListener('selectedAccount', this.handleAccountSelected, this);
    }


    handleAccountSelected(accountParam){
        let accountSelected = JSON.parse(accountParam)
        this.accountName = accountSelected.nome;
        this.accountId = accountSelected.id;
        this.showAccountAlert = false;
        console.log('this.accountName', this.accountName );
    }

    handleName(event){
        this.caseName = event.currentTarget.value;
    }

    handleDate(event){
        this.caseDate = event.currentTarget.value;
    }

    handleDescription(event){
        this.description = event.currentTarget.value;

    }

    get isEnabledSave(){
        return this.accountName != "" && this.accountName != null && this.caseName != "" && this.caseName != null && this.caseDate != null && this.description != null && this.description != "";
    }

    submitCase(){
        if (this.accountId === null){
            this.showAccountAlert = true;
        }else{
            createCase({case : JSON.stringify(this.case), subject : this.caseName, description : this.description, caseDate : this.caseDate, accountId : this.accountId}).then( (response) => {
                console.log('response case',response )
                this[NavigationMixin.Navigate]({
                    type : 'standard__recordPage',
                    attributes : {
                        recordId : response.Id,
                        actionName : 'view'
                    }
                });

            } ).catch( (error) => {
                console.log('erro ao criar caso', error);
            } );
        }       
    
    }




}