import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { AddProductResponse } from '../../models/implementation/AddProductResponse';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  openDate: Date =new Date((new Date()).toISOString().substring(0,10));
  expiredDate: Date = new Date(new Date(new Date().setDate(this.openDate.getDate() + 1)).setHours(23,59,59,0));  
  imageSelected: File|undefined;
  productDataFormFroup: FormGroup = new FormGroup({});

  isSubmitButtonDisable: boolean = false;
  isImageSelected: boolean = false;  
  previewSelectedImageBase64: string ='';

  openDateMandatoryMessage: string = 'date d\'ouverture obligatoire';
  expiredDateMandatoryMessage: string = 'DLC obligatoire';
  imageMandatoryMessage: string = 'selection image manquante';

  productHomeLink: string = frontEndUrl.userHome.url;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router) {}

  ngOnInit(){
    this.initializeFormGroup();
  }

  initializeFormGroup(){
    this.productDataFormFroup = this.fb.group({
      image: ['', Validators.required],     
      openDate: [(new Date()).toISOString().substring(0,10), Validators.required],
      expiredDate: [(new Date(new Date(new Date().setDate(this.openDate.getDate() + 1)))).toISOString().substring(0, 10), Validators.required]
    });
  }

  loadSelectedImage(file: File | undefined){    
    this.isImageSelected = false;
    if(file){
      this.imageSelected = file;
      const fileReader = new FileReader();
      // Lecture image
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=> {
        this.previewSelectedImageBase64 = fileReader.result as string;
        this.isImageSelected = true;
      }
    }   
  }

  saveProduct() {
    this.isSubmitButtonDisable = true;
    //console.log(this.productDataFormFroup);

    if(!this.productDataFormFroup.valid) {
      this.isSubmitButtonDisable = false;
      return this.productDataFormFroup.markAllAsTouched();
    }

   
    this.productService.addPoduct({
      productOpenDate: this.productDataFormFroup.get('openDate')?.value,
      productEndDate: this.productDataFormFroup.get('expiredDate')?.value,
      file: this.imageSelected!
    }).subscribe(res=>{
      this.isSubmitButtonDisable = false;
      if(res instanceof Object) {
        this.router.navigate([frontEndUrl.getProductById.url.replace(':productId', res.productId.toString())])
      }
    });
  }
}
