//expressをインポート
const express = require('express');
//expressを使いやすくする
const app = express();
//postmanからjson形式でデータを送信するために必要
app.use(express.json());

//ローカルサーバを立ち上げれるようにする(今回は3000番)
app.listen(3000, console.log('Server is running on port 3000'));
//npm run devでサーバーを立ち上げる。上記のメッセージが出れば成功
//localhost:3000にアクセスするとHello Worldが表示される
app.get('/', (req, res) => {
    res.send('Hello World');
});

//json形式で情報をサーバに置く
const kumo_bcali = [
    { name: "uchiyoshi", laboratory: "kumo", id: 1 },
    { name: "kekeho", laboratory: "bcali", id: 2 },
    { name: "taru", laboratory: "bcali", id: 3 },
    { name: "rihib", laboratory: "kumo", id: 4 },
]

//データを取得する
//localhost:3000/api/kumo_bcaliにアクセスするとjson形式でデータが表示される
app.get('/api/kumo_bcali', (req, res) => {
    res.send(kumo_bcali);
});

//idを指定してデータを取得する(GET)
//:idは今回作ったデータのidを指定する(例：localhost:3000/api/kumo_bcali/1)
app.get('/api/kumo_bcali/:id', (req, res) => {
    //parseIntは文字列を整数に変換することで、idを数字として扱えるようにする
    const member = kumo_bcali.find((c) => c.id === parseInt(req.params.id));
    if (!member) res.status(404).send('The member was not found');
    res.send(member);
});

//データを送信する(POST)
app.post('/api/kumo_bcali', (req, res) => {
    //json形式でデータを送信する
    const member = {
        name: req.body.name,
        laboratory: req.body.laboratory,
        id: kumo_bcali.length + 1
    };
    kumo_bcali.push(member);
    res.send(member);
});

//データを更新する(PUT)
app.put('/api/kumo_bcali/:id', (req, res) => {
    //まずはidを指定してデータを取得する
    const member = kumo_bcali.find((c) => c.id === parseInt(req.params.id));
    if (!member) res.status(404).send('The member was not found');

    //データを更新する
    member.name = req.body.name;
    member.laboratory = req.body.laboratory;
    res.send(member);
});

//データを削除する(DELETE)
app.delete('/api/kumo_bcali/:id', (req, res) => {
    //まずはidを指定してデータを取得する
    const member = kumo_bcali.find((c) => c.id === parseInt(req.params.id));
    if (!member) res.status(404).send('The member was not found');

    //データを削除する
    //idを指定する
    const index = kumo_bcali.indexOf(member);
    //指定したidのデータを削除する
    kumo_bcali.splice(index, 1);

    res.send(member);
});

