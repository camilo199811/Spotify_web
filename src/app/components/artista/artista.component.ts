import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {

  artista:any={};
  topTracks:any[]=[];
  loading:boolean;

  constructor(private activatedRouter:ActivatedRoute,private spotyfiService:SpotifyService){
    this.loading=true;
    this.activatedRouter.params.subscribe(params=>{
      console.log(params['id'])

      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }


  getArtista(id:string){
    this.loading=true;
    this.spotyfiService.getArtista(id).subscribe(artista=>{
      console.log(artista);

      this.artista=artista;
      this.loading=false;
    })
  }

  //obtener las canciones top del artista
  getTopTracks(id:string){
    this.spotyfiService.getTopTracks(id).subscribe(topTracks=>{
      console.log(topTracks);
      this.topTracks=topTracks;
    })
  }
}
