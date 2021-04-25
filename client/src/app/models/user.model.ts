export class User {

    constructor(
                public _id: string,
                public firstName: string,
                public lastName: string,
                public username: string,
                public email: string,
                public imgPath: string,
                public password: string,
                public unlockedRegions: string[] = [],
                public admin: boolean,
                public loggedIn: boolean
                ){
                    
    }
    public getFirsName(): string{
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getUsername(): string{
        return this.username;
    }
}