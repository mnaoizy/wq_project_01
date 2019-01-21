<template>
 <div class="play-btn" @click="play">
    <div class="audio-progress" :style="`transition: all ${started ? audio.duration: 0}s linear;`" :class="{'progressing': started}"></div>
    <div class="audio-progress-range"></div>

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="100px" viewBox="0 0 510 510" xml:space="preserve" @click="play">
  	<g id="play-circle-outline">
    <a :class="{'playing': started}"> 
		<path d="M204,369.75L357,255L204,140.25V369.75z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255 S395.25,0,255,0z M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"/>
    </a>
    </g>
    </svg>
 </div>
</template>

<script>
export default {
    props: ['audio', 'isModel'],
    data(){
        return {
            started: false,
        }
    },
    mounted(){
        let self = this

    },
    methods: {
        play(){
            if(!this.started){
                let self = this
                this.audio.play()
                if(this.isModel){
                    this.$emit('model-played')
                } else {
                    this.$emit('button-clicked')
                }
                this.started = true
                this.audio.addEventListener('ended', ()=>{
                    self.started = false
                })
            }

        }
    },
    computed:{
        progressLength(){
            return
        }
    },
    destroyed(){
    }

}
</script>

<style lang="scss" scoped>

.play-btn {
    fill: #f88;
    border: none;
    position: relative;
    width: 120px;
    margin: 0 auto;
}
  
.play-btn:hover path {
}
path { transition: fill .4s ease; }   

.audio-progress {
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 0%;
    margin: auto;
    height: 3px;
    background-color: #f88;
    z-index: 11;
} 

.audio-progress-range {
    position: absolute;
    bottom: -20px;
    left: 0;
    margin: auto;
    width: 100%;
    height: 3px;
    background-color: #ccc;
    z-index: 10;
} 

svg {   
    cursor: pointer;
    transition: all .3s ease;
        &:hover {
        transform: scale(1.1);
    }
}
.progressing {
    width: 100%;
}
.playing {
    fill: #bbb;
    user-select: none !important;
}
</style>
