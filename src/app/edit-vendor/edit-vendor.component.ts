import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css'],
  providers: [ApiserviceService]
})


export class EditVendorComponent implements OnInit {
  activatedRoute: any;
  color: String;
  public userId: number;
  public name: string;
  public firstName: string;
  public lastName: string;
  public emailId: string;
  public phoneNumber: string;
  public address: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public loading:boolean = false;
  //public vendorDetails: VendorDetails;


  public editVendorForm: FormGroup;




  constructor( private router: Router,private route: ActivatedRoute, private _apiservice: ApiserviceService, private fb: FormBuilder,private modalService: NgbModal) {
  }

 
  editClicked(event): void {
    console.log(this.editVendorForm.disabled);
	  if(this.editVendorForm.disabled){
	 	 this.editVendorForm.enable();
	  }
	  else{
	 	 this.editVendorForm.disable();
	  }
  }


  ngOnInit() {
    /*let  vendorDetails: VendorDetails;
      this.getEditVendors(this.userId);
    console.log(this.vendorDetails);*/
     this.createForm();

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.editVendorForm.disable();
    });
    this.onDisplayVendors();
    this.loading = true;

  }

  open(content) {
   this.modalService.open(content);

  }







  createForm() {
    this.editVendorForm = this.fb.group({
      name: ['', Validators.required],
      vendorAddress: this.fb.group({
        streetName: '',
        city: '',
        state: '',
        zipcode: ['', Validators.required]
      }),
      vendorContact: this.fb.group({
        firstName: '',
        lastName: '',
        emailId: ['', Validators.email],
        phoneNumber: ['', Validators.required]
      }),
    });
  }






 createVendor(value):void{
 console.log("form value",value);
 value['vendorId']= this.userId;
 
 this._apiservice.postVendorData(value)
      .subscribe((data: any) => {
        console.log(data);
        open(data.responseString);
      }, error => console.log(error));

}
cancelButton(){
  //this.editVendorForm.disable();
this.router.navigate(['/vendorsView']);


  }
  




  onDisplayVendors() {



    this._apiservice.getVendorExtra(this.userId)
      .subscribe((data: any) => {
        this.loading = false;
        console.log(data);
        (<FormGroup>this.editVendorForm)
            .patchValue(data, { onlySelf: true });
      }, error => console.log(error));


  }
  

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
      console.log('You are 100px from the top to bottom');
    } else {
      this.color = 'offline';
      console.log('You are 500px from the top to bottom');
    }

  }
  x
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

}


