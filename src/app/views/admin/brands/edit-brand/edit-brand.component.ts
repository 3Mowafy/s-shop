import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BrandsService } from '@services';
import { AdminFormHeaderComponent, ButtonComponent, InputComponent } from '@ui';

@Component({
  selector: 'app-edit-brand',
  imports: [
    ReactiveFormsModule,

    InputComponent,
    ButtonComponent,
    AdminFormHeaderComponent,
  ],
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.scss',
})
export class EditBrandComponent {
  brandId!: string;
  updateBrandForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _brandsService: BrandsService,
    private _toastr: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.updateBrandForm = this._fb.group({
      name: [''],
      image: [],
    });
  }

  ngOnInit() {
    this.brandId = `${this._activatedRoute.snapshot.paramMap.get('id')}`;

    this._brandsService.getBrand(this.brandId).subscribe({
      next: (res) => this.updateBrandForm.patchValue(res.data),
      // error: (err) => console.log(err),
      complete: () => 'complete',
    });
  }

  getControl(name: string) {
    return this.updateBrandForm.get(name) as FormControl;
  }

  updateBrand() {
    const brnadData = new FormData();

    brnadData.append('name', this.getControl('name').value);
    brnadData.append('image', this.getControl('image').value);

    this._brandsService.updateBrand(brnadData, this.brandId).subscribe({
      next: (res) => {
        this._toastr.success('New Brand Added Succesfully', 'New Brand', {
          timeOut: 1000,
        });

        this.updateBrandForm.reset();

        setTimeout(() => {
          this._router.navigate(['../../brands'], {
            relativeTo: this._activatedRoute,
          });
        }, 500);
      },
      // error: (err) => console.log(err),
      complete: () => 'complete',
    });
  }
}
