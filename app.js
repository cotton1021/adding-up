//変化率を計算し、数値ごとに並び替える。（+整形）
'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
const prefectureDataMap = new Map();
    // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', lineString => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if(year === 2010 || year === 2015) {
        let value = prefectureDataMap.get(prefecture);
        if (!value) {
            value = {
                popu10: 0,
                popu15: 0,
                change: null
            };
        }
        if (year === 2010) {
            value.popu10 = popu;
        }
        if (year === 2015) {
            value.popu15 = popu;
        }
        prefectureDataMap.set(prefecture, value);
    }
});
rl.on('close', () => {
    for (let [key, value] of prefectureDataMap) {
        value.change = value.popu15 / value.popu10;
    }
    const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
        return pair2[1].change - pair1[1].change;
    });
    const rankingStrings = rankingArray.map(([key, value]) => {
        return (
            key +
            ': ' +
            value.popu10 +
            '=>' +
            value.popu15 +
            ' 変化率 :' +
            value.change
        );
    });
    console.log(rankingStrings);
});


/*各都道府県の名前をキーにして、集計データのオブジェクトが入っている データ構造を表示 
'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
const prefectureDataMap = new Map();
    // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', lineString => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if(year === 2010 || year === 2015) {
        let value = prefectureDataMap.get(prefecture);
        if (!value) {
            value = {
                popu10: 0,
                popu15: 0,
                change: null
            };
        }
        if (year === 2010) {
            value.popu10 = popu;
        }
        if (year === 2015) {
            value.popu15 = popu;
        }
        prefectureDataMap.set(prefecture, value);
    }
});
rl.on('close', () => {
    console.log(prefectureDataMap);
});
 */

/*  「集計年」「都道府県」「15〜19 歳の人口」を抜き出し、
    2010 年と 2015 年のデータを選別する
'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
rl.on('line', lineString => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if(year === 2010 || year === 2015) {
        console.log(year);
        console.log(prefecture);
        console.log(popu);
    }
});
 */

/*データを全て読み込むコード
'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
rl.on('line', lineString => {
    console.log(lineString);
});
*/

/*  6行目～：
    「rl」オブジェクトで「line」というイベントが発生したら、
    この無名関数を呼んでください、という意味のコード
*/