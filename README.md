<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand-hero-dark.svg" />
  <img src="assets/brand-hero-light.svg" width="100%" alt="gh-streak" />
</picture>

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white&style=flat-square)
![Zero deps](https://img.shields.io/badge/Zero deps-true-10b981?style=flat-square)
![CI](https://img.shields.io/badge/CI-18/20/22-2088FF?logo=githubactions&logoColor=white&style=flat-square)
![MIT](https://img.shields.io/badge/MIT-license-yellow?style=flat-square)

</div>

---

## 💡 الفكرة

الحفاظ على عادة إسهام يومية هو أقوى طريقة لبناء حضور تقني ثابت. **gh-streak** يرسم لك سلسلة أيامك في طرفية واحدة — بلا تسجيل دخول ولا مفاتيح.

---

## ✨ المزايا

- 📅 **السلسلة الحالية والطويلة**.
- 🔥 **حالة الاتصال** — متصل أو منقطع.
- 🧮 **إحصائيات عامة**.
- 📴 **بلا مصادقة** — قراءة عامة فقط.
- ⚡ **بلا اعتماديات** — Node فقط.
- 🖥️ **تلوين طرفية** و`--no-color`.

---

## 🚀 مزايا مستقبلية

- 📊 **رسم بياني أخضر** كامل.
- 🌍 **واجهات Go/Rust**.
- 🧪 **تغطية اختبار أوسع**.
- ⚙️ **تحسين الأداء** للملفات الكبيرة.

---

## 🚀 التشغيل

```bash
# بدون تثبيت
npx gh-streak <username>

# أو عالمياً
npm i -g gh-streak
gh-streak hdsm55

# خيارات
gh-streak hdsm55 --days 90      # نافذة التقويم
gh-streak hdsm55 --since 2026-01-01 --until 2026-06-30
gh-streak hdsm55 --json         # مخرجات للبرمجة
gh-streak hdsm55 --no-color
```

## 🧪 التطوير

```bash
npm test      # node:test — 5 اختبارات
node bin/gh-streak.js hdsm55
```

## 🧰 التقنيات

| الطبقة | الأدوات |
|:--|:--|
| **التشغيل** | Node.js (بلا اعتماديات) |
| **الاختبار** | node:test |
| **CI** | GitHub Actions (18/20/22) |
| **الترخيص** | MIT |

---

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand-foot-dark.svg" />
  <img src="assets/brand-foot-light.svg" width="100%" alt="footer" />
</picture>

</div>
