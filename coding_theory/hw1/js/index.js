

const page = {
    data() {
        return {
            data: "Hello World",
            inputValue: [1,2,3,4,5],
            inputProbability: [10,20,30,20,20],
            exampleSetV: ["我", "愛", "小海", "(空格)", "520"], // 示範用的input Value
            exampleSetP: ['20', '20', '20', '20', '20'], // 示範用的input Probability
            temp: "",
            table: [],
            radix:2,
        }
    },
    async created() {
        if (this.inputValue.length <= 10) {
            //this.inputProbability = new Array();
            for (let i = 0; i < this.inputValue.length; i++) {
                //this.inputProbability[i] = 0;
            }
            this.temp = this.inputValue
        }
        else {
            this.inputValue = this.temp
            alert("You can only input 10 symbols")
        }
    },
    methods: {
        /**
         * 偵測Symbols 是否超過10個
         * 並且偵測輸入的Symbol有多少個根據其個數填補0於機率欄
         */
        inputDetect() {
            if (this.inputValue.length <= 10) {
                this.inputProbability = new Array();
                for (let i in this.inputValue) {
                    if (this.inputValue[i] != undefined || this.inputValue[i] != null) {
                        this.inputProbability[i] = 0;
                    }
                }
                this.temp = this.inputValue
            }
            else {
                this.inputValue = this.temp
                alert("You can only input 10 symbols")
            }
        },
        /**
         * 偵測輸入的機率是否超過100%
         * 以及自動去除開頭的0
         * @param {Number} indexNow 
         */
        probabilityInput(indexNow) {
            let value = 0
            let temp = 0;
            /**
             * 如果輸入的值開頭為0則往前移一位例如
             * 01 => 1
             * 00 => 0
             * 02 => 2
             */
            if (Number(this.inputProbability[indexNow]) < 0) {
                alert("機率不可小於0");
                this.inputProbability[indexNow] = 0;
            }
            if (String(this.inputProbability[indexNow][0]) == '0' && String(this.inputProbability[indexNow]).length > 1) {
                this.inputProbability[indexNow] = String(this.inputProbability[indexNow]).substring(1, 2)
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
        /**
         * 在點擊機率之欄位時自動將0的文字去除
         * @param {String} value 
         */
        probabilityClick(value) {

            if (this.inputProbability[value] == 0) {

                this.inputProbability.forEach((value, index) => {

                    if (value == 0) {
                        this.inputProbability[index] = Number(0);
                    }
                });
                this.inputProbability[value] = '';

            }

        },
        /**
         * 開始執行Huffman的編碼
         */
        runHuffMan() {
            // To check whether the number is less than 100%
            {
                let tempP = 0;
                for (let i of this.inputProbability){
                    tempP +=Number(i);
                }
                if(tempP < 100){
                    alert("機率和要等於100%");
                    return;
                }
                else console.log("ok")
                console.log(tempP)
            }
            // 將value跟probability存入table中
            let temp = [];
            for (let i in this.inputValue) {
                temp.push({
                    'value': this.inputValue[i],
                    'probability': Number(this.inputProbability[i]),
                    'length': 0,
                    'code': ''
                })
            }
            // 將結果排序
            temp.sort((a,b)=>{
                if(a.probability > b.probability ) return -1;
                if(a.probability < b.probability ) return 1;
                return 0;
            })
            this.table = temp;
            console.log(this.table)


        }
    },
}


Vue.createApp(page).mount("#mount-point");


