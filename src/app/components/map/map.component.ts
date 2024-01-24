import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMap, MapPosition } from '../../models/Map';

@Component({
    selector: 'app-map',
    standalone: true,
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    imports: [
        CommonModule
    ]
})
export class MapComponent implements OnInit {
    @Input() width: number;
    @Input() heigth: number;
    @Input() position: MapPosition;

    posx: number = -25;
    posy: number = 50;

    map: any[];

    constructor() { }

    ngOnInit() {
        this.generateMap(true);
    }

    generateMap(random: boolean) {
        let projectItems = GameMap.createMap(random).map(project => {
            return `
        <div style={{
            position: 'absolute',
            top: ${this.position.y = this.posy = 50},
            left: ${this.position.x = this.posx += 25}
        }}>
            {
                project.map(another => <img height={50} width={50} src={"imgs/" + another} style={{
                    position: 'absolute',
                    top: ${this.position.y = this.posy += 50},
                    left: ${this.position.x = this.posx}
                }}></img>)
            }
        </div>
     `
        });
        this.map = projectItems;
    }

}
