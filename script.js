const game = (() => {

    let score = 0;
    let scorePerClick = 1;
    let automatons = [
        { id: 'auto1', name: 'Automaton 1', ppsd: 0, pps: 1, cost: 50, owned: 0 },
        { id: 'auto2', name: 'Automaton 2', ppsd: 0, pps: 5, cost: 200, owned: 0 },
        { id: 'auto3', name: 'Automaton 3', ppsd: 0, pps: 10, cost: 500, owned: 0 },
        { id: 'auto4', name: 'Automaton 4', ppsd: 0, pps: 50, cost: 1000, owned: 0 },
        { id: 'auto5', name: 'Automaton 5', ppsd: 0, pps: 100, cost: 5000, owned: 0 }
    ];
    let totalPointsPerSecond = 0;

    const scoreDisplay = document.getElementById('score');
    const scorePerSecDisplay = document.getElementById('score-per-sec');
    const clickButton = document.getElementById('click-btn');
    const usernameButton = document.getElementById('username-button');
    const changeColor = document.getElementById('colors');

    changeColor.addEventListener('change', (event) => {
        const selectedColor = event.target.value;
        const colorableElements = document.getElementsByClassName('colorable');

        Array.from(colorableElements).forEach(element => {
            element.style.color = selectedColor;
        });
    });

    clickButton.addEventListener('click', () => {
        score += scorePerClick;
        updateScore();
        checkAutomatonVisibility();
    });
    
    usernameButton.addEventListener('click', () => {
        const userInput = prompt("Choose a Username!");
        document.getElementById(`shop-name`).textContent = `${userInput}'s Shop`;
    });
    
    function updateScore() {
        scoreDisplay.textContent = `Chocolate Milk: ${score}`;
        scorePerSecDisplay.textContent = `Chocolate Milk per Second: ${totalPointsPerSecond}`;
    }
    
    function buyAutomaton(automaton) {
        if (score >= automaton.cost) {
            score -= automaton.cost;
            automaton.owned++;
            totalPointsPerSecond += automaton.pps;
            automaton.ppsd += automaton.pps;
            updateBuyAutomaton(automaton);
            updateScore();
        } else {
            alert('Not enough Chocolate Milk!')
        }
    }

    function sellAutomaton(automaton) {
        if (automaton.owned > 0) {
            automaton.owned--;
            totalPointsPerSecond -= automaton.pps;
            automaton.ppsd -= automaton.pps;
            updateSellAutomaton(automaton);
            score += Math.floor(automaton.cost * 0.85);
            updateScore();
        } else {
            alert('You have no Generators to sell!')
        }
    }

    function updateBuyAutomaton(automaton) {
        automaton.cost = Math.floor(automaton.cost * 1.5);
        document.getElementById(`cost-${automaton.id}`).textContent = automaton.cost;
        document.getElementById(`owned-${automaton.id}`).textContent = automaton.owned;
        document.getElementById(`pps-${automaton.id}`).textContent = `+${automaton.ppsd}`;
    }

    function updateSellAutomaton(automaton) {
        automaton.cost = Math.floor(automaton.cost / 1.5);
        document.getElementById(`cost-${automaton.id}`).textContent = automaton.cost;
        document.getElementById(`owned-${automaton.id}`).textContent = automaton.owned;
        document.getElementById(`pps-${automaton.id}`).textContent = `+${automaton.ppsd}`;
    }

    function checkAutomatonVisibility() {
        automatons.forEach(automaton => {
            if (automaton.id != 'auto1') {
                const threshold = Math.floor(automaton.cost * 0.75);
                const row = document.getElementById(`${automaton.id}-row`);

                if (score >= threshold) {
                    row.classList.remove('hidden');
                }
            }
        });
    }

    automatons.forEach(automaton => {
        const buyButton = document.getElementById(`buy-${automaton.id}`);
        buyButton.addEventListener('click', () => buyAutomaton(automaton));
        const sellButton = document.getElementById(`sell-${automaton.id}`);
        sellButton.addEventListener('click', () => sellAutomaton(automaton));
    })


    setInterval(() => {
        score += totalPointsPerSecond;
        updateScore();
        checkAutomatonVisibility();
    }, 1000);

    return {
        getScore: () => score,
        getTotalPointsPerSecond: () => totalPointsPerSecond,
        getAutomatons: () => automatons,
    };

})();



