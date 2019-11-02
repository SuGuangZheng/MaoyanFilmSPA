<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name:"Scroller",
    props:{
        handleStartUpdating:{
            type:Function,
            default:function(){}
        },
        handleEndTouch:{
            type:Function,
            default:function(){}
        },
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper,{
            tap:true,
            probeType:1
        });
        this.scroll = scroll;
        scroll.on("scroll",(pos)=>{
            this.handleStartUpdating(pos);
        });
        scroll.on("touchEnd",(pos)=>{
            this.handleEndTouch(pos);
        });
    },
    methods:{
        toScrollTop(y){
            this.scroll.scrollTo(0,y);
        }
    },

}
</script>

<style scoped>

.wrapper{
    height: 100%;
    width: 100%;
}

</style>