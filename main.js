/*queryたち*/
const canvas=document.querySelector(".canvas");
const playerName=document.getElementById("playerName");
const itemDescr=document.querySelector(".itemDescr");
/*メイン*/
const mouse = {
    x: null,
    y: null
}
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
});
var target=0;
var popTexts=[];
var chat="";
var enemy=0;
var turn=0;
var np=0;
var myturn=false;
var remnp=0;
var attack=0;
var isHost=false;
var defence=0;
var attacked=false;
var start=false;
const ctx=canvas.getContext("2d");
const cards=[];
var mynp=0;
var players=[];
var decks=[];
function addPlayer(n,id){
    players.push({
        name:n,
        id:id,
        hp:20,
        mp:15,
        money:10,
        maxCards:9,
        job:"無",
        status:[]
    });
}
function cardAdd(n,v,p,c,e,t){
    if(!e){
        e="攻撃";
    }
cards.push({
    name:n,
    value:v,
    price:p,
    chance:c,
    effect:e,
    type:t
});
}
cardAdd("伝説の剣",30,25,1,"攻撃","");
cardAdd("伝説の魔剣",16,15,1,"攻撃","闇");
cardAdd("スパイ衛星",0,30,1,"自分以外の全員のデッキを開示する","");
cardAdd("透視メガネ",0,10,1,"一時的に相手のデッキを開示する","");
//cardAdd("買う",0,5,5,"買う","");
//cardAdd("売る",0,5,5,"売る","");
//cardAdd("両替",0,5,5,"両替","");
cardAdd("馬券",0,9,3,"50%の確率で10円失い、50%の確率で10円手に入れる。","");
cardAdd("レインコート",0,12,1,"水属性を完全に防ぐ","水");
cardAdd("鉄の鎧",12,8,5,"防御","");
cardAdd("鉄の兜",8,8,5,"防御","");
cardAdd("鉄の靴",4,8,5,"防御","");
cardAdd("鉄の小手",3,8,5,"防御","");
cardAdd("金の鎧",24,16,10,"防御","");
cardAdd("金の兜",16,16,10,"防御","");
cardAdd("金の靴",8,16,10,"防御","");
cardAdd("金の小手",6,16,10,"防御","");
cardAdd("鎖かたびら",10,8,5,"防御","");
cardAdd("革の服",8,8,5,"防御","");
cardAdd("革の手袋",2,8,5,"防御","");
cardAdd("金の小手",6,8,5,"防御","");
cardAdd("金の時計",0,8,5,"所持金を全て消費して、手札を所持金÷5の分追加する。(手札の上限は16枚)","");
cardAdd("忘却",0,8,5,"手札を3枚捨てる","");
cardAdd("盾",5,8,5,"防御","");
cardAdd("毒キノコ",0,8,5,"毒を与える","");
cardAdd("解毒薬",0,8,5,"毒を治す","");
cardAdd("星の歌",0,5,5,"5mp消費で夢を見せる","");
cardAdd("ファイアーボール",2,2,5,"魔法","火");
cardAdd("爆炎神竜セット",15,0,1,"防御","火");
cardAdd("戦術核",15,25,1,"攻撃","光");
cardAdd("ペンより強い剣",5,2,1,"攻撃","光");
cardAdd("アメジストのかけら",5,2,1,"攻撃","");
cardAdd("アポロンの琴",10,2,1,"回復","");
cardAdd("回復薬グレート",15,2,1,"回復","");
cardAdd("飴玉",5,2,1,"回復","");
cardAdd("抗生物質",0,2,1,"状態異常を治す","");
cardAdd("金の玉",3,7,1,"追加","光");
cardAdd("徴税",0,7,1,"他人の財産の半分を絞りとる。相手の財産が多ければ多いほどたくさん取れる。","闇");
cardAdd("呪い",0,7,1,"呪いにかかった相手は2倍のダメージを食らうようになる。","");
cardAdd("安保条約",0,7,1,"攻撃を必ず防御してくれるが、その分お金で取られる。相手に使った場合は自分に払われる。","");
cardAdd("むち",2,3,4,"攻撃","");
cardAdd("邪剣夜",5,3,4,"攻撃","闇");
cardAdd("とんぼぎり",12,3,4,"攻撃","");
cardAdd("ジェットソード",8,3,4,"攻撃","");
cardAdd("太陽の剣",9,3,4,"攻撃","火");
cardAdd("半導体レーザー",1,3,4,"追加","光");
cardAdd("テラフォーミング",2,3,4,"手札を二枚増やす。(手札の上限は16枚)","");
cardAdd("アナルアサシン",8,3,4,"攻撃","");
cardAdd("へそくり",0,3,4,"お金が10増える","");
cardAdd("レットブル",15,3,4,"MP回復","");
cardAdd("潮だまり",5,3,4,"攻撃","水");
cardAdd("脊椎剣",5,3,4,"攻撃","");
cardAdd("ゴルフバット",14,3,4,"攻撃","");
cardAdd("日本刀",12,3,4,"攻撃","");
cardAdd("危ないフラスコ",3,3,4,"追加","闇");
cardAdd("ピカピカサンゴ",15,3,4,"MP回復","");
cardAdd("キラキラ方解石",10,3,4,"MP回復","");
cardAdd("シェフの包丁",9,3,4,"攻撃","");
cardAdd("真珠のネックレス",1,10,1,"防御","光");
cardAdd("乾燥ワカメ",2,3,4,"回復","");
cardAdd("おやつ",7,3,4,"回復","");
cardAdd("まな板",3,3,4,"防御","");
cardAdd("亀の甲羅",12,3,4,"防御","");
cardAdd("自爆",45,10,1,"自滅するが全員にダメージ","");
cardAdd("散弾銃",5,3,4,"全体にダメージ、防御不能","");
cardAdd("三角コーン",7,3,4,"防御","");
cardAdd("石の槍",3,3,4,"攻撃","石");
cardAdd("投石機",5,3,4,"追加","石");
cardAdd("トラックくん",19,3,1,"攻撃","");
cardAdd("フライパン",2,3,1,"攻撃","");
cardAdd("消火栓のホース",5,3,1,"攻撃","水");
cardAdd("淫夢之一太刀",15,3,1,"攻撃","");
cardAdd("呪いのヒカマニ",0,3,1,"相手の名前を強制的にヒカマニ語録にする。いたずらの域をはるかに超えている","");
cardAdd("淫夢の呪い",0,3,1,"相手の手札の数字が114514などでたらめな数字になる(手札の効果は変わらない)","");
cardAdd("穴あけパンチ",7,3,4,"","");
cardAdd("弓矢",5,3,4,"追加","");
cardAdd("火矢",5,3,4,"追加","火");
cardAdd("しょうゆ",8,3,4,"MP回復","");
cardAdd("味の素",3,3,4,"MP回復","");
cardAdd("ひっさつパンチ",11,3,4,"攻撃","");
cardAdd("鋭利なミシン針",5,3,4,"攻撃","");
cardAdd("巡航ミサイル",15,3,4,"攻撃","");
cardAdd("てつはう",3,3,4,"追加","");
cardAdd("大砲",10,3,4,"追加","");
cardAdd("榴弾砲",15,3,4,"追加","");
cardAdd("パチパチパンチ",2,3,4,"攻撃","");
cardAdd("一味唐辛子",1,3,5,"","火");
cardAdd("七味唐辛子",7,3,5,"","火");
cardAdd("スーパーチャット",9,3,4,"1円投げ銭する。(何も帰ってこない)","火");
function organizeDeck(p){
    while(myDeckAmounts(p)<players[p].maxCards){
    let seed=Math.round(Math.random()*(cards.length-1));
    decks.push({
        owner:p,
        name:cards[seed].name,
        value:cards[seed].value,
        price:cards[seed].price,
        effect:cards[seed].effect,
        type:cards[seed].type,
        status:"待機",
        seed:Math.round(Math.random()*999999)
    });
    }
}
function updateDeck(p){
    organizeDeck(p);
    exchangeDeckInformation();
}
/*アニメーションフレーム*/
function translate() {
    ctx.textAlign = "center";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(start===true){
    let k=0;
    let i=0;
    for(const d of decks){
        if(d.owner==mynp){
            if(d.type=="火"){
            ctx.strokeStyle="red";
                }
            if(d.type=="水"){
            ctx.strokeStyle="blue";
                }
            if(d.type=="光"){
            ctx.strokeStyle="yellow";
                }
            if(d.type=="闇"){
            ctx.strokeStyle="purple";
                }
            if(d.type=="石"){
            ctx.strokeStyle="gray";
                }
            if(d.type==""){
            ctx.strokeStyle="#000000";
                }
            if(attacked===true && d.effect!="防御" && d.name!="レインコート"){
                ctx.strokeStyle="#00000000";
                }
            if(d.status=="選択中"){
                ctx.fillStyle="gray";
            ctx.strokeStyle="cyan";
                }
            let x=20+(k-8*Math.floor(k/8))*120;
            let y=330+110*Math.floor(k/8);
            ctx.strokeRect(x,y,100,100);
            ctx.fillText(d.name,x+50,y+50);
            if(d.value!=0){
                if(players[mynp].status.indexOf("ホモ")!=-1){
                    let N=Math.round(Math.sin(d.name.charCodeAt(0)));
                    if(N==-1){
                    ctx.fillText("114514",x+80,y+20);
                        }else if(N==1){
                    ctx.fillText("8101919",x+80,y+20);
                        }else{
                    ctx.fillText("4545810",x+80,y+20);
                        }
                    }else{
                if(d.effect=="追加"){
                    ctx.fillText("+"+d.value,x+80,y+20);
                    }else{
            ctx.fillText(d.value,x+80,y+20);
                    }
                    }
                }
            if(collisionRect(x,y,100,100,mouse.x,mouse.y)){
            if(k<8 && (d.effect=="攻撃" || d.effect=="防御" || d.effect=="回復" || d.effect=="MP回復")){
                if(players[mynp].status.indexOf("ホモ")!=-1){
                    let N=Math.round(Math.sin(d.name.charCodeAt(0)));
                    if(N==-1){
                    ctx.fillText("114514",x+75,y-20);
                        }else if(N==1){
                    ctx.fillText("8101919",x+75,y-20);
                        }else{
                    ctx.fillText("4545810",x+75,y-20);
                        }
                    }else{
                ctx.fillText(d.effect+d.value,x+75,y-20);
                    }
            }else if(d.effect=="攻撃" || d.effect=="防御" || d.effect=="回復" || d.effect=="MP回復"){
                if(players[mynp].status.indexOf("ホモ")!=-1){
                    let N=Math.round(Math.sin(d.name.charCodeAt(0)));
                    if(N==-1){
                    ctx.fillText("114514",x+75,y+120);
                        }else if(N==1){
                    ctx.fillText("8101919",x+75,y+120);
                        }else{
                    ctx.fillText("4545810",x+75,y+120);
                        }
                    }else{
                ctx.fillText(d.effect+d.value,x+75,y+120);
                    }
            }else if(k<8){
                ctx.fillText(d.effect,x+75,y-20);
                }else{
            ctx.fillText(d.effect,x+75,y+120);
                }
        }
        k++;
        if(d.status=="選択中"){
            ctx.fillStyle="black";
            if(d.type=="火"){
            ctx.strokeStyle="red";
                }
            if(d.type=="水"){
            ctx.strokeStyle="blue";
                }
            if(d.type=="光"){
            ctx.strokeStyle="yellow";
                }
            if(d.type=="闇"){
            ctx.strokeStyle="purple";
                }
            if(d.type=="石"){
            ctx.strokeStyle="gray";
                }
            if(d.type==""){
            ctx.strokeStyle="#000000";
                }
            let Y=50+(i-2*Math.floor(i/2))*120;
            let X=30+110*Math.floor(i/2);
            ctx.strokeRect(X,Y,100,100);
            ctx.fillText(d.name,X+50,Y+50);
            if(d.value!=0){
                if(players[mynp].status.indexOf("ホモ")!=-1){
                    let N=Math.round(Math.sin(d.name.charCodeAt(0)));
                    if(N==-1){
                    ctx.fillText("114514",x+80,y+20);
                        }else if(N==1){
                    ctx.fillText("8101919",x+80,y+20);
                        }else{
                    ctx.fillText("4545810",x+80,y+20);
                        }
                    }else{
                if(d.effect=="追加"){
                    ctx.fillText("+"+d.value,X+80,Y+20);
                    }else{
            ctx.fillText(d.value,X+80,Y+20);
                    }
                    }
                }
            i++;
            }
        }else{
            if(d.status=="選択中"){
            ctx.fillStyle="black";
            if(d.type=="火"){
            ctx.strokeStyle="red";
                }
            if(d.type=="水"){
            ctx.strokeStyle="blue";
                }
            if(d.type=="光"){
            ctx.strokeStyle="yellow";
                }
            if(d.type=="闇"){
            ctx.strokeStyle="purple";
                }
            if(d.type=="石"){
            ctx.strokeStyle="gray";
                }
            if(d.type==""){
            ctx.strokeStyle="#000000";
                }
            let Y=30+(i-2*Math.floor(i/2))*120;
            let X=850-110*Math.floor(i/2);
            ctx.strokeRect(X,Y,100,100);
            ctx.fillText(d.name,X+50,Y+50);
            if(d.value!=0){
                if(d.effect=="追加"){
                    ctx.fillText("+"+d.value,X+80,Y+20);
                    }else{
            ctx.fillText(d.value,X+80,Y+20);
                    }
                }
            i++;
            }
        }
    }
        ctx.strokeStyle="#000000";
    for(const p of players){
        ctx.textAlign = "left";
        ctx.fillText("→",1025,54+102*target);
        ctx.strokeRect(1050,20+102*p.id,430,68);
        if(p.status.indexOf("ヒカマニ化")!=-1){
            ctx.fillText("ローションwww",1072,37+102*p.id);
            }else{
        ctx.fillText(p.name,1072,37+102*p.id);
            }
        if(p.status.indexOf("ヒカマニ化")!=-1){
        ctx.fillText(`アナ、ゥ`,1072,71+102*p.id);
            }else{
            ctx.fillText(`HP${p.hp}`,1072,71+102*p.id);
            }
        ctx.fillText(`MP${p.mp}`,1158,71+102*p.id);
        ctx.fillText(`${p.money}円`,1246,71+102*p.id);
        for(let k=1; k<=p.status.length; ++k){
            if(p.status[k-1]=="負け"){
                ctx.fillStyle="red";
                ctx.fillText("敗北",1010,54+102*p.id);
                ctx.fillStyle="black";
                }else{
            ctx.fillText(p.status[k-1],1246+86*k,37+102*p.id);
                }
        }
        if(p.id==target && (p.status.indexOf("開示")!=-1 || p.status.indexOf("開示(一時的)")!=-1)){
            let q=0;
            ctx.textAlign = "center";
            ctx.font = "11px serif";
            for(const d of decks){
                if(d.owner==p.id){
                    let x=1025+(q-8*Math.floor(q/8))*60;
                    let y=350+(60*Math.floor(q/8));
                    if(d.type=="火"){
            ctx.strokeStyle="red";
                }
            if(d.type=="水"){
            ctx.strokeStyle="blue";
                }
            if(d.type=="光"){
            ctx.strokeStyle="yellow";
                }
            if(d.type=="闇"){
            ctx.strokeStyle="purple";
                }
            if(d.type=="石"){
            ctx.strokeStyle="gray";
                }
            if(d.type==""){
            ctx.strokeStyle="#000000";
                }
                    ctx.strokeRect(x,y,50,50);
                    ctx.fillText(d.name,x+25,y+25);
                    if(d.effect=="追加"){
                    ctx.fillText("+"+d.value,x+40,y+10);
                    }else{
            ctx.fillText(d.value,x+40,y+10);
                    }
                    q++;
                }
            }
            ctx.strokeStyle="#000000";
            ctx.font = "22px serif";
        }
    }
    ctx.beginPath();
    ctx.moveTo(1000,0);
    ctx.lineTo(1000,canvas.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fillText(`ターン${turn}`,1070,480);
    ctx.strokeRect(1050,500,200,50);
        if(players.length-testDeads()<=1){
            ctx.fillText("再起動",1070,525);
        }else if(myturn===true){
    ctx.fillText("行動を終わる",1070,525);
            }else{
            ctx.fillStyle="gray";
    ctx.fillText(players[np].name+"のターン",1070,525);
            ctx.fillStyle="black";
            }
        if(attacked===true){
    ctx.fillText(`${players[np].name}:${defence}`,100,20);
    ctx.fillText(`${players[enemy].name}:${attack}`,850,20);
        }else{
            if(attack>0){
                if(np==target){
                    ctx.fillText(`${players[np].name}:${attack}`,100,20);
                    }else{
    ctx.fillText(`${players[np].name}:${attack}`,100,20);
                    }
                }else{
                ctx.fillText(players[np].name,100,20);
                }
    ctx.fillText(players[target].name,850,20);
        }
    }
    /*ダメージ等のテキストのUI*/
    for(const p of popTexts){
        ctx.font = "50px serif";
        ctx.textAlign = "center";
        if(!p.colorA){
            p.colorA="ff";
            }
        ctx.fillStyle=p.color+p.colorA;
        ctx.fillText(p.value,p.x,p.y);
        ctx.fill();
        if(p.interval<=30){
        p.y+=-Math.cos((p.interval/60)*Math.PI);
            }else{
            p.colorA=(255-(p.interval-30)*4).toString(16);
            }
        p.interval++;
        if(p.interval>90){
            let index=popTexts.findIndex((elem)=>elem.interval>p.interval);
            popTexts.push("dammy");
            popTexts.length=popTexts.copyWithin(index,popTexts.length-1).length-1;
            popTexts.length=popTexts.copyWithin(index,index+1).length-1;
            }
    }
    ctx.font = "22px serif";
    ctx.fillStyle="black";
    requestAnimationFrame(translate);
}
translate();
/*UI*/
canvas.addEventListener("click",(e)=>{
    let k=0;
    for(const d of decks){
        if(d.owner==mynp){
        let x=20+(k-8*Math.floor(k/8))*120;
        let y=330+110*Math.floor(k/8);
    if(collisionRect(x,y,100,100,mouse.x,mouse.y)){
        if(attacked===false){
        if(np==mynp && d.status=="選択中"){
            sound("click");
            d.status="待機";
            if(d.effect=="攻撃" || d.effect=="追加"){
                attack+=(-1)*d.value;
                }
            }else if(np==mynp && d.effect!="防御" && decks.findIndex((e)=>e.status=="選択中" && e.seed!=d.seed)==-1){
            sound("select");
            d.status="選択中";
            if(d.effect=="回復" || d.effect=="MP回復"){
                target=np;
            }
            if(d.effect=="攻撃" || d.effect=="追加"){
                attack+=d.value;
                if(target==mynp){
                randomTarget();
                }
                }
                }else if(np==mynp && d.effect=="追加" && decks.findIndex((e)=>e.status=="選択中" && (e.effect!="追加" && e.effect!="攻撃"))==-1){
            sound("select");
            d.status="選択中";
            attack+=d.value;
            }else if(d.effect=="攻撃" && decks.findIndex((e)=>e.status=="選択中" && e.effect=="追加")!=-1 && decks.findIndex((e)=>e.status=="選択中" && e.effect=="攻撃" && e.seed!=d.seed)==-1){
            sound("select");
            attack+=d.value;
            d.status="選択中";
            }
        }else{
            if(np==mynp && d.status=="選択中"){
                sound("click");
            defence+=(-1)*d.value;
            d.status="待機";
            }else if(np==mynp && d.effect=="防御"){
                sound("select");
            d.status="選択中";
                defence+=d.value;
            }
            }
        if(players[mynp].status.indexOf("ホモ")!=-1){
                    let N=Math.round(Math.random()*5);
                    if(N==0){
                    itemDescr.innerHTML=`オォン！イキスギィ！`;
                        }else if(N==1){
                    itemDescr.innerHTML=`先輩こいつ玉とか舐めだしましたよ`;
                        }else if(N==2){
                    itemDescr.innerHTML=`いいよ！こいよ！`;
                        }else if(N==3){
                    itemDescr.innerHTML=`ｾﾞｪﾊｧ…ｾﾞｪﾊｧ(ﾎｫﾝ!)…ｱｱｯ!ﾊｧｯ…ﾊｯ　ｲｷｽｷﾞｨ!(ﾎｫﾝ!)ｲｸｩｲｸｲｸｩｨｸ…ｱｯﾊｯ、ﾝｱｯｰ!!ｱｧｯｱｯ…ｱｯ…ﾊﾝ、ｳｯ!!…ｯｱ…ｯｱｧﾝ…ｯｱｧ…ｱｧ…ｯｱ…`;
                        }else if(N==4){
                    itemDescr.innerHTML=`まずうちさあ、屋上...あんだけどぉ、焼いてかない？`;
                        }else if(N==5){
                    itemDescr.innerHTML=`そうだよ(便乗)`;
                        }
                    }else if(d.effect=="攻撃" || d.effect=="防御" || d.effect=="回復" || d.effect=="MP回復" || d.effect=="追加"){
            if(d.effect=="追加"){
                itemDescr.innerHTML=`${d.name}　${"ダメージ追加"+d.value}　価値${d.price}<br>`;
            }else{
            itemDescr.innerHTML=`${d.name}　${d.effect+d.value}　価値${d.price}<br>`;
                }
            }else{
        itemDescr.innerHTML=`${d.name}　${d.effect}　価値${d.price}<br>`;
            }
        }
        k++;
        }
        }
    for(const p of players){
        if(collisionRect(1050,20+102*p.id,430,68,mouse.x,mouse.y) && myturn===true && attacked===false && p.status.indexOf("負け")==-1){
            target=p.id;
            sound("change");
            }
        }
    if(collisionRect(1050,500,200,50,mouse.x,mouse.y) && players.length-testDeads()<=1){
        sound("picon");
        restartGame();
    }else if(collisionRect(1050,500,200,50,mouse.x,mouse.y) && myturn===true){
        sound("picon");
        excute();
        }
});
function myDeckAmounts(p){
    let amount=0;
for(let k=0; k<decks.length; ++k){
  if(decks[k].owner==p){
    amount++;
  }
}
    return amount;
}
/*websocket通信*/
var connection="";
function websocketConnection(url){
    if(playerName.value==""){
        playerName.value=String.fromCharCode(Math.round(Math.random()*(12435-12354)+12354),Math.round(Math.random()*(12435-12354)+12354),Math.round(Math.random()*(12435-12354)+12354),Math.round(Math.random()*(12435-12354)+12354),Math.round(Math.random()*(12435-12354)+12354),Math.round(Math.random()*(12435-12354)+12354),Math.round(Math.random()*(12435-12354)+12354));
    }
connection = new WebSocket(url);
document.querySelector(".startButton").innerHTML=`<input type="button" class="largeButton2" value="ゲームを開始する" onclick="gameStart()" /><hr>`;
document.querySelector(".local").innerHTML=`
チャット<input type="text" class="largeBox" id="chatmsg" /><input type="button" class="largeButton" value="送信" onclick="sendChatmsg()" /><br>
<t id="chat"></t>
`;
chatmsg=document.getElementById("chatmsg");
connection.addEventListener('open',function(e){
    connection.send("接続:"+playerName.value);
    setMyId();
    connection.send(playerName.value+"から新たな接続があります！");
});
connection.addEventListener("message", (event) => {
    if(event.data.indexOf("チャット:")==0){
        document.getElementById("chat").innerHTML=event.data.replace("チャット:","")+"<br>"+document.getElementById("chat").innerHTML;
        }
    if(event.data.indexOf("進行:")==0){
        turn++;
        connection.send(`${np}の行動が終了。`);
        if(players[np].status.indexOf("開示(一時的)")!=-1){
            deleteDisiese(np,players[np].status.indexOf("開示(一時的)"));
        }
        np=parseInt(event.data.substring(3))+1;
        if(np>players.length-1){
            np=0;
            }
        let loopL=0;
        while(players[np].status.indexOf("負け")!=-1){
            loopL++;
            np++;
            if(np>players.length-1){
            np=0;
            }
            if(loopL>1000){
                break;
            }
            }
        if(loopL>1000){
                connection.send("チャット:引き分け！");
            }
        if(np==mynp && attack>0){
            attacked=true;
            target==enemy;
            }else{
            attacked=false;
            }
        if(mynp!=np){
            myturn=false;
        }else{
            randomTarget();
            myturn=true;
        }
        }
    if(event.data.indexOf("接続:")==0){
        connection.send(`確認:${playerName.value}|${mynp}`);
        if(players.length==1){
        isHost=true;
        }
    }
    if(event.data.indexOf("確認:")==0){
        if(players.findIndex((e)=>e.name==event.data.substring(3,event.data.indexOf("|")))==-1){
        let name=event.data.substring(3,event.data.indexOf("|"));
        let id=parseInt(event.data.substring(event.data.indexOf("|")+1));
        addPlayer(name,id);
        }else if(players.findIndex((e)=>e.name==event.data.substring(3,event.data.indexOf("|")))!=-1 && players.findIndex((e)=>e.id==parseInt(event.data.substring(event.data.indexOf("|")+1)))==-1){
            let index=players.findIndex((e)=>e.name==event.data.substring(3,event.data.indexOf("|")));
            players[index].id=parseInt(event.data.substring(event.data.indexOf("|")+1));
        }
    }
    if(event.data.indexOf("こうげき:")==0){
        attack=parseInt(event.data.substring(5));
    }
    if(event.data.indexOf("対象:")==0){
        target=parseInt(event.data.substring(3));
    }
    if(event.data.indexOf("敵:")==0){
        enemy=parseInt(event.data.substring(2));
    }
    if(event.data.indexOf("記憶:")==0){
        remnp=parseInt(event.data.substring(3));
    }
    if(event.data.indexOf("ゲーム:")==0){
        if(event.data.substring(4)=="始まった。"){
        document.querySelector(".startButton").innerHTML="";
        if(isHost===true){
            mynp=players[players.findIndex((e)=>e.name==playerName.value)].id;
            myturn=true;
            for(let k=0; k<players.length; ++k){
        organizeDeck(k);
                }
            exchangeDeckInformation();
            }
            sound("battle");
        start=true;
        canvas.width=1500;
        canvas.height=580;
        ctx.font = "22px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if(np==mynp){
        randomTarget();
    }
        if(isHost===true){
            let r=0;
            for(const p of players){
                p.id=r;
                r++;
            }
            exchangePlayerInformation();
        }
    }
        }
    if(event.data.indexOf("ダメージ:")==0){
        let v=parseInt(event.data.substring(5))*(-1);
        if(v==0){
        if(mynp==np){
            sound("disiese");
        popTexts.push({value:`無事`,x:200,y:150,interval:0,color:"#005500"});
            }else{
        popTexts.push({value:`無事`,x:700,y:150,interval:0,color:"#005500"});
            }
            }else{
            sound("damage");
        if(mynp==np){
        popTexts.push({value:`${v}ダメージ！`,x:200,y:150,interval:0,color:"#ff0000"});
            }else{
        popTexts.push({value:`${v}ダメージ！`,x:700,y:150,interval:0,color:"#ff0000"});
            }
        }
    }
    if(event.data.indexOf("プレイヤー情報:")==0){
        players=eval(event.data.substring(8));
        mynp=players[players.findIndex((e)=>e.name==playerName.value)].id;
    }
    if(event.data.indexOf("デッキ情報:")==0){
        decks=eval(event.data.substring(6));
    }
    if(event.data.indexOf("脱落:")==0){
        sound("death");
    }
    if(event.data.indexOf("関数deckWorkを実行")==0){
        deckWork();
        }
    if(event.data.indexOf("リセット")==0){
        turn=0;
        np=0;
        sound("restart");
        connection.send("チャット:サーバー:スタート！");
        if(np==mynp){
            myturn=true;
        }else{
            myturn=false;
            }
        }
    });
}
document.addEventListener('DOMContentLoaded',function(e){
});
function sendChatmsg(){
    connection.send("チャット:"+playerName.value+":"+chatmsg.value);
    chatmsg.value="";
}
function gameStart(){
    connection.send(`チャット:サーバー:虚言者たちの戦いが今始まる！`);
    connection.send(`ゲーム:始まった。`);
}
/*ターン終了*/
function turnEnd(p){
    defence=0;
    attack=0;
    while(decks.findIndex((e)=>e.status=="選択中")!=-1){
        let index=decks.findIndex((e)=>e.status=="選択中");
        deleteDeck(index);
        }
    for(const p of players){
        if(p.status.indexOf("毒")!=-1){
            damage(-2,p.id);
            if(p.id==mynp){
                popTexts.push({value:`2ダメージ！`,x:200,y:150,interval:0,color:"#ff0000"});
            }
        }
        if(p.money<0){
            p.mp+=p.money;
            p.money=0;
        }
        if(p.mp<0){
            p.hp+=p.mp;
            p.mp=0;
        }
        if(p.hp<=0){
            connection.send("脱落:"+p.name);
            p.status.push("負け");
            p.hp=0;
        }
        updateDeck(p.id);
    }
    exchangeDeckInformation();
    connection.send(`進行:${p}`);
}
function setMyId(){
    mynp=players.length-1;
    console.log(players);
    //players[players.findIndex((e)=>e.name==playerName.value)].id=mynp;
    connection.send(`確認:${playerName.value}|${mynp}`);
}
function timer(t){
    return new Promise((resolve) => {
    setTimeout(() => {resolve()}, t*1000);
  });
}
function playersString(){
    let str="[";
for(let k=0; k<players.length; ++k){
str+=`{name:"${players[k].name}",id:${players[k].id},hp:${players[k].hp},mp:${players[k].mp},money:${players[k].money},maxCards:${players[k].maxCards},job:"${players[k].job}",status:[`;
for(let K=0; K<players[k].status.length; ++K){
    str+=`"${players[k].status[K]}"`;
    if(K+1<players[k].status.length){
  str+=",";
}
}
str+="]}";
if(k+1<players.length){
  str+=",";
}else{
str+="]";
}
}
return str;
}
function decksString(){
    let str="[";
for(let k=0; k<decks.length; ++k){
str+=`{owner:${decks[k].owner},name:"${decks[k].name}",value:${decks[k].value},price:${decks[k].price},effect:"${decks[k].effect}",type:"${decks[k].type}",status:"${decks[k].status}",seed:${decks[k].seed}}`;
if(k+1<decks.length){
  str+=",";
}else{
str+="]";
}
}
return str;
}
/*行動終了*/
async function excute(){
    exchangeDeckInformation();
    if(decks.findIndex((e)=>e.status=="選択中")!=-1){
    if(attacked===false){
    if(attack==0){
    myturn=false;
    connection.send("関数deckWorkを実行");
    await timer(1.25);
    turnEnd(np);
    }else{
        if(target!=mynp){
        connection.send("記憶:"+np);
        connection.send("こうげき:"+attack);
        connection.send("対象:"+target);
        connection.send("進行:"+(target-1));
        connection.send("敵:"+mynp);
            }else{
            sound("disiese");
            players[mynp].hp+=(-1)*attack;
            turnEnd(np);
            }
    }
        }else{
        let calc=(-1)*(attack-defence);
        if(calc>0){
            calc=0;
        }
        connection.send("こうげき:0");
        connection.send("ダメージ:"+calc);
        defence=0;
        damage(calc,np);
        myturn=false;
        await timer(1.25);
        turnEnd(remnp);
        }
    }else{
        turnEnd(np);
    }
    exchangePlayerInformation();
}
function exchangePlayerInformation(){
    connection.send(`プレイヤー情報:${playersString()}`);
}
function exchangeDeckInformation(){
    connection.send(`デッキ情報:${decksString()}`);
}
function collisionRect(x,y,width,height,otherX,otherY,otherWidth,otherHeight){
    if(!otherWidth || !otherHeight){
        otherWidth=0;
        otherHeight=0;
    }
    if(otherX-x<(width+otherWidth) && otherX-x>=0 && otherY-y<(height+otherHeight) && otherY-y>=0){
        return true;
    }else{
        return false;
    }
}
function deleteDeck(index){
    decks.push("dammy");
    decks.length=decks.copyWithin(index,decks.length-1).length-1;
    decks.length=decks.copyWithin(index,index+1).length-1;
}
function deckWork(){
    sound("select");
    for(const d of decks){
        if(d.status=="選択中"){
        if(d.effect=="MP回復"){
            sound("heal");
            if(mynp==np){
        popTexts.push({value:`MP+${d.value}`,x:200,y:150,interval:0,color:"#7e7acc"});
                }else{
        popTexts.push({value:`MP+${d.value}`,x:700,y:150,interval:0,color:"#7e7acc"});
                }
            players[target].mp+=d.value;
        }
        if(d.effect=="回復"){
            sound("heal");
            if(mynp==np){
        popTexts.push({value:`HP+${d.value}`,x:200,y:150,interval:0,color:"#9bfea2"});
                }else{
        popTexts.push({value:`HP+${d.value}`,x:700,y:150,interval:0,color:"#9bfea2"});
                }
            players[target].hp+=d.value;
        }
        if(d.name=="馬券"){
            if(Math.round(Math.random())==0){
                sound("disiese");
            players[target].money+=(-1)*10;
                if(mynp==np){
        popTexts.push({value:`ハズレ`,x:200,y:150,interval:0,color:"#ff0000"});
                }else{
        popTexts.push({value:`ハズレ`,x:700,y:150,interval:0,color:"#ff0000"});
                }
                }else{
                sound("heal");
            players[target].money+=10;
                if(mynp==np){
        popTexts.push({value:`激アツ`,x:200,y:150,interval:0,color:"#9bd24d"});
                }else{
        popTexts.push({value:`激アツ`,x:700,y:150,interval:0,color:"#9bd24d"});
                }
                }
        }
        if(d.name=="毒キノコ"){
            sound("disiese");
            if(np==target){
        popTexts.push({value:`毒`,x:200,y:150,interval:0,color:"#9b00c5"});
                }else{
        popTexts.push({value:`毒`,x:700,y:150,interval:0,color:"#9b00c5"});
                }
            players[target].status.push("毒");
        }
        if(d.name=="徴税"){
            if(mynp!=target){
            sound("heal");
                }else{
                sound("disiese");
                }
            let m=(players[target].money/100)+1;
            players[np].money+=Math.round((players[target].money/2)*m);
            players[target].money+=(-1)*Math.round((players[target].money/2)*m);
        }
            if(d.name=="テラフォーミング"){
                sound("heal");
                players[target].maxCards+=2;
                pt("デッキ枚数+2","#2bbae1");
                if(players[target].maxCards>16){
                    players[target].maxCards=16;
                }
            }
            if(d.name=="透視メガネ"){
                sound("disiese");
                players[target].status.push("開示(一時的)");
                pt("開示","#9b00c5");
            }
            if(d.name=="スパイ衛星"){
                sound("disiese");
                for(let k=0; k<players.length; ++k){
                    if(k!=np){
                players[k].status.push("開示");
                        }
                }
                pt("開示","#9b00c5");
            }
            if(d.name=="金の時計"){
                sound("heal");
                let amount=Math.floor(players[target].money/5);
                players[target].money=0;
                players[target].maxCards+=amount;
                pt("デッキ枚数+"+amount,"#2bbae1");
                if(players[target].maxCards>16){
                    players[target].maxCards=16;
                }
            }
            if(d.name=="忘却"){
                sound("disiese");
                dDA(3,target);
                players[target].maxCards+=(-1)*3;
                pt("デッキ枚数-3","#ff0000");
                if(players[target].maxCards<1){
                    players[target].maxCards=1;
                }
            }
            if(d.name=="解毒薬"){
                let index=players[target].status.indexOf("毒");
                if(index!=-1){
                    sound("heal");
                pt("毒治療","#2bbae1");
                deleteDisiese(target,index);
                }
            }
            if(d.name=="抗生物質"){
                sound("heal");
                pt("治療","#2bbae1");
                players[target].status=[];
            }
            if(d.name=="呪い"){
                sound("disiese");
            pt("呪い","#9b00c5");
            players[target].status.push("呪い");
            }
            if(d.name=="ノースポール"){
                sound("disiese");
            pt("N極","#9b00c5");
            players[target].status.push("N極");
            }
            if(d.name=="サウスポール"){
                sound("disiese");
            pt("S極","#9b00c5");
            players[target].status.push("S極");
            }
            if(d.name=="安保条約"){
                sound("disiese");
                pt("安保条約","#9b00c5");
                players[target].status.push("安保|"+players[np].name);
            }
            if(d.name=="へそくり"){
                sound("heal");
                pt("+10円","#9bd24d");
                players[target].money+=10;
            }
            if(d.name=="自爆"){
                sound("detonate");
                popTexts.push({value:`999999ダメージ！`,x:200,y:150,interval:0,color:"#ff0000"});
                popTexts.push({value:`45ダメージ！`,x:700,y:150,interval:0,color:"#ff0000"});
                for(const p of players){
                if(p.id==np){
                    p.hp+=(-1)*999999;
                }else{
                    damage(-45,p.id);
                }
                }
            }
            if(d.name=="呪いのヒカマニ"){
                sound("disiese");
            let seed=Math.round(Math.random()*4);
            if(seed==0){
            pt("タタナイ","#9b00c5");
                }else if(seed==1){
                pt("許せんなぁ...許せんなぁ!!","#9b00c5");
                }else if(seed==2){
                pt("メッサムラムラ!?","#9b00c5");
                }else if(seed==3){
                pt("ピーチは抜ける","#9b00c5");
                }else if(seed==4){
                pt("出たー!出た!出たぁ…","#9b00c5");
                }else{
                pt("何を四天王？","#9b00c5");
                }
            players[target].status.push("ヒカマニ化");
            }
            if(d.name=="淫夢の呪い"){
                sound("デデドン");
                pt("デデドン(絶望)","#ff0000");
                players[target].status.push("ホモ");
            }
            if(d.name=="スーパーチャット"){
                sound("heal");
                popTexts.push({value:`-1円`,x:200,y:150,interval:0,color:"#ff0000"});
                popTexts.push({value:`+1円`,x:700,y:150,interval:0,color:"#9bd24d"});
                connection.send(`チャット:<label class="red">${players[np].name}¥10,000 ${players[target].name}さん応援してます！</label>`);
                players[np].money+=(-1);
                players[target].money+=1;
            }
            if(d.name=="散弾銃"){
                sound("damage");
                pt("5ダメージ！","#ff0000");
                for(const p of players){
                    if(p.id!=np){
                    damage(-5,p.id);
                    }
                }
            }
        }
    }
}
function randomTarget(){
    let index=-1;
    let loop=0;
    while(index==-1 || players[index].status.indexOf("負け")!=-1 || players[index].id==mynp){
        loop++;
        index=Math.round(Math.random()*(players.length-1));
        if(loop>1000){
            index=mynp;
            break;
        }
    }
    target=index;
}
function deleteDisiese(i,index){
    players[i].status.push("dammy");
    players[i].status.length=players[i].status.copyWithin(index,players[i].status.length-1).length-1;
    players[i].status.length=players[i].status.copyWithin(index,index+1).length-1;
}
function deleteDeck(index){
    decks.push("dammy");
    decks.length=decks.copyWithin(index,decks.length-1).length-1;
    decks.length=decks.copyWithin(index,index+1).length-1;
}
function dDA(a,o){
    for(let k=0; k<a; ++k){
        let index=decks.findIndex((e)=>e.owner==o);
    if(index!=-1){
    deleteDeck(index);
        }
    }
}
function pt(v,c){
    if(np==target){
        popTexts.push({value:v,x:200,y:150,interval:0,color:c});
                }else{
        popTexts.push({value:v,x:700,y:150,interval:0,color:c});
                }
}
function reorganizeDeck(np){
    let index=100;
    while(index>-1){
    index=decks.findIndex((e)=>e.owner==np);
    deleteDeck(index);
        }
    updateDeck(np);
}
function testDeads(){
    let d=0;
    for(const p of players){
        if(p.status.indexOf("負け")!=-1){
            d++;
        }
    }
    return d;
}
function damage(x,p){
    if(players[p].status.indexOf("呪い")!=-1){
        x+=x;
    }
    let i=-1;
    let index=0;
    for(const u of players[p].status){
        if(u.indexOf("安保|")!=-1){
            i=index;
        }
        index++;
    }
    if(i!=-1){
    players[p].money+=x;
        }else{
    players[p].hp+=x;
        }
    if(players[p].hp<0){
        players[p].hp=0;
        }
}
function restartGame(){
    for(const p of players){
        p.status=[];
        p.hp=20;
        p.mp=15;
        p.money=10;
        p.job="無";
        p.maxCards=9;
    }
    exchangePlayerInformation();
    for(const p of players){
    reorganizeDeck(p.id);
    }
    connection.send("リセット");
}
