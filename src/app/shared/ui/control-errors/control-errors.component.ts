import { Component, DestroyRef, inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { errorMessage } from '@helper';

@Component({
  selector: 'app-control-errors',
  imports: [],
  templateUrl: './control-errors.component.html',
  styleUrl: './control-errors.component.scss',
})
export class ControlErrorsComponent {
  @Input({ required: true }) control!: FormControl;
  errors!: string[];
  _destroyRef = inject(DestroyRef);

  constructor(private _toastr: ToastrService) {}

  ngOnInit() {
    this.errors = errorMessage(this.control);
    this.control.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(1000))
      .subscribe({
        next: () => {
          this.errors = errorMessage(this.control);
        },
      });
  }

  showToast() {
    this._toastr.warning(
      `
      <hr class="mt-2">
      <ul class="ms-3 mt-2 list-disc">
      ${this.errors.map((err) => `<li>${err}</li>`).join('')}
      </ul>`,
      'Validation Error',
      {
        enableHtml: true,
      }
    );
  }
}
