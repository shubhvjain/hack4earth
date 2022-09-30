import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  L:any;
  cMap:any;
  ngOnInit(): void {
    this.L = (window as { [key: string]: any })["L"];
    // this.setCurrentLocation()
    this.loadCurrentMap()
  }

  currentLocation:any = {};

  async getCurrentLocation(){
    const getCoords = async () => {
      const pos:any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
        altitude: pos.coords.altitude
      };
    }
    const coords = await getCoords();
    return coords
  }

  async loadCurrentMap(){
    const dt = await this.getCurrentLocation()
    this.cMap  = this.L.map('map', {
      center: [dt['latitude'], dt['longitude']],
      zoom: 16
    });
    this.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.cMap);

    await this.loadAnalysis()
  }

  loaded = false
  analysis:any = {}

  async loadAnalysis(){
    let ang = this
    let sdata = await this.fromServer({})
    this.analysis = sdata
    setTimeout(function(){
      console.log("....")
      ang.loaded = true
    },500)
  }


  async fromServer(input:any){
    return {
      fire: true,
      action:{}
    }
  }

}
