const { BTree } = require("../BTree.js");
const readline = require("readline");

console.log("=== Exemplos Interativos de B-Tree ===\n");

function simuladorInterativo() {
    console.log("1. Simulador Interativo de B-Tree");
    console.log("=".repeat(50));

    const btree = new BTree(3);

    console.log("B-Tree criada com ordem 3");
    console.log("Comandos disponíveis:");
    console.log("  insert <numero> - Inserir um número");
    console.log("  remove <numero> - Remover um número");
    console.log("  search <numero> - Buscar um número");
    console.log("  print - Mostrar estrutura completa");
    console.log("  traverse - Mostrar elementos em ordem");
    console.log("  validate - Validar estrutura");
    console.log("  height - Mostrar altura");
    console.log("  clear - Limpar árvore");
    console.log("  sair - Sair do simulador");
    console.log();

    const comandos = [
        "insert 50",
        "insert 30",
        "insert 70",
        "insert 20",
        "insert 40",
        "print",
        "traverse",
        "search 40",
        "search 25",
        "remove 20",
        "print",
        "validate",
        "height",
    ];

    comandos.forEach((comando, index) => {
        console.log(`> ${comando}`);
        executarComando(btree, comando);

        if (index < comandos.length - 1) {
            console.log("---");
        }
    });
}

function jogoAdivinhacao() {
    console.log("\n\n2. Jogo de Adivinhação com B-Tree");
    console.log("=".repeat(50));

    const btree = new BTree(4);
    const numeros = [];

    for (let i = 0; i < 20; i++) {
        const num = Math.floor(Math.random() * 100) + 1;
        if (!numeros.includes(num)) {
            numeros.push(num);
            btree.insert(num);
        }
    }

    console.log("Números inseridos na B-Tree!");
    console.log("Tente adivinhar quais números estão na árvore.");
    console.log("Digite 'dica' para receber uma dica.");
    console.log("Digite 'sair' para terminar o jogo.");
    console.log();

    const tentativas = [25, 50, 75, "dica", numeros[0], "sair"];

    tentativas.forEach((tentativa, index) => {
        if (tentativa === "sair") {
            console.log("> sair");
            console.log("Jogo encerrado!");
            console.log(`Números na árvore: [${numeros.sort((a, b) => a - b).join(", ")}]`);
            return;
        }

        if (tentativa === "dica") {
            console.log("> dica");
            const elementos = btree.traverse();
            const menor = Math.min(...elementos);
            const maior = Math.max(...elementos);
            console.log(`Dica: Os números estão entre ${menor} e ${maior}`);
            console.log(`Total de números: ${elementos.length}`);
        } else {
            console.log(`> ${tentativa}`);
            const resultado = btree.search(parseInt(tentativa));
            console.log(resultado.found ? `✅ ${tentativa} está na árvore!` : `❌ ${tentativa} não está na árvore.`);
        }

        if (index < tentativas.length - 1) {
            console.log();
        }
    });
}

function analisePerformance() {
    console.log("\n\n3. Análise de Performance em Tempo Real");
    console.log("=".repeat(50));

    const testes = [
        { nome: "Pequeno", elementos: 100, ordem: 3 },
        { nome: "Médio", elementos: 1000, ordem: 4 },
        { nome: "Grande", elementos: 5000, ordem: 5 },
    ];

    testes.forEach((teste) => {
        console.log(`\nTeste ${teste.nome} (${teste.elementos} elementos, ordem ${teste.ordem}):`);

        const btree = new BTree(teste.ordem);

        const inicioInsercao = Date.now();
        for (let i = 0; i < teste.elementos; i++) {
            btree.insert(Math.floor(Math.random() * teste.elementos * 10));
        }
        const tempoInsercao = Date.now() - inicioInsercao;

        const elementos = btree.traverse();
        const buscas = elementos.slice(0, Math.min(100, elementos.length));

        const inicioBusca = Date.now();
        buscas.forEach((el) => btree.search(el));
        const tempoBusca = Date.now() - inicioBusca;

        const remover = elementos.slice(0, Math.min(50, elementos.length));

        const inicioRemocao = Date.now();
        remover.forEach((el) => btree.remove(el));
        const tempoRemocao = Date.now() - inicioRemocao;

        console.log(`  Inserção: ${tempoInsercao}ms (${(tempoInsercao / teste.elementos).toFixed(3)}ms por elemento)`);
        console.log(`  Busca: ${tempoBusca}ms (${(tempoBusca / buscas.length).toFixed(3)}ms por busca)`);
        console.log(`  Remoção: ${tempoRemocao}ms (${(tempoRemocao / remover.length).toFixed(3)}ms por remoção)`);
        console.log(`  Altura final: ${calcularAltura(btree.root)}`);
        console.log(`  Validação: ${btree.validate().valid ? "✅" : "❌"}`);
    });
}

