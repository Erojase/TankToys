import { ComponentRef } from "@angular/core"

export interface ComponentReference{
    [x: string]: ComponentRef<any>
}

export class ReferenceRepository{
    static Component: ComponentReference;
}