<template>
    <div class="demo-audio">
    <svg viewbox="0 0 400 400" width="400" height="400">
        <line v-for="i in 5" x1=30 y1=200 x2=360 :y2="-10+70*i" :stroke-width=" i === currentAudioIndex ? '3px': '1px'" :stroke=" i === currentAudioIndex ? '#f88': '#555'"></line>
        <circle fill="#f88" cx="30" cy="200" r="20"/>
        <text x="9" y="170" font-size="22" fill="#555" font-weight="bold">始点</text>
        <text x="338" y="27" font-size="22" fill="#555" font-weight="bold">終点</text>
        <circle v-for="i in 5" cx="360" :cy="-10+70*i" r="20" class="inactive" :class="{'active': i === currentAudioIndex}"/>
        <text v-for="i in 5" x="353.2" :y="-1+70*i" class="number" font-size="25">{{i}}</text>
    </svg>
    </div>
</template>

<script>

export default {
    methods: {
        demoStarted(){
            let fiveVoices = new Audio(require('@/assets/5-voices.wav'))
            fiveVoices.addEventListener('ended', ()=>{
                this.$emit('finished')
            })
            fiveVoices.play()
            const timer = setInterval(()=>{
                this.currentAudioIndex++
                if (this.currentAudioIndex>5){
                    clearInterval(timer)
                    this.currentAudioIndex = 0
                }
            }, 2450)
            
        }
    },
    data(){
        return {
            currentAudioIndex: 0,
        }
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>

.demo-audio {
    width: 400px;
    height: 400px;  
}

.inactive {
    fill: #bbb;
    transition: .2s ease;
}
.active {
    fill: #f88;
    width: 100px;
    transform-origin: center;
    r: 25;
}

.number {
    fill: white;
    font-weight: bold;
    font-family: 'Century Gothic', sans-serif;
}

</style>
