import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ADD_WORD,
  ADD_WORD_FAIL,
  ADD_WORD_SUCCESS,
  AppActionInterface,
  RANDOM_WORD,
  RANDOM_WORD_FAIL,
  RANDOM_WORD_SUCCESS
} from './app.reducer';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppEffects {
  @Effect()
  add = this.actions.pipe(
    ofType(ADD_WORD),
    mergeMap((action: AppActionInterface) => this.http.post(environment.host, action.payload).pipe(
      map(payload => ({type: ADD_WORD_SUCCESS, payload})),
      catchError(payload => of({type: ADD_WORD_FAIL, payload}))
    ))
  );
  @Effect()
  random = this.actions.pipe(
    ofType(RANDOM_WORD),
    mergeMap((action: AppActionInterface) => this.http.get(environment.host + '/random').pipe(
      map(payload => ({type: RANDOM_WORD_SUCCESS, payload})),
      catchError(payload => of({type: RANDOM_WORD_FAIL, payload}))
    ))
  );
  constructor(private http: HttpClient, private actions: Actions) {}
}
