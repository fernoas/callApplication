import { LightningElement, wire} from 'lwc';
import { registerListener, fireEvent } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import getAccounts from '@salesforce/apex/AccountController.getAccounts'

export default class AccountList extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    filterName = null;
    accounts = [];
    page = 1;

    connectedCallback(){
        registerListener('filterChange', this.getFilter, this);
        this.getAccountJs();
    }

    getFilter(filterParam){
        this.filterName = filterParam;
        this.getAccountJs();
    }

    getAccountJs(){
        getAccounts({filter : this.filterName, pageNumber : this.page}).then( (response) => {
            this.accounts = response;
            console.log('this.accounts',this.accounts);
        }).catch( (error) => {
            console.log('ERRO AO BUSCAR CONTA',error);
        })
    }

    handlePreviousPage(){
        this.page = this.page - 1;
        this.getAccountJs();
    }

    handleNextPage(){
        this.page = this.page + 1;
        this.getAccountJs();
    }

    handleAccountSelected(event){
        console.log('capturou o evento do componente filho', event.detail);
        fireEvent(this.pageRef, 'selectedAccount', event.detail);
    }







}