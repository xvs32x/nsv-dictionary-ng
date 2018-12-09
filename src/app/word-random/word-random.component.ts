import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateInterface, RANDOM_WORD, selectAppCurrentWord, WordInterface } from '../app.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-word-random',
  template: `
    <h3 class="uk-card-title uk-text-center">{{(word | async)?.translate}}</h3>
    <div class="uk-margin">
      <button *ngIf="!isShowingTranslate" (click)="showTerm()" class="uk-button uk-button-secondary uk-button-large uk-width-1-1">
        Show term
      </button>
      <button *ngIf="isShowingTranslate" disabled
              class="uk-button uk-button-secondary uk-button-large uk-width-1-1 uk-animation-slide-bottom-small">
        {{(word | async)?.term}}
      </button>
    </div>
    <div class="uk-margin">
      <button (click)="showNextTerm()" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Show next random term</button>
    </div>
    <div class="uk-text-small uk-text-center">
      <a href="https://www.google.com/search?q={{(word | async)?.term}}" target="_blank">Search translate in google</a>
    </div>
  `,
  styles: []
})
export class WordRandomComponent implements OnInit {
  word: Observable<WordInterface> = this.store.pipe(select(selectAppCurrentWord));
  isShowingTranslate: boolean;

  constructor(private store: Store<{ app: AppStateInterface }>) {
  }

  ngOnInit() {
    this.store.dispatch({type: RANDOM_WORD});
  }

  showTerm() {
    this.isShowingTranslate = true;
  }

  showNextTerm() {
    this.store.dispatch({type: RANDOM_WORD});
    this.isShowingTranslate = false;
  }

}
