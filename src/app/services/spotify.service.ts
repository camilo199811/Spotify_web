import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log('spotify ok')
  }

  getQuery(query:string){
    const url=`https://api.spotify.com/v1/${query}`;

    const headers=new HttpHeaders({
      'Authorization':'Bearer BQB_eTiM4xKPILsIUJVU41TPCgYrfQLGrtzjOBFTq3MaFIVTNPjtCyTX1ORtZg1Q6Vrufp5V2RMCsHos3tcijx1GKxKwNRJg4NupSSGrOfn1AyOvr6E'
    });

    return this.http.get(url,{headers});
  }

  getNewReleases(){


    return  this.getQuery('browse/new-releases') .pipe(map(data=>
      //buscar en la data la propiedad albums y traer sus items (artistas)
       data['albums'].items
    ));



  }

  getArtistas(termino:string){

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map(data=>
      data['artists'].items
   ));

  }

  getArtista(id:string){

    return this.getQuery(`artists/${id}`);
    //

  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map(data=> data['tracks'] ));

  }



}
