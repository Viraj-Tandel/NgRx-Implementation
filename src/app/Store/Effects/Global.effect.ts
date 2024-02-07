import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { handleCustomError, handleSuccessMessage } from '../Actions/generic.action';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class GlobalEffect {

  handleSuccessMessage$ = createEffect(() =>
    this.action$.pipe(
      ofType(handleSuccessMessage),
      tap(action => {
        this.toastrService.success(action.message, 'Success', { positionClass: 'toast-top-right' });
      })
    ), { dispatch: false }
  );

  
  handleCustomError$ = createEffect(() =>
    this.action$.pipe(
      ofType(handleCustomError),
      tap(action => {
        this.toastrService.error(action.message, 'Fail', { positionClass: 'toast-top-right' });
      })
    ), { dispatch: false }
  );

  constructor(private action$: Actions, private toastrService: ToastrService) {
  }


}
