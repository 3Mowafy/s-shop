import { Component } from '@angular/core';

import { IBrand } from '@interfaces/brands';
import { IQueryParams } from '@interfaces/general';
import { BrandsService } from '@services';
import { AdminViewsComponent } from '@ui';
import { ConfirmationService, MessageService } from 'primeng/api';

interface label {
  key: string;
  label: string;
}

@Component({
  selector: 'app-all-brands',

  imports: [AdminViewsComponent],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.scss',
})
export class AllBrandsComponent {
  brands!: IBrand[];
  ths!: label[];
  isReady: 'loading' | 'success' | 'empty' = 'loading';

  constructor(private _brandsService: BrandsService) {
    this.ths = [
      { key: 'name', label: 'name' },
      { key: 'slug', label: 'slug' },
      { key: 'createdBy.name', label: 'created By' },
      { key: 'createdBy.role', label: 'role' },
      { key: 'createdAt', label: 'created At' },
    ];
  }

  ngOnInit() {
    this.loadBrands();
  }

  reciveParamsValue(data: IQueryParams) {
    console.log('data', data);
    this.loadBrands(data);
  }

  loadBrands(params?: IQueryParams) {
    this._brandsService.getBrands(params).subscribe({
      next: (res) => {
        this.brands = res.data;
        res.data.length > 0
          ? (this.isReady = 'success')
          : (this.isReady = 'empty');
      },
      error: (err) => {
        this.isReady = 'empty';
      },
      complete: () => 'Done',
    });
  }
}
