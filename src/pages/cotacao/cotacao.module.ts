import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CotacaoPage } from './cotacao';

@NgModule({
  declarations: [
    CotacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CotacaoPage),
  ],
})
export class CotacaoPageModule {}
