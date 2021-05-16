import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { RegionService } from './../services/region.service' 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.css']
})
export class RegionDialogComponent implements OnInit {


  //public checkForm: FormGroup;
  
  public regionName: string;

  @Output() closeEmitter = new EventEmitter<boolean>()

  constructor(private http : HttpClient,private fb: FormBuilder, private regionService : RegionService) { 
    

  }

  public close() : void {
    this.closeEmitter.emit(true);
  }

  ngOnInit(): void {
  }

  public showComments(regionName) {

  } 

  public showFunFacts(regionName) {
    
  }

}
