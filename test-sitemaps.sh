#!/bin/bash

# Multi-Sitemap Testing Script
# Test all sitemap endpoints locally

BASE_URL="${1:-http://localhost:3000}"

echo "🔍 Testing Multi-Sitemap Implementation"
echo "========================================"
echo "Base URL: $BASE_URL"
echo ""

# Test sitemap index
echo "📋 Testing Sitemap Index..."
curl -s -I "$BASE_URL/sitemap.xml" | grep -E "HTTP|Content-Type|Cache-Control"
echo ""

# Test individual sitemaps
echo "📝 Testing Individual Sitemaps..."
for i in {1..3}; do
  echo "  Testing sitemap/$i.xml..."
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/sitemap/$i.xml")
  if [ "$STATUS" = "200" ]; then
    # Count URLs in the sitemap
    COUNT=$(curl -s "$BASE_URL/sitemap/$i.xml" | grep -o "<url>" | wc -l)
    echo "    ✅ Status: $STATUS | URLs: $COUNT"
  elif [ "$STATUS" = "404" ]; then
    echo "    ⚠️  Status: $STATUS (sitemap doesn't exist - this is expected if < $i sitemaps)"
  else
    echo "    ❌ Status: $STATUS"
  fi
done

echo ""
echo "✨ Sitemap Testing Complete!"
echo ""
echo "📚 View sitemap content:"
echo "  curl $BASE_URL/sitemap.xml | head -50"
echo "  curl $BASE_URL/sitemap/1.xml | head -50"
