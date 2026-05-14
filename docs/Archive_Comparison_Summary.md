---
title: การเปรียบเทียบ Archive Solutions
layout: default
nav_order: 2
---

# Microsoft 365 Archive vs Azure Archive Storage
## เปรียบเทียบสำหรับการเก็บไฟล์ระยะยาว

---

## 📊 การเปรียบเทียบด่วน

| เกณฑ์ | Microsoft 365 Archive | Azure Archive Storage |
|------|----------------------|----------------------|
| **ราคาจัดเก็บ** | $0.05/GB/เดือน | ~$0.001-0.002/GB/เดือน (ต่ำสุด) |
| **ประเภทข้อมูล** | SharePoint Sites & Files | Blob Storage (ไม่มีโครงสร้าง) |
| **เวลาเข้าถึง** | ทันที (Instant) | ~15 ชม. หากต้องดึง |
| **ค่าการกู้คืน** | ฟรี (ตั้งแต่มี.ค.2025) | $0.02-0.05/GB |
| **ค่า Operations** | รวมอยู่แล้ว | $0.55/10,000 reads |
| **ขั้นต่ำ Retention** | ไม่มี | 180 วัน |
| **Integration** | Microsoft 365 Native | Azure Service |
| **Compliance** | เสริมสายรังสรมา M365 | ต้องจัดการแยกต่างหาก |

---

## 💡 ต้นทุนที่ใช้จริง (3 ปี, 1 TB, ไม่มีการดึงข้อมูล)

### Microsoft 365 Archive
- **ห้องเก็บเดือนละ**: $0.05 × 1,024 GB = $51.20
- **ต้นทุน 3 ปี**: $51.20 × 36 = **$1,843**
- **หมายเหตุ**: อาจ = $0 ถ้าอยู่ภายในโควต้า SharePoint

### Azure Archive Storage
- **ห้องเก็บเดือนละ**: $0.00150 × 1,024 GB = $1.54
- **ต้นทุน 3 ปี**: $1.54 × 36 = **~$55**
- **Write operations**: ~$0.10-$0.20 (ครั้งแรก)
- **รวมทั้งสิ้น**: ~$55-75

---

## 🔍 Microsoft 365 Archive - รายละเอียด

### ✅ ข้อดี
1. **ส่วนหนึ่งของ M365** - รวมอยู่ในโครงสร้างพื้นฐานแล้ว
2. **เข้าถึงได้ทันที** - ไม่ต้องรอการ rehydration
3. **ค้นหาได้** - eDiscovery สามารถค้นหาได้
4. **ความปลอดภัยเดียวกัน** - DLP, encryption, compliance controls
5. **ไม่มีค่าปลด lock** - หลังมี.ค.2025 การคืนค่าสำหรับกรรมการเป็นฟรี
6. **File-level archiving** - วางแผนให้ใช้งาน GA ก.ค.2026

### ❌ ข้อเสีย
1. **ราคาจัดเก็บสูง** - $0.05/GB/เดือน (หากต้องเสียค่า)
2. **ข้อจำกัดประเภท** - ใช้ได้กับ SharePoint/OneDrive เท่านั้น
3. **ต้อง M365 license** - ต้องมี Microsoft 365 subscription
4. **ความสัมพันธ์กับ quota** - ถ้าใช้ quota ครบแล้ว อาจต้องเสียค่า

### 💰 ตัวอย่างการใช้งาน
- เก็บไฟล์ SharePoint หลังจาก 2 ปี ไม่ใช้งาน
- จดหมายเก่าใน Outlook (ผ่าน Archive mailbox)
- เอกสารทีมงาน Teams ที่หมดการใช้งาน

---

## 🔍 Azure Archive Storage - รายละเอียด

### ✅ ข้อดี
1. **ราคาต่ำสุด** - $0.001-0.002/GB/เดือน
2. **ความยืดหยุ่น** - ใช้ได้กับข้อมูลประเภทใดก็ได้
3. **ไม่ต้อง M365** - ใช้งานได้อิสระจาก Microsoft 365
4. **Lifecycle Policies** - ตั้ง automation ได้

### ❌ ข้อเสีย
1. **ช้าในการเข้าถึง** - rehydration ใช้เวลา 15 ชม.
2. **ค่า Retrieval สูง** - $0.02-0.05/GB หากต้องดึง
3. **ค่า Operations** - $0.55/10,000 reads นั่นคือค่อนข้างสูง
4. **ระยะเวลาขั้นต่ำ 180 วัน** - ต้องเก็บไว้อย่างน้อย 180 วันจึงจะประหยัด
5. **ปัญหาไฟล์เล็ก** - ตั้งแต่ก.ค.2026 จะเสียค่า 128 KiB ขั้นต่ำต่อไฟล์
   - ไฟล์ 4 KB จะคิดเป็น 128 KB เต็ม!

### 💰 ตัวอย่างการใช้งาน
- ข้อมูล log ยาวนาน
- Backup ตามกฎหมาย
- ข้อมูลสถิติอดีต
- ไฟล์อัปโหลด อยากหา แต่น้อยมาก

---

## 🎯 ตัดสินใจอย่างไร?

### เลือก **Microsoft 365 Archive** ถ้า:
- ✔️ ไฟล์มาจาก SharePoint/OneDrive/Teams
- ✔️ ต้องเข้าถึงข้อมูลเร็ว
- ✔️ ต้องการ compliance & eDiscovery
- ✔️ ใช้ M365 license แล้ว
- ✔️ ใช้ SharePoint quota มาแล้ว (อาจ = $0)

