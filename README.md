# [cite_start]Projeto: XP Concursos - Aplicativo Mobile [cite: 2]

[cite_start]**Relatório de Desenvolvimento** [cite: 1]
[cite_start]**Tecnologia:** Expo + React Native + TypeScript [cite: 3]
[cite_start]**Alunos:** Anny Saldanha, Davi Augusto, Denny Junio, Pedro Nascimento, Vitor Holz [cite: 3]

---

## [cite_start]1. Inicialização do Projeto [cite: 4]
[cite_start]O projeto foi criado utilizando o template oficial do Expo com TypeScript: [cite: 5]

```bash
npx create-expo-app@latest xp-concursos --template blank-typescript

http://googleusercontent.com/immersive_entry_chip/0

## 4. Configuração de Fonte Global [cite: 39]
Foi definida a fonte Inter como padrão do aplicativo. [cite: 40]

**Pacotes utilizados:** [cite: 41]
* `expo-font` [cite: 42]
* `@expo-google-fonts/inter` [cite: 43]

Também foi criado o arquivo `src/theme/fonts.ts` para centralizar as fontes do projeto. [cite: 52, 53, 54]

## 5. Desenvolvimento da Tela de Login [cite: 55]
Foi criada a tela `src/screens/LoginScreen.tsx`. [cite: 56, 57] 
A tela contém os seguintes elementos principais: [cite: 58, 59]
* Logo do aplicativo [cite: 60]
* Campo de E-mail [cite: 61]
* Campo de Senha [cite: 62]
* Botão Entrar [cite: 63]
* Opção Esqueceu a senha [cite: 64]
* Divisor visual [cite: 65]
* Login social: Google e Apple [cite: 66, 67, 68]
* Link para criação de conta [cite: 69]

## 6. Componentes Visuais Utilizados [cite: 70]
A interface foi construída com: [cite: 71]
* View [cite: 72]
* Text [cite: 73]
* TextInput [cite: 74]
* TouchableOpacity [cite: 75]
* Ícones SVG [cite: 76]

Os campos de input possuem: [cite: 77]
* ícone à esquerda [cite: 78]
* fundo escuro [cite: 79]
* bordas arredondadas [cite: 80]

## 7. Estilização da Interface [cite: 81]
A interface segue um tema dark. [cite: 82] Principais cores utilizadas: [cite: 83]

| Elemento | Cor | [cite: 84]
|---|---| [cite: 84]
| Background | `#0B0D17` | [cite: 84]
| Card | `#15182B` | [cite: 84]
| Inputs | `#2A2F3C` | [cite: 84]
| Botão principal | `#7C3AED` | [cite: 84]
| Texto secundário | `#BFC5D2` | [cite: 84]

## 8. Ajustes de Layout [cite: 85]
Foram realizados ajustes de espaçamento, incluindo: [cite: 86]
* `paddingTop` no container principal [cite: 87]
* `marginBottom` no logo [cite: 88]
* alinhamento central da tela [cite: 89]

Esses ajustes, como o aplicado ao logo, evitam que alterações no seu tamanho afetem o restante do layout. [cite: 90, 94]

## 9. Correções de Problemas Técnicos [cite: 95]
Durante o desenvolvimento foram resolvidos alguns erros comuns: [cite: 96]

* **Problema:** Expo não encontrava o ícone do aplicativo (`Unable to resolve asset/assets/icon.png`). [cite: 97, 98, 99]
  * **Solução:** criação do arquivo `icon.png` ou remoção da referência no `app.json`. [cite: 100]
* **Problema:** Erro React (`Objects are not valid as a React child`). [cite: 101, 102, 103]
  * **Solução:** correção do uso de SVG e JSX inválido. [cite: 104]
* **Problema:** SVG não renderizando. [cite: 105, 106]
  * **Solução:** configuração do `metro.config.js` para `react-native-svg-transformer`. [cite: 107]

## 10. Estado Atual do Projeto [cite: 108]
O projeto atualmente possui: [cite: 109]
* Ambiente Expo funcionando [cite: 110]
* Fontes carregadas corretamente [cite: 111]
* SVG configurado [cite: 111]
* Tela de login implementada e Layout funcional [cite: 112]

O aplicativo já roda normalmente utilizando: [cite: 113]

```bash
npx expo start
[cite_start]
http://googleusercontent.com/immersive_entry_chip/1
