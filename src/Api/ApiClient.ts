import {Dependencies, ResolvedRecipe} from '../types';
import axios from 'axios';

export class ApiClient {
    public resolveRecipes(installed: Dependencies): Promise<ResolvedRecipe[]> {
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/resolve', installed)
                .then((response) => resolve(response.data))
                .catch(reject)
        });
    }

    public downloadArchive(resolvedRecipe: ResolvedRecipe): Promise<string> {
        return new Promise((resolve, reject) => {
            axios.get('http://127.0.0.1:8000/archives/'+resolvedRecipe.archive, { responseType: 'arraybuffer' })
                .then((response) => resolve(response.data))
                .catch(reject)
        });
    }
}
