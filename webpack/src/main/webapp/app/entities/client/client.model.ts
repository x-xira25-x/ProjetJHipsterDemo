import { BaseEntity, User } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public npa?: string,
        public localite?: string,
        public numTel?: number,
        public user?: User,
        public biens?: BaseEntity[],
    ) {
    }
}
