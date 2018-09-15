import { Component, Renderer, ElementRef } from '@angular/core';
import { NavController, LoadingController, Platform } from 'ionic-angular';
import { Provider } from '../../providers/provider/provider';
import { ResultPage } from '../result/result';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CotacaoPage } from '../cotacao/cotacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  placa1: any;
  placa2: any;
  tipo: any;
  cotacaoList: any;
  strTipoVeiculo: any;
  loading: any;

  constructor(public navCtrl: NavController, private provider: Provider, 
      public loadingCtrl: LoadingController, splashScreen: SplashScreen, platform: Platform,
      public elementRef: ElementRef, public renderer: Renderer) {
    this.placa1 = "";
    this.placa2 = "";
    this.tipo = "0";
    this.cotacaoList = {};
    this.strTipoVeiculo = "";
    platform.ready().then(() => {
      splashScreen.hide();
    });    
  }

  getPlaca(){
    return this.placa1.trim() + "-" + this.placa2.toString().padStart(4, '0');
  }

  getCotacao(){
    this.loading = this.loadingCtrl.create({
      content: 'Pesquisando...',
      spinner: 'bubbles'
    });      
    this.loading.present();
    this.provider.getCotacao(this.getPlaca(), this.tipo).subscribe(resp => {   
      this.cotacaoList = resp;
      if(parseInt(this.cotacaoList.modelos) > 1){
        this.navCtrl.push(ResultPage, {placa: this.getPlaca(), tipo: this.tipo, cotacaoList: this.cotacaoList});
      } else if(parseInt(this.cotacaoList.modelos) > 0) {
          this.navCtrl.push(CotacaoPage, {cotacao: this.cotacaoList.dados, tipo: this.tipo});          
      } else {
        alert("Placa não encontrada");
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      let mens = JSON.stringify(error);
      console.log(mens);
      if(mens.toUpperCase() == "O servidor retornou nenhuma resposta!".toUpperCase()){
        mens = "Placa não encontrada";
      }      
      alert(mens);      
    });                
  }

  onTipoVeiculoClick(tipo){
    this.tipo = tipo;
    switch(this.tipo){
      case 0: this.strTipoVeiculo = "Carros"; break;
      case 1: this.strTipoVeiculo = "Motos"; break;
      case 2: this.strTipoVeiculo = "Taxi, Vans, Importados, Pickups, Escolares"; break;
      case 3: this.strTipoVeiculo = "Caminhões"; break;      
    }
  }

  onChange($event){
    this.placa1 = $event.toLocaleUpperCase();
    if(this.placa1.length == 3 && this.placa2 == ""){
      window.document.getElementById("placa2").focus();
    }
  }

  /* RETORNO 

  {"modelos":6,"dados":[{"referencia":"maio de 2018","fipe_codigo":"005205-1","name":"Fox City 1.0 Mi/ 1.0Mi Total Flex 8V 5p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 20.031,00","key":"fox-2009","time":0.0011879999999991,"veiculo":"Fox City 1.0 Mi/ 1.0Mi Total Flex 8V 5p","id":"2009","ano_fipe":"2009-1"},{"referencia":"maio de 2018","fipe_codigo":"005198-5","name":"Fox City 1.0Mi/ 1.0Mi Total Flex 8V 3p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 18.700,00","key":"fox-2009","time":0.0012209999999993,"veiculo":"Fox City 1.0Mi/ 1.0Mi Total Flex 8V 3p","id":"2009","ano_fipe":"2009-1"},{"referencia":"maio de 2018","fipe_codigo":"005199-3","name":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 3p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 18.785,00","key":"fox-2009","time":0.001434999999999,"veiculo":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 3p","id":"2009","ano_fipe":"2009-1"},{"referencia":"maio de 2018","fipe_codigo":"005206-0","name":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 4p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 20.467,00","key":"fox-2009","time":0.0011849999999995,"veiculo":"Fox Plus 1.0Mi/ 1.0Mi Total Flex 8V 4p","id":"2009","ano_fipe":"2009-1"},{"referencia":"maio de 2018","fipe_codigo":"005262-0","name":"Fox Route 1.0 Mi Total Flex 8V 3p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 19.125,00","key":"fox-2009","time":0.001379,"veiculo":"Fox Route 1.0 Mi Total Flex 8V 3p","id":"2009","ano_fipe":"2009-1"},{"referencia":"maio de 2018","fipe_codigo":"005263-9","name":"Fox Route 1.0 Mi Total Flex 8V 5p","combustivel":"Gasolina","marca":"59","ano_modelo":"2009","preco":"R$ 20.891,00","key":"fox-2009","time":0.0013869999999994,"veiculo":"Fox Route 1.0 Mi Total Flex 8V 5p","id":"2009","ano_fipe":"2009-1"}]}

  */

}
