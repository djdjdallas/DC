# Image drop zone

Drop the real assets here, then point `lib/data.ts` at them:

| File                          | Used for                          | Recommended size        |
| ----------------------------- | --------------------------------- | ----------------------- |
| `hero.jpg`                    | Hero background (tour bus @ dusk) | ≥1920×1080, landscape   |
| `team/jason-porter.jpg`       | Jason Porter — Founder & CEO      | ≥600×600, square-ish    |
| `team/cameron-porter.jpg`     | Cameron Porter — Co-Founder       | ≥600×600, square-ish    |
| `team/jerry-williams.jpg`     | Jerry Williams — CIO              | ≥600×600, square-ish    |
| `team/aj-williams.jpg`        | AJ Williams — Head of Technology  | ≥600×600, square-ish    |
| `team/kelly-miller.jpg`       | Kelly Miller — Head of Nat. Rel.  | ≥600×600, square-ish    |

In `lib/data.ts`, set `heroImage = "/images/hero.jpg"` and each team
member's `photo` field (e.g. `photo: "/images/team/jason-porter.jpg"`).
