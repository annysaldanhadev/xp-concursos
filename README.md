# XP Concursos

App mobile de estudos gamificado voltado para concurseiros. A ideia é simples: transformar a rotina de estudos em algo mais engajante — com sessões Pomodoro, ranking entre usuários e organização de estudos feita pelo próprio usuário.

Pensa num Gym Rats, mas para quem está se preparando para concursos públicos.

## Funcionalidades previstas

- Autenticação (cadastro, login, recuperação de senha)
- Sessões de estudo com Pomodoro
- Ranking entre usuários
- Organização de estudos pelo próprio usuário
- Roadmap de estudos para assinantes (com foco em concursos públicos)

## Tecnologias

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/) (autenticação)
- [React Navigation](https://reactnavigation.org/)
- TypeScript

## Como rodar localmente

**Pré-requisitos:** Node.js e Expo CLI instalados.

```bash
# Clone o repositório
git clone https://github.com/annysaldanha/xp-concursos.git
cd xp-concursos

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

Escaneie o QR code com o app **Expo Go** no celular, ou rode em um emulador Android/iOS.

## Status do projeto

Em desenvolvimento. Atualmente com fluxo de autenticação implementado.
