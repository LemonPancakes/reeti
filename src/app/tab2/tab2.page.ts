import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Food2ForkService } from './../services/Food2Fork/food2fork.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  imageUri: string;
  base64Image: string;
  cameraOptions: CameraOptions;
  galleryOptions: CameraOptions;
  recipes: any[];

  constructor(private camera: Camera, private food2Fork: Food2ForkService) {
    this.cameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.galleryOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then((imageUri) => {
      this.imageUri = imageUri;
      this.base64Image = "data:image/jpeg;base64," + imageUri;
    }, (err) => {
      console.log(err);
    })
  }

  pickFromGallery() {
    this.camera.getPicture(this.galleryOptions).then((imageUri) => {
      this.imageUri = imageUri;
      this.base64Image = "data:image/jpeg;base64," + imageUri;
    }, (err) => {
      console.log(err);
    })
  }

  getRecipes() {
    this.food2Fork.getRecipes(this.imageUri,
      (resp) => {
        this.recipes = this.food2Fork.parseRecipes(resp);
        return;
      },
      (err) => {
        console.error(err);
      });
  }
}
