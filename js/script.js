// Este script espera que todo o conteúdo da página (HTML) seja carregado antes de ser executado.
document.addEventListener('DOMContentLoaded', () => {

    console.log("O DOM está pronto. O script do portfólio está a ser executado.");

    // --- LÓGICA PARA O MODAL DE PROJETOS ---

    // 1. Dados dos Projetos
    // Defina aqui os dados dos seus projetos.
    const projectsData = {
        sigaaf: {
            title: 'SIGAAF - Sistema Integrado de Gestão',
            images: [
                './assets/sigaaf1.png',
                './assets/sigaaf2.png'
            ]
        }
    };

    // 2. Elementos do DOM
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImages = document.getElementById('modal-images');
    const closeButton = document.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card.clickable');

    // 3. Verificação de Elementos (Diagnóstico)
    if (!modal) {
        console.error("ERRO: O elemento do modal (id='project-modal') não foi encontrado no HTML.");
        return; // Interrompe a execução se o modal não existir.
    }
    if (projectCards.length === 0) {
        console.warn("AVISO: Nenhum card de projeto clicável (class='project-card clickable') foi encontrado.");
    }

    // 4. Funções
    const openModal = (projectId) => {
        const project = projectsData[projectId];
        if (!project) {
            console.error(`ERRO: Não foram encontrados dados para o projeto com o ID '${projectId}'. Verifique se 'data-project="${projectId}"' no HTML corresponde a uma chave no objeto 'projectsData' no seu ficheiro JS.`);
            return;
        }

        modalTitle.textContent = project.title;
        modalImages.innerHTML = ''; // Limpa conteúdo anterior

        project.images.forEach(imgPath => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.onerror = () => {
                console.error(`ERRO ao carregar imagem: ${imgPath}`);
                img.src = 'https://placehold.co/800x450/e0e7ff/4338ca?text=Imagem+Indispon%C3%ADvel';
            };
            modalImages.appendChild(img);
        });

        modal.style.display = 'block';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    // 5. Adicionar Event Listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openModal(projectId);
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });


    // --- OUTRAS LÓGICAS (MENU E SCROLL) ---

    // Lógica para o menu hamburger
    const menuButton = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Lógica para a animação de scroll reveal
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Chamar na carga inicial
});
