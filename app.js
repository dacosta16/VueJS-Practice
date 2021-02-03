function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessages("player", "attack", attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages("monster", "attack", attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessages("player", "attack", attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessages("player", "heal", healValue);
            this.attackPlayer();
        },
        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = "monster";
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionWhat: what,
                actionValue: value
            });
        }
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerHealthBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        specialAttackCooldown() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "lost";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "won";
            }
        }
    }
});
app.mount('#game');