import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'data', component: DataComponent},
    {path: 'upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }