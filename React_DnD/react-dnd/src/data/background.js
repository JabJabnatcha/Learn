export const BACKGROUNDS = [
  // ===== Social =====
  {
    id: "street_robber",
    nameTH: "โจรข้างถนน",
    nameEN: "Street Robber",
    bonus: { dexterity: 1, wisdom: -1 },
    skills: ["sleightOfHand", "stealth"],
    items: [],
    money: { pp: 0, gp: 0, sp: 5, cp: 0 },
    note: "สามารถล้วงของ หลบหนี และหาทางเอาตัวรอดในเขตเมืองได้ดี รู้จักตรอกซอกซอยและแหล่งข่าวลือใต้ดิน"
  },

  {
    id: "con_artist",
    nameTH: "นักต้มตุ๋น",
    nameEN: "Con Artist",
    bonus: { charisma: 1, strength: -1 },
    skills: ["deception", "persuasion"],
    items: ["fake documents"],
    money: { pp: 0, gp: 0, sp: 0, cp: 0 },
    note: "สามารถปลอมตัว สร้างตัวตนปลอม และหลอกลวงผู้อื่นได้ง่าย อ่านท่าทีและจุดอ่อนของเป้าหมายเก่ง"
  },

  {
    id: "gambler",
    nameTH: "นักพนัน",
    nameEN: "Gambler",
    bonus: {},
    skills: ["insight"],
    items: ["playing cards"],
    money: { pp: 0, gp: 0, sp: 5, cp: 0 },
    note: "คุ้นเคยกับการพนันและความเสี่ยง สามารถเข้าถึงโต๊ะพนัน อ่านพฤติกรรมคู่แข่ง และรับมือสถานการณ์ที่ต้องพึ่งโชค"
  },

  {
    id: "merchant",
    nameTH: "พ่อค้า",
    nameEN: "Merchant",
    bonus: { intelligence: 1 },
    skills: ["persuasion"],
    items: ["ledger book"],
    money: { pp: 0, gp: 25, sp: 0, cp: 0 },
    note: "เข้าใจการค้าและเครือข่ายพ่อค้า สามารถซื้อขายได้ราคาดีกว่า รู้จักตลาดและเส้นทางการค้า"
  },

  {
    id: "noble",
    nameTH: "ขุนนาง",
    nameEN: "Noble",
    bonus: { charisma: 1, dexterity: -1 },
    skills: ["performance", "persuasion"],
    items: ["signet ring"],
    money: { pp: 0, gp: 20, sp: 0, cp: 0 },
    note: "มีสถานะทางสังคมสูง สามารถเข้าพบชนชั้นสูง ใช้ชื่อเสียงกดดัน หรือขอความช่วยเหลือจากผู้มีอำนาจได้"
  },

  {
    id: "translator",
    nameTH: "นักแปลภาษา",
    nameEN: "Translator",
    bonus: { intelligence: 1, constitution: -1 },
    skills: ["history"],
    items: ["notebook", "ink pen"],
    money: { pp: 0, gp: 0, sp: 0, cp: 0 },
    note: "เชี่ยวชาญการสื่อสารข้ามภาษา สามารถเข้าใจเอกสารโบราณ วัฒนธรรมต่างถิ่น และเรียนรู้ภาษาใหม่ได้ง่าย"
  },

  // ===== Combat / Physical =====
  {
    id: "mercenary",
    nameTH: "ทหารรับจ้าง",
    nameEN: "Mercenary",
    bonus: { strength: 1 },
    skills: ["athletics"],
    items: [],
    money: { pp: 0, gp: 10, sp: 0, cp: 0 },
    note: "คุ้นเคยกับสนามรบ สามารถรับงานคุ้มกันหรือสู้รบ และปรับตัวกับสถานการณ์อันตรายได้ดี"
  },

  {
    id: "squire",
    nameTH: "อัศวินฝึกหัด",
    nameEN: "Squire",
    bonus: { constitution: 1 },
    skills: ["athletics", "persuasion"],
    items: [],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "ถูกฝึกวินัยและการรับใช้ชนชั้นสูง สามารถปฏิบัติตนในสังคมอัศวินและคำสั่งได้"
  },

  {
    id: "tavern_brawler",
    nameTH: "นักเลงร้านเหล้า",
    nameEN: "Tavern Brawler",
    bonus: { strength: 1, constitution: 1, charisma: -1 },
    skills: ["athletics", "intimidation"],
    items: [],
    money: { pp: 0, gp: 2, sp: 0, cp: 0 },
    note: "ชำนาญการต่อสู้มือเปล่าและการทะเลาะในพื้นที่แออัด ได้เปรียบเมื่อสู้ในโรงเหล้า ตลาด หรือที่คับแคบ"
  },

  {
    id: "bounty_hunter",
    nameTH: "นักล่าค่าหัว",
    nameEN: "Bounty Hunter",
    bonus: { wisdom: 1 },
    skills: ["survival", "investigation"],
    items: ["manacles"],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "เชี่ยวชาญการตามรอยและจับกุม สามารถสืบหาเป้าหมาย ติดตาม และนำตัวกลับมาได้"
  },

  {
    id: "arena_fighter",
    nameTH: "นักสู้ประลอง",
    nameEN: "Arena Fighter",
    bonus: { strength: 1 },
    skills: ["performance", "athletics"],
    items: [],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "ชินกับการต่อสู้ต่อหน้าผู้คน สามารถดึงความสนใจ ฝูงชน หรือข่มขวัญคู่ต่อสู้ได้"
  },

  // ===== Career / Labor =====
  {
    id: "stable_hand",
    nameTH: "คนเลี้ยงม้า",
    nameEN: "Stable Hand",
    bonus: { wisdom: 1 },
    skills: ["animal handling"],
    items: [],
    money: { pp: 0, gp: 3, sp: 0, cp: 0 },
    note: "คุ้นเคยกับสัตว์และการเดินทาง สามารถดูแลม้าและสัตว์พาหนะได้ดี"
  },

  {
    id: "blacksmith",
    nameTH: "ช่างตีเหล็ก",
    nameEN: "Blacksmith",
    bonus: { strength: 1 },
    skills: ["athletics"],
    items: ["smith tools"],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "เข้าใจโลหะและอาวุธ สามารถซ่อมแซมอุปกรณ์และประเมินคุณภาพอาวุธได้"
  },

  {
    id: "cook",
    nameTH: "คนครัว",
    nameEN: "Cook",
    bonus: { wisdom: 1 },
    skills: ["medicine"],
    items: ["cooking tools"],
    money: { pp: 0, gp: 2, sp: 0, cp: 0 },
    note: "เชี่ยวชาญอาหารและสุขภาพ สามารถเตรียมอาหาร ฟื้นฟูสภาพ และดูแลคนในค่ายได้"
  },

  {
    id: "fisherman",
    nameTH: "ชาวประมง",
    nameEN: "Fisherman",
    bonus: { constitution: 1 },
    skills: ["survival"],
    items: ["fishing net"],
    money: { pp: 0, gp: 2, sp: 0, cp: 0 },
    note: "อดทนและคุ้นเคยธรรมชาติ สามารถหาอาหารจากแหล่งน้ำและเอาตัวรอดได้"
  },

  {
    id: "hunter",
    nameTH: "พราน",
    nameEN: "Hunter",
    bonus: { wisdom: 1 },
    skills: ["survival", "stealth"],
    items: ["traps"],
    money: { pp: 0, gp: 3, sp: 0, cp: 0 },
    note: "ชำนาญการล่าและการซ่อนตัว สามารถติดตามสัตว์และใช้ชีวิตในป่าได้ดี"
  },

  // ===== Arts / Knowledge =====
  {
    id: "traveling_actor",
    nameTH: "นักแสดงเร่",
    nameEN: "Traveling Actor",
    bonus: { charisma: 1 },
    skills: ["performance", "deception"],
    items: ["costume"],
    money: { pp: 0, gp: 2, sp: 0, cp: 0 },
    note: "เชี่ยวชาญการแสดงและปลอมบทบาท สามารถสร้างความสนใจหรือหลอกล่อผู้คนได้"
  },

  {
    id: "traveling_musician",
    nameTH: "นักดนตรีเร่",
    nameEN: "Traveling Musician",
    bonus: { charisma: 1 },
    skills: ["performance"],
    items: [],
    money: { pp: 0, gp: 2, sp: 0, cp: 0 },
    note: "สร้างความบันเทิงและกำลังใจ สามารถผ่อนคลายบรรยากาศหรือดึงดูดฝูงชน"
  },

  {
    id: "priest",
    nameTH: "นักบวช",
    nameEN: "Priest",
    bonus: { wisdom: 1 },
    skills: ["religion", "medicine"],
    items: ["holy symbol"],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "มีความรู้ทางศาสนา สามารถทำพิธี ให้คำปรึกษา และช่วยเหลือผู้ศรัทธา"
  },

  {
    id: "herbalist",
    nameTH: "นักสมุนไพร",
    nameEN: "Herbalist",
    bonus: { wisdom: 1 },
    skills: ["nature", "medicine"],
    items: ["herb pouch"],
    money: { pp: 0, gp: 3, sp: 0, cp: 0 },
    note: "รู้จักสมุนไพรและยาธรรมชาติ สามารถเก็บและใช้พืชเพื่อการรักษาได้"
  },

  {
    id: "doctor",
    nameTH: "หมอ",
    nameEN: "Doctor",
    bonus: { intelligence: 1 },
    skills: ["medicine"],
    items: ["medical kit"],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "เชี่ยวชาญการรักษา สามารถดูแลบาดแผล โรค และอาการเจ็บป่วยได้อย่างมีประสิทธิภาพ"
  },

  {
    id: "apprentice_mage",
    nameTH: "นักเวทฝึกหัด",
    nameEN: "Apprentice Mage",
    bonus: { intelligence: 1 },
    skills: ["arcana"],
    items: ["spell notes"],
    money: { pp: 0, gp: 5, sp: 0, cp: 0 },
    note: "มีพื้นฐานเวทมนตร์ สามารถเข้าใจคาถา อุปกรณ์เวท และทฤษฎีเวทขั้นต้น"
  }
];
