import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipViewerComponent } from './clip-viewer.component';
import { ClipPreviewModule } from 'src/app/components/clip-preview/clip-preview.module';



@NgModule({
  declarations: [
    ClipViewerComponent
  ],
  imports: [
    CommonModule,
    ClipPreviewModule
  ]
})
export class ClipViewerModule { }
