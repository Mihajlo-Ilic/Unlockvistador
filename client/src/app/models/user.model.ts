export class User {

    constructor(
                public _id: string,
                public name: string,
                public lastname: string,
                public username: string,
                public email: string,
                public image: string,
                public password: string,
                public unlockedRegions: string[],
                public admin: boolean,
                public loggedIn: boolean,
                public accessToken : string
                ){

    }
    public getFirsName(): string{
        return this.name;
    }

    public getLastName(): string {
        return this.lastname;
    }

    public getUsername(): string{
        return this.username;
    }

    public getUnlockedRegions() : string[] {
        return this.unlockedRegions;
    }

    public getAccessToken() : string {
        return this.accessToken;
    }
}
