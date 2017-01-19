import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService {

    private contatosUrl: string = 'app/contatos';

    constructor(private http: Http) {}

    getContatos(): Promise<Contato[]> {
        /*
        / toPromise converte o Observable retornado pelo 
        / http.get (API mockada) em uma Promise
        */ 
        return this.http.get(this.contatosUrl)
        .toPromise()
        .then(response => response.json().data as Contato[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('Error: ', error);
        return Promise.reject(error.message || error);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 6000);
        }).then(() => this.getContatos());
    }
}