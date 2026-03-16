## Propriedades Fundamentais

1. **Balanceamento**: Todas as folhas estão no mesmo nível (árvore perfeitamente balanceada)
2. **Ordem M**: Cada nó pode ter no máximo M-1 chaves e M filhos
3. **Mínimo de chaves**: Todo nó (exceto raiz) tem pelo menos ⌈M/2⌉-1 chaves
4. **Raiz especial**: A raiz pode ter tão poucas quanto 1 chave, mesmo que ⌈M/2⌉-1 = 0

## Estrutura dos Nós

5. **Ordenação interna**: As chaves em cada nó estão ordenadas crescentemente
6. **Estrutura de ponteiros**: Para nó com k chaves, existem k+1 ponteiros para filhos:
    - Ponteiro 0 → subárvore com chaves < chave₁
    - Ponteiro i → subárvore com chaveᵢ < chaves < chaveᵢ₊₁
    - Ponteiro k → subárvore com chaves > chaveₖ

## Operações

7. **Inserção**: Sempre insere na folha apropriada, seguindo desde a raiz
8. **Divisão (split)**: Quando nó atinge M-1 chaves:
    - Divide em dois nós com ⌈(M-1)/2⌉-1 chaves cada
    - Elemento mediano sobe para o pai
    - Se pai estiver cheio, propaga divisão para cima

9. **Remoção**:
    - Se chave está em nó interno, substitui por predecessor ou sucessor
    - Se folha ficar abaixo do mínimo, redistribui ou merge com irmão
    - Se raiz ficar vazia, sua altura diminui

## Complexidade

10. **Busca**: O(logₘ n) onde m é ordem da árvore
11. **Inserção**: O(logₘ n)
12. **Remoção**: O(logₘ n)
13. **Acessos ao disco**: O(logₘ n) - otimizado para sistemas de armazenamento
