using Characterstat; // นำ namespace ที่มี class Character มาใช้

namespace Game // กลุ่มของโค้ด (เหมือน folder ทาง logical)
{
    // class นี้ทำหน้าที่จัดการ "ระบบต่อสู้"
    public class BattleService
    {
        // -----------------------------
        // 1. ไม่มี parameter ไม่มี return
        // -----------------------------
        public void ShowWelcome()
        {
            // แค่แสดงข้อความ ไม่รับค่า ไม่คืนค่า
            Console.WriteLine("Welcome to the mini RPG!");
        }

        // -----------------------------
        // 2. มี parameter ไม่มี return
        // -----------------------------
        public void ShowStatus(Character c)
        {
            // รับ Character เข้ามา แล้วแสดงข้อมูล
            Console.WriteLine(c.Name + " HP: " + c.HP);
        }

        // -----------------------------
        // 3. ไม่มี parameter มี return
        // -----------------------------
        public int GetDefaultDamage()
        {
            // ไม่รับอะไร แต่ส่งค่ากลับ
            return 10;
        }

        // -----------------------------
        // 4. มี parameter มี return (สำคัญสุด)
        // -----------------------------
        public int CalculateDamage(Character attacker, Character target)
        {
            // รับ attacker + target
            // คำนวณ damage แล้วส่งค่ากลับ
            // ตอนนี้ใช้ AttackPower ตรง ๆ
            return attacker.AttackPower;
        }

        // -----------------------------
        // Logic หลักของเกม (Battle Loop)
        // -----------------------------
        public void Battle(Character character, Character enemy)
        {
            // loop จะทำงาน "ตราบใดที่ทั้งสองยังไม่ตาย"
            while (character.HP > 0 && enemy.HP > 0)
            {
                // -------------------------
                // ฝั่ง Hero โจมตี
                // -------------------------
                
                // เรียก function เพื่อคำนวณ damage
                int dmg = CalculateDamage(character, enemy);

                // เอา damage ไปลด HP ของ enemy
                enemy.HP -= dmg;

                // กันไม่ให้ HP ติดลบ
                if (enemy.HP < 0) 
                    enemy.HP = 0;

                // แสดงผล
                Console.WriteLine(character.Name + " attacks " + enemy.Name);
                Console.WriteLine("HP: " + enemy.HP);

                // ถ้า enemy ตาย → ออกจาก loop ทันที
                if (enemy.HP <= 0) 
                    break;

                // -------------------------
                // ฝั่ง Enemy โจมตี
                // -------------------------

                // คำนวณ damage
                dmg = CalculateDamage(enemy, character);

                // ลด HP ของ character
                character.HP -= dmg;

                // กันไม่ให้ติดลบ
                if (character.HP < 0) 
                    character.HP = 0;

                // แสดงผล
                Console.WriteLine(enemy.Name + " attacks " + character.Name);
                Console.WriteLine("HP: " + character.HP);
            }
        }
    }
}