### เลือก **Azure Archive Storage** ถ้า:
- ✔️ ไฟล์ไม่มาจาก M365
- ✔️ อยากหา + จำเป็นเข้าถึงน้อยมากๆ
- ✔️ เก็บไว้ 180+ วัน
- ✔️ ไฟล์ขนาดใหญ่ (> 128 KB)
- ✔️ ใช้ Azure แล้ว

### **Hybrid Approach** ถ้า:
- ✔️ มีไฟล์ทั้ง M365 และ Azure
- ✔️ ใช้ทั้ง Microsoft 365 และ Azure

---

## 🛠️ การนำไปใช้งาน

### Microsoft 365 Archive
1. **ตั้ง Lifecycle Policies**
   - วางแผนการจัดเก็บหลังจาก 2-3 ปี

2. **ตรวจสอบ Quota**
   - SharePoint: 1 TB + 10 GB/ผู้ใช้
   - OneDrive: 1 TB/ผู้ใช้
   - ถ้าอยู่ในโควต้า ไม่เสียค่า

3. **ทดสอบ eDiscovery**
   - ตรวจสอบว่าค้นหาได้ในข้อมูลจัดเก็บ

### Azure Archive Storage
1. **ตั้ง Lifecycle Policies**
   ```
   Hot (0 วัน) → Cool (30 วัน) → Cold (90 วัน) → Archive (180 วัน)
   ```

2. **ประเมินขนาดไฟล์**
   - ตรวจสอบที่จะเสียค่า 128 KiB ขั้นต่ำตั้งแต่ก.ค.2026

3. **วางแผนการดึงข้อมูล**
   - rehydration ใช้เวลา 15 ชม.
   - Retrieval fee = $0.02-0.05/GB

---

## ⚠️ ความเสี่ยงที่ต้องระวัง

### Microsoft 365 Archive
- 🚨 **ราคาสูง** หากต้องเสียค่า
- 🚨 **ปัญหา quota** - SharePoint quota มีจำกัด

### Azure Archive Storage
- 🚨 **ช้า** - ต้องรอ 15 ชม. เพื่อเข้าถึง
- 🚨 **ค่า retrieval** - สูงหากต้องดึงข้อมูลบ่อย
- 🚨 **ไฟล์เล็ก** - ต้องคิดค่า 128 KiB ขั้นต่ำ

---

## 💡 คำแนะนำสุดท้าย

### สำหรับแอปพลิเคชันที่เก็บไฟล์หลายปี:

#### **Scenario 1: แอปใช้ SharePoint/OneDrive**
```
→ ใช้ Microsoft 365 Archive
→ ตั้ง Lifecycle Policy
→ ทำให้อัตโนมัติหลังจาก 2 ปี
→ ไม่เสียค่า (ถ้าอยู่ใน quota)
```

#### **Scenario 2: แอปใช้ Azure Blob Storage**
```
→ ใช้ Azure Archive + Lifecycle Policies
→ Hot → Cool → Cold → Archive (180 วัน)
→ คำนวณต้นทุนด้วย operations fees
→ ตรวจสอบขนาดไฟล์ >= 128 KB
```

#### **Scenario 3: ข้อมูลไม่ชัดแล้ว**
```
→ ทดสอบทั้ง 2 วิธี
→ คำนวณต้นทุนจริง
→ ลองใช้ 3-6 เดือนแล้วตัดสินใจ
→ Migrate ผ่านต่อไป
```

---

## 📝 Checklist ก่อนตัดสินใจ

- [ ] **ตำแหน่งข้อมูล**: ไฟล์อยู่ที่ไหน (M365/Azure/อื่น)?
- [ ] **ความถี่เข้าถึง**: เข้าถึงบ่อยแค่ไหน?
- [ ] **ขนาดไฟล์**: ไฟล์เล็กหรือใหญ่?
- [ ] **ระยะเวลา**: เก็บกี่ปี?
- [ ] **compliance**: ต้องการ eDiscovery/DLP หรือไม่?
- [ ] **License**: มี M365 หรือ Azure แล้ว?
- [ ] **ค่าเพิ่มเติม**: ประมาณการค่า retrieval/operations
- [ ] **Quota**: ตรวจสอบ SharePoint quota (ถ้าใช้ M365)

---

## 📞 ติดต่อสำหรับช่วยเหลือ

หากต้องการช่วยเหลือเพิ่มเติม:
1. แชร์รายละเอียดข้อมูลที่ต้องเก็บ
2. บอกระยะเวลาที่ต้องเก็บ
3. บอกว่าเข้าถึงบ่อยแค่ไหน
4. ส่งเอกสารวิเคราะห์ต้นทุนจริง

---

**เอกสารนี้สร้างเมื่อ**: May 2026
**ข้อมูลล่าสุด**: ตามข้อมูล Microsoft & Azure ระหว่าง Mar-May 2026

---

## 📚 แหล่งอ้างอิง (Microsoft Official Documentation)

1. [Microsoft 365 Archive overview](https://learn.microsoft.com/en-us/microsoft-365/archive/archive-overview) — Microsoft Learn
2. [Hot, Cool, Cold, and Archive access tiers for blob data](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview) — Microsoft Learn
3. [Azure Blob Storage pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/) — Microsoft Azure
4. [Manage site collection storage limits (SharePoint quota)](https://learn.microsoft.com/en-us/sharepoint/manage-site-collection-storage-limits) — Microsoft Learn
5. [Microsoft Purview eDiscovery solutions overview](https://learn.microsoft.com/en-us/purview/ediscovery-overview) — Microsoft Learn
6. [Azure Blob Storage lifecycle management](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview) — Microsoft Learn
