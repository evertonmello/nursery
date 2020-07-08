
import { NgModule } from '@angular/core';

import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
    ]
})
export class MaterialModule {}