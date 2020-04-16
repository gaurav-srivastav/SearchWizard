import { LightningElement ,api, track } from 'lwc';
import searchAccount from '@salesforce/apex/AccountList.searchAccount';
import searchAddress from '@salesforce/apex/AccountList.searchAddress';
import searchRelation from '@salesforce/apex/AccountList.searchRelation';

//Table columns to display Accounts Details
const columns = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    //,type: 'url',typeAttributes: {label:{fieldName:'Name'},target:'_blank'}},
    {label: 'Record Type', fieldName: 'RecordType.name'},
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
    {label:'Relation Name',fieldName:'name'},
    //{label:'Record Type',fieldName:'recordType'},
    //{label:'Account Name',fieldName:'Name' parenturlName},
    {label:'Parent Account',fieldName:'parenturlName',
    type: 'url',typeAttributes: {label:{fieldName:'parentAccName'},target:'_blank'}},
    {label:'Parent Record Type',fieldName:'parentRecordType'},
    {label:'Child Account',fieldName:'childurlName',
    type: 'url',typeAttributes: {label:{fieldName:'childAccName'},target:'_blank'}},
    {label:'Child Record Type',fieldName:'childRecordType'},
];
                   
export default class Search extends LightningElement {
    //Account Details
    @track errorAccount;
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    @track norecordfound = true;
   
    strSearchAccName = '';
    strSearchAccEmail = '';
    strSearchAccRecordType = '';
    strExternalId = '';
    strBusinessAcc=false;
    strPersonalAcc=false;
    //Address
    @track searchAddData;
    @track columnAdd = columnAdd;
    strAddAccName = '';
    strExternalIdAdd = '';
    strAddAccBrick = '';
    strAddAccZip = '';
    strAddAccCountry = '';
    strAddAccHCP=false;
    strAddAccHCO=false;
    //@track value =['option1'];
    //relation data
    @track searchRelationData;
    @track columnRelation = columnRelation;
    strAccNameRelation;

    //Account Event Handler
    handleField(event) {
            if(event.target.name ==='AccountName'){
            this.strSearchAccName = event.target.value;
             /*eslint-disable no-console*/
             console.log(this.strSearchAccName);
            }
            else if(event.target.name ==='email'){
                this.strSearchAccEmail = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strSearchAccEmail);
            }
            else if(event.target.name ==='recordType'){
                this.strSearchAccRecordType = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strSearchAccRecordType);
            }
            else if(event.target.name ==='externalId'){
                this.strExternalId = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strExternalId);
            }
            else if(event.target.name ==='bussiness'){
                this.strBusinessAcc = event.target.checked;
                /*eslint-disable no-console*/
             console.log(this.strBusinessAcc);
            }
            else if(event.target.name ==='personal'){
                this.strPersonalAcc = event.target.checked;
                /*eslint-disable no-console*/
             console.log(this.strPersonalAcc);
            }
        
    }

    displayAccount() {
   
        if((this.strSearchAccName || this.strSearchAccEmail)||(this.strSearchAccRecordType || this.strExternalId)){
            /*eslint-disable no-console*/
            console.log(this.strSearchAccName + this.strSearchAccEmail + this.strSearchAccRecordType + this.strExternalId +this.strBusinessAcc+this.strPersonalAcc);
            searchAccount({strAccName : this.strSearchAccName,strAccEmail:this.strSearchAccEmail,
                strAccRecord:this.strSearchAccRecordType,strExtId:this.strExternalId,
                strBusiness:this.strBusinessAcc,strPersonal:this.strPersonalAcc})
                .then(result => {
                    this.searchData = result;
                    this.norecordfound = false;            
                })
                .catch(error=>{
                    this.errorAccount = error;
                      /*eslint-disable no-console*/
                      console.log('error value',error);
                })
             } 
             //else{
            //     this.searchData = undefined;
            //     this.norecordfound = true;

            // }
    }
    //Address event Handler 
    // get options() {
    //     return [
    //         { label: 'HCP Address', value: 'option1' },
    //         { label: 'HCO Address', value: 'option2' },
    //     ];
    // }

    handleFieldAdd(event){
        if(event.target.name ==='accnameAddress'){
            this.strAddAccName = event.target.value;
             /*eslint-disable no-console*/
             console.log(this.strSearchAccName);
            }
            else if(event.target.name ==='accnExternalId'){
                this.strExternalIdAdd = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strExternalIdAdd);
            }
            else if(event.target.name ==='addressBrick'){
                this.strAddAccBrick = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strSearchAccEmail);
            }
            else if(event.target.name ==='addressZip'){
                this.strAddAccZip = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strAddAccZip);
            }
            else if(event.target.name ==='addressCountry'){
                this.strAddAccCountry = event.target.value;
                /*eslint-disable no-console*/
             console.log(this.strAddAccCountry);
            }
            else if(event.target.name ==='Bike'){
                this.strAddAccHCP = event.target.checked;
                /*eslint-disable no-console*/
             console.log(this.strAddAccHCP);
            }
            else if(event.target.name ==='Car'){
                this.strAddAccHCO = event.target.checked;
                /*eslint-disable no-console*/
             console.log(this.strAddAccHCO);
            }

    }
        
    displayAddress() {  
        if(this.strAddAccName || this.strExternalIdAdd || this.strAddAccBrick ||this.strAddAccZip || this.strAddAccCountry){
            /*eslint-disable no-console*/
            console.log(this.strAddAccName + this.strExternalIdAdd + this.strAddAccBrick + this.strAddAccZip +this.strAddAccCountry);
            searchAddress({strAccAddName : this.strAddAccName,strExternalIdA:this.strExternalIdAdd,strAddBrick:this.strAddAccBrick,strAddZip:this.strAddAccZip,strAddCountry:this.strAddAccCountry,
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
    //return combo box value using options function
    @track relValue = '';

    get options() {
        return [
            { label: 'Parent', value: 'parentRelation' },
            { label: 'Child', value: 'childRelation' },
        ];
    }



    handleFieldRelation(event){
        if(event.target.name ==='accnameRelation'){
            this.strAccNameRelation = event.target.value;
             /*eslint-disable no-console*/
             console.log(this.strAccNameRelation);
            }

        else if(event.target.name ==='realtionship'){
                this.relValue = event.detail.value;
                 /*eslint-disable no-console*/
                    console.log(this.relValue);
        }
    }
    displayRealtionship(){
        if(!this.strAccNameRelation){
             this.errorMsg = "Please enter account detail to search";
             this.searchRelationData = undefined;
             return;
         }
        if(this.strAccNameRelation){
            searchRelation({strAccNameRel:this.strAccNameRelation,strAccPC_Relation:this.relValue})
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