import { Component, OnInit } from '@angular/core';
import { GameMap } from '../../models/Map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  posx: number = -25;
  posy: number = 50;

  map: any[];

  constructor() { }

  ngOnInit() {
  }

  generateMap(random:boolean){
    let projectItems = GameMap.createMap(random).map(project => {
      return `
      <div style={{
          position: 'absolute',
          top: props.position.y = posy = 50,
          left: props.position.x = posx += 25
          // zIndex:0
      }}>
          {
              project.map(another => <img height={50} width={50} src={"imgs/" + another} style={{
                  position: 'absolute',
                  top: props.position.y = posy += 50,
                  left: props.position.x = posx
                  // zIndex:0
              }}></img>)
          }
      </div>
     `
  });
  this.map = projectItems;
  }

}
