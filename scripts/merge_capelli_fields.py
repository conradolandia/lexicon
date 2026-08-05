#!/usr/bin/env python3
"""Merge Capelli geometry/position/unsure fields into static/abbr.json.

Keeps all existing abbr.json fields (including normalized periods).
Does not add tmp-only duplicate ids (9409, 13055).
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ABBR_PATH = ROOT / "static" / "abbr.json"
TMP_PATH = ROOT / "static" / "tmp_capelli.json"
REPORT_PATH = Path(__file__).resolve().parent / "merge-capelli-fields-report.md"

MERGE_KEYS = (
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8",
    "position9",
    "x",
    "y",
    "width",
    "height",
    "unsure",
)

SKIP_TMP_ONLY_IDS = {9409, 13055}


def main() -> None:
    abbr = json.loads(ABBR_PATH.read_text(encoding="utf-8"))
    tmp = json.loads(TMP_PATH.read_text(encoding="utf-8"))
    by_id = {row["id"]: row for row in tmp}

    updated = 0
    missing_in_tmp: list[int] = []
    skipped_tmp_only = sorted(
        id_ for id_ in by_id if id_ not in {row["id"] for row in abbr}
    )

    for row in abbr:
        source = by_id.get(row["id"])
        if source is None:
            missing_in_tmp.append(row["id"])
            continue
        for key in MERGE_KEYS:
            row[key] = source.get(key, 0 if key.startswith("position") or key == "unsure" else 0)
        updated += 1

    ABBR_PATH.write_text(
        json.dumps(abbr, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    lines = [
        "# Merge Capelli fields report",
        "",
        f"- Abbr rows: **{len(abbr)}**",
        f"- Tmp rows: **{len(tmp)}**",
        f"- Rows updated: **{updated}**",
        f"- Missing in tmp: **{len(missing_in_tmp)}**",
        f"- Tmp-only ids skipped: **{skipped_tmp_only}**",
        f"- Expected skip set: **{sorted(SKIP_TMP_ONLY_IDS)}**",
        "",
    ]
    if missing_in_tmp:
        lines.extend(
            [
                "## Missing in tmp",
                "",
                ", ".join(str(i) for i in missing_in_tmp[:50]),
                "",
            ]
        )

    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Updated {updated} rows")
    print(f"Skipped tmp-only: {skipped_tmp_only}")
    print(f"Report: {REPORT_PATH}")


if __name__ == "__main__":
    main()
