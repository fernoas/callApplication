import { api, LightningElement } from 'lwc';

export default class AccountCard extends LightningElement {

    _account;

    @api
    get account(){
        return this._account;
    }
    set account(value){
        let imageVar = 'https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/5591/No-Image.jpg'
        this._account = {id : value.id, nome : value.Name, imagem : imageVar}
    }

    selectAccount(){
        const accountSelected = new CustomEvent("selected",{
            detail : JSON.stringify(this._account)
        }); 
        this.dispatchEvent(accountSelected);
    }



}