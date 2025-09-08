#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Wrap a JSON array into a JS file as: window.EMOJI_ITEMS = [...];
Usage:
  python make_emoji_js.py --in all_emojis.json --out emoji-data.js
"""
import argparse, json, sys

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="infile", required=True, help="Path to input JSON file (array of emoji objects).")
    ap.add_argument("--out", dest="outfile", required=True, help="Path to output JS file (emoji-data.js).")
    args = ap.parse_args()

    with open(args.infile, "r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, list):
        print("Input JSON must be an array.", file=sys.stderr)
        sys.exit(1)

    with open(args.outfile, "w", encoding="utf-8") as f:
        f.write("window.EMOJI_ITEMS = ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";")

    print(f"Wrote {args.outfile} with {len(data)} items.")

if __name__ == "__main__":
    main()
