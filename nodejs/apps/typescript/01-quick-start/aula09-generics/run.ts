import { DaoInterface } from './dao.interface';
import { Dao } from './dao';
import { Animal } from './../aula07-classes/animal';

let dao: Dao<Animal> = new Dao<Animal>();
let animal: Animal = new Animal('Rex');

dao.insert(animal);
