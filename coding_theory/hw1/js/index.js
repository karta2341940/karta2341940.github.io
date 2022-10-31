const page = {
    data() {
        return {
            errMsg:[],
            times:{},
            sampleDataV: [
                '',
                ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'],
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                ['1', '2', '3', '4', '5'],
                ['5', '4', '3', '2', '1'],
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I'],
                ['A', 'B']
            ],
            sampleDataP: [
                '',
                [5, 5, 5, 5, 10, 10, 20, 10, 5, 25],
                [20, 30, 5, 5, 5, 5, 20, 10],
                [60, 0, 10, 0, 30],
                [90, 5, 0, 4, 1],
                [5, 10, 15, 20, 5, 5, 10, 30],
                [50, 50]
            ],
            data: 'hello',
            inputValue: [],
            inputProbability: [],
            exampleSetV: ["我", "愛", "小海", "(空格)", "520"], // 示範用的input Value
            exampleSetP: ['20', '20', '20', '20', '20'], // 示範用的input Probability
            temp: "",
            table: [],
            records: [],
            radix: '',
            sw: false,
            persentage: 0,
            Lav: 0,
            entropy: 0,
            selectIndex: 0,
            readmeClick: false,
            exampleClick: false,
            clicked: []
        }
    },
    async created() {
        console.log('Created')
        this.persentage = arraySum(this.inputProbability);
        if (this.inputValue.length <= 10) {
            this.inputProbability = new Array();
            this.inputValue = new Array();
            for (let i = 0; i < this.inputValue.length; i++) {
                this.inputProbability[i] = 0;
            }
            this.temp = this.inputValue
        }
        else {
            this.inputValue = this.temp
            this.showErr("You can only input 10 symbols")
            return;
        }
    },
    watch: {
        /**
         * 當範例被選擇時自動將範例資料填入
         */
        selectIndex() {
            let si = document.querySelectorAll('.symbol-Input');
            let pi = document.querySelectorAll('.probability-Input');
            let hc = document.querySelectorAll('.code');
            hc.forEach(v => { v.value = '' });
            // 將所有的readonly property設為true
            for (let j in si) {
                si[j].readOnly = true;
                pi[j].readOnly = true;
            }
            for (let i in this.sampleDataV) {
                // compare all the data set in sampleDataV
                if (this.sampleDataV[i] === this.selectIndex) {
                    // copy a new array to inputProbability
                    this.inputProbability = objectCopy(this.sampleDataP[i])
                    this.inputValue = objectCopy(this.selectIndex);
                    if (this.inputValue.length == 0) {
                        //如果是空陣列就只關閉第一個input欄位的readonly
                        this.inputValue = [];
                        si[0].readOnly = false;
                        pi[0].readOnly = false;
                        return;
                    }
                    else {
                        this.inputValue = objectCopy(this.selectIndex);
                    }
                    for (let j in this.inputValue) {
                        si[j].readOnly = false;
                        pi[j].readOnly = false;
                    }
                }
            }
            return;
            //console.log(this.selectIndex)
        },
        /**
         * 當機率被修改時，會自動計算機率總和
         */
        inputProbability() {
            this.persentage = arraySum(this.inputProbability);
            return;
        },
        radix() {
            if (this.radix < 0) {
                this.radix = 2;
            }
            if (this.radix > 10) {
                this.radix = 10;
            }
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
            // Initial Huffman code field
            let huffman = document.querySelectorAll('.code');
            for (let i of huffman) {
                i.value = '';
            }
            let notNull = 0;
            symbolInput.forEach((v, i) => { if (v.value) notNull = i });
            if (this.sw) {
                notNull = nullNumber;
            }
            for (let i = 0; i < symbolInput.length; i++) {
                symbolInput[i].readOnly = false;
                probabilityInput[i].readOnly = false;
            }
            if (this.inputValue[0] === '' && Number(notNull) == 0) {
                notNull = -1;
            }
            else if (Number(notNull) == 0) {
                notNull = 0;
            }

            for (let i = notNull + 2; i < symbolInput.length; i++) {
                symbolInput[i].readOnly = true;
                probabilityInput[i].readOnly = true;
            }
            // ----------------------------SECTION END----------------------------
            // To remove the empty string data from inputValue array.
            if (this.inputValue[notNull + 1] == '') this.inputValue.pop();
            // 自動為相對應機率的空格補0
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
                this.showErr("You can only input 10 symbols")
            }

            this.sw = false;
            return;
        },
        /**
         * 偵測輸入的機率是否超過100%
         * 以及自動去除開頭的0
         * @param {Number} indexNow 
         */
        probabilityInput(indexNow) {
            this.persentage = arraySum(this.inputProbability);
            let value = 0
            let temp = 0;
            /**
             * 如果輸入的值開頭為0則往前移一位例如
             * 01 => 1
             * 00 => 0
             * 02 => 2
             */
            if (Number(this.inputProbability[indexNow]) < 0) {
                this.showErr("機率不可小於0");
                this.inputProbability[indexNow] = 0;
            }
            /*
            console.log(String(this.inputProbability[indexNow][0]))
            if (String(this.inputProbability[indexNow][0]) === '0' && String(this.inputProbability[indexNow]).length > 1) {
                this.inputProbability[indexNow] = String(this.inputProbability[indexNow]).substring(1, 2)
            }
*/
            // 實時確認機率是否大於100%
            for (let index in this.inputProbability) {
                value = Number(this.inputProbability[index]);
                if (Number(temp + value) > 100) {
                    this.showErr("機率不可大於100%");
                    // 如果大於100%則將該值歸零
                    this.inputProbability[index] = 0;
                }
                else {
                    temp = Number(temp + value);
                }
            }
            return;
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
            return;
        },
        /**
         * 開始執行Huffman的編碼
         */
        runHuffMan() {
            console.clear()
            let symbolInput = document.querySelectorAll('.symbol-Input');
            let notNull = 0;
            symbolInput.forEach((v, i) => { if (v.value) notNull = i });
            // Empty String check
            for (let i = 0; i < notNull; i++) {
                if (symbolInput[i].value === '') {
                    this.showErr(`yOu CaN nOT inPUT eMPTy StrInG`)
                    return;
                }
            }
            // Detect repeat symbol
            let repeat = this.inputValue.filter((v, i, a) => a.indexOf(v) !== i);
            if (repeat.length) {
                this.inputValue = [];
                this.inputProbability = [];
                this.sw = true;
                this.inputDetect(0);
                return this.showErr("Don't input repeat symbol")
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
                    this.showErr("機率和要等於100%");
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
                    'code': '',
                    'parent': []
                })
            }
            // 將結果排序
            sort(this.table[0], 1);
            let radix = this.radix;
            if (!radix) radix = 2;
            if (radix > this.inputValue.length) {
                this.showErr(`Radix can't bigger than the sum of symbols`)
                return;
            }

            this.huffman(objectCopy(this.table[0]), radix);
            let hCode = document.querySelectorAll('.code');
            this.inputValue.forEach((v, i) => {
                // 將符合symbol內容的
                let result = this.records.filter((e) => e.value == v)
                hCode[i].value = result[0].code;
            });
            console.log("294 this.table", this.table)
            // Set the Lav
            this.Lav = this.getLav(this.records);
            // Set the entropy
            this.entropy = this.getEntropy(this.records);
        },
        getLav(array) {
            array = objectCopy(array);
            let lav = 0;
            for (let i of array) {
                lav += parseFloat(i.probability * 0.01 * i.code.length);
            }
            return parseFloat(lav);
        },
        getEntropy(array) {
            let radix = Number(this.radix);
            radix == '' ? radix = 2 : radix
            array = objectCopy(array);
            let entropy = 0;
            for (let i of array) {
                let persent = i.probability * 0.01;
                if (persent == 0) continue;
                entropy += persent * log(radix, 1 / persent);
            }
            return parseFloat(entropy);
        },
        /**
         * 執行Huffman編碼
         * @param {Array} Array 要處裡的Symbol set
         * @param {Number} radix - 基底數。用以決定huffman code在產生時以多少個Symbol為一組相加
         * @return {Array}
         */
        huffman(array = [{ 'value': String(), 'probability': Number(), 'code': Number(), 'parent': Array() }], radix = 2) {
            console.log("332 radix:", radix)

            // 如果符號數量less or equal than radix 直接送去parsing
            if (array.length <= radix) {
                this.parsing(array, radix);
                return;
            }
            // 將符號陣列反轉後將最小的radix位相加
            array.reverse();
            let temp = { "value": '', "probability": 0, 'parent': [], 'code': '' };
            for (let i = 0; i < radix; i++) {
                temp.probability += array[i].probability;
                temp.parent.unshift({
                    'value': array[i].value,
                    'probability': array[i].probability,
                    'parent': array[i].parent,
                    'code': ''
                });
            }
            // 並再次反轉然後將最小的radix位pop出去接著push進去相加後的結果並重新排列
            array.reverse();
            for (let i = 0; i < radix; i++) array.pop();
            array.push(objectCopy(temp));
            sort(array);
            // 重新排列後將結果推進this.table
            this.table.push(objectCopy(array));
            console.log("357 array", objectCopy(array))
            // 判別是否相加到最後了(symbol數只剩radix個)否的話繼續相加
            if (array.length == radix) return this.parsing(array, radix);
            else return this.huffman(array, radix);
        },
        /**
         * this function is to parsing array
         * @param {Array} array 
         */
        parsing(ary = [], radix = 2) {
            let array = [[{ 'value': '', 'probability': 0, 'code': '', 'parent': [] }]];
            array = objectCopy(ary);
            let haveParent = 0;
            console.log("---------------------")
            console.log("396: Array.length:", array.length)
            console.log("397: Array:", array)
            console.log("398: radix:", radix)
            console.log("---------------------")
            array.forEach((content, i) => {
                console.log("403 i:", i, " content : ", content)
                if (content.value === '' && content.code === '') {
                    this.followRoute(content, i);
                    haveParent++;
                }
                else {
                    content.code = String(i);
                    this.records.push(content);
                }
            })
            sort(this.records)
            return;
        },
        followRoute(content = { 'value': '', 'probability': 0, 'parent': [], 'code': '' }, index) {
            content.code = index;
            content.parent.forEach((v, i, a) => {
                if (v.value === '' && v.code === '') {
                    this.followRoute(v, String(index) + String(i));
                }
                else {
                    v.code = String(index) + String(i);
                    this.records.push(v);
                }
            });
            return;
        },
        /**
        * Show the Error
        */
        showErr(str=""){
            this.errMsg.push(str);
            setTimeout(()=>{
                this.errMsg.pop();
            },3000)
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
/**
 * This Function return the value that the sum of all number in array
 */
function arraySum(array) {
    let ary = objectCopy(array);
    let sum = 0;
    for (let i of ary) {
        sum += Number(i);
    }
    return sum;
}
/**
 * This function can return Math.log(y) / Math.log(x)
 * @param {Number} x base
 * @param {Number} y exponent
 * @returns 
 */
function log(x, y) {
    return parseFloat(Math.log(y) / Math.log(x));
}
/**
 * 將陣列重新排序
 * 0 : a=b=>a往上排
 * 1 : a=b=>a不動
 * @param {Array} array 要排序的陣列
 * @param {Number} version 排序的版本 default : 0(往上排)
 */
function sort(array = [], version = 0) {
    if (version) {

        array.sort((a, b) => {
            if (a.probability >= b.probability) return -1;
            if (a.probability < b.probability) return 1;
        });
    }
    else {
        array.sort((a, b) => {
            if (a.probability > b.probability) return -1;
            if (a.probability < b.probability) return 1;
            return 0;
        });
    }
}

Vue.createApp(page).mount("body");
console.log("Vue");

