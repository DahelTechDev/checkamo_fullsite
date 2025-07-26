# ✅ Checkamo — Trust-Powered Real-World Verifications

> “Don’t guess. Check am o!”

Checkamo is a digital platform that allows users to verify products, properties, people, services, or vendors before making transactions. Through a network of community-vetted verifiers, Checkamo helps reduce scam risks and builds trust in informal and online economies — starting with Nigeria, scaling globally.

---

## 🚀 Vision

To become the go-to platform for **real-time, on-ground verifications** by connecting individuals with **trusted local verifiers**. From buying land to hiring a service or making marketplace purchases, users should be able to request visual proof, voice notes, and physical presence of a verifier before committing.

---

## 🧱 MVP GOALS

### ✅ Key Objectives:

1. **Enable users to submit verification requests easily**
2. **Connect users with available, trusted verifiers**
3. **Deliver visual proof (media, voice notes, GPS location)**
4. **Support flagging of scammers (Danger Zone)**
5. **Build referral & reward coin system**
6. **Lay foundation for multilingual UX and user safety**

---

## 🎯 Core Features (MVP)

| Feature                    | Description                                                                      |
| -------------------------- | -------------------------------------------------------------------------------- |
| 🔍 Request Verification    | Input item to verify (e.g. “Samsung phone on Jiji”), category, location, urgency |
| 🧑‍💼 Verifier Dashboard      | Accept requests, upload photos/videos/voice notes, confirm GPS location          |
| 🛑 Danger Zone             | A report system for suspicious vendors, people, or products                      |
| 🪪 Verified Business Badge  | Mark verified vendors/agents for credibility                                     |
| 💬 Language Preference     | Support for Pidgin, Hausa, Igbo, Yoruba, and English                             |
| 💸 Referral Coins          | Invite friends, earn coins, unlock extra media & perks                           |
| ⚖️ Admin Mediation         | Admin-only panel for disputes and content moderation                             |
| ⚠️ Report Verifier Button  | Let users report poor or fraudulent verifiers                                    |
| 🤖 AI Concierge (WhatsApp) | Optional WhatsApp bot that guides users through verification                     |
| 👁️ Limited Free Access     | Paywall for videos and sensitive content (coins or VIP)                          |
| 🎓 Onboarding Flow         | For both users and verifiers                                                     |
| 🏷️ Categories & Filters    | Browse requests and verifiers by industry (real estate, logistics, etc.)         |

---

## 📐 Project Structure Recommendation

checkamo/
├── frontend/ # React/Next.js or Vue SPA
│ ├── pages/
│ ├── components/
│ ├── utils/
│ └── assets/
├── backend/ # Node.js/Express or Django API
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middlewares/
│ └── services/
├── database/ # PostgreSQL/MongoDB scripts
├── mobile/ # React Native (optional)
├── public/
├── README.md
└── .env.example

---

## 🌐 Tech Stack Suggestion

| Layer         | Tech                              |
| ------------- | --------------------------------- |
| Frontend      | React.js / Next.js / Tailwind CSS |
| Backend       | Node.js (Express) / Django REST   |
| DB            | PostgreSQL or MongoDB             |
| Auth          | JWT, Firebase Auth or Auth0       |
| Media Uploads | Cloudinary or AWS S3              |
| GeoLocation   | Google Maps API / IPStack         |
| Notifications | OneSignal / FCM / EmailJS         |
| Payments      | Paystack / Flutterwave            |
| Bot           | WhatsApp Cloud API + Webhook      |

---

## 🔐 Authentication & Roles

- **Users:** Submit verification requests, view reports, tip verifiers
- **Verifiers:** Accept/decline tasks, upload proof, receive tips
- **Admins:** Mediate disputes, verify businesses, approve flagged content

Use **role-based access control (RBAC)** and secure APIs.

---

## 🧪 Sample Endpoints (Backend)

### `POST /api/request`

Submit a new verification request

```json
{
  "item": "Toyota Camry 2010 at Ikeja",
  "category": "Vehicle",
  "location": "Lagos",
  "urgency": "High",
  "user_id": "12345"
}

### POST /api/verifier/respond
Verifier responds to task with media

{
  "request_id": "abc123",
  "verifier_id": "98765",
  "images": ["url1", "url2"],
  "video": "url3",
  "location": "6.5244, 3.3792",
  "voice_note": "url4"
}

---

###  `GET /api/danger-zone`
Returns recent scammer reports

POST /api/flag
Flag a verifier or user

🎮 User Flow (Basic)
For Requesters:

Submit a verification request

Wait for a verifier to accept

View photo/video/GPS proof

Confirm, tip, or escalate to admin

For Verifiers:

Apply and get approved

See open requests nearby

Accept task, upload proof

Earn coins/tips, get rated


-------


📣 Frontend Notes
Use mobile-first design

Highlight “Request Verification” button prominently

Use animation for trust (checkmarks, typing dots, etc.)

Show limits if user runs out of free views

Add fallback if video/audio fails to load

Prioritize accessibility (alt texts, color contrast)


------

📌 Success Metrics
🚀 Requests submitted per day/week

✅ Tasks fulfilled successfully

🎥 Verifications with all 4 media types uploaded

🧍 New verifiers recruited

🎫 Referrals generated

🚩 Reports & admin escalations closed

🛡️ Security Considerations
Verify phone/email of all users

Ensure media is uploaded securely (no tampering)

Enable 2FA for verifiers

Prevent GPS spoofing via server-side checks

Moderate user-generated content regularly


-------
👥 Credits / Team
Founder: David Francis Effiong

Org: Dahel Technologies and Consultants

Design Lead: [Joseph Ephraim]

Lead Developers: [Inah and Roland ]

Frontend Developer: [Divine]

Product Manager: [Uchechi]



```
