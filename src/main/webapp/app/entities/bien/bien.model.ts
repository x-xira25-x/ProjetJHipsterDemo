import { BaseEntity } from './../../shared';

export class Bien implements BaseEntity {
    constructor(
        public id?: number,
        public rueNo?: string,
        public localite?: string,
        public anneeConstruction?: any,
        public nbPieces?: number,
        public libelle?: string,
        public type?: string,
        public vendu?: string,
        public photoContentType?: string,
        public photo?: any,
        public clients?: BaseEntity[],
        public visites?: BaseEntity[],
    ) {
    }
}
