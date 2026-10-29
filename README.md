# FocusForge (ফোকাসফোর্জ)
### Professional Student Productivity & Study Planner Application

FocusForge is a production-grade, dark-mode student productivity application designed specifically for Bangladeshi students preparing for **SSC (Class 9, Class 10)** and **HSC (1st Year, 2nd Year)** examinations.

---

## 🌟 Key Features

1. **Complete 5-Step User Journey & Onboarding**:
   - **Screen 1 (Welcome & Motivation)**: Dynamic rotation of verified quotations with authors and FocusForge originals, brand tagline: *“Stay Positive. Work Hard.”* (*“ইতিবাচক থাকো। কঠোর পরিশ্রম করো।”*), and immediate Start CTA.
   - **Screen 2 (Authentication)**: Full Login and Sign Up flows with client validation, password confirmation, forgot password modal, and a safe Development / Quick Demo Login mode.
   - **Screen 3 (Student Profile Setup)**: Department selection (*Science, Commerce, Humanities*), Academic Level (*Class 9, Class 10, HSC 1st, HSC 2nd*), School/College name, Education Board (*Dhaka, Chittagong, Rajshahi, etc.*), Target GPA, and Daily study goal hours. Generates authentic curriculum presets automatically.
   - **Screen 4 (Islamic Inspirational Reflection)**: Features the Quranic verse from Surah Al-Alaq 96:1:
     > **“পড়ো তোমার সৃষ্টিকর্তার নামে, যিনি সৃষ্টি করেছেন।”**
   - **Screen 5 (Main Dashboard)**: Overview stat cards (Daily goal progress, Focused time, Tasks completed, Study streak 🔥, Upcoming exam countdown badge), Quick Action shortcuts, and Today's scheduled study plan.

2. **Five Primary Application Modules (Persistent Bottom Navigation)**:
   - **Home (হোম)**: Personalized greetings in Bengali/English, study streak counter, exam countdown, task list with instant check-off, and quick action cards.
   - **Study Planner (প্ল্যানার)**: Task creation with subjects, chapters, priority tags, dates, start times, reminders, search, sorting (by Time, Priority, Subject), and filtering (*Today, Upcoming, Overdue, Completed, All*).
   - **Focus Timer (পোমোডোরো ফোকাস டைমার)**:
     - Deep Focus (25m), Short Break (5m), and Long Break (15m) modes.
     - Custom duration adjustments.
     - Large circular countdown timer with animated SVG ring and golden glow.
     - Real-time `Date.now()` drift prevention for accurate background execution.
     - Built-in zero-latency Web Audio API ambient sounds (*White Noise, Rain, Metronome*) and peaceful completion chimes.
     - Confetti celebration on session completion.
     - Detailed session history log.
   - **Progress & Habits (অগ্রগতি ও অভ্যাস)**:
     - Total focused minutes/hours, completed sessions, and completion rates.
     - 7-day interactive bar chart.
     - Subject-wise study time breakdown.
     - Habit tracker with 7-day check-off matrix.
     - Dynamically generated study insights calculated from actual user data.
   - **Subjects & Exams (বিষয়সমূহ ও পরীক্ষা)**:
     - Authentic curriculum for Bangladeshi Science, Commerce, and Humanities.
     - Academic paper segregation (1st Paper, 2nd Paper, General).
     - Chapter and topic progression tracking (*Not Started, Reading, Revised, Completed*).
     - Examination date manager with live countdown timers.

3. **Settings & Profile Management**:
   - Profile updating (Name, Institution, Department, Board, Target GPA, Goal hours).
   - Password updating with confirmation.
   - Reactive Bilingual toggle (Bengali বাংলা and English) with zero reload latency.
   - Data Backup: Export entire study database as JSON & import backup files.
   - Safe account deletion with confirmation warning.

---

## 🎨 Visual Identity & Design Tokens

- **Backgrounds**: Deep Charcoal & True Black (`#0b0d11`, `#131620`, `#171b26`).
- **Primary Accent**: Gold & Vibrant Amber (`#FACC15`, `#F59E0B`, `#EAB308`).
- **Typography**: Bengali Unicode rendered with **Hind Siliguri** and **Plus Jakarta Sans** for crisp legibility.
- **Micro-interactions**: Subtle borders, rounded 2xl/3xl cards, and smooth touch-optimized transitions.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev

# Build for production
npm run build

# Run TypeScript checks
npm run lint
```

---

## 🔒 Security & Firestore Rules

When synchronizing with Firebase Cloud Firestore, user data is isolated under the authenticated user's ID:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /{subcollection}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```
