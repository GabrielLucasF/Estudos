const { BTree } = require("../BTree.js");

console.log("=== Demonstração B-Tree ===\n");

const btree = new BTree(3);

console.log("1. Inserindo elementos:");
const elements = [10, 20, 5, 6, 12, 30, 7, 17];

elements.forEach((element) => {
    btree.insert(element);
    console.log(`Inserido: ${element}`);
});

console.log("\n2. Estrutura da B-Tree:");
btree.print();

console.log("\n3. Percorrendo em ordem:");
console.log(btree.traverse());

console.log("\n4. Buscando elementos:");
const searches = [6, 15, 30, 1];
searches.forEach((key) => {
    const result = btree.search(key);
    console.log(`Busca ${key}: ${result.found ? "Encontrado" : "Não encontrado"}`);
});

console.log("\n5. Removendo elementos:");
const removals = [6, 20, 5];
removals.forEach((element) => {
    btree.remove(element);
    console.log(`Removido: ${element}`);
    console.log("Estrutura atual:");
    btree.print();
    console.log("Elementos restantes:", btree.traverse());
    console.log("---");
});

console.log("\n6. Verificação final:");
console.log("Elementos finais:", btree.traverse());
console.log("Busca final 10:", btree.search(10));
console.log("Busca final 6:", btree.search(6));
