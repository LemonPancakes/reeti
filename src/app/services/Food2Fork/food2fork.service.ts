import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

import { USE_FAKE_RESULT, FAKE_RESULT } from './constants';
import { ClarifaiService } from '../Clarifai/clarifai.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Food2ForkService {

  food2ForkUrl: string = 'https://www.food2fork.com/api/search';

  constructor(private http: HTTP, private clarifaiService: ClarifaiService) { }

  getRecipes(imageUri: string, onSuccess: (resp: any) => any,
    onFailure: (err: any) => any): void {
    if (!imageUri) {
      console.warn("getRecipes(): undefined image");
      return;
    }

    if (USE_FAKE_RESULT) {
      var resp = {data: FAKE_RESULT};
      onSuccess(resp);
      return;
    }

    this.clarifaiService.classify(imageUri,
      (resp) => {
        var ingredients: string[] = this.clarifaiService.parseResults(resp);
        var food2ForkParams = {
          key: environment.FOOD2FORK_API,
          q: ingredients.join(',')
        }

        this.http.get(this.food2ForkUrl, food2ForkParams, {})
          .then(onSuccess, onFailure);
      },
      (err) => {
        console.error(err);
      });
  }

  parseRecipes(resp: any): any[] {
    var results: any = JSON.parse(resp.data);
    var recipes: any[] = results.recipes;
    return recipes;
  }
}
