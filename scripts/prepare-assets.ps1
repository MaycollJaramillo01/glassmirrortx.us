# Copies the reviewed source photographs out of /assets into /public/images
# under descriptive, SEO-friendly filenames, and prints each file's pixel
# dimensions so next/image width+height can be set exactly (no CLS).
#
# Every mapping below was chosen after visually reviewing the source file.
# Source folder names are NOT reliable (several photos sit in the wrong folder),
# so do not add mappings here without opening the image first.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root "assets\img"
$dst  = Join-Path $root "public\images"

$map = [ordered]@{
  # --- Tree removal -------------------------------------------------------
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.16.28.jpeg"           = "tree-removal\climber-pine-removal.jpg"
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.16.28 (1).jpeg"       = "tree-removal\climber-rigging-pine.jpg"
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.17.29.jpeg"           = "tree-removal\crew-sectioning-felled-pine.jpg"
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.17.29 (2).jpeg"       = "tree-removal\dead-tree-rigging.jpg"
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.17.28.jpeg"           = "tree-removal\dead-tree-near-home.jpg"
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.17.28 (2).jpeg"       = "tree-care\mature-oak-residential.jpg"

  # --- Storm damage / emergency -------------------------------------------
  "services\tree-services\storm-damage-cleanup\WhatsApp Image 2026-08-13 at 17.16.03 (5).jpeg" = "storm-damage\crew-clearing-pine-from-roof.jpg"
  "services\tree-services\storm-damage-cleanup\WhatsApp Image 2026-08-13 at 17.16.03 (4).jpeg" = "storm-damage\fallen-pine-on-vehicle.jpg"
  "services\tree-services\storm-damage-cleanup\WhatsApp Image 2026-08-13 at 17.16.03.jpeg"     = "storm-damage\fallen-tree-on-outbuilding.jpg"

  # --- Stump grinding ------------------------------------------------------
  "services\tree-services\lot-clearing\WhatsApp Image 2026-08-13 at 17.16.27 (1).jpeg"      = "stump-grinding\stump-grinder-front-yard.jpg"
  "services\tree-services\stump-grinding\WhatsApp Image 2026-08-13 at 17.16.02.jpeg"        = "stump-grinding\backyard-stump.jpg"
  "services\landscaping-property-improvements\yard-cleanup\WhatsApp Image 2026-08-13 at 17.14.47.jpeg" = "stump-grinding\grinder-cleared-yard.jpg"

  # --- Company / fleet -----------------------------------------------------
  "services\tree-services\lot-clearing\WhatsApp Image 2026-08-13 at 17.16.27 (3).jpeg"      = "company\eg-tree-services-fleet.jpg"

  # --- Land clearing / site work ------------------------------------------
  "services\landscaping-property-improvements\dirt-grading-leveling\WhatsApp Image 2026-08-13 at 17.17.55.jpeg" = "land-clearing\skid-steer-property-work.jpg"
  "services\tree-services\land-clearing\WhatsApp Image 2026-08-13 at 17.17.38.jpeg"          = "land-clearing\skid-steer-clearing.jpg"

  # --- Lot clearing --------------------------------------------------------
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.17.28 (3).jpeg"      = "lot-clearing\cleared-yard-section.jpg"

  # --- Flower beds ---------------------------------------------------------
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.16.29.jpeg"          = "flower-bed\bed-preparation.jpg"
  "services\tree-services\tree-removal\WhatsApp Image 2026-08-13 at 17.16.29 (1).jpeg"      = "flower-bed\prepared-bed-entry.jpg"

  # --- Before / after pairs ------------------------------------------------
  "before-after\mulch-front-yard\before.jpeg"        = "before-after\mulch-front-yard-before.jpg"
  "before-after\mulch-front-yard\after.jpeg"         = "before-after\mulch-front-yard-after.jpg"
  "before-after\flower-bed-stone-porch\before.jpeg"  = "before-after\flower-bed-before.jpg"
  "before-after\flower-bed-stone-porch\after.jpeg"   = "before-after\flower-bed-after.jpg"
  "before-after\sod-backyard\before.jpeg"            = "before-after\backyard-restoration-before.jpg"
  "before-after\sod-backyard\after.jpeg"             = "before-after\backyard-restoration-after.jpg"
}

$results = @()

foreach ($entry in $map.GetEnumerator()) {
  $from = Join-Path $src $entry.Key
  $to   = Join-Path $dst $entry.Value

  if (-not (Test-Path -LiteralPath $from)) {
    Write-Warning "MISSING SOURCE: $($entry.Key)"
    continue
  }

  $toDir = Split-Path -Parent $to
  if (-not (Test-Path -LiteralPath $toDir)) {
    New-Item -ItemType Directory -Force -Path $toDir | Out-Null
  }

  Copy-Item -LiteralPath $from -Destination $to -Force

  $img = [System.Drawing.Image]::FromFile($to)
  $results += [PSCustomObject]@{
    File   = "/images/" + ($entry.Value -replace '\\', '/')
    Width  = $img.Width
    Height = $img.Height
  }
  $img.Dispose()
}

$results | Format-Table -AutoSize | Out-String -Width 200
Write-Host "Copied $($results.Count) files."
