import { NgModule } from '@angular/core';

import { ContatosListaComponent } from './contatos-lista.component';

@NgModule( {
    declarations: [
        ContatosListaComponent
    ],
    exports: [
        ContatosListaComponent
    ]
})

export class ContatosModule {}