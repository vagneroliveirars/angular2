import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContatoBuscaComponent } from './contato-busca.component';
import { ContatoDetalheComponent } from './contato-detalhe.component';
import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService } from './contato.service';

@NgModule( {
    imports: [
        CommonModule,
        ContatoRoutingModule,
        FormsModule
    ],
    declarations: [
        ContatoBuscaComponent,
        ContatoDetalheComponent,
        ContatosListaComponent
    ],
    exports: [
        /* Exporta os componentes para se tornarem vísíveis em outros módulos, 
         * como por exemplo no App Module onde os componentes
         * ContatoBuscaComponent e ContatosListaComponent são utilizados
         */                
        ContatoBuscaComponent,
        ContatosListaComponent
    ],
    providers: [
        ContatoService
    ]
})

export class ContatosModule {}