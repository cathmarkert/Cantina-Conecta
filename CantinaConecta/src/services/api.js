import { API_URL } from '@env';

/**
 * Camada única de acesso à API.
 *
 * Centraliza o que antes estava repetido em cada tela: montagem da URL,
 * cabeçalhos, envio do cookie de sessão e leitura da mensagem de erro que o
 * backend devolve. Em caso de falha lança um Error com essa mensagem, para que
 * a tela só precise exibi-la.
 */
async function request(method, path, body) {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            // Mantém a sessão entre as requisições.
            credentials: 'include',
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch (error) {
        throw new Error('Não foi possível conectar ao servidor.');
    }

    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }

    if (!response.ok) {
        throw new Error((data && data.message) || `Erro ${response.status}.`);
    }

    return data;
}

export const api = {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    patch: (path, body) => request('PATCH', path, body),
    del: (path) => request('DELETE', path),
};

/** Formata um número como moeda brasileira: 4.5 -> "R$ 4,50". */
export function formatarReal(valor) {
    const numero = Number(valor) || 0;
    return `R$ ${numero.toFixed(2).replace('.', ',')}`;
}
