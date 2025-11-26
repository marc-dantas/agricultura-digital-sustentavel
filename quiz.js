/**
 * Arquivo: quiz.js
 * Objetivo: Adicionar interatividade ao quiz, verificando respostas e mostrando feedback.
 */

// Mapeia os IDs dos containers das perguntas para facilitar a remoção de feedbacks antigos
const questionContainers = document.querySelectorAll('.question-container');
const resultDisplay = document.getElementById('quiz-result');

/**
 * Função principal para verificar as respostas e mostrar o resultado.
 */
function checkAnswers() {
    let score = 0;
    const totalQuestions = questionContainers.length;

    // 1. Limpa qualquer feedback anterior e estilo de acerto/erro
    clearFeedback();

    // 2. Itera sobre cada container de pergunta
    questionContainers.forEach((container, index) => {
        const questionName = `q${index + 1}`;
        // Encontra o input de rádio selecionado para a pergunta
        const selectedInput = container.querySelector(`input[name="${questionName}"]:checked`);
        // Encontra o input de rádio que é a resposta correta (usando o atributo data-correct="true")
        const correctInput = container.querySelector(`input[name="${questionName}"][data-correct="true"]`);

        // Verifica se alguma opção foi selecionada
        if (selectedInput) {
            // Verifica se a opção selecionada é a correta
            const isCorrect = selectedInput.dataset.correct === 'true';

            // 3. Adiciona feedback visual à opção escolhida
            const selectedLabel = container.querySelector(`label[for="${selectedInput.id}"]`);
            if (selectedLabel) {
                if (isCorrect) {
                    selectedLabel.classList.add('text-success', 'font-weight-bold');
                    score++; // Incrementa a pontuação
                } else {
                    selectedLabel.classList.add('text-danger', 'font-weight-bold');
                }
            }
            
            // 4. Adiciona o alert de feedback (Resposta correta/incorreta)
            showQuestionFeedback(container, isCorrect, correctInput);

        } else {
             // Caso não tenha selecionado, mostra apenas a resposta correta como feedback
             showQuestionFeedback(container, false, correctInput, true);
        }
    });

    // 5. Exibe o resultado final do quiz
    showOverallResult(score, totalQuestions);
}

/**
 * Limpa todos os feedbacks visuais e elementos de alerta do quiz.
 */
function clearFeedback() {
    // Remove estilos de feedback antigos (verde/vermelho)
    document.querySelectorAll('.form-check-label').forEach(label => {
        label.classList.remove('text-success', 'text-danger', 'font-weight-bold');
    });

    // Remove todos os alerts de feedback específicos da pergunta
    document.querySelectorAll('.quiz-alert').forEach(alert => {
        alert.remove();
    });

    // Limpa o resultado geral
    resultDisplay.innerHTML = '';
}


/**
 * Adiciona um alerta de feedback (Resposta correta ou incorreta) abaixo da pergunta.
 */
function showQuestionFeedback(container, isCorrect, correctInput, isUnanswered = false) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('alert', 'mt-3', 'mb-0', 'quiz-alert');
    
    let message = '';
    const correctLabel = container.querySelector(`label[for="${correctInput.id}"]`);
    const correctAnswerText = correctLabel ? correctLabel.textContent : 'Resposta não encontrada';

    if (isUnanswered) {
        feedbackDiv.classList.add('alert-warning');
        message = `Você não respondeu. A resposta correta era: <strong>${correctAnswerText}</strong>`;
    } else if (isCorrect) {
        feedbackDiv.classList.add('alert-success');
        message = 'Resposta Correta!';
    } else {
        feedbackDiv.classList.add('alert-danger');
        message = `Resposta Incorreta. A resposta correta era: <strong>${correctAnswerText}</strong>`;
    }

    feedbackDiv.innerHTML = message;
    container.appendChild(feedbackDiv);
    
    // Destaca a label da resposta correta
    if (correctLabel && !isCorrect) {
        correctLabel.classList.add('text-success', 'font-weight-bold', 'border-bottom', 'border-success');
    }
}

/**
 * Exibe o resultado final do quiz no elemento #quiz-result.
 */
function showOverallResult(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    
    let resultMessage;
    let alertClass;

    if (percentage === 100) {
        resultMessage = 'Excelente! Você acertou todas as perguntas!';
        alertClass = 'alert-success';
    } else if (percentage >= 50) {
        resultMessage = `Bom trabalho! Você acertou ${score} de ${totalQuestions} perguntas (${percentage.toFixed(0)}%).`;
        alertClass = 'alert-info';
    } else {
        resultMessage = `Você acertou ${score} de ${totalQuestions} perguntas. Revise o conteúdo.`;
        alertClass = 'alert-warning';
    }

    resultDisplay.innerHTML = `
        <div class="alert ${alertClass} font-weight-bold" role="alert">
            ${resultMessage}
        </div>
    `;

    // Rola a tela para o resultado
    resultDisplay.scrollIntoView({ behavior: 'smooth' });
}
