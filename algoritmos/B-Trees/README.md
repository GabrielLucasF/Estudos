# B-Tree Implementation

Implementação completa de B-Tree em JavaScript seguindo as regras definidas em `RULES.md`.

## Arquivos

- `BTree.js` - Implementação principal das classes BTree e BTreeNode
- `exemplo.js` - Demonstração de uso com operações básicas
- `RULES.md` - Definição das regras e propriedades das B-Trees

## Como executar

```bash
node exemplo.js
```

## Funcionalidades implementadas

### ✅ Propriedades Fundamentais

- Balanceamento automático
- Ordem M configurável
- Mínimo e máximo de chaves por nó
- Tratamento especial da raiz

### ✅ Operações

- **Busca**: O(logₘ n) - busca binária dentro dos nós
- **Inserção**: O(logₘ n) - com split automático
- **Remoção**: O(logₘ n) - com redistribuição e merge

### ✅ Características

- Nós ordenados internamente
- Estrutura de ponteiros correta (k+1 ponteiros para k chaves)
- Tratamento de underflow e overflow
- Manutenção do balanceamento

## Exemplo de uso

```javascript
const { BTree } = require("./BTree.js");

const btree = new BTree(3);

btree.insert(10);
btree.insert(20);
btree.insert(5);

console.log(btree.traverse()); // [5, 10, 20]
console.log(btree.search(10)); // { found: true, key: 10 }

btree.remove(10);
console.log(btree.search(10)); // { found: false }
```

## Complexidade

- **Busca**: O(logₘ n)
- **Inserção**: O(logₘ n)
- **Remoção**: O(logₘ n)

Onde m é a ordem da árvore e n é o número de elementos.
