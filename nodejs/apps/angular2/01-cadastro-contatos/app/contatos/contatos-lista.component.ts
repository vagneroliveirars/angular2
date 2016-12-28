import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
  moduleId: module.id,
  selector: 'contatos-lista',
  templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {
    contatos: Contato[];

    constructor(private contatoService: ContatoService) {}
    
    ngOnInit(): void {
        this.contatos = this.contatoService.getContatos();
    }    
} 