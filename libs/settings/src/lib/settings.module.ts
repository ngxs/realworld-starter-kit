import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPage } from './settings/settings.page';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsGuard } from './guards/settings/settings.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: SettingsPage, canActivate: [SettingsGuard] }]),
    ReactiveFormsModule
  ],
  declarations: [SettingsPage]
})
export class SettingsModule {}
