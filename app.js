//function to define the attack value
function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let currentRound = 0;
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return {
        width: this.monsterHealth + "%",
      };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return {
        width: this.playerHealth + "%",
      };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //A draw
        this.winner = "Draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //A draw
        this.winner = "Draw";
      } else if (value <= 0) {
        //monster lost

        this.winner = "Player";
      }
    },
  },
  methods: {
    startGame() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.currentRound = 0),
        (this.winner = null);
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer(); //this method executes right after the attackMonster executes
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 20);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(15, 30);
      if (this.playerHealth + healValue > 100) {
        return (this.playerHealth = 100);
        // } else if(this.playerHealth = 100) {

        // this.attackPlayer();
      } else {
        return (this.playerHealth += healValue);
      }
      this.attackPlayer();
      },
      surrender() {
        this.winner='monster'
    }
  },
});
app.mount("#game");
