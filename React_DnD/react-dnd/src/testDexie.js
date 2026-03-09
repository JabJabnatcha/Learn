// Test script for Dexie integration
import { createCharacter } from './Application/services/createCharacter.js';
import { createCharacter as createCharacterRepo } from './Infrastructure/database/CharacterRepository.js';
import { getAllCharacters } from './Infrastructure/database/CharacterRepository.js';

async function testDexie() {
  console.log('🧪 Testing Dexie Integration...');

  try {
    // Create test character data
    const testData = {
      name: 'Test Character',
      race: 'Human',
      characterClass: 'Fighter',
      level: 1,
      age: 25,
      height: 180,
      weight: 80,
      eyes: 'Blue',
      skin: 'Fair',
      hair: 'Brown',
      money: { gp: 100 },
      status: {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 10,
        wisdom: 13,
        charisma: 11
      }
    };

    console.log('📝 Creating character...');
    const characterEntity = createCharacter(testData);
    const created = await createCharacterRepo(characterEntity);
    console.log('✅ Character created:', created.name, 'with ID:', created.id);

    console.log('📖 Getting all characters...');
    const allChars = await getAllCharacters();
    console.log('📊 Total characters:', allChars.length);
    allChars.forEach(char => {
      console.log(`  - ${char.name} (${char.race} ${char.characterClass})`);
    });

    console.log('🎉 Dexie integration test passed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testDexie();