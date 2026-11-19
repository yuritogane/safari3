import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

type Question = { animal: string; food: string; emoji: string; hint: string };
const QUESTION_BANK: Question[] = [
{animal:"キリン",food:"き",emoji:"🦒",hint:"木の高いところにある葉っぱが大好き"},
{animal:"シマウマ",food:"くさ",emoji:"🦓",hint:"草原の草を食べるよ"},
{animal:"ライオン",food:"にく",emoji:"🦁",hint:"ほかの動物のお肉を食べるよ"},
{animal:"カバ",food:"くさ",emoji:"🦛",hint:"夜に草をたくさん食べるよ"},
{animal:"チーター",food:"にく",emoji:"🐆",hint:"すばやく狩りをする肉食動物"},
{animal:"ゾウ",food:"き",emoji:"🐘",hint:"木の葉や枝も食べるよ"},
{animal:"サル",food:"ばなな",emoji:"🐒",hint:"黄色くて甘い果物"},
{animal:"パンダ",food:"ささ",emoji:"🐼",hint:"笹をむしゃむしゃ"},
{animal:"コアラ",food:"ゆーかり",emoji:"🐨",hint:"特別な木の葉が大好物"},
{animal:"ウサギ",food:"にんじん",emoji:"🐰",hint:"オレンジ色の野菜"},
{animal:"ラクダ",food:"くさ",emoji:"🐫",hint:"砂漠でも食べられる植物"},
{animal:"フラミンゴ",food:"えび",emoji:"🦩",hint:"水辺の小さな生き物"},
{animal:"カンガルー",food:"くさ",emoji:"🦘",hint:"草や葉を食べるよ"},
{animal:"オウム",food:"たね",emoji:"🦜",hint:"木の実や種が好き"},
{animal:"ワニ",food:"にく",emoji:"🐊",hint:"魚や動物を食べるよ"},
{animal:"ペンギン",food:"さかな",emoji:"🐧",hint:"海で魚を捕まえるよ"},
{animal:"イルカ",food:"さかな",emoji:"🐬",hint:"海の中で泳いで捕まえる"},
{animal:"クジラ",food:"ぷらんくとん",emoji:"🐳",hint:"海に漂う小さな生き物"},
{animal:"アザラシ",food:"さかな",emoji:"🦭",hint:"海で魚を食べるよ"},
{animal:"ハリネズミ",food:"むし",emoji:"🦔",hint:"小さな虫を探して食べる"},
{animal:"リス",food:"どんぐり",emoji:"🐿️",hint:"秋に集める木の実"},
{animal:"シカ",food:"はっぱ",emoji:"🦌",hint:"木の葉や草を食べる"},
{animal:"オオカミ",food:"にく",emoji:"🐺",hint:"群れで狩りをする"},
{animal:"キツネ",food:"ねずみ",emoji:"🦊",hint:"小さな動物を捕まえる"},
{animal:"クマ",food:"はちみつ",emoji:"🐻",hint:"甘いものが好きなイメージ"},
{animal:"トラ",food:"にく",emoji:"🐯",hint:"大型の肉食動物"},
{animal:"ヒツジ",food:"くさ",emoji:"🐑",hint:"牧草を食べるよ"},
{animal:"ヤギ",food:"はっぱ",emoji:"🐐",hint:"木の葉も食べるよ"},
{animal:"ウシ",food:"くさ",emoji:"🐄",hint:"牧草をもぐもぐ"},
{animal:"ブタ",food:"いも",emoji:"🐷",hint:"野菜や穀物などを食べる"},
{animal:"ニワトリ",food:"こめ",emoji:"🐔",hint:"穀物をついばむ"},
{animal:"アヒル",food:"こめ",emoji:"🦆",hint:"穀物や水草を食べる"},
{animal:"カメ",food:"はっぱ",emoji:"🐢",hint:"草や葉を食べる種類もいる"},
{animal:"カエル",food:"はえ",emoji:"🐸",hint:"飛んでいる虫を捕まえる"},
{animal:"ヘビ",food:"ねずみ",emoji:"🐍",hint:"小動物を丸のみすることも"},
{animal:"フクロウ",food:"ねずみ",emoji:"🦉",hint:"夜に小動物を捕まえる"},
{animal:"タカ",food:"ねずみ",emoji:"🦅",hint:"空から獲物を見つける"},
{animal:"ペリカン",food:"さかな",emoji:"🦤",hint:"大きなくちばしで魚を捕る"},
{animal:"カワウソ",food:"さかな",emoji:"🦦",hint:"水辺で魚を捕まえる"},
{animal:"ビーバー",food:"き",emoji:"🦫",hint:"樹皮や木の葉を食べる"},
{animal:"モルモット",food:"にんじん",emoji:"🐹",hint:"野菜も大好き"},
{animal:"ハムスター",food:"たね",emoji:"🐹",hint:"小さな種をほお袋へ"},
{animal:"ネコ",food:"さかな",emoji:"🐱",hint:"魚のイメージがあるね"},
{animal:"イヌ",food:"にく",emoji:"🐶",hint:"肉を使ったごはん"},
{animal:"ミツバチ",food:"みつ",emoji:"🐝",hint:"花から集める甘いもの"},
{animal:"チョウ",food:"みつ",emoji:"🦋",hint:"花の蜜を吸うよ"},
{animal:"アリ",food:"さとう",emoji:"🐜",hint:"甘いものに集まる"},
{animal:"カブトムシ",food:"じゅえき",emoji:"🪲",hint:"木から出る甘い液"},
{animal:"クワガタ",food:"じゅえき",emoji:"🪲",hint:"樹液が大好き"},
{animal:"カタツムリ",food:"はっぱ",emoji:"🐌",hint:"雨の日に葉っぱを食べる"},
{animal:"タコ",food:"かに",emoji:"🐙",hint:"海底の甲殻類"},
{animal:"カニ",food:"こけ",emoji:"🦀",hint:"種類によっていろいろ食べる"},
{animal:"エビ",food:"こけ",emoji:"🦐",hint:"水中の小さなものを食べる"},
{animal:"サメ",food:"さかな",emoji:"🦈",hint:"海の捕食者"},
{animal:"マンボウ",food:"くらげ",emoji:"🐟",hint:"柔らかい海の生き物"},
{animal:"カメレオン",food:"むし",emoji:"🦎",hint:"長い舌で虫を捕まえる"},
{animal:"イグアナ",food:"はっぱ",emoji:"🦎",hint:"植物を食べる種類"},
{animal:"アルパカ",food:"くさ",emoji:"🦙",hint:"草をもぐもぐ"},
{animal:"ロバ",food:"くさ",emoji:"🐴",hint:"草や干し草を食べる"},
{animal:"ウマ",food:"にんじん",emoji:"🐴",hint:"大好きな野菜の定番"},
{animal:"ポニー",food:"くさ",emoji:"🐴",hint:"草や牧草を食べる"},
{animal:"ダチョウ",food:"たね",emoji:"🦤",hint:"植物や種を食べる"},
{animal:"レッサーパンダ",food:"ささ",emoji:"🦝",hint:"竹や笹も食べるよ"},
{animal:"マンドリル",food:"くだもの",emoji:"🐵",hint:"色々な果物"},
{animal:"ゴリラ",food:"はっぱ",emoji:"🦍",hint:"植物が中心の食事"},
{animal:"オランウータン",food:"くだもの",emoji:"🦧",hint:"森の果物が大好き"},
{animal:"ナマケモノ",food:"はっぱ",emoji:"🦥",hint:"ゆっくり葉っぱを食べる"},
{animal:"アリクイ",food:"あり",emoji:"🐾",hint:"長い舌で集める虫"},
{animal:"ミーアキャット",food:"むし",emoji:"🐾",hint:"小さな虫を探す"},
{animal:"プレーリードッグ",food:"くさ",emoji:"🐿️",hint:"草原の植物"},
{animal:"マウス",food:"こめ",emoji:"🐭",hint:"穀物が好き"},
{animal:"モモンガ",food:"くだもの",emoji:"🐿️",hint:"果物や木の芽"},
{animal:"ヤマアラシ",food:"き",emoji:"🦔",hint:"木の皮や植物"},
{animal:"オポッサム",food:"くだもの",emoji:"🐾",hint:"果物も食べる"},
{animal:"バク",food:"はっぱ",emoji:"🐾",hint:"森の葉っぱ"},
{animal:"サイ",food:"くさ",emoji:"🦏",hint:"草を食べる大型動物"},
{animal:"ヌー",food:"くさ",emoji:"🐃",hint:"草原を移動して草を食べる"},
{animal:"ガゼル",food:"くさ",emoji:"🦌",hint:"草や葉っぱ"},
{animal:"インパラ",food:"はっぱ",emoji:"🦌",hint:"草と木の葉"},
{animal:"ハイエナ",food:"にく",emoji:"🐾",hint:"肉を食べる動物"},
{animal:"ジャッカル",food:"にく",emoji:"🐺",hint:"小動物や肉"},
{animal:"ヒョウ",food:"にく",emoji:"🐆",hint:"木にも登るハンター"},
{animal:"ピューマ",food:"にく",emoji:"🐆",hint:"山や森の肉食動物"},
{animal:"オセロット",food:"ねずみ",emoji:"🐆",hint:"小動物を捕まえる"},
{animal:"マングース",food:"むし",emoji:"🐾",hint:"虫や小動物"},
{animal:"コウモリ",food:"むし",emoji:"🦇",hint:"虫を食べる種類"},
{animal:"ツバメ",food:"はえ",emoji:"🐦",hint:"飛ぶ虫を捕まえる"},
{animal:"スズメ",food:"たね",emoji:"🐦",hint:"小さな種をついばむ"},
{animal:"ハト",food:"こめ",emoji:"🕊️",hint:"穀物を食べる"},
{animal:"カラス",food:"くだもの",emoji:"🐦‍⬛",hint:"色々な食べ物"},
{animal:"キツツキ",food:"むし",emoji:"🐦",hint:"木の中の虫"},
{animal:"シロクマ",food:"さかな",emoji:"🐻‍❄️",hint:"氷の海で魚などを捕る"},
{animal:"ペンギン",food:"いわし",emoji:"🐧",hint:"小さな魚"},
{animal:"マッコウクジラ",food:"いか",emoji:"🐳",hint:"深い海の大きな獲物"},
{animal:"シャチ",food:"あざらし",emoji:"🐋",hint:"海の強いハンター"},
{animal:"ウミガメ",food:"くらげ",emoji:"🐢",hint:"種類によって食べるものが違う"},
{animal:"ラッコ",food:"うに",emoji:"🦦",hint:"お腹で石を使って割ることも"},
{animal:"トド",food:"さかな",emoji:"🦭",hint:"海で魚を捕る"},
{animal:"アシカ",food:"さかな",emoji:"🦭",hint:"魚やイカを食べる"},
{animal:"オオトカゲ",food:"にく",emoji:"🦎",hint:"小動物を捕まえる"},
{animal:"ヤモリ",food:"むし",emoji:"🦎",hint:"家の周りの虫"},
{animal:"トカゲ",food:"むし",emoji:"🦎",hint:"小さな虫を食べる"},
{animal:"サンショウウオ",food:"むし",emoji:"🐾",hint:"水辺の小さな生き物"},
{animal:"イモリ",food:"むし",emoji:"🐾",hint:"水中の虫など"},
{animal:"ピラニア",food:"さかな",emoji:"🐟",hint:"魚や小動物"},
{animal:"金魚",food:"こめ",emoji:"🐠",hint:"魚用の餌"},
{animal:"ニシキゴイ",food:"こめ",emoji:"🐟",hint:"池で餌を食べる"},
{animal:"メダカ",food:"ぷらんくとん",emoji:"🐟",hint:"水中の小さな生き物"},
{animal:"カワセミ",food:"さかな",emoji:"🐦",hint:"水に飛び込んで捕まえる"},
{animal:"ペンギン",food:"えび",emoji:"🐧",hint:"魚やエビなど"},
{animal:"キリン",food:"はっぱ",emoji:"🦒",hint:"長い首で葉っぱを食べる"},
{animal:"ゾウ",food:"くだもの",emoji:"🐘",hint:"果物も大好き"},
{animal:"サル",food:"りんご",emoji:"🐒",hint:"赤くて甘い果物"},
{animal:"クマ",food:"さかな",emoji:"🐻",hint:"川で魚を捕ることも"},
{animal:"シカ",food:"どんぐり",emoji:"🦌",hint:"森の木の実"},
{animal:"カバ",food:"くさ",emoji:"🦛",hint:"草をたくさん食べる"},
{animal:"チーター",food:"にく",emoji:"🐆",hint:"狩りで捕まえた獲物"}
];
const QUESTIONS: Question[] = QUESTION_BANK.slice(0, 100);
const KANA = [
 ["あ","い","う","え","お"],["か","き","く","け","こ"],["さ","し","す","せ","そ"],
 ["た","ち","つ","て","と"],["な","に","ぬ","ね","の"],["は","ひ","ふ","へ","ほ"],
 ["ま","み","む","め","も"],["や","（）","ゆ","（）","よ"],["ら","り","る","れ","ろ"],
 ["わ","を","ん","ー","。"],["が","ぎ","ぐ","げ","ご"],["ざ","じ","ず","ぜ","ぞ"],
 ["だ","ぢ","づ","で","ど"],["ば","び","ぶ","べ","ぼ"],["ぱ","ぴ","ぷ","ぺ","ぽ"]
];
const animals = ["🦒","🦓","🦁","🐘","🦛","🐆","🦘","🐒","🦏","🐃","🦜","🦩","🐫","🦌","🐊"];
function shuffle<T>(items:T[]) { return [...items].sort(()=>Math.random()-0.5); }
function toHiragana(text:string) { return text.replace(/[ァ-ン]/g, ch => String.fromCharCode(ch.charCodeAt(0)-0x60)); }

