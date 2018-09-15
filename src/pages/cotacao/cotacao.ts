import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

@IonicPage()
@Component({
  selector: 'page-cotacao',
  templateUrl: 'cotacao.html',
})
export class CotacaoPage {
  cotacao: any;
  carroReserva: any;
  tipoPlano: any;
  valorTotal: any;
  carro7Dias: any;
  carro15Dias: any;
  carro30Dias: any;
  vidros: any;
  parabrisa: any;
  todosVidros: any;
  rastreador: any;
  kmlivre: any;
  tipo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing, private screenshot: Screenshot) {

    this.cotacao = this.navParams["data"].cotacao;
    this.tipo = this.navParams["data"].tipo;

    this.parabrisa = false;
    this.todosVidros = false;
    this.valorTotal = 0;
    this.tipoPlano = "1";
    this.carroReserva = 0;
    this.carro7Dias = false;
    this.carro15Dias = false;
    this.carro30Dias = false;
    this.vidros = 0;    
    this.kmlivre = 0;

/*this.cotacao =
{
  "COT_ID":"36",
  "COT_FIPE_INI":"20001",
  "COT_FIPE_FIN":"25000",
  "COT_VLR_PRATA":"108.00",
  "COT_VLR_OURO":"133.00",
  "TIP_ID":"1",
  "TIP_DESCRICAO":"carro",
  "TIP_TERCEIROS":"30000",
  "TIP_BENEFICIOS":"Furto,Roubo,Colisão,Incêndio,Fenômenos Naturais,Perda Total",
  "TIP_CARRO_RESERVA_7":"15.00",
  "TIP_CARRO_RESERVA_15":"25.00",
  "TIP_CARRO_RESERVA_30":"45.00",
  "TIP_BENEFICIOS_2":"Reboque: 500 KM(Pane),1.200 KM(Acidente), Chaveiro, Auxílio Pane Seca, Auxílio Pneu Furado, Auxílio Pane Elétrica e Mecânica, Táxi, Hotel",
  "TIP_PARABRISAS":"10.00",
  "TIP_TODOS_VIDROS":"20.00",
  "TIP_PARTICIP_VIDROS":"30",
  "TIP_RASTREAMENTO":"",
  "TIP_COTA_PARTICIP":"4",
"codigoRetorno":"0",
"mensagemRetorno":"Sem erros.",
"codigoSituacao":"0",
"situacao":"Sem restriÃ§Ã£o",
"modelo":"VW/FOX 1.0",
"marca":"VW/FOX 1.0",
"cor":"PRETA",
"ano":"2009",
"anoModelo":"2009",
"placa":"HKO6282",
"data":"31/05/2018 Ã s 13:17:47",
"uf":"MG",
"municipio":"CONTAGEM",
"chassi":"************38986",
"preco":""};   */


  this.rastreador = this.isRastreadorObrigatorio();
  this.cotacao.TIP_BENEFICIOS = this.cotacao.TIP_BENEFICIOS.split(",");
  this.cotacao.TIP_BENEFICIOS_2 = this.cotacao.TIP_BENEFICIOS_2.split(",");

  this.cotacao.TIP_TERCEIROS = parseFloat(this.cotacao.TIP_TERCEIROS);
  this.cotacao.COT_FIPE_INI = parseFloat(this.cotacao.COT_FIPE_INI);
  this.cotacao.COT_FIPE_FIN = parseFloat(this.cotacao.COT_FIPE_FIN);
  this.cotacao.preco = parseFloat(this.cotacao.preco);

  this.onTipoPlano();
};

  ionViewDidLoad() {
    console.log('ionViewDidLoad CotacaoPage');
  }

  onTipoPlano(option = 0){    
    console.log("click: " + option);
    if(option == 1){
      this.carro7Dias = !this.carro7Dias;
      this.carro15Dias = false;
      this.carro30Dias = false;
    } else if(option == 2){
      this.carro15Dias = !this.carro15Dias;
      this.carro7Dias = false;
      this.carro30Dias = false;
    } else if(option == 3){
      this.carro30Dias = !this.carro30Dias;
      this.carro7Dias = false;
      this.carro15Dias = false;
    } else if(option == 4){
      this.parabrisa = !this.parabrisa;
      this.todosVidros = false;
    } else if(option == 5){
      this.todosVidros = !this.todosVidros;
      this.parabrisa = false;
    }
    
    if(this.kmlivre == 0){
      this.valorTotal = parseFloat(this.cotacao.COT_VLR_PRATA);
    } else {
      this.valorTotal = parseFloat(this.cotacao.COT_VLR_OURO);
    }

    if(this.carro30Dias){
      this.valorTotal += parseFloat(this.cotacao.TIP_CARRO_RESERVA_30);
    } else if(this.carro15Dias){
      this.valorTotal += parseFloat(this.cotacao.TIP_CARRO_RESERVA_15);
    } else if(this.carro7Dias){
      this.valorTotal += parseFloat(this.cotacao.TIP_CARRO_RESERVA_7);
    }

    if(this.parabrisa){ 
      this.valorTotal += parseFloat(this.cotacao.TIP_PARABRISAS); 
    } else if(this.todosVidros){
      this.valorTotal += parseFloat(this.cotacao.TIP_TODOS_VIDROS); 
    }    

    if(this.rastreador){
      this.valorTotal += 39.90;
    }
  }

  share(){
    this.screenshot.URI(80).then(res => {
      this.socialSharing.share('Segue a cotação realizada hoje pela Ultra Brasil!', 'Cotação Online - Ultra Brasil', res.URI);
    });            
  }

  isImportado(){
    let keys = ['BMW','MERCEDES','AUDI','LAND','ROVER','VOLVO','KIA','JAC','CHERY',
      'LIFAN','SUZUKI','DODGE','JEEP','MINI','CHRYSLER','JAGUAR','PORSCHE','HAFEI','RAM'];
    let marca = this.cotacao.marca;
    marca = marca.toUpperCase();
        
    for(let i = 0; i < keys.length; i++){
      if(marca.search(keys[i]) >= 0){
        return true;
      }
    }
    return false;
  }

  isMoto(){
    return this.tipo == 1; // 1 - motos
  }

  isRastreadorObrigatorio(){
    let isCB300ouXRE = false;
    let keys = ['CB300','XRE'];
    let modelo = this.cotacao.modelo;
    modelo = modelo.toUpperCase();
        
    for(let i = 0; i < keys.length; i++){
      if(modelo.search(keys[i]) >= 0){
        isCB300ouXRE = true;
        break;
      }
    }

    return isCB300ouXRE || this.cotacao.preco > 50000;       
  }

}
