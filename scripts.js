import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD_06idtLIrAZV3grjJ8eEVhR2ivlqB_Vo");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use o nome novo
const form = document.getElementById('form');
const responseDiv = document.getElementById('aiResponse');
const responseContent = document.querySelector('.response-content');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = document.getElementById('apiKey').value;
    
    // Mostra que está carregando
    responseDiv.classList.remove('hidden');
    responseContent.innerHTML = "Aguarde, Lumi está analisando sua biblioteca... 📚";

    try {
        const genero = document.getElementById('selectGen').value;
        
        // Captura de checkboxes melhorada
        const temasPreferidos = Array.from(document.querySelectorAll('#temasPreferidos input:checked'))
            .map(cb => cb.parentElement.innerText.trim());

        const temasEvita = Array.from(document.querySelectorAll('#temasEvita input:checked'))
            .map(cb => cb.parentElement.innerText.trim());

        // Captura de radios
        const busca = document.querySelector('input[name="busca"]:checked')?.id || "não especificado";
        const ritmo = document.querySelector('input[name="ritmo"]:checked')?.id || "não especificado";

        const livroBom = document.getElementById('livroBom').value;
        const livroMedio = document.getElementById('livroMedio').value;
        const livroRuim = document.getElementById('livroRuim').value;

        const prompt = `Atue como Lumi, assistente literário. Sugira 3 livros para quem gosta de ${genero}. 
        Temas preferidos: ${temasPreferidos.join(', ')}. 
        Evitar: ${temasEvita.join(', ')}. 
        Estilo: ${busca} e ritmo ${ritmo}. 
        Referências: Gostou de "${livroBom}", achou médio "${livroMedio}" e odiou "${livroRuim}". 
        Responda em português, com títulos em negrito.`;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        // Exibe o resultado formatando quebras de linha
        responseContent.innerHTML = text.replace(/\n/g, '<br>');

    } catch (error) {
        console.error(error);
        responseContent.innerHTML = "❌ Erro ao conectar com Lumi: " + error.message;
    }
});