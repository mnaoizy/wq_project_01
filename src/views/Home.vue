<template>
  <div class="home">

    <!-- Pre Test Window -->
    <div class="window" v-if="!main">
      <div style="display: flex; height: 100%; text-align:center; flex-direction: column; justify-content: space-evenly;" v-if="state === 'intro'">
          <h1>中国語標準語声調知覚実験</h1>
          <div>
          <label style="vertical-align:middle;">お名前</label>
          <input style="font-size: 1.2rem;padding: 5px;width: 200px;margin-left: 20px;" v-model="name"></div>
          <div>
            <div class="next-experiment" @click="goToDemo">実験を開始</div>
            <p v-if="showError">エラー：{{message}}</p>
          </div>

        </div>

      <div class="container">
        <DemoAudio @finished="finished" ref="demo" class="da" :class="{'ended': state !== 'demo'}"  v-if="state === 'progress'||'demo'"></DemoAudio>
        <div class="right-control">
          <template v-if="state === 'demo'">
            <div>
              <h2>説明</h2>
              <p>再生ボタンをクリックすると，左図の①から⑤の音声が順番に再生されます。音声を確認してから，次のページに進んでください。</p>
            </div>
          <div class="play-button" :class="{'playing': demoPlaying}" @click="playDemo">再生</div>
          <div class="play-button" @click="state = 'progress'">次へ</div>
          </template>
          <template v-if="state === 'progress' && showContent">
              <PlayButton :audio="audio" @audio-click="audioClick" />
              <p>上の再生ボタンをクリックして，下にある「聞こえたピッチパターンと一致する線の番号のボタン」を選択してください。</p>
              <div class="options">
                <svg v-for="i in 5" viewbox="0 0 20 20" width="40" height="40" @click="enterRusult(i+1)">
                  <circle fill="#ccc" cx="20" cy="20" r="20"/>
                  <text x="13" y="30" class="number" font-size="25">{{i}}</text>
                </svg>
            </div>
          </template>
          <template v-if="state === 'ended'  && showContent">
              <h1>
                実験１が終了しました
              </h1>
              <div class="next-experiment" @click="main = true">次の実験へ</div>
          </template>
        </div>
      </div>
    </div>

    <!-- Main Test Window -->
    <div class="window" v-if="main">
      <div class="progress" :style="barLength"></div>

      <div class="main-container" v-if="showContent && state !== 'main-ended'">

      <template v-if="!calcMode">
        <PlayButton :audio="audio" @audio-click="audioClick" />
        <div>
        <div class="bottom-control">
          <div class="answer-button" v-for="ba in bas" @click="toggleCalc(ba)">{{ba}}</div>
        </div>
        <p v-if="showError">{{message}}</p>
        </div>
      </template>

      <template v-if="calcMode">
        <div>
          <h2>この計算問題を解いてください</h2>
        </div>

        <h1>{{mathProb}}</h1>

        <div>
          <label style="vertical-align:middle;">回答</label>
          <input style="font-size: 1.2rem;padding: 5px;width: 200px;margin-left: 20px;" v-model="math">
        </div>

        <div class="next-experiment" @click="enterRusult(selectedOption)">次の問題へ</div>


      </template>
      
      </div>
      
      <template v-if="state === 'main-ended'  && showContent">
        <div style="height: 100%; display:flex; justify-content: space-evenly; align-items: center;">
        <h1 style="display:inline-block">
         すべての実験が終了しました
        </h1>
        </div>
      </template>
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
      playStartedTime: null,
      playEndedTime: null,
      played: false,
      name: '',
      message: '',
      showError: false,
      state: 'intro',
      main: false,
      bas: ['bā', 'bá', 'bǎ', 'bà'],
      preTestResult: [],
      mainTestResult: [],
      preTestIndex: 0,
      mainTestIndex: 0,
      showContent: true,
      calcMode: false,
      math: '',
      mathProb: '',
      selectedOption: '',
      preTestContents: [
      {
        audioFile: 'start-6.wav',
      },
      {
        audioFile: 'start-3.wav',
      },
      {
        audioFile: 'end-6.wav',
      },
      {
        audioFile: 'end-3.wav',
      },
      {
        audioFile: '0.wav',
      }
      ],
      mainTestContents: [
        {
          audioFile: "high-0.wav",
        },
        {
          audioFile: "high-end-1.wav",
        },
        {
          audioFile: "high-end-2.wav",
        },
        {
          audioFile: "high-end-3.wav",
        },
        {
          audioFile: "high-end-4.wav",
        },
        {
          audioFile: "high-end-5.wav",
        },
        {
          audioFile: "high-end-6.wav",
        },
        {
          audioFile: "high-start-1.wav",
        },
        {
          audioFile: "high-start-2.wav",
        },
        {
          audioFile: "high-start-3.wav",
        },
        {
          audioFile: "high-start-4.wav",
        },
        {
          audioFile: "high-start-5.wav",
        },
        {
          audioFile: "high-start-6.wav",
        },
        {
          audioFile: "low-0.wav",
        },
        {
          audioFile: "low-end-1.wav",
        },
        {
          audioFile: "low-end-2.wav",
        },
        {
          audioFile: "low-end-3.wav",
        },
        {
          audioFile: "low-end-4.wav",
        },
        {
          audioFile: "low-end-5.wav",
        },
        {
          audioFile: "low-end-6.wav",
        },
        {
          audioFile: "low-start-1.wav",
        },
        {
          audioFile: "low-start-2.wav",
        },
        {
          audioFile: "low-start-3.wav",
        },
        {
          audioFile: "low-start-4.wav",
        },
        {
          audioFile: "low-start-5.wav",
        },
        {
          audioFile: "low-start-6.wav",
        },
        {
          audioFile: "mid-0.wav",
        },
        {
          audioFile: "mid-end-1.wav",
        },
        {
          audioFile: "mid-end-2.wav",
        },
        {
          audioFile: "mid-end-3.wav",
        },
        {
          audioFile: "mid-end-4.wav",
        },
        {
          audioFile: "mid-end-5.wav",
        },
        {
          audioFile: "low-end-5.wav",
        },
        {
          audioFile: "mid-end-6.wav",
        },
        {
          audioFile: "mid-start-1.wav",
        },
        {
          audioFile: "mid-start-2.wav",
        },
        {
          audioFile: "mid-start-3.wav",
        },
        {
          audioFile: "mid-start-4.wav",
        },
        {
          audioFile: "mid-start-5.wav",
        },
        {
          audioFile: "mid-start-6.wav",
        },
        {
          audioFile: "original.wav",
        },
      ]
    }
  },
  computed:{
    audio(){
      return new Audio(require(`@/assets/${
        this.main ? this.mainTestContents[this.mainTestIndex].audioFile :
        this.preTestContents[this.preTestIndex].audioFile
        }`))
    },
    barLength(){
      return  `width: ${this.mainTestIndex/this.mainTestContents.length * 100 }%`
    }
  },
  methods: {
    createMathProb(){
      let problem = ''
      const first  = Math.floor(Math.random()*10).toString()
      const second  = Math.floor(Math.random()*10).toString()
      const index  = Math.floor(Math.random()*4)
      const operators = ['×', '+', '÷', '-']
      this.mathProb = first + ' ' + operators[index] + ' ' +  second
    },
    toggleCalc(option){
      if(!this.played){
        this.showError = true
        this.message = '先に音声を再生してください'
      } else {
        this.calcMode = !this.calcMode
        this.selectedOption = option
        this.playEndedTime = new Date().getTime()
      }

    },
    goToDemo(){
      if(this.name !== '')
      this.state = 'demo'
      else {
        this.showError = true
        this.message = 'お名前を入力してください'
      }
    },
    enterRusult(payload){
      this.showContent = false
      setTimeout(()=>{ 
        this.showContent = true
        if(this.main){
          const result = {
            'Index': this.mainTestIndex,
            'Model Audio': this.mainTestContents[this.mainTestIndex].audioFile,
            'User Selected': payload,
            'Response Time': this.playEndedTime - this.playStartedTime
          }
          this.mainTestResult.push(result)
          this.mainTestIndex++
          this.played = false
          this.calcMode = false
          this.math = ''
          this.createMathProb()
        } else {
          const result = {
            'Index': this.preTestIndex,
            'Model Audio': this.preTestContents[this.preTestIndex].audioFile,
            'User Selected': payload,
            'Response Time': new Date().getTime() - this.playStartedTime
          }
          this.preTestResult.push(result)
          this.preTestIndex++
          this.played = false
        
          this.playStartedTime = null
          this.playEndedTime = null
        }
        if(this.preTestIndex === this.preTestContents.length){
          this.showError = false
          this.state = 'ended'
        }

        if(this.mainTestIndex === this.mainTestContents.length){
          this.sendResultToBackend()
          this.state = 'main-ended'
        }
      }, 500)
    },
    audioClick(time){
      if(!this.played){
        this.playStartedTime = time
        console.log(`set time to ${time}`)
        this.played = true
      }
    },
    playDemo(){
      if(!this.demoPlaying)
      this.$refs.demo.demoStarted()
      this.demoPlaying = true
    },
    finished(){
      this.demoPlaying = false
    },
    sendResultToBackend(){
      const finalResult = {
        name: this.name,
        time: new Date(),
        preTestResult: this.preTestResult,
        mainTestResult: this.mainTestResult,
      }
      const sendData = JSON.stringify(finalResult)
      this.$apiService.add('users', {name: sendData}).then((e)=>{
        this.fetchUsers()
        console.log(e)
      }).catch((e)=>{
        console.log(e)
        this.message = e
      })
    }
  },
  mounted(){
    this.preTestContents = this.$_.shuffle(this.preTestContents)
    this.mainTestContents = this.$_.shuffle(this.mainTestContents)
    this.createMathProb()
  }

}
</script>


<style lang="scss" scoped>

.home {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.window {
  overflow: hidden;
  width: 900px;
  height: 500px;
  background-color: rgb(255, 255, 255);
  padding: 5px 20px;
  border-radius: 10px;
  color: #555;
  display: inline-block;
  position: relative;
  .progress{
      transition: all .22s ease;
      position: absolute;
      bottom:0;
      height: 5px;
      width: 50px;
      left:0;
      background-color: #f88;
    }
  .container {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    
  }
  .main-container {
    position: relative;
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
      margin-top: 20px;
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

.next-experiment {
  display: inline-block;
  padding: 10px 30px;
  width: 30%;
  margin: 0 auto;
  font-weight: bold;
  color: #555;
  border: 1px solid #f88; 
  cursor: pointer;
    &:hover {
    border: 1px solid #f88;
    background-color: #f88;
    color: white; 
    
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.disable {
  opacity: .2;
}
</style>

