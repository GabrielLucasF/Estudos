class BubbleSortVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 5;
        this.speed = 5;
        this.isRunning = false;
        this.isPaused = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.passes = 0;
        this.steps = [];
        this.currentStep = 0;
        this.currentAlgorithm = "bubble";

        this.initializeElements();
        this.attachEventListeners();
        this.updateExplanation();
        this.generateArray();
    }

    initializeElements() {
        this.arrayContainer = document.getElementById("stepsContainer");
        this.algorithmSelect = document.getElementById("algorithm");
        this.algorithmTitle = document.getElementById("algorithmTitle");
        this.explanationTitle = document.getElementById("explanationTitle");
        this.explanationText = document.getElementById("explanationText");
        this.arraySizeInput = document.getElementById("arraySize");
        this.speedInput = document.getElementById("speed");
        this.speedValue = document.getElementById("speedValue");
        this.generateBtn = document.getElementById("generateBtn");
        this.startBtn = document.getElementById("startBtn");
        this.pauseBtn = document.getElementById("pauseBtn");
        this.resetBtn = document.getElementById("resetBtn");
        this.comparisonsEl = document.getElementById("comparisons");
        this.swapsEl = document.getElementById("swaps");
        this.passesEl = document.getElementById("passes");
        this.statusEl = document.getElementById("status");
        this.previousBtn = document.getElementById("previousBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.stepInfo = document.getElementById("stepInfo");
    }

    attachEventListeners() {
        this.generateBtn.addEventListener("click", () => this.generateArray());
        this.startBtn.addEventListener("click", () => this.startSorting());
        this.pauseBtn.addEventListener("click", () => this.togglePause());
        this.resetBtn.addEventListener("click", () => this.reset());
        this.previousBtn.addEventListener("click", () => this.previousStep());
        this.nextBtn.addEventListener("click", () => this.nextStep());

        this.algorithmSelect.addEventListener("change", (e) => {
            this.currentAlgorithm = e.target.value;
            this.updateAlgorithmTitle();
            this.updateExplanation();
            this.reset();
        });

        this.arraySizeInput.addEventListener("change", (e) => {
            this.arraySize = parseInt(e.target.value);
            if (!this.isRunning) {
                this.generateArray();
            }
        });

        this.speedInput.addEventListener("input", (e) => {
            this.speed = parseInt(e.target.value);
            this.speedValue.textContent = this.speed;
        });
    }

    updateAlgorithmTitle() {
        const titles = {
            bubble: "Bubble Sort",
            quick: "Quick Sort",
            merge: "Merge Sort",
        };
        this.algorithmTitle.textContent = titles[this.currentAlgorithm];
    }

    updateExplanation() {
        const explanations = {
            bubble: {
                title: "Como o Bubble Sort Funciona",
                text: 'O Bubble Sort percorre o array várias vezes, comparando elementos adjacentes e trocando-os se estiverem na ordem errada. A cada passada, o maior elemento "borbulha" para o final do array.',
            },
            quick: {
                title: "Como o Quick Sort Funciona",
                text: "O Quick Sort escolhe um elemento como pivô e particiona o array em duas partes: elementos menores que o pivô à esquerda e maiores à direita. Recursivamente ordena as subpartes.",
            },
            merge: {
                title: "Como o Merge Sort Funciona",
                text: 'O Merge Sort divide o array recursivamente até subarrays de 1 elemento, depois faz o merge ordenado desses subarrays. Usa a estratégia "dividir para conquistar" com performance garantida O(n log n).',
            },
        };

        const explanation = explanations[this.currentAlgorithm];
        this.explanationTitle.textContent = explanation.title;
        this.explanationText.textContent = explanation.text;
    }

    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 100) + 1);
        }
        this.steps = [];
        this.currentStep = 0;
        this.renderArray();
        this.resetStats();
        this.updateStatus("Array gerado - Pronto para iniciar");
        this.updateStepInfo();
        this.updateNavigationButtons();
    }

    renderArray() {
        this.arrayContainer.innerHTML = "";
        const stepDiv = this.createStepElement("Array Inicial", this.array, "default", -1, -1);
        this.arrayContainer.appendChild(stepDiv);
    }

    async startSorting() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.setButtonsState(true);
        this.resetStats();
        this.updateStatus(`Executando ${this.getAlgorithmName()}...`);

        this.steps = [];
        this.currentStep = 0;
        this.arrayContainer.innerHTML = "";

        if (this.currentAlgorithm === "bubble") {
            await this.bubbleSort();
        } else if (this.currentAlgorithm === "quick") {
            await this.quickSort();
        } else if (this.currentAlgorithm === "merge") {
            await this.mergeSort();
        }

        if (!this.isPaused && this.steps.length > 0) {
            await this.animateSteps();
            this.updateStatus(`${this.getAlgorithmName()} concluído! Use os botões para revisar os passos.`);
        }

        this.isRunning = false;
        this.setButtonsState(false);
        this.updateNavigationButtons();
        this.updateStepInfo();
    }

    async bubbleSort() {
        const n = this.array.length;

        this.addStep("inicial", [...this.array], -1, -1, "Array inicial");

        for (let i = 0; i < n - 1; i++) {
            if (!this.isRunning) break;

            let swapped = false;
            this.passes++;
            this.updateStats();

            for (let j = 0; j < n - i - 1; j++) {
                if (!this.isRunning) break;

                this.comparisons++;
                this.updateStats();

                this.addStep(
                    "comparando",
                    [...this.array],
                    j,
                    j + 1,
                    `Passada ${i + 1}: Comparando ${this.array[j]} e ${this.array[j + 1]}`,
                );

                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.swaps++;
                    this.updateStats();
                    swapped = true;

                    this.addStep(
                        "trocando",
                        [...this.array],
                        j,
                        j + 1,
                        `Passada ${i + 1}: Trocou ${this.array[j + 1]} e ${this.array[j]}`,
                    );
                }
            }

            this.addStep("passada-concluida", [...this.array], -1, -1, `Passada ${i + 1} concluída`);

            if (!swapped) {
                break;
            }
        }

        this.addStep("final", [...this.array], -1, -1, "Array ordenado!");
    }

    async quickSort() {
        const n = this.array.length;
        this.addStep("inicial", [...this.array], -1, -1, "Array inicial - Quick Sort");

        await this.quickSortHelper(0, n - 1);

        this.addStep("final", [...this.array], -1, -1, "Array ordenado!");
    }

    async quickSortHelper(low, high) {
        if (low < high && this.isRunning) {
            const pivotIndex = await this.partition(low, high);

            if (!this.isRunning) return;

            await this.quickSortHelper(low, pivotIndex - 1);
            await this.quickSortHelper(pivotIndex + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;

        this.addStep("pivot", [...this.array], high, -1, `Pivô escolhido: ${pivot} (posição ${high})`);

        for (let j = low; j < high; j++) {
            if (!this.isRunning) break;

            this.comparisons++;
            this.updateStats();

            this.addStep("comparando", [...this.array], j, high, `Comparando ${this.array[j]} com pivô ${pivot}`);

            if (this.array[j] <= pivot) {
                i++;

                if (i !== j) {
                    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                    this.swaps++;
                    this.updateStats();

                    this.addStep("trocando", [...this.array], i, j, `Trocando ${this.array[i]} e ${this.array[j]}`);
                }
            }
        }

        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        this.swaps++;
        this.updateStats();

        this.addStep("pivot-final", [...this.array], i + 1, high, `Posicionando pivô ${pivot} na posição correta`);

        return i + 1;
    }

    getAlgorithmName() {
        const names = {
            bubble: "Bubble Sort",
            quick: "Quick Sort",
            merge: "Merge Sort",
        };
        return names[this.currentAlgorithm];
    }

    async mergeSort() {
        const n = this.array.length;
        this.addStep("inicial", [...this.array], -1, -1, "Array inicial - Merge Sort");

        await this.mergeSortHelper(0, n - 1);

        this.addStep("final", [...this.array], -1, -1, "Array ordenado!");
    }

    async mergeSortHelper(left, right) {
        if (left < right && this.isRunning) {
            const mid = Math.floor((left + right) / 2);

            this.addStep(
                "dividing",
                [...this.array],
                left,
                right,
                `Dividindo array[${left}..${right}] em [${left}..${mid}] e [${mid + 1}..${right}]`,
            );

            await this.mergeSortHelper(left, mid);
            await this.mergeSortHelper(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);

        this.addStep(
            "merge-start",
            [...this.array],
            left,
            right,
            `Mergeando [${left}..${mid}] e [${mid + 1}..${right}]`,
        );

        let i = 0,
            j = 0,
            k = left;

        while (i < leftArray.length && j < rightArray.length && this.isRunning) {
            this.comparisons++;
            this.updateStats();

            this.addStep("merge-comparing", [...this.array], k, -1, `Comparando ${leftArray[i]} e ${rightArray[j]}`);

            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                j++;
            }

            this.addStep("merge-placing", [...this.array], k, -1, `Posicionando ${this.array[k]} na posição ${k}`);
            k++;
        }

        while (i < leftArray.length && this.isRunning) {
            this.array[k] = leftArray[i];
            this.addStep("merge-placing", [...this.array], k, -1, `Posicionando ${this.array[k]} na posição ${k}`);
            i++;
            k++;
        }

        while (j < rightArray.length && this.isRunning) {
            this.array[k] = rightArray[j];
            this.addStep("merge-placing", [...this.array], k, -1, `Posicionando ${this.array[k]} na posição ${k}`);
            j++;
            k++;
        }

        this.addStep("merge-complete", [...this.array], left, right, `Merge completo [${left}..${right}]`);
    }

    async compareElements(index1, index2) {
        const bars = this.arrayContainer.children;
        bars[index1].className = "array-bar comparing";
        bars[index2].className = "array-bar comparing";

        this.comparisons++;
        this.updateStats();

        await this.delay();
    }

    async swapElements(index1, index2) {
        const bars = this.arrayContainer.children;
        bars[index1].className = "array-bar swapping";
        bars[index2].className = "array-bar swapping";

        await this.delay();

        [this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];

        const maxValue = Math.max(...this.array);
        bars[index1].style.height = `${(this.array[index1] / maxValue) * 100}%`;
        bars[index1].querySelector("span").textContent = this.array[index1];

        bars[index2].style.height = `${(this.array[index2] / maxValue) * 100}%`;
        bars[index2].querySelector("span").textContent = this.array[index2];

        this.swaps++;
        this.updateStats();

        await this.delay();
    }

    async resetElementColors(index1, index2) {
        const bars = this.arrayContainer.children;
        if (!bars[index1].classList.contains("sorted")) {
            bars[index1].className = "array-bar default";
        }
        if (!bars[index2].classList.contains("sorted")) {
            bars[index2].className = "array-bar default";
        }
    }

    markAsSorted(index) {
        const bars = this.arrayContainer.children;
        bars[index].className = "array-bar sorted";
    }

    markAllSorted() {
        const bars = this.arrayContainer.children;
        for (let i = 0; i < bars.length; i++) {
            bars[i].className = "array-bar sorted";
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? "Continuar" : "Pausar";
        this.updateStatus(this.isPaused ? "Pausado" : "Executando Bubble Sort...");
    }

    async waitForResume() {
        while (this.isPaused && this.isRunning) {
            await this.delay(100);
        }
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.steps = [];
        this.currentStep = 0;
        this.generateArray();
        this.setButtonsState(false);
        this.pauseBtn.textContent = "Pausar";
        this.updateNavigationButtons();
        this.updateStepInfo();
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.passes = 0;
        this.updateStats();
    }

    updateStats() {
        this.comparisonsEl.textContent = this.comparisons;
        this.swapsEl.textContent = this.swaps;
        this.passesEl.textContent = this.passes;
    }

    updateStatus(message) {
        this.statusEl.textContent = message;
    }

    setButtonsState(running) {
        this.startBtn.disabled = running;
        this.generateBtn.disabled = running;
        this.arraySizeInput.disabled = running;
        this.pauseBtn.disabled = !running;

        if (!running && this.steps.length > 0) {
            this.previousBtn.disabled = false;
            this.nextBtn.disabled = false;
        } else if (running) {
            this.previousBtn.disabled = true;
            this.nextBtn.disabled = true;
        }
    }

    addStep(type, array, index1, index2, description) {
        this.steps.push({
            type,
            array: [...array],
            index1,
            index2,
            description,
        });
    }

    createStepElement(title, array, type, index1, index2) {
        const stepDiv = document.createElement("div");
        stepDiv.className = "step-item";

        const header = document.createElement("div");
        header.className = "step-header";
        header.textContent = title;
        stepDiv.appendChild(header);

        const arrayDiv = document.createElement("div");
        arrayDiv.className = "step-array";

        array.forEach((value, index) => {
            const box = document.createElement("div");
            box.className = "array-box";

            if (type === "comparando" && (index === index1 || index === index2)) {
                box.classList.add("comparing");
            } else if (type === "trocando" && (index === index1 || index === index2)) {
                box.classList.add("swapping");
            } else if (type === "pivot" && index === index1) {
                box.classList.add("pivot");
            } else if (type === "pivot-final" && (index === index1 || index === index2)) {
                box.classList.add("pivot-final");
            } else if (type === "dividing" && index >= index1 && index <= index2) {
                box.classList.add("dividing");
            } else if (type === "merge-start" && index >= index1 && index <= index2) {
                box.classList.add("merging");
            } else if (type === "merge-comparing" && index === index1) {
                box.classList.add("merging");
            } else if (type === "merge-placing" && index === index1) {
                box.classList.add("merging");
            } else if (type === "merge-complete" && index >= index1 && index <= index2) {
                box.classList.add("sorted");
            } else if (type === "final" || type === "sorted") {
                box.classList.add("sorted");
            }

            box.textContent = value;
            arrayDiv.appendChild(box);
        });

        stepDiv.appendChild(arrayDiv);

        const description = document.createElement("div");
        description.className = "step-description";
        description.textContent = this.getStepDescription(type, index1, index2, array);
        stepDiv.appendChild(description);

        return stepDiv;
    }

    getStepDescription(type, index1, index2, array) {
        if (type === "inicial") return "Array inicial";
        if (type === "pivot") return `Pivô escolhido: ${array[index1]} (posição ${index1})`;
        if (type === "comparando") return `Comparando ${array[index1]} e ${array[index2]}`;
        if (type === "trocando") return `Trocando ${array[index1]} e ${array[index2]}`;
        if (type === "pivot-final") return `Posicionando pivô ${array[index1]} na posição correta`;
        if (type === "dividing") return `Dividindo array[${index1}..${index2}]`;
        if (type === "merge-start") return `Iniciando merge`;
        if (type === "merge-comparing") return `Comparando elementos para merge`;
        if (type === "merge-placing") return `Posicionando elemento`;
        if (type === "merge-complete") return `Merge completo`;
        if (type === "passada-concluida") return "Passada concluída";
        if (type === "final") return "Array ordenado!";
        return "";
    }

    async animateSteps() {
        this.arrayContainer.innerHTML = "";

        for (let i = 0; i < this.steps.length; i++) {
            if (!this.isRunning) break;

            if (this.isPaused) {
                await this.waitForResume();
            }

            this.currentStep = i;
            const stepElement = this.createStepElement(
                `Passo ${i + 1}`,
                this.steps[i].array,
                this.steps[i].type,
                this.steps[i].index1,
                this.steps[i].index2,
            );

            this.arrayContainer.appendChild(stepElement);

            stepElement.style.opacity = "0";
            stepElement.style.transform = "translateY(-20px)";

            this.arrayContainer.scrollTop = this.arrayContainer.scrollHeight;

            await this.delay(300);

            stepElement.style.transition = "all 0.5s ease";
            stepElement.style.opacity = "1";
            stepElement.style.transform = "translateY(0)";

            this.updateStepInfo();

            await this.delay();
        }
    }

    renderAllSteps() {
        this.arrayContainer.innerHTML = "";

        this.steps.forEach((step, index) => {
            const stepElement = this.createStepElement(
                `Passo ${index + 1}`,
                step.array,
                step.type,
                step.index1,
                step.index2,
            );
            this.arrayContainer.appendChild(stepElement);
        });
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.scrollToStep(this.currentStep);
            this.updateStepInfo();
            this.updateNavigationButtons();
        }
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.scrollToStep(this.currentStep);
            this.updateStepInfo();
            this.updateNavigationButtons();
        }
    }

    scrollToStep(stepIndex) {
        const steps = this.arrayContainer.querySelectorAll(".step-item");
        if (steps[stepIndex]) {
            steps[stepIndex].scrollIntoView({ behavior: "smooth", block: "center" });

            steps.forEach((step) => (step.style.opacity = "0.6"));
            steps[stepIndex].style.opacity = "1";
            steps[stepIndex].style.borderLeftColor = "#ff5722";

            setTimeout(() => {
                steps[stepIndex].style.borderLeftColor = "#667eea";
            }, 1000);
        }
    }

    updateStepInfo() {
        if (this.steps.length === 0) {
            this.stepInfo.textContent = "Nenhum passo executado";
        } else {
            this.stepInfo.textContent = `Passo ${this.currentStep + 1} de ${this.steps.length}`;
        }
    }

    updateNavigationButtons() {
        this.previousBtn.disabled = this.currentStep === 0 || this.steps.length === 0;
        this.nextBtn.disabled = this.currentStep === this.steps.length - 1 || this.steps.length === 0;
    }

    delay(ms = null) {
        if (ms !== null) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        const baseDelay = 1000;
        const speedMultiplier = this.speed;
        const delayTime = Math.max(100, baseDelay - speedMultiplier * 80);

        return new Promise((resolve) => setTimeout(resolve, delayTime));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new BubbleSortVisualizer();
});
