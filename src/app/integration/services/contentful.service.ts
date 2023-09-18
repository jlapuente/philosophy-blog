import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';
import { FeaturedImage } from '../classes/featuredImage';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }

  private client = createClient({
    space: environment.space,
    accessToken: environment.accessToken
  })

  getAllEntries(){
    const promise =  this.client.getEntries();
    return from(promise);
  }

  getEntryById(id: string) {
    const promise = this.client.getEntry(id);
    return from(promise)
  }

  getEntryByUrl(url: string) {
    const promise = this.client.getEntries({
      content_type: "blogPost",
      "fields.urlHandler": url,
    });
    return from(promise)
  }

  test(){
    this.client.getEntries({
      content_type: "blogPost",
      "fields.author": "Javier Lapuente",
      "fields.visible": "true" 
    }).then(data => console.log(data));
  }

  createImage(image: any): FeaturedImage {
    let featuredImage: FeaturedImage = new FeaturedImage(image.fields.title, image.fields.description, image.fields.file.url);
    return featuredImage;
  }
}
