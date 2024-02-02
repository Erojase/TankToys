import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
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
export class MapComponent implements OnInit, AfterViewInit {
    @Input() width: number;
    @Input() heigth: number;

    @ViewChild('mapContainer') mapContainer: ElementRef<HTMLElement>;

    position: MapPosition;

    posx: number = -25;
    posy: number = 50;

    map: any;

    constructor() {
        this.position = GameMap.position;
    }
    ngAfterViewInit(): void {
        for (const element of this.mapContainer.nativeElement.children) {
            for (const image of element.children) {
                if ((<HTMLImageElement>image).src.includes("wall")) {
                    (<HTMLElement>image).style.border = "1px green solid"
                    GameMap.registerCollider(image.getBoundingClientRect());
                }
            }
        }
        console.log(GameMap.colliders);
        
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
        let projectItems = GameMap.createMap(random).map(project => {
            return (
                `<div [ngStyle]="{
                    'position': 'absolute',
                    'top': ${this.position.y = this.posy = 50},
                    'left': ${this.position.x = this.posx += 25}}"
                >
                    ${project.map(another => `<img height="50px" width="50px" src="/assets/images/map/${another}" [ngStyle]="{
                            'position': 'absolute',
                            'padding': '0', 
                            'top': ${this.position.y = this.posy += 50},
                            'left': ${this.position.x = this.posx}
                        }"/>`)
                }
                </div>`
            )
        });

        this.map = projectItems.toString().replaceAll('>,<', '><');
    }

}
