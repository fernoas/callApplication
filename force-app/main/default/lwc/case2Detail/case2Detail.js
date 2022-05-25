import { LightningElement, wire } from 'lwc';
import { registerListener } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class Case2Detail extends LightningElement {
    
    @wire(CurrentPageReference) pageRef;
    accountp = '';
    caseName = null;
    caseDate = null;

    connectedCallback(){
        registerListener('selectedAccount', this.handleAccountSelected, this);
    }


    handleAccountSelected(accountParam){
        console.log('accountSelected', accountParam);
        this.accountp = accountParam
        console.log('this.accountp', this.accountp );
    }

    handleName(event){
        this.caseName = event.currentTarget.value;
    }

    handleDate(event){
        this.caseDate = vent.currentTarget.value;
    }

    openModal(){

    }

    get isEnableSave(){
        return this.caseName != null && this.caseDate != null;
    }




}