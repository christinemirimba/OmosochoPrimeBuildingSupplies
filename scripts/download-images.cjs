const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Product images data
const productImages = [
    { id: 1, url: "https://pioneerhardwares.com/wp-content/uploads/2023/09/Simba-Cement-32.5R-1.webp", name: "cement-bag.jpg" },
    { id: 2, url: "https://westkonkrete.com/wp-content/uploads/2022/03/concrete-1170x658.jpg", name: "concrete-blocks.jpg" },
    { id: 3, url: "https://tse2.mm.bing.net/th/id/OIP.9IK1CWrmOtyStsTA30AxPwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", name: "sand.jpg" },
    { id: 4, url: "https://www.inchcalculator.com/wp-content/uploads/2018/10/gravel-material.jpg", name: "gravel.jpg" },
    { id: 5, url: "https://tse1.mm.bing.net/th/id/OIP.tnUXjLGitDJKHuhuE8X8ZgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "reinforcement-bars-12mm.jpg" },
    { id: 6, url: "https://5.imimg.com/data5/SELLER/Default/2024/7/438498077/RZ/OY/PM/149834907/wheelbarrow-1000x1000.jpg", name: "wheelbarrow.jpg" },
    { id: 7, url: "https://th.bing.com/th/id/R.eddd3ea1c2a689108fc2159bbea8f6d1?rik=flSzOFcEZiNuvw&pid=ImgRaw&r=0", name: "shovel.jpg" },
    { id: 8, url: "https://tiimg.tistatic.com/fp/1/005/628/agriculture-pickaxe-549.jpg", name: "pickaxe.jpg" },
    { id: 9, url: "https://m.media-amazon.com/images/I/61Vg4S-gDtL.jpg", name: "concrete-mixer.jpg" },
    { id: 10, url: "https://5.imimg.com/data5/SELLER/Default/2024/3/404116509/XG/XX/AH/10691668/6-feet-aluminium-folding-ladder-1000x1000.jpg", name: "ladder-6ft.jpg" },
    { id: 11, url: "https://th.bing.com/th/id/R.29d10a4f163c31b2c696c962580ba0f2?rik=BgVuaPqN8%2fdbLw&pid=ImgRaw&r=0", name: "steel-rods-16mm.jpg" },
    { id: 12, url: "https://th.bing.com/th/id/R.f28710af1b4252c463fb70ec47f5db9b?rik=QmvchQVlqdX8vw&pid=ImgRaw&r=0", name: "galvanized-pipes.jpg" },
    { id: 13, url: "https://image.made-in-china.com/2f0j00BiNzySIWfvrY/Stainless-Steel-Welded-Wire-Mesh.jpg", name: "wire-mesh.jpg" },
    { id: 14, url: "https://th.bing.com/th/id/R.5ad8d90810eebd28c30a27b54de778a9?rik=wPyQGwOYoAjU6w&pid=ImgRaw&r=0", name: "aluminum-sheets.jpg" },
    { id: 15, url: "https://th.bing.com/th/id/R.06da87ec5f86e19272dc5cbe5c808c18?rik=q2AHyGnX2iiddA&pid=ImgRaw&r=0", name: "nails-1kg.jpg" },
    { id: 16, url: "https://149893212.v2.pressablecdn.com/wp-content/uploads/Steel-Plates-larger.jpg", name: "steel-plates.jpg" },
    { id: 17, url: "https://tse2.mm.bing.net/th/id/OIP.5v_4MlKd3D2rEpTk8kpbOAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3", name: "binding-wire.jpg" },
    { id: 18, url: "https://tse2.mm.bing.net/th/id/OIP.VmAmJd0RkxJgbEdzYtGqLAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3", name: "steel-beams.jpg" },
    { id: 19, url: "https://tse4.mm.bing.net/th/id/OIP.mHuqwuTXO6SJDokCTubGjwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", name: "corrugated-iron-sheets.jpg" },
    { id: 20, url: "https://www.thespruce.com/thmb/asLTfbb9o4nzfUwkeElhrc8-5No=/6000x4000/filters:no_upscale():max_bytes(150000):strip_icc()/steel-pipes-903670438-5ac5508d18ba0100362e2198.jpg", name: "metal-pipes.jpg" },
    { id: 21, url: "https://tse2.mm.bing.net/th/id/OIP.XPt3nvawfYMkpSJ7Ws_0VgHaEG?rs=1&pid=ImgDetMain&o=7&rm=3", name: "hammer.jpg" },
    { id: 22, url: "https://d2j6dbq0eux0bg.cloudfront.net/images/53972175/4321545481.jpg", name: "screwdriver-set.jpg" },
    { id: 23, url: "https://tse2.mm.bing.net/th/id/OIP.vfzHDIom6wqInF8LWhj4EgHaFa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "adjustable-wrench.jpg" },
    { id: 24, url: "https://th.bing.com/th/id/R.66166358893797b171d29f48431b184e?rik=RBUIT6fGtEZixA&pid=ImgRaw&r=0", name: "electric-drill.jpg" },
    { id: 25, url: "https://i5.walmartimages.com/asr/bc5115aa-6aef-4ef1-b8f4-2892d16b0224_1.703ae051dc43ce85d21ec8934712690a.jpeg", name: "tape-measure.jpg" },
    { id: 26, url: "https://engineeringlearn.com/wp-content/uploads/2022/06/Spirit-Level-1024x539.jpg", name: "spirit-level.jpg" },
    { id: 27, url: "https://th.bing.com/th/id/R.65b68d325be4d649b86ad904593ff022?rik=5E%2bYzydHYT80cw&riu=http%3a%2f%2fimage.made-in-china.com%2f2f0j00yvBTMjZsphkC%2fHand-Saw-OK8067-.jpg&ehk=zRfztlSP5ft8Nw4gpCBlz0t72zJ0rd5Xo%2f83vCVU7o4%3d&risl=&pid=ImgRaw&r=0", name: "hand-saw.jpg" },
    { id: 28, url: "https://m.media-amazon.com/images/I/61qJ485KguL._SL1500_.jpg", name: "pliers.jpg" },
    { id: 29, url: "https://hips.hearstapps.com/hmg-prod/images/opened-diy-toolbox-with-a-collection-of-tools-royalty-free-image-1701722687.jpg?crop=1.00xw:0.753xh;0,0.163xh&resize=1200:*", name: "toolbox.jpg" },
    { id: 30, url: "https://tse3.mm.bing.net/th/id/OIP.4bxh3W0FVfP0qNhUeMV8agHaD-?rs=1&pid=ImgDetMain&o=7&rm=3", name: "angle-grinder.jpg" },
    { id: 31, url: "https://tse1.mm.bing.net/th/id/OIP.GUxosCPgAnqPaMAY0cTqcwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "wood-screws.jpg" },
    { id: 32, url: "https://img.lazcdn.com/g/p/ae66977f03e1dc62c0aa6ca9595747d7.jpg_720x720q80.jpg", name: "nuts-bolts-set.jpg" },
    { id: 33, url: "https://tse4.mm.bing.net/th/id/OIP.dNlkU02jqRG6YxgqBU6tdQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "washers.jpg" },
    { id: 34, url: "https://tse3.mm.bing.net/th/id/OIP.XtXKOH1ssMd5KhJZDX9yUgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", name: "hex-bolts.jpg" },
    { id: 35, url: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98y-lwdrx60tcuox0b", name: "concrete-nails.jpg" },
    { id: 36, url: "https://th.bing.com/th/id/R.4b6b6cf87639e12577dc37e1359d9f38?rik=YT9ZcWYSVr6PlQ&riu=http%3a%2f%2fwww.northerntool.com%2fimages%2fproduct%2f2000x2000%2f343%2f34357_2000x2000.jpg&ehk=WcJTFc5jGR0jzJdiwJ2HxNufKE20kJX1r6csnQsDrnA%3d&risl=&pid=ImgRaw&r=0", name: "anchor-bolts.jpg" },
    { id: 37, url: "https://th.bing.com/th/id/R.0be1bbd20381a9d3795372df18b822a8?rik=nfVInL8pr2hLkg&pid=ImgRaw&r=0", name: "toggle-bolts.jpg" },
    { id: 38, url: "https://tse4.mm.bing.net/th/id/OIP.LFsQpVtefW6kcID2qCZQcAHaIS?rs=1&pid=ImgDetMain&o=7&rm=3", name: "wood-glue.jpg" },
    { id: 39, url: "https://tse3.mm.bing.net/th/id/OIP.QJ-YSBbgz_wPGsBVUsSHsQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "drywall-screws.jpg" },
    { id: 40, url: "https://tse1.mm.bing.net/th/id/OIP.6pmjS9KtlwZb-7DPi9SPIAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "self-tapping-screws.jpg" },
    { id: 41, url: "https://tse3.mm.bing.net/th/id/OIP.0mLJkCNk2KDugYJTKYKwQgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", name: "timber-planks.jpg" },
    { id: 42, url: "https://plystory.com/wp-content/uploads/2023/03/Plywood.jpg", name: "plywood-sheet.jpg" },
    { id: 43, url: "https://img.staticmb.com/mbcontent/images/uploads/2023/6/mdf-board-vs-hdf.jpg", name: "mdf-board.jpg" },
    { id: 44, url: "https://tse3.mm.bing.net/th/id/OIP.icQkqxZZstQppnWVuJcbswHaFi?rs=1&pid=ImgDetMain&o=7&rm=3", name: "roofing-tiles.jpg" },
    { id: 45, url: "https://g.foolcdn.com/editorial/images/226000/gypsum-construction-material.jpg", name: "gypsum-board.jpg" },
    { id: 46, url: "https://tse2.mm.bing.net/th/id/OIP.YvqM4WSMIIemf4mo6OKaEQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "clay-bricks.jpg" },
    { id: 47, url: "https://bestwaystones.com/wp-content/uploads/2025/04/stone-blocks.png", name: "stone-blocks.jpg" },
    { id: 48, url: "https://image.made-in-china.com/2f0j00oIbkOGTcnhcK/20-Liter-Paint-Bucket-Metal-Paint-Drum-20L-Tinplate-Container-for-Paint-Adhesive-Ink-Engine-Oil-Glue-Solvent.jpg", name: "paint-bucket-20l.jpg" },
    { id: 49, url: "https://tse2.mm.bing.net/th/id/OIP.VCleO2M-A5Y1O3ARZNvQywAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", name: "roofing-felt.jpg" },
    { id: 50, url: "https://tse1.mm.bing.net/th/id/OIP.Yx8cGIi7LCpxy-CGPuv9FAHaFI?rs=1&pid=ImgDetMain&o=7&rm=3", name: "insulation-roll.jpg" },
    { id: 51, url: "https://tse3.mm.bing.net/th/id/OIP.32xNZi_e8rzQCqCSrIxpOwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", name: "led-bulb.jpg" },
    { id: 52, url: "https://tse1.mm.bing.net/th/id/OIP.SwDbQ_FUDnTJdMd6t98Y8QHaE_?rs=1&pid=ImgDetMain&o=7&rm=3", name: "extension-cord.jpg" },
    { id: 53, url: "https://i0.wp.com/maxwel.com/wp-content/uploads/2022/03/electrical_tape.jpg", name: "electrical-tape.jpg" },
    { id: 54, url: "https://www.tfcelectric.com/wp-content/uploads/2023/09/iStock_000017272602_Large.jpg", name: "circuit-breaker.jpg" },
    { id: 55, url: "https://th.bing.com/th/id/R.d7fe24c7f467ab6fb30e079842ddd13c?rik=2ID6iEnYEogDrw&pid=ImgRaw&r=0", name: "wall-socket.jpg" },
    { id: 56, url: "https://th.bing.com/th/id/R.0a8f6ad95221f4eb66c443974a4f93d8?rik=E6XgW1EIEnmEqA&pid=ImgRaw&r=0", name: "light-switch.jpg" },
    { id: 57, url: "https://i.pinimg.com/originals/a0/22/07/a022075b06f41553ef86628ed2a80bce.jpg", name: "electrical-wires.jpg" },
    { id: 58, url: "https://i5.walmartimages.com/asr/cc8838ff-bca6-4929-87db-29d8648dde24.f76313912c8b80ca48d1a03775703e3b.jpeg", name: "ceiling-light.jpg" },
    { id: 59, url: "https://tse4.mm.bing.net/th/id/OIP.F-kZL18s1zNl3t1oa4Tv8gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3", name: "electric-fan.jpg" },
    { id: 60, url: "https://th.bing.com/th/id/R.a510dcf9c8cf5bd51fee672e4703b712?rik=SmLCOUpJHX1MtQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f2%2f2c%2fFixed_Tilt_Solar_panel_at_Canterbury_Municipal_Building_Canterbury_New_Hampshire.jpg&ehk=mYF2FZKSRXaC9ymA3%2bKjWZDuFek8HXyPxO%2fvGCuFm1k%3d&risl=1&pid=ImgRaw&r=0", name: "solar-panel.jpg" },
    { id: 61, url: "https://5.imimg.com/data5/EM/NG/MY-56823773/supreme-pvc-pipes-500x500-500x500.jpg", name: "pvc-pipe-3m.jpg" },
    { id: 62, url: "https://c8.alamy.com/comp/T3R4P6/set-of-pipe-fittings-connection-for-industry-assorted-plumbing-fixtures-and-piping-parts-T3R4P6.jpg", name: "pipe-fittings-set.jpg" },
    { id: 63, url: "https://i.ebayimg.com/images/g/gE0AAOSwYGJeaIW6/s-l1600.jpg", name: "shower-head.jpg" },
    { id: 64, url: "https://5.imimg.com/data5/AB/SL/NJ/SELLER-74535796/1000l-water-tank-500x500.jpg", name: "water-tank-1000l.jpg" },
    { id: 65, url: "https://tse1.mm.bing.net/th/id/OIP.5J8T9F7_zi2TSzqLKSttLwHaFi?rs=1&pid=ImgDetMain&o=7&rm=3", name: "faucet.jpg" },
    { id: 66, url: "https://tse1.mm.bing.net/th/id/OIP.S5My2RS2Ua2KTZ30ntmU2QHaFM?rs=1&pid=ImgDetMain&o=7&rm=3", name: "sink.jpg" },
    { id: 67, url: "https://tse4.mm.bing.net/th/id/OIP.bbAi3CWxJN5XBeQUXaNtfAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", name: "toilet-bowl.jpg" },
    { id: 68, url: "https://hips.hearstapps.com/popularmechanics/assets/15/45/1446571234-gettyimages-173756481.jpg", name: "water-heater.jpg" },
    { id: 69, url: "https://tse4.mm.bing.net/th/id/OIP.hO3fMgJrhNDTmZYfNUVKqAHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3", name: "drain-pipe.jpg" },
    { id: 70, url: "https://tse2.mm.bing.net/th/id/OIP.oSQDzaKY6zdoljzhf9y_5gHaEA?rs=1&pid=ImgDetMain&o=7&rm=3", name: "plunger.jpg" },
    { id: 71, url: "https://tse4.mm.bing.net/th/id/OIP.7O9f21ga532TCI_HrXlO1QHaHh?rs=1&pid=ImgDetMain&o=7&rm=3", name: "safety-helmet.jpg" },
    { id: 72, url: "https://tse1.mm.bing.net/th/id/OIP.fistdmfdgPNP5BXeudrLvwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", name: "safety-goggles.jpg" },
    { id: 73, url: "https://th.bing.com/th/id/R.509e9786556896f2b9d60f15e08d1b34?rik=2KInxQxRaInQFg&pid=ImgRaw&r=0", name: "safety-gloves.jpg" },
    { id: 74, url: "https://mugaleindustries.com/wp-content/uploads/2023/07/Reflective-Vest.png", name: "reflective-vest.jpg" },
    { id: 75, url: "https://th.bing.com/th/id/R.1160211eaae5f04329972a9970c3c8ab?rik=NcyOoBk%2fXHx%2fUQ&pid=ImgRaw&r=0", name: "ear-protection.jpg" },
    { id: 76, url: "https://i.ebayimg.com/images/g/uBEAAeSwwp1o1PhK/s-l960.jpg", name: "work-boots.jpg" },
    { id: 77, url: "https://tse2.mm.bing.net/th/id/OIP.QcJM6iO45lw7iTN3qyJQIwHaGN?rs=1&pid=ImgDetMain&o=7&rm=3", name: "dust-mask.jpg" },
    { id: 78, url: "https://tse4.mm.bing.net/th/id/OIP.8rtE4c_Y9WsJRPOUb1_rsgHaJo?rs=1&pid=ImgDetMain&o=7&rm=3", name: "harness.jpg" },
    { id: 79, url: "https://m.media-amazon.com/images/I/81a8W+LrAwL.jpg", name: "first-aid-kit.jpg" },
    { id: 80, url: "https://firesouq.com/wp-content/uploads/2022/06/FireExting11.jpg", name: "fire-extinguisher.jpg" },
    { id: 81, url: "https://5.imimg.com/data5/CX/XK/FF/SELLER-8392174/wall-paint-500x500.jpg", name: "wall-paint-5l.jpg" },
    { id: 82, url: "https://megahw.co.za/wp-content/uploads/2018/05/3008_01.jpg", name: "wall-tiles.jpg" },
    { id: 83, url: "https://assets.wfcdn.com/im/94866093/compr-r85/2166/216638100/regallo-24-x-24-marble-look-polished-porcelain-wall-floor-tile.jpg", name: "floor-tiles.jpg" },
    { id: 84, url: "https://octaneseating.com/blog/wp-content/uploads/2020/07/varnish.jpg", name: "wood-varnish.jpg" },
    { id: 85, url: "https://th.bing.com/th/id/OSK.HEROCLICKTHROUGHqcGVtFClkzAQ9FniacnMklrvR14_AOeoWTaTnTv4sBM?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", name: "plaster.jpg" },
    { id: 86, url: "https://tileitsa.co.za/site/wp-content/uploads/2023/08/Untitled-design-58.png", name: "grout-5kg.jpg" },
    { id: 87, url: "https://5.imimg.com/data5/LL/CL/MY-3643474/furniture-polish-500x500.jpg", name: "wood-polish.jpg" },
    { id: 88, url: "https://ae01.alicdn.com/kf/HTB1mx_pgcnI8KJjSsziq6z8QpXaU/10M-Modern-3D-Embossed-Background-Wallpaper-Roll-Desktop-Decor-WallPapers-Living-Room-Wall-paper-for-Walls.jpg", name: "wallpaper-roll.jpg" },
    { id: 89, url: "https://oxfordhomeware.co.uk/cdn/shop/products/plainball_748x748.jpg?v=1592981919", name: "curtain-rods.jpg" },
    { id: 90, url: "https://tiimg.tistatic.com/fp/1/004/463/ceiling-board-900.jpg", name: "ceiling-board.jpg" }
];

const outputDir = path.join(__dirname, '..', 'public', 'assets', 'products');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(imageData) {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(imageData.url);
            const protocol = url.protocol === 'https:' ? https : http;
            const outputPath = path.join(outputDir, imageData.name);

            // Skip if file already exists
            if (fs.existsSync(outputPath)) {
                console.log(`✓ Skipped (exists): ${imageData.name}`);
                resolve({ id: imageData.id, success: true, skipped: true });
                return;
            }

            const file = fs.createWriteStream(outputPath);

            protocol.get(imageData.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            }, (response) => {
                // Handle redirects
                if (response.statusCode === 301 || response.statusCode === 302) {
                    const redirectUrl = response.headers.location;
                    downloadImage({ ...imageData, url: redirectUrl })
                        .then(resolve)
                        .catch(reject);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download ${imageData.name}: Status ${response.statusCode}`));
                    return;
                }

                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    console.log(`✓ Downloaded: ${imageData.name}`);
                    resolve({ id: imageData.id, success: true });
                });
            }).on('error', (err) => {
                fs.unlink(outputPath, () => { }); // Delete partial file
                reject(err);
            });

            file.on('error', (err) => {
                fs.unlink(outputPath, () => { }); // Delete partial file
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function downloadAllImages() {
    console.log(`\n🚀 Starting download of ${productImages.length} product images...\n`);

    const results = {
        success: 0,
        skipped: 0,
        failed: 0,
        errors: []
    };

    // Download images in batches to avoid overwhelming the server
    const batchSize = 5;
    for (let i = 0; i < productImages.length; i += batchSize) {
        const batch = productImages.slice(i, i + batchSize);
        const promises = batch.map(img =>
            downloadImage(img)
                .then(result => {
                    if (result.skipped) results.skipped++;
                    else results.success++;
                    return result;
                })
                .catch(err => {
                    results.failed++;
                    results.errors.push({ id: img.id, name: img.name, error: err.message });
                    console.error(`✗ Failed: ${img.name} - ${err.message}`);
                    return { id: img.id, success: false };
                })
        );

        await Promise.all(promises);

        // Small delay between batches
        if (i + batchSize < productImages.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    console.log(`\n📊 Download Summary:`);
    console.log(`   ✓ Successfully downloaded: ${results.success}`);
    console.log(`   ⊘ Skipped (already exists): ${results.skipped}`);
    console.log(`   ✗ Failed: ${results.failed}`);

    if (results.errors.length > 0) {
        console.log(`\n❌ Failed downloads:`);
        results.errors.forEach(err => {
            console.log(`   - ID ${err.id}: ${err.name} - ${err.error}`);
        });
    }

    console.log(`\n✅ Download process completed!\n`);
}

downloadAllImages().catch(console.error);
