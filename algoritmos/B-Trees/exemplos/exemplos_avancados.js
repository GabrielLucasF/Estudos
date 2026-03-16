const { BTree } = require("../BTree.js");

console.log("=== Exemplos Avançados de B-Tree ===\n");

function exemploOrdens() {
    console.log("1. Comparação entre diferentes ordens:");
    console.log("=".repeat(50));

    const dados = [10, 20, 5, 6, 12, 30, 7, 17, 25, 35, 40, 2, 8, 15, 22];
    const ordens = [2, 3, 4, 5];

    ordens.forEach((ordem) => {
        console.log(`\nB-Tree de ordem ${ordem}:`);
        const btree = new BTree(ordem);

        dados.forEach((dado) => btree.insert(dado));

        console.log(`  Elementos: [${btree.traverse().join(", ")}]`);
        console.log(`  Altura: ${calcularAltura(btree.root)}`);
        console.log(`  Validação: ${btree.validate().valid ? "✅" : "❌"}`);
    });
}

function exemploMassa() {
    console.log("\n\n2. Operações em massa:");
    console.log("=".repeat(50));

    const btree = new BTree(4);
    const tamanho = 1000;

    console.log(`Inserindo ${tamanho} elementos aleatórios...`);
    const inicio = Date.now();

    for (let i = 0; i < tamanho; i++) {
        btree.insert(Math.floor(Math.random() * tamanho * 10));
    }

    const tempoInsercao = Date.now() - inicio;
    console.log(`Tempo de inserção: ${tempoInsercao}ms`);
    console.log(`Elementos únicos: ${btree.traverse().length}`);

    console.log("\nRemovendo 20% dos elementos...");
    const elementos = btree.traverse();
    const remover = elementos.slice(0, Math.floor(elementos.length * 0.2));

    const inicioRemocao = Date.now();
    remover.forEach((el) => btree.remove(el));
    const tempoRemocao = Date.now() - inicioRemocao;

    console.log(`Tempo de remoção: ${tempoRemocao}ms`);
    console.log(`Elementos restantes: ${btree.traverse().length}`);
    console.log(`Validação final: ${btree.validate().valid ? "✅" : "❌"}`);
}

function exemploLimites() {
    console.log("\n\n3. Teste de casos limite:");
    console.log("=".repeat(50));

    const btree = new BTree(3);

    console.log("Inserindo elementos ordenados (pior caso):");
    const ordenados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    ordenados.forEach((num, index) => {
        btree.insert(num);
        console.log(`  Após inserir ${num}: altura = ${calcularAltura(btree.root)}`);
    });

    console.log("\nRemovendo elementos em ordem reversa:");
    const reverso = [...ordenados].reverse();

    reverso.forEach((num, index) => {
        btree.remove(num);
        console.log(`  Após remover ${num}: altura = ${calcularAltura(btree.root)}`);
    });
}

function exemploValidacao() {
    console.log("\n\n4. Teste de validação de integridade:");
    console.log("=".repeat(50));

    const btree = new BTree(3);
    const dados = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];

    console.log("Inserindo dados e validando a cada passo:");
    for (const [index, dado] of dados.entries()) {
        btree.insert(dado);
        const validacao = btree.validate();
        console.log(`  ${index + 1}. Inserido ${dado}: ${validacao.valid ? "✅" : "❌"}`);

        if (!validacao.valid) {
            console.log(`     Erro: ${validacao.error}`);
            break;
        }
    }

    console.log("\nEstrutura final:");
    btree.print();
}

