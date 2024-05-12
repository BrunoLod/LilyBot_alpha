import google.generativeai as genai 

apiKey = ''

genai.configure(
    api_key = apiKey
)

model = genai.GenerativeModel('gemini-pro')

response = model.generate_content('Escreva um poema de 4 estrofes com alguma temática gótica')

# Acesso ao texto dentro da estrutura de dados
texto = response.text

# Remoção de caracteres de nova linha
texto_limpo = texto.replace('\n', ' ')

# Impressão do texto limpo
print(texto_limpo)

