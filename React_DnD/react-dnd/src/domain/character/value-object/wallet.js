export class Wallet {
  static COPPER_PER_SILVER = 10;
  static SILVER_PER_GOLD = 10;
  static GOLD_PER_PLATINUM = 10;

  constructor({ pp = 0, gp = 0, sp = 0, cp = 0 } = {}) {
    this.pp = this.validate(pp);
    this.gp = this.validate(gp);
    this.sp = this.validate(sp);
    this.cp = this.validate(cp);

    Object.freeze(this);
  }

  validate(value) {
    if (typeof value !== "number" || Number.isNaN(value)) return 0;
    return Number(value);
  }

  toCopper() {
    return (
      this.cp +
      this.sp * Wallet.COPPER_PER_SILVER +
      this.gp * Wallet.SILVER_PER_GOLD * Wallet.COPPER_PER_SILVER +
      this.pp * Wallet.GOLD_PER_PLATINUM * Wallet.SILVER_PER_GOLD * Wallet.COPPER_PER_SILVER
    );
  }

  static fromCopper(copper) {
    const total = Math.max(0, Math.floor(copper));
    const pp = Math.floor(total / (Wallet.GOLD_PER_PLATINUM * Wallet.SILVER_PER_GOLD * Wallet.COPPER_PER_SILVER));
    const rem1 = total % (Wallet.GOLD_PER_PLATINUM * Wallet.SILVER_PER_GOLD * Wallet.COPPER_PER_SILVER);
    const gp = Math.floor(rem1 / (Wallet.SILVER_PER_GOLD * Wallet.COPPER_PER_SILVER));
    const rem2 = rem1 % (Wallet.SILVER_PER_GOLD * Wallet.COPPER_PER_SILVER);
    const sp = Math.floor(rem2 / Wallet.COPPER_PER_SILVER);
    const cp = rem2 % Wallet.COPPER_PER_SILVER;

    return new Wallet({ pp, gp, sp, cp });
  }

  normalize() {
    return Wallet.fromCopper(this.toCopper());
  }

  add({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
    return new Wallet({
      pp: this.pp + pp,
      gp: this.gp + gp,
      sp: this.sp + sp,
      cp: this.cp + cp,
    }).normalize();
  }

  subtract({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
    const remainingCopper = this.toCopper() - new Wallet({ pp, gp, sp, cp }).toCopper();
    if (remainingCopper < 0) {
      throw new Error("Not enough funds");
    }
    return Wallet.fromCopper(remainingCopper);
  }

  canAfford({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
    return this.toCopper() >= new Wallet({ pp, gp, sp, cp }).toCopper();
  }

  equals(other) {
    return (
      other instanceof Wallet &&
      this.pp === other.pp &&
      this.gp === other.gp &&
      this.sp === other.sp &&
      this.cp === other.cp
    );
  }

  toJSON() {
    return {
      pp: this.pp,
      gp: this.gp,
      sp: this.sp,
      cp: this.cp,
    };
  }
}

