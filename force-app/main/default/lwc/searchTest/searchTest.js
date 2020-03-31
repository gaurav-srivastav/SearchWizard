import { LightningElement, track } from 'lwc';
import serachAccs from '@salesforce/apex/SearchController.retriveAccs';

//datatable columns
const columns = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    {label: 'Type', fieldName: 'Type'},
    {label: 'Description', fieldName: 'Description'},
    {label: 'Account Number', fieldName: 'AccountNumber'},
    {label:'Email Id',fieldName:'Customer_Email__c'},
];
    

export default class CustomSearchInLWC extends LightningElement {
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    @track norecordfound = true;
    strSearchAccName = '';
    strSearchAccEmail = '';
    strSearchAccRecordType = '';
    

    handleAccountName(event) {
        this.strSearchAccName = event.detail.value;
        this.strSearchAccEmail = event.detail.value;
        this.strSearchAccRecordType = event.detail.value
    }

    handleSearch() {
        if(!this.strSearchAccName || !this.strSearchAccEmail) {
            this.errorMsg = 'Please enter account details to search.';
            this.searchData = undefined;
            return;
        }      
        if(this.strSearchAccName){
                serachAccs({strAccName : this.strSearchAccName,strAccEmail:this.strSearchAccEmail,
                strAccRecord:this.strSearchAccRecordType})
                .then(result => {
                    this.searchData = result;
                    this.norecordfound = false;            
                })
            } else{
                this.searchData = undefined;
                this.norecordfound = true;

            }
}

}
