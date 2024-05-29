export function filterWorkCategories() {
    const containerGallery = document.querySelector(".container-gallery");
    const divGallery = document.querySelector(".gallery");
    const divFilter = document.createElement("div");
    divFilter.classList.add("divFilters");
    containerGallery.insertBefore(divFilter, divGallery);

    const galleryItems = document.querySelectorAll(".gallery-item");
    const categories = new Set();

    galleryItems.forEach(item => {
        categories.add(item.dataset.galleryTag);
    });

    // Créer un bouton pour chaque catégorie et l'ajouter à divFilter
    categories.forEach(category => {
        const button = document.createElement("button");
        button.innerText = category;
        button.classList.add("buttonFilter", "default-style");
        divFilter.appendChild(button);
    });

    // Ajouter un bouton "Tous" pour afficher tous les éléments
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("buttonFilter", "active-style");
    divFilter.insertBefore(allButton, divFilter.firstChild);

    // Test de la fonctionnalité de filtre
    const buttons = document.querySelectorAll(".buttonFilter");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            galleryItems.forEach(item => {
                if (button.innerText === "Tous" || item.dataset.galleryTag === button.innerText) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
            changeColorButton(buttons, button);
        });
    });
}


// Changement de couleur des boutons
function changeColorButton(buttons, activeButton) {
    buttons.forEach(button => {
        if (button === activeButton) {
            button.classList.remove("default-style");
            button.classList.add("active-style");
        } else {
            button.classList.remove("active-style");
            button.classList.add("default-style");
        }
    });
}


//Déclaration des variables
let currentIndex = 0;
let filteredItems = [];


// Gestion de l'ouverture de la modale
function openModal(index) {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    currentIndex = index;
    modalImage.src = filteredItems[currentIndex].src;
    modalImage.alt = filteredItems[currentIndex].alt;
    modal.style.display = 'flex';
}


// Gestion de la fermeture de la modale
function closeModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = 'none';
}


// Gestion de l'affichage de l'image précédente
function showPrevImage() {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    currentIndex = (currentIndex > 0) ? currentIndex - 1 : filteredItems.length - 1;
    modalImage.src = filteredItems[currentIndex].src;
    modalImage.alt = filteredItems[currentIndex].alt;
}


// Gestion de l'affichage de l'image suivante
function showNextImage() {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    currentIndex = (currentIndex < filteredItems.length - 1) ? currentIndex + 1 : 0;
    modalImage.src = filteredItems[currentIndex].src;
    modalImage.alt = filteredItems[currentIndex].alt;
}


// Mise à jour des éléments filtrés
function updateFilteredItems() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    let currentCategory = "Tous";
    if (currentCategory === "Tous") {
        filteredItems = Array.from(galleryItems).filter(item => item.style.display !== "none");
    } else {
        filteredItems = Array.from(galleryItems).filter(item => item.dataset.category === currentCategory && item.style.display !== "none");
    }
}


// Gestion de la modale
export function openGalleryModal() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.querySelector(".modal");
    const prevButton = modal.querySelector(".mg-prev");
    const nextButton = modal.querySelector(".mg-next");
    let currentCategory = "Tous";

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            updateFilteredItems();
            const filteredIndex = filteredItems.indexOf(item);
            openModal(filteredIndex);
        });
    });

    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.querySelectorAll(".buttonFilter").forEach(button => {
        button.addEventListener("click", () => {
            currentCategory = button.innerText;
            updateFilteredItems();
        });
    });
}