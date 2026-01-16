// Bubble Sort é um algoritmo de ordenação bem simples que funciona “borbulhando” os maiores (ou menores) elementos para o final do array a cada passada.

// De forma resumida, ele funciona assim:

// Percorre o array comparando pares de elementos adjacentes

// Compara arr[0] com arr[1], depois arr[1] com arr[2], e assim por diante.

// Troca os elementos se estiverem na ordem errada

// Se você quer ordenar em ordem crescente e encontra um par onde arr[j] > arr[j+1], ele troca de lugar.

// Após uma passada completa, o maior elemento vai parar na última posição “útil”

// É como se o maior número “subisse” para o topo, igual bolha na água.

// Repete o processo várias vezes

// Na 1ª passada: maior elemento vai para o fim.

// Na 2ª passada: o segundo maior fica na posição correta.

// E assim sucessivamente, até o array ficar ordenado.

// Pode parar mais cedo se nenhuma troca for feita em uma passada

// Se em uma varredura completa nenhuma troca aconteceu, significa que o array já está ordenado.

// Complexidade

// Tempo:

// Pior caso: O(n²)

// Médio caso: O(n²)

// Melhor caso (array já ordenado com otimização de parada): O(n)

// Espaço: O(1) (só usa memória extra para algumas variáveis auxiliares).

const array = [42, 7, 19, 3, 56, 11, 29, 4, 33, 18, 25, 2, 50, 9, 61];

function bubbleSort(arr){
  let arrayLength = array.length;
  for (let i = 0; i <= arrayLength-1; i++) {
    for(let o = 0; o < arrayLength; o++){  
      if(array[o] > array[o+1]){
        [array[o], array[o+1]] = [array[o+1], array[o]]
      }
    }
  }
  return array.length
}

bubbleSort(array)
