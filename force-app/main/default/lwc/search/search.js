import { LightningElement ,api, track } from 'lwc';
import searchAccount from '@salesforce/apex/AccountList.searchAccount';
import searchAddress from '@salesforce/apex/AccountList.searchAddress';
import searchRelation from '@salesforce/apex/AccountList.searchRelation';

//Table columns to display Accounts Details
const columns = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    //,type: 'url',typeAttributes: {label:{fieldName:'Name'},target:'_blank'}},
    {label: 'Record Type', fieldName: 'RecordType.Name'},
    {label: 'Description', fieldName: 'Description'},
    {label: 'Account Number', fieldName: 'AccountNumber'},
    {label:'Email Id', fieldName:'Customer_Email__c'},
    {label:'Variant', fieldName:'Variant__c'},
];

//Columns to display Address details
const columnAdd =[
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    {label: 'Billing Address', fieldName: 'BillingAddress'},
    {label: 'Shipping Address', fieldName: 'ShippingAddress'},
    {label: 'Customer Address', fieldName: 'Customer_Address__c'},

];
const columnRelation=[
    {label: 'ID', fieldName: 'nameUrl',
    type: 'url',typeAttributes: {label:{fieldName:'accId'},target:'_blank'}},
    {label:'Name',fieldName:'name'},
    {label:'Record Type',fieldName:'recordType'},
    //{label:'Account Name',fieldName:'Name' parenturlName},
    {label:'Parent Account',fieldName:'parenturlName',
    type: 'url',typeAttributes: {label:{fieldName:'parentAccName'},target:'_blank'}},
    {label:'Parent Record Type',fieldName:'parentRecordType'},
    {label:'Child Account',fieldName:'Child_account__c.name'},
    {label:'Email',fieldName:'emailAccount'}
];
                   
export default class Search extends LightningElement {
    //Account Details
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
    //relation data
    @track searchRelationData;
    @track columnRelation = columnRelation;
    strAccNameRelation;

    //Account Event Handler
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
    //Address event Handler 

    handleFieldAdd(event){
        this.strAddAccName = event.detail.value;
        this.strAddAccBrick = event.detail.value;
        this.strAddAccZip = event.detail.value;
        this.strAddAccCountry = event.detail.value;
        this.strAddAccHCP = event.detail.value;
        this.strAddAccHCO = event.detail.value;    
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

    //Account Relaiton event Handler
    handleFieldRelation(event){
        this.strAccNameRelation = event.detail.value;
    }
    displayRealtionship(){
        if(!this.strAccNameRelation){
             this.errorMsg = "Please enter account detail to search";
             this.searchRelationData = undefined;
             return;
         }
        if(this.strAccNameRelation){
            searchRelation({strAccNameRel:this.strAccNameRelation})
            .then(result=>{
                this.searchRelationData = result;
                this.norecordfound = flase;
            })
        }else{
            this.searchRelationData = false;
            this.norecordfound = true;
        }
    }


    
}