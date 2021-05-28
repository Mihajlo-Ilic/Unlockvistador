export class Comment {
   constructor(
       public username: string,
       public comment: string
   ) {}

   public getUsername() {
       return this.username
   }

   public getComment() {
       return this.comment
   }
}