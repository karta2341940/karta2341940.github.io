

const page = {
    data() {
        return {
            data: "Hello World",
            inputValue:"",
            temp:"",
        }
    },
    async created() {
    },
    methods: {
        inputDetect(){
            if(this.inputValue.length <= 10){
                this.temp = this.inputValue
            }
            else{
                this.inputValue=this.temp
                alert("You can only input 10 symbols")
            }
        },
    },
}


Vue.createApp(page).mount("#mount-point");


