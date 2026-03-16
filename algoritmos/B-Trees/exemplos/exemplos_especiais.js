const { BTree } = require("../BTree.js");

console.log("=== Exemplos Especiais de B-Tree ===\n");

function bancoDeDadosSimples() {
    console.log("1. B-Tree como Banco de Dados Simples");
    console.log("=".repeat(50));

    class BancoDadosBTree {
        constructor() {
            this.btree = new BTree(4);
            this.dados = new Map();
        }

        inserir(id, nome, idade) {
            if (this.btree.insert(id)) {
                this.dados.set(id, { nome, idade, criado: new Date() });
                return true;
            }
            return false;
        }

        buscar(id) {
            const resultado = this.btree.search(id);
            if (resultado.found) {
                return { id, ...this.dados.get(id) };
            }
            return null;
        }

        atualizar(id, novosDados) {
            if (this.btree.search(id).found) {
                const atuais = this.dados.get(id);
                this.dados.set(id, { ...atuais, ...novosDados, atualizado: new Date() });
                return true;
            }
            return false;
        }

        remover(id) {
            if (this.btree.remove(id)) {
                this.dados.delete(id);
                return true;
            }
            return false;
        }

        listarTodos() {
            const ids = this.btree.traverse();
            return ids.map((id) => ({ id, ...this.dados.get(id) }));
        }

        buscarPorFaixaIdade(min, max) {
            const todos = this.listarTodos();
            return todos.filter((pessoa) => pessoa.idade >= min && pessoa.idade <= max);
        }
    }

    const bd = new BancoDadosBTree();

    const usuarios = [
        { id: 1001, nome: "João", idade: 25 },
        { id: 1005, nome: "Maria", idade: 30 },
        { id: 1003, nome: "Pedro", idade: 22 },
        { id: 1002, nome: "Ana", idade: 28 },
        { id: 1004, nome: "Carlos", idade: 35 },
    ];

    console.log("Inserindo usuários:");
    usuarios.forEach((usuario) => {
        const sucesso = bd.inserir(usuario.id, usuario.nome, usuario.idade);
        console.log(`  ${sucesso ? "✅" : "❌"} ${usuario.nome} (ID: ${usuario.id})`);
    });

    console.log("\nBuscando usuário 1003:");
    const usuario = bd.buscar(1003);
    console.log(usuario ? `Encontrado: ${usuario.nome}, ${usuario.idade} anos` : "Não encontrado");

    console.log("\nAtualizando usuário 1003:");
    bd.atualizar(1003, { idade: 23 });
    const atualizado = bd.buscar(1003);
    console.log(`Atualizado: ${atualizado.nome}, ${atualizado.idade} anos`);

    console.log("\nUsuários com idade entre 25 e 35:");
    const faixa = bd.buscarPorFaixaIdade(25, 35);
    faixa.forEach((p) => console.log(`  ${p.nome}: ${p.idade} anos`));

    console.log("\nRemovendo usuário 1002:");
    bd.remover(1002);
    console.log("Usuários restantes:");
    bd.listarTodos().forEach((p) => console.log(`  ${p.nome} (ID: ${p.id})`));
}

function sistemaArquivos() {
    console.log("\n\n2. Sistema de Arquivos Simulado");
    console.log("=".repeat(50));

    class ArquivoBTree {
        constructor() {
            this.btree = new BTree(3);
            this.arquivos = new Map();
        }

        _hash(nome) {
            let hash = 0;
            for (let i = 0; i < nome.length; i++) {
                const char = nome.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash = hash & hash;
            }
            return Math.abs(hash);
        }

        criarArquivo(nome, conteudo) {
            const id = this._hash(nome);
            if (this.btree.insert(id)) {
                this.arquivos.set(id, { nome, conteudo, tamanho: conteudo.length, criado: new Date() });
                return true;
            }
            return false;
        }

        lerArquivo(nome) {
            const id = this._hash(nome);
            const resultado = this.btree.search(id);
            if (resultado.found) {
                return this.arquivos.get(id);
            }
            return null;
        }

        deletarArquivo(nome) {
            const id = this._hash(nome);
            if (this.btree.remove(id)) {
                this.arquivos.delete(id);
                return true;
            }
            return false;
        }

        listarArquivos() {
            const ids = this.btree.traverse();
            return ids.map((id) => this.arquivos.get(id));
        }

        buscarPorTamanho(min, max) {
            return this.listarArquivos().filter((arq) => arq.tamanho >= min && arq.tamanho <= max);
        }
    }

    const fs = new ArquivoBTree();

    const arquivos = [
        { nome: "documento.txt", conteudo: "Este é um documento de teste." },
        { nome: "config.json", conteudo: '{"theme": "dark", "lang": "pt-BR"}' },
        { nome: "README.md", conteudo: "# Projeto B-Tree\nImplementação em JavaScript." },
        { nome: "script.js", conteudo: "console.log('Hello World!');" },
        { nome: "data.csv", conteudo: "nome,idade\nJoão,25\nMaria,30" },
    ];

    console.log("Criando arquivos:");
    arquivos.forEach((arquivo) => {
        const sucesso = fs.criarArquivo(arquivo.nome, arquivo.conteudo);
        console.log(`  ${sucesso ? "✅" : "❌"} ${arquivo.nome} (${arquivo.conteudo.length} bytes)`);
    });

    console.log("\nLendo arquivo README.md:");
    const readme = fs.lerArquivo("README.md");
    if (readme) {
        console.log(`Conteúdo: ${readme.conteudo}`);
        console.log(`Tamanho: ${readme.tamanho} bytes`);
    }

    console.log("\nArquivos com tamanho entre 20 e 50 bytes:");
    const porTamanho = fs.buscarPorTamanho(20, 50);
    porTamanho.forEach((arq) => console.log(`  ${arq.nome}: ${arq.tamanho} bytes`));

    console.log("\nDeletando arquivo config.json:");
    fs.deletarArquivo("config.json");

    console.log("Arquivos restantes:");
    fs.listarArquivos().forEach((arq) => console.log(`  ${arq.nome}: ${arq.tamanho} bytes`));
}

