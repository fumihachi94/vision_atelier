'use strict';

function save2json(){
    const msg = document.getElementById("post-control")
    alert(msg.value);
    console.log('test');

    const fileName = "test.json";
    const data     = "hogehoge json";
    const datajsn  = JSON.stringify(data);
    const a = document.createElement("a");
    a.href = "data:text/plain," + encodeURIComponent(datajsn);
    document.body.appendChild(a); // Firefoxで必要
    a.download = fileName;
    a.click();
    document.body.removeChild(a); // Firefoxで必要

    // var blob = new Blob([text], {type: "text/plain"}); // バイナリデータを作ります。

    // // IEか他ブラウザかの判定
    // if(window.navigator.msSaveBlob)
    // {
    //     // IEなら独自関数を使います。
    //     window.navigator.msSaveBlob(blob, "ファイル名.txt");
    // } else {
    //     // それ以外はaタグを利用してイベントを発火させます
    //     var a = document.createElement("a");
    //     a.href = URL.createObjectURL(blob);
    //     a.target = '_blank';
    //     a.download = 'ファイル名.txt';
    //     a.click();
    // }
    

    return false;
}


require('dotenv').config();
const got = require('got');

(async () => {
  const {body} = await got(
    'https://api.github.com/repos/:owner/:repo/contents/foo.csv',
    {
      json: true,
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${process.env.TOKEN}`
      }
    }
  );

  const decodedContent = Buffer.from(body.content, 'base64').toString();
  console.log(decodedContent);
})().catch(err => {
  console.log(err);
});