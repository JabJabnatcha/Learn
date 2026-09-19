import csv
import random
from datetime import date, datetime, timedelta

# ==========================================
# 1. HELPER FUNCTIONS & MOCK DATA
# ==========================================

FIRST_NAMES_MALE = ["สมชาย", "ธนพล", "กิตติศักดิ์", "ณัฐพงษ์", "ธีรภัทร", "อนุชา", "วรวุฒิ", "ภาณุพงศ์"]
FIRST_NAMES_FEMALE = ["สุภาพร", "กัญญารัตน์", "พรทิพย์", "นฤมล", "ชุติมา", "ศิริพร", "วรรณภา", "พิมพา"]
LAST_NAMES = ["สุขสมบูรณ์", "เจริญผล", "มั่นคง", "ศรีสวัสดิ์", "รัตนวงค์", "ทองประเสริฐ", "วรคุณ", "เกียรติไพบูลย์"]

STATUS_CHOICES = ["มีชีวิต", "เสียชีวิต", "สูญหาย"]


def generate_thai_id() -> str:
    """Generate a valid 13-digit Thai National ID with correct checksum."""
    digits = [random.randint(1, 8)] + [random.randint(0, 9) for _ in range(11)]
    total = sum(digits[i] * (13 - i) for i in range(12))
    check_digit = (11 - (total % 11)) % 10
    digits.append(check_digit)
    return "".join(map(str, digits))


def generate_thai_phone() -> str:
    prefix = random.choice(["08", "09", "06"])
    return f"{prefix}{random.randint(10000000, 99999999)}"


def to_be_date_str(d: date) -> str:
    """Format date to DD/MM/YYYY in Buddhist Era (BE)."""
    return f"{d.day:02d}/{d.month:02d}/{d.year + 543}"


def calculate_age_str(dob: date, ref_date: date) -> str:
    """Calculate age in 'Xปี Yวัน' relative to a reference date."""
    if not dob:
        return "-"
    
    # Calculate years
    years = ref_date.year - dob.year
    if (ref_date.month, ref_date.day) < (dob.month, dob.day):
        years -= 1
    
    # Calculate remaining days from the last birthday
    last_birthday = date(ref_date.year if (ref_date.month, ref_date.day) >= (dob.month, dob.day) else ref_date.year - 1, dob.month, dob.day)
    # Handle leap year edge cases
    try:
        remainder_days = (ref_date - last_birthday).days
    except ValueError:
        last_birthday = date(last_birthday.year, 2, 28)
        remainder_days = (ref_date - last_birthday).days

    return f"{years}ปี {remainder_days}วัน"


def generate_dob(ref_date: date, min_years: int, max_years: int, extra_days: int = 0) -> date:
    """Generate exact DOB relative to ref_date."""
    target_year = ref_date.year - random.randint(min_years, max_years)
    month = random.randint(1, 12)
    day = random.randint(1, 28)  # Safe day range for simplicity
    dob = date(target_year, month, day) - timedelta(days=extra_days)
    return dob


# ==========================================
# 2. TEST CASE BUILDER & SCENARIO ENGINE
# ==========================================

