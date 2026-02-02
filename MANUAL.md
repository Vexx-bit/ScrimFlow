# 📘 ScrimFlow Operator's Manual & QA Protocol

**Version:** 1.1.0 (Phase 1 Refined)  
**Status:** MVP / Development  
**Target Audience:** Architects, QA Testers, Server Admins

---

## 🚀 1. Quick Start

### Starting the Bot

Open your terminal in `e:\Xampp\scrimflow` and run:

```powershell
# For Development (Auto-restarts on code change)
npm run dev

# For Production
npm run build
npm start
```

---

## 🎮 2. Command Reference

### `/register`

**Purpose:** Create your competitive profile.

- **Usage:** `/register [epic_name] [region]`
- **Arguments:**
  - `epic_name`: The user's exact Epic Games username (3-32 chars).
  - `region`: Select from the dropdown (EU, NA-East, etc.).
- **Output:** A Cyan-themed embed confirming registration.

### `/unregister`

**Purpose:** Fix registration mistakes.

- **Use Case:** A user typo'd their name or entered the wrong account.
- **Process:** Run command -> Click "Yes, Unlink" -> Profile is deleted.

### `/ping`

**Purpose:** Check connection to game servers.

- **Usage:**
  - `/ping` (Opens a menu to select a region)
  - `/ping region:EU` (Directly tests EU server)
- **Output:** Simple "Signal Strength" indicator (e.g. 🟢 Stable). No technical jargon.

---

## 🕵️ 3. Security & Anti-Impersonation

**The impersonation problem:** "What if I register as 'Bugha'?"

**Current Solution (MVP):**

1.  **Trust Model:** We assume players want to track _their own_ stats.
2.  **Correction:** The `/unregister` command allows fixing mistakes.
3.  **Future Phase (OAuth2):** To enforce 100% identity, we would need players to log in via an external website (`scrimflow.com`) to link their Discord to Epic securely. Since this bot runs locally, we use the Trust Model for now.

**Recommendation:**

- Admins should periodically check high-earning players.
- Add a "Verified" role in Discord for known pros.

---

## 🏟️ 4. Future: Lobby Management Flow (Preview)

We have scaffolded the `LobbyManager` for Phase 2. The workflow will be:

1.  **Admin:** `/scrim open region:EU format:SOLO`
2.  **Players:** `/checkin` (Only for registered users)
3.  **Bot:** Checks if player is registered. Adds to lobby.
4.  **Admin:** `/scrim close` -> `/scrim distribute [CODE]`
5.  **Bot:** Sends the code to all checked-in players via DM.

This prevents randoms from getting the code and ensures everyone is registered.

---

## 🧪 5. Updated Test Cases

| Case ID  | Test Description | Input Action  | Expected Result                                   | Pass/Fail |
| :------: | ---------------- | ------------- | ------------------------------------------------- | :-------: |
| **A-01** | **Registration** | `/register`   | Success Embed.                                    |    ⬜     |
| **A-02** | **Unregister**   | `/unregister` | Warning Embed -> Click Yes -> "Account Unlinked". |    ⬜     |
| **B-01** | **Ping Check**   | `/ping`       | "Connection Strength" Embed.                      |    ⬜     |
| **B-02** | **Region Test**  | Select Region | Gamer-friendly ping stats (e.g. "Stable").        |    ⬜     |

---

## 🔒 6. Channel Permissions (#register-here)

To restrict the bot to `#register-here`:

1. Go to **Server Settings** > **Integrations** > **Bots and Apps**.
2. Select **ScrimFlow**.
3. Under "Commands", find `/register`.
4. Allow: `#register-here`.
5. Deny: `All Channels`.
