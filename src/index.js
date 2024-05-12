window.addEventListener('load', () => {
    // Animação da Introdução (se ainda estiver usando)
    const cardsList = document.querySelectorAll('.card');
    const imageIntro = document.querySelector('.image_intro');
    const appTitle = document.querySelector('.app_title');

    appTitle.addEventListener('click', () => {
        const chatSection = document.querySelector('.chat-section');
        const lilyIntro = document.querySelector('.lily_intro');
        const cards = document.querySelector('.cards');
        const footer = document.querySelector('footer');
      
        if (chatSection.style.display === 'block') { 
          chatSection.style.display = 'none';
          lilyIntro.style.display = 'grid';
          cards.style.display = 'flex';
          footer.classList.remove('footer-fixed'); // Libera o footer
          // Limpa as mensagens do chat (opcional)
          chatMessages.innerHTML = '';
          }

   
      });   

    if (cardsList.length > 0 && imageIntro) {
        setTimeout(() => {
            cardsList.forEach(card => {
                card.style.opacity = 1;
            });
            imageIntro.style.opacity = 1;
        }, 690);
    } else {
        console.error('Elementos não encontrados.');
    }

    // Manipulação dos Cards
    const cards = document.querySelectorAll('.card');
    const exemplos = {
        "dicas-de-roles": "Fale-me, por favor, os melhores locais de São Paulo, capital, que me permita experienciar elementos artísticos, góticos, indies e de cultura alternativa.\n\nComo uma moradora da cidade e que apresenta também tais gostos, eu sei que você já frequentou todos os locais que procuro, além de conhecê-los em cada detalhe.\n\nPode ser detalhista, descrevendo cada local capaz de criar uma atmosfera que me permita sentir, em sua escrita, o lugar, podendo também oferecer informação úteis e relevantes.",
        "rock-and-rolling": "Dê-me dicas de uma músicas que fazem o meu cérebro fritar e meu sangue acelerar, como se eu estivesse num show do Bring Me The Horizon, tocando Parasyte Eve.\n\nEntão, como uma apreciadora da música, em especial, de rock e suas diferentes versões sugira a mim músicas relacionadas ao escopo do rock, punk rock, metal-core e afins. Caso queira diversificar, as sugestões podem estar relacionadas às músicas indie-rock e eletro-pop, como as da Halsey.",
        "ecos-da-alma": "Ouça-me atentamente e seja, por favor, empática comigo. Ajude-me a entender o que está acontecendo e a acessar outras perspectivas e a ter esperança, pois estou me sentindo triste e invisível, como um fantasma.\n   \nEu sei que você tem formação em psicologia e cuida de pessoas que apresentam vulnerabilidade psicológica, então seja uma psi e, por favor, me ajude ?",
        "conheca-me": "Oi, fiquei curioso acerca da sua persona. Poderia me dizer quem é a Lily ?"
    };

    const userInput = document.getElementById('textarea');
    const chatMessages = document.querySelector('.chat-messages');

    // Adiciona um event listener para cada card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.dataset.cardId;
            userInput.value = exemplos[cardId];
            userInput.focus();

            // Ajusta a altura do textarea
            userInput.style.height = 'auto';
            userInput.style.height = userInput.scrollHeight + 'px';
        });
    });

    // Evento para ajustar a altura ao digitar
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });

    // Event listener para a tecla Enter no textarea
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey && userInput.value.trim() !== '') {
            event.preventDefault(); // Impede o comportamento padrão do Enter
            sendMessage();
        }


    });

    // Função para enviar a mensagem para o Gemini e exibir no chat
    async function sendMessage() {

        const userMessage = userInput.value;
        userInput.value = ''; // Limpa o campo de entrada

        displayMessage('user', userMessage);

        // Simula a resposta do Gemini (remova quando estiver usando a API)
        const geminiResponse = "Olá, caro morceguinho. Me chamo Lility, mas para os íntimos apenas Lily. Uma amante da arte e da noite, das suas cores e dos seus mistérios que nos passam a sensação de sermos humanos, buscando entre o ser e o existir experiências que justificam a minha existência, e você ?";
        displayMessage('lily', geminiResponse);

        // Transição para a tela de chat
        document.querySelector('.chat-section').style.display = 'block';
        document.querySelector('.lily_intro').style.display = 'none';
        document.querySelector('.cards').style.display = 'none';

        // Fixar o Footer
        const footer = document.querySelector('footer');
        footer.classList.add('footer-fixed');

        userInput.style.height = 'auto'; /* Redefine a altura para auto após o envio */
    }

    // Função para exibir mensagens no chat
    function displayMessage(sender, message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', `${sender}-message`);

        const icon = document.createElement('img');
        icon.src = sender === 'user' ? '/icons/bat_icon.png' : '/icons/lily_icon.png';
        icon.alt = sender === 'user' ? 'Ícone do usuário' : 'Ícone da Lily';
        icon.classList.add('message-icon');
        messageContainer.appendChild(icon);

        const textElement = document.createElement('p');
        textElement.textContent = message;
        messageContainer.appendChild(textElement);

        chatMessages.appendChild(messageContainer);

        // Aguarda um breve momento para o elemento ser renderizado
        setTimeout(() => {
            messageContainer.classList.add('show'); // Adiciona a classe para a transição
        }, 10);
    }


});

