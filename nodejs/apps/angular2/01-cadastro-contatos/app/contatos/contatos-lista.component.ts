import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';

@Component({
  moduleId: module.id,
  selector: 'contatos-lista',
  templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {
    contatos: Contato[];

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService) {}
    
    ngOnInit(): void {
        this.contatoService.getContatos()
            .then((contatos: Contato[]) => {
                this.contatos = contatos;
            }).catch(err => {
                console.log('Aconteceu um erro: ', err);
            });
    }    

    onDelete(contato: Contato): void {
        // Chama o serviço para confirmar a remoção do contato
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + '?')
            .then((canDelete: boolean) => {
                if (canDelete) {
                    // Se confirmar chama o serviço que deleta o contato
                    this.contatoService
                        .delete(contato)
                        .then(() => {
                            // Remove o contato deletado da lista de contatos
                            this.contatos = this.contatos.filter((c : Contato) => c.id != contato.id);
                        }).catch(error => {
                            console.log(error);
                        });
                }
            });
    }
} 