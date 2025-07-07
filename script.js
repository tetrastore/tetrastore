document.addEventListener('DOMContentLoaded', () => {
    // --- Data Produk (Simulasi Database) ---
    // Pastikan ID unik dan konsisten untuk drag-and-drop
    let products = JSON.parse(localStorage.getItem('products')) || [
        {
            id: 'prod1',
            name: 'Kemeja Batik Modern',
            // Gunakan Base64 data URI atau URL gambar eksternal di sini
            image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Batik+Modern',
            gallery: [
                'https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Batik+Modern+1',
                'https://via.placeholder.com/400x400/A0522D/FFFFFF?text=Batik+Modern+2',
                'https://via.placeholder.com/400x400/CD853F/FFFFFF?text=Batik+Modern+3'
            ],
            description: 'Kemeja batik modern dengan desain kontemporer dan bahan katun berkualitas tinggi. Cocok untuk acara formal maupun kasual.',
            price: 185000,
            category: 'baju',
            stock: 15
        },
        {
            id: 'prod2',
            name: 'Celana Jeans Slim Fit',
            image: 'https://via.placeholder.com/200x200/4682B4/FFFFFF?text=Jeans+SlimFit',
            gallery: [
                'https://via.placeholder.com/400x400/4682B4/FFFFFF?text=Jeans+SlimFit+1',
                'https://via.placeholder.com/400x400/6A5ACD/FFFFFF?text=Jeans+SlimFit+2'
            ],
            description: 'Celana jeans slim fit nyaman dengan stretch. Tersedia dalam berbagai ukuran.',
            price: 250000,
            category: 'celana',
            stock: 0
        },
        {
            id: 'prod3',
            name: 'Jaket Bomber Stylish',
            image: 'https://via.placeholder.com/200x200/5F9EA0/FFFFFF?text=Bomber+Jacket',
            gallery: [
                'https://via.placeholder.com/400x400/5F9EA0/FFFFFF?text=Bomber+Jacket+1',
                'https://via.placeholder.com/400x400/48D1CC/FFFFFF?text=Bomber+Jacket+2'
            ],
            description: 'Jaket bomber dengan desain stylish, cocok untuk gaya urban. Material tahan angin.',
            price: 320000,
            category: 'jaket',
            stock: 8
        },
        {
            id: 'prod4',
            name: 'Topi Baseball Trendy',
            image: 'https://via.placeholder.com/200x200/BDB76B/FFFFFF?text=Baseball+Cap',
            gallery: [
                'https://via.placeholder.com/400x400/BDB76B/FFFFFF?text=Baseball+Cap+1'
            ],
            description: 'Topi baseball dengan logo bordir, nyaman dipakai sehari-hari.',
            price: 75000,
            category: 'topi',
            stock: 20
        },
        {
            id: 'prod5',
            name: 'Kaos Distro Keren',
            image: 'https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Kaos+Distro',
            gallery: [
                'https://via.placeholder.com/400x400/FF6347/FFFFFF?text=Kaos+Distro+1',
                'https://via.placeholder.com/400x400/FF4500/FFFFFF?text=Kaos+Distro+2'
            ],
            description: 'Kaos distro dengan sablon unik, bahan katun combed 30s adem dan nyaman.',
            price: 110000,
            category: 'baju',
            stock: 25
        },
        {
            id: 'prod6',
            name: 'Celana Chino Casual',
            image: 'https://via.placeholder.com/200x200/708090/FFFFFF?text=Chino+Casual',
            gallery: [
                'https://via.placeholder.com/400x400/708090/FFFFFF?text=Chino+Casual+1',
                'https://via.placeholder.com/400x400/696969/FFFFFF?text=Chino+Casual+2'
            ],
            description: 'Celana chino bahan twill stretch, cocok untuk gaya kasual dan semi-formal.',
            price: 210000,
            category: 'celana',
            stock: 12
        }
    ];

    // --- Elemen DOM ---
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const promotionSlider = document.getElementById('promotionSlider');
    const mainContent = document.querySelector('.main-content');

    // Owner Action Buttons
    const newProductButton = document.getElementById('newProductButton');
    const toggleSortModeButton = document.getElementById('toggleSortModeButton');
    const ownerActionsTop = document.querySelector('.owner-actions-top');

    // Modals
    const detailModal = document.getElementById('detailModal');
    const detailModalCloseButton = document.getElementById('detailModalCloseButton');
    const editModal = document.getElementById('editModal');
    const editModalCloseButton = document.getElementById('editModalCloseButton');
    const loginModal = document.getElementById('loginModal');
    const loginModalCloseButton = document.getElementById('loginModalCloseButton');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const productToDeleteName = document.getElementById('productToDeleteName');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');

    // Detail Modal Elements
    const detailMainImage = document.getElementById('detailMainImage');
    const detailThumbnails = document.getElementById('detailThumbnails');
    const detailProductName = document.getElementById('detailProductName');
    const detailProductCategory = document.getElementById('detailProductCategory');
    const detailProductPrice = document.getElementById('detailProductPrice');
    const detailProductDescription = document.getElementById('detailProductDescription');
    const detailProductStock = document.getElementById('detailProductStock');
    const contactOwnerButton = document.getElementById('contactOwnerButton');

    // Edit Modal Elements (Updated)
    const editModalTitle = document.getElementById('editModalTitle');
    const editForm = document.getElementById('editForm');
    const editProductId = document.getElementById('editProductId');
    const editProductName = document.getElementById('editProductName');
    const editProductImageFile = document.getElementById('editProductImageFile'); // Changed to file input
    const editProductImagePreview = document.getElementById('editProductImagePreview'); // Added for preview
    const editProductImagesGalleryFiles = document.getElementById('editProductImagesGalleryFiles'); // Changed to file input
    const editProductImagesGalleryPreview = document.getElementById('editProductImagesGalleryPreview'); // Added for preview
    const editProductDescription = document.getElementById('editProductDescription');
    const editProductPrice = document.getElementById('editProductPrice');
    const editProductCategory = document.getElementById('editProductCategory');
    const editProductStock = document.getElementById('editProductStock');
    const saveProductButton = document.getElementById('saveProductButton');

    // Login Modal Elements
    const loginForm = document.getElementById('loginForm');
    const ownerEmailInput = document.getElementById('ownerEmail');
    const ownerPasswordInput = document.getElementById('ownerPassword');
    const loginMessage = document.getElementById('loginMessage');
    const ownerLoginButton = document.getElementById('ownerLoginButton');

    // --- State Aplikasi ---
    let isOwnerLoggedIn = localStorage.getItem('isOwnerLoggedIn') === 'true';
    let isSortMode = false;
    let draggedItem = null; // For drag and drop functionality
    let productIdToDelete = null; // Store product ID for deletion confirmation

    // Temporary storage for new image data during edit/new product
    let currentMainImageBase64 = null;
    let currentGalleryBase64 = [];


    // --- Fungsi Utilitas ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const saveProducts = () => {
        localStorage.setItem('products', JSON.stringify(products));
        // Optional: Re-render if order changed
        if (isSortMode) {
            renderProducts(products);
            attachDragAndDropListeners();
        }
    };

    const generateProductId = () => {
        return 'prod' + Date.now() + Math.floor(Math.random() * 1000);
    };

    // Fungsi untuk membaca file gambar dan mengubahnya ke Base64
    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file); // Ini yang membaca file sebagai data URI (Base64)
        });
    };

    const updateOwnerModeUI = () => {
        if (isOwnerLoggedIn) {
            document.body.classList.add('owner-mode');
            ownerActionsTop.style.display = 'flex'; // Show owner action buttons container
            newProductButton.style.display = 'flex';
            toggleSortModeButton.style.display = 'flex';
            ownerLoginButton.textContent = 'Logout';
        } else {
            document.body.classList.remove('owner-mode');
            ownerActionsTop.style.display = 'none'; // Hide owner action buttons container
            newProductButton.style.display = 'none';
            toggleSortModeButton.style.display = 'none';
            ownerLoginButton.textContent = 'Login';
            // Exit sort mode if logged out
            if (isSortMode) {
                toggleSortMode();
            }
        }
        performSearchAndFilter(); // Re-render products to show/hide edit/delete buttons based on owner mode
    };

    // --- Render Produk ---
    const renderProducts = (filteredProducts) => {
        productsGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Produk tidak ditemukan.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('draggable', isSortMode ? 'true' : 'false'); // Make draggable only in sort mode
            productCard.dataset.id = product.id; // Store product ID

            if (product.stock <= 0) {
                productCard.classList.add('out-of-stock');
            }

            const stockStatusClass = product.stock > 0 ? 'in' : 'out';
            const stockStatusText = product.stock > 0 ? 'Stok Tersedia' : 'Stok Habis';

            productCard.innerHTML = `
                <div class="stock-status ${stockStatusClass}">${stockStatusText}</div>
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <span class="category-tag">${product.category}</span>
                    <h3>${product.name}</h3>
                    <p class="price">${formatRupiah(product.price)}</p>
                    <p class="description">${product.description}</p>
                    <div class="product-actions">
                        <button class="detail-button" data-id="${product.id}">Lihat Detail</button>
                        ${isOwnerLoggedIn ? `<button class="edit-button" data-id="${product.id}">Edit</button>` : ''}
                        ${isOwnerLoggedIn ? `<button class="delete-button" data-id="${product.id}" style="display: ${isSortMode ? 'none' : 'flex'};">Hapus</button>` : ''}
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Re-attach event listeners after rendering
        attachProductCardListeners();
    };

    const attachProductCardListeners = () => {
        document.querySelectorAll('.detail-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                showDetailModal(productId);
            });
        });

        if (isOwnerLoggedIn) {
            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    showEditModal(productId);
                });
            });

            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    showDeleteConfirmation(productId);
                });
            });
        }
    };

    // --- Slider Promosi ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let sliderInterval;

    const setupSlider = () => {
        if (slides.length === 0) {
            promotionSlider.classList.add('hidden');
            mainContent.classList.add('search-active'); // Adjust main content margin
            return;
        } else {
            promotionSlider.classList.remove('hidden');
            mainContent.classList.remove('search-active');
        }

        // Create dots
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSliderInterval();
            });
            dotsContainer.appendChild(dot);
        });
    };

    const goToSlide = (index) => {
        if (slides.length === 0) return;
        currentSlide = (index + slides.length) % slides.length;
        const offset = -currentSlide * 100;
        document.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;

        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        goToSlide(currentSlide - 1);
    };

    const startSliderInterval = () => {
        sliderInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const resetSliderInterval = () => {
        clearInterval(sliderInterval);
        startSliderInterval();
    };

    // Slider navigation buttons
    document.querySelector('.slider-nav.next').addEventListener('click', () => {
        nextSlide();
        resetSliderInterval();
    });

    document.querySelector('.slider-nav.prev').addEventListener('click', () => {
        prevSlide();
        resetSliderInterval();
    });

    // --- Live Search & Filter Fungsionalitas ---
    const performSearchAndFilter = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        // Apply filters directly to the 'products' array, then render
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                  product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filteredProducts);

        // Hide/show slider based on search input or sort mode
        if (searchTerm.length > 0 || selectedCategory !== 'all' || isSortMode) {
            promotionSlider.classList.add('hidden');
            mainContent.classList.add('search-active');
        } else {
            promotionSlider.classList.remove('hidden');
            mainContent.classList.remove('search-active');
        }

        // Hide search and filter in sort mode
        if (isSortMode) {
            searchInput.style.display = 'none';
            categoryFilter.style.display = 'none';
            searchButton.style.display = 'none';
        } else {
            searchInput.style.display = 'block';
            categoryFilter.style.display = 'block';
            searchButton.style.display = 'block';
        }
    };

    // Event Listeners for Live Search and Filter
    searchInput.addEventListener('input', performSearchAndFilter);
    categoryFilter.addEventListener('change', performSearchAndFilter);
    searchButton.addEventListener('click', performSearchAndFilter);

    // --- Modal Handler ---
    const openModal = (modalElement) => {
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('show'), 10);
    };

    const closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        setTimeout(() => modalElement.style.display = 'none', 300);
    };

    // Close buttons
    detailModalCloseButton.addEventListener('click', () => closeModal(detailModal));
    editModalCloseButton.addEventListener('click', () => closeModal(editModal));
    loginModalCloseButton.addEventListener('click', () => closeModal(loginModal));
    cancelDeleteButton.addEventListener('click', () => closeModal(confirmDeleteModal));

    // Close on outside click
    window.addEventListener('click', (event) => {
        if (event.target === detailModal) closeModal(detailModal);
        if (event.target === editModal) closeModal(editModal);
        if (event.target === loginModal) closeModal(loginModal);
        if (event.target === confirmDeleteModal) closeModal(confirmDeleteModal);
    });

    // --- Product Detail Modal ---
    const showDetailModal = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        detailMainImage.src = product.image;
        detailProductName.textContent = product.name;
        detailProductCategory.textContent = product.category;
        detailProductPrice.textContent = formatRupiah(product.price);
        detailProductDescription.textContent = product.description;

        const detailStockClass = product.stock > 0 ? 'in' : 'out';
        detailProductStock.innerHTML = `Stok: <span class="stock-status ${detailStockClass}">${product.stock > 0 ? 'Tersedia' : 'Habis'}</span> (${product.stock})`;


        // Populate gallery thumbnails
        detailThumbnails.innerHTML = '';
        // Add main image as the first thumbnail
        const mainThumbnail = document.createElement('img');
        mainThumbnail.src = product.image;
        mainThumbnail.alt = product.name;
        mainThumbnail.classList.add('active');
        mainThumbnail.addEventListener('click', () => {
            detailMainImage.src = product.image;
            document.querySelectorAll('#detailThumbnails img').forEach(img => img.classList.remove('active'));
            mainThumbnail.classList.add('active');
        });
        detailThumbnails.appendChild(mainThumbnail);

        if (product.gallery && product.gallery.length > 0) {
            product.gallery.forEach(imgUrl => {
                const thumbnail = document.createElement('img');
                thumbnail.src = imgUrl;
                thumbnail.alt = product.name;
                thumbnail.addEventListener('click', () => {
                    detailMainImage.src = imgUrl;
                    document.querySelectorAll('#detailThumbnails img').forEach(img => img.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
                detailThumbnails.appendChild(thumbnail);
            });
        }

        const whatsappMessage = `Halo, saya tertarik dengan produk ${product.name} (${formatRupiah(product.price)}) yang Anda jual di TetraStore. Apakah produk ini masih tersedia?`;
        contactOwnerButton.href = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;

        openModal(detailModal);
    };

    // --- Product Edit/New Modal (Updated logic for file uploads) ---
    let isNewProductMode = false;

    const showEditModal = (productId = null) => {
        editForm.reset(); // Reset form fields
        editProductId.value = '';
        editProductImagePreview.style.display = 'none'; // Hide preview initially
        editProductImagePreview.src = '';
        editProductImagesGalleryPreview.innerHTML = ''; // Clear gallery previews
        currentMainImageBase64 = null; // Reset temporary Base64 data
        currentGalleryBase64 = []; // Reset temporary Base64 data

        if (productId) {
            isNewProductMode = false;
            editModalTitle.textContent = 'Edit Detail Produk';
            saveProductButton.textContent = 'Simpan Perubahan';

            const product = products.find(p => p.id === productId);
            if (!product) return;

            editProductId.value = product.id;
            editProductName.value = product.name;
            editProductDescription.value = product.description;
            editProductPrice.value = product.price;
            editProductCategory.value = product.category;
            editProductStock.value = product.stock;

            // Set current image for preview if it's not a new product
            if (product.image) {
                editProductImagePreview.src = product.image;
                editProductImagePreview.style.display = 'block';
                currentMainImageBase64 = product.image; // Keep existing image if no new upload
            }

            // Set current gallery for preview if it's not a new product
            if (product.gallery && product.gallery.length > 0) {
                currentGalleryBase64 = [...product.gallery]; // Keep existing gallery if no new upload
                product.gallery.forEach(imgData => {
                    const img = document.createElement('img');
                    img.src = imgData;
                    img.style.width = '80px';
                    img.style.height = '80px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '4px';
                    editProductImagesGalleryPreview.appendChild(img);
                });
            }

        } else {
            isNewProductMode = true;
            editModalTitle.textContent = 'Buat Produk Baru';
            saveProductButton.textContent = 'Tambah Produk';
            editProductCategory.value = 'baju';
            editProductStock.value = 1;
        }
        openModal(editModal);
    };

    newProductButton.addEventListener('click', () => showEditModal(null));

    // Handle Main Image File Input Change
    editProductImageFile.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64String = await readFileAsBase64(file);
                currentMainImageBase64 = base64String;
                editProductImagePreview.src = base64String;
                editProductImagePreview.style.display = 'block';
            } catch (error) {
                console.error('Error reading main image file:', error);
                alert('Gagal membaca file gambar utama. Pastikan itu adalah file gambar yang valid.');
                currentMainImageBase64 = null;
                editProductImagePreview.src = '';
                editProductImagePreview.style.display = 'none';
            }
        } else {
            currentMainImageBase64 = null; // If no file selected, reset
            editProductImagePreview.src = '';
            editProductImagePreview.style.display = 'none';
        }
    });

    // Handle Gallery Images File Input Change
    editProductImagesGalleryFiles.addEventListener('change', async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            currentGalleryBase64 = []; // Clear previous gallery when new files are uploaded
            editProductImagesGalleryPreview.innerHTML = ''; // Clear preview area

            for (const file of files) {
                try {
                    const base64String = await readFileAsBase64(file);
                    currentGalleryBase64.push(base64String);

                    const img = document.createElement('img');
                    img.src = base64String;
                    img.style.width = '80px';
                    img.style.height = '80px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '4px';
                    editProductImagesGalleryPreview.appendChild(img);
                } catch (error) {
                    console.error('Error reading gallery file:', file.name, error);
                    alert(`Gagal membaca file galeri: ${file.name}. Pastikan itu adalah file gambar yang valid.`);
                    // Optionally, you might want to remove this file from currentGalleryBase64 if it failed
                }
            }
        } else {
            currentGalleryBase64 = []; // If no files selected, reset
            editProductImagesGalleryPreview.innerHTML = '';
        }
    });


    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = editProductId.value;
        const name = editProductName.value;
        const description = editProductDescription.value;
        const price = parseFloat(editProductPrice.value);
        const category = editProductCategory.value;
        const stock = parseInt(editProductStock.value);

        // Validate image presence for new product
        if (isNewProductMode && !currentMainImageBase64) {
            alert('Harap unggah gambar utama untuk produk baru.');
            return;
        }

        if (isNewProductMode) {
            const newProduct = {
                id: generateProductId(),
                name,
                image: currentMainImageBase64, // Use Base64 from input
                gallery: currentGalleryBase64, // Use Base64 from input
                description,
                price,
                category,
                stock
            };
            products.push(newProduct);
        } else {
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    name,
                    // Use new Base64 if uploaded, otherwise keep existing
                    image: currentMainImageBase64 || products[productIndex].image,
                    // Use new Base64 array if uploaded, otherwise keep existing
                    gallery: currentGalleryBase64.length > 0 ? currentGalleryBase64 : products[productIndex].gallery,
                    description,
                    price,
                    category,
                    stock
                };
            }
        }

        saveProducts();
        performSearchAndFilter();
        closeModal(editModal);
    });

    // --- Product Deletion ---
    const showDeleteConfirmation = (productId) => {
        productIdToDelete = productId;
        const product = products.find(p => p.id === productId);
        if (product) {
            productToDeleteName.textContent = product.name;
            openModal(confirmDeleteModal);
        }
    };

    confirmDeleteButton.addEventListener('click', () => {
        if (productIdToDelete) {
            products = products.filter(p => p.id !== productIdToDelete);
            saveProducts();
            performSearchAndFilter(); // Re-render products
            closeModal(confirmDeleteModal);
            productIdToDelete = null; // Reset
        }
    });

    // --- Owner Login/Logout Fungsionalitas ---
    ownerLoginButton.addEventListener('click', () => {
        if (isOwnerLoggedIn) {
            isOwnerLoggedIn = false;
            localStorage.setItem('isOwnerLoggedIn', 'false');
            alert('Anda telah berhasil logout.');
            updateOwnerModeUI();
        } else {
            openModal(loginModal);
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = ownerEmailInput.value;
        const password = ownerPasswordInput.value;

        if (email === 'tetrasyte@gmail.com' && password === '4sekawanbisnis') {
            isOwnerLoggedIn = true;
            localStorage.setItem('isOwnerLoggedIn', 'true');
            loginMessage.textContent = '';
            closeModal(loginModal);
            updateOwnerModeUI();
            alert('Login berhasil! Anda sekarang dalam mode Owner.');
        } else {
            loginMessage.textContent = 'Email atau password salah!';
        }
        ownerPasswordInput.value = '';
    });

    // --- Drag and Drop (Sortable Products) ---
    let isDragging = false;
    let dragStartIndex = -1;

    const attachDragAndDropListeners = () => {
        const productCards = productsGrid.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            if (isSortMode) {
                card.setAttribute('draggable', 'true');
                card.addEventListener('dragstart', dragStart);
                card.addEventListener('dragover', dragOver);
                card.addEventListener('drop', drop);
                card.addEventListener('dragenter', dragEnter);
                card.addEventListener('dragleave', dragLeave);
                // Hide specific buttons in sort mode
                const deleteButton = card.querySelector('.delete-button');
                const editButton = card.querySelector('.edit-button');
                if (deleteButton) deleteButton.style.display = 'none';
                if (editButton) editButton.style.display = 'none';
            } else {
                card.setAttribute('draggable', 'false');
                card.removeEventListener('dragstart', dragStart);
                card.removeEventListener('dragover', dragOver);
                card.removeEventListener('drop', drop);
                card.removeEventListener('dragenter', dragEnter);
                card.removeEventListener('dragleave', dragLeave);
                // Show specific buttons if owner is logged in
                const deleteButton = card.querySelector('.delete-button');
                const editButton = card.querySelector('.edit-button');
                if (deleteButton && isOwnerLoggedIn) deleteButton.style.display = 'flex';
                if (editButton && isOwnerLoggedIn) editButton.style.display = 'flex';
            }
        });
    };

    const dragStart = (e) => {
        isDragging = true;
        draggedItem = e.target;
        dragStartIndex = Array.from(productsGrid.children).indexOf(draggedItem);
        setTimeout(() => draggedItem.classList.add('dragging'), 0);
        e.dataTransfer.setData('text/plain', draggedItem.dataset.id); // Set data to transfer
    };

    const dragOver = (e) => {
        e.preventDefault(); // Crucial for drop to work
        const target = e.target.closest('.product-card');
        if (target && target !== draggedItem && isSortMode) {
            // Remove highlight from previous target
            productsGrid.querySelectorAll('.product-card').forEach(card => card.classList.remove('drag-over-highlight'));

            // Add highlight to current target
            target.classList.add('drag-over-highlight');
        }
    };

    const dragEnter = (e) => {
        e.preventDefault();
        const target = e.target.closest('.product-card');
        if (target && target !== draggedItem && isSortMode) {
            // Add a visual indicator where it will be dropped, e.g., border
            target.classList.add('drag-enter-target');
        }
    };

    const dragLeave = (e) => {
        const target = e.target.closest('.product-card');
        if (target) {
            target.classList.remove('drag-enter-target');
        }
    };

    const drop = (e) => {
        e.preventDefault();
        const target = e.target.closest('.product-card');

        if (target && target !== draggedItem && isSortMode) {
            const dropIndex = Array.from(productsGrid.children).indexOf(target);

            // Reorder the `products` array
            const [removed] = products.splice(dragStartIndex, 1);
            products.splice(dropIndex, 0, removed);

            saveProducts(); // Save the new order
            renderProducts(products); // Re-render the grid with new order
            attachDragAndDropListeners(); // Re-attach listeners for the new DOM elements
        }

        // Clean up
        draggedItem.classList.remove('dragging');
        productsGrid.querySelectorAll('.product-card').forEach(card => card.classList.remove('drag-over-highlight', 'drag-enter-target'));
        isDragging = false;
        draggedItem = null;
        dragStartIndex = -1;
    };


    const toggleSortMode = () => {
        isSortMode = !isSortMode;
        if (isSortMode) {
            productsGrid.classList.add('sort-mode');
            toggleSortModeButton.textContent = 'Selesai Atur Urutan';
            toggleSortModeButton.classList.remove('secondary');
            toggleSortModeButton.classList.add('primary');
            // Disable search and filter in sort mode
            searchInput.value = ''; // Clear search when entering sort mode
            categoryFilter.value = 'all'; // Reset category when entering sort mode
            performSearchAndFilter(); // Re-render to apply sort mode styling and hide search/filter
            alert('Mode Atur Urutan Aktif! Seret dan lepas produk untuk mengubah urutannya. Klik "Lihat Detail" atau "Edit" akan dinonaktifkan sementara.');
        } else {
            productsGrid.classList.remove('sort-mode');
            toggleSortModeButton.textContent = 'Atur Urutan Produk';
            toggleSortModeButton.classList.remove('primary');
            toggleSortModeButton.classList.add('secondary');
            performSearchAndFilter(); // Re-render to restore normal styling and show search/filter
            alert('Mode Atur Urutan Dinonaktifkan.');
        }
        attachDragAndDropListeners(); // Attach/remove drag listeners based on mode
    };

    toggleSortModeButton.addEventListener('click', toggleSortMode);

    // --- Inisialisasi Aplikasi ---
    updateOwnerModeUI();
    performSearchAndFilter();
    setupSlider();
    startSliderInterval();

    // Initial check for slider visibility
    if (searchInput.value === '' && categoryFilter.value === 'all' && !isSortMode) {
        promotionSlider.classList.remove('hidden');
        mainContent.classList.remove('search-active');
    }
});