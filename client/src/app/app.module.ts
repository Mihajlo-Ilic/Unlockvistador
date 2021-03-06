import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtInterceptor } from './auth/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModelForAddingQuestionsComponent } from './model-for-adding-questions/model-for-adding-questions.component';
import { RegionDialogComponent } from './region-dialog/region-dialog.component';
import { FunFactsComponent } from './fun-facts/fun-facts.component';
import { CommentsDisplayComponent } from './comments-display/comments-display.component';
import { QuizComponentComponent } from './quiz-component/quiz-component.component';
import { FinishedQuizComponent } from './finished-quiz/finished-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterInfoComponent,
    MainPageComponent,
    ModelForAddingQuestionsComponent,
    RegionDialogComponent,
    FunFactsComponent,
    CommentsDisplayComponent,
    QuizComponentComponent,
    FinishedQuizComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
