export const CLASSES = {
    Barbarian: {
        base:{
            PrimaryStat: "Strength",
            HitDie: 12,
            SavingThrows: ["Strength", "Constitution"],
            SkillChoices:{ 
                from: [
                    "Animal Handling", 
                    "Athletics", 
                    "Intimidation", 
                    "Nature", "Perception", 
                    "Survival"],
                choose: 2 
            },
            ArmorProficiencies: ["Light Armor", "Medium Armor"],
            WeaponProficiencies: ["Simple Weapons", "Martial Weapons"],
            startingEquipment: {
                A: ["Greataxe", "Any Martial Melee Weapon"],
                B: ["Two Handaxes", "Any Simple Weapon"],
                C: ["Explorer's Pack", "Javelin (4)"]
            }
        },
        subClasses: ["Berserker", "Totem Warrior"]
    },
    Bard: {
        base:{
            PrimaryStat: "Charisma",
            HitDie: 8,
            SavingThrows: ["Dexterity", "Charisma"],
            SkillChoices:{
                from: [
                    "Acrobatics", 
                    "Animal Handling", 
                    "Arcana",
                    "Athletics",
                    "Deception",
                    "History",
                    "Insight",
                    "Intimidation",
                    "Investigation",
                    "Medicine",
                    "Nature",
                    "Perception",
                    "Performance",
                    "Persuasion",
                    "Religion",
                    "Sleight of Hand",
                    "Stealth",
                    "Survival"
                ],
                choose: 3 
            },
            ArmorProficiencies: ["Light Armor"],
            WeaponProficiencies: ["Simple Weapons"," Longswords", "Rapiers", "Shortswords", "Hand Crossbows"],
            startingEquipment: {
                A: ["Rapier", "Longsword", "Any Simple Weapon"],
                B: ["Diplomat's Pack", "Entertainer's Pack"],
                C: ["Lute", "Any Other Musical Instrument" ]
            }
        },
        subClasses: ["College of Lore", "College of Valor"]
    },
    Cleric: {
        base:{
            PrimaryStat: "Wisdom",
            HitDie: 8,
            SavingThrows: ["Wisdom", "Strength"],
            SkillChoices:{
                from: [
                    "History",
                    "Insight",
                    "Medicine",
                    "Persuasion",
                    "Religion"
                ],
                choose: 2 
            },
            ArmorProficiencies: ["Light Armor", "Medium Armor", "Shields"],
            WeaponProficiencies: ["Simple Weapons"],
            startingEquipment: {
                A: ["Mace", "Warhammer (if proficient)"],
                B: ["Scale Mail", "Leather Armor", "Chain Mail (if proficient)"],
                C: ["Light Crossbow (20 bolts)", "Any Simple Weapon"],
                D: ["Priest's Pack", "Explorer's Pack"],
                E: ["Shield", "Holy Symbol"]
            }
        },
        subClasses: ["Life Domain", "Light Domain"]
    },
    Druid: {
        base:{
            PrimaryStat: "Wisdom",
            HitDie: 8,
            SavingThrows: ["Wisdom", "Dexterity"],
            SkillChoices:{
                from: [
                    "Animal Handling",
                    "Arcana",
                    "Insight",
                    "Medicine",
                    "Nature",
                    "Perception",
                    "Religion",
                    "Survival"
                ],
                choose: 2 
            },
            ArmorProficiencies: ["Light Armor", "Shields (non-metal)"],
            WeaponProficiencies: ["Club", "Dagger", "Dart", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear"],
            startingEquipment: {
                A: ["Wooden Shield", "Any Simple Weapon"],
                B: ["Scimitar", "Any Simple Melee Weapon"],
                C: ["Leather Armor", "Druidic Pack", "Druidic Focus"]
            }
        },
        subClasses: ["Circle of the Land", "Circle of the Moon"]
    },
    Fighter: {
        base:{
            PrimaryStat: "Strength or Dexterity",
            HitDie: 10,
            SavingThrows: ["Strength", "Constitution"],
            SkillChoices:{
                from: [
                    "Acrobatics", 
                    "Animal Handling", 
                    "Athletics",
                    "History",
                    "Insight",
                    "Intimidation",
                    "Perception",
                    "Survival"
                ],
                choose: 2 
            },
            ArmorProficiencies: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields"],
            WeaponProficiencies: ["Simple Weapons", "Martial Weapons"],
            startingEquipment: {
                A: ["Chain Mail", "Leather Armor, Longbow (20 arrows)"],
                B: ["Any Martial Weapon and a Shield", "Two Martial Weapons"],
                C: ["Light Crossbow (20 bolts) or Two Handaxes", "Any Simple Weapon"],
                D: ["Dungeoneer's Pack", "Explorer's Pack"]
            }
        },
        subClasses: ["Champion", "Battle Master"]
    },
    Monk: {
        base:{
            PrimaryStat: "Dexterity and Wisdom",
            HitDie: 8,
            SavingThrows: ["Strength", "Dexterity"],
            SkillChoices:{
                from: [
                    "Acrobatics",
                    "Athletics",
                    "History",
                    "Insight",
                    "Religion",
                    "Stealth"
                ],
                choose: 2 
            },
            ArmorProficiencies: [],
            WeaponProficiencies: ["Simple Weapons (Light)", "Martial weapons (Light)"],
            startingEquipment: {
                A: ["Shortsword", "Any Simple Weapon"],
                B: ["Dungeoneer's Pack", "Explorer's Pack"],
                C: ["10 Darts","Aryisan Tools", "Musical Instrument"]
            }
        },
        subClasses: ["Way of the Open Hand", "Way of Shadow"]
    },
    paladin: {
        base:{
            PrimaryStat: "Strength and Charisma",
            HitDie: 10,
            SavingThrows: ["Wisdom", "Charisma"],
            SkillChoices:{
                from: [
                    "Athletics",
                    "Insight",
                    "Intimidation",
                    "Medicine",
                    "Persuasion",
                    "Religion"
                ],
                choose: 2 
            },
            ArmorProficiencies: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields"],
            WeaponProficiencies: ["Simple Weapons", "Martial Weapons"],
            startingEquipment: {
                A: ["Martial Weapon and a Shield", "Two Martial Weapons"],
                B: ["5 Javelins", "Any Simple Melee Weapon"],
                C: ["Priest's Pack", "Explorer's Pack"],
                D: ["Chain Mail", "Holy Symbol"]
            }
        },
        subClasses: ["Oath of Devotion", "Oath of the Ancients"]
    },
    Ranger: {
        base:{
            PrimaryStat: "Dexterity and Wisdom",
            HitDie: 10,
            SavingThrows: ["Strength", "Dexterity"],
            SkillChoices:{
                from: [
                    "Animal Handling",
                    "Athletics",
                    "Insight",
                    "Investigation",
                    "Nature",
                    "Perception",
                    "Stealth",
                    "Survival"
                ],
                choose: 3 
            },
            ArmorProficiencies: ["Light Armor", "Medium Armor", "Shields"],
            WeaponProficiencies: ["Simple Weapons", "Martial Weapons"],
            startingEquipment: {
                A: ["Scale Mail", "Leather Armor"],
                B: ["Two Shortswords", "Any Simple Melee Weapon"],
                C: ["Dungeoneer's Pack", "Explorer's Pack"],
                D: ["Longbow (20 arrows)", "Any Simple Weapon"]
            },
        },
        subClasses: ["Hunter", "Beast Master"]
    },
    Rogue: {
        base:{
            PrimaryStat: "Dexterity",
            HitDie: 8,
            SavingThrows: ["Dexterity", "Intelligence"],
            SkillChoices:{
                from: [
                    "Acrobatics",
                    "Athletics",
                    "Deception",
                    "Insight",
                    "Intimidation",
                    "Investigation",
                    "Perception",
                    "Performance",
                    "Persuasion",
                    "Sleight of Hand",
                    "Stealth"
                ],
                choose: 4
            },
            ArmorProficiencies: ["Light Armor"],
            WeaponProficiencies: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
            startingEquipment: {
                A: ["Rapier", "Shortsword"],
                B: ["Shortbow (20 arrows)", "Shortsword"],
                C: ["Burglar's Pack", "Dungeoneer's Pack", "Explorer's Pack"],
                D: ["Leather Armor", "Two Daggers", "Thieves' Tools"]
            },
        },
        subClasses: ["Thief", "Assassin"]
        
    },
    Sorcerer: {
        base:{
            PrimaryStat: "Charisma",
            HitDie: 6,
            SavingThrows: ["Constitution", "Charisma"],
            SkillChoices:{
                from: [
                    "Arcana",
                    "Deception",
                    "Insight",
                    "Intimidation",
                    "Persuasion",
                    "Religion"
                ],
                choose: 2
            },
            ArmorProficiencies: [],
            WeaponProficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
            startingEquipment: {
                A: ["Quarterstaff", "Dagger"],
                B: ["Component Pouch", "Spellbook"],
                C: ["Dungeoneer's Pack", "Explorer's Pack"],
                D: ["Leather Armor", "Two Daggers"]
            }
        },
        subClasses: ["Draconic Bloodline", "Wild Magic"]
    },
    Wizard: {
        base:{
            PrimaryStat: "Intelligence",
            HitDie: 6,
            SavingThrows: ["Intelligence", "Wisdom"],
            SkillChoices:{
                from: [
                    "Arcana",
                    "History",
                    "Insight",
                    "Investigation",
                    "Medicine",
                    "Religion"
                ],
                choose: 2 
            },
            ArmorProficiencies: [],
            WeaponProficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
            startingEquipment: {
                A: ["Quarterstaff", "Dagger"],
                B: ["Component Pouch", "Spellbook"],
                C: ["Scholar's Pack", "Explorer's Pack"],
                D: ["Spellbook"]
            }
        },
        subClasses: ["Evocation", "Necromancy"]
    }
}
