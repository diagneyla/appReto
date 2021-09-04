import { NgModule } from "@angular/core"

import { MatButtonModule } from "@angular/material/button"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from "@angular/material/list"
import { MatExpansionModule } from "@angular/material/expansion"
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
    declarations: [
  ],
    imports: [
        MatButtonModule, //
        MatCheckboxModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule, //
        MatCheckboxModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatMenuModule
    ],
})
export class MaterialModule {}