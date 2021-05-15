import { User } from './../models/user.model';
import { Question } from './../models/question.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  userLink = "http://localhost:3000/regions/";
  constructor(private http: HttpClient) { }

  public addQuestion(regionName : string ,text: string, answer : string, false_answer1 : string,
    false_answer2 : string,false_answer3 : string,false_answer4 : string,false_answer5 : string,false_answer6 : string) {

      const body = { regionName  ,text, answer, false_answer1,
        false_answer2,false_answer3,false_answer4,false_answer5,false_answer6};
        console.log("I AM HERE", body);
        return this.http.post<any>(this.userLink + "inputQuestion", body);
  }
}
