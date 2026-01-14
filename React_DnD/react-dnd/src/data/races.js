export const RACES = {
    Dragonborn: {
        base: {
            features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance","Darkvision","Draconic Flight"],
            bonus: { Strength: 2, Charisma: 1 },
            speed: 30,
            languages: ["Common", "Draconic"]
        },
        subRaces: [],
    },

    Dwarf: {
        base: {
            features: ["Darkvision", "Dwarven Resilience", "Stonecunning"],
            bonus: { Constitution: 2 },
            speed: 30,
            languages: ["Common", "Dwarvish"],
        },
        subRaces: {
            "Hill Dwarf": {
                features: ["Dwarven Toughness"],
                bonus: { Wisdom: 1 }
            },
            "Mountain Dwarf": {
                features: ["Dwarven Armor Training"],
                bonus: { Strength: 2 }
            }
        }
    },
    Elf: {
        base: {
            features: ["Darkvision", "Fey Ancestry", "Trance", "Keen Senses"],
            bonus: { Dexterity: 2 },
            speed: 30,
            languages: ["Common", "Elvish"],
        },
        subRaces: {
            "High Elf": {
                features: ["Extra Language", "Cantrip"],
                bonus: { Intelligence: 1 }
            },
            "Wood Elf": {
                features: ["Fleet of Foot", "Mask of the Wild"],
                bonus: { Wisdom: 1 },
                speed: 35
            },
            "Dark Elf (Drow)": {
                features: ["Superior Darkvision", "Sunlight Sensitivity", "Drow Magic"],
                bonus: { Charisma: 1 }
            }
        }
    },
    // Gnome: {
    //     subRaces: ["Forest Gnome", "Rock Gnome"],
    //     features: ["Darkvision", "Gnome Cunning"],
    //     bonus: { Intelligence: 2 }
    // },
    // Goliath: {
    //     subRaces: [],
    //     features: ["Stone's Endurance", "Powerful Build"],
    //     bonus: { Strength: 2, Constitution: 1 }
    // },
    Halfling: {
        base: {
            features: ["Lucky", "Brave", "Halfling Nimbleness"],
            bonus: { Dexterity: 2 },
            speed: 25,
            languages: ["Common", "Halfling"],
        },
        subRaces: {
            "Lightfoot": {
                features: ["Naturally Stealthy"],
                bonus: { Charisma: 1 }
            },
            "Stout": {
                features: ["Stout Resilience"],
                bonus: { Constitution: 1 }
            }
        }
    },
    Human: {
        base:{
            features: ["Versatile", "Extra Language" , "Skillful" , "Adaptable" ,"Resouceful"],
            bonus: { Strength: 1, Dexterity: 1, Constitution: 1, Intelligence: 1, Wisdom: 1, Charisma: 1 },
            speed: 30,
            languages: ["Common", "One extra language of your choice"] //เพิ่มเติมได้ 1ภาษา
        },
        subRaces: [],
    },
    Orc: {
        base:{
            features: ["Darkvision", "Aggressive", "Adrenaline Rush", "Relentless Endurance"],
            bonus: { Strength: 2, Constitution: 1 },
            speed: 30,
            languages: ["Common", "Orc"]
        },
        subRaces: [],
    },
    Tiefling: {
        base: {
            features: ["Darkvision", "Hellish Resistance"],
            bonus: { Intelligence: 1, Charisma: 2 },
            speed: 30,
            languages: ["Common", "Infernal"],
        },
        subRaces: {
            "Asmodeus Tiefling": {
                features: ["Legacy of Asmodeus"],
                bonus: {}
            },
            "Chthonic Tiefling": {
                features: ["Legacy of the Chthonic"],
                bonus: {}
            },
            "Infernal Tiefling": {
                features: ["Legacy of the Infernal"],
                bonus: {}
            }
        }
    },
    
    // HalfElf: {
    //     subRaces: [],
    //     features: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
    //     bonus: { Charisma: 2 }
    // },
    // HalfOrc: {
    //     subRaces: [],
    //     features: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
    //     bonus: { Strength: 2, Constitution: 1 }
    // },
};
