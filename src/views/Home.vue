<template>
  <div class="home">
    <div class="window" v-if="!main">
      <div class="container">
        <DemoAudio @finished="finished" ref="demo" class="da" :class="{'ended': state !== 'intro'}"></DemoAudio>
        <div class="right-control">
          <template v-if="state === 'intro'">
            <div>
              <h2>説明</h2>
              <p>再生ボタンをクリックすると，
                左図の①から⑤の音声が順番に再生されます。
                音声を確認してから，次のページに進んでください。
              </p>
            </div>
          <div class="play-button" :class="{'playing': demoPlaying}" @click="playDemo">再生</div>
          <div class="play-button" @click="state = 'progress'">次へ</div>
          </template>
          <template v-if="state === 'progress'">
              <PlayButton :audio="audio"/>
              <p>上の再生ボタンをクリックして，下にある「聞こえたピッチパターンと一致する線の番号のボタン」を選択してください。</p>
              <div class="options">
                <svg v-for="i in 5" viewbox="0 0 20 20" width="40" height="40">
                  <circle fill="#ccc" cx="20" cy="20" r="20"/>
                  <text x="13" y="30" class="number" font-size="25">{{i}}</text>
                </svg>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="window" v-if="main">
      <div class="main-container">
        <PlayButton :audio="audio"/>
        <div class="bottom-control">
          <div class="answer-button" v-for="ba in bas">{{ba}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    PlayButton: require('@/components/PlayButton').default,
    DemoAudio: require('@/components/DemoAudio').default
  },
  data(){
    return {
      demoPlaying: false,
      state: 'intro',
      audio: null,
      main: false,
      bas: ['bā', 'bá', 'bǎ', 'bà']
    }
  },
  methods: {
    playDemo(){
      if(!this.demoPlaying)
      this.$refs.demo.demoStarted()
      this.demoPlaying = true
    },
    finished(){
      this.demoPlaying = false
    }
  },
  mounted(){
    const audio = new Audio(require('@/assets/5-voices.wav'))
    console.log(audio)
    this.audio = audio
  }

}
</script>


<style lang="scss" scoped>
.home {
  height: 100vh;
  text-align: center;
}
.window {
  width: 900px;
  height: 500px;
  box-shadow: 0 0 40px 0 #ccc;
  display: inline-block;
  margin-top: 100px;
  .container {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    .bottom-control {
      display: flex;
      justify-content: space-evenly;
      .answer-button {
        font-size: 1.145rem;
        transition: all .2s ease;
        cursor: pointer;
        background-color: white;
        padding: 13px 30px;
        color: #555;
        border: 1px solid #f88;
        &:hover {
          background-color: #f88;
          color: white;
          border: 1px solid #f88;
          transform: scale(1.1);
        }
      }
    }
  }

  .right-control {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding: 70px 0;
    h2 {
      margin: 0;
      text-align: left;
    }
    p {
      display: inline-block;
      text-align: left;
      margin-top: 30px;
      font-size: 1.1rem;
    
    }
    .play-button {
      cursor: pointer;
      background-color: #f88;
      color: white;
      padding: 5px 15px;
      width: 20%;
      font-weight: bold;
      font-size: 1.2rem;
      display: inline-block;
      border-radius: 100px;
      margin: 0 auto;
    }
    .playing {
      cursor: default;
      background-color:#fafafa;
      color: #ccc;
      user-select: none;
    }

    .options {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      svg {
        transition: .2s ease;
        &:hover {
          transform: scale(1.1);
          circle {
            fill: #f88 !important;
          }
        }
        circle {
          cursor: pointer;

        }
        .number {
            cursor: pointer;
            user-select: none;
            fill: white;
            font-weight: bold;
            font-family: 'Century Gothic', sans-serif;
        }
      }
    }
  }

}

.ended {
  opacity: .3;
}

.da {
  user-select: none;
}
</style>

