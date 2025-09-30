// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const backToTopButton = document.getElementById('back-to-top');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', { name, email, phone, subject, message });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.service-card, .product-card, .team-member, .value-card');
    animateElements.forEach(el => observer.observe(el));

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavigation = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);
  
    // products dataset
const productsData = [
  // =========================
  // Construction (10)
  // =========================
  {
    id: 1,
    name: "Cement Bag (50kg)",
    category: "Construction",
    image: "https://pioneerhardwares.com/wp-content/uploads/2023/09/Simba-Cement-32.5R-1.webp"
  },
  {
    id: 2,
    name: "Concrete Blocks",
    category: "Construction",
    image: "https://westkonkrete.com/wp-content/uploads/2022/03/concrete-1170x658.jpg"
  },
  {
    id: 3,
    name: "Sand (Ton)",
    category: "Construction",
    image: "https://tse2.mm.bing.net/th/id/OIP.9IK1CWrmOtyStsTA30AxPwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 4,
    name: "Gravel (Ton)",
    category: "Construction",
    image: "https://www.inchcalculator.com/wp-content/uploads/2018/10/gravel-material.jpg"
  },
  {
    id: 5,
    name: "Reinforcement Bars (12mm)",
    category: "Construction",
    image: "https://tse1.mm.bing.net/th/id/OIP.tnUXjLGitDJKHuhuE8X8ZgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 6,
    name: "Wheelbarrow",
    category: "Construction",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/7/438498077/RZ/OY/PM/149834907/wheelbarrow-1000x1000.jpg"
  },
  {
    id: 7,
    name: "Shovel",
    category: "Construction",
    image: "https://th.bing.com/th/id/R.eddd3ea1c2a689108fc2159bbea8f6d1?rik=flSzOFcEZiNuvw&pid=ImgRaw&r=0"
  },
  {
    id: 8,
    name: "Pickaxe",
    category: "Construction",
    image: "https://tiimg.tistatic.com/fp/1/005/628/agriculture-pickaxe-549.jpg"
  },
  {
    id: 9,
    name: "Concrete Mixer",
    category: "Construction",
    image: "https://m.media-amazon.com/images/I/61Vg4S-gDtL.jpg"
  },
  {
    id: 10,
    name: "Ladder (6ft)",
    category: "Construction",
    image:"https://5.imimg.com/data5/SELLER/Default/2024/3/404116509/XG/XX/AH/10691668/6-feet-aluminium-folding-ladder-1000x1000.jpg"
  },

  // =========================
  // Metals (10)
  // =========================
  {
    id: 11,
    name: "Steel Rods (16mm)",
    category: "Metals",
    image: "https://th.bing.com/th/id/R.29d10a4f163c31b2c696c962580ba0f2?rik=BgVuaPqN8%2fdbLw&pid=ImgRaw&r=0"
  },
  {
    id: 12,
    name: "Galvanized Pipes",
    category: "Metals",
    image: "https://th.bing.com/th/id/R.f28710af1b4252c463fb70ec47f5db9b?rik=QmvchQVlqdX8vw&pid=ImgRaw&r=0"
  },
  {
    id: 13,
    name: "Wire Mesh",
    category: "Metals",
    image: "https://image.made-in-china.com/2f0j00BiNzySIWfvrY/Stainless-Steel-Welded-Wire-Mesh.jpg"
  },
  {
    id: 14,
    name: "Aluminum Sheets",
    category: "Metals",
    image: "https://th.bing.com/th/id/R.5ad8d90810eebd28c30a27b54de778a9?rik=wPyQGwOYoAjU6w&pid=ImgRaw&r=0"
  },
  {
    id: 15,
    name: "Nails (1kg)",
    category: "Metals",
    image: "https://th.bing.com/th/id/R.06da87ec5f86e19272dc5cbe5c808c18?rik=q2AHyGnX2iiddA&pid=ImgRaw&r=0"
  },
  {
    id: 16,
    name: "Steel Plates",
    category: "Metals",
    image: "https://149893212.v2.pressablecdn.com/wp-content/uploads/Steel-Plates-larger.jpg"
  },
  {
    id: 17,
    name: "Binding Wire",
    category: "Metals",
    image: "https://tse2.mm.bing.net/th/id/OIP.5v_4MlKd3D2rEpTk8kpbOAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 18,
    name: "Steel Beams",
    category: "Metals",
    image: "https://tse2.mm.bing.net/th/id/OIP.VmAmJd0RkxJgbEdzYtGqLAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 19,
    name: "Corrugated Iron Sheets",
    category: "Metals",
    image: "https://tse4.mm.bing.net/th/id/OIP.mHuqwuTXO6SJDokCTubGjwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 20,
    name: "Metal Pipes",
    category: "Metals",
    image: "https://www.thespruce.com/thmb/asLTfbb9o4nzfUwkeElhrc8-5No=/6000x4000/filters:no_upscale():max_bytes(150000):strip_icc()/steel-pipes-903670438-5ac5508d18ba0100362e2198.jpg"
  },

  // =========================
  // Tools (10)
  // =========================
  {
    id: 21,
    name: "Hammer",
    category: "Tools",
    image: "https://tse2.mm.bing.net/th/id/OIP.XPt3nvawfYMkpSJ7Ws_0VgHaEG?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 22,
    name: "Screwdriver Set",
    category: "Tools",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/53972175/4321545481.jpg"
  },
  {
    id: 23,
    name: "Adjustable Wrench",
    category: "Tools",
    image: "https://tse2.mm.bing.net/th/id/OIP.vfzHDIom6wqInF8LWhj4EgHaFa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 24,
    name: "Electric Drill",
    category: "Tools",
    image: "https://th.bing.com/th/id/R.66166358893797b171d29f48431b184e?rik=RBUIT6fGtEZixA&pid=ImgRaw&r=0"
  },
  {
    id: 25,
    name: "Tape Measure",
    category: "Tools",
    image: "https://i5.walmartimages.com/asr/bc5115aa-6aef-4ef1-b8f4-2892d16b0224_1.703ae051dc43ce85d21ec8934712690a.jpeg"
  },
  {
    id: 26,
    name: "Spirit Level",
    category: "Tools",
    image: "https://engineeringlearn.com/wp-content/uploads/2022/06/Spirit-Level-1024x539.jpg"
  },
  {
    id: 27,
    name: "Hand Saw",
    category: "Tools",
    image: "https://th.bing.com/th/id/R.65b68d325be4d649b86ad904593ff022?rik=5E%2bYzydHYT80cw&riu=http%3a%2f%2fimage.made-in-china.com%2f2f0j00yvBTMjZsphkC%2fHand-Saw-OK8067-.jpg&ehk=zRfztlSP5ft8Nw4gpCBlz0t72zJ0rd5Xo%2f83vCVU7o4%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 28,
    name: "Pliers",
    category: "Tools",
    image: "https://m.media-amazon.com/images/I/61qJ485KguL._SL1500_.jpg"
  },
  {
    id: 29,
    name: "Toolbox",
    category: "Tools",
    image: "https://hips.hearstapps.com/hmg-prod/images/opened-diy-toolbox-with-a-collection-of-tools-royalty-free-image-1701722687.jpg?crop=1.00xw:0.753xh;0,0.163xh&resize=1200:*"
  },
  {
    id: 30,
    name: "Angle Grinder",
    category: "Tools",
    image: "https://tse3.mm.bing.net/th/id/OIP.4bxh3W0FVfP0qNhUeMV8agHaD-?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Fasteners (10)
  // =========================
  {
    id: 31,
    name: "Wood Screws (100pcs)",
    category: "Fasteners",
    image: "https://tse1.mm.bing.net/th/id/OIP.GUxosCPgAnqPaMAY0cTqcwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 32,
    name: "Nuts & Bolts Set",
    category: "Fasteners",
    image: "https://img.lazcdn.com/g/p/ae66977f03e1dc62c0aa6ca9595747d7.jpg_720x720q80.jpg"
  },
  {
    id: 33,
    name: "Washers (100pcs)",
    category: "Fasteners",
    image: "https://tse4.mm.bing.net/th/id/OIP.dNlkU02jqRG6YxgqBU6tdQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 34,
    name: "Hex Bolts (50pcs)",
    category: "Fasteners",
    image: "https://tse3.mm.bing.net/th/id/OIP.XtXKOH1ssMd5KhJZDX9yUgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 35,
    name: "Concrete Nails (1kg)",
    category: "Fasteners",
    image: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98y-lwdrx60tcuox0b"
  },
  {
    id: 36,
    name: "Anchor Bolts",
    category: "Fasteners",
    image: "https://th.bing.com/th/id/R.4b6b6cf87639e12577dc37e1359d9f38?rik=YT9ZcWYSVr6PlQ&riu=http%3a%2f%2fwww.northerntool.com%2fimages%2fproduct%2f2000x2000%2f343%2f34357_2000x2000.jpg&ehk=WcJTFc5jGR0jzJdiwJ2HxNufKE20kJX1r6csnQsDrnA%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 37,
    name: "Toggle Bolts",
    category: "Fasteners",
    image: "https://th.bing.com/th/id/R.0be1bbd20381a9d3795372df18b822a8?rik=nfVInL8pr2hLkg&pid=ImgRaw&r=0"
  },
  {
    id: 38,
    name: "Wood Glue",
    category: "Fasteners",
    image: "https://tse4.mm.bing.net/th/id/OIP.LFsQpVtefW6kcID2qCZQcAHaIS?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 39,
    name: "Drywall Screws",
    category: "Fasteners",
    image: "https://tse3.mm.bing.net/th/id/OIP.QJ-YSBbgz_wPGsBVUsSHsQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 40,
    name: "Self-tapping Screws",
    category: "Fasteners",
    image: "https://tse1.mm.bing.net/th/id/OIP.6pmjS9KtlwZb-7DPi9SPIAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Building (10)
  // =========================
  {
    id: 41,
    name: "Timber Planks",
    category: "Building",
    image: "https://tse3.mm.bing.net/th/id/OIP.0mLJkCNk2KDugYJTKYKwQgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 42,
    name: "Plywood Sheet",
    category: "Building",
    image: "https://plystory.com/wp-content/uploads/2023/03/Plywood.jpg"
  },
  {
    id: 43,
    name: "MDF Board",
    category: "Building",
    image: "https://img.staticmb.com/mbcontent/images/uploads/2023/6/mdf-board-vs-hdf.jpg"
  },
  {
    id: 44,
    name: "Roofing Tiles",
    category: "Building",
    image: "https://tse3.mm.bing.net/th/id/OIP.icQkqxZZstQppnWVuJcbswHaFi?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 45,
    name: "Gypsum Board",
    category: "Building",
    image: "https://g.foolcdn.com/editorial/images/226000/gypsum-construction-material.jpg"
  },
  {
    id: 46,
    name: "Clay Bricks",
    category: "Building",
    image: "https://tse2.mm.bing.net/th/id/OIP.YvqM4WSMIIemf4mo6OKaEQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 47,
    name: "Stone Blocks",
    category: "Building",
    image: "https://bestwaystones.com/wp-content/uploads/2025/04/stone-blocks.png"
  },
  {
    id: 48,
    name: "Paint Bucket (20L)",
    category: "Building",
    image: "https://image.made-in-china.com/2f0j00oIbkOGTcnhcK/20-Liter-Paint-Bucket-Metal-Paint-Drum-20L-Tinplate-Container-for-Paint-Adhesive-Ink-Engine-Oil-Glue-Solvent.jpg"
  },
  {
    id: 49,
    name: "Roofing Felt",
    category: "Building",
    image: "https://tse2.mm.bing.net/th/id/OIP.VCleO2M-A5Y1O3ARZNvQywAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 50,
    name: "Insulation Roll",
    category: "Building",
    image: "https://tse1.mm.bing.net/th/id/OIP.Yx8cGIi7LCpxy-CGPuv9FAHaFI?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Electrical (10)
  // =========================
  {
    id: 51,
    name: "LED Bulb",
    category: "Electrical",
    image: "https://tse3.mm.bing.net/th/id/OIP.32xNZi_e8rzQCqCSrIxpOwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 52,
    name: "Extension Cord",
    category: "Electrical",
    image: "https://tse1.mm.bing.net/th/id/OIP.SwDbQ_FUDnTJdMd6t98Y8QHaE_?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 53,
    name: "Electrical Tape",
    category: "Electrical",
    image: "https://i0.wp.com/maxwel.com/wp-content/uploads/2022/03/electrical_tape.jpg"
  },
  {
    id: 54,
    name: "Circuit Breaker",
    category: "Electrical",
    image: "https://www.tfcelectric.com/wp-content/uploads/2023/09/iStock_000017272602_Large.jpg"
  },
  {
    id: 55,
    name: "Wall Socket",
    category: "Electrical",
    image: "https://th.bing.com/th/id/R.d7fe24c7f467ab6fb30e079842ddd13c?rik=2ID6iEnYEogDrw&pid=ImgRaw&r=0"
  },
  {
    id: 56,
    name: "Light Switch",
    category: "Electrical",
    image: "https://th.bing.com/th/id/R.0a8f6ad95221f4eb66c443974a4f93d8?rik=E6XgW1EIEnmEqA&pid=ImgRaw&r=0"
  },
  {
    id: 57,
    name: "Electrical Wires",
    category: "Electrical",
    image: "https://i.pinimg.com/originals/a0/22/07/a022075b06f41553ef86628ed2a80bce.jpg"
  },
  {
    id: 58,
    name: "Ceiling Light",
    category: "Electrical",
    image: "https://i5.walmartimages.com/asr/cc8838ff-bca6-4929-87db-29d8648dde24.f76313912c8b80ca48d1a03775703e3b.jpeg"
  },
  {
    id: 59,
    name: "Electric Fan",
    category: "Electrical",
    image: "https://tse4.mm.bing.net/th/id/OIP.F-kZL18s1zNl3t1oa4Tv8gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 60,
    name: "Solar Panel",
    category: "Electrical",
    image: "https://th.bing.com/th/id/R.a510dcf9c8cf5bd51fee672e4703b712?rik=SmLCOUpJHX1MtQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f2%2f2c%2fFixed_Tilt_Solar_panel_at_Canterbury_Municipal_Building_Canterbury_New_Hampshire.jpg&ehk=mYF2FZKSRXaC9ymA3%2bKjWZDuFek8HXyPxO%2fvGCuFm1k%3d&risl=1&pid=ImgRaw&r=0"
  },

  // =========================
  // Plumbing (10)
  // =========================
  {
    id: 61,
    name: "PVC Pipe (3m)",
    category: "Plumbing",
    image: "https://5.imimg.com/data5/EM/NG/MY-56823773/supreme-pvc-pipes-500x500-500x500.jpg"
  },
  {
    id: 62,
    name: "Pipe Fittings Set",
    category: "Plumbing",
    image: "https://c8.alamy.com/comp/T3R4P6/set-of-pipe-fittings-connection-for-industry-assorted-plumbing-fixtures-and-piping-parts-T3R4P6.jpg"
  },
  {
    id: 63,
    name: "Shower Head",
    category: "Plumbing",
    image: "https://i.ebayimg.com/images/g/gE0AAOSwYGJeaIW6/s-l1600.jpg"
  },
  {
    id: 64,
    name: "Water Tank (1000L)",
    price: 15000,
    category: "Plumbing",
    image:"https://5.imimg.com/data5/AB/SL/NJ/SELLER-74535796/1000l-water-tank-500x500.jpg"
  },
  {
    id: 65,
    name: "Faucet",
    category: "Plumbing",
    image: "https://tse1.mm.bing.net/th/id/OIP.5J8T9F7_zi2TSzqLKSttLwHaFi?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 66,
    name: "Sink",
    category: "Plumbing",
    image:"https://tse1.mm.bing.net/th/id/OIP.S5My2RS2Ua2KTZ30ntmU2QHaFM?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 67,
    name: "Toilet Bowl",
    category: "Plumbing",
    image: "https://tse4.mm.bing.net/th/id/OIP.bbAi3CWxJN5XBeQUXaNtfAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 68,
    name: "Water Heater",
    price: 18000,
    category: "Plumbing",
    image: "https://hips.hearstapps.com/popularmechanics/assets/15/45/1446571234-gettyimages-173756481.jpg"
  },
  {
    id: 69,
    name: "Drain Pipe",
    category: "Plumbing",
    image: "https://tse4.mm.bing.net/th/id/OIP.hO3fMgJrhNDTmZYfNUVKqAHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 70,
    name: "Plunger",
    category: "Plumbing",
    image: "https://tse2.mm.bing.net/th/id/OIP.oSQDzaKY6zdoljzhf9y_5gHaEA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Safety (10)
  // =========================
  {
    id: 71,
    name: "Safety Helmet",
    category: "Safety",
    image: "https://tse4.mm.bing.net/th/id/OIP.7O9f21ga532TCI_HrXlO1QHaHh?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 72,
    name: "Safety Goggles",
    category: "Safety",
    image: "https://tse1.mm.bing.net/th/id/OIP.fistdmfdgPNP5BXeudrLvwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 73,
    name: "Safety Gloves",
    category: "Safety",
    image: "https://th.bing.com/th/id/R.509e9786556896f2b9d60f15e08d1b34?rik=2KInxQxRaInQFg&pid=ImgRaw&r=0"
  },
  {
    id: 74,
    name: "Reflective Vest",
    price: 600,
    category: "Safety",
    image: "https://mugaleindustries.com/wp-content/uploads/2023/07/Reflective-Vest.png"
  },
  {
    id: 75,
    name: "Ear Protection",
    category: "Safety",
    image: "https://th.bing.com/th/id/R.1160211eaae5f04329972a9970c3c8ab?rik=NcyOoBk%2fXHx%2fUQ&pid=ImgRaw&r=0"
  },
  {
    id: 76,
    name: "Work Boots",
    category: "Safety",
    image: "https://i.ebayimg.com/images/g/uBEAAeSwwp1o1PhK/s-l960.jpg"
  },
  {
    id: 77,
    name: "Dust Mask",
    category: "Safety",
    image: "https://tse2.mm.bing.net/th/id/OIP.QcJM6iO45lw7iTN3qyJQIwHaGN?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 78,
    name: "Harness",
    category: "Safety",
    image: "https://tse4.mm.bing.net/th/id/OIP.8rtE4c_Y9WsJRPOUb1_rsgHaJo?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 79,
    name: "First Aid Kit",
    category: "Safety",
    image: "https://m.media-amazon.com/images/I/81a8W+LrAwL.jpg"
  },
  {
    id: 80,
    name: "Fire Extinguisher",
    category: "Safety",
    image: "https://firesouq.com/wp-content/uploads/2022/06/FireExting11.jpg"
  },

  // =========================
  // Finishing (10)
  // =========================
  {
    id: 81,
    name: "Wall Paint (5L)",
    category: "Finishing",
    image: "https://5.imimg.com/data5/CX/XK/FF/SELLER-8392174/wall-paint-500x500.jpg"
  },
  {
    id: 82,
    name: "Wall Tiles",
    category: "Finishing",
    image: "https://megahw.co.za/wp-content/uploads/2018/05/3008_01.jpg"
  },
  {
    id: 83,
    name: "Floor Tiles",
    category: "Finishing",
    image: "https://assets.wfcdn.com/im/94866093/compr-r85/2166/216638100/regallo-24-x-24-marble-look-polished-porcelain-wall-floor-tile.jpg"
  },
  {
    id: 84,
    name: "Wood Varnish",
    category: "Finishing",
    image: "https://octaneseating.com/blog/wp-content/uploads/2020/07/varnish.jpg"
  },
  {
    id: 85,
    name: "Plaster",
    category: "Finishing",
    image: "https://th.bing.com/th/id/OSK.HEROCLICKTHROUGHqcGVtFClkzAQ9FniacnMklrvR14_AOeoWTaTnTv4sBM?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 86,
    name: "Grout (5kg)",
    category: "Finishing",
    image: "https://tileitsa.co.za/site/wp-content/uploads/2023/08/Untitled-design-58.png"
  },
  {
    id: 87,
    name: "Wood Polish",
    category: "Finishing",
    image: "https://5.imimg.com/data5/LL/CL/MY-3643474/furniture-polish-500x500.jpg"
  },
  {
    id: 88,
    name: "Wallpaper Roll",
    category: "Finishing",
    image: "https://ae01.alicdn.com/kf/HTB1mx_pgcnI8KJjSsziq6z8QpXaU/10M-Modern-3D-Embossed-Background-Wallpaper-Roll-Desktop-Decor-WallPapers-Living-Room-Wall-paper-for-Walls.jpg"
  },
  {
    id: 89,
    name: "Curtain Rods",
    category: "Finishing",
    image: "https://oxfordhomeware.co.uk/cdn/shop/products/plainball_748x748.jpg?v=1592981919"
  },
  {
    id: 90,
    name: "Ceiling Board",
    category: "Finishing",
    image:"https://tiimg.tistatic.com/fp/1/004/463/ceiling-board-900.jpg"
  }
];

// Product Slider Functionality
const modal = document.getElementById('productsModal');
const modalTitle = document.getElementById('modalTitle');
const productsGrid = document.getElementById('productsGrid');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.querySelector('.modal-backdrop');

// Slider state
let currentSlide = 0;
let autoSlideInterval;
let isAutoSlideEnabled = true;
let currentProducts = [];
let temporaryPauseTimeout;
let isDragging = false;
let startX = 0;
let currentX = 0;

// View Products buttons
document.querySelectorAll('.view-products-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const category = this.getAttribute('data-category');
        showProducts(category);
    });
});

// Category card click effects
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        showProducts(category);
    });
});

