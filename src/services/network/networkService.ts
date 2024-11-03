import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
interface NetworkNode {
  username: string | null;
  parent_username: string | null;
  sponsor_username: string | null;
  level: number | null;
  position: number | null;
  absolute_side?: string | null;
  relative_side?: string | null;
  status: string | null;
}

interface NetworkResponse {
  status: boolean;
  network: Array<{ [position: string]: NetworkNode }> | null;
  message?: string;
  count: { left: number; right: number };

}

interface FetchNetworkResult {
  status: boolean;
  message: string;
  network: Array<{ [position: string]: NetworkNode }> | null;
  count: { left: number; right: number };
}


// Função para criar a estrutura fixa da árvore
function createEmptyTree(): NetworkResponse['network'] {
  const tree: NetworkResponse['network'] = [];

  const emptyNode = { username: null, parent_username: null, sponsor_username: null, level: 0, position: 0,  status: null }
  // Nível 0 - 1 posição
  tree[0] = { 1: emptyNode};

  // Nível 1 - 2 posições
  tree[1] = { 1: emptyNode, 2: emptyNode };

  // Nível 2 - 4 posições
  tree[2] = { 3: emptyNode, 4: emptyNode, 5: emptyNode, 6: emptyNode };

  // Nível 3 - 8 posições
  tree[3] = { 7: emptyNode, 8: emptyNode, 9: emptyNode, 10: emptyNode, 11: emptyNode, 12: emptyNode, 13: emptyNode, 14: emptyNode };

  // Nível 4 - 16 posições
  tree[4] = {
    15: emptyNode, 16: emptyNode, 17: emptyNode, 18: emptyNode, 19: emptyNode, 20: emptyNode, 21: emptyNode, 22: emptyNode,
    23: emptyNode, 24: emptyNode, 25: emptyNode, 26: emptyNode, 27: emptyNode, 28: emptyNode, 29: emptyNode, 30: emptyNode
  };

  return tree;
}

// Função para preencher a árvore com os dados da API
function populateTreeWithData(tree: NetworkResponse['network'], nodes: NetworkResponse['network']): NetworkResponse['network'] {
  if(nodes) { 
    nodes.forEach((levelData, levelIndex) => {
      for (const position in levelData) {
        if (levelData.hasOwnProperty(position)) {
          if(tree) { 
            tree[levelIndex][position] = levelData[position];
          }
        }
      }
    });
  }
 

  return tree;
}

async function fetchNetwork(login: string): Promise<FetchNetworkResult> {
  try {
    // Faz a requisição à API para obter os dados da árvore
    const response = await fetchWrapper.post('/network/get-network', { login }) as NetworkResponse;

    // Verifica se o status da resposta é falso
    if (!response.status) {
      return {
        status: false,
        message: response.message || 'A API retornou um status de falha.',
        network: null,
        count: { 
          left: 0,
          right: 0
        }
      };
    }

    // Verifica se a resposta não contém a propriedade 'network'
    if (!response.network) {
      return {
        status: false,
        message: 'A resposta da API não contém a propriedade network.',
        network: null,
        count: { 
          left: 0,
          right: 0
        }
      };
    }

    // Cria a árvore fixa vazia
    const emptyTree = createEmptyTree();

    // Preenche a árvore com os dados recebidos da API
    const filledTree = populateTreeWithData(emptyTree, response.network);

    return {
      status: true,
      message: 'Tree loaded.',
      network: filledTree,
      count: { 
        left: response.count.left,
        right: response.count.right,
      }
    };

  } catch (error) {
    console.error('Erro ao buscar os dados da árvore:', error);
    return {
      status: false,
      message: 'Erro ao buscar os dados da árvore.',
      network: null,
      count: { 
        left: 0,
        right: 0
      }
    };
  }


}


async function fetchNode(login: string) { 

  try {
    const response = await fetchWrapper.post('/network/get-network-node', { login });
    if (response.status == true) { 
      return response.node;
    }

    return null;

  }catch (error) { 
    console.log(error)
  }

}

export { fetchNetwork, fetchNode};
