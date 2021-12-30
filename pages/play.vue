<template>
  <div class="p-4">
    <div v-show="!onboarded">
      <h1 class="font-bold text-4xl">Ayy there mateys,</h1>
      <span class="font-medium text-3xl">Welcome aboard</span>
      <p>To get started, you'll have to tell me who ya are</p>

      <div class="flex flex-row">
        <div
          class="w-36 cursor-pointer mx-1 bg-red-400 p-8 rounded-sm"
          @click="onboard(1)"
        >
          Team 1
        </div>
        <div
          class="w-36 cursor-pointer mx-1 bg-red-400 p-8 rounded-sm"
          @click="onboard(2)"
        >
          Team 2
        </div>
      </div>
    </div>

    <div v-show="onboarded">
      <h1 class="font-bold text-4xl">Hi, Team {{ team }}</h1>
      <div v-show="!trivia">
        {{ clues[clue - 1].text }}
        <qrcode-stream @decode="onDecode" :track="paintOutline" :torch="true"></qrcode-stream>

      </div>
      
      <div v-show="trivia">Trivia time
        {{ triviaQs[clue - 1].text }}
        <input v-model="answer">
      </div>
    </div>
  </div>
</template>
<script>
let clues = [
  {
    text: 'The first clue, whatcha gonna do? Find the party room that’s the most a-new.',
  },
  {
    text: "Hope you don't have noses, because this room sure doesn't smell like roses. Don't waffle or wheat over the direction, cause we gave you everything to be done."
  },
  {
    text: "The number of days in a week in a floor, go there (the height isn't a bore)"
  },
  {
    text: "To find this clue you'll have to see -- an out-of-order sign for ye."
  },
  {
    text: "Take the stairs right to the middle -- of the phase without one. But don't worry if you're behind, because we're only halfway done!"
  },
  {
    text: "Back from your groceries already? Grab something that keeps them steady."
  },
  {
    text: "Christmas tree? No, this is Florida. For here, this kind of tree is, well, duh. Find the one you're looking for, and split up because there are many more."
  },
  {
    text: "Go to a boat that's not afloat. You won't need a life-coat."
  },
  {
    text: "The only phase with central A.C., won't you check the entrance just for me."
  },
  {
    text: "This pool area has a working hot tub, and a non rectangular pool -- rub-a-dub-dub."
  },
  {
    text: "Come back to apartment 618 to see, well, who has ween!"
  },



]
let triviaQs = [
  {
    text: 'Which phase(s) (1, 2, 3) have no decorative roof?',
    answer: "3"
  },
  {
    text: 'What brand of elevator do both phases 1 and 2 use?',
    answer: "Thyssen Krupp"
  },
  {
    text: 'How many stories does phase 3 have?',
    answer: "18"
  },
  {
    text: 'How many apartments have their own garages at phase 2?',
    answer: "2"
  },
  {
    text: 'How many reclining lounge chairs does phase 2 have?',
    answer: "19"
  },
  {
    text: 'Which phase 2 apartment has the lowest number?',
    answer: "212"
  },
  {
    text: 'How many are on the fourth floor of phase 1?',
    answer: "5"
  },
  {
    text: 'What brand of internet does Shipps have?',
    answer: "Century Link"
  },
  {
    text: 'What county is Shipps in?',
    answer: "Collier"
  },
  {
    text: '',
    answer: ""
  },



].sort((a, b) => 0.5 - Math.random());
let teamLookup = {1: "one", 2: "two"}
export default {
  data() {
    return {
      onboarded: false,
      team: 0,
      clue: 1,
      trivia: false,
      clues,
      triviaQs,
      answer: '',
    }
  },
  watch: {
    answer() {
      if (this.answer == this.triviaQs[this.clue - 1].answer) {
        this.trivia = false
        this.clue++
        this.answer = ''
      }
    }
  },
  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'blue'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    onboard(team) {
      this.team = team
      this.onboarded = true
    },
    async onDecode(e) {
      if (parseInt(e) == this.clue + 1) {
        let clue = this.clue + 1;
        console.log(clue)
        this.trivia = true;
        const messageRef = this.$fire.database.ref('teams')
        let obj = {};
        if (this.team == 1) {
          obj = {one: {clue: clue}}
        } else {
          obj = {two: {clue: clue}}
        }
        await messageRef.update(obj)

      }
    },
  },
}
</script>
