(function () {
  const STORAGE_KEY = "nezumi.lang";
  const DEFAULT_LANG = "ja";

  const MEMBERS = ["oka", "yukina", "yukon", "moe", "ryuki", "inmuk"];

  const META = {
    oka:    { agentNo: "#001", clearance: "LV-9" },
    yukina: { agentNo: "#002", clearance: "LV-8" },
    yukon:  { agentNo: "#003", clearance: "LV-7" },
    moe:    { agentNo: "#004", clearance: "LV-7" },
    ryuki:  { agentNo: "#005", clearance: "LV-6" },
    inmuk:  { agentNo: "#006", clearance: "LV-8" },
  };

  const translations = {
    ja: {
      "brand.title": "ネズミ諜報部隊",
      "brand.tag": "OPERATION: NEZUMI",
      "nav.home": "[ HOME ]",
      "nav.team": "[ DOSSIER ]",
      "lang.ja": "[ JA ]",
      "lang.ko": "[ KO ]",
      "ticker.text": "// CLASSIFIED // OPERATION: NEZUMI // CLEARANCE: LV-7 // 機密書類 // 取扱注意 //",

      "home.label.countdown": "> COUNTDOWN.exe",
      "home.headline": "次の任務まで",
      "home.tbd": "日時機密",
      "home.label.dday": "D-DAY",
      "home.label.days": "DAYS",
      "home.label.hrs": "HRS",
      "home.label.min": "MIN",
      "home.label.sec": "SEC",
      "home.complete": "MISSION COMPLETE",
      "home.target": "目標日時",
      "home.target.classified": "CLASSIFIED",
      "home.operation": "作戦コード",

      "team.label.dossier": "> AGENT_DOSSIER.dat",
      "team.headline": "AGENT DOSSIER",
      "team.subhead": "機密要員リスト",
      "team.banner.alt": "ネズミスパイ団 バナー",
      "team.section.strength": "STRENGTH / 伝説の要員",
      "team.section.anomaly": "ANOMALY / 致命的欠陥",
      "team.label.codename": "CODENAME",
      "team.label.alias": "ALIAS",
      "team.label.clearance": "CLEARANCE",
      "team.label.status": "ACTIVE",
      "team.watermark": "機密",

      "footer.text": "© NEZUMI INTELLIGENCE — EYES ONLY",

      "auth.label": "> SECURE_ACCESS.exe",
      "auth.title": "ACCESS CONTROL",
      "auth.prompt": "アクセスコードを入力してください",
      "auth.placeholder": "ENTER ACCESS CODE",
      "auth.submit": "[ AUTHORIZE ]",
      "auth.denied": "ACCESS DENIED",
      "auth.granted": "ACCESS GRANTED",
      "auth.hint": "※ コードは隊長から伝達されます",

      "member.oka.name": "おかさん",
      "member.oka.alias": "大将ずみ",
      "member.oka.codename": "絶対カリスマ・リーダー",
      "member.oka.strength": "0.1秒で戦術地図を描き、尻尾の先一本で隊員全員の位置を把握する指揮官。",
      "member.oka.anomaly.name": "強迫的小言症候群",
      "member.oka.anomaly.desc": "作戦開始直前に隊員の爪の清潔さとビタミン摂取を確認しないと作戦許可を出せない。（コードネームが「お母さん」になった理由）",

      "member.yukina.name": "ユキナ",
      "member.yukina.alias": "副隊長ずみ + シベリアンネコ",
      "member.yukina.codename": "超能力級・情報分析官",
      "member.yukina.strength": "瞳の動きだけで敵の嘘を見抜き、世界中のサーバーを10分でハッキングする天才ストラテジスト。",
      "member.yukina.anomaly.name": "ダンボール籠城症候群",
      "member.yukina.anomaly.desc": "どれほど緊迫したハッキング状況でも、近くに段ボール箱があるとまず入らないとコーディングが始められない。箱の外では一本指打法に変わる伝説の猫（？）。",

      "member.yukon.name": "ユコン",
      "member.yukon.alias": "ネズネズ ネズリーノ + ネズチーズ",
      "member.yukon.codename": "爆破の美学者",
      "member.yukon.strength": "火薬の匂いだけでメーカーと爆発範囲を当て、チーズの粉だけで建物を吹き飛ばす爆発物のスペシャリスト。",
      "member.yukon.anomaly.name": "チーズ味覚喪失症",
      "member.yukon.anomaly.desc": "爆弾とチーズの区別がつかない。空腹のあまりC4を一口かじってから顎の筋肉が爆発的に発達。おかげでチーズを食べる時は隊員全員が緊張する。",

      "member.moe.name": "モエ",
      "member.moe.alias": "ネズネズネズネズ サフール + イレずみ",
      "member.moe.codename": "最先端兵器マスター",
      "member.moe.strength": "壊れたトースターでレーザー砲を作る工学の天才。彼女が触れれば木の枝もレールガンになる。",
      "member.moe.anomaly.name": "ネズネズ症候群",
      "member.moe.anomaly.desc": "引き金を引くとき「ネズネズネズ！」と叫ばないと人差し指が麻痺する。潜入中は口を押さえて「ヌッヌッヌ……」とでも言わないと発射できない。（ほぼ呪術師レベル）",

      "member.ryuki.name": "リュウキ",
      "member.ryuki.alias": "カリカリずみ",
      "member.ryuki.codename": "一騎当千の戦闘マシン",
      "member.ryuki.strength": "雨あられの銃弾の中をブレイクダンスで掻い潜り、敵を殲滅するポイントマン。小銃一丁で大隊級を相手にする。",
      "member.ryuki.anomaly.name": "呪われた体質",
      "member.ryuki.anomaly.desc": "「食べても食べても太らない病」を患っている。作戦中に敵を戦術的にすっかり喰らい尽くしても、本人はいつも骨と皮だけのガリガリ体型を維持。隊内でプロテインとチーズを誰よりも盗み食いしながら太らないので、食事管理に厳しいリーダーおかさんとプロテインシェイクを欠かさない隊員たちの嫉妬を一身に浴びている。",

      "member.inmuk.name": "インムク",
      "member.inmuk.alias": "ドブネズミ",
      "member.inmuk.codename": "影潜入の化身",
      "member.inmuk.strength": "空気中の分子と同じくらい静かに動き、敵の背後で心音すら気取られない暗殺者。",
      "member.inmuk.anomaly.name": "存在感蒸発症候群",
      "member.inmuk.anomaly.desc": "ステルス性能が高すぎて、隊員も飯を食いに行くとき彼を置いていく。たまに自分が生きているか確かめるため、鏡の前で30分間「ぼく、ここにいます」と練習する。",
    },

    ko: {
      "brand.title": "네즈미 스파이 팀",
      "brand.tag": "OPERATION: NEZUMI",
      "nav.home": "[ HOME ]",
      "nav.team": "[ DOSSIER ]",
      "lang.ja": "[ JA ]",
      "lang.ko": "[ KO ]",
      "ticker.text": "// 기밀 // OPERATION: NEZUMI // CLEARANCE: LV-7 // 機密書類 // 취급주의 //",

      "home.label.countdown": "> COUNTDOWN.exe",
      "home.headline": "다음 임무까지",
      "home.tbd": "DATE CLASSIFIED",
      "home.label.dday": "D-DAY",
      "home.label.days": "DAYS",
      "home.label.hrs": "HRS",
      "home.label.min": "MIN",
      "home.label.sec": "SEC",
      "home.complete": "MISSION COMPLETE",
      "home.target": "목표 일시",
      "home.target.classified": "CLASSIFIED",
      "home.operation": "작전 코드",

      "team.label.dossier": "> AGENT_DOSSIER.dat",
      "team.headline": "AGENT DOSSIER",
      "team.subhead": "기밀 요원 명단",
      "team.banner.alt": "네즈미 스파이 팀 배너",
      "team.section.strength": "STRENGTH / 전설의 요원",
      "team.section.anomaly": "ANOMALY / 치명적 결함",
      "team.label.codename": "CODENAME",
      "team.label.alias": "ALIAS",
      "team.label.clearance": "CLEARANCE",
      "team.label.status": "ACTIVE",
      "team.watermark": "기밀",

      "footer.text": "© NEZUMI INTELLIGENCE — EYES ONLY",

      "auth.label": "> SECURE_ACCESS.exe",
      "auth.title": "ACCESS CONTROL",
      "auth.prompt": "액세스 코드를 입력하세요",
      "auth.placeholder": "ENTER ACCESS CODE",
      "auth.submit": "[ AUTHORIZE ]",
      "auth.denied": "ACCESS DENIED",
      "auth.granted": "ACCESS GRANTED",
      "auth.hint": "※ 코드는 대장으로부터 전달됩니다",

      "member.oka.name": "오카상",
      "member.oka.alias": "대장즈미",
      "member.oka.codename": "절대 카리스마 리더",
      "member.oka.strength": "0.1초 만에 전술 지도를 그려내며, 꼬리 끝 하나로 팀원 전체의 위치를 파악하는 지휘관.",
      "member.oka.anomaly.name": "강박적 잔소리 증후군",
      "member.oka.anomaly.desc": "작전 개시 직전 팀원들의 손톱 청결 상태와 비타민 섭취 여부를 확인하지 않으면 작전 허가를 내리지 못함. (코드네임이 '엄마'가 된 이유)",

      "member.yukina.name": "유키나",
      "member.yukina.alias": "부대장 즈미 + 시베리안 네코",
      "member.yukina.codename": "초능력급 정보 분석",
      "member.yukina.strength": "눈동자의 움직임만으로 적의 거짓말을 간파하고, 전 세계 서버를 10분 만에 해킹하는 천재 전략가.",
      "member.yukina.anomaly.name": "박스 고립 증후군",
      "member.yukina.anomaly.desc": "아무리 긴박한 해킹 상황이라도 근처에 종이박스가 있으면 일단 들어가야만 코딩이 시작됨. 박스 밖에서는 독수리 타법으로 변하는 전설의 고양이(?).",

      "member.yukon.name": "유콘",
      "member.yukon.alias": "네즈네즈 네즈리노 + 네즈 치즈",
      "member.yukon.codename": "폭파의 미학자",
      "member.yukon.strength": "화약의 냄새만으로 제조사와 폭발 범위를 맞히며, 치즈 가루만으로도 건물을 날려버리는 폭발물 전문가.",
      "member.yukon.anomaly.name": "치즈 미각 상실증",
      "member.yukon.anomaly.desc": "폭탄과 치즈를 구별하지 못함. 배고플 때 잘못해서 C4를 한 입 베어 물었다가 턱 근육이 폭발적으로 발달함. 덕분에 항상 치즈를 먹을 때 팀원들이 긴장함.",

      "member.moe.name": "모에",
      "member.moe.alias": "네즈네즈네즈네즈 사후르 + 이레 즈미",
      "member.moe.codename": "최첨단 병기 마스터",
      "member.moe.strength": "고장 난 토스터기로 레이저포를 만드는 공학 천재. 그녀가 손을 대면 나뭇가지도 레일건이 됨.",
      "member.moe.anomaly.name": "네즈네즈 증후군",
      "member.moe.anomaly.desc": "방아쇠를 당길 때 \"네즈네즈네즈!\"라고 외치지 않으면 검지에 마비가 옴. 잠입 중에는 입을 틀어막고 \"늦늦늦...\"이라도 해야 발사가 됨. (거의 주술사 수준)",

      "member.ryuki.name": "류키",
      "member.ryuki.alias": "카리카리 즈미",
      "member.ryuki.codename": "일당백의 전투 머신",
      "member.ryuki.strength": "빗발치는 총탄 사이로 비보잉을 하며 적을 섬멸하는 포인트 맨. 소총 한 자루로 대대급을 상대함.",
      "member.ryuki.anomaly.name": "저주받은 체질",
      "member.ryuki.anomaly.desc": "\"먹어도 먹어도 살이 안 찌는 병\"에 걸려 있음. 작전 중 적군을 전술적으로 완전히 파먹어 버리지만, 정작 본인은 늘 뼈만 남은 앙상한 몸매를 유지. 팀 내에서 단백질 보충제와 치즈를 가장 많이 훔쳐 먹으면서도 살이 찌지 않아, 식단 관리에 엄격한 리더 오카상과 단백질 쉐이크를 챙기는 멤버들의 시기와 질투를 한 몸에 받음.",

      "member.inmuk.name": "인무크",
      "member.inmuk.alias": "도부 네즈미",
      "member.inmuk.codename": "그림자 잠입의 화신",
      "member.inmuk.strength": "공기 중의 분자만큼이나 조용하게 움직이며, 적의 등 뒤에서 심장 소리조차 들키지 않는 암살자.",
      "member.inmuk.anomaly.name": "존재감 증발 증후군",
      "member.inmuk.anomaly.desc": "스텔스 성능이 너무 뛰어나서 팀원들도 밥 먹으러 갈 때 얘를 버리고 감. 가끔 자기가 살아있는지 확인하려고 거울 앞에서 30분 동안 \"저 여기 있어요\"라고 연습함.",
    },
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ja" || stored === "ko") return stored;
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateToggleUI();
    document.dispatchEvent(new CustomEvent("nezumi:langchange", { detail: { lang } }));
  }

  function t(key) {
    const lang = getLang();
    return (translations[lang] && translations[lang][key]) || key;
  }

  function applyTranslations() {
    const lang = getLang();
    const dict = translations[lang] || translations[DEFAULT_LANG];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key] !== undefined) el.setAttribute("alt", dict[key]);
    });
  }

  function updateToggleUI() {
    const lang = getLang();
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const target = btn.getAttribute("data-lang-btn");
      btn.classList.toggle("active", target === lang);
    });
  }

  function init() {
    document.documentElement.lang = getLang();
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang-btn")));
    });
    applyTranslations();
    updateToggleUI();
  }

  window.NezumiI18n = {
    init,
    getLang,
    setLang,
    t,
    MEMBERS,
    META,
  };
})();
