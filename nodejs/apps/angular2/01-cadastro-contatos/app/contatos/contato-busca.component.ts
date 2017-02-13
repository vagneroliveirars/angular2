import { Component, EventEmitter, OnInit, OnChanges, Output, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { ContatoService } from './contato.service';
import { Contato } from './contato.model';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
})
export class ContatoBuscaComponent implements OnInit, OnChanges {
    
    // Input property exposto para enviar informações para o componente
    @Input() busca: string;
    
    /**
     * Emissor de eventos exposto como output property para o componente.
     * Padrão change é usado para fazer um two-way data-binding
     */ 
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();

    contatos: Observable<Contato[]>;
    
    /*
     * Subject é basicamente um produtor de fluxo de eventos observáveis. 
     * Neste caso, é responsável por gerenciar o fluxo de buscas, 
     * como se fosse um array ou fila onde são adicionados os termos das buscas.
     */ 
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private contatoService: ContatoService,
        private router: Router
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

    /**
     * OnChanges escuta as alterações nos atributos do componente decorados com @Input()
     */
    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        // Adiciona o termo da busca no Subject                
        this.termosDaBusca.next(termo);

        // Emite o evento
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        
        // Emite o evento de uma string vazia para resetar a busca
        this.buscaChange.emit('');
    }

}