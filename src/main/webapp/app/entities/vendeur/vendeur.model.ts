import { BaseEntity, User } from './../../shared';

export class Vendeur implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public npa?: string,
        public localite?: string,
        public numTelephone?: number,
        public user?: User,
    ) {
    }
}
