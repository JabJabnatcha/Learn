// C:\Users\Laptop-JAB\Desktop\Learn\React_DnD\react-dnd\src\domain\character\value-object\CharacterProfile.js

export class CharacterProfile {
  constructor({
    age = 0,
    height = "",
    weight = "",
    eyes = "",
    skin = "",
    hair = "",
  } = {}) {
    this.age = this.validateAge(age);
    this.height = height;
    this.weight = weight;
    this.eyes = eyes;
    this.skin = skin;
    this.hair = hair;

    Object.freeze(this);
  }

  validateAge(age) {
    if (typeof age !== "number" || age < 0) return 0;
    return age;
  }

  toJSON() {
    return {
      age: this.age,
      height: this.height,
      weight: this.weight,
      eyes: this.eyes,
      skin: this.skin,
      hair: this.hair,
    };
  }
}