function exemploComparacao() {
    console.log("\n\n5. Comparação B-Tree vs Array:");
    console.log("=".repeat(50));

    const dados = [];
    const btree = new BTree(4);
    const tamanho = 10000;

    for (let i = 0; i < tamanho; i++) {
        dados.push(Math.floor(Math.random() * tamanho * 100));
    }

    console.log("Testando inserção:");

    const inicioArray = Date.now();
    const arrayOrdenado = [...dados].sort((a, b) => a - b);
    const tempoArrayInsercao = Date.now() - inicioArray;

    const inicioBTree = Date.now();
    dados.forEach((dado) => btree.insert(dado));
    const tempoBTreeInsercao = Date.now() - inicioBTree;

    console.log(`  Array (sort): ${tempoArrayInsercao}ms`);
    console.log(`  B-Tree: ${tempoBTreeInsercao}ms`);
    console.log(`  Razão: ${(tempoBTreeInsercao / tempoArrayInsercao).toFixed(2)}x`);

    const buscas = dados.slice(0, 1000);

    console.log("\nTestando busca (1000 elementos):");

    const inicioArrayBusca = Date.now();
    buscas.forEach((busca) => {
        arrayOrdenado.includes(busca);
    });
    const tempoArrayBusca = Date.now() - inicioArrayBusca;

    const inicioBTreeBusca = Date.now();
    buscas.forEach((busca) => {
        btree.search(busca);
    });
    const tempoBTreeBusca = Date.now() - inicioBTreeBusca;

    console.log(`  Array (includes): ${tempoArrayBusca}ms`);
    console.log(`  B-Tree: ${tempoBTreeBusca}ms`);
    console.log(`  Razão: ${(tempoArrayBusca / tempoBTreeBusca).toFixed(2)}x`);
}

function exemploVisualizacao() {
    console.log("\n\n6. Visualização da estrutura:");
    console.log("=".repeat(50));

    const btree = new BTree(3);
    const dados = [50, 30, 70, 20, 40, 60, 80];

    dados.forEach((dado, index) => {
        console.log(`\nApós inserir ${dado}:`);
        btree.insert(dado);
        imprimirEstruturaBonita(btree.root);
    });
}

function exemploPersistencia() {
    console.log("\n\n7. Persistência (serialização):");
    console.log("=".repeat(50));

    const btree = new BTree(3);
    const dados = [100, 50, 150, 25, 75, 125, 175, 10, 30, 60, 90];

    dados.forEach((dado) => btree.insert(dado));

    console.log("B-Tree original:");
    console.log(`Elementos: [${btree.traverse().join(", ")}]`);

    const serializado = JSON.stringify(btree._formatNode(btree.root));
    console.log(`\nTamanho serializado: ${serializado.length} caracteres`);

    const carregado = JSON.parse(serializado);
    console.log("Estrutura carregada com sucesso!");

    const elementosOriginais = btree.traverse();
    const ordenadoCorretamente = elementosOriginais.every((val, i) => {
        if (i === 0) return true;
        return val > elementosOriginais[i - 1];
    });
    console.log(`Validação de ordem: ${ordenadoCorretamente ? "✅" : "❌"}`);
}

function calcularAltura(node) {
    if (node.isLeaf) return 1;
    return 1 + calcularAltura(node.children[0]);
}

function imprimirEstruturaBonita(node, nivel = 0, prefixo = "") {
    const indent = "  ".repeat(nivel);
    const chaves = node.keys.join(", ");
    const tipo = node.isLeaf ? "Folha" : "Interno";

    console.log(`${indent}${prefixo}${tipo}: [${chaves}]`);

    if (!node.isLeaf) {
        node.children.forEach((filho, index) => {
            const ultimo = index === node.children.length - 1;
            const novoPrefixo = ultimo ? "└── " : "├── ";
            imprimirEstruturaBonita(filho, nivel + 1, novoPrefixo);
        });
    }
}

function executarTodos() {
    try {
        exemploOrdens();
        exemploMassa();
        exemploLimites();
        exemploValidacao();
        exemploComparacao();
        exemploVisualizacao();
        exemploPersistencia();

        console.log("\n\n=== Todos os exemplos concluídos com sucesso! ===");
    } catch (error) {
        console.error("Erro durante a execução:", error);
    }
}

executarTodos();
