Add-Type -AssemblyName System.Drawing
$srcPath = (Get-Item "assets\ommi_master_menu_board.jpg").FullName
$outDir = "assets\items"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir }

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

$items = @(
  @{ name="j1"; x=165; y=70; w=58; h=105 },
  @{ name="j2"; x=220; y=70; w=58; h=105 },
  @{ name="j3"; x=275; y=70; w=58; h=105 },
  @{ name="j4"; x=330; y=70; w=58; h=105 },
  @{ name="j5"; x=175; y=185; w=65; h=95 },
  @{ name="j6"; x=245; y=185; w=65; h=95 },
  @{ name="j7"; x=315; y=185; w=65; h=95 },

  @{ name="ps1"; x=400; y=65; w=55; h=95 },
  @{ name="ps2"; x=455; y=65; w=55; h=95 },
  @{ name="ps3"; x=510; y=65; w=55; h=95 },
  @{ name="ps4"; x=565; y=65; w=55; h=95 },
  @{ name="ps5"; x=620; y=65; w=55; h=95 },
  @{ name="ps6"; x=400; y=165; w=55; h=95 },
  @{ name="ps7"; x=455; y=165; w=55; h=95 },
  @{ name="ps8"; x=510; y=165; w=55; h=95 },
  @{ name="ps9"; x=565; y=165; w=55; h=95 },
  @{ name="ps10"; x=620; y=165; w=55; h=95 },
  @{ name="ps11"; x=510; y=265; w=60; h=85 },

  @{ name="s1"; x=685; y=75; w=65; h=80 },
  @{ name="s2"; x=750; y=75; w=65; h=80 },
  @{ name="s3"; x=815; y=75; w=65; h=80 },
  @{ name="s4"; x=685; y=160; w=65; h=85 },
  @{ name="s5"; x=750; y=160; w=65; h=85 },
  @{ name="s6"; x=815; y=160; w=65; h=85 },
  @{ name="s7"; x=685; y=250; w=65; h=85 },
  @{ name="s8"; x=750; y=250; w=65; h=85 },
  @{ name="s9"; x=815; y=250; w=65; h=85 },

  @{ name="mg1"; x=895; y=75; w=115; h=80 },
  @{ name="mg2"; x=895; y=165; w=115; h=80 },
  @{ name="mg3"; x=895; y=255; w=115; h=80 },

  @{ name="rs1"; x=20; y=430; w=75; h=95 },
  @{ name="rs2"; x=110; y=430; w=75; h=95 },
  @{ name="rs3"; x=200; y=430; w=75; h=95 },
  @{ name="rs4"; x=290; y=430; w=75; h=95 },
  @{ name="rs5"; x=20; y=535; w=75; h=95 },
  @{ name="rs6"; x=110; y=535; w=75; h=95 },
  @{ name="rs7"; x=200; y=535; w=75; h=95 },
  @{ name="rs8"; x=290; y=535; w=75; h=95 },
  @{ name="rs9"; x=155; y=565; w=80; h=100 },

  @{ name="ic1"; x=398; y=435; w=50; h=70 },
  @{ name="ic2"; x=448; y=435; w=50; h=70 },
  @{ name="ic3"; x=498; y=435; w=50; h=70 },
  @{ name="ic4"; x=548; y=435; w=50; h=70 },
  @{ name="ic5"; x=598; y=435; w=50; h=70 },
  @{ name="ic6"; x=398; y=555; w=60; h=75 },
  @{ name="ic7"; x=460; y=555; w=60; h=75 },
  @{ name="ic8"; x=522; y=555; w=60; h=75 },
  @{ name="ic9"; x=584; y=555; w=60; h=75 },

  @{ name="hp1"; x=660; y=395; w=65; h=78 },
  @{ name="hp2"; x=728; y=395; w=65; h=78 },
  @{ name="hp3"; x=796; y=395; w=65; h=78 },
  @{ name="hp4"; x=864; y=395; w=65; h=78 },
  @{ name="hp5"; x=932; y=395; w=65; h=78 },
  @{ name="hp6"; x=660; y=490; w=65; h=78 },
  @{ name="hp7"; x=728; y=490; w=65; h=78 },
  @{ name="hp8"; x=796; y=490; w=65; h=78 },
  @{ name="hp9"; x=864; y=490; w=65; h=78 },
  @{ name="hp10"; x=932; y=490; w=65; h=78 },
  @{ name="hp11"; x=728; y=575; w=65; h=80 },
  @{ name="hp12"; x=825; y=575; w=65; h=80 }
)

foreach ($item in $items) {
  $rect = New-Object System.Drawing.Rectangle($item.x, $item.y, $item.w, $item.h)
  $bmp = New-Object System.Drawing.Bitmap($item.w, $item.h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($srcImg, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $savePath = Join-Path $outDir "$($item.name).png"
  $bmp.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

$srcImg.Dispose()
Write-Output "Cropped $($items.Count) individual menu item images into $outDir!"