def create_scenario_record(scenario_id: int) -> dict:
    # Anchor Dates (Contract validity)
    start_date = date(2025, 10, 1) + timedelta(days=random.randint(0, 60))
    end_date = start_date + timedelta(days=365)  # Contract 1 year
    
    # Predefined test matrix covering business rules
    if scenario_id == 1:
        # Happy Path: All eligible, 45 days early renewal (Starbucks eligible)
        early_days = 45
        p_dob = generate_dob(end_date, 35, 45)
        s_status, s_dob = "มีชีวิต", generate_dob(end_date, 30, 40)
        c1_status, c1_dob = "มีชีวิต", generate_dob(end_date, 8, 12)
        c2_status, c2_dob = "มีชีวิต", generate_dob(end_date, 2, 6)
    elif scenario_id == 2:
        # Boundary Early Renewal (90 days exact) -> Eligible
        early_days = 90
        p_dob = generate_dob(end_date, 40, 50)
        s_status, s_dob = "มีชีวิต", generate_dob(end_date, 38, 48)
        c1_status, c1_dob = "มีชีวิต", generate_dob(end_date, 10, 14)
        c2_status, c2_dob = "มีชีวิต", generate_dob(end_date, 3, 5)
    elif scenario_id == 3:
        # Boundary Ineligible Reward (< 30 days, e.g. 20 days)
        early_days = 20
        p_dob = generate_dob(end_date, 30, 40)
        s_status, s_dob = "มีชีวิต", generate_dob(end_date, 28, 38)
        c1_status, c1_dob = "มีชีวิต", generate_dob(end_date, 5, 8)
        c2_status, c2_dob = "มีชีวิต", generate_dob(end_date, 1, 3)
    elif scenario_id == 4:
        # Child 1 Age > 15 (Ineligible bundle member)
        early_days = 60
        p_dob = generate_dob(end_date, 45, 52)
        s_status, s_dob = "มีชีวิต", generate_dob(end_date, 42, 50)
        c1_dob = date(end_date.year - 16, end_date.month, end_date.day) - timedelta(days=10) # 16 years old
        c1_status = "มีชีวิต"
        c2_status, c2_dob = "มีชีวิต", generate_dob(end_date, 10, 12)
    elif scenario_id == 5:
        # Spouse Deceased (Status filter test)
        early_days = 50
        p_dob = generate_dob(end_date, 55, 60)
        s_status, s_dob = "เสียชีวิต", generate_dob(end_date, 52, 58)
        c1_status, c1_dob = "มีชีวิต", generate_dob(end_date, 12, 14)
        c2_status, c2_dob = None, None  # No child 2
    elif scenario_id == 6:
        # Primary Insured Boundary: 65 years old
        early_days = 30
        p_dob = date(end_date.year - 65, end_date.month, end_date.day) # Exactly 65
        s_status, s_dob = "มีชีวิต", generate_dob(end_date, 60, 64)
        c1_status, c1_dob = "มีชีวิต", generate_dob(end_date, 13, 14)
        c2_status, c2_dob = None, None
    else:
        # Random Variation
        early_days = random.randint(10, 95)
        p_dob = generate_dob(end_date, 25, 64)
        s_status = random.choice(STATUS_CHOICES) if random.random() > 0.1 else "-"
        s_dob = generate_dob(end_date, 25, 64) if s_status not in ["-", None] else None
        c1_status = random.choice(STATUS_CHOICES) if random.random() > 0.2 else "-"
        c1_dob = generate_dob(end_date, 1, 16) if c1_status not in ["-", None] else None
        c2_status = random.choice(STATUS_CHOICES) if random.random() > 0.4 else "-"
        c2_dob = generate_dob(end_date, 1, 14) if c2_status not in ["-", None] else None

    # Names and demographics
    p_last = random.choice(LAST_NAMES)
    p_name = f"{random.choice(FIRST_NAMES_MALE)} {p_last}"
    p_id = generate_thai_id()
    p_phone = generate_thai_phone()
    p_email = f"user_{scenario_id}@example.com"

    s_name = f"{random.choice(FIRST_NAMES_FEMALE)} {p_last}" if s_dob else "-"
    c1_name = f"{random.choice(FIRST_NAMES_MALE + FIRST_NAMES_FEMALE)} {p_last}" if c1_dob else "-"
    c2_name = f"{random.choice(FIRST_NAMES_MALE + FIRST_NAMES_FEMALE)} {p_last}" if c2_dob else "-"

    return {
        # ผู้เอาประกันหลัก
        "ชื่อ-สกุล (ผู้รับประกัน)": p_name,
        "เลขบัตรประชาชน": p_id,
        "เบอร์โทรศัพท์": p_phone,
        "Email": p_email,
        "ว/ด/ป เกิด(พ.ศ.) (ผู้รับประกัน)": to_be_date_str(p_dob),
        "อายุ (ผู้รับประกัน)": calculate_age_str(p_dob, end_date),
        
        # คู่สมรส
        "คู่สมรส: มีชีวิต": s_status if s_status else "-",
        "คู่สมรส: ชื่อ-สกุล": s_name,
        "คู่สมรส: ว/ด/ป เกิด(พ.ศ.)": to_be_date_str(s_dob) if s_dob else "-",
        "คู่สมรส: อายุ": calculate_age_str(s_dob, end_date) if s_dob else "-",
        
        # บุตรคนที่ 1
        "บุตรคนที่ 1: มีชีวิต": c1_status if c1_status else "-",
        "บุตรคนที่ 1: ชื่อ-สกุล": c1_name,
        "บุตรคนที่ 1: ว/ด/ป เกิด(พ.ศ.)": to_be_date_str(c1_dob) if c1_dob else "-",
        "บุตรคนที่ 1: อายุ": calculate_age_str(c1_dob, end_date) if c1_dob else "-",
        
        # บุตรคนที่ 2
        "บุตรคนที่ 2: มีชีวิต": c2_status if c2_status else "-",
        "บุตรคนที่ 2: ชื่อ-สกุล": c2_name,
        "บุตรคนที่ 2: ว/ด/ป เกิด(พ.ศ.)": to_be_date_str(c2_dob) if c2_dob else "-",
        "บุตรคนที่ 2: อายุ": calculate_age_str(c2_dob, end_date) if c2_dob else "-",
        
        # ข้อมูลสัญญา
        "วันที่เริ่มสัญญาฉบับปัจจุบัน": to_be_date_str(start_date),
        "วันที่สิ้นสุดอายุความคุ้มครอง": to_be_date_str(end_date),
        "จำนวนวันที่ต่ออายุล่วงหน้า": f"{early_days} วัน",
    }


# ==========================================
# 3. CSV GENERATOR EXECUTION
# ==========================================

def generate_csv_file(filename: str = "SCK-insurance.csv", num_records: int = 15):
    records = [create_scenario_record(i + 1) for i in range(num_records)]
    
    headers = [
        "ชื่อ-สกุล (ผู้รับประกัน)", "เลขบัตรประชาชน", "เบอร์โทรศัพท์", "Email",
        "ว/ด/ป เกิด(พ.ศ.) (ผู้รับประกัน)", "อายุ (ผู้รับประกัน)",
        "คู่สมรส: มีชีวิต", "คู่สมรส: ชื่อ-สกุล", "คู่สมรส: ว/ด/ป เกิด(พ.ศ.)", "คู่สมรส: อายุ",
        "บุตรคนที่ 1: มีชีวิต", "บุตรคนที่ 1: ชื่อ-สกุล", "บุตรคนที่ 1: ว/ด/ป เกิด(พ.ศ.)", "บุตรคนที่ 1: อายุ",
        "บุตรคนที่ 2: มีชีวิต", "บุตรคนที่ 2: ชื่อ-สกุล", "บุตรคนที่ 2: ว/ด/ป เกิด(พ.ศ.)", "บุตรคนที่ 2: อายุ",
        "วันที่เริ่มสัญญาฉบับปัจจุบัน", "วันที่สิ้นสุดอายุความคุ้มครอง", "จำนวนวันที่ต่ออายุล่วงหน้า"
    ]
    
    with open(filename, mode="w", encoding="utf-8-sig", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=headers)
        writer.writeheader()
        writer.writerows(records)

    print(f"Generated {num_records} test records successfully -> '{filename}'")


if __name__ == "__main__":
    generate_csv_file("SCK-insurance.csv", num_records=10)