// Close modal functionality
closeModal.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);

// ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        hideModal();
    }
});

function showProducts(category) {
    // Filter products by category (case-insensitive)
    const filteredProducts = productsData.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );

    if (!filteredProducts.length) return;

    currentProducts = filteredProducts;
    modalTitle.textContent = category + " Products";

    // Clear previous products
    productsGrid.innerHTML = '';

    // Create slider structure
    const sliderHTML = `
        <div class="slider-container">
            <div class="slider-track">
                ${filteredProducts.map((product, index) => `
                    <div class="slide" data-slide="${index}">
                        <img src="${product.image}" alt="${product.name}" class="slide-image" loading="lazy">
                        <div class="slide-content">
                            <h3>${product.name}</h3>
                            <a href="#need-help" class="btn btn-primary">Get Quote</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="auto-slide-indicator">
                <span>Auto-slide</span>
                <div class="auto-slide-toggle ${isAutoSlideEnabled ? 'active' : ''}" id="autoSlideToggle"></div>
            </div>
            
            ${filteredProducts.length > 1 ? `
                <div class="arrow-indicators" id="arrowIndicators">
                    <div class="arrow-indicator arrow-left" id="arrowLeft">‹</div>
                    <div class="arrow-indicator arrow-right" id="arrowRight">›</div>
                </div>
            ` : ''}
            
            <div class="slider-nav">
                <button class="slider-prev" id="sliderPrev">‹</button>
                <div class="slider-info">
                    <span class="slide-counter" id="slideCounter">1 / ${filteredProducts.length}</span>
                </div>
                <div class="slider-dots" id="sliderDots">
                    ${filteredProducts.map((_, index) => `
                        <div class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
                    `).join('')}
                </div>
                <button class="slider-next" id="sliderNext">›</button>
            </div>
        </div>
    `;
    
    productsGrid.innerHTML = sliderHTML;
    
    // Add slider mode classes
    const modalContent = modal.querySelector('.modal-content');
    const modalBody = modal.querySelector('.modal-body');
    
    if (modalContent) modalContent.classList.add('slider-mode');
    if (modalBody) modalBody.classList.add('slider-mode');
    
    // Initialize slider
    initSlider();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initSlider() {
    currentSlide = 0;
    updateSlider();
    
    // Set up event listeners with proper error handling
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.getElementById('sliderDots');
    const autoSlideToggle = document.getElementById('autoSlideToggle');
    const sliderTrack = document.querySelector('.slider-track');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    
    // Remove any existing event listeners first
    if (sliderPrev) {
        sliderPrev.replaceWith(sliderPrev.cloneNode(true));
    }
    if (sliderNext) {
        sliderNext.replaceWith(sliderNext.cloneNode(true));
    }
    
    // Get fresh references after cloning
    const freshSliderPrev = document.getElementById('sliderPrev');
    const freshSliderNext = document.getElementById('sliderNext');
    
    // Manual navigation event handlers
    if (freshSliderPrev) {
        freshSliderPrev.addEventListener('click', function() {
            goToPrevSlide();
            handleManualNavigation();
        });
    }
    
    if (freshSliderNext) {
        freshSliderNext.addEventListener('click', function() {
            goToNextSlide();
            handleManualNavigation();
        });
    }
    
    // Arrow indicator navigation
    if (arrowLeft) {
        arrowLeft.addEventListener('click', function() {
            goToPrevSlide();
            handleManualNavigation();
        });
    }
    
    if (arrowRight) {
        arrowRight.addEventListener('click', function() {
            goToNextSlide();
            handleManualNavigation();
        });
    }
    
    // Dot navigation
    if (sliderDots) {
        // Remove existing dots and reattach listeners
        const dotsContainer = sliderDots;
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        
        dots.forEach(dot => {
            // Clone to remove old listeners
            const newDot = dot.cloneNode(true);
            dot.replaceWith(newDot);
            
            newDot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
                handleManualNavigation();
            });
        });
    }
    
    // Auto-slide toggle
    if (autoSlideToggle) {
        autoSlideToggle.addEventListener('click', function() {
            isAutoSlideEnabled = !isAutoSlideEnabled;
            this.classList.toggle('active');
            
            if (isAutoSlideEnabled) {
                startAutoSlide();
                // Show subtle notification
                showSubtleNotification("Auto-slide on");
            } else {
                stopAutoSlide();
                // Show notification when auto-slide is turned off
                showSubtleNotification("Manual navigation");
            }
        });
    }
    
    // Start auto-slide if enabled
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        startAutoSlide();
    }
    
    // Mouse/touch events for manual navigation
    if (sliderTrack && currentProducts.length > 1) {
        setupManualNavigation(sliderTrack);
    }
    
    // Add keyboard navigation for slider
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function setupManualNavigation(sliderTrack) {
    // Mouse events for desktop
    sliderTrack.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Touch events for mobile
    sliderTrack.addEventListener('touchstart', handleTouchStart);
    sliderTrack.addEventListener('touchmove', handleTouchMove);
    sliderTrack.addEventListener('touchend', handleTouchEnd);
    
    // Wheel event for mouse wheel scrolling
    sliderTrack.addEventListener('wheel', handleWheel, { passive: false });
}

function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    sliderTrack.style.cursor = 'grabbing';
    stopAutoSlide(); // Stop auto-slide during manual interaction
}

function handleMouseMove(e) {
    if (!isDragging) return;
    currentX = e.clientX;
}

function handleMouseUp(e) {
    if (!isDragging) return;
    isDragging = false;
    sliderTrack.style.cursor = 'grab';
    
    handleSwipeGesture();
    
    // Resume auto-slide if enabled after manual interaction
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        temporarilyPauseAutoSlide();
    }
}

function handleTouchStart(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    stopAutoSlide(); // Stop auto-slide during touch interaction
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    handleSwipeGesture();
    
    // Resume auto-slide if enabled after manual interaction
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        temporarilyPauseAutoSlide();
    }
}

function handleWheel(e) {
    e.preventDefault();
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll
        if (e.deltaX > 0) {
            goToNextSlide();
        } else {
            goToPrevSlide();
        }
    } else {
        // Vertical scroll (treat as horizontal for convenience)
        if (e.deltaY > 0) {
            goToNextSlide();
        } else {
            goToPrevSlide();
        }
    }
    
    handleManualNavigation();
}

function handleSwipeGesture() {
    const diff = startX - currentX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - go to next
            goToNextSlide();
        } else {
            // Swipe right - go to previous
            goToPrevSlide();
        }
        handleManualNavigation();
    }
}

function handleManualNavigation() {
    // When user manually navigates, handle auto-slide behavior
    if (isAutoSlideEnabled) {
        temporarilyPauseAutoSlide();
    }
    // If auto-slide is off, manual navigation works without any auto behavior
}

function handleKeyboardNavigation(e) {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            goToPrevSlide();
            handleManualNavigation();
            break;
        case 'ArrowRight':
            e.preventDefault();
            goToNextSlide();
            handleManualNavigation();
            break;
        case ' ':
            e.preventDefault();
            // Toggle auto-slide with spacebar
            const autoSlideToggle = document.getElementById('autoSlideToggle');
            if (autoSlideToggle) {
                autoSlideToggle.click();
            }
            break;
    }
}

function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= currentProducts.length) return;
    
    currentSlide = slideIndex;
    updateSlider();
}

function goToNextSlide() {
    if (currentProducts.length === 0) return;
    
    currentSlide = (currentSlide + 1) % currentProducts.length;
    updateSlider();
}

function goToPrevSlide() {
    if (currentProducts.length === 0) return;
    
    currentSlide = (currentSlide - 1 + currentProducts.length) % currentProducts.length;
    updateSlider();
}

function updateSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const slideCounter = document.getElementById('slideCounter');
    
    if (!sliderTrack) return;
    
    // Update slider position
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    sliderDots.forEach((dot, index) => {
        if (dot) {
            dot.classList.toggle('active', index === currentSlide);
        }
    });
    
    // Update slide counter
    if (slideCounter) {
        slideCounter.textContent = `${currentSlide + 1} / ${currentProducts.length}`;
    }
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    
    if (currentProducts.length > 1 && isAutoSlideEnabled) {
        autoSlideInterval = setInterval(goToNextSlide, 4000); // Change slide every 4 seconds
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function temporarilyPauseAutoSlide() {
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        stopAutoSlide();
        
        // Clear any existing timeout
        if (temporaryPauseTimeout) {
            clearTimeout(temporaryPauseTimeout);
        }
        
        // Restart auto-slide after 5 seconds of manual navigation inactivity
        temporaryPauseTimeout = setTimeout(() => {
            if (isAutoSlideEnabled && currentProducts.length > 1) {
                startAutoSlide();
            }
        }, 5000);
    }
}

function showSubtleNotification(message) {
    // Create subtle notification element
    const notification = document.createElement('div');
    notification.className = 'subtle-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: absolute;
        top: 60px;
        right: 1rem;
        background: rgba(255, 107, 53, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        z-index: 10;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2000);
    }
}

function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remove slider mode classes
    const modalContent = modal.querySelector('.modal-content');
    const modalBody = modal.querySelector('.modal-body');
    
    if (modalContent) modalContent.classList.remove('slider-mode');
    if (modalBody) modalBody.classList.remove('slider-mode');
    
    // Stop auto-slide and clear timeouts
    stopAutoSlide();
    if (temporaryPauseTimeout) {
        clearTimeout(temporaryPauseTimeout);
        temporaryPauseTimeout = null;
    }
    
    // Clean up event listeners
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        // Remove all manual navigation event listeners
        const newTrack = sliderTrack.cloneNode(true);
        sliderTrack.parentNode.replaceChild(newTrack, sliderTrack);
    }
    
    // Remove keyboard event listener for slider
    document.removeEventListener('keydown', handleKeyboardNavigation);
    
    // Clear current products
    currentProducts = [];
}

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Keyboard navigation support for mobile menu
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    }
});

    // Prevent zoom on double tap on mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in-up');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, '')) || 0;
                
                if (number > 0) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + text.replace(/\d+/, '');
                        }
                    }, 40);
                }
                statsObserver.unobserve(target);
            }
        });
    });

    statsNumbers.forEach(stat => statsObserver.observe(stat));

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Initialize tooltips for social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Additional scroll optimizations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Add error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}