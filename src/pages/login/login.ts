import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: any;
  senha: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = '';
    this.senha = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.usuario.toLowerCase() == "ultra" && this.senha == "12345"){
      this.navCtrl.setRoot(HomePage);
    } else {
      alert("Acesso Inválido!");
    }
  }

  onkeypress($event){
    if($event.key == "Enter"){
      this.login();
    }
  }

}
