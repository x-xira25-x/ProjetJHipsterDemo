import { BaseEntity, User } from '../../shared';

export class BienAvendre implements BaseEntity {
    constructor(
        public id?: number,
        public rueNo?: string,
        public localite?: string,
        public anneeConstruction?: any,
        public nbPieces?: number,
        public libelle?: string,
        public clients?: BaseEntity[],
    ) {
    }
}
