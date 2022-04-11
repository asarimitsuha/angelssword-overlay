import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClipViewerComponent } from './clip-viewer/clip-viewer.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent
    },
    {
        path: 'clip-viewer',
        component: ClipViewerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
