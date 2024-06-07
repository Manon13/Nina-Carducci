/**
 * Filtre les éléments de la galerie par catégories.
 * 
 * Crée des boutons pour chaque catégorie trouvée dans les éléments de la galerie et ajoute un bouton "Tous".
 * Affiche les éléments correspondant à la catégorie du bouton cliqué
 * et le style du bouton actif est mis à jour
 **/
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


/**
 * Change la couleur du bouton actif.
 * 
 * Met à jour les styles des boutons pour indiquer quel bouton est actif.
 * Le bouton actif obtient la classe "active-style",
 * tandis que les autres boutons obtiennent la classe "default-style".
 * 
 * @param {NodeList} buttons - La liste des boutons de filtre.
 * @param {HTMLElement} activeButton - Le bouton actuellement actif.
 */
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


/** Ouvre la modale et affiche l'image correspondante.
 * 
 * Met à jour l'image de la modale avec l'image de l'élément filtré à l'index spécifié,
 * puis affiche la modale.
 * 
 * @param {number} index - L'index de l'image à afficher dans la modale.
 **/
function openModal(index) {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    currentIndex = index;
    modalImage.src = filteredItems[currentIndex].src;
    modalImage.alt = filteredItems[currentIndex].alt;
    modal.style.display = 'flex';
}


/** Gestion de la la fermeture de la modale. **/
function closeModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = 'none';
}


/** Affiche l'image précédente dans la modale. **/
function showPrevImage() {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    currentIndex = (currentIndex > 0) ? currentIndex - 1 : filteredItems.length - 1;
    modalImage.src = filteredItems[currentIndex].src;
    modalImage.alt = filteredItems[currentIndex].alt;
}


/** Affiche l'image suivante dans la modale. **/
function showNextImage() {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    currentIndex = (currentIndex < filteredItems.length - 1) ? currentIndex + 1 : 0;
    modalImage.src = filteredItems[currentIndex].src;
    modalImage.alt = filteredItems[currentIndex].alt;
}


/** Met à jour la liste des éléments filtrés en fonction de la catégorie actuelle.
 * 
 * Filtre les éléments de la galerie en fonction de la catégorie sélectionnée et de leur visibilité.
 * Si la catégorie actuelle est "Tous", tous les éléments visibles sont inclus dans `filteredItems`.
 * Sinon, seuls les éléments visibles appartenant à la catégorie sélectionnée sont inclus.
 **/
function updateFilteredItems() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    let currentCategory = "Tous";
    if (currentCategory === "Tous") {
        filteredItems = Array.from(galleryItems).filter(item => item.style.display !== "none");
    } else {
        filteredItems = Array.from(galleryItems).filter(item => item.dataset.category === currentCategory && item.style.display !== "none");
    }
}


/**
 * Ouvre la modale de la galerie et gère les interactions avec les éléments.
 * 
 * Associe les événements nécessaires pour ouvrir la modale avec l'image correspondante
 * lorsqu'un élément de la galerie est cliqué. Gère également les événements pour la navigation
 * entre les images dans la modale et pour la fermeture de la modale en cliquant en dehors de l'image.
 * Met à jour la liste des éléments filtrés en fonction de la catégorie sélectionnée.
 **/
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