#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build full emoji JSON from official Unicode sources with ordering applied.

Sources (fetched live):
- emoji-test.txt (authoritative list + names + group/subgroup)
- emoji-ordering.txt (recommended UI ordering)

Output format:
  [
    {"t": "😀", "l": "grinning face", "g": ["faces"]},
    ...
  ]

Usage:
  python build_emoji_json_v2.py --out all_emojis.json --batch_dir batches --batch_size 600
"""

import argparse
import json
import os
import re
import sys
from urllib.request import urlopen

EMOJI_TEST_URL = "https://unicode.org/Public/emoji/latest/emoji-test.txt"
EMOJI_ORDER_URL = "https://unicode.org/emoji/charts/emoji-ordering.txt"  # latest stable

# ------------------------ Category mapping ------------------------
# Map Unicode groups/subgroups/names to the coarse categories requested by the user.
def coarse_category(group: str, subgroup: str, name: str) -> str:
    g = (group or "").lower()
    sg = (subgroup or "").lower()
    n = (name or "").lower()

    # Hearts split out of Smileys & Emotion
    if "smileys & emotion" in g:
        if any(k in n for k in ["heart", "hearts", "heart exclamation", "love letter"]):
            return "hearts"
        return "faces"

    if "people & body" in g:
        return "people"

    if "animals & nature" in g:
        # Separate animals from general nature
        if any(k in sg for k in ["animal", "cat", "monkey", "mammal", "bird", "amphibian", "marine", "invertebrate"]):
            return "animals"
        if any(k in n for k in [
            "cat","dog","bear","lion","tiger","horse","rabbit","pig","cow","frog","monkey","bird","eagle","owl","bat",
            "wolf","boar","unicorn","bee","bug","snail","butterfly","lady","turtle","snake","octopus","squid","crab",
            "fish","whale","dolphin","shark","lizard","hedgehog","otter","sloth","bison","beaver","skunk","mammoth",
            "seal","moose","donkey","goose","swan","jellyfish"
        ]):
            return "animals"
        return "nature"

    if "food & drink" in g:
        return "food"

    if "activities" in g:
        # Sports & games mainly
        if any(k in sg for k in ["sport", "game"]):
            return "sports"
        if any(k in n for k in [
            "soccer","football","basketball","baseball","tennis","volleyball","rugby","hockey","golf","bowling","ski",
            "snowboard","skate","swim","biking","fencing","wrestling","handball","water polo","lacrosse","medal","trophy"
        ]):
            return "sports"
        return "sports"

    if "travel & places" in g:
        # Vehicles/transport -> cars
        if any(k in sg for k in ["transport", "transport-sign"]):
            return "cars"
        if any(k in n for k in [
            "car","taxi","bus","truck","van","train","tram","metro","rail","airplane","helicopter","rocket","ship","boat",
            "ferry","sailboat","motorcycle","bicycle","scooter","monorail"
        ]):
            return "cars"
        return "places"

    if "objects" in g:
        return "objects"

    if "symbols" in g:
        # Hearts already diverted; rest stay in symbols
        return "symbols"

    if "flags" in g:
        return "flags"

    return "other"


# ------------------------ Parsers ------------------------
def parse_emoji_test(url: str):
    with urlopen(url) as resp:
        text = resp.read().decode("utf-8", errors="replace")

    group = None
    subgroup = None
    items = []

    re_group = re.compile(r"#\s*group:\s*(.+)")
    re_sub   = re.compile(r"#\s*subgroup:\s*(.+)")
    # Example:
    # 1F600                                      ; fully-qualified     # 😀 grinning face
    re_data  = re.compile(
        r"^(?P<codepoints>[0-9A-F ]+)\s*;\s*(?:fully-qualified|minimally-qualified|unqualified)\s*#\s*(?P<emoji>.+?)\s+(?P<name>[A-Za-z0-9][^#]*)$"
    )

    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        m = re_group.match(line)
        if m:
            group = m.group(1).strip()
            continue
        m = re_sub.match(line)
        if m:
            subgroup = m.group(1).strip()
            continue
        if line.startswith("#"):
            continue

        m = re_data.match(line)
        if not m:
            continue
        emoji = m.group("emoji").strip()
        name = m.group("name").strip().lower()  # keep lowercase for consistency
        cat = coarse_category(group or "", subgroup or "", name)
        items.append({"t": emoji, "l": name, "g": [cat]})
    # Deduplicate by emoji glyph
    uniq = []
    seen = set()
    for it in items:
        if it["t"] in seen:
            continue
        seen.add(it["t"])
        uniq.append(it)
    return uniq


def parse_ordering(url: str):
    with urlopen(url) as resp:
        txt = resp.read().decode("utf-8", errors="replace")

    order = []
    # Lines look like:
    # U+1F600 grinning face
    # or sequences like: U+1F469 U+200D U+1F4BB woman technologist
    re_line = re.compile(r"^U\+[0-9A-F]{2,5}(?:\s+U\+[0-9A-F]{2,5})*\s+(.+)$", re.I)
    for line in txt.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        m = re_line.match(line)
        if not m:
            continue
        name = m.group(1).strip().lower()
        # Keep first occurrence order
        order.append(name)
    return order


# ------------------------ Main build ------------------------
def write_outputs(items, out_path=None, batch_dir=None, batch_size=600):
    if out_path:
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
    if batch_dir:
        os.makedirs(batch_dir, exist_ok=True)
        n = len(items)
        for i in range(0, n, batch_size):
            part = items[i:i+batch_size]
            p = os.path.join(batch_dir, f"emoji_batch_{i//batch_size + 1:02d}.json")
            with open(p, "w", encoding="utf-8") as f:
                json.dump(part, f, ensure_ascii=False, indent=2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="all_emojis.json")
    ap.add_argument("--batch_dir", default="batches")
    ap.add_argument("--batch_size", type=int, default=600)
    args = ap.parse_args()

    # Fetch data
    items = parse_emoji_test(EMOJI_TEST_URL)
    ordering = parse_ordering(EMOJI_ORDER_URL)

    # Create lookup by name to apply ordering (name is lowercase already)
    # Some names in ordering file may not perfectly match emoji-test names;
    # we'll sort using index if found, else push to end maintaining existing order.
    order_index = {name: i for i, name in enumerate(ordering)}

    def key_fn(it):
        return order_index.get(it["l"], 10**9)  # large index for unknowns

    items_sorted = sorted(items, key=key_fn)

    write_outputs(items_sorted, out_path=args.out, batch_dir=args.batch_dir, batch_size=args.batch_size)
    print(f"Done. Total items: {len(items_sorted)}")
    print(f"Wrote: {args.out}")
    print(f"Batches dir: {args.batch_dir} (size={args.batch_size})")
    cats = {}
    for it in items_sorted:
        cats.setdefault(it["g"][0], 0)
        cats[it["g"][0]] += 1
    print("Category counts:", json.dumps(cats, ensure_ascii=False))

if __name__ == "__main__":
    sys.exit(main())
