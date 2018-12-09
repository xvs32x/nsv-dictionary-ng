import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ADD_WORD, AppStateInterface, selectAppErr, selectAppWords, WordInterface } from '../app.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-word-list',
  template: `
    <h3 class="uk-card-title uk-text-center">Adding term</h3>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon" uk-icon="icon: world"></span>
          <input formControlName="term" class="uk-input uk-form-large" type="text" placeholder="English term">
        </div>
      </div>
      <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon" uk-icon="icon: comment"></span>
          <input formControlName="translate" class="uk-input uk-form-large" type="text" placeholder="Russian translate">
        </div>
      </div>
      <div class="uk-alert-danger uk-animation-shake" *ngIf="err | async" uk-alert>
        <p>{{(err | async)?.error?.message}}</p>
      </div>
      <div class="uk-margin">
        <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Add term</button>
      </div>
      <div class="uk-text-small uk-text-center">
        <a routerLink="/">Back to random terms</a>
      </div>
    </form>
  `,
  styles: []
})
export class WordListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  form = new FormGroup({
    term: new FormControl(''),
    translate: new FormControl('')
  });
  err: Observable<any> = this.store.pipe(select(selectAppErr));
  words: Observable<WordInterface[]> = this.store.pipe(select(selectAppWords));

  constructor(private store: Store<{ app: AppStateInterface }>) {
    // Renew form after submit
    const s1 = this.words.subscribe(() => this.form.setValue({}));
    this.subs.push(s1);
  }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch({type: ADD_WORD, payload: this.form.value});
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
