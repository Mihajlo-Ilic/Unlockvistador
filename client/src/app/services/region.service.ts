import { Region } from './../models/region.model';
import { Comment } from './../models/comment.model'
import { User } from './../models/user.model';
import { UserService } from './../services/user.service'
import { Question } from './../models/question.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { Headers }

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  regionLink = "http://localhost:3000/regions/";
  constructor(private http: HttpClient, private userService : UserService) { }

  public addQuestion(regionName : string ,text: string, answer : string, false_answer1 : string,
    false_answer2 : string,false_answer3 : string,false_answer4 : string,false_answer5 : string,false_answer6 : string) {

      const body = { regionName  ,text, answer, false_answer1,
        false_answer2,false_answer3,false_answer4,false_answer5,false_answer6};
        //console.log("I AM HERE", body);
        return this.http.post<any>(this.regionLink + "inputQuestion", body);
  }

  public getRegionFacts(regionName : string) {
    console.log(regionName);
    return this.http.get<Region>(this.regionLink + "getRegionFacts?regionName=" + regionName);
  }

  public getRegionComments(regionName : string) {
    return this.http.get<any>(this.regionLink + "getRegionComments?regionName=" + regionName)
  }

  public sendRegionComment (regionName : string, comment : string) {
    let body = {
        regionName : regionName,
        comment : comment
    }
    
    return this.http.post<any>(this.regionLink + "addComment", body)
  }

  public getRegionQuestion (regionName: string) {
      return this.http.get<Question>(this.regionLink + "getRegionQuestion?regionName=" + regionName)
  }


}
