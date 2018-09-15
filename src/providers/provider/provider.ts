/*
provider.ts - Provider
Autor: Julio Cesar Fernandes de Souza
Email: jcfsouza@yahoo.com.br
Data: maio/2018
*/
import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../providers/appconfig';

@Injectable()
export class Provider {
  url: any;

  constructor(public http: HTTP) {
    //this.url = "http://camposeborgesconsultoria.com.br/teste";
    this.url = CONFIG.url;
  }

  getCotacaoItem(placa, tipo, marca, modelo, ano){
    let params = {
      placa: placa,
      tipo: tipo,
      marca: marca,
      modelo: modelo,
      ano: ano
    };
    return this.postToServer("", params);          
  }  

  getCotacao(placa, tipo){
    let params = {
      placa: placa,
      tipo: tipo
    };
    return this.postToServer("", params);          
  }

  postToServer(phpFile, params, callback = null){
    return Observable.create(observer => {  
      console.log("url", this.url, "params", JSON.stringify(params));
      let url = this.url;
      if(phpFile !== ""){
        url += '/' + phpFile;
      }
      this.http.get(url, params, {})
      .then(data => {
        console.log("success");
        /*this.data = data.data;
        this.status = data.status;
        this.headers = JSON.stringify(data.headers);*/
        
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(JSON.stringify(data.headers));
        
        let resp = "";
        try {
          resp = JSON.parse(data.data);
          if(callback){
            callback(resp);
          }          
          if(observer){
            observer.next(resp);
            observer.complete();
          }            
        } catch(ex){
          console.log(JSON.stringify(ex));
          if(observer){
            observer.error(data.data);
            observer.complete();
          }  
        }      
      })
      .catch(error => {
        console.log("error: " + JSON.stringify(error));        
        if(observer){
          observer.error(error.error);
          observer.complete();
        }        
      });
    });    
  }    
}