function cacheLRU() {
    console.log("\n\n3. Cache LRU com B-Tree");
    console.log("=".repeat(50));

    class CacheLRU {
        constructor(capacidade) {
            this.capacidade = capacidade;
            this.btree = new BTree(3);
            this.fila = [];
            this.dados = new Map();
        }

        _atualizarLRU(chave) {
            const index = this.fila.indexOf(chave);
            if (index > -1) {
                this.fila.splice(index, 1);
            }
            this.fila.push(chave);
        }

        _evictLRU() {
            if (this.fila.length > this.capacidade) {
                const lru = this.fila.shift();
                this.btree.remove(lru);
                this.dados.delete(lru);
                return lru;
            }
            return null;
        }

        put(chave, valor) {
            if (this.btree.search(chave).found) {
                this.dados.set(chave, valor);
                this._atualizarLRU(chave);
                return true;
            }

            if (this.btree.insert(chave)) {
                this.dados.set(chave, valor);
                this._atualizarLRU(chave);

                this._evictLRU();
                return true;
            }

            return false;
        }

        get(chave) {
            const resultado = this.btree.search(chave);
            if (resultado.found) {
                this._atualizarLRU(chave);
                return this.dados.get(chave);
            }
            return null;
        }

        size() {
            return this.fila.length;
        }

        keys() {
            return [...this.fila];
        }
    }

    const cache = new CacheLRU(3);

    console.log("Cache com capacidade 3:");

    // Adicionar elementos
    const operacoes = [
        { tipo: "put", chave: "A", valor: "Valor A" },
        { tipo: "put", chave: "B", valor: "Valor B" },
        { tipo: "put", chave: "C", valor: "Valor C" },
        { tipo: "get", chave: "A" },
        { tipo: "put", chave: "D", valor: "Valor D" },
        { tipo: "get", chave: "B" },
        { tipo: "get", chave: "D" },
    ];

    operacoes.forEach((op, index) => {
        console.log(`\nOperação ${index + 1}: ${op.tipo} ${op.chave}`);

        if (op.tipo === "put") {
            cache.put(op.chave, op.valor);
            console.log(`  ✅ Inserido: ${op.chave} = ${op.valor}`);
        } else if (op.tipo === "get") {
            const resultado = cache.get(op.chave);
            console.log(resultado ? `  ✅ Encontrado: ${resultado}` : `  ❌ Não encontrado: ${op.chave}`);
        }

        console.log(`  Cache (${cache.size()}/${cache.capacidade}): [${cache.keys().join(" <- ")}]`);
    });
}

