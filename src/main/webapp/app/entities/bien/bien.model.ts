import { BaseEntity } from './../../shared';

export class Bien implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: number,
        public rueNo?: string,
        public anneeConstruction?: any,
        public nbPieces?: number,
        public libelle?: string,
        public estInteressePars?: BaseEntity[],
    ) {
    }
}
