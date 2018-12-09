import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-page',
  template: `
    <div class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" uk-height-viewport>
      <div class="uk-width-1-1">
        <div class="uk-container">
          <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
            <div class="uk-width-1-1@m">
              <div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-body">
                <router-outlet></router-outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class WordPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