export default function App() {
 const [playing,setPlaying]=useState(false);
 const [time,setTime]=useState(60);
 const [score,setScore]=useState(0);
 const [correct,setCorrect]=useState(0);
 const [question,setQuestion]=useState<Question>(QUESTIONS[0]);
 const [typed,setTyped]=useState("");
 const [message,setMessage]=useState("スタートボタンを押してね！");
 const [finished,setFinished]=useState(false);
 const [celebrate,setCelebrate]=useState(false);
 const [animalPositions,setAnimalPositions]=useState<number[]>([0,1,2,3,4]);
 const timerRef=useRef<number|null>(null);
 const questionDeck=useRef<Question[]>([]);
 const deckIndex=useRef(0);
 const touchStart=useRef<{x:number;y:number}|null>(null);

 const nextQuestion=()=>{
   const deck=questionDeck.current;
   if(deckIndex.current>=deck.length){questionDeck.current=shuffle(QUESTIONS);deckIndex.current=0;}
   const q=questionDeck.current[deckIndex.current++];
   setQuestion(q);setTyped("");setMessage("動物の名前をフリック入力しよう！");
 };
 const startGame=()=>{
   questionDeck.current=shuffle(QUESTIONS);deckIndex.current=0;
   setScore(0);setCorrect(0);setTime(60);setFinished(false);setCelebrate(false);setPlaying(true);
   setMessage("動物の名前をフリック入力しよう！");
   nextQuestion();
 };
 useEffect(()=>{
   if(!playing)return;
   timerRef.current=window.setInterval(()=>{
     setTime(t=>{
       if(t<=1){setPlaying(false);setFinished(true);return 0;}
       return t-1;
     });
   },1000);
   return ()=>{if(timerRef.current)window.clearInterval(timerRef.current);};
 },[playing]);
 useEffect(()=>{
   const timers = animals.map((_, i) => window.setInterval(() => {
     setAnimalPositions(p => p.map((pos, j) => j === i ? 8 + Math.random() * 82 : pos));
   }, 4200 + i * 1150));
   return () => timers.forEach(window.clearInterval);
 },[]);
 const addKana=(kana:string)=>{
   if(!playing||kana==="（）")return;
   const next=typed+kana;
   setTyped(next);
   if(next===toHiragana(question.animal)){
     setScore(s=>s+10);setCorrect(c=>c+1);setMessage(`せいかい！ ${question.emoji} ${question.animal}もよろこんでいるよ！`);
     if(correct+1>=10){setPlaying(false);setFinished(true);setCelebrate(true);setTime(t=>t);return;}
     window.setTimeout(nextQuestion,450);
   }else if(!toHiragana(question.animal).startsWith(next)){
     // 入力を勝手に消さず、プレイヤーが「けす」で修正できるようにする
     setMessage("ちがう文字みたい！「けす」で直してみよう");
   }else{
     setMessage("いい調子！ あと少しだよ！");
   }
 };
 const swipeKana=(e:React.PointerEvent<HTMLButtonElement>,row:string[])=>{
   if(!touchStart.current)return;
   const dx=e.clientX-touchStart.current.x,dy=e.clientY-touchStart.current.y;
   const threshold=20;
   let index=0;
   if(Math.abs(dx)>Math.abs(dy)){index=dx>threshold?3:dx< -threshold?1:0;}
   else {index=dy>threshold?4:dy< -threshold?2:0;}
   addKana(row[index]);
   touchStart.current=null;
 };
 const handleKeyPointerDown=(e:React.PointerEvent<HTMLButtonElement>)=>{
   e.preventDefault();
   touchStart.current={x:e.clientX,y:e.clientY};
 };
 const handleKeyPointerUp=(e:React.PointerEvent<HTMLButtonElement>,row:string[])=>{
   e.preventDefault();
   swipeKana(e,row);
 };
 const animalsMoving=useMemo(()=>animals.map((emoji,i)=>({emoji,i})),[]);
 return <main className="game-shell">
  <div className="sun"></div><div className="cloud cloud-one">☁</div><div className="cloud cloud-two">☁</div>
  <header className="game-header">
   <div className="brand"><span>🌞</span><div><small>SAFARI FLICK</small><h1>どうぶつフリック！</h1></div></div>
   <div className="stats">
    <div className="stat timer"><small>のこり時間</small><strong>⏱ {time}<small>秒</small></strong></div>
    <div className="stat score"><small>スコア</small><strong>⭐ {score}<small>点</small></strong></div>
    <div className="stat count"><small>せいかい</small><strong>{correct}<small>/10</small></strong></div>
   </div>
  </header>
  <section className="savanna">
   <div className="mountains"></div><div className="tree tree-left">🌳</div><div className="tree tree-right">🌳</div>
   <div className="ground"></div>
   <div className="animal-runners">{animalsMoving.map(({emoji,i})=><span key={i} className={`runner runner-${i}`} style={{left:`${animalPositions[i%5]}%`}}>{emoji}</span>)}</div>
   <div className="question-card">
    <div className="question-title">この動物の名前は？</div>
    <div className="animal-big">{question.emoji}</div>
    <div className="answer-slots">{toHiragana(question.animal).split("").map((_,i)=><span key={i} className={typed[i]?"filled":""}>{typed[i]||"＿"}</span>)}</div>
    <div className="hint">💡 動物の名前をひらがなで入力しよう！</div>
   </div>
   <div className="message">{message}</div>
  </section>
  <section className="keyboard-area">
   <div className="keyboard-heading"><span>👆 フリックして文字を入力</span><button onClick={()=>setTyped(t=>t.slice(0,-1))} disabled={!playing||!typed}>⌫ 1文字けす</button></div>
   <div className="kana-grid">
    {KANA.map((row,i)=><button className="kana-key" key={i} onPointerDown={handleKeyPointerDown} onPointerUp={e=>handleKeyPointerUp(e,row)} onPointerCancel={()=>{touchStart.current=null;}}>{row[0]}<small>↑{row[2]} ←{row[1]} →{row[3]} ↓{row[4]}</small></button>)}
   </div>
   <div className="bottom-actions">
    {!playing?<button className="start-button" onClick={startGame}>{finished?"🔄 もう一度挑戦！":"▶ ゲームスタート！"}</button>:<button className="giveup-button" onClick={()=>{setPlaying(false);setFinished(true);}}>ゲーム終了</button>}
   </div>
  </section>
  {finished&&<div className="result-overlay"><div className="result-card">
   {celebrate?<><div className="confetti">🎊🎉🎊</div><div className="kusudama">🎊</div><h2>やったね！</h2><h3>動物博士！ 天才！</h3><p>10問ぜんぶ正解！すごいね！</p></>:<><h2>ゲーム終了！</h2><p>よくがんばったね！</p></>}
   <div className="final-score">⭐ {score} 点 <span>{correct}/10問</span></div>
   <button className="start-button" onClick={startGame}>🔁 もう一度挑戦する</button>
  </div></div>}
  <footer>🌿 どうぶつたちと楽しくフリック！ 🌿</footer>
 </main>;
}
