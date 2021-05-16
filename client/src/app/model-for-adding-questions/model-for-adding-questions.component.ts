import { RegionService } from './../services/region.service';
import { UserService } from './../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Question } from "../models/question.model"

@Component({
  selector: 'app-model-for-adding-questions',
  templateUrl: './model-for-adding-questions.component.html',
  styleUrls: ['./model-for-adding-questions.component.css']
})
export class ModelForAddingQuestionsComponent implements OnInit {
  Questions : Question = new Question("bla","bla","bla","bla","bla","bla","bla","bla","bla","bla");

  @Output() closeEmiter = new EventEmitter<boolean>()

  public checkForm: FormGroup;
  @Input() localUserName: string;
  inputFieldClass: string;
  @Input() regionName: string;
  constructor(private http : HttpClient,private fb: FormBuilder,private regionService : RegionService) {
    this.checkForm = fb.group({
      text: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      regionName: ['', [Validators.required]],
      false_answer1: ['', [Validators.required]],
      false_answer2: ['', [Validators.required]],
      false_answer3: ['', [Validators.required]],
      false_answer4: ['', [Validators.required]],
      false_answer5: ['', [Validators.required]],
      false_answer6: ['', [Validators.required]],
    });
  }

  public get text() {
    return this.checkForm.get('text');
  }
  public get answer() {
    return this.checkForm.get('answer');
  }

  public get false_answer1() {
    return this.checkForm.get('false_answer1');
  }
  public get false_answer2() {
    return this.checkForm.get('false_answer2');
  }
  public get false_answer3() {
    return this.checkForm.get('false_answer3');
  }
  public get false_answer4() {
    return this.checkForm.get('false_answer4');
  }
  public get false_answer5() {
    return this.checkForm.get('false_answer5');
  }
  public get false_answer6() {
    return this.checkForm.get('false_answer6');
  }


  ngOnInit(): void {
  }

  submitAddQuestion(data) : void {
    data.regionName = this.regionName;
    console.log(data);
    this.regionService.addQuestion(data.regionName, data.text, data.answer, data.false_answer1,data.false_answer2,
      data.false_answer3,data.false_answer4,data.false_answer5,data.false_answer6).subscribe(e => {
        console.log(e);
      });

  }

  close() : void {
    console.log(this.Questions)
    this.closeEmiter.emit(true);
  }
}
