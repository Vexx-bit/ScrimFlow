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

## 🏟️ 4. Phase 2: Lobby Management Flow

**\*Prerequisites:** You must be a Server Administrator to use `/scrim`.\*

### A. Hosting a Scrim

1.  **Start the Lobby**:

    ```text
    /scrim open format:SOLO region:EU
    ```

    - This posts a **Live Dashboard** embed in the channel.
    - Players can now use `/checkin`.

2.  **Monitor**:
    - Watch the "Players Checked In" counter update in real-time as users join.

3.  **Lock the Lobby** (Optional):

    ```text
    /scrim close
    ```

    - Stops new players from joining. The embed turns Red 🔴.

4.  **Send Codes**:
    ```text
    /scrim distribute code:123-456
    ```

    - The bot will immediately DM the code `123-456` to all checked-in players.
    - The lobby automatically ends after distribution.

### B. Player Experience

1.  Player sees the "🟢 OPEN" embed.
2.  Player runs `/checkin`.
3.  Bot confirms: "✅ You are in the queue."
4.  Lobby Embed updates count: `1/100`.

---

## 🧪 5. Updated Test Cases

| Case ID  | Test Description    | Input Action        | Expected Result                                 | Pass/Fail |
| :------: | ------------------- | ------------------- | ----------------------------------------------- | :-------: |
| **A-01** | **Registration**    | `/register`         | Success Embed.                                  |    ⬜     |
| **A-02** | **Unregister**      | `/unregister`       | Account Unlinked.                               |    ⬜     |
| **B-01** | **Ping Check**      | `/ping`             | "Signal Strength" Embed.                        |    ⬜     |
| **C-01** | **Start Lobby**     | `/scrim open`       | "🟢 Scrim Lobby" Embed appears.                 |    ⬜     |
| **C-02** | **Player Check-in** | `/checkin`          | Embed count increases to 1/100.                 |    ⬜     |
| **C-03** | **Distribute**      | `/scrim distribute` | **CHECK YOUR DM.** You should receive the code. |    ⬜     |

---

## 🔒 6. Channel Permissions

**Recommendation:**

- `#register-here` channel: Allow `/register`, `/unregister`.
- `#scrim-announcements` channel: Allow `/scrim`, `/checkin`.
