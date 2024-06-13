import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';
import { GameMap, MapPosition } from '../../models/Map';

@Component({
    selector: 'app-map',
    standalone: true,
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
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

    imageY = 50;
    imageX = 50;

    constructor() {
        this.position = GameMap.position;
    }

    reload(){
        this.ngOnInit();
        this.ngAfterViewInit();
    }

    ngAfterViewInit(): void {
        for (const element of this.mapContainer.nativeElement.children) {
            for (const image of element.children) {
                if ((<HTMLImageElement>image).src.includes("wall")) {
                    GameMap.registerCollider(image.getBoundingClientRect(), "wall" + uuid());
                } else {
                    GameMap.registerCollider(image.getBoundingClientRect(), "floor" + uuid());
                }
            }
        }
        // GameMap.reallocateTanks();
        console.log(GameMap.colliders);

    }

    ngOnInit() {
        this.imageY = window.innerHeight / 16;
        this.imageX = window.innerWidth / 24;

        this.generateMap(false);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
        this.imageY = window.innerHeight / 16;
        this.imageX = window.innerWidth / 24.2;

        this.generateMap(false);
    }

    generateMap(random: boolean) {
        let projectItems = GameMap.createMap(random).map(project => {
            return (
                `<div class="column">
                    ${project.map(another => `<img height="${this.imageY}px" width="${this.imageX}px" style="margin: 0; padding: 0;" src="/assets/images/map/${another}" />`)
                }
                </div>`
            )
        });

        this.mapContainer.nativeElement.innerHTML = projectItems.toString().replaceAll('>,<', '><');
    }

}
