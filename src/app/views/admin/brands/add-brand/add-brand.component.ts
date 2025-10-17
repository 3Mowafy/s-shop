import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BrandsService } from '@services';
import { ButtonComponent, InputComponent, AdminFormHeaderComponent } from '@ui';

@Component({
  selector: 'app-add-brand',
  imports: [
    ReactiveFormsModule,

    InputComponent,
    ButtonComponent,
    AdminFormHeaderComponent,
  ],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.scss',
})
export class AddBrandComponent {
  newBrandForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _brandsService: BrandsService,
    private _toastr: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.newBrandForm = this._fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      image: [''],
    });
  }

  getControl(name: string) {
    return this.newBrandForm.get(name) as FormControl;
  }

  addBrand() {
    const brnadData = new FormData();
    brnadData.append('name', this.newBrandForm.get('name')?.value);
    brnadData.append('image', this.newBrandForm.get('image')?.value);

    this._brandsService.addBrand(brnadData).subscribe({
      next: (res) => {
        this._toastr.success('New Brand Added Succesfully', 'New Brand', {
          timeOut: 1000,
        });

        this.newBrandForm.reset();

        setTimeout(() => {
          this._router.navigate(['../brands'], {
            relativeTo: this._activatedRoute,
          });
        }, 500);
      },
      // error: (err) => console.log(err),
      complete: () => 'completed',
    });
  }
}
