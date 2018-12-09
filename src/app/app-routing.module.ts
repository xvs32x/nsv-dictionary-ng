import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordPageComponent } from './word-page/word-page.component';
import { WordRandomComponent } from './word-random/word-random.component';
import { WordListComponent } from './word-list/word-list.component';

const routes: Routes = [
  {
    path: '',
    component: WordPageComponent,
    children: [
      {
        path: '',
        component: WordRandomComponent
      },
      {
        path: 'list',
        component: WordListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
