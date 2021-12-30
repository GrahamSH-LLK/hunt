<template>
  <div>
    <div
      class="bg-red-200 p-2 m-2 rounded-md transition-all"
      :style="`width: ${(parseInt(teams.one.clue) / 10) * 100}%;`"
    >
      Team 1 {{ teams.one.clue }}
    </div>
    <div
      class="bg-blue-200 p-2 m-2 rounded-md transition-all"
      :style="`width: ${(parseInt(teams.two.clue) / 10) * 100}%;`"
    >
      Team 2 {{ teams.two.clue }}
    </div>
    <button @click="readFromRealtimeDb">Refresh</button>
  </div>
</template>

<script>
export default {
  async mounted() {
    const messageRef = this.$fire.database.ref('teams')
    try {
      const snapshot = await messageRef.once('value')
      this.teams = snapshot.val()
      console.log(snapshot.val())
    } catch (e) {
      alert(e)
      return
    }
  },
  data() {
    return {
      teams: {
        one: { clue: 1 },
        two: { clue: 1 },
      },
    }
  },
  methods: {
    async writeToRealtimeDb() {
      console.log(this.$fire.database)
      const messageRef = this.$fire.database.ref('teams')
      try {
        await messageRef.set({
          one: { clue: 1 },
          two: { clue: 1 },
        })
      } catch (e) {
        alert(e)
        return
      }
      alert('Success.')
    },
    async readFromRealtimeDb() {
      const messageRef = this.$fire.database.ref('teams')
      try {
        const snapshot = await messageRef.once('value')
        this.teams = snapshot.val()
        console.log(snapshot.val())
      } catch (e) {
        alert(e)
        return
      }
    },
  },
  name: 'IndexPage',
}
</script>
