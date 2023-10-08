import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ResetpasswordComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
