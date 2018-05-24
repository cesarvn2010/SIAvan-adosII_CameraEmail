import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {EmailComposer} from '@ionic-native/email-composer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foto : any = '';
  origemFoto : Number = 0;

  constructor(public navCtrl: NavController,
     private alertCtrl : AlertController,
     private camera: Camera,
     private emailComposer: EmailComposer
    ) {

  }

  enviarEmail(){

    if (this.origemFoto != 2)
    {
      this.alerta("Favor tirar uma foto como arquivo", "Atenção");
      return;
    }
    
    let email = {
      to: 'fernandocmjr@unipam.edu.br',
      attachments: [ this.foto ],       
      subject: 'Foto Anexa',
      body: ' A foto segue anexa',
      isHtml: true
    };
    this.emailComposer.open(email);
     
  }
 
  tirarFoto(origem : Number)
  {

    this.origemFoto = origem;
    if (origem == 1)
    {
        let cameraOptions : CameraOptions = {
          quality: 50,
          encodingType: this.camera.EncodingType.JPEG,
          targetWidth:800,
          targetHeight:600,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          correctOrientation: true,
          saveToPhotoAlbum:true          
         }
         this.camera.getPicture(cameraOptions)
          .then((imageData)=>
            {
              this.foto = "data:image/jpeg;base64," + imageData;              
            },
          (err)=> {
              console.log(err);
              this.alerta(err.toString(), "Atenção");
              }
          ); 
     
    }
    else
    {
        let cameraOptions : CameraOptions = {
          quality: 50,
          encodingType: this.camera.EncodingType.JPEG,
          targetWidth:800,
          targetHeight:600,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.CAMERA,
          correctOrientation: true,
          saveToPhotoAlbum:true
        }
        this.camera.getPicture(cameraOptions)
          .then((imageData)=>
            {
               this.foto = imageData;               
            },
          (err)=> {
              console.log(err);
              this.alerta(err.toString(), "Atenção");
              }
          ); 
    }
    
  }
 
  alerta(mensagem : string, cabec : string)
  { 
   
    let alert = this.alertCtrl.create({
      title: cabec,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

}
