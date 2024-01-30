import { Component, OnInit, Input, HostListener } from '@angular/core';
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
    position: MapPosition;

    posx: number = -25;
    posy: number = 50;

    map: any[];

    constructor() {
        this.position = GameMap.position;
    }

    @HostListener('click', ['$event'])
    onClick(e: Event) {
        this.generateMap(false);
    }

    ngOnInit() {
        this.generateMap(true);
    }

    setMapStyle() {
        return {
            "width": "50px",
            "height": "50px",
            "display": 'flex'
        }
    }

    generateMap(random: boolean) {
        let projectItems = GameMap.createMap(random).map(project => 
            "pepe");
        this.map = projectItems;
    }

}
