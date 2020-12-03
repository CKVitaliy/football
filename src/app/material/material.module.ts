import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatListModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
