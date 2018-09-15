import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CotacaoPage } from '../cotacao/cotacao';
import { Provider } from '../../providers/provider/provider';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  cotacaoList: any;
  placa: any;
  tipo: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: Provider, public loadingCtrl: LoadingController) {
    this.cotacaoList = this.navParams["data"].cotacaoList;
    this.placa = this.navParams["data"].placa;
    this.tipo = this.navParams["data"].tipo;

/* teste
    this.cotacaoList = {"modelos":6,"dados":[
      {"referencia":"maio de 2018",
       "fipe_codigo":"005205-1",
       "name":"Fox City 1.0 Mi/ 1.0Mi Total Flex 8V 5p",
       "combustivel":"Gasolina",
       "marca":"59",
       "ano_modelo":"2009",
       "preco":"R$ 20.031,00",
       "key":"fox-2009",
       "time":0.0011879999999991,
       "veiculo":"Fox City 1.0 Mi/ 1.0Mi Total Flex 8V 5p",
       "id":"2009",
       "ano_fipe":"2009-1"},
      {
      "referencia":"maio de 2018",
      "fipe_codigo":"005198-5",
      "name":"Fox City 1.0Mi/ 1.0Mi Total Flex 8V 3p",
      "combustivel":"Gasolina",
      "marca":"59",
      "ano_modelo":"2009",
      "preco":"R$ 18.700,00",
      "key":"fox-2009",
      "time":0.0012209999999993,
      "veiculo":"Fox City 1.0Mi/ 1.0Mi Total Flex 8V 3p",
      "id":"2009",
      "ano_fipe":"2009-1"},
      {"referencia":"maio de 2018","fipe_codigo":"005199-3","name":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 3p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 18.785,00","key":"fox-2009","time":0.001434999999999,"veiculo":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 3p","id":"2009","ano_fipe":"2009-1"},
      {"referencia":"maio de 2018","fipe_codigo":"005206-0","name":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 4p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 20.467,00","key":"fox-2009","time":0.0011849999999995,"veiculo":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 4p","id":"2009","ano_fipe":"2009-1"},
      {"referencia":"maio de 2018","fipe_codigo":"005262-0","name":"Fox Route 1.0 Mi Total Flex 8V 3p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 19.125,00","key":"fox-2009","time":0.001379,"veiculo":"Fox Route 1.0 Mi Total Flex 8V 3p","id":"2009","ano_fipe":"2009-1"},
      {"referencia":"maio de 2018","fipe_codigo":"005263-9","name":"Fox Route 1.0 Mi Total Flex 8V 5p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 20.891,00","key":"fox-2009","time":0.0013869999999994,"veiculo":"Fox Route 1.0 Mi Total Flex 8V 5p","id":"2009","ano_fipe":"2009-1"}
    ]};
*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  getCotacao(index){
    let item = this.cotacaoList.dados[index];
    this.loading = this.loadingCtrl.create({
      content: 'Pesquisando...'
    });        
    this.loading.present();
    this.provider.getCotacaoItem(this.placa, this.tipo, item.marca, item.fipe_codigo, item.ano_fipe).subscribe(resp => {   
      this.navCtrl.push(CotacaoPage, {cotacao: resp.dados, tipo: this.tipo});
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.log(JSON.stringify(error));
      alert(error);      
    });                      
  }

}
