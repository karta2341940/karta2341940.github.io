const page = {
    data() {
        return {
            data: "Hello World",
            inputValue: ['1', '2', '3', '4', '5','6'],
            inputProbability: [5,8,15,15,27,30],
            exampleSetV: ["我", "愛", "小海", "(空格)", "520"], // 示範用的input Value
            exampleSetP: ['20', '20', '20', '20', '20'], // 示範用的input Probability
            temp: "",
            table: [],
            records: [],
            radix: '',
            sw: false,
        }
    },
    async created() {
        if (this.inputValue.length <= 10) {
            /*                                             
8888888 8888888888 8 8888888888      d888888o.   8888888 8888888888   
      8 8888       8 8888          .`8888:' `88.       8 8888         
      8 8888       8 8888          8.`8888.   Y8       8 8888         
      8 8888       8 8888          `8.`8888.           8 8888         
      8 8888       8 888888888888   `8.`8888.          8 8888         
      8 8888       8 8888            `8.`8888.         8 8888         
      8 8888       8 8888             `8.`8888.        8 8888         
      8 8888       8 8888         8b   `8.`8888.       8 8888         
      8 8888       8 8888         `8b.  ;8.`8888       8 8888         
      8 8888       8 888888888888  `Y8888P ,88P'       8 8888         
                                                                      
    ,o888888o.     b.             8 8 8888         `8.`8888.      ,8' 
 . 8888     `88.   888o.          8 8 8888          `8.`8888.    ,8'  
,8 8888       `8b  Y88888o.       8 8 8888           `8.`8888.  ,8'   
88 8888        `8b .`Y888888o.    8 8 8888            `8.`8888.,8'    
88 8888         88 8o. `Y888888o. 8 8 8888             `8.`88888'     
88 8888         88 8`Y8o. `Y88888o8 8 8888              `8. 8888      
88 8888        ,8P 8   `Y8o. `Y8888 8 8888               `8 8888      
`8 8888       ,8P  8      `Y8o. `Y8 8 8888                8 8888      
 ` 8888     ,88'   8         `Y8o.` 8 8888                8 8888      
    `8888888P'     8            `Yo 8 888888888888        8 8888      
            */
            //this.inputProbability = new Array();
            for (let i = 0; i < this.inputValue.length; i++) {
                /*                                             
8888888 8888888888 8 8888888888      d888888o.   8888888 8888888888   
      8 8888       8 8888          .`8888:' `88.       8 8888         
      8 8888       8 8888          8.`8888.   Y8       8 8888         
      8 8888       8 8888          `8.`8888.           8 8888         
      8 8888       8 888888888888   `8.`8888.          8 8888         
      8 8888       8 8888            `8.`8888.         8 8888         
      8 8888       8 8888             `8.`8888.        8 8888         
      8 8888       8 8888         8b   `8.`8888.       8 8888         
      8 8888       8 8888         `8b.  ;8.`8888       8 8888         
      8 8888       8 888888888888  `Y8888P ,88P'       8 8888         
                                                                      
    ,o888888o.     b.             8 8 8888         `8.`8888.      ,8' 
 . 8888     `88.   888o.          8 8 8888          `8.`8888.    ,8'  
,8 8888       `8b  Y88888o.       8 8 8888           `8.`8888.  ,8'   
88 8888        `8b .`Y888888o.    8 8 8888            `8.`8888.,8'    
88 8888         88 8o. `Y888888o. 8 8 8888             `8.`88888'     
88 8888         88 8`Y8o. `Y88888o8 8 8888              `8. 8888      
88 8888        ,8P 8   `Y8o. `Y8888 8 8888               `8 8888      
`8 8888       ,8P  8      `Y8o. `Y8 8 8888                8 8888      
 ` 8888     ,88'   8         `Y8o.` 8 8888                8 8888      
    `8888888P'     8            `Yo 8 888888888888        8 8888      
*/
                //this.inputProbability[i] = 0;
            }
            this.temp = this.inputValue
        }
        else {
            this.inputValue = this.temp
            alert("You can only input 10 symbols")
        }
    },
    mounted() {
        let symbolInput = document.querySelectorAll('.symbol-Input');
        let probabilityInput = document.querySelectorAll('.probability-Input');
        let notNull = 0;
        symbolInput.forEach((v, i) => { if (v.value) notNull = i });
        for (let i = 0; i < symbolInput.length; i++) {
            symbolInput[i].readOnly = false;
            probabilityInput[i].readOnly = false;
        }
        Number(notNull) == 0 ? notNull = -1 : notNull
        for (let i = notNull + 2; i < symbolInput.length; i++) {
            symbolInput[i].readOnly = true;
            probabilityInput[i].readOnly = true;
        }
        this.runHuffMan();
    },
    methods: {
        /**
         * 偵測Symbols 是否超過10個
         * 並且偵測輸入的Symbol有多少個根據其個數填補0於機率欄
         */
        inputDetect(nullNumber) {
            // ----------------------------SECTION----------------------------
            /*
             * The function of this section is to make the input-field turn into read-only
             */
            let symbolInput = document.querySelectorAll('.symbol-Input');
            let probabilityInput = document.querySelectorAll('.probability-Input');
            let notNull = 0;
            symbolInput.forEach((v, i) => { if (v.value) notNull = i });
            if (this.sw) {
                notNull = nullNumber;
                console.log("Hi")
            }
            for (let i = 0; i < symbolInput.length; i++) {
                symbolInput[i].readOnly = false;
                probabilityInput[i].readOnly = false;
            }
            Number(notNull) == 0 ? notNull = -1 : notNull
            for (let i = notNull + 2; i < symbolInput.length; i++) {
                symbolInput[i].readOnly = true;
                probabilityInput[i].readOnly = true;
            }
            // ----------------------------SECTION END----------------------------
            // To remove the empty string data from inputValue array.
            if (this.inputValue[notNull + 1] == '') this.inputValue.pop();
            if (this.inputValue.length <= 10) {
                // 自動為相對應機率的空格補0
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
            this.sw = false;
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
        radixInput() {
            if (this.radix == '') {
                return;
            }
            if (this.radix < 2) {
                this.radix = 2;
                alert("Radix can't less than 2");
                return;
            }
            if (this.radix > this.inputValue.length) {
                this.radix = this.inputValue.length;
                alert("Radix can't large than total of symbol");
                return;
            }
        },
        /**
         * 開始執行Huffman的編碼
         */
        runHuffMan() {
            console.clear()
            // Detect repeat symbol
            let symbolInput = document.querySelectorAll('.symbol-Input');
            let notNull = 0;
            symbolInput.forEach((v, i) => { if (v.value) notNull = i });
            // Empty String check
            for (let i = 0; i < notNull; i++) {
                if (symbolInput[i].value === '') {
                    alert(`yOu CaN nOT inPUT eMPTy StrInG`)
                    return;
                }
            }
            let repeat = this.inputValue.filter((v, i, a) => a.indexOf(v) !== i);
            if (repeat.length) {
                this.inputValue = [];
                this.inputProbability = [];
                this.sw = true;
                this.inputDetect(0);
                return alert("Don't input repeat symbol")
            }
            // To initialized the table and records array
            this.table = [];
            this.records = [];
            // To check whether the number is less than 100%
            {
                let tempP = 0;
                for (let i of this.inputProbability) {
                    tempP += Number(i);
                }
                if (tempP < 100) {
                    alert("機率和要等於100%");
                    return;
                }
                else console.log("Data is Ok it can be encode");
            }
            // 將value跟probability存入table中
            let tempTable = [];
            this.table[0] = new Array()
            for (let i in this.inputValue) {
                this.table[0].push({
                    'value': this.inputValue[i],
                    'probability': Number(this.inputProbability[i]),
                    'code': ''
                })
                tempTable.push({
                    'value': this.inputValue[i],
                    'probability': Number(this.inputProbability[i]),
                    'code': ''
                })
            }
            this.table[0].sort((a, b) => {
                if (a.probability > b.probability) return -1;
                if (a.probability < b.probability) return 1;
                return 0;
            })
            // 將結果排序
            tempTable.sort((a, b) => {
                if (a.probability > b.probability) return -1;
                if (a.probability < b.probability) return 1;
                return 0;
            })
            this.huffman(tempTable);
            let hCode = document.querySelectorAll('.code');
            let symbol = document.querySelectorAll('input.symbol-Input');
            symbol.forEach((v,i,a)=>{
                console.log(v.value)
                let result = this.records.filter((e)=> e.value == v.value)
                try{
                    console.log(result[0].code)
                    hCode[i].value = result[0].code
                }catch(err){

                }
                
            });
            //console.log("this.table : ", this.table)
        },
        /**
         * 執行Huffman編碼
         * @param {Array} Array 要處裡的Symbol set
         * @param {Number} radix - 基底數。用以決定huffman code在產生時以多少個Symbol為一組相加
         * @return {Array}
         */
        huffman(array = [{ 'value': String(), 'probability': Number() }], radix = 2) {
            if (radix < 2) radix = 2;
            if (radix > array.length) radix = array.length;
            if (array.length == radix) return;
            let temp = {
                "value": '',
                "probability": 0,
                'parent': [],
                'code': ''
            };
            for (let i = array.length - 1; i > array.length - radix - 1; i--) {
                temp.probability += array[i].probability;
                temp.parent.unshift({
                    'value': array[i].value,
                    'probability': array[i].probability,
                    'parent': array[i].parent,
                    'code': ''
                });
            }
            for (let i = 0; i < radix; i++) array.pop()
            array.push(temp);
            array.sort((a, b) => {
                if (a.probability >= b.probability) return -1;
                if (a.probability < b.probability) return 1;
            })
            this.table[this.table.length] = new Array();
            for (let i of array) {
                this.table[this.table.length - 1].push(i)
            }
            if (array.length == radix) return this.parsing(this.table, radix, array.length);
            else this.huffman(array, radix);

        },
        /**
         * this function is to parsing array
         * @param {Array} array 
         */
        parsing(ary = [], radix = 2) {
            let array = [[{ 'value': '', 'probability': 0, 'code': '', 'parent': [] }]];
            array = objectCopy(ary).reverse();
            //array.forEach((value, index, array) => {

            let haveParent = 0;
            array[0].forEach((content, i, arr) => {
                if (content.value == '' && content.code == '') {
                    this.followRoute(content, i);
                    haveParent++;
                }
                else {
                    content.code = i;
                    this.records.push(content);
                }
            })
            //})
            this.records.sort((a, b) => {
                if (a.value > b.value) return 1;
                if (a.value < b.value) return -1;
                return 0;
            })
            console.log(this.records);
        },
        followRoute(content = { 'value': '', 'probability': 0, 'parent': [], 'code': '' }, index) {
            content.code = index;
            content.parent.forEach((v, i, a) => {
                if (v.value == '' && v.code == '') {
                    this.followRoute(v, String(index) + String(i));
                }
                else {
                    v.code = String(index) + String(i);
                    this.records.push(v);
                }
            });
        }
    },
}
/**
 * To deep clone the Object (include array) to a new Object
 * This function will not return reference
 */
function objectCopy(array = []) {
    let tmp = new Array();
    tmp = JSON.parse(JSON.stringify(array));
    return tmp;
}
Vue.createApp(page).mount("#mount-point");


