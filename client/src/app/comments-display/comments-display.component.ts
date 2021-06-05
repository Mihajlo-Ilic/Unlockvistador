import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model'
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../services/region.service';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-comments-display',
  templateUrl: './comments-display.component.html',
  styleUrls: ['./comments-display.component.css']
})
export class CommentsDisplayComponent implements OnInit {


  @Input() regionName : string;
  @Input() localUserName: string;
  public comments : Comment[];
  public checkForm: FormGroup;
  public regionNamePravo : string;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private regionService : RegionService, private userService : UserService) {
    this.checkForm  = fb.group({
      commentInput : [' ', [Validators.required, Validators.pattern(".+")]]
    });
    this.comments = []
   }

  ngOnInit(): void {
    //dohvatiti komentare
      this.getComments();
      this.regionNamePravo = this.regionName
      if(this.regionName === "Nisava"){
        this.regionNamePravo = "Jugoistočna Srbija"
      } else if(this.regionName === "Backa"){
        this.regionNamePravo = "Bačka"
      } else if(this.regionName === "Kosovo"){
        this.regionNamePravo = "Kosovo i Metohija"
      } else if(this.regionName === "Raska"){
        this.regionNamePravo = "Raška"
      } else if(this.regionName === "Sumadija"){
        this.regionNamePravo = "Šumadija"
      } else if(this.regionName === "Istok"){
        this.regionNamePravo = "Istočna Srbija"
      }
  }

  @Output() closeEmitter = new EventEmitter<boolean>()

  //FIXME: dumb implementation; instead of just updating the local list this function just loads the comments again
  public getComments() : void{
    this.regionService.getRegionComments(this.regionName).subscribe(e => {
      let commObj = e.commentsObjects;
      this.comments = []
      for (let i = 0; i < commObj.length; i++) {
          let comm = new Comment(commObj[i].username, commObj[i].comment)
          this.comments.push(comm)
      }
      //console.log(this.comments[0])
    })
  }

  public close(): void {
      this.closeEmitter.emit(true);
  }

  public sendComment(data): void {
      let comment = data.commentInput;
      let uname = this.userService.currentUser.username
      let region = this.regionName

      this.regionService.sendRegionComment(region, comment).subscribe(e => {
        //refresh comments
        this.getComments()
      })
  }

}
