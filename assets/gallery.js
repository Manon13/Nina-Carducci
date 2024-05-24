//Fonction pour les filtres de catégories

document.addEventListener("DOMContentLoaded", function () {
    function filterWorkCategories() {

        const containerGallery = document.querySelector(".container-gallery");
        const divGallery = document.querySelector(".gallery");
        const divFilter = document.createElement("div");
        divFilter.classList.add("divFilters");
        containerGallery.insertBefore(divFilter, divGallery);
        console.log(containerGallery);

        const galleryItems = document.querySelectorAll(".gallery-item");
        const categories = new Set();


        galleryItems.forEach(item => {
            categories.add(item.dataset.galleryTag);
        });
        console.log(categories);

        // Créer un bouton pour chaque catégorie et l'ajouter à divFilter
        categories.forEach(category => {
            const button = document.createElement("button");
            button.innerText = category;
            button.classList.add("buttonFilter","default-style");
            divFilter.appendChild(button);
        });

        // Ajouter un bouton "Tous" pour afficher tous les éléments
        const allButton = document.createElement("button");
        allButton.innerText = "Tous";
        allButton.classList.add("buttonFilter", "active-style");
        divFilter.insertBefore(allButton, divFilter.firstChild);

        // // Entourer chaque image d'une div
        // galleryItems.forEach(item => {
        //     const divWrapper = document.createElement("div");
        //     divWrapper.classList.add("image-wrapper"); // Ajoutez la classe image-wrapper à la div
        //     item.parentNode.insertBefore(divWrapper, item); // Insérer la nouvelle div avant l'élément img
        //     divWrapper.appendChild(item); // Déplacer l'élément img à l'intérieur de la nouvelle div
        // });

        //Test de la fonctionnalité de filtre
        const buttons = document.querySelectorAll(".buttonFilter");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                galleryItems.forEach(item => {
                    if (button.innerText === "Tous" || item.dataset.galleryTag === button.innerText) {
                        item.style.display = "block";
                        console.log(item);
                        console.log(item.dataset.galleryTag);
                    } else {
                        item.style.display = "none";
                    }
                });
                changeColorButton(buttons, button);
            });
        });


        console.log(galleryItems, buttons)
    }
    filterWorkCategories();

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
});
