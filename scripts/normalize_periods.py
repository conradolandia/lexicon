#!/usr/bin/env python3
"""Normalize abbreviation period strings in static/abbr.json to a canonical form.

Rules (cosmetic / structural only — no semantic typo fixes):
- Trim and collapse whitespace
- Roman numerals in uppercase
- Qualifiers as " f." | " m." | " p."
- Ranges joined with "-" (no spaces around the hyphen)
- Both ends of a range may carry a qualifier: "XVI p.-XVI m."
"""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ABBR_PATH = ROOT / "static" / "abbr.json"
REPORT_PATH = Path(__file__).resolve().parent / "period-normalize-report.md"

ROMAN = r"[IVXLC]+"
QUAL = r"[fmp]"


def normalize_segment(segment: str) -> str:
    """Normalize a single century token, optionally with a qualifier."""
    s = segment.strip()
    if not s:
        return s

    # Glued qualifier: XIIIf / XIIIf. / XIIIm
    m = re.fullmatch(rf"({ROMAN})({QUAL})\.?", s, flags=re.IGNORECASE)
    if m:
        roman, qual = m.group(1).upper(), m.group(2).lower()
        return f"{roman} {qual}."

    # Spaced qualifier: XIII f / XIII f. / XIII F.
    m = re.fullmatch(rf"({ROMAN})\s+({QUAL})\.?", s, flags=re.IGNORECASE)
    if m:
        roman, qual = m.group(1).upper(), m.group(2).lower()
        return f"{roman} {qual}."

    # Bare roman (allow trailing dot like XV. already fixed elsewhere)
    m = re.fullmatch(rf"({ROMAN})\.?", s, flags=re.IGNORECASE)
    if m:
        return m.group(1).upper()

    # Fallback: uppercase romans, force qualifier form if present at end
    s = re.sub(r"[ivxlc]+", lambda m: m.group(0).upper(), s, flags=re.IGNORECASE)
    s = re.sub(rf"\s+({QUAL})\.?$", lambda m: f" {m.group(1).lower()}.", s, flags=re.IGNORECASE)
    return s.strip()


def normalize_period(raw: str | None) -> str | None:
    if raw is None:
        return None
    if not isinstance(raw, str):
        return raw

    s = raw.strip()
    if not s:
        return None

    s = re.sub(r"\s+", " ", s)

    # Split range on hyphen (with optional surrounding spaces)
    if re.search(r"\s*-\s*", s):
        parts = re.split(r"\s*-\s*", s)
        if len(parts) == 2:
            left = normalize_segment(parts[0])
            right = normalize_segment(parts[1])
            return f"{left}-{right}"
        # Unusual multi-hyphen: normalize each piece
        return "-".join(normalize_segment(p) for p in parts)

    return normalize_segment(s)


def main() -> None:
    data = json.loads(ABBR_PATH.read_text(encoding="utf-8"))

    mapping: Counter[tuple[str, str]] = Counter()
    changed_rows = 0
    unique_before: set[str] = set()
    unique_after: set[str] = set()

    for row in data:
        period = row.get("period")
        if not isinstance(period, str) or not period.strip():
            continue
        unique_before.add(period)
        canonical = normalize_period(period)
        if canonical is None:
            continue
        unique_after.add(canonical)
        if canonical != period:
            mapping[(period, canonical)] += 1
            row["period"] = canonical
            changed_rows += 1

    ABBR_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    lines = [
        "# Period normalization report",
        "",
        f"- Unique values before: **{len(unique_before)}**",
        f"- Unique values after: **{len(unique_after)}**",
        f"- Rows updated: **{changed_rows}**",
        "",
        "## Mappings (`raw` → `canonical`)",
        "",
        "| Count | Raw | Canonical |",
        "| ---: | --- | --- |",
    ]
    for (raw, canonical), count in sorted(mapping.items(), key=lambda x: (-x[1], x[0][0])):
        lines.append(f"| {count} | `{raw}` | `{canonical}` |")

    lines.extend(
        [
            "",
            "## Canonical values",
            "",
            *[f"- `{p}`" for p in sorted(unique_after)],
            "",
        ]
    )
    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Updated {changed_rows} rows")
    print(f"Unique: {len(unique_before)} → {len(unique_after)}")
    print(f"Report: {REPORT_PATH}")


if __name__ == "__main__":
    main()
