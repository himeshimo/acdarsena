import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function Icon({ children, size = 24, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function Anchor({ size, className }) {
  return <Icon size={size} className={className}><path d="M12 2v20" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><path d="M8 7h8" /><circle cx="12" cy="5" r="3" /></Icon>;
}

function ChevronRight({ size, className }) {
  return <Icon size={size} className={className}><path d="m9 18 6-6-6-6" /></Icon>;
}

function Shield({ size, className }) {
  return <Icon size={size} className={className}><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" /></Icon>;
}

function Users({ size, className }) {
  return <Icon size={size} className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
}

function X({ size, className }) {
  return <Icon size={size} className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>;
}

const basePlayers = [
  { number: 1, positionGroup: "GK", position: "GK", subPositions: [], firstName: "Elia", lastName: "Caprile", displayName: "Elia Caprile", image: "./players/caprile.webp", age: 26, overall: 82, preferredFoot: "右", wage: "€21,500", nationality: "イタリア", status: "Squad", note: "", role: "守備文化の基準点", bio: "Darsenaの最後方を支える正GK。派手な主役ではなく、チーム全体に落ち着きと信頼を与える存在。" },
  { number: 2, positionGroup: "DF", position: "CB", subPositions: ["RB", "CDM"], firstName: "Enrico", lastName: "Delprato", displayName: "Enrico Delprato", image: "./players/delprato.webp", age: 28, overall: 78, preferredFoot: "右", wage: "€21,000", nationality: "イタリア", status: "Summer Signing", note: "夏加入", role: "実直な新戦力", bio: "CB、RB、CDMをこなす万能DF。夏加入組らしく、Darsenaの守備構造に厚みを加える。" },
  { number: 3, positionGroup: "DF", position: "CB", subPositions: ["CM"], firstName: "Andrea", lastName: "Guidi", displayName: "Andrea Guidi", image: "", age: 34, overall: 74, preferredFoot: "右", wage: "€16,000", nationality: "イタリア", status: "Captain", note: "", role: "The Soul", bio: "Not measured by minutes or ratings. He carries Darsena's history and culture." },
  { number: 4, positionGroup: "DF", position: "LB", subPositions: ["LM", "CM"], firstName: "Alexander", lastName: "Prass", displayName: "Alexander Prass", image: "./players/alexander-prass.webp", age: 26, overall: 78, preferredFoot: "左", wage: "€22,000", nationality: "オーストリア", status: "Squad", note: "", role: "左の前進装置", bio: "LBから中盤までこなす左利きのマルチロール。守備だけでなく、攻撃の出口としても機能する。" },
  { number: 6, positionGroup: "MF", position: "CDM", subPositions: ["CB"], firstName: "Gabriele", lastName: "Monti", displayName: "Gabriele Monti", image: "", age: 30, overall: 70, preferredFoot: "右", wage: "€8,000", nationality: "イタリア", status: "Squad", note: "", role: "守備の締め役", bio: "派手さはないが、試合を閉じるために必要な選手。ベンチに置いておきたい“保険”のような存在。" },
  { number: 7, positionGroup: "FW", position: "LM", subPositions: ["RM", "LW"], firstName: "Bénie", lastName: "Traoré", displayName: "Bénie Traoré", image: "./players/traore.webp", age: 25, overall: 81, preferredFoot: "右", wage: "€84,000", nationality: "コートジボワール", status: "Squad", note: "", role: "The Spark", bio: "The main attacking trigger. Breaks lines and creates Openda's route to goal." },
  { number: 8, positionGroup: "MF", position: "CM", subPositions: ["CDM"], firstName: "Ismaël", lastName: "Koné", displayName: "Ismaël Koné", image: "./players/ismael-kone.webp", age: 25, overall: 78, preferredFoot: "右", wage: "€21,500", nationality: "カナダ", status: "Squad", note: "", role: "中央の推進力", bio: "Darsenaの中盤に強度と前進力をもたらすCM。守備と攻撃の接続役として重要。" },
  { number: 9, positionGroup: "FW", position: "ST", subPositions: [], firstName: "Loïs", lastName: "Openda", displayName: "Loïs Openda", image: "./players/openda.webp", age: 28, overall: 84, preferredFoot: "右", wage: "€95,000", nationality: "ベルギー", status: "Summer Signing", note: "夏加入", role: "The Finisher", bio: "The new ace who decides games. His finishing pushes Darsena into title pace." },
  { number: 11, positionGroup: "FW", position: "ST", subPositions: [], firstName: "Mërgim", lastName: "Berisha", displayName: "Mërgim Berisha", image: "./players/mergim-berisha.webp", age: 29, overall: 75, preferredFoot: "右", wage: "€22,000", nationality: "ドイツ", status: "Squad", note: "", role: "ボックス内の仕事人", bio: "万能型のストライカー。派手なスピードよりも、ゴール前での判断と収まりで勝負する。" },
  { number: 12, positionGroup: "GK", position: "GK", subPositions: [], firstName: "Sam", lastName: "Karssies", displayName: "Sam Karssies", image: "./players/sam-karssies.webp", age: 25, overall: 63, preferredFoot: "右", wage: "€3,000", nationality: "オランダ", status: "Summer Signing", note: "夏加入", role: "控えGK／準備の男", bio: "夏に加入したバックアップGK。出番は限られるが、長いシーズンを支えるための重要な保険。" },
  { number: 14, positionGroup: "MF", position: "CDM", subPositions: ["CB"], firstName: "Kylian", lastName: "Kaïboué", displayName: "Kylian Kaïboué", image: "./players/kylian-kaiboue.webp", age: 30, overall: 75, preferredFoot: "左", wage: "€13,000", nationality: "フランス", status: "Vice Captain", note: "", role: "The Structure", bio: "The center of balance and calm. Kaiboue is the structure Darsena stands on." },
  { number: 15, positionGroup: "DF", position: "LB", subPositions: ["LM"], firstName: "Pedro", lastName: "Silva Torrejón", displayName: "Pedro Silva Torrejón", image: "./players/pedro-silva-torrejon.webp", age: 31, overall: 74, preferredFoot: "左", wage: "€12,500", nationality: "アルゼンチン", status: "Squad", note: "", role: "左足のクロッサー", bio: "左サイドから質のあるボールを供給するベテラン。守備の軽さはあるが、攻撃面では違いを作れる。" },
  { number: 16, positionGroup: "DF", position: "CB", subPositions: [], firstName: "Patric", lastName: "Pfeiffer", displayName: "Patric Pfeiffer", image: "./players/patric-pfeiffer.webp", age: 28, overall: 74, preferredFoot: "右", wage: "€12,000", nationality: "ガーナ", status: "Squad", note: "", role: "制空権担当", bio: "高さとフィジカルで最終ラインを支えるCB。Darsenaの“壊れない守備”に必要な壁。" },
  { number: 20, positionGroup: "FW", position: "RW", subPositions: ["ST", "CAM"], firstName: "Vicente", lastName: "Varela", displayName: "Vicente Varela", image: "", age: 21, overall: 73, preferredFoot: "右", wage: "€7,600", nationality: "スペイン", status: "Prospect", note: "", role: "若き万能アタッカー", bio: "RW、ST、CAMをこなせる21歳。攻撃の複数ポジションで起用できる便利さが魅力。" },
  { number: 21, positionGroup: "DF", position: "CB", subPositions: [], firstName: "Joshua", lastName: "Quarshie", displayName: "Joshua Quarshie", image: "./players/joshua-quarshie.webp", age: 24, overall: 75, preferredFoot: "右", wage: "€12,000", nationality: "ドイツ", status: "Squad", note: "", role: "次世代の守備柱", bio: "若さとサイズを兼ね備えたCB。今後のDarsena守備陣を担う存在として期待される。" },
  { number: 24, positionGroup: "DF", position: "RB", subPositions: ["CB"], firstName: "Junnosuke", lastName: "Suzuki", displayName: "Junnosuke Suzuki", image: "./players/junnosuke-suzuki.webp", age: 25, overall: 74, preferredFoot: "右", wage: "€15,000", nationality: "日本", status: "Summer Signing", note: "夏加入", role: "右サイドの規律", bio: "夏加入の日本人DF。右サイドに安定感をもたらし、状況次第ではCBとしてもチームを支える。" },
  { number: 25, positionGroup: "DF", position: "LB", subPositions: ["LM"], firstName: "Aarón", lastName: "Martín", displayName: "Aarón Martín", image: "./players/aaron-martin.webp", age: 31, overall: 74, preferredFoot: "左", wage: "€18,500", nationality: "スペイン", status: "Summer Signing", note: "夏加入", role: "経験ある左の選択肢", bio: "夏に加わったスペイン人SB。即戦力として左サイドの競争を高める。" },
  { number: 27, positionGroup: "FW", position: "RW", subPositions: ["CAM", "CM", "RM"], firstName: "Mateus", lastName: "Mané", displayName: "Mateus Mané", image: "./players/matheus-mane.webp", age: 20, overall: 75, preferredFoot: "右", wage: "€7,000", nationality: "ポルトガル", status: "Prospect", note: "", role: "攻撃の変化球", bio: "右サイド、中央、インサイドでプレーできる若手。試合にリズムの変化を加えられる存在。" },
  { number: 30, positionGroup: "MF", position: "CM", subPositions: [], firstName: "Nicholas", lastName: "Fiore", displayName: "Nicholas Fiore", image: "", age: 19, overall: 73, preferredFoot: "右", wage: "€7,100", nationality: "イタリア", status: "Academy", note: "", role: "未来の中盤", bio: "19歳ながら試合に絡めるだけの能力を持つ若手CM。Darsenaの次世代を象徴する存在。" },
  { number: 31, positionGroup: "MF", position: "CAM", subPositions: ["CM"], firstName: "Massimo", lastName: "Bianchi", displayName: "Massimo Bianchi", image: "", age: 18, overall: 66, preferredFoot: "右", wage: "€4,500", nationality: "イタリア", status: "Academy", note: "", role: "創造性の原石", bio: "18歳のCAM。まだ完成度は低いが、中央で違いを作れる可能性を秘めている。" },
  { number: 32, positionGroup: "DF", position: "CB", subPositions: [], firstName: "Jonathan", lastName: "Marechal", displayName: "Jonathan Marechal", image: "", age: 18, overall: 63, preferredFoot: "右", wage: "€4,200", nationality: "フランス", status: "Academy", note: "", role: "育成枠CB", bio: "18歳の若きCB。まだ粗さはあるが、Darsenaの守備文化を吸収して成長を狙う。" },
  { number: 33, positionGroup: "FW", position: "ST", subPositions: ["LW", "RW"], firstName: "Tommaso", lastName: "Bianchi", displayName: "Tommaso Bianchi", image: "", age: 21, overall: 64, preferredFoot: "左", wage: "€600", nationality: "イタリア", status: "Prospect", note: "", role: "控えの若き9番", bio: "21歳の左利きFW。現状は序列下位だが、限られた出番で爪痕を残したい。" },
  { number: 35, positionGroup: "DF", position: "RB", subPositions: [], firstName: "Fabrice", lastName: "Billard", displayName: "Fabrice Billard", image: "", age: 18, overall: 60, preferredFoot: "左", wage: "€2,500", nationality: "フランス", status: "Academy Promotion", note: "夏昇格", role: "昇格組の挑戦者", bio: "夏にトップ昇格した若手RB。出場機会を得ながら、プロの強度に適応していく段階。" },
  { number: 39, positionGroup: "FW", position: "ST", subPositions: [], firstName: "Shaqueel", lastName: "van Persie", displayName: "Shaqueel van Persie", image: "./players/shaqueel-van-persie.webp", age: 21, overall: 69, preferredFoot: "左", wage: "€3,000", nationality: "オランダ", status: "Prospect", note: "", role: "結果で語る若手", bio: "短い時間でもゴールに絡める若手ST。序列を上げるには、内容よりまず結果が求められる。" },
  { number: null, positionGroup: "FW", position: "ST", subPositions: [], firstName: "Emil", lastName: "Højlund", displayName: "Emil Højlund", image: "./players/emil-hojlund.webp", age: 23, overall: 74, preferredFoot: "右", wage: "€1,300", nationality: "デンマーク", status: "On Loan", note: "レンタル移籍 / 旧背番号9", role: "武者修行中のCF", bio: "ポストプレーと連係に可能性を持つストライカー。レンタル先で得点感覚と自信を磨きたい。" },
  { number: null, positionGroup: "MF", position: "CAM", subPositions: [], firstName: "Jan", lastName: "Lehmann", displayName: "Jan Lehmann", image: "", age: 20, overall: 66, preferredFoot: "左", wage: "€450", nationality: "スイス", status: "On Loan", note: "レンタル移籍 / 旧背番号29", role: "育成中の司令塔", bio: "若きCAM。実戦経験を積み、Darsenaに戻る価値を証明するレンタル期間になる。" },
];

const playerSheetOverrides = {
  "Elia Caprile": { height: 191, status: "Vice Captain" },
  "Enrico Delprato": { height: 183 },
  "Andrea Guidi": {
    height: 185,
    status: "Captain",
    role: "バンディエラ",
    bio: "クラブの象徴。衰えはあるが、経験と判断でチームを締める静かなリーダー。",
  },
  "Alexander Prass": { height: 180 },
  "Gabriele Monti": { height: 181 },
  "Bénie Traoré": {
    height: 172,
    role: "サイドの切り札",
    bio: "左サイドを中心に違いを作るアタッカー。構造の中で自由を与えたとき、最も怖い存在になる。",
  },
  "Ismaël Koné": { height: 188, status: "Vice Captain" },
  "Loïs Openda": {
    height: 175,
    role: "新たなエース",
    bio: "夏に加入したDarsenaの新9番。爆発力と決定力で、チームに“勝ち切る力”を持ち込む。",
  },
  "Mërgim Berisha": { height: 188 },
  "Sam Karssies": { height: 186 },
  "Kylian Kaïboué": {
    height: 182,
    status: "Vice Captain",
    role: "守備の心臓",
    bio: "中盤の底で危険を潰す左利きの守備者。ステップアップの噂があっても、今のDarsenaには欠かせない。",
  },
  "Pedro Silva Torrejón": { height: 174 },
  "Patric Pfeiffer": { height: 196 },
  "Vicente Varela": { height: 173 },
  "Joshua Quarshie": { height: 196 },
  "Junnosuke Suzuki": { height: 183 },
  "Aarón Martín": { height: 178 },
  "Mateus Mané": { height: 175 },
  "Nicholas Fiore": { height: 184 },
  "Massimo Bianchi": { height: 177 },
  "Jonathan Marechal": { height: 189 },
  "Tommaso Bianchi": { height: 171 },
  "Fabrice Billard": { height: 180 },
  "Shaqueel van Persie": { height: 186 },
  "Emil Højlund": { height: 192 },
  "Jan Lehmann": { height: 173 },
};

const players = basePlayers.map((player) => ({
  ...player,
  ...(playerSheetOverrides[player.displayName] ?? {}),
}));

const headCoach = {
  name: "Alessio De Luca",
  title: "Head Coach",
  nationality: "イタリア",
  age: "45歳",
  style: "思考実験型 / 非テンプレ主義",
  philosophy: "正解を固定しない。状況ごとに選び続ける。",
  keywords: ["個より構造", "中央支配", "再現性重視", "守備は文化", "急がないが逃げない"],
  bio: "港湾都市ダルセナのクラブ哲学を体現する指揮官。テンプレートを嫌い、試合ごとに最適解を更新し続ける“思考実験型”の監督。ミスや遠回りも過程として受け入れ、チームに再現性と判断力を植え付けることを最優先とする。派手な攻撃ではなく、壊れない構造と中央の支配から試合を制御し、最小限のチャンスで仕留めるスタイルを貫く。",
};

const filters = ["All", "GK", "DF", "MF", "FW", "Staff"];
const statusTone = {
  Captain: "bg-darsena-red text-white",
  "Vice Captain": "border border-slate-500/40 bg-slate-800/70 text-slate-200",
  "Summer Signing": "bg-red-950 text-red-100 ring-1 ring-red-700/70",
  Academy: "bg-slate-800 text-slate-100",
  "Academy Promotion": "bg-red-950 text-red-100 ring-1 ring-red-700/70",
  "On Loan": "bg-zinc-800 text-zinc-200",
};
const hiddenStatuses = ["Squad", "Prospect"];

function getVisibleStatus(player) {
  return hiddenStatuses.includes(player.status) ? null : player.status;
}

function getActivePlayers() {
  return players.filter((player) => player.status !== "On Loan");
}

const nationalityCodes = {
  "イタリア": "ITA",
  "オーストリア": "AUT",
  "コートジボワール": "CIV",
  "カナダ": "CAN",
  "ベルギー": "BEL",
  "ドイツ": "GER",
  "オランダ": "NED",
  "フランス": "FRA",
  "アルゼンチン": "ARG",
  "ガーナ": "GHA",
  "スペイン": "ESP",
  "日本": "JPN",
  "イングランド": "ENG",
  "ポルトガル": "PRT",
  "デンマーク": "DEN",
  "スイス": "SUI",
};

function getNationalityCode(player) {
  return nationalityCodes[player.nationality] ?? player.nationality.slice(0, 3).toUpperCase();
}

function getCardNameDisplay(player) {
  if (player.displayName === "Aarón Martín") {
    return { first: "Martín", last: "AARÓN", invert: true };
  }

  return { first: player.firstName, last: player.lastName.toLocaleUpperCase(), invert: false };
}

function getModalNameDisplay(player) {
  return {
    first: player.firstName.toLocaleUpperCase(),
    last: player.lastName.toLocaleUpperCase(),
  };
}

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedRoster, setSelectedRoster] = useState([]);
  const loanPlayers = useMemo(() => players.filter((player) => player.status === "On Loan"), []);
  const keyPlayerNames = useMemo(() => ["Kylian Kaïboué", "Andrea Guidi", "Loïs Openda", "Bénie Traoré"], []);

  const visiblePlayers = useMemo(() => {
    if (activeFilter === "Staff") return [];
    if (activeFilter === "All") return getActivePlayers();
    return getActivePlayers().filter((player) => player.positionGroup === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    return filters.reduce((acc, filter) => {
      if (filter === "All") acc[filter] = getActivePlayers().length;
      else if (filter === "Staff") acc[filter] = 1;
      else acc[filter] = getActivePlayers().filter((player) => player.positionGroup === filter).length;
      return acc;
    }, {});
  }, []);

  const keyPlayers = useMemo(() => {
    const roster = getActivePlayers();
    return keyPlayerNames
      .map((name) => roster.find((player) => player.displayName === name))
      .filter(Boolean);
  }, [keyPlayerNames]);

  function openPlayer(player, roster) {
    setSelectedRoster(roster);
    setSelectedPlayer(player);
  }

  function moveSelectedPlayer(direction) {
    if (!selectedPlayer || selectedRoster.length < 2) return;
    const currentIndex = selectedRoster.findIndex((player) => player.displayName === selectedPlayer.displayName);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + direction + selectedRoster.length) % selectedRoster.length;
    setSelectedPlayer(selectedRoster[nextIndex]);
  }

  function goHome() {
    setActivePage("Home");
    setActiveFilter("All");
    setSelectedPlayer(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function switchPage(page) {
    setActivePage(page);
    setSelectedPlayer(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-darsena-navy text-slate-100">
      <SiteHeader activePage={activePage} onPageChange={switchPage} onHomeClick={goHome} />

      {activePage === "Home" ? (
        <HomePage
          keyPlayers={keyPlayers}
          onOpenPlayer={(player) => openPlayer(player, keyPlayers)}
          onPageChange={switchPage}
        />
      ) : null}

      {activePage === "Squad" ? (
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="border-b border-white/10 py-10">
          <p className="font-display text-sm uppercase tracking-[.28em] text-darsena-brass">First Team</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">Squad</h1>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-slate-300">2026-27 Season / Serie A</p>
          </div>
        </section>

        <div className="sticky top-0 z-20 -mx-4 border-y border-white/10 bg-darsena-navy/90 px-4 py-4 shadow-2xl shadow-black/30 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`group flex min-h-11 items-center gap-3 rounded-sm border px-4 text-sm font-bold uppercase tracking-[.18em] transition ${
                  activeFilter === filter
                    ? "border-darsena-red bg-darsena-red text-white shadow-lg shadow-red-950/50"
                    : "border-white/10 bg-white/[.04] text-slate-300 hover:border-red-500/70 hover:text-white"
                }`}
              >
                <span>{filter}</span>
                <span className={`text-xs ${activeFilter === filter ? "text-white" : "text-slate-500 group-hover:text-slate-200"}`}>{counts[filter]}</span>
              </button>
            ))}
          </div>
        </div>

        {activeFilter !== "Staff" ? (
          <>
            <SectionHeader eyebrow="First Team" title="選手名鑑" count={`${visiblePlayers.length} Profiles`} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visiblePlayers.map((player) => (
                <PlayerCard
                  key={`${player.displayName}-${player.number ?? "loan"}`}
                  player={player}
                  onClick={() => openPlayer(player, visiblePlayers)}
                />
              ))}
            </div>
          </>
        ) : null}

        {activeFilter === "All" && (
          <section className="pt-16">
            <SectionHeader eyebrow="Loan Group" title="レンタル移籍" count={`${loanPlayers.length} Profiles`} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loanPlayers.map((player) => (
                <PlayerCard key={`${player.displayName}-${player.number ?? "loan"}`} player={player} onClick={() => openPlayer(player, loanPlayers)} />
              ))}
            </div>
          </section>
        )}

        {(activeFilter === "All" || activeFilter === "Staff") && (
          <section className="pt-16">
            <SectionHeader eyebrow="Backroom" title="スタッフ" count="1 Staff" />
            <CoachProfile coach={headCoach} />
          </section>
        )}
      </section>
      ) : (
        activePage === "About" ? <AboutPage /> : null
      )}

      <PartnersFooter />

      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          canNavigate={selectedRoster.length > 1}
          onClose={() => setSelectedPlayer(null)}
          onNext={() => moveSelectedPlayer(1)}
          onPrevious={() => moveSelectedPlayer(-1)}
        />
      )}
    </main>
  );
}

function SiteHeader({ activePage, onPageChange, onHomeClick }) {
  return (
    <header className="border-b border-white/10 bg-darsena-navy/95 px-3 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 sm:gap-4">
        <button type="button" onClick={onHomeClick} className="flex items-center gap-2 text-left transition hover:opacity-95 sm:gap-3">
          <div className="flex h-14 w-14 items-center justify-center border border-darsena-red/70 bg-darsena-navy shadow-lg shadow-red-950/50">
            <img src="./logos/ac-darsena-crest.png" alt="AC Darsena crest" className="h-12 w-12 object-contain" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-xs uppercase tracking-[.32em] text-darsena-brass">Official Team</p>
            <p className="text-lg font-black uppercase tracking-wide text-white">AC Darsena Official Site</p>
          </div>
        </button>
        <nav className="order-3 flex w-full items-center justify-center border border-white/10 bg-black/25 sm:order-none sm:w-auto">
          {["Home", "About", "Squad"].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`min-h-9 px-2 text-[10px] font-black uppercase tracking-[.14em] transition sm:min-h-10 sm:px-4 sm:text-xs sm:tracking-[.22em] ${
                activePage === page ? "bg-darsena-red text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ keyPlayers, onOpenPlayer, onPageChange }) {
  return (
    <section className="relative border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 industrial-bg" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl py-10 sm:py-14">
        <div className="grid items-end gap-8 pb-10 pt-10 lg:grid-cols-[1fr_220px]">
          <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 border-l-4 border-darsena-red bg-black/25 px-4 py-2 text-sm font-bold uppercase tracking-[.24em] text-slate-200 backdrop-blur">
            <Shield size={17} />
            Port City Football
          </div>
          <h1 className="font-display text-5xl font-black uppercase leading-[.92] tracking-normal text-white sm:text-7xl lg:text-[7.2rem]">
            AC Darsena
          </h1>
          <p className="mt-4 max-w-2xl text-2xl font-black leading-normal text-darsena-red sm:text-3xl">静かに耐え、鋭く仕留める。</p>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-200 sm:text-lg">
            港の温度を読み、壊れない構造を積み上げる。AC Darsenaは、静かな規律と一撃の決断で試合を支配する。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onPageChange("About")}
              className="min-h-11 border border-darsena-red bg-darsena-red px-5 text-sm font-black uppercase tracking-[.18em] text-white transition hover:bg-red-700"
            >
              哲学を見る
            </button>
            <button
              type="button"
              onClick={() => onPageChange("Squad")}
              className="min-h-11 border border-darsena-red bg-darsena-red px-5 text-sm font-black uppercase tracking-[.18em] text-white transition hover:bg-red-700"
            >
              Squadを見る
            </button>
          </div>
          </div>
          <div className="hidden justify-self-end lg:block">
            <img src="./logos/ac-darsena-crest.png" alt="AC Darsena crest" className="h-56 w-56 object-contain drop-shadow-2xl" />
          </div>
        </div>

        <section className="pt-4">
          <SectionHeader eyebrow="Feature" title="Key Players" count="4 Profiles" />
          <p className="-mt-5 mb-6 text-sm font-bold text-slate-300 sm:text-base">Darsenaを象徴する4つの役割。</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyPlayers.map((player) => (
              <PlayerCard
                key={`home-key-${player.displayName}`}
                player={player}
                onClick={() => onOpenPlayer(player)}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function PartnersFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xs uppercase tracking-[.26em] text-slate-500">Official Partners</p>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
          <SponsorLogo src="./logos/consorzio-darsena-nord.png" alt="Consorzio Darsena Nord" />
          <SponsorLogo src="./logos/cml.png" alt="Cantieri Marittimi Liguri" />
        </div>
      </div>
    </footer>
  );
}

function SponsorLogo({ src, alt }) {
  return (
    <div className="flex h-24 min-w-0 items-center justify-center border border-white/10 bg-white px-5 sm:h-24 sm:w-72">
      <img src={src} alt={alt} className="max-h-20 max-w-full object-contain" />
    </div>
  );
}

function AboutPage() {
  const concepts = ["個より構造", "守備は文化", "再現性で生き残り、爆発力で勝ち切る"];
  const managerIdeas = ["思考実験型", "正解を固定しない", "状況ごとに選び続ける"];
  const playStyle = ["中央支配", "急がないが逃げない", "壊れないこと最優先"];

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 py-14 lg:grid-cols-[.82fr_1.18fr] lg:py-20">
        <aside>
          <p className="font-display text-sm uppercase tracking-[.28em] text-darsena-brass">Club Concept</p>
          <div className="mt-4 border-l-4 border-darsena-red pl-6">
            <h3 className="text-3xl font-black text-white">守備は文化である。</h3>
          </div>
          <p className="mt-3 text-sm font-bold text-slate-400">個より構造。</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            AC Darsenaは、騒がしい理想を掲げるクラブではない。まず崩れない。簡単には急がない。
            それでも、逃げるために遅くするわけではない。試合の温度を読み、中央を握り、同じ判断を何度でも再現する。
          </p>
        </aside>

        <div className="space-y-10">
          <AboutBlock
            number="01"
            title="クラブコンセプト"
            lead="個人の閃きだけでは、長いシーズンは渡り切れない。"
            items={concepts}
          />
          <AboutBlock
            number="02"
            title="Alessio De Luca"
            lead={`正解を固定しない。
状況ごとに選び続ける。

戦術は答えではない。
問い続けるための手段だ。`}
            items={managerIdeas}
          />
          <AboutBlock
            number="03"
            title="プレースタイル"
            lead="Darsenaは中央を支配することで試合を遅く見せる。しかし、それは消極性ではない。急がないが逃げない。壊れないことを最優先にしながら、最小限のチャンスで勝負を決める。"
            items={playStyle}
          />
        </div>
      </div>

      <div className="border-y border-white/10 py-10">
        <p className="max-w-4xl text-3xl font-black leading-relaxed text-white">
          “静かに耐えることは、待つことではない。”
          <br />
          仕留める形を揃えることだ。
        </p>
        <p className="mt-5 font-display text-sm uppercase tracking-[.25em] text-darsena-brass">AC Darsena Method</p>
      </div>
    </section>
  );
}

function AboutBlock({ number, title, lead, items }) {
  return (
    <article className="border border-white/10 bg-white/[.04] p-6 shadow-harbor sm:p-8">
      <div className="flex items-start gap-5">
        <div>
          <p className="font-display text-sm uppercase tracking-[.28em] text-darsena-brass">{number}</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-white">{title}</h3>
        </div>
      </div>
      <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-300">{lead}</p>
      {title === "Alessio De Luca" && (
        <p className="mt-4 text-xl font-black text-white">正解を固定しない。</p>
      )}
      {title === "プレースタイル" && (
        <p className="mt-4 text-lg font-black text-white">
          壊れないことが、すべての前提になる。
          <br />
          構造は選手を縛るためではなく、守るためにある。
        </p>
      )}
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="border border-white/10 bg-darsena-navy/70 px-4 py-4">
            <p className="text-sm font-black leading-6 text-slate-100">{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function SectionHeader({ eyebrow, title, count }) {
  return (
    <div className="flex flex-col justify-between gap-3 py-10 sm:flex-row sm:items-end">
      <div>
        <p className="font-display text-sm uppercase tracking-[.28em] text-darsena-brass">{eyebrow}</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      <p className="font-display text-sm uppercase tracking-[.22em] text-slate-400">{count}</p>
    </div>
  );
}

function CoachProfile({ coach }) {
  return (
    <article className="grid overflow-hidden border border-darsena-red/40 bg-white/[.045] shadow-harbor lg:grid-cols-[.8fr_1.2fr]">
      <div className="relative min-h-[340px] overflow-hidden bg-gradient-to-br from-darsena-steel via-darsena-navy to-black p-6">
        <div className="absolute inset-0 card-gantry opacity-70" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <span className="bg-darsena-red px-3 py-1.5 text-xs font-black uppercase tracking-[.24em] text-white">{coach.title}</span>
            <Shield size={30} className="text-darsena-brass" />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[.28em] text-darsena-brass">Manager</p>
            <h3 className="mt-3 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl">
              Alessio
              <span className="block text-darsena-red">DE LUCA</span>
            </h3>
            <p className="mt-5 max-w-sm text-lg font-bold leading-8 text-slate-200">{coach.philosophy}</p>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          <InfoCell label="Nationality" value={coach.nationality} />
          <InfoCell label="Age" value={coach.age} />
          <InfoCell label="Style" value={coach.style} />
        </div>
        <p className="mt-7 text-base leading-8 text-slate-300">{coach.bio}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {coach.keywords.map((keyword) => (
            <span key={keyword} className="border border-darsena-red/35 bg-red-950/30 px-3 py-1.5 text-sm font-bold text-red-50">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function InfoCell({ label, value }) {
  return (
    <div className="bg-darsena-navy p-4">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-black text-white">{value}</p>
    </div>
  );
}

function PlayerCard({ player, onClick, showOriginalStatus = false }) {
  const visibleStatus = getVisibleStatus(player);
  const originalStatus = showOriginalStatus ? getVisibleStatus(player) : null;
  const nationalityCode = getNationalityCode(player);
  const nameDisplay = getCardNameDisplay(player);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group min-h-[430px] overflow-hidden border border-white/10 bg-darsena-ink text-left shadow-harbor transition duration-300 hover:-translate-y-1 hover:border-darsena-red/80 focus:outline-none focus:ring-2 focus:ring-darsena-red"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-900 via-darsena-steel to-black">
        <div className="absolute inset-0 card-gantry" aria-hidden="true" />
        <PlayerPhoto player={player} />
        <div className="absolute left-5 top-5 font-display text-6xl font-black leading-none tracking-normal text-white/10">{nationalityCode}</div>
        <div className="absolute bottom-0 right-2 font-display text-[9rem] font-black leading-[.75] text-white/5">{player.position}</div>
        <div className="absolute bottom-5 left-5 flex items-end gap-3">
          <span className="font-display text-6xl font-black leading-none text-white">{player.number ?? "--"}</span>
          <span className="mb-2 bg-darsena-red px-2 py-1 text-xs font-black tracking-[.2em] text-white">{player.positionGroup}</span>
        </div>
      </div>
      <div className="flex min-h-[206px] flex-col p-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {nameDisplay.invert ? (
              <>
                <h3 className="text-3xl font-black leading-none tracking-tight text-white">{nameDisplay.last}</h3>
                <p className="mt-1 text-sm font-bold tracking-[.18em] text-slate-400">{nameDisplay.first}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold tracking-[.18em] text-slate-400">{nameDisplay.first}</p>
                <h3 className="mt-1 text-3xl font-black leading-none tracking-tight text-white">{nameDisplay.last}</h3>
              </>
            )}
          </div>
          <ChevronRight className="mt-1 text-slate-500 transition group-hover:translate-x-1 group-hover:text-darsena-red" size={24} />
        </div>
        <p className="mt-3 min-h-12 text-sm font-semibold leading-6 text-slate-300">{player.role}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>{player.position}</Badge>
          {player.subPositions.map((pos) => <Badge key={pos}>{pos}</Badge>)}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {visibleStatus && <span className={`rounded-sm px-2.5 py-1 text-xs font-bold ${statusTone[visibleStatus] ?? "bg-white/10 text-slate-100"}`}>{visibleStatus}</span>}
            {originalStatus && originalStatus !== visibleStatus && (
              <span className={`rounded-sm px-2.5 py-1 text-xs font-bold ${statusTone[originalStatus] ?? "bg-white/10 text-slate-100"}`}>{originalStatus}</span>
            )}
          </div>
          <span className="font-display text-xl font-black text-white">OVR {player.overall}</span>
        </div>
      </div>
    </button>
  );
}

function getPlayerImageCandidates(player) {
  if (!player.image) return [];
  const basePath = player.image.replace(/\.[^.]+$/, "");
  return [...new Set([
    player.image,
    `${basePath}.webp`,
    `${basePath}.jpg`,
    `${basePath}.jpeg`,
    "./players/default.png",
  ])];
}

function PlayerPhoto({ player, variant = "card" }) {
  const [imageIndex, setImageIndex] = useState(0);
  const numberLabel = player.number ?? "LOAN";
  const imageCandidates = getPlayerImageCandidates(player);
  const currentImage = imageCandidates[imageIndex];
  const imageClasses = variant === "modal"
    ? "absolute bottom-0 right-2 h-[82%] w-auto max-w-[48%] object-contain object-bottom opacity-95 drop-shadow-2xl sm:right-8 sm:h-[88%] sm:max-w-[46%]"
    : "absolute bottom-0 right-1 h-[106%] w-auto max-w-[84%] object-contain object-bottom opacity-95 transition duration-300 group-hover:scale-105 sm:right-2 sm:h-[108%] sm:max-w-[76%]";

  useEffect(() => {
    setImageIndex(0);
  }, [player.displayName, player.image]);

  if (currentImage) {
    return (
      <img
        src={currentImage}
        alt={`${player.displayName} portrait`}
        className={imageClasses}
        onError={() => setImageIndex((index) => index + 1)}
      />
    );
  }

  return (
    <div className={`absolute right-4 flex items-center justify-center border border-white/10 bg-darsena-navy/70 text-white/50 shadow-2xl shadow-black/30 ${variant === "modal" ? "bottom-0 h-64 w-48 text-5xl sm:h-80 sm:w-56 sm:text-6xl" : "bottom-0 h-40 w-32 text-4xl"}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" aria-hidden="true" />
      <span className="relative font-display font-black">{numberLabel}</span>
    </div>
  );
}

function Badge({ children }) {
  return <span className="border border-white/10 bg-white/[.06] px-2 py-1 text-xs font-bold text-slate-300">{children}</span>;
}

function PlayerModal({ player, canNavigate, onClose, onNext, onPrevious }) {
  const visibleStatus = getVisibleStatus(player);
  const nameDisplay = getModalNameDisplay(player);
  const detailRows = [
    ["Age", player.age],
    ["Nationality", player.nationality],
    ["Preferred foot", player.preferredFoot],
    ["Height", player.height ? `${player.height} cm` : "—"],
    visibleStatus ? ["Status", visibleStatus] : null,
    ["Position", [player.position, ...player.subPositions].join(" / ")],
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-white/10 bg-darsena-ink shadow-2xl shadow-black sm:max-h-[86vh]">
        {canNavigate && (
          <div className="grid grid-cols-2 border-b border-white/10 bg-darsena-navy/95 lg:hidden">
            <button type="button" onClick={onPrevious} className="flex min-h-12 items-center justify-center gap-2 border-r border-white/10 text-sm font-black uppercase tracking-[.18em] text-slate-200">
              <ChevronRight size={18} className="rotate-180" />
              Prev
            </button>
            <button type="button" onClick={onNext} className="flex min-h-12 items-center justify-center gap-2 text-sm font-black uppercase tracking-[.18em] text-slate-200">
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[470px] overflow-hidden bg-gradient-to-br from-darsena-steel via-darsena-navy to-black p-6 sm:p-8">
            {canNavigate && (
              <>
                <button type="button" onClick={onPrevious} className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/35 text-white transition hover:border-darsena-red hover:bg-darsena-red lg:flex" aria-label="Previous player">
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <button type="button" onClick={onNext} className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/35 text-white transition hover:border-darsena-red hover:bg-darsena-red lg:flex" aria-label="Next player">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <div className="absolute inset-0 card-gantry opacity-70" aria-hidden="true" />
            <div className="absolute -left-3 bottom-2 font-display text-[12rem] font-black leading-none text-white/[.055] sm:text-[16rem]" aria-hidden="true">
              {player.number ?? "LOAN"}
            </div>
            <PlayerPhoto player={player} variant="modal" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="font-display text-sm uppercase tracking-[.25em] text-darsena-brass">Player Profile</p>
                <div className="mt-4 inline-flex items-center border border-darsena-red/60 bg-black/55 shadow-lg shadow-black/30">
                  <span className="border-r border-white/15 bg-darsena-navy px-5 py-2 font-display text-4xl font-black leading-none text-white">{player.number ?? "--"}</span>
                  <span className="bg-darsena-red px-4 py-2 font-display text-2xl font-black leading-none text-white">{player.position}</span>
                </div>
              </div>
              <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center border border-white/15 bg-black/20 text-white transition hover:border-darsena-red hover:bg-darsena-red" aria-label="Close player detail">
                <X size={22} />
              </button>
            </div>
            <div className="relative z-10 mt-24 max-w-[55%] sm:mt-28">
              <h2 className="font-display text-6xl font-black leading-[.88] tracking-normal text-white sm:text-7xl">
                {nameDisplay.first}
                <span className="block text-darsena-red">{nameDisplay.last}</span>
              </h2>
              <p className="mt-5 max-w-sm text-base font-bold leading-7 text-slate-200">{player.role}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-9">
            <div className="flex flex-wrap items-center gap-3">
              {visibleStatus && <span className={`rounded-sm px-3 py-1.5 text-xs font-bold ${statusTone[visibleStatus] ?? "bg-white/10 text-slate-100"}`}>{visibleStatus}</span>}
              {player.note && <span className="border border-darsena-red/40 px-3 py-1.5 text-xs font-bold text-red-100">{player.note}</span>}
            </div>
            <h3 className="mt-7 font-display text-sm uppercase tracking-[.24em] text-darsena-brass">Biography</h3>
            <p className="mt-4 text-base leading-8 text-slate-300">{player.bio}</p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
              {detailRows.map(([label, value]) => (
                <div key={label} className="bg-darsena-navy p-4">
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-500">{label}</p>
                  <p className="mt-2 text-lg font-black text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-l-4 border-darsena-red bg-white/[.04] p-5">
              <p className="font-display text-sm uppercase tracking-[.24em] text-darsena-brass">Harbor Report</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                低いブロックでも、前へ出る瞬間でも、Darsenaが大切にするのは判断の速さと集団の距離感。このプロフィールはその役割を一枚に凝縮したものです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />)
