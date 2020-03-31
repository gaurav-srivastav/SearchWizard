import { LightningElement ,api, track } from 'lwc';
import searchAccount from '@salesforce/apex/AccountList.searchAccount';
import searchAddress from '@salesforce/apex/AccountList.searchAddress';

const columns = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    {label: 'Record Type', fieldName: 'RecordType.Name'},
    {label: 'Description', fieldName: 'Description'},
    {label: 'Account Number', fieldName: 'AccountNumber'},
    {label:'Email Id', fieldName:'Customer_Email__c'},
    {label:'Variant', fieldName:'Variant__c'},
];
const columnAdd =[
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    {label: 'Billing Address', fieldName: 'BillingAddress'},
    {label: 'Shipping Address', fieldName: 'ShippingAddress'},
    {label: 'Customer Address', fieldName: 'Customer_Address__c'},

];
const AccountDetail=[];
	
export default class Search extends LightningElement {
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    @track norecordfound = true;
   
    strSearchAccName = '';
    strSearchAccEmail = '';
    strSearchAccRecordType = '';
    strExternalId = '';
    strBusinessAcc = true;
    strPersonalAcc = true;
    //Address
    @track searchAddData;
    @track columnAdd = columnAdd;
    strAddAccName = '';
    strAddAccBrick = '';
    strAddAccZip = '';
    strAddAccCountry = '';
    strAddAccHCP = true;
    strAddAccHCO = true;
    

    handleField(event) {
        this.strSearchAccName = event.detail.value;
        this.strSearchAccEmail = event.detail.value;
        this.strSearchAccRecordType = event.detail.value;
        this.strExternalId = event.detail.value;
        this.strBusinessAcc = event.detail.value;
        this.strPersonalAcc = event.detail.value;
        
    }

    displayAccount() {
       if((!this.strSearchAccName || !this.strSearchAccEmail)||(!this.strSearchAccRecordType || !this.strExternalId)) {
            this.errorMsg = 'Please enter account details to search.';
            this.searchData = undefined;
            return;
        }      
        if(this.strSearchAccName){
            searchAccount({strAccName : this.strSearchAccName,strAccEmail:this.strSearchAccEmail,
                strAccRecord:this.strSearchAccRecordType,strExtId:this.strExternalId,
                strBusiness:this.strBusinessAcc,strPersonal:this.strPersonalAcc})
                .then(result => {
                    this.searchData = result;
                    this.norecordfound = false;            
                })
            } else{
                this.searchData = undefined;
                this.norecordfound = true;

            }
    }
    //Address Section

    handleFieldAdd(event){
        this.strAddAccName = event.detail.value;
        this.strAddAccBrick = event.detail.value;
        this.strAddAccZip = event.detail.value;
        this.strAddAccCountry = event.detail.value;
        this.strAddAccHCP = event.detail.value;
        this.strAddAccHCO = event.detail.value;

       /* if (event.target.label === 'Account Name') {
       
        }
        if (event.target.label === 'Brick') {
         ;
        }
        if (event.target.label === 'Zip') {
           
        }
        if (event.target.label === 'Country') {
           
        }
        if (event.target.label === 'HCP Address') {
            
        }
        if (event.target.label === 'HCP Address') {
            
        }*/
    }
    displayAddress() {
        if(((!this.strAddAccName || !this.strAddAccBrick)||(!this.strAddAccZip || !this.strAddAccCountry))|| ((!this.strAddAccHCP )|| (!this.strAddAccHCO))){
            this.errorMsg = 'Please enter account details to search.';
            this.searchAddData = undefined;
            return;
        }   
        if(this.strAddAccName){
            searchAddress({strAccAddName : this.strAddAccName,strAddBrick:this.strAddAccBrick,strAddZip:this.strAddAccZip,strAddCountry:this.strAddAccCountry,
            strAddHCP:this.strAddAccHCP,strAddHCO:this.strAddAccHCO})
                .then(result => {
                    this.searchAddData = result;
                    this.norecordfound = false;            
                })
            } else{
                this.searchAddData = undefined;
                this.norecordfound = true;

            }
    }
    
}