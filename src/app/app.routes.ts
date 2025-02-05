import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventListComponent } from './components/event-list/event-list.component';

export const routes: Routes = [
    {path: '', redirectTo: '/events', pathMatch: 'full'},
    {path: 'events', component: EventListComponent},
    {path: 'add-event', component: EventFormComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule],
})
export class AppRoutingModule{}