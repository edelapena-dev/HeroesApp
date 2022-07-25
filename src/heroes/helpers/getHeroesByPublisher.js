import { heroes } from '../data/heroes';

export const getHeroesByPublisher = ( publisher ) => {

    const validatePublisher = ['DC Comics','Marvel Comics'];
    if(!validatePublisher.includes( publisher )){
        throw new Error(`${ publisher } is not a valid publisher`);
    }

    return heroes.filter( heroe => heroe.publisher === publisher );

}