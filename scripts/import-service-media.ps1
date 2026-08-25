# Imports every job photograph under assets/img/services into public/images and
# writes data/service-media.ts, so the gallery and the service pages read from
# one generated manifest instead of a hand-maintained list.
#
# IMPORTANT: source folder names are the company's own filing, and they are not
# always accurate - at least one photograph in fence-installation-repair is a
# brush-clearing shot. The manifest therefore records which folder a file came
# from and nothing more. Alt text is written at the category level, which stays
# true even when a file is filed under the wrong leaf service. Per-photo
# captions must be added by hand after reviewing the image.
#
# ASCII only: Windows PowerShell 5.1 reads .ps1 as ANSI unless there is a BOM,
# so any non-ASCII character here becomes a parse error.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root "assets\img\services"
$dst  = Join-Path $root "public\images\services"
$out  = Join-Path $root "data\service-media.ts"

if (-not (Test-Path $src)) { throw "Source folder not found: $src" }

$entries = New-Object System.Collections.ArrayList

foreach ($group in Get-ChildItem -Path $src -Directory | Sort-Object Name) {
  foreach ($leaf in Get-ChildItem -Path $group.FullName -Directory | Sort-Object Name) {
    $files = Get-ChildItem -Path $leaf.FullName -File |
      Where-Object { $_.Extension -match '^\.(jpe?g|png|webp)$' } |
      Sort-Object Name

    if ($files.Count -eq 0) { continue }

    $targetDir = Join-Path $dst (Join-Path $group.Name $leaf.Name)
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

    $i = 0
    foreach ($file in $files) {
      $i++
      $name = "{0}-{1:d2}.jpg" -f $leaf.Name, $i
      $target = Join-Path $targetDir $name
      Copy-Item -Path $file.FullName -Destination $target -Force

      # Real pixel dimensions so next/image can reserve space (no layout shift).
      $img = [System.Drawing.Image]::FromFile($target)
      try {
        $w = $img.Width
        $h = $img.Height
      } finally {
        $img.Dispose()
      }

      [void]$entries.Add([pscustomobject]@{
        Src     = "/images/services/$($group.Name)/$($leaf.Name)/$name"
        Group   = $group.Name
        Service = $leaf.Name
        Width   = $w
        Height  = $h
      })
    }

    Write-Host ("{0,-46} {1,3} files" -f "$($group.Name)/$($leaf.Name)", $files.Count)
  }
}

$lines = New-Object System.Collections.ArrayList
[void]$lines.Add('// GENERATED FILE - do not edit by hand.')
[void]$lines.Add('// Regenerate with: powershell -File scripts/import-service-media.ps1')
[void]$lines.Add('//')
[void]$lines.Add('// `service` is the source folder the photograph was filed under. That filing')
[void]$lines.Add('// is the company own taxonomy and is not always accurate, so treat it as a')
[void]$lines.Add('// grouping hint rather than a description of what the frame shows.')
[void]$lines.Add('import type { ServiceMedia } from "@/types";')
[void]$lines.Add('')
[void]$lines.Add('export const serviceMedia: ServiceMedia[] = [')

foreach ($e in $entries) {
  # Literal braces are doubled so the -f operator does not read them as slots.
  [void]$lines.Add(('  {{ src: "{0}", group: "{1}", service: "{2}", width: {3}, height: {4} }},' -f $e.Src, $e.Group, $e.Service, $e.Width, $e.Height))
}

[void]$lines.Add('];')
[void]$lines.Add('')

Set-Content -Path $out -Value $lines -Encoding utf8

Write-Host ""
Write-Host ("Imported {0} photographs -> {1}" -f $entries.Count, $out)
