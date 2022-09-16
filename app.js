
//function to define the attack value
function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + "%" };
        },
        playerBarStyles() {
          return {width: this.playerHealth + "%" };
      }  
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer(); //this method executes right after the attackMonster executes
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 20);
            this.playerHealth -= attackValue;
        }
    },
});
app.mount("#game");