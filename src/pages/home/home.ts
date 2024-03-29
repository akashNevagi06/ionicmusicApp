import { Component } from '@angular/core';
import { NavController,LoadingController,ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import {SocialSharing} from "@ionic-native/social-sharing";
import {MusicPlayerPage} from "../music-player/music-player";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic=[];

  constructor(public navCtrl: NavController,private socialSharing : SocialSharing,
    public loadingController:LoadingController,
    private musicProvider:MusicsProvider,private actionSheetController:ActionSheetController) {
   
  }
  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingController.create({
      content:"getting your songs from server"
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic()
    .subscribe((musicList)=>
    
     {
      allMusicLoadingController.dismiss(); 
      this.allMusic=musicList

    });

  }
  shareSong(music){
    let ShareSongActionSheet =this.actionSheetController.create({
      title:"share song",
      buttons:[
        {
          text:"facebook",
          icon:"logo-facebook",
          handler:()=>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url)
          }
        },
        {
          text:"Twitter",
          icon:"logo-twitter",
          handler:()=>{
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url)
          }
        },
        {
          text:"Share",
          icon:"share",
          handler:()=>{
            this.socialSharing.share(music.name,"", music.image, music.music_url)
          }
        },
        {
          text:"cancel",
          role:"destructive"
      
        }
      ]
    });
    ShareSongActionSheet.present();
  }
  goToMusic(music){
    this.navCtrl.push(MusicPlayerPage,{
      music: music
    });
  }

}