function indiceInvertido() {
    console.log("\n\n4. Índice de Texto Invertido");
    console.log("=".repeat(50));

    class IndiceInvertido {
        constructor() {
            this.indice = new Map();
        }

        adicionarDocumento(docId, texto) {
            const palavras = texto.toLowerCase().split(/\s+/);

            palavras.forEach((palavra) => {
                if (palavra.length > 2) {
                    if (!this.indice.has(palavra)) {
                        this.indice.set(palavra, new BTree(3));
                    }
                    this.indice.get(palavra).insert(docId);
                }
            });
        }

        buscar(palavra) {
            const btree = this.indice.get(palavra.toLowerCase());
            if (btree) {
                return btree.traverse();
            }
            return [];
        }

        buscarMultiplas(palavras) {
            const resultados = palavras.map((p) => this.buscar(p));

            if (resultados.length === 0) return [];

            let intersecao = resultados[0];
            for (let i = 1; i < resultados.length; i++) {
                intersecao = intersecao.filter((doc) => resultados[i].includes(doc));
            }

            return intersecao;
        }

        estatisticas() {
            const stats = {};
            for (const [palavra, btree] of this.indice) {
                stats[palavra] = btree.traverse().length;
            }
            return stats;
        }
    }

    const indice = new IndiceInvertido();

    const documentos = [
        { id: 1, texto: "B-Tree é uma estrutura de dados balanceada" },
        { id: 2, texto: "Árvores B são usadas em bancos de dados" },
        { id: 3, texto: "Estrutura de dados permite busca eficiente" },
        { id: 4, texto: "Bancos de dados usam índices para performance" },
        { id: 5, texto: "Balanceamento é importante para árvores" },
    ];

    console.log("Indexando documentos:");
    documentos.forEach((doc) => {
        indice.adicionarDocumento(doc.id, doc.texto);
        console.log(`  ✅ Documento ${doc.id}: "${doc.texto}"`);
    });

    console.log("\nBusca por 'b-tree':");
    const resultado1 = indice.buscar("b-tree");
    console.log(`  Documentos: [${resultado1.join(", ")}]`);

    console.log("\nBusca por 'dados':");
    const resultado2 = indice.buscar("dados");
    console.log(`  Documentos: [${resultado2.join(", ")}]`);

    console.log("\nBusca por 'estrutura dados':");
    const resultado3 = indice.buscarMultiplas(["estrutura", "dados"]);
    console.log(`  Documentos: [${resultado3.join(", ")}]`);

    console.log("\nEstatísticas do índice:");
    const stats = indice.estatisticas();
    Object.entries(stats).forEach(([palavra, count]) => {
        console.log(`  ${palavra}: ${count} documento(s)`);
    });
}

function agendaTelefonica() {
    console.log("\n\n5. Agenda Telefônica");
    console.log("=".repeat(50));

    class Agenda {
        constructor() {
            this.btree = new BTree(4);
            this.contatos = new Map();
        }

        _gerarChave(nome, telefone) {
            return `${nome.toLowerCase()}_${telefone}`;
        }

        adicionarContato(nome, telefone, email) {
            const chave = this._gerarChave(nome, telefone);
            if (this.btree.insert(chave)) {
                this.contatos.set(chave, { nome, telefone, email });
                return true;
            }
            return false;
        }

        buscarPorNome(nome) {
            const resultados = [];
            for (const [chave, contato] of this.contatos) {
                if (contato.nome.toLowerCase() === nome.toLowerCase()) {
                    resultados.push(contato);
                }
            }
            return resultados;
        }

        buscarPorTelefone(telefone) {
            const resultados = [];
            for (const [chave, contato] of this.contatos) {
                if (contato.telefone === telefone) {
                    resultados.push(contato);
                }
            }
            return resultados;
        }

        listarTodos() {
            const chaves = this.btree.traverse();
            return chaves.map((chave) => this.contatos.get(chave));
        }

        removerContato(nome, telefone) {
            const chave = this._gerarChave(nome, telefone);
            if (this.btree.remove(chave)) {
                this.contatos.delete(chave);
                return true;
            }
            return false;
        }
    }

    const agenda = new Agenda();

    const contatos = [
        { nome: "João Silva", telefone: "1111-1111", email: "joao@email.com" },
        { nome: "Maria Santos", telefone: "2222-2222", email: "maria@email.com" },
        { nome: "Pedro Costa", telefone: "3333-3333", email: "pedro@email.com" },
        { nome: "Ana Oliveira", telefone: "4444-4444", email: "ana@email.com" },
        { nome: "Carlos Ferreira", telefone: "5555-5555", email: "carlos@email.com" },
    ];

    console.log("Adicionando contatos:");
    contatos.forEach((contato) => {
        const sucesso = agenda.adicionarContato(contato.nome, contato.telefone, contato.email);
        console.log(`  ${sucesso ? "✅" : "❌"} ${contato.nome} - ${contato.telefone}`);
    });

    console.log("\nBuscando por nome 'Maria':");
    const porNome = agenda.buscarPorNome("Maria");
    porNome.forEach((c) => console.log(`  ${c.nome}: ${c.telefone} - ${c.email}`));

    console.log("\nBuscando por telefone '3333-3333':");
    const porTelefone = agenda.buscarPorTelefone("3333-3333");
    porTelefone.forEach((c) => console.log(`  ${c.nome}: ${c.telefone} - ${c.email}`));

    console.log("\nTodos os contatos:");
    agenda.listarTodos().forEach((c) => console.log(`  ${c.nome}: ${c.telefone}`));

    console.log("\nRemovendo contato 'Pedro Costa':");
    agenda.removerContato("Pedro Costa", "3333-3333");

    console.log("Contatos restantes:");
    agenda.listarTodos().forEach((c) => console.log(`  ${c.nome}: ${c.telefone}`));
}

function executarTodos() {
    try {
        bancoDeDadosSimples();
        sistemaArquivos();
        cacheLRU();
        indiceInvertido();
        agendaTelefonica();

        console.log("\n\n=== Todos os exemplos especiais concluídos! ===");
    } catch (error) {
        console.error("Erro durante a execução:", error);
    }
}

executarTodos();
