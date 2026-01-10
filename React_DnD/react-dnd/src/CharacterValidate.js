export function validateLevel(level) {
        if (typeof level !== 'number' || level < 1 || level > 20) {
            return 1; // ค่าเริ่มต้นเป็น 1 ถ้าไม่ถูกต้อง
        }
        return level;
    }

export function validateStatus(status) {
        if (typeof status !== 'number' || status < 1 || status > 30) {
            return 10; // ค่าเริ่มต้นเป็น 10 ถ้าไม่ถูกต้อง
        }
        return status;
    }
