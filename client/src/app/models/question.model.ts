export class Question {
  
  constructor(
    public _id : string,
    public region : string,
    public text : string,
    public answer : string,
    public false_answer1 : string,
    public false_answer2 : string,
    public false_answer3 : string,
    public false_answer4 : string,
    public false_answer5 : string,
    public false_answer6 : string,
  ) { }

  public getRegion(): string{
    return this.region;
  }
}
