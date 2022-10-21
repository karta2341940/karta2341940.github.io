

const page = {
    data() {
        return {
            data: "Hello World",
            inputValue: "0000000",
            temp: "",
            inputProbability: [],
            total: 0.0,
        }
    },
    async created() {
        if (this.inputValue.length <= 10) {
            this.inputProbability = new Array();
            for (let i = 0; i < this.inputValue.length; i++) {
                this.inputProbability[i] = 0;
            }
            this.temp = this.inputValue
        }
        else {
            this.inputValue = this.temp
            alert("You can only input 10 symbols")
        }
    },
    methods: {
        inputDetect() {
            if (this.inputValue.length <= 10) {
                this.inputProbability = new Array();
                for (let i = 0; i < this.inputValue.length; i++) {
                    this.inputProbability[i] = 0;
                }
                this.temp = this.inputValue
            }
            else {
                this.inputValue = this.temp
                alert("You can only input 10 symbols")
            }
        },
        probabilityInput(indexNow) {
            let value = 0
            let temp = 0;
            /**
             * 如果輸入的值開頭為0則往前移一位例如
             * 01 => 1
             * 00 => 0
             * 02 => 2
             */
            if(Number(this.inputProbability[indexNow]) < 0){
                alert("機率不可小於0");
                this.inputProbability[indexNow] = 0;
            }
            if (String(this.inputProbability[indexNow][0]) == '0' && String(this.inputProbability[indexNow]).length > 1) {
                this.inputProbability[indexNow]= String(this.inputProbability[indexNow]).substring(1,2)
            }
            for (let index in this.inputProbability) {
                value = Number(this.inputProbability[index]);
                // 實時確認機率是否大於100%
                if (Number(temp + value) > 100) {
                    alert("機率不可大於100%");
                    // 如果大於100%則將該值歸零
                    this.inputProbability[index] = 0;
                }
                else {
                    temp = Number(temp + value);
                }

            }
        },
        probabilityClick(value) {

            if (this.inputProbability[value] == 0) {

                this.inputProbability.forEach((value, index) => {

                    if (value == 0) {
                        this.inputProbability[index] = Number(0);
                    }
                });
                this.inputProbability[value] = '';

            }

        }
    },
}


Vue.createApp(page).mount("#mount-point");


