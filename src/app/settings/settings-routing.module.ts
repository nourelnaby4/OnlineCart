import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [{ path: '', redirectTo:'changepassword',pathMatch:'full'},
{path:'changepassword' , component:ChangepasswordComponent,title:'ChangePassword'},
{path:'resetpassword' , component:ResetpasswordComponent,title:'ResetPassword'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
