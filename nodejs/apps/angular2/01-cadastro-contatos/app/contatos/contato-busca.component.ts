import { Component, OnInit } from '@angular/core';

import { ContatoService } from './contato.service';
import { Contato } from './contato.model';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html'
})
export class ContatoBuscaComponent implements OnInit {
    
    contatos: Observable<Contato[]>;
    
    /*
     * Subject é basicamente um produtor de fluxo de eventos observáveis. 
     * Neste caso, é responsável por gerenciar o fluxo de buscas, 
     * como se fosse um array ou fila onde são adicionados os termos das buscas.
     */ 
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private contatoService: ContatoService
    ) { }

    ngOnInit(): void { 
        /*
         * SwitchMap gerencia os Observables vindos da requisição, 
         * mostrando sempre a última busca e cancelando os Observables 
         * retornados nas requisições anteriores
         */
        this.contatos = this.termosDaBusca
            .debounceTime(500)  // Aguarde por 500ms para emitir novos eventos            
            .distinctUntilChanged() // Ignore se o próximo termo de busca for igual ao anterior
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {               
                console.log(err);
                return Observable.of<Contato[]>([]);
            });       
    }

    search(termo: string): void {
        // Adiciona o termo da busca no Subject                
        this.termosDaBusca.next(termo);
    }

}