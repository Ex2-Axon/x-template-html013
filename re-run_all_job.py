import os
import requests
from dotenv import load_dotenv

# =====================================================================
# STEP 1: โหลดและจัดการตัวแปรจากไฟล์ .env
# =====================================================================
load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_OWNER   = os.getenv("GITHUB_OWNER")
REPO_NAME    = os.getenv("GITHUB_REPO")

# ---------------------------------------------------------------------
# ตรวจสอบความถูกต้องของตัวแปรใน .env ก่อนเริ่มทำงาน
# ---------------------------------------------------------------------
print("🔍 กำลังตรวจสอบตัวแปรจากไฟล์ .env...")
config_check = {"GITHUB_TOKEN": GITHUB_TOKEN, "GITHUB_OWNER": REPO_OWNER, "GITHUB_REPO": REPO_NAME}
missing_vars = [key for key, value in config_check.items() if value is None or value.strip() == ""]

if missing_vars:
    print(f"❌ [ERROR] ตรวจพบตัวแปรขาดหายไปในไฟล์ .env: {', '.join(missing_vars)}")
    exit(1)
else:
    print("✅ [SUCCESS] โหลดข้อมูลตัวแปรจาก .env ครบถ้วน!")


# =====================================================================
# STEP 2: ฟังก์ชันสำหรับดึง Run ID ล่าสุด (Dynamic Fetch)
# =====================================================================
def get_latest_workflow_run_id(headers):
    """
    ฟังก์ชันส่ง GET Request ไปที่ GitHub API เพื่อดึงรายการ Workflow runs ทั้งหมด 
    แล้วเลือกเอาเฉพาะตัวล่าสุด (ตัวแรกสุดในลิสต์) เพื่อส่งเลข ID กลับไป
    """
    # Endpoint สำหรับดึงข้อมูล Runs ทั้งหมดของ Repository นี้
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/actions/runs"
    
    # ส่งพารามิเตอร์ per_page=1 เพื่อขอข้อมูลแค่รายการเดียวล่าสุด ประหยัดแบนด์วิธ
    params = {"per_page": 1}
    
    try:
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code == 200:
            runs_data = response.json()
            # ตรวจสอบก่อนว่าใน Repo นี้เคยมีการรัน Workflow บ้างหรือยัง
            if runs_data.get("workflow_runs"):
                latest_run = runs_data["workflow_runs"][0]
                latest_id = latest_run["id"]
                display_name = latest_run.get("display_title", "No Title")
                print(f"🎯 [FOUND] พบ Workflow ล่าสุด: '{display_name}' (ID: {latest_id})")
                return latest_id
            else:
                print("⚠️ [WARNING] ไม่พบประวัติการรัน Workflow ใด ๆ ใน Repository นี้เลย")
                return None
        else:
            print(f"❌ [ERROR] ไม่สามารถดึงข้อมูล Runs ได้ (Status Code: {response.status_code})")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"🚨 [CRITICAL] เชื่อมต่อเพื่อดึงข้อมูล ID ไม่สำเร็จ: {e}")
        return None


# =====================================================================
# STEP 3: ฟังก์ชันหลักสำหรับสั่ง Re-run
# =====================================================================
def rerun_github_workflow():
    """
    ฟังก์ชันหลักที่รวมการดึง ID ล่าสุด และส่งคำขอ Re-run เข้าด้วยกัน
    """
    # ตั้งค่า HTTP Headers ส่วนกลางที่ต้องใช้ร่วมกันทั้ง 2 API
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    
    print(f"\n🚀 เริ่มต้นทำงานกับ Repository: {REPO_OWNER}/{REPO_NAME}")
    
    # 3.1 เรียกฟังก์ชันดึง Run ID ล่าสุดมาใช้งานแบบออโต้
    run_id = get_latest_workflow_run_id(headers)
    
    # ถ้าหา ID ไม่เจอ (เช่น ค่าว่าง หรือ Error) ให้หยุดการทำงานทันที
    if not run_id:
        print("🛑 [STOP] ยกเลิกการทำงานเนื่องจากหา Run ID ไม่พบ")
        return

    # 3.2 เมื่อได้ ID มาแล้ว กำหนด URL ปลายทางสำหรับส่งคำสั่ง Re-run
    rerun_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/actions/runs/{run_id}/rerun"
    print(f"[INFO] กำลังส่งคำขอ Re-run ไปยัง GitHub API...")

    try:
        # ส่ง POST Request เพื่อสั่งทำงานใหม่
        response = requests.post(rerun_url, headers=headers)
        
        if response.status_code == 201:
            print("🎉 [SUCCESS] สั่ง Re-run jobs ทั้งหมดเรียบร้อยแล้ว!")
            print(f"🔗 ลิงก์ติดตามผล: https://github.com/{REPO_OWNER}/{REPO_NAME}/actions/runs/{run_id}")
        elif response.status_code == 404:
            print("❌ [ERROR] สั่ง Re-run ไม่สำเร็จ: สิทธิ์ Token ไม่ถึง หรือไม่มีสิทธิ์เขียน (Write Access) ใน Repo นี้")
        else:
            print(f"⚠️ [WARNING] เกิดข้อผิดพลาดไม่คาดคิด (Status Code: {response.status_code})")
            print(f"รายละเอียด: {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"🚨 [CRITICAL] ไม่สามารถเชื่อมต่อระบบเครือข่ายได้: {e}")


# =====================================================================
# STEP 4: จุดเริ่มต้นการรันโปรแกรม
# =====================================================================
if __name__ == "__main__":
    rerun_github_workflow()