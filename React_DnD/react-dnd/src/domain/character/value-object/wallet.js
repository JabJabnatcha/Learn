export class Wallet {
  constructor({ pp = 0, gp = 0, sp = 0, cp = 0 } = {}) {
    this.pp = this.validate(pp);
    this.gp = this.validate(gp);
    this.sp = this.validate(sp);
    this.cp = this.validate(cp);

    Object.freeze(this);
  }

  validate(value) {
    if (typeof value !== "number") return 0;
    return value;
  }

  add({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
    return new Wallet({
      pp: this.pp + pp,
      gp: this.gp + gp,
      sp: this.sp + sp,
      cp: this.cp + cp,
    });
  }

  subtract({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
    return new Wallet({
      pp: this.pp - pp,
      gp: this.gp - gp,
      sp: this.sp - sp,
      cp: this.cp - cp,
    });
  }

  canAfford({ pp = 0, gp = 0, sp = 0, cp = 0 }) {
    return this.pp >= pp && this.gp >= gp && this.sp >= sp && this.cp >= cp;
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