function visualizacaoPassoAPasso() {
    console.log("\n\n4. Visualização Passo a Passo");
    console.log("=".repeat(50));

    const btree = new BTree(3);
    const dados = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];

    console.log("Inserindo elementos passo a passo:");
    console.log("(Legenda: 🔵=Folha, 🟢=Interno)");

    dados.forEach((dado, index) => {
        console.log(`\nPasso ${index + 1}: Inserindo ${dado}`);
        btree.insert(dado);

        console.log(`Estrutura: ${btree.traverse().join(" <- ")}`);
        console.log(`Altura: ${calcularAltura(btree.root)}`);

        mostrarEstruturaSimplificada(btree.root);
    });
}

function testeConsistencia() {
    console.log("\n\n5. Teste de Consistência de Dados");
    console.log("=".repeat(50));

    const btree = new BTree(3);
    const dadosInseridos = new Set();

    console.log("Testando consistência durante operações aleatórias:");

    for (let i = 0; i < 100; i++) {
        const num = Math.floor(Math.random() * 1000);
        btree.insert(num);
        dadosInseridos.add(num);

        if (i % 10 === 0) {
            const validacao = btree.validate();
            if (!validacao.valid) {
                console.log(`❌ Erro na inserção ${i}: ${validacao.error}`);
                return;
            }
        }
    }

    console.log("✅ Todas as inserções válidas!");

    const elementosBTree = new Set(btree.traverse());
    const faltantes = [...dadosInseridos].filter((x) => !elementosBTree.has(x));
    const extras = [...elementosBTree].filter((x) => !dadosInseridos.has(x));

    console.log(`Dados inseridos: ${dadosInseridos.size}`);
    console.log(`Dados na B-Tree: ${elementosBTree.size}`);
    console.log(`Faltantes: ${faltantes.length}`);
    console.log(`Extras: ${extras.length}`);

    if (faltantes.length === 0 && extras.length === 0) {
        console.log("✅ Consistência perfeita!");
    } else {
        console.log("❌ Problemas de consistência detectados!");
    }

    console.log("\nTestando remoções aleatórias:");
    const remover = [...dadosInseridos].slice(0, 50);

    remover.forEach((num, index) => {
        btree.remove(num);
        dadosInseridos.delete(num);

        if (index % 10 === 0) {
            const validacao = btree.validate();
            console.log(`Remoção ${index + 1}: ${validacao.valid ? "✅" : "❌"}`);
        }
    });

    console.log("✅ Teste de consistência concluído!");
}

function executarComando(btree, comando) {
    const partes = comando.split(" ");
    const acao = partes[0];
    const valor = parseInt(partes[1]);

    switch (acao) {
        case "insert":
            if (btree.insert(valor)) {
                console.log(`✅ Inserido: ${valor}`);
            } else {
                console.log(`❌ ${valor} já existe`);
            }
            break;

        case "remove":
            if (btree.remove(valor)) {
                console.log(`✅ Removido: ${valor}`);
            } else {
                console.log(`❌ ${valor} não encontrado`);
            }
            break;

        case "search":
            const resultado = btree.search(valor);
            console.log(resultado.found ? `✅ Encontrado: ${valor}` : `❌ Não encontrado: ${valor}`);
            break;

        case "print":
            btree.print();
            break;

        case "traverse":
            console.log(`Elementos: [${btree.traverse().join(", ")}]`);
            break;

        case "validate":
            const validacao = btree.validate();
            console.log(validacao.valid ? "✅ Estrutura válida" : `❌ Erro: ${validacao.error}`);
            break;

        case "height":
            console.log(`Altura: ${calcularAltura(btree.root)}`);
            break;

        case "clear":
            btree.root = new BTreeNode(btree.order, true);
            console.log("✅ B-Tree limpa");
            break;

        default:
            console.log("❌ Comando desconhecido");
    }
}

function calcularAltura(node) {
    if (node.isLeaf) return 1;
    return 1 + calcularAltura(node.children[0]);
}

function mostrarEstruturaSimplificada(node, nivel = 0) {
    const indent = "  ".repeat(nivel);
    const chaves = node.keys.join(",");
    const tipo = node.isLeaf ? "🔵" : "🟢";

    console.log(`${indent}${tipo}[${chaves}]`);

    if (!node.isLeaf) {
        node.children.forEach((filho) => {
            mostrarEstruturaSimplificada(filho, nivel + 1);
        });
    }
}

function executarTodos() {
    try {
        simuladorInterativo();
        jogoAdivinhacao();
        analisePerformance();
        visualizacaoPassoAPasso();
        testeConsistencia();

        console.log("\n\n=== Todos os exemplos interativos concluídos! ===");
    } catch (error) {
        console.error("Erro durante a execução:", error);
    }
}

executarTodos();
