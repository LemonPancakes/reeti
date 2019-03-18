import { Injectable } from '@angular/core';
import * as Clarifai from 'clarifai';

import { INGREDIENTS } from './constants';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClarifaiService {

  clarifaiFoodModel: string;
  clarifaiApp: any;
  clarifaiResults: string[];

  constructor() {
    this.clarifaiFoodModel = 'bd367be194cf45149e75f01d59f77ba7';
    this.clarifaiApp = new Clarifai.App({ apiKey: environment.CLARIFAI_API });
  }

  classify(imageUri: string, onSuccess: (resp: any) => any,
    onFailure: (err: any) => any): void {
    console.log(this.clarifaiResults);
    if (!imageUri) {
      console.warn("classify(): undefined image uri");
      return;
    }

    this.clarifaiApp.models.predict(this.clarifaiFoodModel, {
      base64: imageUri
    }).then(onSuccess, onFailure);
  }

  parseResults(resp: any): string[] {
    var results = resp["outputs"][0]["data"]["concepts"];

    this.clarifaiResults = [];
    var i = 0;
    while (this.clarifaiResults.length < 3 && i < results.length) {
      let res = results[i];
      if (res.value < 0.9) break;

      let name = res.name.toLowerCase();
      if (INGREDIENTS.includes(name)) {
        this.clarifaiResults.push(name);
      }

      i++;
    }

    return this.clarifaiResults;
  }
}
