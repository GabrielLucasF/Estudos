# Exemplos de B-Tree

Este diretório contém diversos exemplos para demonstrar o uso e as capacidades da implementação B-Tree.

## 📁 Arquivos de Exemplo

### 1. **exemplo.js** - Exemplo Básico

Demonstração fundamental das operações:

- ✅ Inserção de elementos
- ✅ Busca de elementos
- ✅ Remoção de elementos
- ✅ Visualização da estrutura

**Como executar:**

```bash
node exemplo.js
```

### 2. **exemplos_avancados.js** - Exemplos Avançados

Testes técnicos e de performance:

- ✅ Comparação entre diferentes ordens
- ✅ Operações em massa (1000+ elementos)
- ✅ Testes de casos limite
- ✅ Validação de integridade
- ✅ Comparação B-Tree vs Array
- ✅ Visualização passo a passo
- ✅ Persistência (serialização)

**Como executar:**

```bash
node exemplos_avancados.js
```

### 3. **exemplos_interativos.js** - Exemplos Interativos

Simulações e jogos educativos:

- ✅ Simulador interativo de comandos
- ✅ Jogo de adivinhação
- ✅ Análise de performance em tempo real
- ✅ Visualização passo a passo
- ✅ Teste de consistência

**Como executar:**

```bash
node exemplos_interativos.js
```

### 4. **exemplos_especiais.js** - Aplicações Práticas

Implementações do mundo real:

- ✅ Banco de dados simples
- ✅ Sistema de arquivos simulado
- ✅ Cache LRU (Least Recently Used)
- ✅ Índice de texto invertido
- ✅ Agenda telefônica

**Como executar:**

```bash
node exemplos_especiais.js
```

## 🎯 Categorias de Exemplos

### 📚 **Educacionais**

- **exemplo.js**: Introdução básica
- **exemplos_interativos.js**: Aprendizado interativo

### 🔬 **Técnicos**

- **exemplos_avancados.js**: Testes avançados e performance
- **Validação**: Verificação de integridade da estrutura

### 🏢 **Aplicações Reais**

- **exemplos_especiais.js**: Casos de uso práticos

## 🚀 Sugestões de Novos Exemplos

### 1. **Exemplo de Concorrência**

```javascript
// Simular múltiplas operações simultâneas
// Testar thread-safety (se aplicável)
```

### 2. **Exemplo de Persistência em Arquivo**

```javascript
// Salvar B-Tree em arquivo
// Carregar B-Tree do arquivo
// Comparar performance memória vs disco
```

### 3. **Exemplo de Visualização Gráfica**

```javascript
// Gerar representação visual da árvore
// Exportar para formatos (DOT, SVG, etc.)
// Animações de inserção/remoção
```

### 4. **Exemplo de Benchmarking**

```javascript
// Comparação com outras estruturas (BST, AVL, etc.)
// Medição de consumo de memória
// Análise de complexidade prática
```

### 5. **Exemplo de API REST**

```javascript
// Criar servidor web com B-Tree
// Endpoints para CRUD operations
// Testes de carga e stress
```

### 6. **Exemplo de Compressão**

```javascript
// Usar B-Tree para compressão de dados
// Algoritmo de Huffman modificado
// Análise de taxa de compressão
```

## 🔧 **Como Criar Seu Próprio Exemplo**

### Estrutura Básica:

```javascript
const { BTree } = require("./BTree.js");

function meuExemplo() {
    console.log("=== Meu Exemplo ===");

    // Criar B-Tree
    const btree = new BTree(3);

    // Suas operações aqui

    console.log("=== Exemplo concluído! ===");
}

meuExemplo();
```

### Dicas:

1. **Comece simples**: Teste operações básicas primeiro
2. **Valide sempre**: Use `btree.validate()` após operações complexas
3. **Meça performance**: Use `Date.now()` para comparar tempos
4. **Visualize**: Use `btree.print()` para entender a estrutura
5. **Teste limites**: Tente casos extremos (muitos dados, dados ordenados)

## 📊 **Tabela de Exemplos**

| Exemplo                 | Dificuldade | Foco       | Elementos | Tempo Estimado |
| ----------------------- | ----------- | ---------- | --------- | -------------- |
| exemplo.js              | ⭐          | Básico     | 8         | ~1s            |
| exemplos_avancados.js   | ⭐⭐⭐      | Técnico    | 1000+     | ~10s           |
| exemplos_interativos.js | ⭐⭐        | Interativo | 20        | ~5s            |
| exemplos_especiais.js   | ⭐⭐⭐      | Aplicação  | 50+       | ~8s            |

## 🎓 **Conceitos Demonstrados**

### Fundamentais:

- ✅ Inserção com split automático
- ✅ Remoção com merge/redistribuição
- ✅ Busca O(log n)
- ✅ Balanceamento automático

### Avançados:

- ✅ Diferentes ordens e seus impactos
- ✅ Validação de integridade
- ✅ Análise de performance
- ✅ Casos limite e edge cases

### Práticos:

- ✅ Persistência de dados
- ✅ Cache e otimização
- ✅ Indexação e busca
- ✅ Aplicações do mundo real

## 🔍 **Como Aprender com os Exemplos**

1. **Execute em ordem**: Comece pelo `exemplo.js`
2. **Leia os comentários**: Cada exemplo tem explicações detalhadas
3. **Modifique os parâmetros**: Experimente diferentes ordens, quantidades de dados
4. **Compare resultados**: Observe como a estrutura muda
5. **Crie variações**: Adapte os exemplos para seus próprios casos

---

**Dica**: Execute todos os exemplos com `node *.js` para ver tudo de uma vez!
